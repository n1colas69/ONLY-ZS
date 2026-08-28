// ============================================================
// SEO
// ------------------------------------------------------------
// Metadatos y datos estructurados (JSON-LD).
//
// El sitio viejo tenía UNA sola URL para 58 productos, así que
// para Google no existía ninguno. Ahora cada pieza tiene su
// página, su título, su descripción y su foto para compartir.
//
// Para modificar:
// - título y descripción generales:  src/data/site.ts
// - cómo se arma el título de un producto:  productMetadata
// ============================================================

import type { Metadata } from 'next';
import { getCategoryName } from '@/data/categories';
import { getImageUrl } from '@/data/image-sizes';
import { site } from '@/data/site';
import { formatPrice } from '@/lib/format';
import type { Collaboration, Product } from '@/types';

/** Recorta un texto sin cortar palabras al medio. */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)).trimEnd() + '…';
}

/**
 * Descripción de un producto para Google y para WhatsApp.
 * Sale de la descripción REAL de la pieza, más talle y estado.
 * No es una plantilla del tipo "Comprá X al mejor precio".
 */
export function productDescription(product: Product): string {
  const facts = [
    product.brand !== 'Sin marca' ? product.brand : null,
    product.size ? `Talle ${product.size}` : null,
    product.condition ? `Estado ${product.condition}` : null,
    product.status === 'available' && product.price !== null
      ? formatPrice(product.price)
      : product.status === 'private-price'
        ? 'Precio a consultar'
        : product.status === 'sold'
          ? 'Vendido'
          : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const body = product.description.trim();
  return truncate(body ? `${facts}. ${body}` : facts);
}

export function productMetadata(product: Product): Metadata {
  const url = `${site.url}/producto/${product.slug}`;
  const description = productDescription(product);
  const title = `${product.name} — ${getCategoryName(product.category)}`;
  const image = product.images[0] ? `${site.url}${getImageUrl(product.images[0])}` : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: `${product.name} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: 'es_AR',
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${site.name}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// ---------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------

/** Mapea el estado de ONLY ZS al vocabulario que entiende Google. */
function availability(product: Product): string {
  switch (product.status) {
    case 'available':
    case 'private-price':
      return 'https://schema.org/InStock';
    case 'coming-soon':
      return 'https://schema.org/PreOrder';
    default:
      return 'https://schema.org/SoldOut';
  }
}

export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: productDescription(product),
    sku: product.slug,
    image: product.images.map((image) => `${site.url}${getImageUrl(image)}`),
    brand: product.brand !== 'Sin marca' ? { '@type': 'Brand', name: product.brand } : undefined,
    category: getCategoryName(product.category),
    size: product.size ?? undefined,
    offers: {
      '@type': 'Offer',
      url: `${site.url}/producto/${product.slug}`,
      priceCurrency: 'ARS',
      price: product.price ?? undefined,
      availability: availability(product),
      // Es literalmente el negocio: ropa usada, seleccionada a mano.
      itemCondition: 'https://schema.org/UsedCondition',
      seller: { '@type': 'Organization', name: site.name },
    },
  };
}

export function breadcrumbJsonLd(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/brand/logo.png`,
    telephone: `+${site.whatsapp}`,
    sameAs: [site.instagram],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: 'La Rioja',
      addressCountry: site.country,
    },
    priceRange: '$$',
  };
}

export function collaborationMetadata(collaboration: Collaboration): Metadata {
  const url = `${site.url}/colaboraciones/${collaboration.slug}`;
  const image = `${site.url}${collaboration.heroImage}`;
  return {
    title: collaboration.title,
    description: truncate(collaboration.description),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${collaboration.title} | ${site.name}`,
      description: truncate(collaboration.description),
      url,
      images: [{ url: image, alt: collaboration.title }],
    },
  };
}

/** Componente helper: inserta un bloque JSON-LD en el HTML. */
export function jsonLdScript(data: object): { __html: string } {
  return { __html: JSON.stringify(data) };
}
