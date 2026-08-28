import type { ReactNode } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { gridStatements } from '@/data/site';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

// ============================================================
// GRILLA DEL CATÁLOGO
// ------------------------------------------------------------
// Masonry editorial. La irregularidad viene de dos lugares:
//
//   1. EL RECORTE (CROPS, acá abajo). Todas las fotos del catálogo
//      son 4:5 o 3:4 — entre una y otra hay un 6% de diferencia de
//      altura, o sea nada. Si la grilla se apoya solo en la
//      proporción original, sale una grilla regular. Así que el
//      ritmo se escribe: cada pieza recibe un recorte de una
//      secuencia de siete, que mezcla cuadradas y bien altas.
//      Siete es primo con 2, 3, 4 y 5 (las columnas que puede
//      tener la grilla), así que el patrón nunca se alinea con una
//      columna y no se ve el repetido.
//
//   2. LAS PIEZAS DESTACADAS, que siempre llevan el recorte más
//      alto y por lo tanto dominan su columna.
//
// Cada tantas piezas, la grilla se CORTA y entra una frase a todo
// el ancho (StatementBand). Antes la frase era una tarjeta más
// adentro del masonry; como corte de página real —regla arriba,
// regla abajo, texto metido adentro— hace lo que tiene que hacer:
// frenar el scroll de fotos, como una página de texto en un
// catálogo impreso.
//
// Para modificar:
// - cantidad de columnas:  la utilidad `masonry` en globals.css
// - el ritmo de recortes:  CROPS
// - las frases:            gridStatements en src/data/site.ts
// - cada cuántas piezas
//   corta una frase:       STATEMENT_EVERY
// - separación entre fotos: `masonry` / `masonry-item` en globals.css
//
// SIZES le dice al navegador cuánto espacio ocupa cada foto, para
// que descargue el tamaño justo. Si cambiás la cantidad de
// columnas, actualizá también esto.
// ============================================================

const SIZES = '(max-width: 48rem) 50vw, (max-width: 80rem) 33vw, (max-width: 100rem) 25vw, 20vw';

/** Cuántas fotos se cargan con prioridad (las que se ven sin scrollear). */
const PRIORITY_COUNT = 4;

/** Cada cuántas piezas la grilla se corta con una frase. */
const STATEMENT_EVERY = 12;

/**
 * El ritmo de recortes. Alturas relativas al ancho de la columna:
 * 1/1 = 1,00 · 4/5 = 1,25 · 3/4 = 1,33 · 2/3 = 1,50.
 * Son todos recortes que se pueden hacer sobre una foto vertical
 * sin cortar la prenda; por eso no hay ninguno apaisado.
 */
const CROPS = ['4/5', '1/1', '3/4', '2/3', '4/5', '3/4', '1/1'];

/** El recorte más alto: el que llevan las piezas destacadas. */
const CROP_FEATURED = '2/3';

interface ProductGridProps {
  products: Product[];
  /** Muestra el código de archivo sobre la foto. */
  numbered?: boolean;
  /** Permite los cortes de frase y el recorte alto de las destacadas. */
  allowWide?: boolean;
  /**
   * false cuando esta grilla NUNCA se ve sin scrollear (por ejemplo,
   * "también te puede interesar" al final de la ficha de producto):
   * ahí cargar las primeras fotos con prioridad no adelanta nada,
   * y le saca ancho de banda a la foto que sí importa arriba.
   */
  priority?: boolean;
  className?: string;
}

/** El corte de página: una frase entre dos reglas, a todo el ancho. */
function StatementBand({ text, flip }: { text: string; flip: boolean }) {
  return (
    <div className="border-y border-dashed border-line-strong py-10 md:py-16">
      <p
        className={cn(
          'gutter d2 max-w-[22ch]',
          // Una sí y una no arranca desde la derecha. Es lo que
          // evita que los cortes se lean como un bloque repetido.
          flip && 'ml-auto text-right'
        )}
      >
        {text}
      </p>
    </div>
  );
}

export function ProductGrid({
  products,
  numbered = false,
  allowWide = true,
  priority = true,
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="py-24 text-center text-ash">No hay piezas que coincidan con esa búsqueda.</p>;
  }

  // Las piezas se parten en tandas; entre tanda y tanda va una
  // frase. Cada tanda es su propio masonry: así el corte es de
  // verdad un corte, y no una tarjeta ancha metida en el flujo.
  const chunks: Product[][] = [];
  const size = allowWide ? STATEMENT_EVERY : products.length;
  for (let index = 0; index < products.length; index += size) {
    chunks.push(products.slice(index, index + size));
  }

  let offset = 0;
  const blocks: ReactNode[] = [];

  chunks.forEach((chunk, chunkIndex) => {
    const start = offset;
    offset += chunk.length;

    blocks.push(
      <div key={`tanda-${chunkIndex}`} className={cn('masonry', chunkIndex > 0 && 'pt-8 md:pt-12')}>
        {chunk.map((product, indexInChunk) => {
          const index = start + indexInChunk;
          const crop =
            allowWide && product.featured ? CROP_FEATURED : CROPS[index % CROPS.length]!;

          return (
            <ProductCard
              key={product.slug}
              product={product}
              sizes={SIZES}
              crop={crop}
              priority={priority && index < PRIORITY_COUNT}
              // Solo la primerísima foto de la grilla pide prioridad
              // "alta" de verdad: pedirla para varias a la vez hace
              // que compitan entre sí por ancho de banda en vez de
              // ayudar a la que realmente se pinta primero.
              fetchPriority={priority && index === 0 ? 'high' : undefined}
              showCode={numbered}
              className="masonry-item"
            />
          );
        })}
      </div>
    );

    // Frase solo ENTRE tandas: nunca al final de la grilla, donde
    // sería un bloque de texto colgado sin nada después.
    const isLast = chunkIndex === chunks.length - 1;
    if (allowWide && !isLast && gridStatements.length > 0) {
      const text = gridStatements[chunkIndex % gridStatements.length]!;
      blocks.push(
        <StatementBand key={`frase-${chunkIndex}`} text={text} flip={chunkIndex % 2 === 1} />
      );
    }
  });

  return <div className={className}>{blocks}</div>;
}
