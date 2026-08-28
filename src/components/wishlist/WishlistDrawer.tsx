'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from '@/components/ui/Drawer';
import { Icon } from '@/components/ui/Icon';
import { canAddToCart } from '@/lib/cart';
import { priceLabel } from '@/lib/format';
import { closePanel, toast, useCart, useWishlist } from '@/lib/store';
import { resolveWishlist } from '@/lib/wishlist';
import type { ProductLite } from '@/types';

// ============================================================
// FAVORITOS (panel lateral)
// ------------------------------------------------------------
// Lista de piezas guardadas, en el orden en que se guardaron.
// Desde acá se pueden pasar a la bolsa si siguen disponibles.
//
// Para modificar: este archivo.
// La lógica está en src/lib/wishlist.ts
// ============================================================

export function WishlistDrawer({ open, catalog }: { open: boolean; catalog: ProductLite[] }) {
  const { wishlist, remove } = useWishlist();
  const { cart, add } = useCart();
  const items = resolveWishlist(wishlist, catalog);

  return (
    <Drawer
      open={open}
      onClose={closePanel}
      title={`Favoritos${items.length ? ` · ${items.length}` : ''}`}
    >
      {items.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-ash">No guardaste ninguna pieza todavía.</p>
          <p className="label mt-2">Tocá el corazón sobre una foto para guardarla</p>
          <Link
            href="/tienda"
            onClick={closePanel}
            className="label-ink mt-4 inline-block underline decoration-accent decoration-2 underline-offset-4"
          >
            Ver el catálogo
          </Link>
        </div>
      ) : (
        <ul>
          {items.map((product) => {
            const inCart = cart.some((line) => line.slug === product.slug);
            const buyable = canAddToCart(product);

            return (
              <li key={product.slug} className="flex gap-3 border-b border-dashed border-line-strong p-4">
                <Link href={`/producto/${product.slug}`} onClick={closePanel} className="shrink-0">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt=""
                      width={64}
                      height={80}
                      sizes="64px"
                      className="h-20 w-16 bg-paper-dim object-cover"
                    />
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="label">{product.brand}</p>
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={closePanel}
                    className="mt-0.5 block text-[0.8125rem] leading-snug hover:text-ash"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-[0.8125rem] text-ash">
                    {priceLabel(product.price, product.status)}
                  </p>

                  {buyable && (
                    <button
                      type="button"
                      disabled={inCart}
                      onClick={() => {
                        add(product.slug);
                        toast(`${product.name} está en tu bolsa`);
                      }}
                      className="label-ink mt-2 min-h-9 underline decoration-accent decoration-2 underline-offset-4 disabled:no-underline disabled:opacity-50"
                    >
                      {inCart ? 'Ya está en la bolsa' : 'Pasar a la bolsa'}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => remove(product.slug)}
                  aria-label={`Quitar ${product.name} de favoritos`}
                  className="label -mr-2 grid size-9 shrink-0 place-items-center self-start hover:text-ink"
                >
                  <Icon name="close" size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
