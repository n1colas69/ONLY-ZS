'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { toast, useCart } from '@/lib/store';

// ============================================================
// AGREGAR A LA BOLSA
// ------------------------------------------------------------
// Solo aparece si la pieza está disponible. Como cada prenda es
// única, una vez agregada el botón se convierte en un link a la
// bolsa: no tiene sentido "agregar otra".
//
// Es el ÚNICO botón macizo de la ficha (la consulta por WhatsApp
// quedó como link tecleado). Antes eran dos barras a ancho
// completo, una llena y una con borde, las dos con el texto
// centrado: un par así se lee como el "comprar ahora" de cualquier
// plantilla. Con el texto alineado a la izquierda y la flecha
// empujada al extremo, la barra se parece más al renglón de un
// formulario que a un cartel.
//
// Para modificar:
// - los textos:  las cadenas de acá abajo
// - el aspecto:  las clases (mismo estilo que ui/Button, pero
//                a ancho completo)
// ============================================================

const CLASSES =
  'flex min-h-12 w-full items-center justify-between gap-2 px-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors';

export function AddToCartButton({ slug, name }: { slug: string; name: string }) {
  const { cart, add } = useCart();
  const inCart = cart.some((line) => line.slug === slug);

  if (inCart) {
    return (
      <Link href="/carrito" className={`${CLASSES} border border-ink text-ink hover:bg-paper-dim`}>
        <span className="inline-flex items-center gap-2">
          <Icon name="check" size={16} />
          En tu bolsa — coordinar compra
        </span>
        <Icon name="arrow-right" size={16} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(slug);
        toast(`${name} está en tu bolsa`);
      }}
      className={`${CLASSES} bg-ink text-paper hover:bg-ash`}
    >
      Agregar a la bolsa
      <Icon name="arrow-right" size={16} />
    </button>
  );
}
