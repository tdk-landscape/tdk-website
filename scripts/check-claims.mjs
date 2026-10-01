import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const index = readFileSync(new URL('index.html', root), 'utf8');
const compare = readFileSync(new URL('compare/index.html', root), 'utf8');
const quickstart = readFileSync(new URL('docs/quickstart/index.html', root), 'utf8');
const claims = readFileSync(new URL('../../ollamar1/tdk-cli-core/docs/claims.md', root), 'utf8');

const failures = [];
const required = [
  '14 tiny services healthy in 4.6s on a 16 GB M1 after images existed. Not a cold boot.',
  '100 generated `/health` stubs',
];

for (const line of required) {
  if (!claims.includes(line)) failures.push(`claims registry is missing required wording: ${line}`);
}

for (const [label, source] of [['homepage hero', index.match(/<p class="aw-hero-proof">([\s\S]*?)<\/p>/)?.[1] ?? ''], ['comparison page', compare]]) {
  const numbers = [...source.matchAll(/\b\d+(?:\.\d+)?\s*(?:s|services?)\b/gi)].map((match) => match[0]);
  if (numbers.length && !source.includes("'/docs/claims/' | relative_url") && !source.includes('/docs/claims/')) {
    failures.push(`${label} has a numeric claim without a link to the claims registry`);
  }
  if (label === 'homepage hero' && /from zero|under 5 seconds/i.test(source.replace(/<[^>]*>/g, ' '))) {
    failures.push('homepage hero uses forbidden or over-broad performance wording');
  }
}

const forbidden = [
  [/Free during beta\. When we launch/i, 'obsolete beta pricing copy'],
  [/Windows supported(?!\s+through WSL2)/i, 'unqualified Windows support claim'],
  [/from zero.{0,120}4\.6s|4\.6s.{0,120}from zero/i, 'from-zero 4.6s claim'],
];
const siteSources = [index, compare, quickstart];
for (const [pattern, label] of forbidden) {
  if (siteSources.some((source) => pattern.test(source))) failures.push(`site contains ${label}`);
}

if (siteSources.some((source) => /Windows supported(?!\s+through WSL2)/i.test(source))) {
  failures.push('site contains an unqualified Windows support claim');
}
if (!index.includes('Stability: 1.x local dev. Generated files are a contract; verify with tdk config verify. Core CLI is MIT and needs no key. Premium is optional.')) {
  failures.push('homepage is missing the shared product stability and license status line');
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}
console.log('Public claims checks passed.');
