# MIGRATION.md — ONLY ZS

Documento de análisis y plan de reconstrucción.
Escrito **antes** de tocar una sola línea del sitio actual.

- **Fecha de análisis:** 24 de agosto de 2026
- **Commit analizado:** `2d0515d`
- **Estado del sitio actual:** funcionando, publicado en GitHub Pages (`onlyzs.com.ar`)
- **Decisiones tomadas con el dueño del proyecto:** hosting en **Vercel**, proyecto nuevo en la **raíz del repo** con el sitio viejo archivado en `legacy/`

---

## 1. Resumen ejecutivo

ONLY ZS es hoy un sitio estático de 3 páginas HTML, 1 hoja de estilos de 2.211 líneas y ~2.800 líneas de JavaScript global sin módulos. Funciona, tiene identidad propia y contenido real y valioso: **58 productos con fotografía propia, descripciones escritas a mano con medidas reales, 33 fotos de comunidad y una colaboración real documentada**.

El problema no es el contenido. El problema es la arquitectura:

- Los productos **no tienen URL propia** (se abren en un modal), así que no existen para Google ni se pueden compartir bien.
- Los datos y la interfaz están acoplados: agregar un producto obliga a tocar `data.js`, y cambiar cómo se ve una tarjeta obliga a editar strings de HTML dentro de JavaScript.
- Los estados de producto se representan con **cuatro booleanos que se contradicen entre sí** (`inStock`, `isComingSoon`, `isNew`, `badge`), y hay 17 productos con combinaciones inválidas hoy.
- Las imágenes originales pesan hasta **10,4 MB cada una** y el sistema de optimización es una carpeta paralela generada a mano.
- Hay bugs concretos verificados que rompen funcionalidad real (ver §4).

**El plan es reconstruir desde cero en Next.js + TypeScript + Tailwind, migrando el 100% del contenido y conservando conceptualmente todo lo que hoy funciona bien.** El sitio viejo se archiva completo en `legacy/`, no se borra.

---

## 2. Cómo funciona el proyecto actual

### 2.1 Páginas

| Archivo | Líneas | Qué hace |
|---|---|---|
| `index.html` | 569 | Todo: hero, categorías, catálogo, colaboraciones, galería, footer, y **5 modales** (búsqueda, carrito, wishlist, checkout, producto, lightbox) |
| `gallery.html` | 311 | Galería ZS completa (33 fotos) |
| `brand.html` | 765 | Página de colaboración. Recibe `?brand=key` y se rellena por JS. **Incluye ~270 líneas de `<script>` inline propio.** |

No hay build. Los archivos se sirven tal cual desde GitHub Pages.

### 2.2 Capa de datos

Todo vive en `js/data.js` (1.626 líneas), como **variables globales sin `export`**:

```js
const productsData = [ /* 58 objetos */ ];
const communityGalleryData = [ /* 33 objetos */ ];
const collaborationsData = [ /* 3 objetos */ ];
```

Se cargan con `<script src>` en orden manual. Cada página tiene que declarar su propio orden de carga (documentado en `docs/STRUCTURE.md`), y romper el orden rompe el sitio silenciosamente.

Forma de un producto hoy:

```js
{
  id: "bermuda-dickies-beige",
  name: "Bermuda Dickies Beige",
  category: "Pantalones",
  price: 25000,
  originalPrice: null,
  badge: "NUEVO",              // string libre: "NUEVO" | "VENDIDO" | "PRÓXIMAMENTE" | null
  image: "assets/images/...",  // duplica images[0]
  images: [ "...", "..." ],
  description: "Texto largo con \n para talle, medidas y estado",
  isNew: true,
  inStock: true,
  isComingSoon: false
}
```

Observaciones importantes:

- **No existe campo `brand`.** La marca vive dentro del `name` ("Bermuda **Dickies** Beige"). Por eso hoy no se puede filtrar ni buscar por marca.
- **No existen campos `size`, `condition` ni `measurements`.** Están todos embebidos como texto dentro de `description`, separados por `\n`. Ese texto es información real y valiosa: talle, largo, ancho, estado sobre 10.
- **No existen `tags`.**
- `image` es siempre `images[0]` → dato duplicado.
- El `id` `"sueter-levi's"` tiene un apóstrofo. Esto rompe el sitio (ver §4).

### 2.3 Flujos funcionales

**Carrito** (`js/components/cart.js` + `js/utils.js`)
- Estado: variable global `cart`, persistida en `localStorage` bajo la clave `zs_cart`.
- Guarda una **copia completa del producto** dentro del carrito (`cart.push({ ...product, qty: 1 })`). Si mañana cambia el precio, el carrito guardado conserva el precio viejo.
- Límite de cantidad: `getProductStockQty()` devuelve siempre `1` (no existe `stockQty` en ningún producto). O sea: **una unidad por pieza**, que es correcto para vintage 1/1, pero está implementado por accidente, no por diseño.
- Total = subtotal. No hay envío calculado (se coordina por WhatsApp).

**Wishlist** (`js/components/wishlist.js`)
- Array de IDs en `localStorage` bajo `zs_wishlist`. Simple y correcto.

**Búsqueda** (`js/ui.js` + `js/app.js`)
- Hay **dos buscadores distintos** con lógicas distintas:
  - el del overlay filtra la grilla por `name` + `category`;
  - el de `#indexSearchResults` muestra un dropdown predictivo con miniaturas, y filtra por `name` + `category` excluyendo `isComingSoon`.
- Ninguno busca por marca ni por descripción.

**Filtros** (`js/ui.js`, `js/components/products.js`)
- Botones por categoría + `<select>` de ordenamiento (menor precio / mayor precio / últimos ingresos).
- "Últimos ingresos" ordena por **posición en el array**, no por fecha. Es un proxy que funciona mientras se agreguen productos arriba, pero es frágil e implícito.

**Checkout → WhatsApp** (`js/components/modals.js`)
- Modal con formulario: nombre, teléfono, provincia, ciudad, CP, dirección, forma de entrega, forma de pago, notas.
- `buildCheckoutMessage()` arma el texto y abre `https://wa.me/${WHATSAPP_NUMBER}?text=...`.
- **Este flujo está bien pensado y se conserva tal cual conceptualmente.** El mensaje generado hoy es:

```
Hola ONLY ZS! Quiero coordinar esta compra:

- 1 x Bermuda Dickies Beige ($25.000)
Total productos: $25.000

Datos de entrega:
Nombre: ...
Teléfono: ...
Provincia: ...
Ciudad: ... (CP: ...)
Dirección: ...
Entrega: ...
Pago: ...
Notas: ...
```

**Galería** (`js/components/gallery.js`)
- Grilla + lightbox con teclado (←/→/Esc), swipe táctil, contador y preload de la foto siguiente/anterior. Está bien resuelto.

**Colaboraciones** (`brand.html`)
- Una sola plantilla que se rellena según `?brand=`. Buena idea, mala ejecución (ver §4).

**Producto**
- No hay página de producto. Hay un modal tipo Instagram con galería, thumbs, zoom con lupa en desktop, swipe en mobile, navegación entre productos y botón de compartir que genera `?producto=id`.
- Al entrar con `?producto=id`, `app.js` abre el panel de productos y hace `setTimeout(..., 400)` para abrir el modal. **Es la única forma de "linkear" un producto, y para Google no existe.**

### 2.4 Imágenes

```
assets/images/
├── Productos/        280 MB   (349 archivos originales, hasta 10,4 MB c/u)
├── Galeria-ZS/       4,9 MB
├── Brand/            612 KB
└── optimized/        110 MB
    ├── sm/           (~600px, JPG)   ← usada en grillas y thumbs
    └── lg/           (~1200px, JPG)  ← usada en modales y lightbox
```

Total: **395 MB, 1.048 archivos**.

El sistema funciona así: `getOptimizedImage(src, 'sm')` transforma
`assets/images/Productos/X/foto.jpg` en
`assets/images/optimized/sm/assets/images/Productos/X/foto.jpg`
(sí, la ruta original queda anidada dentro de la optimizada), y si esa versión no existe, un listener global de `error` hace fallback al original de 10 MB.

Lo bueno: el fallback evita imágenes rotas y hay dos tamaños reales.
Lo malo: **solo hay JPG** (nada de AVIF/WebP), los tamaños se generan a mano fuera del repo, la ruta duplicada es confusa, y si falta una versión optimizada el navegador se descarga el original completo.

Verificado: **las 327 referencias de imagen de `data.js` existen en disco. Cero rotas.** Hay 34 originales sin usar, casi todos de productos que están comentados dentro de `data.js`.

### 2.5 PWA

- `manifest.json` correcto (nombre, colores `#0D0D0D` / `#FAFAFA`, iconos apuntando todos al mismo PNG).
- `sw.js` de 24 líneas con estrategia **cache-first sin versionado**: cachea 4 archivos en el install y después responde `caches.match()` antes que la red. Consecuencia real: **un usuario que ya visitó el sitio puede seguir viendo la versión vieja indefinidamente**, porque `index.html` cacheado nunca se revalida.

### 2.6 Identidad visual actual

Extraída de `css/styles.css`:

| Token | Valor | Uso |
|---|---|---|
| `--color-dark` | `#0D0D0D` | Negro base, navbar, botones |
| `--color-bg` | `#FAFAFA` | Fondo |
| `--color-accent` | `#BFA16A` | Dorado apagado (tags, hovers, precios) |
| `--color-gray` | `#6B6B6B` | Texto secundario |
| `--color-border` | `#E8E8E6` | Bordes |
| night-mode | `#E8D9C3` sobre `#0D0D0D` | **Código muerto: existe el CSS, no existe el toggle** |

- **Tipografía display:** Bebas Neue (condensada, mayúsculas, `letter-spacing: 1px`)
- **Tipografía de texto:** Poppins (300–600)
- **Iconos:** Font Awesome 6.4 completo desde CDN, para usar 41 iconos
- **Radios:** 4px / 12px. **Sombras:** tres niveles. **Transición:** `0.35s cubic-bezier`

### 2.7 Tono y textos (esto es lo más valioso del proyecto)

El copy actual **no es genérico**, y ese es exactamente el activo que hay que preservar. Ejemplos reales:

> "Por favor, tenga en cuenta que los artículos de segunda mano pueden venir con leves defectos. **Vintage no significa perfecto. Si quieres artículos perfectos compra nuevos.**"

> "no hay mucho que decir sobre esta prenda, joyon vintage coleccionable, además colores de bokita viejo"

> "Culto A Las Calles documenta la escena desde adentro: spots, sesiones nocturnas, ruedas gastadas y ese pulso de calle que no se fabrica."

> "Talle: Único AC (Apto Cabezones)"

Es español rioplatense, directo, con jerga real, con errores de tipeo ocasionales y con humor. **No se reescribe, no se "profesionaliza", no se traduce a lenguaje de marketing.** Se migra literal.

Datos duros de la marca:
- **ONLY ZS** = Only Zona Sur · Instagram [@only_zonasur](https://www.instagram.com/only_zonasur/)
- **WhatsApp:** 3804151730 (La Rioja, Argentina)
- **Ubicación:** Zona Sur, La Rioja, Argentina
- **Marcas que trabaja** (del marquee): Carhartt, Chaps, Dickies, Jansport, Nautica, Polo Ralph Lauren, Real Tree, Russell

---

## 3. Inventario de contenido a migrar

**58 productos**

| Categoría actual | Cantidad |
|---|---|
| Abrigos | 18 |
| Remeras | 18 |
| Pantalones | 11 |
| Accesorios | 3 |
| Buzos | 3 |
| Camisas | 3 |
| Camisetas | 2 |

| Estado | Cantidad |
|---|---|
| Disponible (`inStock: true`) | 18 |
| Vendido | 36 |
| Próximamente | 4 |

- **Precios de lo disponible:** $15.000 – $95.000 (mediana ≈ $28.000)
- **Fotos por producto:** de 0 a 8 (promedio 5,6)
- **Galería ZS:** 33 fotos
- **Colaboraciones:** 3 entradas, pero **solo 1 real** (Culto A Las Calles). Las otras dos son placeholders con el mismo texto duplicado y apuntan a `HERO-ZS.png`.
- **Marcas detectables en los nombres:** Polo Ralph Lauren (12), Nautica (5), Champion (5), Dickies (4), Carhartt (3), L.L. Bean (3), Columbia (2), Nike (2), Real Tree (2), Chaps (2), y 1 c/u de Levi's, Tommy Hilfiger, Missoni, Dockers, Adidas, Wrangler, Lacoste, Casio, John Deere, Goodyear, Russell, Gildan.

Además, comentados dentro de `data.js` hay **9 productos más** con fotos ya subidas (Camiseta Alemania, Chomba Lacoste, Bermuda Dickies gris, Nautica x2, etc.). Se migran como borradores, no se pierden.

---

## 4. Problemas detectados (todos verificados en el código)

Estos no son "code smells" teóricos. Los comprobé uno por uno.

### Rompen funcionalidad hoy

| # | Problema | Evidencia | Impacto |
|---|---|---|---|
| 1 | **El botón "Agregar al carrito" del Suéter Levi's está roto** | `id: "sueter-levi's"` (`data.js:209`) se interpola en `onclick="addToCart('${prod.id}')"` (`products.js:35`) → genera `addToCart('sueter-levi's')`, que es un error de sintaxis JS | Un producto **disponible a $30.000** no se puede agregar al carrito |
| 2 | **La categoría "Buzos" es inalcanzable** | 3 productos tienen `category: "Buzos"`, pero `index.html:299-305` solo tiene botones para Remeras, Camisas, Pantalones, Abrigos, Camisetas y Accesorios | 3 productos (incluido el Hoodie Champion Pink a $50.000, disponible) no aparecen bajo ningún filtro |
| 3 | **La colaboración "Deep Indumentaria" muestra la marca equivocada** | El link es `?brand=deep-indumentaria`, `brand.html:502` hace `.toLowerCase()`, pero la clave en los datos es `key: "Deep-Indumentaria"` (con mayúsculas) → no matchea → cae al fallback `collaborationsData[0]` | Clickear Deep Indumentaria abre **Culto A Las Calles** |
| 4 | **Imagen rota en la home** | `index.html:336` apunta a `.../Brand/Deep-Indumentaria/HERO-DEEP-INDUMENTARIA.jpg`; esa carpeta **no existe** (solo existe `Brand/Culto-A-Las-Calles/`) | Tarjeta de colaboración sin fondo |
| 5 | **5 productos muestran "$0"** | `price: 0` en `wrangler-workwear-carpenter`, `remera-gildan-brockport-ml`, `chomba-polo-azul-lisa`, `chomba-polo-golf-rayas`, `chomba-polo-verda-ml` | Se renderiza `$0` como precio real |
| 6 | **El Service Worker sirve contenido viejo para siempre** | `sw.js`: cache-first sin versionado ni `skipWaiting` | Usuarios recurrentes pueden no ver actualizaciones del catálogo |
| 7 | **Ordenar por precio produce resultados aleatorios** | `app.js:92` hace `a.price - b.price` sobre productos con `price: null` → `NaN` | El orden se rompe cuando hay vendidos en la lista |

### Datos contradictorios

| Producto | Contradicción |
|---|---|
| `remera-champion` | `badge: "NUEVO"` + `inStock: false` + `isComingSoon: true` + **sin fotos** (usa HERO-ZS de placeholder) |
| `campera-puffer-polo-ralph-lauren` | **sin fotos**, usa HERO-ZS de placeholder |
| `carhartt-carpenter-jean` | `badge: "NUEVO"` pero `inStock: false` |
| `remera-gildan-brockport-ml` | `badge: "NUEVO"` + `inStock: false` + `price: 0` |
| `chomba-polo-azul-lisa`, `chomba-polo-golf-rayas`, `chomba-polo-verda-ml` | ídem: NUEVO + vendido + $0 |
| 8 productos | `isComingSoon` directamente **no existe** en el objeto (queda `undefined`) |
| 3 productos | `badge` **no existe** en el objeto |

Causa raíz: **cuatro flags independientes para un solo concepto.** Un producto puede ser simultáneamente "nuevo", "vendido" y "próximamente" sin que nada lo impida.

### Arquitectura y mantenibilidad

- **HTML dentro de strings de JS con `onclick` inline** en toda la app. Es la causa del bug #1 y hace imposible cambiar el diseño de una tarjeta sin editar JavaScript.
- **`app.js` parchea funciones en runtime**: `window.renderProducts = function(data) { ... originalRender(data) ... }` (`app.js:226`). El comportamiento depende del orden de ejecución.
- **Tres `MutationObserver`** vigilando el DOM para: inyectar la segunda imagen en hover, inyectar estados vacíos, e inyectar botones en los toasts. Es reconstruir la UI *después* de renderizarla.
- **CSS inline en `<head>`**: 60 líneas en `index.html`, ~150 en `brand.html`, además de las 2.211 de `styles.css`.
- **`brand.html` tiene 270 líneas de JS propio** que duplican lógica de `ui.js` (búsqueda, menú mobile, modales de info).
- **Font Awesome completo desde CDN** (~30 KB CSS + fuentes) para 41 iconos.
- **Código muerto**: todo el bloque `night-mode` (~40 líneas de CSS, sin toggle) y el `custom-cursor` de `scroll.js` (no existe el elemento en ningún HTML).
- **Meta incorrecta**: `index.html:8` dice `Misiones` en las keywords. La marca es de **La Rioja**.

### SEO

- **No hay una sola URL de producto.** 58 productos, 1 URL.
- No hay `sitemap.xml`, ni `robots.txt`, ni structured data, ni canonical.
- `og:image` apunta al logo, no a la foto del producto.
- `gallery.html` y `brand.html` comparten título y descripción genéricos.

### Accesibilidad

Ya hay un análisis previo en el repo (`ANALISIS_ERRORES_ACCESIBILIDAD.md`) y algunas correcciones aplicadas: skip link, focus trap en `accessibility.js`, `aria-label` en los botones de ícono. Lo que queda:

- Los modales se abren/cierran con clases CSS, sin `aria-modal`/`role="dialog"` consistente ni devolución del foco al cerrar.
- Las tarjetas de producto son `<div>` con `click` listener, no links ni botones → no se alcanzan con teclado.
- Los `alt` son el nombre del producto repetido; en la galería son "Galería ZS foto 12".
- El dorado `#BFA16A` sobre blanco da un contraste de ~2,6:1 → **no pasa WCAG AA** para texto pequeño.

---

## 5. Qué se conserva, qué se elimina, qué se reconstruye

### Se conserva (contenido e ideas, no código)

| Qué | Por qué |
|---|---|
| Los 58 productos con nombres, precios, descripciones y fotos | Es el contenido. Se migra literal, incluidos los typos y la jerga |
| Los 9 productos comentados en `data.js` | Tienen fotos ya subidas; pasan a `status: "draft"` |
| Las 33 fotos de Galería ZS | Ídem |
| Culto A Las Calles completo (texto, links, video de YouTube, 4 fotos) | Es la única colaboración real |
| Checkout por WhatsApp con formulario de entrega | El modelo de negocio. Se conserva el flujo y el formato del mensaje |
| Carrito y wishlist en `localStorage` | Correcto para este caso. Sin backend |
| Límite de 1 unidad por pieza | Correcto para vintage 1/1. Ahora explícito, no accidental |
| Lightbox con teclado + swipe + preload | Bien resuelto, se reimplementa igual |
| Galería de producto con thumbs y navegación | Buena UX |
| Textos de Info / Envíos / Devoluciones / FAQ | Contenido real de la marca |
| Marquee de marcas | Detalle de identidad, barato y con carácter |
| Negro `#0D0D0D` + off-white como base | Es la identidad |
| Bebas Neue como display | Es la identidad |
| PWA (manifest) | Útil, se reescribe el SW |

### Se elimina

| Qué | Por qué |
|---|---|
| Los 3 archivos HTML y sus `<script>` inline | Se reemplazan por rutas de Next.js |
| `css/styles.css` (2.211 líneas) | Se reemplaza por Tailwind + tokens |
| Todo `js/` (~2.800 líneas) | Se reemplaza por componentes React + `lib/` |
| Bloque `night-mode` completo | Código muerto, sin toggle |
| `custom-cursor` en `scroll.js` | Código muerto, sin elemento en el DOM |
| Los 3 `MutationObserver` | React re-renderiza; no hace falta vigilar el DOM |
| El monkey-patch de `renderProducts` | Antipatrón |
| `onclick` inline en strings HTML | Causa del bug #1 |
| Font Awesome desde CDN | Se reemplaza por SVGs inline (solo los ~15 iconos que se usan) |
| Campo `image` (duplica `images[0]`) | Dato redundante |
| Campo `badge` como string libre | Se deriva del estado |
| `originalPrice` | 58 de 58 productos lo tienen en `null`. Se conserva el campo en el tipo por si se usa, pero deja de ser obligatorio |
| Carpeta `assets/images/optimized/` (110 MB) | La reemplaza `next/image` |
| `js/accessibility.js` | La accesibilidad se resuelve en los componentes, no como parche posterior |
| `ANALISIS_ERRORES_ACCESIBILIDAD.md`, `CAMBIOS_APLICADOS.md`, `SOLUCIONES_CODIGO.md`, `README_ANALISIS.md` | Documentos de auditoría del sitio viejo. Se archivan en `legacy/` |
| Iconos de tarjeta Visa/Mastercard del footer | No se paga en la web; es ruido que confunde |

### Se reconstruye

| Qué | Cómo cambia |
|---|---|
| **Página de producto** | De modal a **ruta real** `/producto/[slug]` con metadata y structured data propios. El modal desaparece |
| **Sistema de estados** | De 4 booleanos contradictorios a **1 campo `status` + 2 flags independientes** |
| **Catálogo** | De grilla rígida a **masonry editorial** con proporciones variables |
| **Búsqueda** | Ahora incluye **marca, talle y tags**, no solo nombre y categoría. Una sola implementación, no dos |
| **Filtros** | Se agrega **marca** y se arregla la categoría huérfana. Orden por precio ignorando los vendidos |
| **Datos** | De 3 globales sin tipo a **módulos TypeScript tipados** con `brand`, `size`, `condition`, `measurements` y `tags` extraídos |
| **Imágenes** | De carpeta paralela manual a **`next/image`** con AVIF/WebP y `sizes` automáticos |
| **Colaboraciones** | De `?brand=` con bug de mayúsculas a `/colaboraciones/[slug]` |
| **Galería** | Misma UX, layout masonry, lightbox accesible |
| **Service Worker** | De cache-first roto a **network-first para HTML**, o directamente se elimina si no aporta |
| **Checkout** | Misma UX y mismo mensaje, pero la lógica sale a `lib/whatsapp.ts` con tests |

---

## 6. Arquitectura propuesta

**Next.js 15 (App Router) + TypeScript estricto + Tailwind CSS 4 + React 19.**
Deploy en **Vercel**, dominio `onlyzs.com.ar` apuntado ahí.

Principios:

1. **Server Components por defecto.** El catálogo, la ficha de producto, la galería y las colaboraciones son contenido estático: se renderizan en el servidor y llegan como HTML. No necesitan JavaScript para verse.
2. **Client Components solo donde hay estado del navegador**: carrito, wishlist, búsqueda, filtros, lightbox y menú. Son islas pequeñas dentro de páginas de servidor.
3. **Los datos son módulos TypeScript**, no JSON ni CMS. Se importan, se tipan y se validan en tiempo de compilación: si escribís mal una categoría, `npm run build` falla antes de publicar.
4. **La lógica de negocio no vive en componentes.** Carrito, wishlist, WhatsApp, filtros y búsqueda son funciones puras en `lib/`, testeables sin renderizar nada.
5. **Cero dependencias que no ganen su lugar.** Sin librería de estado, sin librería de animación, sin librería de iconos, sin librería de masonry (CSS columns alcanza).

Dependencias previstas (lista completa):

```
next  react  react-dom  tailwindcss  typescript
vitest  (solo desarrollo, para los tests de lib/)
```

Estado global: **React Context + `useSyncExternalStore` sobre `localStorage`**, escrito a mano en `lib/`. Son ~60 líneas y evitan una dependencia externa para dos arrays.

---

## 7. Estructura de carpetas

```
ONLY-ZS/
├── legacy/                      ← TODO el sitio actual, intacto, como referencia
│   ├── index.html  gallery.html  brand.html
│   ├── css/  js/  docs/  sw.js  manifest.json
│   └── README.md                ← explica que esto es archivo histórico
│
├── public/
│   ├── images/
│   │   ├── products/            ← movido desde assets/images/Productos/
│   │   ├── gallery/             ← movido desde assets/images/Galeria-ZS/
│   │   ├── collaborations/      ← movido desde assets/images/Brand/
│   │   ├── brand/               ← logo, hero
│   │   └── placeholder.svg      ← fallback visible cuando falta una foto
│   ├── robots.txt
│   └── CNAME                    ← se conserva por si vuelve a GitHub Pages
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    header, footer, providers, fuentes
│   │   ├── page.tsx                      HOME
│   │   ├── globals.css                   tokens + Tailwind
│   │   ├── tienda/page.tsx               catálogo completo con filtros
│   │   ├── producto/[slug]/page.tsx      ficha de producto
│   │   ├── categoria/[slug]/page.tsx     catálogo filtrado por categoría
│   │   ├── galeria/page.tsx              Galería ZS
│   │   ├── colaboraciones/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── carrito/page.tsx              carrito + checkout
│   │   ├── favoritos/page.tsx
│   │   ├── sitemap.ts                    generado desde los datos
│   │   ├── not-found.tsx
│   │   └── opengraph-image.tsx
│   │
│   ├── components/
│   │   ├── layout/       Header, Footer, Marquee, Container
│   │   ├── products/     ProductGrid (masonry), ProductCard, ProductGallery,
│   │   │                 ProductMeta, RelatedProducts, StatusBadge
│   │   ├── cart/         CartButton, CartDrawer, CartLine, CheckoutForm
│   │   ├── wishlist/     WishlistButton, WishlistDrawer
│   │   ├── gallery/      GalleryGrid, Lightbox
│   │   ├── search/       SearchDialog, SearchResults
│   │   ├── filters/      FilterBar, SortSelect, MobileFilterSheet
│   │   └── ui/           Button, Drawer, Dialog, Field, Icon, Price
│   │
│   ├── data/
│   │   ├── products.ts        los 58 + los 9 borradores
│   │   ├── categories.ts
│   │   ├── brands.ts
│   │   ├── collaborations.ts
│   │   ├── gallery.ts
│   │   └── site.ts            WhatsApp, redes, textos de Info/Envíos/FAQ
│   │
│   ├── lib/
│   │   ├── cart.ts            funciones puras + store
│   │   ├── wishlist.ts
│   │   ├── whatsapp.ts        construcción del mensaje
│   │   ├── search.ts
│   │   ├── filters.ts
│   │   ├── format.ts          precios en ARS
│   │   └── seo.ts             metadata + JSON-LD
│   │
│   └── types/
│       └── index.ts           Product, Category, Collaboration, CartLine...
│
├── tests/                     vitest sobre lib/
├── MIGRATION.md               este archivo
├── README.md
├── CUSTOMIZATION.md           guía para vos, sin tecnicismos
└── AI_CONTEXT.md              contexto para futuras IAs
```

La carpeta `legacy/` se crea con `git mv`, así que **el historial de git de cada archivo se conserva**. Las imágenes también se mueven (no se copian): el repo no crece.

---

## 8. Estrategia de productos

### El tipo

```ts
export type ProductStatus = 'available' | 'sold' | 'coming-soon' | 'draft';

export interface Product {
  slug: string;              // identidad y URL: /producto/{slug}
  name: string;
  brand: string;             // NUEVO: extraído del nombre
  category: CategorySlug;    // unión de strings, no string libre
  price: number | null;      // null cuando no corresponde mostrar precio
  status: ProductStatus;
  isNew: boolean;            // independiente del status
  featured: boolean;         // independiente del status
  size: string | null;       // NUEVO: extraído de description
  condition: string | null;  // NUEVO: "10/10", extraído de description
  measurements: string | null; // NUEVO: "Largo: 68cm · Ancho: 58cm"
  description: string;       // el texto tal cual, sin las líneas extraídas
  images: string[];          // rutas desde /images/products/...
  tags: string[];            // NUEVO: marca, color, tipo de prenda
}
```

Cambios respecto de hoy y por qué:

- **`id` → `slug`.** Un solo campo que es identidad y URL. De paso se arregla el apóstrofo: `sueter-levi's` → `sueter-levis`.
- **`status` reemplaza a `inStock` + `isComingSoon` + `badge`.** Los estados contradictorios se vuelven imposibles de escribir.
- **`isNew` y `featured` quedan independientes**, como pediste: son etiquetas, no estados.
- **`brand` sale del nombre** y habilita filtro y búsqueda por marca.
- **`size`, `condition` y `measurements` salen de `description`** con un script de migración que reviso a mano producto por producto. El resto de la descripción (la parte con voz, la que dice "colores de bokita viejo") queda intacta en `description`.
- **`price: null` es válido** para vendidos y próximamente. La interfaz nunca muestra "$0": muestra "Vendido" o "Próximamente".
- **Se elimina `image`** (era `images[0]`).

### Reglas de negocio explícitas

| Regla | Dónde vive |
|---|---|
| Solo `status: 'available'` se puede agregar al carrito | `lib/cart.ts` |
| Máximo 1 unidad por pieza (vintage 1/1) | `lib/cart.ts`, constante `MAX_QTY_PER_ITEM = 1` |
| Los `draft` no se renderizan ni entran al sitemap | `data/products.ts`, función `getPublicProducts()` |
| Ordenar por precio excluye los que no tienen precio | `lib/filters.ts` |
| El orden por defecto es el del array (últimos ingresos arriba) | `data/products.ts`, documentado |

### Migración de los datos

Escribo un script de un solo uso que lee `legacy/js/data.js`, parsea los 58 objetos, extrae talle/estado/medidas de las descripciones y emite `src/data/products.ts`. **Después reviso el resultado producto por producto a mano** — son 58, es perfectamente revisable, y los datos de origen tienen inconsistencias que ningún parser va a resolver bien solo.

Corrección de los 17 productos con datos contradictorios, con criterio explícito:

- `price: 0` + vendido → `price: null`, `status: 'sold'`
- `badge: "NUEVO"` + `inStock: false` → `isNew: true`, `status: 'sold'` (la etiqueta se conserva, el estado se corrige)
- Sin fotos + `HERO-ZS` de placeholder → `status: 'draft'` (`remera-champion`, `campera-puffer-polo-ralph-lauren`)
- `isComingSoon`/`badge` ausentes → se resuelven explícitamente
- Los 9 comentados → `status: 'draft'`

### Categorías

Hoy hay 7 categorías con solapamiento real: "Buzos" (3 productos) no tiene filtro, y "Remeras" mezcla remeras, chombas y musculosas mientras "Camisetas" (2) son camisetas de fútbol.

Propuesta — **6 categorías, ninguna huérfana**:

| Slug | Nombre | Absorbe |
|---|---|---|
| `abrigos` | Abrigos | Abrigos + **Buzos** (camperas, buzos, hoodies, suéters, chalecos) |
| `remeras` | Remeras y chombas | Remeras |
| `camisas` | Camisas | Camisas |
| `pantalones` | Pantalones y shorts | Pantalones |
| `camisetas` | Camisetas | Camisetas (deportivas / de fútbol) |
| `accesorios` | Accesorios | Accesorios |

El tipo de prenda fino (hoodie, suéter, chaleco, chomba, musculosa) pasa a `tags`, que es donde pertenece: sirve para buscar sin multiplicar categorías. **Esto es reversible en un archivo** (`data/categories.ts`) y queda documentado en CUSTOMIZATION.md.

---

## 9. Estrategia de imágenes

### Reorganización

```
assets/images/Productos/Abrigos/Buzos/BUZO-NIKE-C-CAPUCHA/BUZO-NIKE-C-CAPUCHA-1.jpg
                    ↓  git mv, aplanando la jerarquía redundante
public/images/products/buzo-nike-capucha/1.jpg
```

Una carpeta por producto, nombrada con el slug, fotos numeradas. Ventaja concreta: **para agregar fotos a un producto, creás una carpeta con su slug y tirás los archivos adentro.** No hay que replicar el árbol Categoría/Subcategoría/PRODUCTO en mayúsculas.

`assets/images/optimized/` (110 MB) **se elimina**: Next.js genera los tamaños. El repo baja de 395 MB a ~285 MB.

### Optimización

`next/image` en Vercel, con `next.config.ts`:

```ts
images: { formats: ['image/avif', 'image/webp'] }
```

Cada imagen sale servida en AVIF (o WebP como fallback), al tamaño exacto que el dispositivo necesita, con `lazy loading` nativo y `width`/`height` para que no haya salto de layout.

Reglas por contexto:

| Dónde | `sizes` | `priority` |
|---|---|---|
| Primeras 4 tarjetas del catálogo | `(max-width: 640px) 50vw, 25vw` | sí |
| Resto del catálogo | igual | no (lazy) |
| Foto principal de producto | `(max-width: 1024px) 100vw, 55vw` | sí |
| Thumbs | `80px` | no |
| Galería | `(max-width: 640px) 50vw, 33vw` | primeras 2 |

**Los originales de 10 MB nunca llegan al navegador**, pero **no se borran del repo**: son la fuente de la que Next genera todo, y sirven si algún día querés reprocesarlas.

### Cuando falta una foto

`components/ui/ProductImage.tsx` muestra `placeholder.svg` (una marca de agua ONLY ZS discreta, no un ícono roto) si la ruta no existe. Así el sitio nunca se ve roto mientras reorganizás fotos.

### Recomendación al subir fotos nuevas

Documentado en CUSTOMIZATION.md: exportar a **1600px de lado mayor, JPG calidad 80** antes de subir. Next optimiza igual, pero mantiene el repo liviano y los deploys rápidos. No hace falta generar AVIF/WebP a mano nunca más.

---

## 10. Estrategia SEO

El cambio más grande del proyecto: **de 3 URLs a ~75 URLs indexables.**

| Ruta | Cantidad |
|---|---|
| `/` | 1 |
| `/tienda` | 1 |
| `/producto/[slug]` | 58 |
| `/categoria/[slug]` | 6 |
| `/colaboraciones` + `/colaboraciones/[slug]` | 2 |
| `/galeria`, `/carrito`, `/favoritos` | 3 |

Implementación:

- **`generateMetadata()` por ruta**: title, description, canonical, Open Graph y Twitter card. La descripción de un producto sale de su descripción real, recortada — no de una plantilla.
- **`opengraph-image`**: la foto principal del producto. Hoy todo comparte el logo.
- **JSON-LD**:
  - `Product` + `Offer` en cada ficha, con `availability` mapeada desde `status` (`InStock` / `SoldOut` / `PreOrder`) y `itemCondition: UsedCondition` — que es literalmente lo que vende ONLY ZS.
  - `BreadcrumbList` en producto y categoría.
  - `Organization` + `LocalBusiness` en el layout (La Rioja, Argentina).
- **`sitemap.ts`** generado desde `data/products.ts`: agregar un producto lo agrega al sitemap solo.
- **`robots.txt`** con `/carrito` y `/favoritos` excluidos.
- **`lang="es-AR"`**.
- Se corrige la keyword `Misiones` → `La Rioja`.

---

## 11. Estrategia de rendimiento

Orden de prioridades, como pediste: imágenes → HTML → JS → fuentes → CSS → requests → caché.

**Imágenes** (es el 95% del peso de este sitio)
- AVIF/WebP responsive vía `next/image`
- `priority` solo en lo above-the-fold; lazy en todo lo demás
- `width`/`height` siempre → CLS ≈ 0
- Sin la carpeta `optimized/` de 110 MB

**HTML**
- Todas las páginas prerenderizadas estáticamente en el build (`generateStaticParams` para productos, categorías y colaboraciones). Llegan como HTML puro desde CDN.

**JavaScript**
- Server Components por defecto. El JS del cliente se limita a carrito, wishlist, búsqueda, filtros, lightbox y menú.
- Cero librerías de estado/animación/iconos.
- Iconos como SVG inline: **~15 iconos en vez de los ~30 KB de Font Awesome**.
- Objetivo: **< 90 KB de JS** en la home.

**Fuentes**
- `next/font/google` → se auto-hospedan en el dominio (sin `preconnect` a Google, sin FOUT), con `display: swap` y subset latino.
- Dos familias, no más.

**CSS**
- Tailwind purga lo no usado. De 2.211 líneas fijas a lo que realmente se usa.
- Los tokens de marca viven en `globals.css` con `@theme`, en un solo lugar.

**Requests**
- Se eliminan las 3 conexiones externas actuales (Google Fonts × 2 + CDN de Font Awesome). **Todo se sirve desde el propio dominio.**

**Caché**
- Vercel CDN con `immutable` para assets con hash.
- Service Worker: **network-first para documentos**, cache-first solo para imágenes y estáticos versionados. Si al terminar no aporta nada medible, se elimina — un SW mal hecho es peor que ninguno (bug #6).

**Objetivos medibles** (Lighthouse móvil, 4G simulado):

| Métrica | Objetivo |
|---|---|
| LCP | < 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| Performance | ≥ 95 |
| Accesibilidad | 100 |
| SEO | 100 |

---

## 12. Dirección de diseño

No son "buenas prácticas". Son decisiones, con su razón.

### Punto de partida

La identidad actual es negro + off-white + Bebas Neue. **Eso se queda: es ONLY ZS.**
Lo que cambia es lo que se le agregó encima y no pertenece a la marca:

- **El dorado `#BFA16A` se retira como color decorativo.** Es un código visual de "old money / catálogo de lujo", no de ropa de calle. Además no pasa contraste AA sobre blanco. Se conserva como token (`--color-accent`) para que puedas revivirlo cambiando una línea, pero por defecto **el único color de la página es el de las fotos**.
- **Poppins se retira.** Es la tipografía por defecto de las plantillas genéricas y es el rasgo que más hace que un sitio "parezca hecho por IA". Se reemplaza por una grotesca editorial (**Archivo**), que sostiene mejor los textos chicos y los labels espaciados.
- **Bebas Neue se queda** como display. Es el ancla de continuidad visual con lo que ya existe.

### Sistema

**Color** — dos tonos y las fotos.

```
--ink:      #0D0D0D    negro base (se conserva)
--paper:    #F7F6F3    off-white, apenas más cálido que el #FAFAFA actual
--ash:      #6B6B6B    texto secundario (se conserva)
--line:     #DEDCD6    hairlines
--accent:   #BFA16A    presente, en reposo
```

**Tipografía** — dos familias, tres roles.

| Rol | Familia | Tratamiento |
|---|---|---|
| Display | Bebas Neue | `clamp(2.5rem, 9vw, 7rem)`, `leading: 0.85`, mayúsculas |
| Texto | Archivo | 15–16 px, `leading: 1.6` |
| Micro-label | Archivo | 10–11 px, `tracking: 0.18em`, mayúsculas — para numeración, categorías, estados |

Los micro-labels son la firma editorial: `01 / 58`, `DICKIES`, `TALLE 40 US`, `10/10`. Texto chico, muy espaciado, en gris. Eso es lo que hace que una página se lea como archivo y no como e-commerce.

**Grid** — masonry por CSS columns, sin librería.

- Mobile: 2 columnas · Tablet: 3 · Desktop: 4 · ≥1600px: 5
- `gap`: 8 px mobile, 12 px desktop (**chico a propósito**: junta las fotos y hace bloque)
- Las alturas varían porque **se respeta la proporción real de cada foto**, no se recortan todas a 4:5. Ahí está el flujo orgánico que pediste, y sale de la fotografía real, no de aleatoriedad simulada.

**Tarjeta de producto**

```
[ FOTOGRAFÍA — proporción original ]
DICKIES                        ← micro-label, gris
Bermuda Dickies Beige          ← nombre
$25.000                        ← precio
```

Sin borde, sin sombra, sin fondo, sin radio, sin botón. La tarjeta **es** la foto. Toda la tarjeta es un `<a>` (funciona con teclado y con click derecho → abrir en pestaña nueva, cosa que hoy no funciona).

El corazón de favoritos aparece arriba a la derecha en hover en desktop, y está **siempre visible en mobile** (donde no hay hover). Agregar al carrito se hace en la ficha del producto, no en la grilla: una grilla llena de botones es exactamente el aspecto de plantilla que no querés.

**Espacio**

Ritmo de 8 px. Secciones separadas por espacio en blanco grande (96–160 px), no por líneas divisorias ni tarjetas con fondo. El aire es el que ordena.

**Detalles con intención** (ninguno decorativo por decorar)

- Numeración de productos `01 / 58` — es un archivo, y se lee como archivo
- Header desalineado: el logo pisa el margen izquierdo, la navegación se apoya en la base
- El marquee de marcas se conserva
- Hairlines de 1px en `--line`, nunca sombras
- Radio de borde: **0**. Rectángulos.

**Movimiento**

- Fade + 8px de subida al entrar en viewport, 300 ms, una sola vez
- Cross-fade a la segunda foto en hover (200 ms)
- Drawer con `transform`, 250 ms
- `prefers-reduced-motion: reduce` desactiva todo
- Nada de parallax, nada de loaders, nada que corra en scroll

### Home

Sin hero gigante con eslogan inventado. La estructura:

```
1. Header
2. Bloque de apertura     una foto grande + "ONLY ZS" + la línea que ya existe:
                          "VINTAGE · SECOND HAND · SELECCIONADO A MANO"
3. Marquee de marcas
4. ÚLTIMO INGRESO         6–8 productos en masonry, directo, sin intro
5. Corte editorial        foto ancha de Galería ZS + la frase real de la marca:
                          "Vintage no significa perfecto."
6. Categorías             6 bloques tipográficos sobre foto, sin botones
7. Colaboraciones         Culto A Las Calles, formato editorial
8. Galería ZS             tira de fotos + link
9. Footer
```

Un producto está visible **sin scrollear** en mobile. No hay "Descubrí tu estilo", no hay tres cards iguales, no hay testimonios, no hay CTA final.

---

## 13. Plan de trabajo

Todas las fases están **completas**.

| Fase | Qué | Entregable |
|---|---|---|
| 1 ✅ | Análisis | este documento |
| 2 ✅ | `git mv` del sitio viejo a `legacy/`, scaffold de Next.js 16, tokens, layout base | proyecto que levanta |
| 3 ✅ | Tipos + migración de los 58 productos + 4 borradores, categorías, marcas, colabs, galería, textos | `src/data/` completo y revisado |
| 4 ✅ | Header, footer, marquee, sistema tipográfico, `globals.css` | identidad visual en pantalla |
| 5 ✅ | Grilla editorial + `ProductCard` + `/tienda` + `/categoria/[slug]` | catálogo navegable |
| 6 ✅ | `/producto/[slug]` con galería, metadata y relacionados | 56 URLs reales |
| 7 ✅ | Carrito (`lib/cart.ts` + panel + `/carrito`) | carrito funcionando |
| 8 ✅ | Favoritos (`lib/wishlist.ts` + panel + `/favoritos`) | favoritos funcionando |
| 9 ✅ | `lib/whatsapp.ts` + formulario de checkout | flujo de compra completo |
| 10 ✅ | Búsqueda + filtros + orden, resueltos en el servidor vía URL | descubrimiento |
| 11 ✅ | `/galeria` con visor + `/colaboraciones` + `/info/[slug]` | contenido editorial |
| 12 ✅ | Metadata por página, JSON-LD, sitemap, robots, redirects del sitio viejo | SEO |
| 13 ✅ | Reorganización de `public/images/`, medición de fotos, `sizes`, prioridades | imágenes optimizadas |
| 14 ✅ | Responsive, teclado, foco, contraste WCAG AA, `reduced-motion` | accesibilidad |
| 15 ✅ | README.md, CUSTOMIZATION.md, AI_CONTEXT.md, comentarios en cada componente | documentación |
| 16 ✅ | 65 tests, `npm run build`, `npm run lint`, `npm run typecheck` en verde | listo para deploy |

### Resultado medido

| | Sitio viejo | Sitio nuevo |
|---|---|---|
| URLs indexables | 3 | 71 |
| Páginas de producto | 0 (todo en un modal) | 56 |
| Peso del repositorio (imágenes) | 395 MB | 285 MB |
| CSS | 2.211 líneas fijas | 38 KB → **7,8 KB** comprimido |
| HTML de la home | — | **16 KB** comprimido |
| Conexiones a servidores externos | 3 (Google Fonts ×2, CDN de Font Awesome) | **0** |
| Formatos de imagen | JPG generado a mano en 2 tamaños | AVIF/WebP en 6 anchos, automático |
| Dependencias de producción | — | 3 (`next`, `react`, `react-dom`) |
| Tests | 0 | 65 |
| Datos contradictorios | 17 de 58 productos | 0 (imposibles por diseño) |
| Contraste de color | el dorado no pasaba AA | todo pasa WCAG AA |

---

## 14. Fuera de alcance (documentado, no implementado)

Como pediste, esto queda anotado como evolución futura y **no se construye ahora**:

- Pagos online (MercadoPago Checkout Pro sería el camino natural)
- Usuarios, login, cuentas
- Base de datos y panel de administración
- CMS (si algún día querés cargar productos sin tocar código, la ruta más corta es Sanity o Keystatic sobre la misma forma de datos — la estructura de `src/data/` ya está pensada para poder migrar a eso sin reescribir componentes)
- Recomendaciones automáticas, chat, newsletter
- Stock real multi-unidad (hoy es 1/1 por diseño)
- Internacionalización

---

## 15. Riesgos y cómo se manejan

| Riesgo | Manejo |
|---|---|
| Perder contenido en la migración | El sitio viejo queda completo en `legacy/`. Un test verifica que los 58 productos existan en los datos nuevos |
| Errores al extraer talle/estado de las descripciones | Script + **revisión manual de los 58**. La descripción original se conserva íntegra |
| Cambiar de hosting rompe el dominio | El DNS se apunta a Vercel en un solo paso, documentado en README. `CNAME` se conserva por si hay que volver atrás |
| Cambiar los slugs rompe links compartidos | Los links viejos eran `?producto=id`; se agrega un redirect de `?producto=X` → `/producto/X` en `middleware` para los que ya circulan |
| Que el resultado "parezca hecho por IA" | §12 es un compromiso concreto y revisable: sin gradientes, sin radios, sin sombras, sin copy inventado, sin tres cards iguales. Si algo del resultado incumple eso, es un bug de diseño |

---

*Fin del análisis. La implementación arranca en la Fase 2.*
