/**
 * Segunda pasada sobre src/data/products.ts.
 * Arregla lo que el parser automático no resolvió bien, revisado a mano.
 * Se corre una sola vez: node scripts/cleanup-products.mjs
 */
import fs from 'node:fs';

let t = fs.readFileSync('src/data/products.ts', 'utf8');
const before = t;
const log = [];

function replace(from, to, label) {
  if (!t.includes(from)) { log.push(`NO ENCONTRADO: ${label}`); return; }
  t = t.replace(from, to);
  log.push(`ok: ${label}`);
}

// 1. Estado con coma decimal -> punto, para que todos se lean igual.
t = t.replace(/condition: "(\d+),(\d+\/10)"/g, 'condition: "$1.$2"');
log.push('ok: estados con coma -> punto');

// 2. Talles en pulgadas: "40us" -> "40 US", "40us(50AR)" -> "40 US (50 AR)"
t = t.replace(/size: "(\d+)us\((\d+)AR\)"/g, 'size: "$1 US ($2 AR)"');
t = t.replace(/size: "(\d+)us"/g, 'size: "$1 US"');
log.push('ok: talles US');

// 3. "Medidas: 70x64" -> "70x64" (la etiqueta la pone la interfaz)
t = t.replace(/measurements: "Medidas: /g, 'measurements: "');
log.push('ok: prefijo "Medidas:" redundante');

// 4. El estado de este producto arrastró una frase que es descripción, no estado.
replace(
  `condition: "9/10 tiene un leve desgaste general",`,
  `condition: "9/10",`,
  'buzo-real-tree: estado'
);
replace(
  `description: "Crewneck de algodón con logo en el frente, bastante liviano de media estación. Sin capucha.",`,
  `description: "Crewneck de algodón con logo en el frente, bastante liviano de media estación. Sin capucha. Tiene un leve desgaste general.",`,
  'buzo-real-tree: descripción'
);

// 5. Tags: sacar los que vienen de una negación ("sin capucha" no es "capucha").
const negations = [
  ['rompe-vientos-polo-ralph-lauren', 'capucha'],
  ['buzo-real-tree', 'capucha'],
];
for (const [slug, tag] of negations) {
  const re = new RegExp(`(slug: "${slug}"[\\s\\S]*?tags: \\[)([^\\]]*)\\]`);
  const match = t.match(re);
  if (!match) { log.push(`NO ENCONTRADO: tags de ${slug}`); continue; }
  const cleaned = match[2]
    .split(', ')
    .filter((x) => x !== `"${tag}"`)
    .join(', ');
  t = t.replace(re, `$1${cleaned}]`);
  log.push(`ok: tag "${tag}" quitado de ${slug}`);
}

fs.writeFileSync('src/data/products.ts', t, 'utf8');
console.log(log.join('\n'));
console.log(before === t ? '\nSIN CAMBIOS' : '\nproducts.ts actualizado');
