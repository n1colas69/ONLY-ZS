'use client';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Icon } from '@/components/ui/Icon';
import { countItems } from '@/lib/cart';
import { openPanel, useCart, useWishlist } from '@/lib/store';

// ============================================================
// BOTONES DEL HEADER (favoritos, bolsa, menú)
// ------------------------------------------------------------
// Es la única parte del header que necesita JavaScript: tiene que
// saber cuántas cosas hay guardadas en el navegador.
//
// El buscador no vive acá: es la barra principal debajo del
// marquee, en la home (src/app/page.tsx). No abre un panel.
//
// Para modificar:
// - qué botones aparecen: este archivo
// - qué abre cada uno:    openPanel('cart' | 'wishlist' | 'menu')
// ============================================================

/** Contador chiquito al lado del icono. No se muestra si está en cero. */
function Count({ value, label }: { value: number; label: string }) {
  if (value === 0) return null;
  return (
    <span className="label-ink absolute -right-1 -top-0.5 tabular-nums" aria-label={label}>
      {value}
    </span>
  );
}

export function HeaderActions() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = countItems(cart);

  return (
    <div className="flex items-center gap-1">
      <ThemeToggle />

      <button
        type="button"
        onClick={() => openPanel('wishlist')}
        aria-label={`Favoritos${wishlist.length ? `, ${wishlist.length} guardados` : ''}`}
        className="relative grid size-11 place-items-center hover:text-ash"
      >
        <Icon name={wishlist.length > 0 ? 'heart-filled' : 'heart'} />
        <Count value={wishlist.length} label="piezas guardadas" />
      </button>

      <button
        type="button"
        onClick={() => openPanel('cart')}
        aria-label={`Bolsa${cartCount ? `, ${cartCount} piezas` : ', vacía'}`}
        className="relative grid size-11 place-items-center hover:text-ash"
      >
        <Icon name="bag" />
        <Count value={cartCount} label="piezas en la bolsa" />
      </button>

      <button
        type="button"
        onClick={() => openPanel('menu')}
        aria-label="Menú"
        className="grid size-11 place-items-center hover:text-ash md:hidden"
      >
        <Icon name="menu" />
      </button>
    </div>
  );
}
