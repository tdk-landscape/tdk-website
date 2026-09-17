# ASAP DoD: TDK CLI install smoke

Date: 2026-09-17

## Definition of done

- Published Quick Start page serves the one-line installer.
- `https://tdk-landscape.github.io/install.sh` returns HTTP 200.
- Fresh Ubuntu container can install the CLI using the published command.
- `tdk --version` prints `1.1.0`.
- `tdk project --yes` creates `.tdk/project.json` and `.tdk/.tdk-out/Tiltfile`.
- `tdk resource api --type backend --stack pre-alpha --path services/pre-alpha/api` creates `services/pre-alpha/api/service.json`.
- `tdk project --check` passes.
- `tdk up pre-alpha` requires the documented Tilt prerequisite.

## Container proof

```sh
docker run --rm ubuntu:24.04 sh -lc '
  set -eux
  apt-get update >/dev/null
  apt-get install -y curl ca-certificates sudo >/dev/null
  curl -fsSL https://tdk-landscape.github.io/install.sh | sh
  tdk --version
  mkdir /tmp/my-service
  cd /tmp/my-service
  tdk project --yes
  printf "\n" | tdk resource api --type backend --stack pre-alpha --path services/pre-alpha/api
  test -f .tdk/project.json
  test -f .tdk/.tdk-out/Tiltfile
  test -f services/pre-alpha/api/service.json
  tdk project --check
'
```

Result: passed.

## Fixes made during smoke

- Published `tdk-cli-releases` release `v1.1.0`.
- Embedded CLI templates into the compiled Bun binary so `tdk project --yes` works without source files.
- Updated Quick Start from stale `tdk init` / `tdk generate` commands to current `tdk project` / `tdk resource` flow.

