import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { categories } from '@/data/categories';
import { collaborations } from '@/data/collaborations';
import { galleryPhotos } from '@/data/gallery';
import { products } from '@/data/products';
import { getCategoryImage, getPublicProducts } from '@/lib/catalog';

// ============================================================
// TESTS DE LOS DATOS
// ------------------------------------------------------------
// Estos son los más útiles para vos: revisan que el catálogo esté
// bien escrito. Si agregás un producto y te olvidás una foto, le
// ponés una categoría que no existe o repetís un slug, `npm test`
// te lo dice con nombre y apellido.
//
// Corré `npm test` antes de publicar. Tarda dos segundos.
// ============================================================

const CATEGORY_SLUGS = categories.map((category) => category.slug);
const exists = (url: string) => fs.existsSync(path.join('public', url.replace(/^\//, '')));

describe('catálogo', () => {
  it('no tiene dos productos con el mismo slug', () => {
    const slugs = products.map((product) => product.slug);
    const duplicated = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
    expect(duplicated).toEqual([]);
  });

  it('todos los slugs son aptos para una URL', () => {
    // sin espacios, sin acentos, sin apóstrofos: el sitio viejo
    // tenía el id "sueter-levi's" y eso rompía el botón de compra.
    const invalid = products.filter((product) => !/^[a-z0-9-]+$/.test(product.slug));
    expect(invalid.map((product) => product.slug)).toEqual([]);
  });

  it('todas las categorías existen', () => {
    const invalid = products.filter((product) => !CATEGORY_SLUGS.includes(product.category));
    expect(invalid.map((product) => `${product.slug} -> ${product.category}`)).toEqual([]);
  });

  it('toda categoría tiene al menos una pieza (ninguna queda huérfana)', () => {
    // En el sitio viejo la categoría "Buzos" existía en los datos
    // pero no tenía filtro, así que 3 productos eran inalcanzables.
    const empty = CATEGORY_SLUGS.filter(
      (slug) => !getPublicProducts().some((product) => product.category === slug)
    );
    expect(empty).toEqual([]);
  });

  it('todo lo que está a la venta tiene precio', () => {
    const broken = products.filter(
      (product) => product.status === 'available' && (!product.price || product.price <= 0)
    );
    expect(broken.map((product) => product.slug)).toEqual([]);
  });

  it('nada que no esté disponible muestra precio', () => {
    // Así se evita que vuelvan los "$0" y los precios de piezas vendidas.
    const broken = products.filter(
      (product) => product.status === 'sold' && product.price !== null
    );
    expect(broken.map((product) => product.slug)).toEqual([]);
  });

  it('lo de precio privado no lleva un número de precio', () => {
    // 'private-price' es precio a acordar por WhatsApp: si le queda
    // un número, deja de ser privado.
    const broken = products.filter(
      (product) => product.status === 'private-price' && product.price !== null
    );
    expect(broken.map((product) => product.slug)).toEqual([]);
  });

  it('todo lo publicado tiene al menos una foto', () => {
    const broken = getPublicProducts().filter((product) => product.images.length === 0);
    expect(broken.map((product) => product.slug)).toEqual([]);
  });

  it('todas las fotos existen en public/', () => {
    // Las fotos se resuelven desde la carpeta de cada producto
    // (src/lib/images.ts), así que esto también confirma que el
    // resolver arma bien la ruta de cada archivo.
    const missing: string[] = [];
    for (const product of getPublicProducts()) {
      for (const image of product.images) {
        if (!exists(image)) missing.push(`${product.slug}: ${image}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('conserva las 58 piezas del sitio viejo', () => {
    // Red de seguridad de la migración: si alguna se pierde, salta acá.
    expect(products.length).toBeGreaterThanOrEqual(58);
  });
});

describe('categorías', () => {
  it('las fotos de portada existen', () => {
    const missing = categories
      .filter((category) => category.image && !exists(category.image))
      .map((category) => category.slug);
    expect(missing).toEqual([]);
  });

  it('toda categoría tiene una portada (propia o de un producto)', () => {
    // Sin "image" fijo, la portada sale de getCategoryImage: la foto de
    // tapa de una pieza real de la categoría. Si una categoría se queda
    // sin ninguna pieza con fotos, la portada desaparece sin avisar.
    const missing = categories
      .filter((category) => !(category.image ?? getCategoryImage(category.slug)))
      .map((category) => category.slug);
    expect(missing).toEqual([]);
  });
});

describe('galería', () => {
  it('todas las fotos existen', () => {
    const missing = galleryPhotos.filter((photo) => !exists(photo.src)).map((photo) => photo.src);
    expect(missing).toEqual([]);
  });

  it('todas tienen texto alternativo', () => {
    expect(galleryPhotos.every((photo) => photo.alt.trim().length > 0)).toBe(true);
  });
});

describe('colaboraciones', () => {
  it('las fotos existen', () => {
    const missing: string[] = [];
    for (const collaboration of collaborations) {
      if (!exists(collaboration.heroImage)) missing.push(collaboration.heroImage);
      for (const image of collaboration.gallery) {
        if (!exists(image)) missing.push(image);
      }
    }
    expect(missing).toEqual([]);
  });

  it('los slugs son aptos para una URL', () => {
    // El sitio viejo tenía la clave "Deep-Indumentaria" con mayúsculas
    // y el link en minúsculas: nunca coincidían y mostraba otra marca.
    const invalid = collaborations.filter(
      (collaboration) => !/^[a-z0-9-]+$/.test(collaboration.slug)
    );
    expect(invalid.map((collaboration) => collaboration.slug)).toEqual([]);
  });
});
