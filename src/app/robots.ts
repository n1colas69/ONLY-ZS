import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// ============================================================
// ROBOTS.TXT
// ------------------------------------------------------------
// Le dice a Google qué mirar y qué ignorar.
// La bolsa y los favoritos son personales de cada navegador:
// no tiene sentido que aparezcan en una búsqueda.
// ============================================================

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrito', '/favoritos'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
