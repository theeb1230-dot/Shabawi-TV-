# plyr-native upstream record
Source: Ahmd3301/plyr-native
Exact tree SHA: cf4dbbd9dd87d64f5fa1a1d36c4bc7d933c55bcc
Decision: KEEP generators.
Observed: build workflow and JS generators for parsing CSS/JS/SVG and generating Compose-oriented output. Repository also commits node_modules.
Import policy: retain provenance/generator logic when imported; never copy vendored node_modules merely for archival completeness.
