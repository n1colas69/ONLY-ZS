import type { Category, CategorySlug } from '@/types';

// ============================================================
// CATEGORÍAS
// ------------------------------------------------------------
// El ORDEN de esta lista es el orden en que aparecen los filtros
// y los bloques de categoría en la home.
//
// Para modificar:
// - renombrar una categoría:  cambiá "name" y "title" (NO toques "slug",
//                             el slug es la URL: /categoria/abrigos)
// - cambiar la foto:          la portada es automática (la foto de tapa
//                             de una pieza real de la categoría, ver
//                             getCategoryImage en src/lib/catalog.ts).
//                             Para fijar una foto propia en vez de eso,
//                             poné la ruta acá en "image"; para volver
//                             a la automática, dejalo en null.
// - agregar una categoría:    sumá el slug al tipo CategorySlug en
//                             src/types/index.ts y después agregala acá
//
// Nota sobre "abrigos": en el sitio viejo había una categoría "Buzos"
// separada que no tenía botón de filtro, así que 3 productos quedaban
// invisibles. Ahora buzos, hoodies, camperas, suéters y chalecos viven
// todos en "abrigos", y el tipo de prenda fino está en los tags.
// ============================================================

export const categories: Category[] = [
  {
    slug: 'abrigos',
    name: 'Abrigos',
    title: 'Abrigos, buzos y camperas',
    image: null,
  },
  {
    slug: 'remeras',
    name: 'Remeras',
    title: 'Remeras y chombas',
    image: null,
  },
  {
    slug: 'pantalones',
    name: 'Pantalones',
    title: 'Pantalones y shorts',
    image: null,
  },
  {
    slug: 'camisas',
    name: 'Camisas',
    title: 'Camisas',
    image: null,
  },
  {
    slug: 'camisetas',
    name: 'Camisetas',
    title: 'Camisetas',
    image: null,
  },
  {
    slug: 'accesorios',
    name: 'Accesorios',
    title: 'Accesorios',
    image: null,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}
