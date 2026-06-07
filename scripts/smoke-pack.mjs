import { spawn } from 'node:child_process';
import { relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function usage() {
  return [
    'Usage: node scripts/smoke-pack.mjs <package-dir> <expected-glob>...',
    '',
    'Runs npm pack --dry-run --json in <package-dir> and verifies each expected',
    'glob matches at least one tarball file path. Globs support * and **.',
    '',
    'Example:',
    '  node scripts/smoke-pack.mjs packages/tokens dist/index.js dist/**/*.d.ts',
  ].join('\n');
}

function globToRegExp(glob) {
  let pattern = '';

  for (let index = 0; index < glob.length; index += 1) {
    const char = glob[index];
    const next = glob[index + 1];
    const afterNext = glob[index + 2];

    if (char === '*' && next === '*' && afterNext === '/') {
      pattern += '(?:.*/)?';
      index += 2;
      continue;
    }

    if (char === '*' && next === '*') {
      pattern += '.*';
      index += 1;
      continue;
    }

    if (char === '*') {
      pattern += '[^/]*';
      continue;
    }

    pattern += char.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }

  return new RegExp(`^${pattern}$`);
}

function runPack(packageDir) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn('npm', ['pack', '--dry-run', '--json'], {
      cwd: packageDir,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`npm pack --dry-run failed with exit code ${code}\n${stderr}`));
        return;
      }

      resolvePromise(stdout);
    });
  });
}

export async function smokePack({ packageDir, expectedFiles }) {
  if (!packageDir || !Array.isArray(expectedFiles) || expectedFiles.length === 0) {
    throw new Error(usage());
  }

  const resolvedPackageDir = resolve(packageDir);
  const output = await runPack(resolvedPackageDir);
  const packs = JSON.parse(output);
  const files = packs.flatMap((pack) => pack.files.map((file) => file.path));
  const missing = expectedFiles.filter((expected) => {
    const matcher = globToRegExp(expected);
    return !files.some((file) => matcher.test(file));
  });

  if (missing.length > 0) {
    const relativeDir = relative(process.cwd(), resolvedPackageDir) || '.';
    throw new Error(
      [
        `Missing expected files in npm pack output for ${relativeDir}:`,
        ...missing.map((file) => `  - ${file}`),
        '',
        'Packed files:',
        ...files.map((file) => `  - ${file}`),
      ].join('\n'),
    );
  }

  return { files };
}

async function main() {
  const [packageDir, ...expectedFiles] = process.argv.slice(2);
  const result = await smokePack({ packageDir, expectedFiles });
  console.log(`npm pack smoke passed with ${result.files.length} files.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
