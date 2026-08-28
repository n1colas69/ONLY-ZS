'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cartTotal, resolveCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/lib/store';
import { buildOrderMessage, whatsappUrl } from '@/lib/whatsapp';
import type { CheckoutDetails, ProductLite } from '@/types';

// ============================================================
// COORDINAR COMPRA
// ------------------------------------------------------------
// El pedido NO se paga en la web. Este formulario arma un mensaje
// de WhatsApp con las piezas y los datos de entrega, y abre el
// chat con ese texto ya escrito.
//
// Es el mismo modelo que ya usaba ONLY ZS, porque funciona.
//
// Para modificar:
// - qué datos se piden:  el array FIELDS de acá abajo
// - el texto del mensaje: buildOrderMessage en src/lib/whatsapp.ts
// - el número:            site.whatsapp en src/data/site.ts
//
// Ojo: si agregás un campo acá, agregalo también a CheckoutDetails
// (src/types) y al mensaje, o no va a llegar.
// ============================================================

const DELIVERY_OPTIONS = ['Envío a domicilio', 'Retiro / punto de encuentro'];
const PAYMENT_OPTIONS = ['Transferencia', 'MercadoPago', 'Efectivo', 'A coordinar'];

const EMPTY: CheckoutDetails = {
  name: '',
  phone: '',
  province: '',
  city: '',
  zip: '',
  address: '',
  delivery: '',
  payment: '',
  notes: '',
};

/** Un campo del formulario. La etiqueta siempre está asociada al input. */
function Field({
  id,
  label,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'md:col-span-2' : undefined}>
      <label htmlFor={id} className="label mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}

const INPUT =
  'min-h-11 w-full border border-line-strong bg-transparent px-3 text-[0.875rem] outline-none focus:border-ink';

export function CheckoutForm({ catalog }: { catalog: ProductLite[] }) {
  const { cart, remove, clear } = useCart();
  const [details, setDetails] = useState<CheckoutDetails>(EMPTY);
  const [error, setError] = useState('');

  const lines = resolveCart(cart, catalog);
  const total = cartTotal(lines);

  const update = (key: keyof CheckoutDetails) => (value: string) =>
    setDetails((current) => ({ ...current, [key]: value }));

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (lines.length === 0) {
      setError('Tu bolsa está vacía.');
      return;
    }
    if (details.delivery === 'Envío a domicilio' && details.zip.trim().length < 4) {
      setError('Para enviar a domicilio necesitamos un código postal válido (4 dígitos o más).');
      return;
    }

    const message = buildOrderMessage(lines, details, total);
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="d3">Tu bolsa está vacía</p>
        <p className="mt-3 text-ash">Todavía no guardaste ninguna pieza.</p>
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
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
      {/* ---------- Formulario ---------- */}
      <form onSubmit={onSubmit} noValidate={false}>
        <h2 className="label mb-4">Datos de entrega</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Field id="ck-name" label="Nombre y apellido">
            <input
              id="ck-name"
              name="name"
              required
              autoComplete="name"
              className={INPUT}
              value={details.name}
              onChange={(event) => update('name')(event.target.value)}
            />
          </Field>

          <Field id="ck-phone" label="Teléfono / WhatsApp">
            <input
              id="ck-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={INPUT}
              value={details.phone}
              onChange={(event) => update('phone')(event.target.value)}
            />
          </Field>

          <Field id="ck-delivery" label="Cómo lo recibís">
            <select
              id="ck-delivery"
              name="delivery"
              required
              className={INPUT}
              value={details.delivery}
              onChange={(event) => update('delivery')(event.target.value)}
            >
              <option value="">Elegí una opción</option>
              {DELIVERY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field id="ck-payment" label="Cómo pagás">
            <select
              id="ck-payment"
              name="payment"
              required
              className={INPUT}
              value={details.payment}
              onChange={(event) => update('payment')(event.target.value)}
            >
              <option value="">Elegí una opción</option>
              {PAYMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field id="ck-province" label="Provincia">
            <input
              id="ck-province"
              name="province"
              required
              autoComplete="address-level1"
              className={INPUT}
              value={details.province}
              onChange={(event) => update('province')(event.target.value)}
            />
          </Field>

          <Field id="ck-city" label="Ciudad o localidad">
            <input
              id="ck-city"
              name="city"
              required
              autoComplete="address-level2"
              className={INPUT}
              value={details.city}
              onChange={(event) => update('city')(event.target.value)}
            />
          </Field>

          <Field id="ck-address" label="Dirección" wide>
            <input
              id="ck-address"
              name="address"
              required
              autoComplete="street-address"
              className={INPUT}
              value={details.address}
              onChange={(event) => update('address')(event.target.value)}
            />
          </Field>

          <Field id="ck-zip" label="Código postal">
            <input
              id="ck-zip"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="5300"
              className={INPUT}
              value={details.zip}
              onChange={(event) => update('zip')(event.target.value)}
            />
          </Field>

          <Field id="ck-notes" label="Notas (opcional)" wide>
            <textarea
              id="ck-notes"
              name="notes"
              rows={3}
              placeholder="Entre calles, horarios, referencias…"
              className={`${INPUT} min-h-24 py-2`}
              value={details.notes}
              onChange={(event) => update('notes')(event.target.value)}
            />
          </Field>
        </div>

        {error && (
          <p role="alert" className="mt-4 border border-ink px-3 py-2 text-[0.8125rem]">
            {error}
          </p>
        )}

        {/* Mismo renglón macizo que "agregar a la bolsa": texto a la
            izquierda, icono empujado al extremo. No es un cartel
            centrado de "COMPRAR AHORA". */}
        <button
          type="submit"
          className="mt-6 flex min-h-12 w-full items-center justify-between gap-2 bg-ink px-4 text-[0.6875rem] font-medium tracking-[0.14em] text-paper uppercase hover:bg-ash"
        >
          Enviar el pedido por WhatsApp
          <Icon name="whatsapp" size={17} />
        </button>

        <p className="label mt-3">
          Se abre WhatsApp con el mensaje ya escrito. La pieza no queda reservada hasta que lo
          mandes y te respondamos.
        </p>
      </form>

      {/* ---------- Resumen ----------
          Es un remito, y se ve como un remito: un rectángulo con
          borde, cada línea numerada, todo lo que es número en mono
          y alineado a la derecha para que las cifras se lean en
          columna. No es un "resumen de tu pedido" de checkout: acá
          no se paga nada, esto es el papel que se manda. */}
      <aside aria-labelledby="resumen" className="lg:sticky lg:top-24 lg:h-fit">
        <div className="border border-line-strong">
          <div className="flex items-baseline justify-between border-b border-dashed border-line-strong px-3 py-2">
            <h2 id="resumen" className="label-ink">
              Remito · ONLY ZS
            </h2>
            <span className="label tabular-nums">
              {String(lines.length).padStart(2, '0')} {lines.length === 1 ? 'pieza' : 'piezas'}
            </span>
          </div>

          <ul>
            {lines.map(({ product, lineTotal }, index) => (
              <li
                key={product.slug}
                className="flex gap-3 border-b border-dashed border-line px-3 py-3"
              >
                <span className="label w-5 shrink-0 pt-0.5 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {product.image && (
                  <Image
                    src={product.image}
                    alt=""
                    width={56}
                    height={70}
                    sizes="56px"
                    className="h-17 w-14 shrink-0 bg-paper-dim object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="label">{product.brand}</p>
                  <Link
                    href={`/producto/${product.slug}`}
                    className="text-[0.8125rem] leading-snug hover:text-ash"
                  >
                    {product.name}
                  </Link>
                  {product.size && <p className="label mt-0.5">Talle {product.size}</p>}
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-mono text-[0.8125rem] tabular-nums">
                    {formatPrice(lineTotal)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    aria-label={`Quitar ${product.name}`}
                    className="label -mr-1.5 grid size-9 place-items-center hover:text-ink"
                  >
                    <Icon name="close" size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline justify-between px-3 py-3">
            <span className="label">Total</span>
            <span className="font-mono text-xl tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>

        <p className="label mt-3">El envío se cotiza aparte por WhatsApp, según a dónde vaya.</p>

        <button type="button" onClick={clear} className="label mt-4 min-h-9 hover:text-ink">
          Vaciar bolsa
        </button>
      </aside>
    </div>
  );
}
