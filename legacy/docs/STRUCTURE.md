# ONLY ZS - Estructura de Archivos Modular

## Descripción

El código está organizado por tipo de archivo para mantener la página clara y fácil de actualizar. Los HTML principales quedan en la raíz para conservar las URLs públicas, mientras que CSS, JavaScript, documentación y logs viven en carpetas dedicadas.

## Estructura

- `index.html` - Página principal.
- `gallery.html` - Galería de comunidad.
- `brand.html` - Página dinámica de colaboraciones.
- `CNAME` - Dominio de GitHub Pages. Debe permanecer en la raíz.
- `css/styles.css` - Estilos globales.
- `js/config.js` - Configuración global.
- `js/data.js` - Productos, galería comunitaria y colaboraciones.
- `js/utils.js` - Utilidades compartidas.
- `js/scroll.js` - Efectos de scroll.
- `js/ui.js` - Interacciones generales de UI.
- `js/app.js` - Inicialización de la home.
- `js/components/products.js` - Renderizado y filtros de productos.
- `js/components/cart.js` - Carrito.
- `js/components/wishlist.js` - Favoritos.
- `js/components/modals.js` - Modales.
- `js/components/gallery.js` - Galería comunitaria.
- `docs/instructions.md` - Manual de actualización.
- `docs/STRUCTURE.md` - Esta guía de arquitectura.
- `docs/README.txt` - Notas breves.
- `logs/` - Logs locales del servidor.
- `assets/images/` - Imágenes originales y optimizadas.

## Orden de Carga

### `index.html`
1. `js/config.js`
2. `js/data.js`
3. `js/utils.js`
4. `js/components/cart.js`
5. `js/components/wishlist.js`
6. `js/components/products.js`
7. `js/components/modals.js`
8. `js/components/gallery.js`
9. `js/scroll.js`
10. `js/ui.js`
11. `js/app.js`

### `gallery.html`
1. `js/data.js`
2. `js/utils.js`
3. `js/components/gallery.js`
4. `js/scroll.js`

### `brand.html`
1. `js/config.js`
2. `js/data.js`
3. `js/utils.js`
4. `js/scroll.js`

## Notas

- La sección de colaboraciones de la home apunta a `brand.html?brand=...`.
- Las rutas de imágenes en `js/data.js` deben empezar con `assets/images/` porque se resuelven desde los HTML de la raíz.
- Las URLs dentro de `css/styles.css` deben empezar con `../assets/images/` porque el CSS está dentro de `css/`.
- Mantener nombres de carpetas sin espacios, usando guiones: `Galeria-ZS`, `Culto-A-Las-Calles`, `Remeras-Chombas`.
