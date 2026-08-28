# legacy/ — el sitio anterior

Esta carpeta es el sitio de ONLY ZS tal como estaba antes de la reconstrucción, completo y sin tocar.

**No se usa. No se publica. No hay que mantenerlo.** Está acá como referencia.

## Qué hay adentro

```
legacy/
├── index.html          la home (569 líneas, con 5 modales adentro)
├── gallery.html        la galería
├── brand.html          las colaboraciones (con ~270 líneas de JS propio)
├── css/styles.css      2.211 líneas de estilos
├── js/
│   ├── data.js         LOS DATOS ORIGINALES: 58 productos, 33 fotos, 3 colaboraciones
│   ├── config.js  utils.js  app.js  ui.js  scroll.js  accessibility.js
│   └── components/     products, cart, wishlist, modals, gallery
├── docs/               el manual de actualización del sitio viejo
├── manifest.json  sw.js
└── *.md                auditorías de accesibilidad que se habían hecho
```

## Para qué sirve

- **`js/data.js` es la fuente original del catálogo.** Si alguna vez hay dudas sobre el texto exacto de una descripción o el precio original de una pieza, está ahí.
- Las auditorías (`ANALISIS_ERRORES_ACCESIBILIDAD.md`, `SOLUCIONES_CODIGO.md`) documentan problemas que ya están resueltos en la versión nueva.

## Qué NO hay acá

Las **fotos**. Se movieron a `public/images/` porque las usa el sitio nuevo. No se duplicaron.

Las versiones "optimizadas" (`assets/images/optimized/`, 110 MB de JPG generados a mano) se eliminaron: ahora las genera Next.js sola. Si hicieran falta, están en el historial de git.

## El análisis

Por qué se reconstruyó, qué se conservó y qué se descartó está en [MIGRATION.md](../MIGRATION.md), en la raíz del proyecto.

## ¿Se puede borrar?

Sí, cuando estés seguro de que no vas a necesitar consultar nada. Igual queda en el historial de git.
