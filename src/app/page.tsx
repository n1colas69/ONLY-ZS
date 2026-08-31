import Image from 'next/image';
import Link from 'next/link';
import { Marquee } from '@/components/layout/Marquee';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Icon } from '@/components/ui/Icon';
import { SearchBar } from '@/components/search/SearchBar';
import { categories } from '@/data/categories';
import { collaborations } from '@/data/collaborations';
import { galleryPhotos } from '@/data/gallery';
import { getImageSize, getImageUrl } from '@/data/image-sizes';
import { homeCopy, site } from '@/data/site';
import { getCategoryImage, getFeaturedProducts, getPublicProducts } from '@/lib/catalog';

// ============================================================
// HOME
// ------------------------------------------------------------
// La home es principalmente visual. No hay hero gigante con un
// eslogan inventado, ni "descubrí tu estilo", ni tres tarjetas
// iguales, ni testimonios. En celular se ve una pieza real sin
// scrollear.
//
// El orden de los bloques es:
//   1. apertura       foto + nombre
//   2. marcas         marquee
//   3. categorías
//   4. último ingreso lo que se puede comprar ahora
//   5. corte editorial una frase de la marca sobre una foto
//   6. colaboraciones
//   7. galería
//
// Para modificar:
// - los textos:            homeCopy en src/data/site.ts
// - cuántos productos:     el número en getFeaturedProducts()
// - de dónde sale la foto
//   de apertura:           galleryPhotos, en src/data/gallery.ts
// - el orden de los bloques: moviendo las <section> de abajo
//
// La foto de apertura sale al azar de la Galería ZS (no de los
// productos) y cambia en cada visita. Son fotos de la comunidad:
// casi todas verticales (teléfono), como se ve en la medida real
// de cada una (src/data/image-sizes.ts). Eso es un problema si se
// usa LA MISMA foto recortada tanto en el marco angosto de celular
// como en uno panorámico de escritorio: lo que se ve bien recortado
// en 4:5 queda pésimo forzado a un recorte ancho.
//
// Por eso son DOS sorteos independientes, cada uno con su propia
// medida:
// - celular:    foto vertical (la mayoría de la galería), en 4:5
// - escritorio: foto entre cuadrada y horizontal, en 3:2 — más
//   angosto que un banner de cine a propósito, porque no hay fotos
//   panorámicas reales en la galería y forzar un recorte 21:9
//   sobre una foto vertical corta cabezas.
// Los dos marcos usan object-cover, así que cualquier foto que
// toque llena el espacio sin deformarse ni dejar huecos.
//
// La página necesita ser dinámica (no pre-generada en el build)
// para que el sorteo pase en cada visita real, no una sola vez.
// ============================================================

export const dynamic = 'force-dynamic';

const FALLBACK_HERO = { src: '/images/gallery/hero.jpg', alt: 'ONLY ZS' };

/** true si la foto es más ancha que alta (o casi cuadrada): sirve para el marco de escritorio. */
function isWidish(photo: { src: string }) {
  const [width, height] = getImageSize(photo.src);
  return width / height >= 1;
}

function randomFrom(pool: typeof galleryPhotos) {
  if (pool.length === 0) return FALLBACK_HERO;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export default function HomePage() {
  const featured = getFeaturedProducts(10);
  const total = getPublicProducts().length;
  const collaboration = collaborations[0];

  const wide = galleryPhotos.filter(isWidish);
  const tall = galleryPhotos.filter((photo) => !isWidish(photo));
  const heroMobile = randomFrom(tall.length > 0 ? tall : galleryPhotos);
  const heroDesktop = randomFrom(wide.length > 0 ? wide : galleryPhotos);
  // Una tira de la galería, salteada, para que no sean las 4 primeras.
  const strip = [galleryPhotos[2], galleryPhotos[9], galleryPhotos[17], galleryPhotos[25]].filter(
    (photo) => photo !== undefined
  );

  return (
    <>
      {/* ---------- 1. APERTURA ----------
          El nombre se apoya sobre la foto, desbordando el margen.
          No hay botón de "comprar ahora": el catálogo está a un
          scroll de distancia y se ve solo. */}
      <section className="relative">
        {/* Celular: foto vertical, marco 4:5. */}
        <div className="relative aspect-4/5 w-full md:hidden">
          <Image
            key={heroMobile.src}
            src={getImageUrl(heroMobile.src)}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        {/* Escritorio: foto horizontal/cuadrada, marco 3:2 — distinta
            foto y distinto recorte, pensado para este formato. */}
        <div className="relative hidden md:block md:aspect-3/2">
          <Image
            key={heroDesktop.src}
            src={getImageUrl(heroDesktop.src)}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* El nombre va en un bloque de tinta macizo, apoyado en la
            base de la foto. Antes acá había un degradado de negro a
            transparente sobre toda la imagen: es el recurso más
            usado del e-commerce, tapa media foto y además no
            garantiza contraste (depende de qué salió sorteado
            debajo). Un bloque sólido de borde duro es el gesto de
            imprenta —la faja de una tapa— y el contraste es siempre
            el mismo, mire la foto que mire.

            Usa el par tinta/papel, así que en modo oscuro se da
            vuelta solo, como el resto del sitio. */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="inline-block bg-ink px-3 pt-2 pb-1 md:px-4 md:pt-3">
            <p className="label text-paper/70">{homeCopy.tagline}</p>
            <h1 className="font-display text-paper text-[19vw] leading-[0.78] md:text-[12vw]">
              ONLY ZS
            </h1>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ---------- BUSCADOR PRINCIPAL ----------
          Antes el buscador vivía en el header, detrás de una lupa
          que abría un panel. Acá está a la vista, entre la apertura
          y las categorías: es un <form> común que manda a /tienda,
          así que funciona sin JavaScript. */}
      <section className="edge py-6 md:py-8" aria-label="Buscador">
        <SearchBar />
      </section>

      {/* ---------- 3. CATEGORÍAS ----------
          Un índice, no seis tarjetas. La foto se deja en paz: no
          lleva velo encima ni nombre pisado, y el nombre va DEBAJO,
          separado por una regla, como el pie de una lámina.

          Antes cada foto llevaba un `bg-scrim/35` fijo y crecía un
          3% al pasar el mouse. Las dos cosas son de plantilla: el
          velo parejo apaga las seis fotos por igual (justo lo que
          no queremos, que la foto mande) y el zoom es el hover más
          repetido del rubro. Acá el hover no toca la imagen: mueve
          la tipografía, que es lo que hace un impreso. */}
      <section className="rhythm edge" aria-labelledby="categorias">
        <h2 id="categorias" className="label mb-4">
          Categorías
        </h2>
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-6 md:gap-x-3 md:gap-y-0">
          {categories.map((category, index) => {
            const cover = category.image ?? getCategoryImage(category.slug);
            return (
              <Link key={category.slug} href={`/categoria/${category.slug}`} className="group block">
                <div className="shadow-card">
                  <div className="relative aspect-3/4 overflow-hidden bg-paper-dim md:aspect-square">
                    {cover && (
                      <Image
                        src={getImageUrl(cover)}
                        alt=""
                        fill
                        sizes="(max-width: 48rem) 50vw, 16vw"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-dashed border-line-strong pt-1.5">
                  <span className="d3 inline-block transition-transform duration-200 group-hover:translate-x-1">
                    {category.name}
                  </span>
                  <span className="label tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- 4. ÚLTIMO INGRESO ----------
          El link al catálogo completo va arriba, al lado del título,
          y no repetido en un botón centrado abajo. Un botón grande
          y centrado debajo de una grilla es puntuación de landing
          page: acá el mismo destino ya está a la vista antes de
          empezar a mirar fotos. */}
      <section className="rhythm edge" aria-labelledby="ultimo-ingreso">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-dashed border-line-strong pb-2">
          <h2 id="ultimo-ingreso" className="d2">
            {homeCopy.latestLabel}
          </h2>
          <Link href="/tienda" className="label-ink shrink-0 pb-1 hover:text-ash">
            Ver las {total} piezas →
          </Link>
        </div>

        <ProductGrid products={featured} numbered />
      </section>

      {/* ---------- 5. CORTE EDITORIAL ----------
          Una foto ancha y una frase real de ONLY ZS. Es el bloque
          que dice qué es esto sin recurrir a copy de marketing.

          Acá se ve el contraste de márgenes que ordena toda la
          página: la foto llega al borde del papel (sin margen) y el
          texto que sigue entra bien adentro (.gutter). Esa es la
          respiración; si los dos usaran el mismo margen —que era lo
          que pasaba— la página queda plana aunque el contenido esté
          bien. */}
      <section className="rhythm">
        <div className="relative aspect-3/2 w-full md:aspect-3/1">
          <Image
            src={getImageUrl(galleryPhotos[14]?.src ?? '/images/gallery/1.jpg')}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="gutter grid gap-5 py-10 md:grid-cols-[1fr_1fr] md:gap-16 md:py-16">
          <p className="d1">{homeCopy.statement}</p>
          <p className="max-w-prose self-end text-ash">{homeCopy.statementBody}</p>
        </div>
      </section>

      {/* ---------- 6. COLABORACIONES ---------- */}
      {collaboration && (
        <section className="rhythm edge" aria-labelledby="colabs">
          <h2 id="colabs" className="label mb-4">
            {homeCopy.collabsLabel}
          </h2>
          <Link
            href={`/colaboraciones/${collaboration.slug}`}
            className="group grid gap-4 md:grid-cols-[1.6fr_1fr] md:gap-10"
          >
            <div className="shadow-card">
              <div className="relative aspect-3/2 overflow-hidden bg-paper-dim">
                <Image
                  src={collaboration.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 48rem) 100vw, 60vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="self-end border-t border-dashed border-line-strong pt-3">
              <p className="d3">{collaboration.title}</p>
              <p className="mt-2 text-ash">{collaboration.tagline}</p>
              <p className="label-ink mt-4 inline-block transition-transform duration-200 group-hover:translate-x-1">
                Ver la colaboración →
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* ---------- 7. GALERÍA ---------- */}
      <section className="rhythm edge" aria-labelledby="galeria">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-dashed border-line-strong pb-2">
          <h2 id="galeria" className="d2">
            {homeCopy.galleryLabel}
          </h2>
          <Link href="/galeria" className="label-ink shrink-0 pb-1 hover:text-ash">
            Ver todas →
          </Link>
        </div>
        <p className="mb-4 max-w-prose text-ash">{homeCopy.galleryIntro}</p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {strip.map((photo) => (
            <div key={photo.src} className="shadow-card">
              <div className="relative aspect-square overflow-hidden bg-paper-dim">
                <Image
                  src={getImageUrl(photo.src)}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 48rem) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <a
          href={site.instagramDirect}
          target="_blank"
          rel="noopener noreferrer"
          className="label-ink mt-4 inline-flex min-h-11 items-center gap-2 underline decoration-accent decoration-2 underline-offset-4"
        >
          <Icon name="instagram" size={16} />
          Mandá la tuya por Instagram
        </a>
      </section>
    </>
  );
}
