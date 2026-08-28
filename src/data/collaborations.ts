import type { Collaboration } from '@/types';

// ============================================================
// COLABORACIONES
// ------------------------------------------------------------
// Cada entrada genera su propia página: /colaboraciones/{slug}
//
// Para agregar una colaboración:
// 1. Creá la carpeta public/images/collaborations/<slug>/
// 2. Poné adentro hero.jpg y las fotos que quieras (1.jpg, 2.jpg, ...)
// 3. Copiá un bloque de acá abajo y completá los datos
//
// El sitio viejo tenía dos entradas vacías de relleno ("Próxima
// Colaboración", "Deep Indumentaria") con el mismo texto duplicado y
// fotos que no existían. No se migraron: una sección se ve mejor con
// una colaboración real que con tres, dos de ellas de mentira.
// ============================================================

export const collaborations: Collaboration[] = [
  {
    slug: 'culto-a-las-calles',
    title: 'Culto A Las Calles',
    tagline: 'Culto, skate y calle en fotografía.',
    description:
      'Culto A Las Calles documenta la escena desde adentro: spots, sesiones nocturnas, ruedas gastadas y ese pulso de calle que no se fabrica. Sus fotos, realizadas por Pato, convierten cada truco y cada esquina en archivo visual de la calle.',
    instagram: 'https://www.instagram.com/culto.a.las.calles/',
    youtube: 'https://www.youtube.com/@culto.a.las.calles',
    video: {
      title: 'el caos x ellas',
      url: 'https://www.youtube.com/watch?v=qB2GjHAJyXo',
    },
    heroImage: '/images/collaborations/culto-a-las-calles/hero.jpg',
    gallery: [
      '/images/collaborations/culto-a-las-calles/1.jpg',
      '/images/collaborations/culto-a-las-calles/2.jpg',
      '/images/collaborations/culto-a-las-calles/3.jpg',
      '/images/collaborations/culto-a-las-calles/4.jpg',
    ],
  },
];

export function getCollaboration(slug: string): Collaboration | undefined {
  return collaborations.find((collaboration) => collaboration.slug === slug);
}
