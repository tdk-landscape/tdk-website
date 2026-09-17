#!/usr/bin/env sh
set -eu

OWNER="tdk-landscape"
REPO="tdk-cli-releases"
BIN_NAME="tdk"

fail() {
  echo "tdk install: $*" >&2
  exit 1
}

need() {
  command -v "$1" >/dev/null 2>&1 || fail "missing required command: $1"
}

need curl
need uname
need chmod
need mkdir

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"

case "$os" in
  linux) platform="linux" ;;
  darwin) platform="darwin" ;;
  *) fail "unsupported OS: $os" ;;
esac

case "$arch" in
  x86_64|amd64) cpu="amd64" ;;
  arm64|aarch64) cpu="arm64" ;;
  *) fail "unsupported CPU: $arch" ;;
esac

asset="tdk-${platform}-${cpu}"
url="https://github.com/${OWNER}/${REPO}/releases/latest/download/${asset}"

install_dir="${TDK_INSTALL_DIR:-/usr/local/bin}"
tmp="${TMPDIR:-/tmp}/tdk.$$"

echo "Installing ${asset}..."
curl -fsSL "$url" -o "$tmp" || fail "download failed: $url"
chmod +x "$tmp"

if [ -w "$install_dir" ]; then
  mkdir -p "$install_dir"
  mv "$tmp" "${install_dir}/${BIN_NAME}"
else
  need sudo
  sudo mkdir -p "$install_dir"
  sudo mv "$tmp" "${install_dir}/${BIN_NAME}"
fi

echo "Installed: ${install_dir}/${BIN_NAME}"
"${install_dir}/${BIN_NAME}" --version || true
