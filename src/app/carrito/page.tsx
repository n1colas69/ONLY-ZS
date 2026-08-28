import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { getLiteCatalog } from '@/lib/catalog';

// ============================================================
// BOLSA Y COORDINACIÓN — /carrito
// ------------------------------------------------------------
// Para modificar el formulario o el mensaje:
// src/components/cart/CheckoutForm.tsx
// src/lib/whatsapp.ts
// ============================================================

export const metadata: Metadata = {
  title: 'Tu bolsa',
  description: 'Coordiná tu compra por WhatsApp.',
  // Esta página no aporta nada a una búsqueda: no se indexa.
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="edge py-8 md:py-12">
      <header className="mb-8 border-b border-dashed border-line-strong pb-3">
        <h1 className="d1">Coordinar</h1>
        <p className="label mt-2">No se paga en la web · Se coordina por WhatsApp</p>
      </header>

      <CheckoutForm catalog={getLiteCatalog()} />
    </div>
  );
}
