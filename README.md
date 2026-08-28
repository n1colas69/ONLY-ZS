# ONLY ZS

Tienda de vintage y second hand. Zona Sur, La Rioja, Argentina.
[onlyzs.com.ar](https://onlyzs.com.ar) · [@only_zonasur](https://www.instagram.com/only_zonasur/)

Cada pieza es única: cuando se vende, se vende. No hay pago online — el pedido se coordina por WhatsApp.

---

## Arrancar

Necesitás [Node.js](https://nodejs.org) instalado (versión 20 o superior).

```bash
npm install     # solo la primera vez
npm run dev     # abre http://localhost:3000
```

Mientras `npm run dev` esté corriendo, cualquier cambio que guardes se ve en el navegador al instante.

---

## Los comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el sitio en tu compu para ver los cambios |
| `npm test` | **Revisa que el catálogo esté bien escrito.** Corrélo siempre antes de publicar |
| `npm run images` | Mide las fotos nuevas. Corrélo cada vez que agregues o cambies una |
| `npm run build` | Compila el sitio como se publica. Si falla, hay algo mal |
| `npm run lint` | Busca errores comunes en el código |
| `npm run typecheck` | Revisa que los datos tengan la forma correcta |

**El flujo normal para cargar un producto es:**

```bash
npm run images
npm test
git add . && git commit -m "Agrego campera Carhartt" && git push
```

Vercel publica solo. En un minuto está online.

---

## Dónde está cada cosa

```
ONLY-ZS/
├── src/data/            ← ACÁ EDITÁS VOS
│   ├── products.ts          el catálogo: los 62 productos
│   ├── categories.ts        las 6 categorías
│   ├── collaborations.ts    las colaboraciones
│   ├── gallery.ts           las fotos de la comunidad
│   ├── site.ts              WhatsApp, redes, textos, FAQ
│   └── image-sizes.ts       generado por `npm run images` — no lo edites
│
├── public/images/       ← ACÁ VAN LAS FOTOS
│   ├── products/<slug>/     una carpeta por pieza
│   ├── gallery/             Galería ZS
│   ├── categories/          portadas de categoría
│   ├── collaborations/      colaboraciones
│   └── brand/               logo y portada
│
├── src/app/             las páginas
├── src/components/      las piezas visuales
├── src/lib/             la lógica (carrito, WhatsApp, búsqueda, filtros)
├── src/types/           la forma que tienen los datos
├── tests/               los tests que corre `npm test`
├── scripts/             scripts de mantenimiento
│
└── legacy/              el sitio anterior, archivado como referencia
```

**Para modificar cualquier cosa, la guía es [CUSTOMIZATION.md](CUSTOMIZATION.md).** Está escrita sin tecnicismos.

---

## Las páginas

| Dirección | Qué es |
|---|---|
| `/` | Home |
| `/tienda` | Catálogo completo con filtros |
| `/producto/{slug}` | Una página por pieza (56 en total) |
| `/categoria/{slug}` | Catálogo filtrado por categoría |
| `/galeria` | Galería ZS |
| `/colaboraciones` y `/colaboraciones/{slug}` | Colaboraciones |
| `/info/{slug}` | Info, Envíos, Cambios, FAQ |
| `/carrito` | La bolsa y el checkout por WhatsApp |
| `/favoritos` | Las piezas guardadas |

---

## Cómo está hecho

- **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS 4**
- **Sin base de datos, sin panel de administración, sin backend.** El catálogo es un archivo de texto (`src/data/products.ts`). Editarlo publica.
- **Sin librerías de más.** El carrito, la búsqueda, los filtros, el estado y los íconos están escritos a mano, en pocas líneas. Las únicas dependencias son Next, React y Tailwind.
- **Casi todo se arma en el servidor.** El navegador recibe HTML terminado. Solo cuatro cosas necesitan JavaScript: la bolsa, los favoritos, el buscador y el visor de la galería.
- **El carrito y los favoritos viven en el navegador de cada persona** (`localStorage`). No se guarda nada en ningún servidor.
- **Las fotos las optimiza Next.js.** Vos subís un JPG y él genera las versiones AVIF y WebP en el tamaño que cada pantalla necesita.

Los detalles técnicos y las decisiones están en [AI_CONTEXT.md](AI_CONTEXT.md).

---

## Publicar

El sitio está en **Vercel**, conectado al repositorio de GitHub. Cada `git push` a la rama `main` publica automáticamente.

**Primera configuración** (solo una vez):

1. Entrá a [vercel.com](https://vercel.com) e importá el repositorio `n1colas69/ONLY-ZS`.
2. Vercel detecta Next.js solo — no hay que configurar nada.
3. En *Settings → Domains*, agregá `onlyzs.com.ar`.
4. En el panel de tu proveedor de dominio, apuntá los registros DNS a Vercel (Vercel te dice exactamente cuáles).

> El sitio anterior estaba en GitHub Pages. El archivo `public/CNAME` se conservó por si alguna vez hay que volver atrás.

---

## Documentación

| Archivo | Para qué |
|---|---|
| [CUSTOMIZATION.md](CUSTOMIZATION.md) | **Cómo modificar el sitio.** Escrito para no programadores |
| [MIGRATION.md](MIGRATION.md) | Análisis del sitio anterior y por qué se reconstruyó así |
| [AI_CONTEXT.md](AI_CONTEXT.md) | Contexto para pasarle a una IA cuando quieras cambios |
| [legacy/README.md](legacy/README.md) | Qué hay en la carpeta del sitio viejo |
