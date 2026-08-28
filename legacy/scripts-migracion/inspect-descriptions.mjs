import fs from 'node:fs';

const src = fs.readFileSync('legacy/js/data.js', 'utf8');
const { productsData } = new Function(src + '\nreturn { productsData };')();

for (const p of productsData) {
  const lines = (p.description || '').split('\n').map((l) => l.trim()).filter(Boolean);
  console.log('### ' + p.id);
  lines.forEach((l, i) => console.log(`  [${i}] ${l}`));
}
