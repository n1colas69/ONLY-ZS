import type { Metadata } from 'next';
import { WishlistPage } from '@/components/wishlist/WishlistPage';
import { getLiteCatalog } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Las piezas que guardaste.',
  robots: { index: false, follow: true },
};

export default function FavouritesPage() {
  return (
    <div className="edge py-8 md:py-12">
      <header className="mb-6 border-b border-dashed border-line-strong pb-3">
        <h1 className="d1">Favoritos</h1>
        <p className="label mt-2">Guardados en este navegador</p>
      </header>

      <WishlistPage catalog={getLiteCatalog()} />
    </div>
  );
}
