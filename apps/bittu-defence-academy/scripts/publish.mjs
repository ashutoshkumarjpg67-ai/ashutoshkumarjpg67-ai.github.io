/**
 * Publishes the production build to `/<repo-root>/bittu-defence-academy/`.
 *
 * The repository is a GitHub Pages *user* site, so the academy site has to live
 * on a sub-path next to the other static sites. This script:
 *   1. removes the previous published copy,
 *   2. copies the fresh Vite build into it,
 *   3. writes a static `index.html` per route so deep links and refreshes work
 *      on a host with no rewrite rules (GitHub Pages), and
 *   4. writes `404.html` so unknown paths load the SPA's own 404 page.
 */
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(appRoot, 'dist');
const target = resolve(appRoot, '../../bittu-defence-academy');

const ROUTES = ['about', 'programs', 'gallery', 'videos', 'contact'];

const shell = await readFile(join(dist, 'index.html'), 'utf8');

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(dist, target, { recursive: true });

for (const route of ROUTES) {
  const dir = join(target, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), shell);
}

await writeFile(join(target, '404.html'), shell);

console.log(`Published ${ROUTES.length + 1} HTML entry points to ${target}`);
