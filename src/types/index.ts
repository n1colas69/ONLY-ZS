// ============================================================
// TIPOS DEL PROYECTO
// ------------------------------------------------------------
// Estos tipos son la red de seguridad del catálogo: si escribís
// mal una categoría o te olvidás un campo, `npm run build` falla
// ANTES de publicar, en vez de romperse en la web.
//
// Para modificar:
// - agregar una categoría:  sumala a CATEGORY_SLUGS en src/data/categories.ts
// - agregar un campo a los productos: agregalo acá y en products.ts
// ============================================================

/**
 * Estado de una pieza. Es UN solo campo a propósito:
 * en el sitio viejo había cuatro booleanos que podían contradecirse
 * (un producto "nuevo", "vendido" y "próximamente" a la vez).
 *
 * - available     se puede comprar, con precio público
 * - private-price se puede comprar, pero el precio se acuerda por
 *                  WhatsApp (no se muestra ningún número). Se usa
 *                  siempre con price: null.
 * - sold          ya se vendió (se muestra, sin precio ni botón)
 * - coming-soon   anticipo, todavía no está a la venta
 * - draft         no se muestra en ninguna parte del sitio
 */
export type ProductStatus = 'available' | 'private-price' | 'sold' | 'coming-soon' | 'draft';

/** Los slugs de categoría válidos. Se definen en src/data/categories.ts */
export type CategorySlug =
  | 'abrigos'
  | 'remeras'
  | 'camisas'
  | 'pantalones'
  | 'camisetas'
  | 'accesorios';

export interface Product {
  /** Identidad y URL: /producto/{slug}. Único, sin espacios ni acentos. */
  slug: string;
  name: string;
  /** Marca. Habilita el filtro y la búsqueda por marca. 'Sin marca' si no tiene. */
  brand: string;
  category: CategorySlug;
  /**
   * En pesos, sin puntos ni símbolo. null cuando no corresponde
   * mostrar precio: vendido, próximamente, borrador, o
   * status: 'private-price' (precio a acordar por WhatsApp).
   */
  price: number | null;
  status: ProductStatus;
  /** Etiqueta "NUEVO". Independiente del estado: solo se muestra si está disponible. */
  isNew: boolean;
  /** Aparece en la selección de la home. */
  featured: boolean;
  /** Talle tal cual lo mide ONLY ZS: "XL", "40 US", "Unico AC (Apto Cabezones)". */
  size: string | null;
  /** Estado sobre 10: "10/10", "9.5/10". */
  condition: string | null;
  /** Medidas reales, separadas por " · ". */
  measurements: string | null;
  /** Texto libre. Es la voz de la marca: no se corrige ni se "profesionaliza". */
  description: string;
  /**
   * Rutas desde /public. La primera es la portada.
   *
   * NO se escribe a mano en src/data/products.ts. Se resuelve sola
   * a partir de los archivos que haya en
   * public/images/products/{slug}/, ordenados por su nombre
   * numérico (1.jpg, 2.jpg…). Ver src/lib/images.ts.
   */
  images: string[];
  /** Palabras sueltas para la búsqueda: marca, color, tipo de prenda. */
  tags: string[];
}

/**
 * La forma en la que se escribe cada producto en
 * src/data/products.ts: es un `Product` sin `images`, porque las
 * fotos no se listan a mano — se resuelven solas desde la carpeta
 * del producto. Ver src/lib/images.ts y CUSTOMIZATION.md.
 */
export type ProductEntry = Omit<Product, 'images'>;

/**
 * Versión liviana de un producto: solo lo que el navegador necesita
 * para el carrito, los favoritos y la búsqueda.
 *
 * Por qué existe: si el buscador importara el catálogo completo, se
 * le mandarían al celular de cada visitante las 58 descripciones
 * largas y todas las listas de fotos. Con esta versión viaja menos
 * de la mitad. El servidor la arma con `toLite()` y se la pasa a los
 * componentes de cliente.
 */
export interface ProductLite {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number | null;
  status: ProductStatus;
  isNew: boolean;
  size: string | null;
  /** Solo la foto de portada. */
  image: string | null;
  tags: string[];
}

export interface Category {
  slug: CategorySlug;
  /** Nombre corto, para filtros y navegación. */
  name: string;
  /** Nombre largo, para el título de la página de categoría. */
  title: string;
  /**
   * Foto de portada fija (ruta desde /public). null (el caso normal)
   * usa la foto de tapa de una pieza real de la categoría — ver
   * getCategoryImage en src/lib/catalog.ts.
   */
  image: string | null;
}

export interface Collaboration {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  instagram: string | null;
  youtube: string | null;
  /** Video destacado: título y URL. */
  video: { title: string; url: string } | null;
  heroImage: string;
  gallery: string[];
}

export interface GalleryPhoto {
  src: string;
  alt: string;
}

/** Una línea del carrito. Guarda solo el slug: el precio se lee siempre del catálogo. */
export interface CartLine {
  slug: string;
  qty: number;
}

/** Una línea del carrito ya resuelta contra el catálogo, lista para mostrar. */
export interface ResolvedCartLine {
  product: ProductLite;
  qty: number;
  lineTotal: number;
}

/** Datos que el cliente completa antes de mandar el pedido por WhatsApp. */
export interface CheckoutDetails {
  name: string;
  phone: string;
  province: string;
  city: string;
  zip: string;
  address: string;
  delivery: string;
  payment: string;
  notes: string;
}
