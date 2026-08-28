# AI_CONTEXT.md

Contexto para asistentes de IA que trabajen sobre este proyecto.

**Leé este archivo entero antes de modificar nada.** El dueño del proyecto no es programador profesional: entiende la lógica pero no va a poder auditar tus cambios línea por línea. La prioridad es no romper nada y dejar el código tan simple como lo encontraste.

---

## 1. Qué es esto

ONLY ZS es una tienda de ropa vintage y second hand de La Rioja, Argentina. Vende **piezas únicas**: una unidad de cada prenda. **No hay pago online**; el pedido se cierra por WhatsApp.

Es la versión 2 del sitio. La versión 1 (HTML/CSS/JS plano) está archivada en `legacy/` y el análisis completo de por qué se reconstruyó está en `MIGRATION.md`. **Leé `MIGRATION.md` §4 antes de "arreglar" algo**: lista los bugs del sitio viejo, y varios de ellos existen hoy como tests para que no vuelvan.

---

## 2. Stack

| | |
|---|---|
| Framework | Next.js 16, App Router |
| UI | React 19, Server Components por defecto |
| Estilos | Tailwind CSS 4 (config en `src/app/globals.css`, bloque `@theme`) |
| Lenguaje | TypeScript estricto (`noUncheckedIndexedAccess` activado) |
| Tests | Vitest |
| Hosting | Vercel |
| Datos | Archivos `.ts` en `src/data/`. Sin base de datos, sin CMS, sin API |

**Dependencias de producción: `next`, `react`, `react-dom`. Nada más.**

No hay librería de estado, ni de animación, ni de íconos, ni de utilidades, ni de fechas, ni de masonry. Fue una decisión explícita. **No agregues dependencias.** Si creés que una hace falta, explicá por qué antes de instalarla.

---

## 3. Estructura

```
src/
├── app/                    rutas (App Router)
│   ├── layout.tsx          header, footer, paneles, fuentes, JSON-LD global
│   ├── page.tsx            home
│   ├── globals.css         TODO el sistema visual (colores, tipografía, grilla)
│   ├── tienda/             catálogo con filtros
│   ├── producto/[slug]/    ficha de producto
│   ├── categoria/[slug]/
│   ├── galeria/
│   ├── colaboraciones/[slug]/
│   ├── info/[slug]/        Info, Envíos, Cambios, FAQ
│   ├── carrito/            bolsa + checkout
│   ├── favoritos/
│   ├── sitemap.ts  robots.ts  manifest.ts  not-found.tsx
│
├── components/
│   ├── layout/          Header, HeaderActions, Footer, Marquee, MobileMenu, Overlays
│   ├── products/        ProductCard, ProductGrid, ProductGallery, WishButton, ZoomImage
│   ├── cart/            CartDrawer, CheckoutForm, AddToCartButton
│   ├── wishlist/        WishlistDrawer, WishlistPage
│   ├── gallery/         GalleryGrid (grilla de la Galería ZS)
│   ├── collaborations/  CollabGallery (grilla de fotos de una colaboración)
│   ├── search/          SearchDialog
│   ├── filters/         FilterBar
│   └── ui/              Button, Drawer, Icon, ProductImage, Lightbox, Toasts
│
├── data/            products, categories, collaborations, gallery, site, image-sizes
├── lib/             catalog, images, cart, wishlist, whatsapp, search, filters, format, seo, store, cn, useHasHover
└── types/           todas las interfaces
```

---

## 4. Cómo fluyen los datos

```
src/data/products.ts   (los DATOS crudos: nombre, precio, talle... SIN fotos)
        +
public/images/products/{slug}/   (las FOTOS: se leen del disco, no de código)
        ↓  se juntan en resolveProduct(), adentro de catalog.ts
src/lib/catalog.ts     (getPublicProducts, getProduct, toLite…)
        ↓
Server Components      (páginas y tarjetas: se arman en el servidor)
        ↓
ProductLite            (versión recortada que se le pasa a los Client Components)
        ↓
src/lib/store.ts       (carrito y favoritos en localStorage)
```

**Reglas:**

1. **Ninguna página importa `@/data/products` directamente.** Todo pasa por `@/lib/catalog`. La única excepción es `generateStaticParams`, que necesita la lista cruda (y no necesita fotos, solo `slug`/`status`).
2. **Las fotos de un producto no viven en `src/data/products.ts`.** `products.ts` exporta `ProductEntry[]` (un `Product` sin el campo `images`). `catalog.ts` las agrega leyendo `public/images/products/{slug}/` con `getProductImages()` (`src/lib/images.ts`), así que agregar o reemplazar una foto **nunca** toca código — ver `CUSTOMIZATION.md`. No le agregues un campo `images` de vuelta a `ProductEntry`: sería reintroducir exactamente la lista manual que este sistema evita.
3. **Los Client Components nunca importan el catálogo.** Reciben `ProductLite[]` como prop desde el servidor. Si importás `products` en un archivo con `'use client'`, las 62 descripciones y todas las listas de fotos terminan en el bundle del navegador.
4. **Los `status: 'draft'` no existen para el sitio.** `getPublicProducts()` los filtra. No aparecen en el catálogo, ni en la búsqueda, ni en el sitemap, ni tienen URL. Un producto sin carpeta de fotos (o con la carpeta vacía) no queda automáticamente en `draft`: hay que ponerlo a mano, y hay un test (`todo lo publicado tiene al menos una foto`) que avisa si te olvidaste.

---

## 5. El modelo de producto

```ts
interface Product {
  slug: string;          // identidad Y url. Único. Solo [a-z0-9-]
  name: string;
  brand: string;         // 'Sin marca' si no tiene
  category: CategorySlug;// unión de 6 strings literales
  price: number | null;
  status: 'available' | 'sold' | 'coming-soon' | 'draft';
  isNew: boolean;        // etiqueta, NO estado
  featured: boolean;     // etiqueta, NO estado
  size: string | null;
  condition: string | null;
  measurements: string | null;
  description: string;
  images: string[];      // rutas desde /public, la [0] es la portada — RESUELTO, no escrito a mano
  tags: string[];
}

type ProductEntry = Omit<Product, 'images'>;  // lo que de verdad hay en products.ts
```

`src/data/products.ts` tipa su array como `ProductEntry[]`, no como `Product[]`: no tiene `images`. `resolveProduct()` en `catalog.ts` completa ese campo llamando a `getProductImages(entry.slug)` (`src/lib/images.ts`), que lee `public/images/products/{slug}/` y devuelve las rutas ordenadas por el número del nombre de archivo (`1.jpg`, `2.jpg`…). Un `Product` "completo" con fotos solo existe después de pasar por `resolveProduct()` — nunca antes.

### Por qué `status` es un solo campo

El sitio viejo tenía **cuatro booleanos** (`inStock`, `isComingSoon`, `isNew`, `badge`) que podían contradecirse, y de hecho lo hacían: 17 de 58 productos tenían combinaciones inválidas (`badge: "NUEVO"` + `inStock: false`, `price: 0` en piezas vendidas, etc.).

**No agregues booleanos de estado.** Si necesitás un estado nuevo, sumalo a la unión `ProductStatus`.

`isNew` y `featured` son independientes a propósito: son etiquetas. La regla de que "NUEVO" solo se muestra si `status === 'available'` vive en la **interfaz** (`ProductCard`), no en los datos.

### Regla del precio

Solo `status: 'available'` muestra precio. Todo lo demás muestra la etiqueta del estado. Está centralizado en `priceLabel()` (`src/lib/format.ts`). **Hay un test que falla si un producto `sold` tiene precio.** Es lo que evita que vuelvan los "$0" del sitio viejo.

---

## 6. Server vs Client

**Client Components, y por qué cada uno lo es** (todos necesitan `localStorage`, estado del navegador, o eventos de mouse/touch que no se resuelven con CSS):

| Componente | Por qué es cliente |
|---|---|
| `WishButton` | lee y escribe favoritos |
| `AddToCartButton`, `CartDrawer`, `CheckoutForm`, `WishlistDrawer`, `WishlistPage` | leen y escriben la bolsa |
| `SearchDialog`, `MobileMenu`, `HeaderActions`, `Overlays`, `Toasts` | estado de paneles |
| `GalleryGrid`, `CollabGallery` | abren el visor (`Lightbox`) y controlan qué foto está abierta |
| `Lightbox` | el visor en sí: teclado, swipe, atrapa el foco |
| `ZoomImage` | sigue el cursor (desktop) o el toque (celular) para acercar una foto de producto |

**Todo lo demás es servidor**, incluyendo el catálogo entero (con la resolución de fotos desde el disco), las tarjetas de producto, `ProductGallery` (arma el layout, pero cada foto individual es un `ZoomImage` de cliente) y los filtros.

**Antes de agregar `'use client'` a un archivo, preguntate si de verdad hace falta.** Ejemplos de cosas que en este proyecto se resolvieron sin JavaScript:

- La segunda foto al pasar el mouse en la tarjeta de producto → dos `<img>` y `group-hover:opacity-100`
- El layout de la galería de la ficha de producto → `scroll-snap` en celular, columna apilada en escritorio (el zoom de cada foto sí es cliente, pero el armado del layout no)
- Los filtros → links que cambian la URL, el servidor devuelve el catálogo filtrado
- El desplegable de filtros en celular → `<details>` / `<summary>`
- El buscador del catálogo → un `<form method="get">`
- El pellizco (pinch) para acercar una foto en el visor a pantalla completa → `touch-action: pinch-zoom` en CSS, el navegador lo hace solo, sin una línea de JS de zoom

---

## 7. Carrito y favoritos

`src/lib/cart.ts` y `src/lib/wishlist.ts` son **funciones puras**: reciben un array y devuelven otro. No tocan el DOM ni React. Están cubiertas por tests.

`src/lib/store.ts` es el único archivo que habla con `localStorage`. Implementa un store mínimo sobre `useSyncExternalStore`.

### Detalles que importan

- **El carrito guarda solo `{ slug, qty }`.** El precio, el nombre y la foto se leen siempre del catálogo actual vía `resolveCart()`. El sitio viejo guardaba una copia entera del producto y los carritos quedaban con precios viejos para siempre. **No vuelvas a guardar el objeto completo.**
- **`MAX_QTY_PER_ITEM = 1`.** Vintage: una unidad por pieza. Está en `src/lib/cart.ts` y hay un test.
- **`parseCart` acepta el formato viejo** (objetos con `id`) y renombra los dos slugs que cambiaron (`sueter-levi's` → `sueter-levis`). Es la migración de los carritos que la gente ya tenía guardados. No lo saques.
- **Hidratación:** el store devuelve el valor por defecto en el servidor y en el primer render del cliente; se hidrata dentro de `subscribe()`. Si lo tocás, cuidado con los errores de hidratación.
- **Todo acceso a `localStorage` está en `try/catch`.** Puede fallar en modo privado.

---

## 8. WhatsApp

**Es la parte más importante del sitio: no hay pago online, el pedido ES el mensaje.**

Toda la lógica está en `src/lib/whatsapp.ts`, separada de los componentes. Tres funciones: `buildOrderMessage`, `buildProductMessage`, `buildGeneralMessage`.

`tests/whatsapp.test.ts` verifica que el mensaje del pedido incluya nombre, talle, link, total y **todos** los campos de entrega. Si cambiás el formato, actualizá el test.

**El número está en `src/data/site.ts`, con código de país:** `5493804151730`. El sitio viejo usaba `3804151730` sin código de país, que WhatsApp interpreta como Ucrania (+380). Está señalado en `CUSTOMIZATION.md` para que el dueño lo verifique.

Si agregás un campo al checkout, tocá los tres lugares: `CheckoutDetails` (types), `CheckoutForm` y `buildOrderMessage`.

---

## 9. Imágenes

### De dónde salen las fotos de un producto

`src/lib/images.ts` → `getProductImages(slug)`. Lee `public/images/products/{slug}/` con `fs.readdirSync` (server-only), filtra por extensión (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) y ordena **numéricamente** por el nombre del archivo (`1.jpg` antes que `2.jpg` antes que `10.jpg` — no alfabéticamente, que pondría "10" antes que "2"). Si la carpeta no existe, devuelve `[]` sin tirar error. `catalog.ts` la llama dentro de `resolveProduct()`.

**No hay ningún otro lugar donde se declaren las fotos de un producto.** `src/data/products.ts` no tiene el campo. Agregar/reemplazar/reordenar fotos es 100% manejo de archivos (mover, renombrar) — cero código. Está documentado paso a paso en `CUSTOMIZATION.md` → "Agregar, reemplazar u ordenar fotos".

Si alguna vez necesitás un orden que NO sea el numérico de archivo (por ejemplo, una portada elegida a mano que no sea la foto "1" por alguna razón editorial), la única forma prevista es renombrar los archivos — no agregues un campo de override en los datos; sería reabrir el problema que este sistema resuelve.

### Tamaño y optimización

- `scripts/measure-images.mjs` (`npm run images`, también en `prebuild`) recorre **todo** `public/images/` (no solo productos) y genera `src/data/image-sizes.ts` con el ancho/alto real de cada archivo. Correlo después de cualquier cambio de fotos, de lo que sea.
- `ProductImage` y `ZoomImage` reciben `width`/`height` (via `getImageSize()` en Server Components) para fijar el `aspect-ratio` real y evitar saltos de layout.
- **`sizes` no es opcional.** Si lo omitís o queda desactualizado respecto de las columnas de la grilla, el navegador descarga fotos mucho más grandes de lo necesario. Los valores están en `SIZES` / `SIZES_WIDE` en `ProductGrid.tsx`.
- `priority` solo para lo que se ve sin scrollear (primeras 4 tarjetas, hero, primera foto de la ficha).
- **No importes `@/data/image-sizes` desde un Client Component.** Son 349 entradas. `GalleryGrid`, `CollabGallery`, `ProductGallery` → `ZoomImage` reciben las medidas ya resueltas desde el servidor (como props `width`/`height`), precisamente por esto.

### El visor a pantalla completa (Lightbox)

`src/components/ui/Lightbox.tsx` es el visor compartido por la Galería ZS y las fotos de colaboraciones: tocar una foto la abre a pantalla completa, con flechas, deslizar (swipe) y pellizcar (pinch, vía CSS `touch-action: pinch-zoom`, sin JS de zoom). `GalleryGrid` y `CollabGallery` son grillas finas que solo deciden el layout y le pasan `photos`/`index`/`onClose`/`onNavigate`; toda la lógica del visor en sí vive una sola vez en `Lightbox`. Si un día se agrega un tercer lugar con fotos clickeables (por ejemplo, una futura sección de "looks"), reusá `Lightbox` en vez de copiar el patrón.

Las fotos de **producto** no usan `Lightbox`: usan `ZoomImage` (zoom en el lugar, no un visor aparte), porque ya tienen su propia forma de recorrer varias fotos (la tira deslizable en celular, la columna apilada en escritorio).

---

## 10. El sistema visual

Está **entero** en `src/app/globals.css`. Las decisiones y su porqué:

| Decisión | Razón |
|---|---|
| Dos colores: tinta `#0d0d0d` y papel `#f7f6f3` | El único color de la página es el de las fotos |
| `border-radius: 0` | Los bordes redondeados son el rasgo más rápido de "plantilla" |
| Sin sombras | Se separa con espacio y líneas de 1px |
| Sin gradientes decorativos | (Los dos únicos degradados son overlays sobre fotos, para que se lea el texto encima) |
| Bebas Neue en titulares | Es la tipografía que ONLY ZS ya usaba: continuidad de identidad |
| Archivo en el texto | Reemplaza a Poppins, que es la tipografía por defecto de las plantillas genéricas |
| `.label` / `.label-ink` | Micro-labels de 10px con `tracking: 0.18em`. Es la firma editorial del sitio |
| Grilla con `grid`, no `columns` | Con columnas CSS el orden se lee de arriba a abajo por columna, y el catálogo está ordenado por novedad |
| Irregularidad real | Sale de la proporción original de cada foto (4:5 / 3:4) y de que las `featured` ocupan dos columnas. **No es aleatoria** |
| Animaciones de 200–400ms, una sola vez | Y todo desactivado bajo `prefers-reduced-motion` |

**El dorado `#bfa16a`** está definido como `--color-accent` pero **no se usa**: sobre papel da 2,6:1 de contraste y no pasa WCAG AA. Quedó disponible por si se lo quiere usar sobre negro.

### Qué NO hacer

El pedido explícito del dueño fue que el sitio **no parezca generado por IA**. Concretamente, no agregues:

- heros gigantes con eslóganes inventados ("Descubrí tu estilo", "Elevá tu guardarropa")
- tres tarjetas perfectamente iguales
- gradientes, `border-radius`, sombras, glassmorphism
- botones enormes tipo SaaS
- emojis en la interfaz
- copywriting corporativo
- secciones de testimonios o "features"

**No inventes textos.** Todo el copy sale de `src/data/site.ts` y de las descripciones reales de los productos, que están escritas por el dueño en español rioplatense, con jerga y con algún typo. **Eso es un activo, no un error: no lo "corrijas".**

Ejemplos de la voz real:
> "joyon vintage coleccionable, además colores de bokita viejo"
> "Talle: Unico AC (Apto Cabezones)"
> "Vintage no significa perfecto. Si querés artículos perfectos, comprá nuevos."

---

## 11. Accesibilidad

No es opcional. Lo que ya está resuelto y no hay que romper:

- `Drawer` (`src/components/ui/Drawer.tsx`) resuelve, para los cuatro paneles: `role="dialog"`, `aria-modal`, atrapar el foco con Tab, cerrar con Escape, bloquear el scroll de fondo y devolver el foco al abridor. **Cualquier modal nuevo usa este componente.**
- Las tarjetas de producto son `<a>`, no `<div onClick>`. Funcionan con teclado y con "abrir en pestaña nueva".
- Todo objetivo táctil mide al menos 44px (`min-h-11`, `size-11`).
- `:focus-visible` tiene contorno explícito en `globals.css`. **No lo saques.**
- Todo botón que es solo un ícono tiene `aria-label`.
- Los avisos van en un `role="status" aria-live="polite"`.
- Las fotos decorativas llevan `alt=""`; las informativas, texto real.
- `prefers-reduced-motion` desactiva todas las animaciones.

---

## 12. SEO

- `generateMetadata` en cada ruta dinámica. Título, descripción, canonical, Open Graph y Twitter.
- JSON-LD: `Product` + `Offer` (con `itemCondition: UsedCondition` — la tienda vende usado) y `BreadcrumbList` en las fichas; `Store` en el layout.
- `sitemap.ts` y `robots.ts` se generan desde los datos. Agregar un producto lo agrega al sitemap solo.
- `/carrito` y `/favoritos` van con `robots: { index: false }`.
- `next.config.ts` tiene redirects 308 de las URLs del sitio viejo (`/?producto=x`, `/brand.html?brand=x`, `/gallery.html`). **No los borres:** esos links circulan por WhatsApp e Instagram.

---

## 13. Reglas de trabajo

**Siempre, antes de dar algo por terminado:**

```bash
npm test          # 69 tests
npm run lint
npm run build
```

Los tres tienen que pasar limpios.

**Cosas que NO hay que romper:**

1. La forma de `Product`/`ProductEntry`. Si agregás un campo, actualizá `src/types/index.ts`, los 62 productos y `toLite()` si el navegador lo necesita.
2. Los slugs. Son URLs públicas que ya circulan, **y además el nombre de la carpeta de fotos**: el slug de un producto en `products.ts` tiene que ser idéntico al nombre de su carpeta en `public/images/products/`.
3. El formato del mensaje de WhatsApp sin actualizar su test.
4. Las claves de `localStorage` (`zs_cart`, `zs_wishlist`): cambiarlas le vacía el carrito a la gente.
5. Los redirects de `next.config.ts`.
6. La separación datos / interfaz: nunca escribas un producto dentro de un componente.
7. `src/data/image-sizes.ts` es **generado**. No lo edites a mano.
8. **No le agregues un campo `images` a `ProductEntry`/`products.ts`.** Es exactamente lo que este sistema evita. Si necesitás fotos, van en la carpeta del slug; si necesitás un orden distinto, se renombran los archivos (ver `CUSTOMIZATION.md`).

**Cosas que NO hay que agregar sin discutirlo:**

- Dependencias nuevas
- Pagos online, login, usuarios, base de datos, panel de administración, CMS, chat, newsletter (están explícitamente fuera de alcance; ver `MIGRATION.md` §14)
- `'use client'` en componentes que pueden ser de servidor
- Estado global nuevo

**Estilo de código:**

- Componentes chicos, funciones puras en `lib/`.
- Nada de `any`.
- Los comentarios explican **cómo modificar** y **por qué se decidió así**, no qué hace la línea. Cada componente importante abre con un bloque `// ====` con esa información. Mantené ese formato: es lo que le permite al dueño tocar el proyecto.
- Los comentarios y los textos de la interfaz están en español rioplatense.

---

## 14. Errores del sitio viejo que están cubiertos por tests

Si algún día un test falla, mirá acá antes de "arreglarlo" borrándolo:

| Test | Qué previene |
|---|---|
| `todos los slugs son aptos para una URL` | El id `sueter-levi's` rompía el botón de compra al interpolarse en un `onclick` |
| `toda categoría tiene al menos una pieza` | La categoría "Buzos" no tenía filtro: 3 productos eran inalcanzables |
| `nada que no esté disponible muestra precio` | 5 productos mostraban "$0" |
| `todas las fotos existen en public/` | Rutas rotas que aparecían en producción |
| `por precio, y deja afuera lo que no tiene precio` | Ordenar con `price: null` daba `NaN` y desordenaba el catálogo |
| `los slugs [de colaboraciones] son aptos para una URL` | `key: "Deep-Indumentaria"` vs link en minúsculas: mostraba la marca equivocada |
| `conserva las 58 piezas del sitio viejo` | Red de seguridad de la migración |

---

## 15. Si el pedido es visual

Antes de escribir CSS, mirá `MIGRATION.md` §12: ahí está definida la intención visual completa (jerarquía, tipografía, espaciado, grilla, movimiento). El sitio tiene un criterio; los cambios tienen que ser coherentes con él, no genéricamente "modernos".

Ante la duda entre **sofisticado** y **fácil de mantener**, elegí fácil de mantener.
Ante la duda entre **más efectos** y **más rápido**, elegí más rápido.
Ante la duda entre **diseño genérico moderno** e **identidad ONLY ZS**, elegí ONLY ZS.
