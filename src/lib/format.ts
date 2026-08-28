// ============================================================
// FORMATO
// ------------------------------------------------------------
// Para modificar:
// - moneda o separadores: formatPrice
// - texto de los estados:  STATUS_LABEL
// ============================================================

import type { ProductStatus } from '@/types';

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

/** 25000 -> "$ 25.000". null -> "" */
export function formatPrice(price: number | null): string {
  if (price === null) return '';
  return formatter.format(price);
}

/** Etiqueta visible de cada estado. */
export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: 'Disponible',
  'private-price': 'Precio a consultar',
  sold: 'Vendido',
  'coming-soon': 'Próximamente',
  draft: 'Borrador',
};

/**
 * Qué se muestra donde iría el precio.
 * Una pieza vendida nunca muestra un número: muestra "Vendido".
 * Una con precio privado tampoco: muestra "Precio a consultar".
 * Esto es lo que elimina los "$0" del sitio viejo.
 */
export function priceLabel(price: number | null, status: ProductStatus): string {
  if (status === 'available' && price !== null) return formatPrice(price);
  return STATUS_LABEL[status];
}

/**
 * Piezas que se pueden comprar, con precio público o a consultar.
 * Se usa para decidir qué entra en "últimos ingresos", destacados,
 * el filtro "disponible" y el orden de la búsqueda. `sold`,
 * `coming-soon` y `draft` quedan afuera.
 */
export function isForSale(status: ProductStatus): boolean {
  return status === 'available' || status === 'private-price';
}
