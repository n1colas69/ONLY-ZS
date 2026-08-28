# scripts/

## `measure-images.mjs`

```bash
npm run images
```

Lee el ancho y alto real de cada foto de `public/images/` y genera `src/data/image-sizes.ts`.

**Corrélo cada vez que agregues, reemplaces o borres fotos.** También se corre solo antes de cada `npm run build`.

Para qué sirve:

- Next.js reserva el espacio exacto de cada foto, así la página no "salta" mientras carga.
- El catálogo respeta la proporción original de cada foto en vez de recortarlas todas al mismo cuadro.

No usa ninguna librería: lee los primeros bytes de cada archivo JPG o PNG.

---

## Scripts de migración (archivados)

Los scripts que convirtieron el sitio viejo en este están en
[`legacy/scripts-migracion/`](../legacy/scripts-migracion/).

**Eran de un solo uso y ya se corrieron.** Están archivados a propósito, fuera de esta carpeta: `migrate-products.mjs` mueve archivos de fotos, y volver a correrlo sobre el proyecto ya migrado desordenaría `public/images/`.

Quedan como registro de cómo se hizo la migración:

| Script | Qué hizo |
|---|---|
| `inspect-descriptions.mjs` | Volcó las descripciones del sitio viejo para diseñar el parser |
| `migrate-products.mjs` | Convirtió los 58 productos de `legacy/js/data.js` a `src/data/products.ts`, extrajo marca, talle, estado y medidas, y reorganizó las 269 fotos en carpetas por producto |
| `cleanup-products.mjs` | Segunda pasada: normalizó estados, talles en pulgadas y algunos casos que el parser no resolvió bien |
