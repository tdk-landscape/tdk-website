---
title: Public claims registry - TDK CLI
---

The canonical claim wording, evidence, and limits are maintained in the [TDK CLI repository](https://github.com/tdk-landscape/tdk-cli-core/blob/main/docs/claims.md). Public site numbers link here so readers can inspect the source and caveats.

TDK CLI turns a `service.json` per service into a local Docker stack, with Tilt (the local development tool) watching services and live-updating containers as you code. It is not a deploy tool and not a Compose replacement. Production stays on Helm.

## 14-service demo

“14 tiny services healthy in 4.6s on a 16 GB M1 after images existed. Not a cold boot.”

## 100-service bench

“100 generated `/health` stubs, ~20 lines each, healthy through Traefik in 472s on a clean Ubuntu runner ([run](https://github.com/tdk-landscape/tdk-cli-core/actions/runs/36395860088)). Not an ERP.”

## Onboarding

Designed so `tdk doctor` and `tdk up` replace a setup wiki. Not measured on a hiring cohort.

## ROI calculator

Inputs are user-set. Output is arithmetic, not savings.
