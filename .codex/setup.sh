#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

node --version
package_manager="$(node -p "require('./package.json').packageManager")"
npm exec --yes --package="$package_manager" -- pnpm install --frozen-lockfile
