'use client';

import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { toast, useWishlist } from '@/lib/store';

// ============================================================
// BOTÓN DE FAVORITO
// ------------------------------------------------------------
// Es el único pedazo de JavaScript dentro de una tarjeta de
// producto. Todo lo demás (foto, nombre, precio, link) se
// renderiza en el servidor y llega como HTML.
//
// Para modificar:
// - dónde se ve: la clase que le pasa quien lo usa
// - en celular está SIEMPRE visible; en escritorio aparece al
//   pasar el mouse. Eso se controla con las clases de abajo.
// ============================================================

interface WishButtonProps {
  slug: string;
  name: string;
  className?: string;
  /** true = siempre visible (ficha de producto, favoritos). */
  alwaysVisible?: boolean;
}

export function WishButton({ slug, name, className, alwaysVisible = false }: WishButtonProps) {
  const { wishlist, toggle } = useWishlist();
  const active = wishlist.includes(slug);

  return (
    <button
      type="button"
      onClick={() => {
        toggle(slug);
        toast(active ? 'Quitado de favoritos' : `${name} guardado en favoritos`);
      }}
      aria-pressed={active}
      aria-label={active ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
      className={cn(
        'grid size-9 place-items-center transition-[opacity,transform,color] duration-200 hover:-rotate-12',
        // Guardado = rojo. Es redundante a propósito: lo que dice
        // "ya está guardado" es la FORMA (corazón lleno en vez de
        // contorno) más aria-pressed, el color es un plus, no la
        // única señal (ver el comentario de --color-accent-2 en
        // globals.css).
        active ? 'text-accent-2' : 'text-ink',
        // Papel macizo. Era bg-paper/85 + backdrop-blur: un chip de
        // vidrio esmerilado sobre la foto, que es el único material
        // que este sitio no usa en ningún lado.
        'bg-paper',
        // En celular no existe el hover: el corazón se ve siempre.
        // En escritorio aparece al acercar el mouse a la tarjeta.
        !alwaysVisible &&
          'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100',
        className
      )}
    >
      <Icon name={active ? 'heart-filled' : 'heart'} size={18} />
    </button>
  );
}
