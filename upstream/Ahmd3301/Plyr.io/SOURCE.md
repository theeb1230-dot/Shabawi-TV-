# Plyr.io upstream record

- Source: `Ahmd3301/Plyr.io`
- Default branch: `main`
- Exact commit SHA: `81432335b1b53fa0d6677f25be89c04623507a5a`
- Exact tree SHA: `67d70081bd9c6c366e735332d4cd71263bc82413`
- Recursive tree truncated: `false`
- Expected upstream blobs: `10`
- Exact transferred blobs: `0`
- Missing blobs: `10`
- Blocked blobs: `0`
- State: `PARTIAL`

The current tree is an Android/Kotlin WebView player shell with Gradle configuration, `player.html`, Android resources, and a GitHub Actions build/release workflow. The workflow uses the standard `secrets.GITHUB_TOKEN` contract and does not embed a credential value. No external database schema/state was identified in this tree.

`SOURCE.md` is destination provenance metadata and is not counted as an upstream blob. The previous record incorrectly stored the commit SHA as the tree SHA; this record corrects that provenance error. Raw upstream files remain to be mirrored byte-exact before this repository may be marked FULL.
