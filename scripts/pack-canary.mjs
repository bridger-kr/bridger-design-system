/* Packed-package consumer canary (DS #31 pipeline step 5/6). Packs
   @bridger-kr/tokens + @bridger-kr/react into real tarballs, installs them
   into a scratch consumer that shares no node_modules with the workspace,
   and imports the package surface. Proves publish artifacts resolve outside
   the repo — workspace hoisting cannot mask a missing export or file. */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'pipe' }).toString();

const scratch = mkdtempSync(join(tmpdir(), 'dt-canary-'));
try {
  const tarballs = [];
  for (const pkg of ['packages/tokens', 'packages/react']) {
    const out = run('npm', ['pack', '--pack-destination', scratch], join(ROOT, pkg));
    const file = out.trim().split('\n').pop().trim();
    tarballs.push(join(scratch, file));
  }

  writeFileSync(
    join(scratch, 'package.json'),
    JSON.stringify({ name: 'dt-canary', private: true, type: 'module', dependencies: { react: '*', 'react-dom': '*' } }),
  );
  run('npm', ['install', '--no-audit', '--no-fund', '--silent', ...tarballs, 'react@19', 'react-dom@19'], scratch);

  const check = `
    import { Button, StatTile, Table, UsageMeter, ConsoleShell, DataTrustMeta } from '@bridger-kr/react';
    import { colors } from '@bridger-kr/tokens';
    for (const c of [Button, StatTile, Table, UsageMeter, ConsoleShell, DataTrustMeta]) {
      if (typeof c !== 'object' && typeof c !== 'function') throw new Error('missing export');
    }
    if (!colors) throw new Error('tokens colors export missing');
    console.log('pack-canary: import surface OK');
  `;
  writeFileSync(join(scratch, 'check.mjs'), check);
  run('node', ['check.mjs'], scratch);
  console.log('pack-canary: PASS', readdirSync(scratch).filter((f) => f.endsWith('.tgz')).join(', '));
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
