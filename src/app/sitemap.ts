import type { MetadataRoute } from 'next';
import { categories } from '@/data/categories';
import { collaborations } from '@/data/collaborations';
import { infoPages, site } from '@/data/site';
import { getPublicProducts } from '@/lib/catalog';
import { isForSale } from '@/lib/format';

// ============================================================
// SITEMAP
// ------------------------------------------------------------
// Se genera solo a partir de los datos. Cuando agregás un
// producto a src/data/products.ts, su página entra acá sola: no
// hay nada que actualizar a mano.
//
// El sitio viejo no tenía sitemap y todos los productos vivían en
// una única dirección, así que Google no indexó ninguno.
// ============================================================

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/tienda'), changeFrequency: 'daily', priority: 0.9 },
    { url: url('/galeria'), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/colaboraciones'), changeFrequency: 'monthly', priority: 0.6 },

    ...categories.map((category) => ({
      url: url(`/categoria/${category.slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...getPublicProducts().map((product) => ({
      url: url(`/producto/${product.slug}`),
      changeFrequency: 'weekly' as const,
      // Lo que se puede comprar pesa más que lo ya vendido.
      priority: isForSale(product.status) ? 0.8 : 0.4,
    })),

    ...collaborations.map((collaboration) => ({
      url: url(`/colaboraciones/${collaboration.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),

    ...infoPages.map((page) => ({
      url: url(`/info/${page.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
