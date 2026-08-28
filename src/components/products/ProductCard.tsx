import Link from 'next/link';
import Image from 'next/image';
import { WishButton } from '@/components/products/WishButton';
import { ProductImage } from '@/components/ui/ProductImage';
import { getImageUrl } from '@/data/image-sizes';
import { cn } from '@/lib/cn';
import { isForSale, priceLabel } from '@/lib/format';
import type { Product } from '@/types';

// ============================================================
// TARJETA DE PRODUCTO
// ------------------------------------------------------------
// La tarjeta ES la foto. No tiene borde, ni fondo, ni sombra, ni
// botón de comprar: eso es lo que hace que un catálogo parezca
// una plantilla. Comprar se hace en la ficha del producto.
//
// Debajo de la foto van tres líneas, en este orden:
//   MARCA · NUEVO      (micro-label, gris)
//   Nombre del producto
//   $25.000  /  Vendido
//
// Para modificar:
// - qué información se muestra:  el bloque <div> del final
// - el recorte de la foto:       lo decide la grilla (prop `crop`)
// - segunda foto al pasar el mouse: el <Image> con opacity-0
// - posición del corazón:        las clases del <WishButton>
// ============================================================

/**
 * Código de archivo de la pieza: ZS·047.
 *
 * Antes acá iba la posición en la grilla (01, 02, 03…). Con la
 * grilla en masonry el orden se lee hacia abajo por columna, así
 * que una numeración correlativa aparecía en pantalla como
 * "01 · 05 · 09 / 02 · 06 · 10": se leía como un error, no como
 * un catálogo.
 *
 * Este código sale del slug, no de la posición: es el MISMO número
 * para la misma pieza en la home, en la tienda y en su categoría,
 * y no hay orden que se pueda romper. Que dos piezas compartan
 * número no molesta — es un sello, no un identificador.
 */
function archiveCode(slug: string) {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) % 1000;
  }
  return String(hash).padStart(3, '0');
}

interface ProductCardProps {
  product: Product;
  /** Cuánto espacio ocupa la foto. Se lo pasa la grilla. */
  sizes: string;
  /** Proporción del recorte ("4/5", "2/3"). Se lo pasa la grilla. */
  crop?: string;
  /** true para las primeras fotos de la página (carga prioritaria). */
  priority?: boolean;
  /** true SOLO para la primera foto de toda la página (ver ProductImage). */
  fetchPriority?: 'high';
  /** Muestra el código de archivo sobre la foto. */
  showCode?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  sizes,
  crop,
  priority = false,
  fetchPriority,
  showCode = false,
  className,
}: ProductCardProps) {
  const cover = product.images[0];
  const hover = product.images[1];
  const href = `/producto/${product.slug}`;
  const hasNumericPrice = product.status === 'available' && product.price !== null;

  return (
    <article className={cn('group relative', className)}>
      <Link href={href} className="block focus-visible:outline-offset-4">
        <div className="relative">
          {cover ? (
            <ProductImage
              src={cover}
              alt={product.name}
              sizes={sizes}
              aspect={crop}
              priority={priority}
              fetchPriority={fetchPriority}
            />
          ) : (
            <div className="bg-paper-dim" style={{ aspectRatio: crop ?? '4 / 5' }} />
          )}

          {/* Segunda foto: aparece al pasar el mouse. Solo en
              escritorio y solo si la pieza tiene más de una foto.
              Es CSS puro, sin JavaScript. */}
          {hover && (
            <Image
              src={getImageUrl(hover)}
              alt=""
              fill
              sizes={sizes}
              loading="lazy"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden object-cover opacity-0 transition-opacity duration-[400ms] ease-[var(--ease-out-soft)] group-hover:opacity-100 md:block"
            />
          )}

          {/* El código de archivo. Chico, arriba a la izquierda,
              sobre la foto. Es el detalle que convierte la grilla en
              un catálogo y no en una tienda. */}
          {showCode && (
            <span className="stamp label absolute top-2 left-2 text-on-scrim mix-blend-difference">
              ZS·{archiveCode(product.slug)}
            </span>
          )}
        </div>

        <div className="pt-2 pb-1">
          <p className="label">
            {product.brand !== 'Sin marca' ? product.brand : product.size ?? '—'}
            {product.isNew && isForSale(product.status) && (
              <span className="stamp label-ink ml-1.5">Nuevo</span>
            )}
          </p>
          {/* El mismo nudge que el nombre de categoría en la home:
              al pasar el cursor, el nombre se corre un toque a la
              derecha. Es la tipografía la que responde, no la foto. */}
          <h3 className="mt-1 text-[0.8125rem] leading-snug font-normal transition-transform duration-200 group-hover:translate-x-1">
            {product.name}
          </h3>
          <p className={cn('mt-0.5', hasNumericPrice ? 'font-mono text-[0.8125rem] text-ink' : 'stamp label')}>
            {priceLabel(product.price, product.status)}
          </p>
        </div>
      </Link>

      {/* Fuera del <Link>: un botón no puede estar dentro de un link. */}
      <WishButton slug={product.slug} name={product.name} className="absolute top-0 right-0 z-10" />
    </article>
  );
}
