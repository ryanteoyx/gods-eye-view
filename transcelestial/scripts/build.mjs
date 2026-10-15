import { mkdir, cp, rm, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../',import.meta.url));
await rm(root+'dist',{recursive:true,force:true});
await mkdir(root+'dist/data',{recursive:true});
// Deliberate allowlist: no upstream imagery, cable datasets, models, provider keys or caches.
for (const file of ['index.html','style.css','app.js','model.js','geo.js','data/research.json','data/world.json']) {
  await cp(root+'src/'+file,root+'dist/'+file);
}
await cp(root+'THIRD_PARTY_NOTICES.md',root+'dist/THIRD_PARTY_NOTICES.md');
await cp(root+'UPSTREAM-LICENSE.txt',root+'dist/UPSTREAM-LICENSE.txt');
const data=JSON.parse(await readFile(root+'src/data/research.json','utf8'));
if (data.sources.some(s=>!s.url.startsWith('https://'))) throw new Error('Source URLs must be HTTPS');
await writeFile(root+'dist/build.json',JSON.stringify({version:'0.1.0',builtAt:new Date().toISOString(),upstream:'f0a1b22dc82c6c5cd9690d07c1cdb297818da86f',mode:'curated public research; no paid APIs'}));
console.log('Built allowlisted static prototype to dist/');
