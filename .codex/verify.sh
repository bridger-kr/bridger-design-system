#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

package_manager="$(node -p "require('./package.json').packageManager")"
pnpm=(npm exec --offline --yes --package="$package_manager" -- pnpm)
"${pnpm[@]}" build
"${pnpm[@]}" typecheck
"${pnpm[@]}" test
"${pnpm[@]}" lint
"${pnpm[@]}" --filter bridger-figma-plugin run validate
"${pnpm[@]}" --filter bridger-figma-plugin run e2e
"${pnpm[@]}" pack:dry-run
