"""Reconcile local Ahmd3301 mirrors against live GitHub blob inventories."""
from __future__ import annotations

import hashlib
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UPSTREAM_ROOT = ROOT / "upstream" / "Ahmd3301"
INVENTORY = ROOT / "inventory"
CURRENT = INVENTORY / "ahmd3301-current.tsv"
BLOB_ROOT = INVENTORY / "ahmd3301-blob-shas"
OUT = INVENTORY / "ahmd3301-mirror-reconciliation.tsv"
SUMMARY = INVENTORY / "ahmd3301-mirror-summary.txt"


def git_blob_sha(path: Path) -> str:
    data = path.read_bytes()
    header = f"blob {len(data)}\0".encode("utf-8")
    return hashlib.sha1(header + data).hexdigest()


def repo_files(repo_dir: Path):
    for path in repo_dir.rglob("*"):
        if path.is_file() and ".git" not in path.parts:
            yield path


def main() -> None:
    rows = []
    totals = {"expected": 0, "transferred": 0, "physical": 0, "blocked": 0}
    header = "repo\tstate\texpected_blobs\ttransferred_blobs\tmissing_blobs\tblocked_blobs\tphysical_directory\n"

    if not CURRENT.exists():
        raise SystemExit("missing live inventory: inventory/ahmd3301-current.tsv")

    for line in CURRENT.read_text(encoding="utf-8").splitlines()[1:]:
        if not line.strip():
            continue
        repo, branch, commit, tree, blob_count, upstream_state = line.split("\t")
        expected = 0 if blob_count == "-" else int(blob_count)
        expected_shas = set()
        blob_file = BLOB_ROOT / f"{repo}.tsv"
        if blob_file.exists():
            for blob_line in blob_file.read_text(encoding="utf-8").splitlines():
                if blob_line.strip():
                    _, sha = blob_line.split("\t", 1)
                    expected_shas.add(sha.strip())
        if expected_shas:
            expected = len(expected_shas)

        repo_dir = UPSTREAM_ROOT / repo
        physical = repo_dir.is_dir()
        if physical:
            totals["physical"] += 1

        local_shas = set()
        if physical:
            for path in repo_files(repo_dir):
                try:
                    local_shas.add(git_blob_sha(path))
                except OSError:
                    continue

        transferred = len(local_shas & expected_shas) if expected_shas else 0
        missing = max(expected - transferred, 0)
        blocked = 0
        if upstream_state == "EMPTY":
            state = "EMPTY"
        elif upstream_state == "BLOCKED":
            state = "BLOCKED"
            blocked = expected
        elif transferred == expected and expected > 0:
            state = "FULL"
        elif transferred > 0:
            state = "PARTIAL"
        else:
            state = "PARTIAL" if physical else "BLOCKED"

        totals["expected"] += expected
        totals["transferred"] += transferred
        totals["blocked"] += blocked
        rows.append(
            f"{repo}\t{state}\t{expected}\t{transferred}\t{missing}\t{blocked}\t{str(physical).lower()}\n"
        )

    OUT.write_text(header + "".join(rows), encoding="utf-8")
    raw_pct = (100.0 * totals["transferred"] / totals["expected"]) if totals["expected"] else 0.0
    physical_pct = (100.0 * totals["physical"] / len(rows)) if rows else 0.0
    SUMMARY.write_text(
        "\n".join(
            [
                f"repo_count={len(rows)}",
                f"physical_repo_count={totals['physical']}",
                f"physical_representation_pct={physical_pct:.1f}",
                f"expected_blob_count={totals['expected']}",
                f"transferred_blob_count={totals['transferred']}",
                f"blocked_blob_count={totals['blocked']}",
                f"raw_mirror_completeness_pct={raw_pct:.1f}",
            ]
        )
        + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
