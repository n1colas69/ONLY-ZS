'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { canAddToCart } from '@/lib/cart';
import { priceLabel } from '@/lib/format';
import { toast, useCart, useWishlist } from '@/lib/store';
import { resolveWishlist } from '@/lib/wishlist';
import type { ProductLite } from '@/types';

// ============================================================
// FAVORITOS (página completa) — /favoritos
// ------------------------------------------------------------
// La misma información que el panel lateral, pero en una página
// con las fotos grandes. Es útil cuando alguien juntó muchas
// piezas y quiere compararlas.
//
// Los favoritos se guardan en el navegador de cada persona, así
// que esta página no se puede compartir (lo que vea otro va a
// ser su propia lista, no la tuya).
// ============================================================

export function WishlistPage({ catalog }: { catalog: ProductLite[] }) {
  const { wishlist, remove } = useWishlist();
  const { cart, add } = useCart();
  const items = resolveWishlist(wishlist, catalog);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="d3">Todavía no guardaste nada</p>
        <p className="mt-3 text-ash">Tocá el corazón sobre una foto para guardar una pieza.</p>
        <Link
          href="/tienda"
          className="label-ink mt-6 inline-flex min-h-11 items-center gap-2 border border-ink px-5 hover:bg-ink hover:text-paper"
        >
          Ver el catálogo
          <Icon name="arrow-right" size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="masonry">
      {items.map((product) => {
        const inCart = cart.some((line) => line.slug === product.slug);
        const buyable = canAddToCart(product);

        return (
          <article key={product.slug} className="masonry-item group relative">
            <Link href={`/producto/${product.slug}`} className="block">
              {product.image && (
                <div className="shadow-card">
                  <div className="relative aspect-4/5 overflow-hidden bg-paper-dim">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 48rem) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <p className="label mt-2">{product.brand}</p>
              <h2 className="mt-1 text-[0.8125rem] leading-snug">{product.name}</h2>
              <p className="mt-0.5 text-[0.8125rem] text-ash">
                {priceLabel(product.price, product.status)}
              </p>
            </Link>

            <div className="mt-1.5 flex items-center gap-3">
              {buyable && (
                <button
                  type="button"
                  disabled={inCart}
                  onClick={() => {
                    add(product.slug);
                    toast(`${product.name} está en tu bolsa`);
                  }}
                  className="label-ink min-h-9 underline decoration-accent decoration-2 underline-offset-4 disabled:no-underline disabled:opacity-50"
                >
                  {inCart ? 'En la bolsa' : 'A la bolsa'}
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(product.slug)}
                aria-label={`Quitar ${product.name} de favoritos`}
                className="label min-h-9 hover:text-ink"
              >
                Quitar
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
