import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductGrid } from '@/components/products/ProductGrid';
import { WishButton } from '@/components/products/WishButton';
import { Icon } from '@/components/ui/Icon';
import { getCategoryName } from '@/data/categories';
import { getImageSize, getImageUrl } from '@/data/image-sizes';
import { products } from '@/data/products';
import { formatPrice, isForSale, STATUS_LABEL } from '@/lib/format';
import { getProduct, getRelatedProducts } from '@/lib/catalog';
import { breadcrumbJsonLd, jsonLdScript, productJsonLd, productMetadata } from '@/lib/seo';
import { buildProductMessage, whatsappUrl } from '@/lib/whatsapp';

// ============================================================
// FICHA DE PRODUCTO — /producto/{slug}
// ------------------------------------------------------------
// Cada pieza tiene su propia dirección web. Es el cambio más
// grande respecto del sitio viejo, donde los 58 productos se
// abrían en una ventana y compartían una sola URL: para Google
// no existía ninguno y los links que se mandaban por WhatsApp
// no llevaban a la pieza.
//
// La página se arma entera en el servidor. Lo único que corre en
// el navegador son dos botones: "agregar a la bolsa" y el corazón.
//
// Para modificar:
// - qué datos se muestran:  el bloque <dl> (talle, estado, medidas)
// - el orden de las fotos:  el array `images` del producto
// - productos relacionados: getRelatedProducts en src/lib/catalog.ts
// ============================================================

/** Genera las 58 páginas en el build. Ninguna se calcula al vuelo. */
export function generateStaticParams() {
  return products
    .filter((product) => product.status !== 'draft')
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Pieza no encontrada' };
  return productMetadata(product);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const categoryName = getCategoryName(product.category);
  const isAvailable = product.status === 'available';
  const isPrivatePrice = product.status === 'private-price';

  // El tamaño de cada foto se resuelve acá, en el servidor, y se le
  // pasa ya listo a ProductGallery: así ZoomImage (componente de
  // cliente) no necesita importar el mapa completo de medidas.
  //
  // `src` se versiona acá mismo (después de medir con la ruta
  // original): si el día de mañana se reemplaza una foto del
  // producto sin cambiarle el nombre, esta ficha la muestra
  // actualizada al toque, sin esperar el año de caché.
  const galleryImages = product.images.map((src) => {
    const [width, height] = getImageSize(src);
    return { src: getImageUrl(src), width, height };
  });

  /** Los datos duros de la pieza. Solo se muestran los que existen. */
  const specs = [
    { label: 'Marca', value: product.brand !== 'Sin marca' ? product.brand : null },
    { label: 'Talle', value: product.size },
    { label: 'Estado', value: product.condition },
    { label: 'Medidas', value: product.measurements },
    { label: 'Categoría', value: categoryName },
  ].filter((spec) => spec.value);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(productJsonLd(product))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Tienda', url: '/tienda' },
            { name: categoryName, url: `/categoria/${product.category}` },
            { name: product.name, url: `/producto/${product.slug}` },
          ])
        )}
      />

      <nav aria-label="Migas de pan" className="label edge py-3">
        <Link href="/tienda" className="hover:text-ink">
          Tienda
        </Link>
        <span className="px-1.5">/</span>
        <Link href={`/categoria/${product.category}`} className="hover:text-ink">
          {categoryName}
        </Link>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-4">
        <ProductGallery images={galleryImages} name={product.name} />

        {/* Los datos quedan fijos mientras se recorren las fotos. Con
            fichas largas (muchas fotos + descripción extensa) este
            bloque puede ser más alto que la pantalla: sin el tope de
            alto + scroll propio, la parte de abajo (la descripción)
            quedaba tapada por el borde de la ventana y no se podía
            leer hasta terminar de recorrer TODA la galería —recién
            ahí el bloque se despega y la página vuelve a scrollear
            "de verdad". El tope lo deja scrollear solo, adentro suyo,
            sin depender de la altura de la galería. Sin
            overscroll-contain a propósito: no es un modal —cuando
            termina su propio scroll, el gesto sigue de largo y
            mueve la página, no se queda "atrapado" adentro. */}
        <div className="px-3 lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:px-0 lg:pt-2 lg:scrollbar-thin">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="label">
                {product.brand !== 'Sin marca' ? product.brand : categoryName}
                {product.isNew && isForSale(product.status) && (
                  <span className="stamp label-ink ml-1.5">Nuevo</span>
                )}
              </p>
              <h1 className="d2 mt-1.5">{product.name}</h1>
            </div>
            <div className="-mr-2 flex shrink-0 items-center gap-1">
              <WishButton
                slug={product.slug}
                name={product.name}
                alwaysVisible
                className="border border-line-strong bg-transparent"
              />
            </div>
          </div>

          {/* El precio va en mono, no en Bebas. Es un dato, y todos
              los datos del sitio (el precio de la tarjeta, la ficha
              técnica de acá abajo, la numeración) están tecleados.
              En Bebas se leía como un titular más. */}
          <p className="mt-5 flex items-baseline gap-3 border-y border-dashed border-line-strong py-3">
            {isAvailable && product.price !== null ? (
              <span className="font-mono text-[1.75rem] leading-none">
                {formatPrice(product.price)}
              </span>
            ) : (
              <span className="stamp label-ink">{STATUS_LABEL[product.status]}</span>
            )}
            {isForSale(product.status) && <span className="label">Pieza única · 1 unidad</span>}
          </p>

          {/* Un solo bloque macizo por pantalla. La consulta por
              WhatsApp era una segunda barra a ancho completo igual
              de alta que la primera: dos carteles compitiendo. Como
              link tecleado y subrayado sigue estando a un toque, con
              su área táctil de 44px, pero deja de disputarle el peso
              a la acción principal. */}
          <div className="mt-6">
            {isAvailable ? (
              <>
                <AddToCartButton slug={product.slug} name={product.name} />
                <a
                  href={whatsappUrl(buildProductMessage(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-ink mt-3 inline-flex min-h-11 items-center gap-2 underline decoration-accent decoration-2 underline-offset-4"
                >
                  <Icon name="whatsapp" size={16} />
                  Consultar por WhatsApp
                </a>
              </>
            ) : isPrivatePrice ? (
              // Sin precio público: el WhatsApp ES el botón principal,
              // no un link al pie. No hay AddToCartButton porque el
              // carrito necesita un precio para calcular el total.
              <a
                href={whatsappUrl(buildProductMessage(product))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 w-full items-center justify-between gap-2 bg-ink px-4 text-[0.6875rem] font-medium tracking-[0.14em] text-paper uppercase transition-colors hover:bg-ash"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="whatsapp" size={16} />
                  Consultar precio por WhatsApp
                </span>
                <Icon name="arrow-right" size={16} />
              </a>
            ) : (
              <a
                href={whatsappUrl(buildProductMessage(product))}
                target="_blank"
                rel="noopener noreferrer"
                className="label-ink inline-flex min-h-11 items-center gap-2 underline decoration-accent decoration-2 underline-offset-4"
              >
                <Icon name="whatsapp" size={16} />
                {product.status === 'coming-soon'
                  ? 'Avisame cuando salga'
                  : '¿Buscás algo parecido? Escribinos'}
              </a>
            )}
          </div>

          {specs.length > 0 && (
            <dl className="mt-8 border-t border-dashed border-line-strong">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex gap-4 border-b border-dashed border-line-strong py-2.5"
                >
                  <dt className="label w-24 shrink-0 pt-0.5">{spec.label}</dt>
                  <dd className="font-mono text-[0.8125rem]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {product.description && (
            <div className="mt-6">
              <h2 className="label mb-2">Descripción</h2>
              {/* whitespace-pre-line respeta los saltos de línea que
                  escribiste en la descripción del producto. */}
              <p className="max-w-prose whitespace-pre-line text-ash">{product.description}</p>
            </div>
          )}

          <p className="label mt-8 border-t border-dashed border-line-strong pt-4">
            Vintage no significa perfecto. Los defectos, si los hay, están en las fotos y en la
            descripción.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="rhythm edge" aria-labelledby="relacionados">
          <h2
            id="relacionados"
            className="d2 mb-4 border-b border-dashed border-line-strong pb-2"
          >
            También te puede interesar
          </h2>
          {/* Siempre queda debajo de toda la ficha del producto (fotos,
              precio, descripción): nunca es lo primero que se ve, así
              que sus fotos no necesitan cargar con prioridad. */}
          <ProductGrid products={related} allowWide={false} priority={false} />
        </section>
      )}
    </>
  );
}
