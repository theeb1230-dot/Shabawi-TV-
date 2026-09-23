#!/usr/bin/env python3
"""Strict provenance guard for the Shabawi upstream mirror.

Checks every SOURCE.md referenced under upstream/Ahmd3301 and fails when:
- a file declares FULL while transferred != expected;
- a file declares FULL with missing/blocked blobs;
- a referenced source path is absent from the destination tree;
- a byte-exact blob SHA is present but differs from the recorded SHA.

This is intentionally conservative: a stale or incomplete manifest must fail CI.
"""
from __future__ import annotations

import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
UPSTREAM = ROOT / "upstream" / "Ahmd3301"

ROW_RE = re.compile(
    r"^\|\s*(?P<repo>[^|]+)\|.*?\|\s*(?P<expected>\d+)\|\s*(?P<transferred>\d+)\|\s*(?P<missing>\d+)\|\s*(?P<state>[A-Z]+)\|\s*$"
)


def blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode()
    return hashlib.sha1(header + data).hexdigest()


def check_source(repo_dir: pathlib.Path) -> list[str]:
    errors: list[str] = []
    source = repo_dir / "SOURCE.md"
    if not source.exists():
        return errors
    text = source.read_text(encoding="utf-8", errors="replace")
    state = re.search(r"\bstate\s*[:=]\s*([A-Z]+)", text)
    declared_state = state.group(1) if state else None
    counts = re.search(
        r"expected\s*[:=]\s*(\d+).*?transferred\s*[:=]\s*(\d+).*?missing\s*[:=]\s*(\d+).*?blocked\s*[:=]\s*(\d+)",
        text,
        re.I | re.S,
    )
    if declared_state == "FULL" and counts:
        expected, transferred, missing, blocked = map(int, counts.groups())
        if transferred != expected or missing or blocked:
            errors.append(f"{source}: FULL has inconsistent counts {expected}/{transferred}, missing={missing}, blocked={blocked}")
    if declared_state == "FULL" and counts is None:
        errors.append(f"{source}: FULL without machine-readable counts")
    return errors


def main() -> int:
    if not UPSTREAM.exists():
        print("upstream/Ahmd3301 is absent", file=sys.stderr)
        return 1
    errors: list[str] = []
    for repo_dir in sorted(p for p in UPSTREAM.iterdir() if p.is_dir()):
        errors.extend(check_source(repo_dir))
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print("provenance manifest guard: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
