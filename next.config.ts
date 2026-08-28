import type { NextConfig } from 'next';

// ============================================================
// CONFIGURACIÓN DE NEXT.JS
// ------------------------------------------------------------
// Para modificar:
// - formatos de imagen que se generan: images.formats
// - anchos que Next genera para las fotos: images.deviceSizes / imageSizes
// - redirecciones de links viejos: redirects()
// - probar el sitio desde el celular (misma red Wi-Fi): allowedDevOrigins
// ============================================================

const nextConfig: NextConfig = {
  // Sin esto, Next.js bloquea el sitio cuando se abre desde otra
  // computadora/celular de la red (por ejemplo http://192.168.0.101:3000)
  // en vez de localhost. Es la IP de esta compu en la Wi-Fi — si
  // cambia de red o de router, hay que actualizarla acá. Sin la IP
  // correcta acá, la PÁGINA carga bien (HTML/CSS) pero el
  // JavaScript queda bloqueado: se ve todo pero ningún botón
  // responde, que es un síntoma engañoso — parece un bug de la
  // página y en realidad es esto.
  allowedDevOrigins: ['192.168.18.7', '192.168.0.101'],

  images: {
    // AVIF primero (pesa ~50% menos que JPG), WebP como respaldo.
    // El navegador elige solo; vos siempre subís JPG.
    formats: ['image/avif', 'image/webp'],
    // Anchos que Next puede generar. Los de abajo cubren el masonry
    // (columnas angostas) sin generar tamaños que nadie usa.
    deviceSizes: [420, 640, 828, 1080, 1440, 1920],
    imageSizes: [80, 128, 256, 384],
    // Por defecto Next cachea cada foto optimizada solo 4 horas
    // (pensado para imágenes que cambian seguido, como un avatar).
    // Acá una foto de producto no cambia una vez publicada — así
    // que se cachea un año, igual que el JS y las fuentes.
    minimumCacheTTL: 31536000,
    // El caché de un año de arriba tiene una consecuencia: si se
    // REEMPLAZA una foto sin cambiarle el nombre de archivo, el
    // navegador de la gente (y el propio optimizador de Next) la
    // tienen guardada y no la vuelven a pedir. Por eso
    // `getImageUrl()` (src/data/image-sizes.ts) le agrega a cada
    // foto un "?v=<huella del contenido>": cuando el archivo
    // cambia, la huella cambia, y con eso la URL es nueva para
    // cualquier caché.
    //
    // Next necesita permiso explícito para optimizar una foto
    // local que lleva query string (si no, tira 400) — es lo que
    // habilita esto. No se restringe el valor de esa query string
    // (`search`) porque cambia por foto (es la huella) y no hay un
    // solo valor fijo para exigir; es seguro igual, porque esa URL
    // siempre la arma el propio código del sitio con
    // `getImageUrl()`, nunca datos que escriba una visita.
    localPatterns: [{ pathname: '/images/**' }],
  },

  async redirects() {
    return [
      // El sitio viejo linkeaba productos como /?producto=slug
      // Estos links siguen circulando por WhatsApp e Instagram.
      {
        source: '/',
        has: [{ type: 'query', key: 'producto', value: '(?<slug>.*)' }],
        destination: '/producto/:slug',
        permanent: true,
      },
      // El sitio viejo tenía brand.html?brand=slug
      {
        source: '/brand.html',
        has: [{ type: 'query', key: 'brand', value: '(?<slug>.*)' }],
        destination: '/colaboraciones/:slug',
        permanent: true,
      },
      { source: '/gallery.html', destination: '/galeria', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
