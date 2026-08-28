'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from '@/components/ui/Drawer';
import { Icon } from '@/components/ui/Icon';
import { cartTotal, resolveCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { closePanel, useCart } from '@/lib/store';
import type { ProductLite } from '@/types';

// ============================================================
// BOLSA (panel lateral)
// ------------------------------------------------------------
// Muestra lo que la persona guardó. El precio y la disponibilidad
// se leen SIEMPRE del catálogo actual, no de lo guardado: si
// cambiás un precio o marcás una pieza como vendida, las bolsas
// abiertas en otros navegadores se actualizan solas.
//
// No hay control de cantidad: cada pieza es única (1 unidad).
//
// Para modificar:
// - texto del panel:  este archivo
// - el total:         cartTotal en src/lib/cart.ts
// ============================================================

export function CartDrawer({ open, catalog }: { open: boolean; catalog: ProductLite[] }) {
  const { cart, remove, clear } = useCart();
  const lines = resolveCart(cart, catalog);
  const total = cartTotal(lines);

  return (
    <Drawer
      open={open}
      onClose={closePanel}
      title={`Bolsa${lines.length ? ` · ${lines.length}` : ''}`}
      footer={
        lines.length > 0 ? (
          <div className="p-4">
            {/* El total en mono y tabular, como en el remito de
                /carrito: los números del sitio se tipean, no se
                titulan. */}
            <div className="mb-3 flex items-baseline justify-between border-t border-dashed border-line-strong pt-3">
              <span className="label">Total</span>
              <span className="font-mono text-xl tabular-nums">{formatPrice(total)}</span>
            </div>
            <p className="label mb-4">El envío se coordina por WhatsApp según tu ubicación</p>
            <Link
              href="/carrito"
              onClick={closePanel}
              className="flex min-h-12 w-full items-center justify-between gap-2 bg-ink px-4 text-[0.6875rem] font-medium tracking-[0.14em] text-paper uppercase hover:bg-ash"
            >
              Coordinar compra
              <Icon name="arrow-right" size={16} />
            </Link>
            <button
              type="button"
              onClick={clear}
              className="label mt-3 min-h-9 w-full hover:text-ink"
            >
              Vaciar bolsa
            </button>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-ash">Todavía no guardaste ninguna pieza.</p>
          <Link href="/tienda" onClick={closePanel} className="label-ink mt-4 inline-block underline decoration-accent decoration-2 underline-offset-4">
            Ver el catálogo
          </Link>
        </div>
      ) : (
        <ul>
          {lines.map(({ product, lineTotal }) => (
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
                {product.size && <p className="label mt-1">Talle {product.size}</p>}
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="font-mono text-[0.8125rem] tabular-nums">
                  {formatPrice(lineTotal)}
                </span>
                <button
                  type="button"
                  onClick={() => remove(product.slug)}
                  aria-label={`Quitar ${product.name} de la bolsa`}
                  className="label -mr-2 grid size-9 place-items-center hover:text-ink"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
