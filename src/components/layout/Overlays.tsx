'use client';

import { useEffect } from 'react';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchDialog } from '@/components/search/SearchDialog';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { Toasts } from '@/components/ui/Toasts';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { usePanel } from '@/lib/store';
import type { ProductLite } from '@/types';

/**
 * El sitio viejo registraba un Service Worker (legacy/sw.js) que
 * cachea agresivamente `/` y algunos assets. Un celular que haya
 * visitado esa versión puede seguir teniéndolo activo, sirviendo
 * HTML o JS viejo por encima del sitio nuevo — y ESO se ve como
 * "los botones no funcionan", sin que el código actual tenga nada
 * roto. Este sitio no usa Service Worker, así que si encuentra uno
 * registrado, es sobrante: lo da de baja y borra su caché.
 */
function useLegacyServiceWorkerCleanup() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => registrations.forEach((registration) => registration.unregister()))
      .catch(() => {});

    if ('caches' in window) {
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .catch(() => {});
    }
  }, []);
}

// ============================================================
// PANELES
// ------------------------------------------------------------
// Monta los cuatro paneles (bolsa, favoritos, buscador, menú) y
// los avisos. Se renderiza una sola vez, en el layout, así que
// están disponibles desde cualquier página.
//
// Solo uno puede estar abierto a la vez: es una sola variable en
// src/lib/store.ts. Abrir la bolsa cierra el buscador sin que
// nadie tenga que coordinarlo.
//
// El catálogo llega como prop desde el servidor, en versión
// liviana: así el navegador no descarga las descripciones largas
// ni las listas completas de fotos.
// ============================================================

export function Overlays({ catalog }: { catalog: ProductLite[] }) {
  const panel = usePanel();
  useLegacyServiceWorkerCleanup();

  return (
    <>
      <CartDrawer open={panel === 'cart'} catalog={catalog} />
      <WishlistDrawer open={panel === 'wishlist'} catalog={catalog} />
      <SearchDialog open={panel === 'search'} catalog={catalog} />
      <MobileMenu open={panel === 'menu'} />
      <ScrollToTop />
      <Toasts />
    </>
  );
}
