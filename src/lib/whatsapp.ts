// ============================================================
// WHATSAPP — armado de los mensajes
// ------------------------------------------------------------
// Acá se decide EXACTAMENTE qué texto le llega a ONLY ZS cuando
// alguien compra. Es la parte más importante del sitio: no hay
// pago online, el pedido ES este mensaje.
//
// Para modificar:
// - el número:                 site.whatsapp en src/data/site.ts
// - el texto del pedido:       buildOrderMessage
// - el texto de consulta:      buildProductMessage
//
// Estas funciones son puras (texto entra, texto sale) y están
// cubiertas por tests en tests/whatsapp.test.ts. Si cambiás el
// formato, actualizá también el test.
// ============================================================

import { site } from '@/data/site';
import { formatPrice } from '@/lib/format';
import type { CheckoutDetails, Product, ResolvedCartLine } from '@/types';

/** Lo mínimo que hace falta para armar un mensaje sobre una pieza. */
type ProductRef = Pick<Product, 'name' | 'price' | 'size' | 'slug'>;

/** Construye el link de WhatsApp con el mensaje ya codificado. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensaje del pedido completo, desde el checkout.
 * Mantiene el formato del sitio viejo, que ya funcionaba, con dos
 * agregados: el talle de cada pieza y el link del producto.
 */
export function buildOrderMessage(
  lines: ResolvedCartLine[],
  details: CheckoutDetails,
  total: number
): string {
  const items = lines
    .map(({ product, qty, lineTotal }) => {
      const size = product.size ? ` — Talle ${product.size}` : '';
      return `• ${qty} x ${product.name}${size} (${formatPrice(lineTotal)})\n  ${site.url}/producto/${product.slug}`;
    })
    .join('\n');

  return [
    '¡Hola ONLY ZS! Quiero coordinar esta compra:',
    '',
    items,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    'Datos de entrega',
    `Nombre: ${details.name}`,
    `Teléfono: ${details.phone}`,
    `Provincia: ${details.province}`,
    `Ciudad: ${details.city} (CP: ${details.zip})`,
    `Dirección: ${details.address}`,
    `Entrega: ${details.delivery}`,
    `Pago: ${details.payment}`,
    `Notas: ${details.notes.trim() || 'Sin notas'}`,
  ].join('\n');
}

/** Consulta rápida sobre una pieza, desde la ficha del producto. */
export function buildProductMessage(product: ProductRef): string {
  const price = product.price !== null ? ` (${formatPrice(product.price)})` : '';
  const size = product.size ? `\nTalle: ${product.size}` : '';
  return [
    `¡Hola ONLY ZS! Me interesa esta pieza:`,
    '',
    `${product.name}${price}${size}`,
    `${site.url}/producto/${product.slug}`,
  ].join('\n');
}

/** Consulta genérica, para el botón flotante y el footer. */
export function buildGeneralMessage(): string {
  return '¡Hola ONLY ZS! Quería hacer una consulta.';
}
