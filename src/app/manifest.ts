import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// ============================================================
// MANIFEST (PWA)
// ------------------------------------------------------------
// Permite "instalar" el sitio en el celular como si fuera una app.
//
// El sitio viejo además tenía un Service Worker que guardaba las
// páginas para siempre y nunca las volvía a pedir: quien había
// entrado una vez podía seguir viendo el catálogo viejo aunque
// hubiera productos nuevos. Ese archivo NO se migró. El sitio
// nuevo se sirve desde el CDN de Vercel, que ya se encarga de la
// caché y sí se actualiza.
//
// Para modificar: el nombre, los colores y el icono de acá abajo.
// ============================================================

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Vintage & Second Hand`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F6F3',
    theme_color: '#0D0D0D',
    lang: 'es-AR',
    categories: ['shopping'],
    icons: [
      { src: '/images/brand/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/images/brand/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
