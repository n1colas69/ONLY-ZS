# CUSTOMIZATION.md — Cómo modificar ONLY ZS

Esta guía está escrita para vos, no para un programador.

**La regla general:** casi todo lo que vas a querer cambiar está en `src/data/`. Son archivos de texto con datos. No tenés que entender React ni Next.js para editarlos.

**La regla de oro:** después de cualquier cambio, abrí una terminal en la carpeta del proyecto y corré:

```bash
npm test
```

Si dice **71 passed**, está todo bien. Si algo está mal escrito, te lo dice con el nombre del producto y qué le falta.

---

## Índice

| Quiero… | Archivo |
|---|---|
| [Agregar un producto](#agregar-un-producto) | `src/data/products.ts` |
| [Cambiar un precio](#cambiar-un-precio) | `src/data/products.ts` |
| [Poner precio privado (a consultar)](#poner-precio-privado-a-consultar) | `src/data/products.ts` |
| [Marcar algo como vendido](#marcar-algo-como-vendido) | `src/data/products.ts` |
| [Cambiar el nombre de un producto](#cambiar-el-nombre-de-un-producto) | `src/data/products.ts` |
| [Cambiar de categoría un producto](#cambiar-de-categoría-un-producto) | `src/data/products.ts` |
| [Agregar, reemplazar u ordenar fotos](#agregar-reemplazar-u-ordenar-fotos) | `public/images/products/<slug>/` — **cero código** |
| [Qué tamaño tiene que tener cada foto](#qué-tamaño-tiene-que-tener-cada-foto) | — |
| [Destacar una pieza en la home](#destacar-una-pieza-en-la-home) | `src/data/products.ts` |
| [Agregar una categoría](#agregar-una-categoría) | `src/data/categories.ts` + `src/types/index.ts` |
| [Cambiar el logo](#cambiar-el-logo) | `src/components/layout/Header.tsx` |
| [Cambiar los colores](#cambiar-los-colores) | `src/app/globals.css` |
| [Cambiar la tipografía](#cambiar-la-tipografía) | `src/app/layout.tsx` |
| [Cambiar la cantidad de columnas](#cambiar-la-cantidad-de-columnas) | `src/app/globals.css` |
| [Cambiar el número de WhatsApp](#cambiar-el-número-de-whatsapp) | `src/data/site.ts` |
| [Cambiar el mensaje de WhatsApp](#cambiar-el-mensaje-de-whatsapp) | `src/lib/whatsapp.ts` |
| [Crear una colaboración](#crear-una-colaboración) | `src/data/collaborations.ts` |
| [Agregar fotos a la galería](#agregar-fotos-a-la-galería) | `src/data/gallery.ts` |
| [Cambiar textos (Info, Envíos, FAQ)](#cambiar-textos) | `src/data/site.ts` |
| [Modificar el header](#modificar-el-header) | `src/components/layout/Header.tsx` |
| [Modificar el footer](#modificar-el-footer) | `src/components/layout/Footer.tsx` |
| [Modificar el carrito](#modificar-el-carrito) | `src/components/cart/` |
| [Publicar los cambios](#publicar-los-cambios) | — |

---

## Agregar un producto

Son dos cosas separadas: **las fotos** (van en una carpeta, cero código) y **los datos** (nombre, precio, talle... van en un archivo de texto). No hace falta ningún orden especial entre las dos, pero acá van en el orden más natural.

### Paso 1 — Las fotos

Creá una carpeta dentro de `public/images/products/` con el nombre que va a tener el producto en la dirección web (todo en minúscula, con guiones, sin acentos ni espacios) y numerá las fotos:

```
public/images/products/campera-carhartt-negra/
├── 1.jpg     ← esta es la portada, la que se ve en el catálogo
├── 2.jpg
├── 3.jpg
└── 4.jpg
```

**La página lee sola lo que haya en esa carpeta.** No hay ningún archivo de código donde tengas que escribir el nombre de cada foto — ver [Agregar, reemplazar u ordenar fotos](#agregar-reemplazar-u-ordenar-fotos) para el detalle completo de cómo funciona esto.

**Consejo:** exportá las fotos a **1600 píxeles** de lado mayor, en JPG calidad 80. La página después genera sola las versiones chicas y livianas para cada celular. No hace falta que optimices nada a mano. (Ver [Qué tamaño tiene que tener cada foto](#qué-tamaño-tiene-que-tener-cada-foto) para el resto de las fotos del sitio: header, galería, categorías, colaboraciones.)

La primera foto (`1.jpg`) es la más importante: es la portada, la que se ve en el catálogo. La segunda es la que aparece al pasar el mouse por encima.

### Paso 2 — Medir las fotos

En la terminal, dentro de la carpeta del proyecto:

```bash
npm run images
```

Esto anota el tamaño real de cada foto para que la página no "salte" mientras carga. **Correlo cada vez que agregues, reemplaces o borres fotos**, de cualquier producto.

### Paso 3 — Los datos

Abrí `src/data/products.ts`. Vas a ver una lista larga de bloques como este.

**Copiá un bloque entero** (desde `{` hasta `},`) y pegalo **arriba de todo**, justo después de `export const products: ProductEntry[] = [`. Lo que está arriba en el archivo aparece primero en la web.

```ts
  {
    slug: "campera-carhartt-negra",        // TIENE que ser igual al nombre de la carpeta de fotos
    name: "Campera Carhartt Negra",        // el nombre que se ve
    brand: "Carhartt",                     // la marca ("Sin marca" si no tiene)
    category: "abrigos",                   // ver la lista de categorías abajo
    price: 55000,                          // sin puntos, sin $, sin comas
    status: "available",                   // available | sold | coming-soon | draft
    isNew: true,                           // muestra la etiqueta "Nuevo"
    featured: false,                       // true = aparece más grande en la home
    size: "L",                             // el talle, como vos lo escribís
    condition: "10/10",                    // el estado sobre 10
    measurements: "Largo: 74cm · Ancho: 57cm",   // null si no las tenés
    description: "Zip-up original, material pesado.",
    tags: ["carhartt", "abrigos", "negro", "workwear"],
  },
```

**Fijate que no hay ningún campo de fotos acá.** Es a propósito: las fotos las trae solas desde la carpeta `campera-carhartt-negra/` que creaste en el Paso 1, porque el `slug` coincide. Si el `slug` de este bloque y el nombre de la carpeta no son exactamente iguales, la pieza va a aparecer sin fotos.

**Categorías válidas** (tienen que estar escritas exactamente así):
`abrigos` · `remeras` · `camisas` · `pantalones` · `camisetas` · `accesorios`

**Sobre `tags`:** son palabras sueltas para que el buscador encuentre la pieza. Poné la marca, el color, el tipo de prenda. Cuantas más pongas, más fácil es encontrarla.

**Sobre `description`:** escribí como escribís siempre. Este es el lugar donde la página suena a ONLY ZS y no a una tienda genérica. Si querés cortar renglón, usá `\n`:

```ts
description: "Buzo de felpa color marrón.\nOriginal, con etiquetas.",
```

Si un campo no lo tenés, poné `null` (sin comillas):

```ts
measurements: null,
```

### Paso 4 — Comprobar

```bash
npm test
```

Si te olvidaste de crear la carpeta de fotos, escribiste el slug distinto en un lado y en el otro, o pusiste mal la categoría, el test te lo dice con nombre y apellido.

---

## Cambiar un precio

En `src/data/products.ts`, buscá el producto y cambiá el número:

```ts
price: 55000,     →     price: 48000,
```

Sin puntos, sin `$`, sin comas. Solo el número.

---

## Poner precio privado (a consultar)

Para piezas que se venden pero cuyo precio se acuerda por WhatsApp (no querés que el número aparezca en la web). Se ven las fotos, se ve la ficha completa, pero en vez de precio dice "Precio a consultar" y en vez del botón "Agregar a la bolsa" aparece "Consultar precio por WhatsApp".

Dos cambios en el mismo bloque:

```ts
status: "private-price",
price: null,
```

**Los dos.** El test falla si a una pieza de precio privado le queda un número en `price`.

La pieza entra igual en "últimos ingresos", en destacados y en el filtro "disponible": para ONLY ZS sigue siendo algo que se puede comprar, solo que el precio no es público.

---

## Marcar algo como vendido

Dos cambios en el mismo bloque:

```ts
status: "sold",
price: null,
```

**Los dos.** Si dejás el precio, el test falla: una pieza vendida no muestra precio.

La pieza sigue visible en el catálogo (dice "Vendido" donde iba el precio) y su página sigue existiendo, así que los links que mandaste por WhatsApp siguen funcionando. Eso además le sirve al negocio: muestra todo lo que pasó por ONLY ZS.

Si querés que desaparezca del todo, poné `status: "draft"`.

### Los cinco estados

| Estado | Qué hace |
|---|---|
| `available` | Se puede comprar. Muestra precio y botón. |
| `private-price` | Se puede comprar, precio a consultar por WhatsApp. Sin número, sin botón de agregar a la bolsa. |
| `sold` | Vendido. Se ve, sin precio ni botón. |
| `coming-soon` | Anticipo. Se ve, sin precio, con botón para consultar. |
| `draft` | No se muestra en ningún lado. Para piezas a medio cargar. |

---

## Cambiar el nombre de un producto

```ts
name: "Campera Carhartt",     →     name: "Campera Carhartt Gris",
```

**No cambies el `slug`** salvo que sea necesario. El slug es la dirección web (`onlyzs.com.ar/producto/campera-carhartt`). Si lo cambiás, los links que ya mandaste dejan de funcionar y hay que renombrar también la carpeta de fotos.

---

## Cambiar de categoría un producto

```ts
category: "remeras",     →     category: "abrigos",
```

Solo estas seis: `abrigos`, `remeras`, `camisas`, `pantalones`, `camisetas`, `accesorios`.

---

## Agregar, reemplazar u ordenar fotos

**Este es el sistema definitivo de imágenes: nunca tenés que tocar un componente ni un archivo de código para las fotos de un producto.** La página las lee solas de una carpeta. Así de simple, todo el tiempo.

### Cómo funciona

Cada producto tiene una carpeta con su mismo `slug`:

```
public/images/products/campera-carhartt/
├── 1.jpg     ← la portada: la que se ve en el catálogo
├── 2.jpg
├── 3.jpg
├── 4.jpg
├── 5.jpg
├── 6.jpg
└── 7.jpg
```

La página abre esa carpeta, agarra todo lo que sea `.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`, y las ordena **por el número del nombre** (1, 2, 3…). La que se llama `1` es siempre la portada — la que aparece en la grilla del catálogo y arriba de todo en la ficha del producto.

No hay ninguna lista en ningún archivo `.ts` que diga "este producto tiene estas fotos". La carpeta **es** la lista.

### Agregar una foto a un producto que ya existe

1. Fijate cuál es el número más alto que ya está usado en esa carpeta (por ejemplo, si hay `1.jpg` a `4.jpg`, el siguiente es `5`).
2. Guardá la foto nueva ahí adentro con ese número: `5.jpg`.
3. Corré `npm run images`.
4. Listo. Ya está en el sitio.

No tocaste ningún archivo de código.

### Reemplazar una foto

1. Borrá o sobreescribí el archivo, **con el mismo nombre** (por ejemplo, la nueva foto de la campera también se llama `3.jpg`).
2. Corré `npm run images`.

Si el navegador te sigue mostrando la foto vieja, hacé un refresco forzado (`Ctrl` + `F5`, o `Cmd` + `Shift` + `R` en Mac) — a veces el navegador o la nube guardan la imagen en caché un ratito porque el nombre del archivo no cambió.

### Cambiar el orden de las fotos (o cuál es la portada)

**Renombrá los archivos**, no hay ningún otro lugar donde se defina el orden. Si querés que la foto que hoy es `3.jpg` pase a ser la portada:

1. Renombrá la portada actual (`1.jpg`) a un número temporal que no exista, por ejemplo `9.jpg`.
2. Renombrá `3.jpg` a `1.jpg`.
3. Renombrá `9.jpg` (la portada vieja) a `3.jpg`.
4. Corré `npm run images`.

*(Si te da fiaca hacerlo a mano archivo por archivo, pedile a una IA que renombre los archivos de esa carpeta con el orden que quieras — es un cambio de nombres de archivo, no de código.)*

### Sacar una foto

Borrá el archivo de la carpeta y corré `npm run images`. Si borrás la portada (`1.jpg`), acordate de renombrar la siguiente para que pase a ser `1.jpg` (si no, el producto se queda sin portada aunque tenga otras fotos, porque nadie se llama "1").

### Agregar un producto nuevo

Creá la carpeta con el `slug` exacto que va a tener el producto (tiene que coincidir letra por letra con el `slug` que pongas en `src/data/products.ts` — ver [Agregar un producto](#agregar-un-producto)) y numerá las fotos ahí adentro, igual que arriba.

### El resto de las carpetas de `public/images/`

Todo lo que **no** son fotos de producto sí necesita una línea de datos (porque no son una lista simple de "todas las fotos de una carpeta", sino que cada una tiene su propio texto — un `alt`, un título, etc.). Están explicadas en sus propias secciones:

```
public/images/
├── products/<slug>/1.jpg, 2.jpg…   fotos de cada pieza — ver arriba, sin código
├── gallery/1.jpg … 33.jpg          Galería ZS — ver "Agregar fotos a la galería"
├── gallery/hero.jpg                portada de /galeria
├── categories/                     solo para portadas fijas — ver "Agregar una categoría"
├── collaborations/<slug>/          fotos de colaboraciones — ver "Crear una colaboración"
├── brand/logo.png, hero.png        logo y portada de la home
└── products/_sin-asignar/          fotos sueltas que todavía no usaste
```

> `public/images/products/_sin-asignar/` tiene fotos que estaban en el sitio viejo sin producto asociado (una campera Polo Golf, un pantalón Nautica y algunas sueltas). Están ahí por si las querés usar; movelas a la carpeta de un producto cuando les encuentres un destino.

### Por qué siempre hay que correr `npm run images`

Ese comando no sube ni mueve nada — solo **mide** cada foto (ancho y alto reales) y anota esa medida en un archivo generado (`src/data/image-sizes.ts`, que vos nunca editás a mano). Con eso la página sabe de antemano cuánto espacio reservar para cada foto y no "salta" mientras carga, y respeta la proporción real de cada una en vez de recortarlas todas parejas.

Si te olvidás de correrlo, el sitio igual muestra las fotos nuevas (con una proporción aproximada por defecto), pero no van a quedar perfectas. Además se corre solo, automáticamente, cada vez que hacés `npm run build` — así que aunque te olvides, nunca vas a publicar algo roto.

---

## Qué tamaño tiene que tener cada foto

**Regla general, antes de los detalles:** la página nunca deforma ni estira una foto — siempre la **recorta** para llenar el espacio que le toca (es lo que hace `object-cover` si alguna vez lo ves mencionado en el código). Por eso no hace falta que midas nada con precisión de milímetro. Lo que sí importa es la **orientación** (vertical, cuadrada u horizontal) y que subas la foto con **buena resolución**, para que no se vea pixelada en una pantalla grande.

Dos números para tener siempre presentes:

- **1600 a 2000 píxeles** de lado mayor alcanza para cualquier foto del sitio, en cualquier pantalla (hasta un monitor grande de escritorio). Subir más grande no mejora nada — la página igual genera sola versiones más chicas para cada celular — y solo hace que la carpeta pese más y que `npm run images` tarde un poco más.
- **JPG calidad 80** para fotos con muchos colores (ropa, texturas). PNG solo si necesitás fondo transparente (por ejemplo, el logo).

Por categoría:

### Fotos de producto

| | |
|---|---|
| **Proporción** | Vertical (retrato). Como una foto de celular normal: 4:5 o 3:4. |
| **Tamaño** | 1600px de lado mayor. |
| **Formato** | JPG, calidad 80. |

La portada y las fotos del producto respetan la proporción **original** de cada foto (no la fuerzan a un cuadrado ni a nada raro) — por eso conviene que las fotos de un mismo producto, y de productos distintos, tengan una proporción parecida entre sí: si mezclás una foto panorámica con el resto verticales, esa pieza va a quedar visualmente "suelta" en la grilla del catálogo. Ver [Agregar, reemplazar u ordenar fotos](#agregar-reemplazar-u-ordenar-fotos) para todo lo demás (nombres de archivo, orden, portada).

### Header / logo

| | |
|---|---|
| **Proporción** | Cuadrada (1:1). |
| **Tamaño** | Al menos 320×320px. |
| **Formato** | PNG (permite fondo transparente). |

Hoy el "logo" del header es texto (la palabra **ONLY ZS** en la tipografía Bebas Neue), así que esto solo aplica si en algún momento lo cambiás por una imagen — ver [Cambiar el logo](#cambiar-el-logo). El archivo `public/images/brand/logo.png` (320×320) igual se usa siempre como ícono de la pestaña del navegador y como ícono al agregar el sitio a la pantalla de inicio de un celular, así que conviene que sea cuadrado y se lea bien en chico.

### Galería ZS

| | |
|---|---|
| **Proporción** | Mayormente vertical (retrato), como las fotos de producto — pero con **al menos 4 o 5 horizontales o cuadradas** en el conjunto. |
| **Tamaño** | 1600 a 2000px de lado mayor. |
| **Formato** | JPG, calidad 80. |

La foto grande de apertura de la home sale **al azar** de estas mismas fotos, y cambia en cada visita (ver [Agregar fotos a la galería](#agregar-fotos-a-la-galería)). En celular usa cualquier foto vertical; en escritorio necesita una foto horizontal o cuadrada para no verse recortada de forma rara. Si todas las fotos de la galería son verticales, en escritorio siempre va a salir la misma (o una de muy pocas) — por eso conviene ir sumando algunas horizontales con el tiempo, aunque sean minoría.

La portada fija de `/galeria` (`public/images/gallery/hero.jpg`, distinta de las fotos del pool) va **panorámica y ancha**: algo como 2400×1350px (proporción 16:9) para arriba.

### Categorías de productos

Por defecto **no subís ninguna foto**: la portada de cada categoría (el bloque casi cuadrado de la home y el banner panorámico arriba de `/categoria/abrigos`) es la foto de tapa de una pieza real de esa categoría, sorteada entre las que se pueden comprar — así que **cambia sola en cada visita**, no queda pegada siempre a la misma pieza. El día que se vende todo lo que había disponible, sortea entre lo vendido con tal de no dejar la portada vacía. Ver `getCategoryImage` en `src/lib/catalog.ts`.

Si en algún momento querés **fijar** una foto propia en vez de la automática, poné la ruta en el campo `image` de esa categoría en `src/data/categories.ts` (ver [Agregar una categoría](#agregar-una-categoría)):

| | |
|---|---|
| **Proporción** | Horizontal (apaisada), 4:3 o más ancha. **No cuadrada**. |
| **Tamaño** | 1600×1200px o más ancha. |
| **Formato** | JPG, calidad 80. |

Esa foto fija se usa en los dos lugares (el bloque casi cuadrado de la home y el banner panorámico de la categoría), así que conviene que ya sea apaisada de por sí: así aguanta los dos recortes sin perder lo importante de la imagen.

### Colaboraciones

| | |
|---|---|
| **Proporción, portada (`heroImage`)** | Horizontal y ancha, con lo importante de la foto **centrado**. |
| **Tamaño** | 1600×1000px o más ancha. |
| **Proporción, fotos de la galería interna** | Vertical, igual que las fotos de producto (4:5 o 3:4). |
| **Formato** | JPG, calidad 80. |

La portada de una colaboración se recorta de cuatro formas distintas según dónde aparece (el bloque de la home, la lista de colaboraciones, y dos formas más arriba de la página propia de la colaboración, una de ellas muy panorámica). No hay una sola proporción que quede "perfecta" en las cuatro a la vez — por eso lo que más importa es que el sujeto principal de la foto esté **centrado**, no pegado a un borde: así, sea cual sea el recorte, sigue viéndose.

---

## Destacar una pieza en la home

```ts
featured: true,
```

Las piezas destacadas aparecen en la home y **ocupan el doble de ancho** en el catálogo. Es el recurso para darle peso a una pieza fuerte.

No pongas muchas: si todas son destacadas, ninguna lo es. Cuatro a seis está bien.

---

## Agregar una categoría

Son dos archivos (el segundo es la red de seguridad que evita que escribas mal la categoría en un producto).

**1.** En `src/types/index.ts`, sumá el nombre a la lista:

```ts
export type CategorySlug =
  | 'abrigos'
  | 'remeras'
  | 'camisas'
  | 'pantalones'
  | 'camisetas'
  | 'accesorios'
  | 'calzado';        // ← nuevo
```

**2.** En `src/data/categories.ts`, agregá el bloque:

```ts
  {
    slug: 'calzado',
    name: 'Calzado',
    title: 'Zapatillas y calzado',
    image: null,
  },
```

Con `image: null` la portada sale sola de la foto de un producto de la categoría (ver [Categorías de productos](#categorías-de-productos)) — no hace falta subir nada. Si preferís fijar una foto propia, poné la ruta ahí (por ejemplo `'/images/categories/calzado.jpg'`), subila a `public/images/categories/calzado.jpg` y corré `npm run images`.

El orden de la lista es el orden en que aparecen los filtros y los bloques de la home.

> Una categoría tiene que tener al menos un producto: si queda vacía, `npm test` avisa. Eso está a propósito — en el sitio viejo había una categoría "Buzos" sin filtro y tres productos quedaban invisibles.

---

## Cambiar el logo

Hoy el logo es la palabra **ONLY ZS** escrita con la tipografía Bebas Neue. Es una decisión: se ve nítido en cualquier pantalla y no pesa nada.

Si querés usar una imagen, en `src/components/layout/Header.tsx` reemplazá:

```tsx
<Link href="/" className="font-display …">
  ONLY ZS
</Link>
```

por:

```tsx
<Link href="/" aria-label="ONLY ZS, ir al inicio">
  <Image src="/images/brand/logo.png" alt="ONLY ZS" width={120} height={40} priority />
</Link>
```

(y agregá `import Image from 'next/image';` arriba del archivo).

El logo del footer está en `src/components/layout/Footer.tsx`.
El ícono de la pestaña del navegador se cambia reemplazando `public/images/brand/logo.png`.

---

## Cambiar los colores

Todos los colores del sitio están en **un solo lugar**: el bloque `@theme` de `src/app/globals.css`.

```css
@theme {
  --color-ink:       #0d0d0d;   /* negro: texto, header, botones */
  --color-ink-soft:  #1a1a1a;
  --color-paper:     #f7f6f3;   /* fondo */
  --color-paper-dim: #edebe5;   /* fondo de bloques */
  --color-ash:       #6b6b6b;   /* texto secundario */
  --color-line:      #dedcd6;   /* líneas */
  --color-accent:    #bfa16a;   /* dorado, hoy sin usar */
}
```

Cambiás un valor y cambia en toda la página.

**Por qué el sitio tiene solo dos colores:** el único color de la página es el de las fotos. Un catálogo de ropa compite con su propia paleta si le agregás una.

**Sobre el dorado:** es el color que usaba el sitio viejo. Quedó definido pero sin usar, porque sobre fondo claro no tiene suficiente contraste para leerse bien (no pasa las normas de accesibilidad). Si querés revivirlo, usalo sobre negro o en bloques grandes, no en texto chico.

---

## Cambiar la tipografía

En `src/app/layout.tsx`, arriba de todo:

```ts
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
```

Para cambiar una, buscá el nombre en [fonts.google.com](https://fonts.google.com), y reemplazá el nombre en el `import` de arriba y en la línea. Por ejemplo, para cambiar Archivo por Inter:

```ts
import { Archivo, Bebas_Neue } from 'next/font/google';
// pasa a ser:
import { Bebas_Neue, Inter } from 'next/font/google';

const archivo = Inter({ subsets: ['latin'], variable: '--font-archivo' });
```

(Dejá el `variable: '--font-archivo'` igual: es el nombre interno, no la fuente.)

- **Bebas Neue** son los titulares. Es la tipografía que ONLY ZS ya usaba.
- **Archivo** es todo el texto.

Las fuentes se descargan una sola vez cuando publicás y se sirven desde tu propio dominio: los visitantes no hacen ningún pedido a Google.

---

## Cambiar la cantidad de columnas

En `src/app/globals.css`, buscá `@utility masonry`:

```css
@utility masonry {
  grid-template-columns: repeat(2, minmax(0, 1fr));   /* celular */

  @media (width >= 48rem)  { grid-template-columns: repeat(3, …); }  /* tablet */
  @media (width >= 80rem)  { grid-template-columns: repeat(4, …); }  /* escritorio */
  @media (width >= 100rem) { grid-template-columns: repeat(5, …); }  /* pantalla grande */
}
```

Cambiá los números (`2`, `3`, `4`, `5`).

**Importante:** si cambiás las columnas, ajustá también `SIZES` en `src/components/products/ProductGrid.tsx`. Ese texto le dice al navegador cuánto espacio ocupa cada foto para que descargue el tamaño justo. Si queda desactualizado, las fotos se bajan más grandes de lo necesario y la página se hace lenta.

Para cambiar la separación entre fotos, en el mismo bloque: `gap: 0.5rem`.

---

## Cambiar el número de WhatsApp

En `src/data/site.ts`:

```ts
whatsapp: '5493804151730',
whatsappDisplay: '3804 15-1730',
```

- `whatsapp` es el número que usa el link. Va **con código de país, sin `+` ni espacios ni guiones**: `54` (Argentina) + `9` (celular) + `380` (La Rioja) + el número.
- `whatsappDisplay` es cómo se escribe cuando se muestra.

> ⚠️ **Revisá esto.** El sitio viejo usaba `wa.me/3804151730`, sin código de país. WhatsApp lee ese número como `+380 4151730`, que es **Ucrania**. Lo corregí a `5493804151730`. Si tu número real es otro, cambialo acá. Probalo abriendo `https://wa.me/5493804151730` en el celular: si te abre tu propio chat, está bien.

Ese número se usa en todos los links de WhatsApp del sitio: el footer, la ficha de producto, el checkout y las páginas de info.

---

## Cambiar el mensaje de WhatsApp

En `src/lib/whatsapp.ts`. Hay tres mensajes:

**1. El pedido completo** (`buildOrderMessage`) — el que se manda desde el checkout:

```
¡Hola ONLY ZS! Quiero coordinar esta compra:

• 1 x Campera Carhartt — Talle L ($ 50.000)
  https://onlyzs.com.ar/producto/campera-carhartt

Total: $ 50.000

Datos de entrega
Nombre: …
Teléfono: …
…
```

**2. La consulta sobre una pieza** (`buildProductMessage`) — el botón de la ficha.

**3. La consulta general** (`buildGeneralMessage`) — el footer.

Editá el texto entre comillas. Lo que está entre `${...}` son datos que se rellenan solos: no los borres.

⚠️ Después de cambiar el mensaje, corré `npm test`. Hay tests que revisan que el pedido incluya el nombre, el talle, el link y todos los datos de entrega. Si rompiste algo, te avisan. Si el cambio fue a propósito, actualizá `tests/whatsapp.test.ts`.

**Para cambiar qué datos se piden en el formulario**, el archivo es `src/components/cart/CheckoutForm.tsx`. Si agregás un campo ahí, agregalo también en `src/types/index.ts` (en `CheckoutDetails`) y en el mensaje, o el dato no va a llegar.

---

## Crear una colaboración

**1.** Creá la carpeta de fotos:

```
public/images/collaborations/nombre-de-la-marca/
├── hero.jpg     ← la portada, va ancha arriba de todo
├── 1.jpg
├── 2.jpg
└── 3.jpg
```

**2.** En `src/data/collaborations.ts`, copiá el bloque que ya está y completalo:

```ts
  {
    slug: 'nombre-de-la-marca',      // igual al nombre de la carpeta
    title: 'Nombre De La Marca',
    tagline: 'Una línea corta que la describa.',
    description: 'El texto largo. Contá quiénes son y por qué están acá.',
    instagram: 'https://www.instagram.com/…',
    youtube: null,                   // null si no tienen
    video: null,                     // o { title: 'Nombre del video', url: 'https://…' }
    heroImage: '/images/collaborations/nombre-de-la-marca/hero.jpg',
    gallery: [
      '/images/collaborations/nombre-de-la-marca/1.jpg',
      '/images/collaborations/nombre-de-la-marca/2.jpg',
      '/images/collaborations/nombre-de-la-marca/3.jpg',
    ],
  },
```

**3.** `npm run images` y `npm test`.

La página se crea sola en `onlyzs.com.ar/colaboraciones/nombre-de-la-marca`.

> El sitio viejo tenía dos colaboraciones de relleno con el mismo texto repetido y fotos que no existían. No las migré: una sección con una colaboración real se ve mejor que con tres, dos de mentira. Cuando tengas la segunda de verdad, agregala acá.

---

## Agregar fotos a la galería

**1.** Guardá la foto como `public/images/gallery/34.jpg` (el número que sigue).

**2.** En `src/data/gallery.ts`, agregá la línea al final de la lista:

```ts
  { src: '/images/gallery/34.jpg', alt: 'Comunidad ONLY ZS — foto 34' },
```

**3.** `npm run images`.

**Consejo:** si sabés qué prenda aparece en la foto, escribilo en el `alt`:

```ts
{ src: '/images/gallery/34.jpg', alt: 'Campera Carhartt gris en la calle' },
```

El `alt` es lo que leen las personas ciegas y lo que lee Google. "Campera Carhartt gris" sirve; "foto 34" no.

---

## Cambiar textos

Casi todos los textos del sitio están en `src/data/site.ts`:

- **`site`** — nombre, descripción, WhatsApp, Instagram, ubicación, dominio.
- **`marqueeBrands`** — las marcas de la tira negra que cruza la home.
- **`homeCopy`** — los textos de la home (la frase de apertura, "Vintage no significa perfecto", los títulos de cada bloque).
- **`infoPages`** — Info, Envíos, Cambios y Preguntas frecuentes. Cada una es una página real (`/info/faq`, etc.).

Para agregar una pregunta al FAQ, sumá una línea al array `body`:

```ts
{
  slug: 'faq',
  title: 'Preguntas frecuentes',
  body: [
    '¿Las prendas están lavadas? Sí, …',
    '¿Hacen apartados? …',        // ← nueva
  ],
},
```

**Sobre el tono:** los textos actuales suenan a ONLY ZS: directos, cortos, sin lenguaje de marketing. "Vintage no significa perfecto. Si querés artículos perfectos, comprá nuevos" es la frase más honesta del sitio y por eso funciona. Si los cambiás, mantené ese registro.

---

## Modificar el header

`src/components/layout/Header.tsx`.

Los links de arriba están en la lista `NAV_LINKS`:

```ts
const NAV_LINKS = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/galeria', label: 'Galería' },
  { href: '/colaboraciones', label: 'Colabs' },
];
```

Los íconos (buscar, favoritos, bolsa, menú) están en `src/components/layout/HeaderActions.tsx`.

El menú del celular es `src/components/layout/MobileMenu.tsx`.

---

## Modificar el footer

`src/components/layout/Footer.tsx`. Las columnas de links están escritas ahí directamente; las categorías y las páginas de info se arman solas desde `src/data/`.

---

## Modificar el carrito

| Qué | Dónde |
|---|---|
| El panel lateral que se abre con el ícono de la bolsa | `src/components/cart/CartDrawer.tsx` |
| La página de coordinar compra y su formulario | `src/components/cart/CheckoutForm.tsx` |
| El botón "Agregar a la bolsa" | `src/components/cart/AddToCartButton.tsx` |
| Las reglas (qué se puede comprar, cuántas unidades, el total) | `src/lib/cart.ts` |

**Una unidad por pieza:** está en `src/lib/cart.ts`, en `MAX_QTY_PER_ITEM = 1`. Es a propósito: cada prenda vintage es única. Si algún día vendés algo con stock, ese es el número a cambiar.

---

## Publicar los cambios

Cada vez que subís cambios a GitHub, Vercel publica el sitio solo. No hay que hacer nada más.

```bash
npm run images        # si tocaste fotos
npm test              # revisar que esté todo bien
git add .
git commit -m "Agrego campera Carhartt negra"
git push
```

En un minuto está online.

**Antes de subir, si querés verlo en tu compu:**

```bash
npm run dev
```

y abrí <http://localhost:3000>. Los cambios se ven al instante mientras editás.

---

## Si algo se rompe

**`npm test` falla.** Leé el mensaje: dice qué producto y qué le pasa. Los más comunes:

| Mensaje | Qué pasó |
|---|---|
| `todas las fotos existen en public/` | Una ruta de foto está mal escrita o el archivo no está |
| `todas las categorías existen` | Escribiste una categoría que no está en la lista de seis |
| `todo lo que está a la venta tiene precio` | Un producto `available` sin precio |
| `nada que no esté disponible muestra precio` | Un producto `sold` al que le quedó el precio |
| `lo de precio privado no lleva un número de precio` | Un producto `private-price` al que le quedó el precio |
| `no tiene dos productos con el mismo slug` | Copiaste un bloque y no le cambiaste el slug |

**La página no arranca.** Casi siempre es una coma o una llave de más o de menos. Fijate el último bloque que tocaste: cada producto termina en `},` y el último de la lista también.

**Una foto no se ve.** Revisá que la ruta empiece con `/images/` (con barra al principio) y que el archivo esté donde dice. Después `npm run images`.

**Volver atrás.** Si rompiste algo y no sabés qué:

```bash
git checkout src/data/products.ts
```

Eso deshace los cambios de ese archivo (los que no hayas subido todavía).

---

## Si le pedís ayuda a una IA

Hay un archivo, `AI_CONTEXT.md`, escrito específicamente para eso. Cuando le pidas un cambio a una IA, decile:

> Leé AI_CONTEXT.md y CUSTOMIZATION.md antes de tocar nada. Quiero [lo que quieras].

Con eso entiende cómo está armado el proyecto y qué no tiene que romper.
