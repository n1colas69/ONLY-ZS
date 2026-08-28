// ============================================================
// DATOS DEL SITIO
// ------------------------------------------------------------
// Todo lo que no es un producto vive acá: contacto, redes,
// textos legales y de ayuda, y el copy de la home.
//
// Para modificar:
// - número de WhatsApp:  site.whatsapp
// - Instagram:           site.instagram
// - textos de la home:   homeCopy
// - Info / Envíos / FAQ: infoPages
// ============================================================

export const site = {
  name: 'ONLY ZS',
  /** Nombre largo, para el <title> y los metadatos. */
  fullName: 'ONLY ZS — Vintage & Second Hand',
  description:
    'Vintage y second hand seleccionado a mano. Piezas únicas de Carhartt, Dickies, Polo Ralph Lauren, Nautica, Champion y más. Envío a todo el país desde La Rioja.',

  /**
   * Número de WhatsApp con código de país, sin + ni espacios.
   * 54 = Argentina, 9 = celular, 380 = La Rioja.
   * Se usa en TODOS los links de WhatsApp del sitio.
   */
  whatsapp: '5493804151730',
  /** Cómo se muestra el número escrito. */
  whatsappDisplay: '3804 15-1730',

  instagram: 'https://www.instagram.com/only_zonasur/',
  instagramHandle: '@only_zonasur',
  /** Link directo al chat de Instagram, para la galería. */
  instagramDirect: 'https://ig.me/m/only_zonasur',

  location: 'Zona Sur, La Rioja, Argentina',
  city: 'La Rioja',
  country: 'AR',

  /** Dominio en producción. Se usa para canonical URLs y sitemap. */
  url: 'https://onlyzs.com.ar',
} as const;

/**
 * Marcas que ONLY ZS trabaja. Se muestran en el marquee de la home.
 * Es una lista curada, no se genera desde los productos: incluye
 * marcas que todavía no tienen stock publicado.
 */
export const marqueeBrands = [
  'CARHARTT',
  'CHAPS',
  'DICKIES',
  'JANSPORT',
  'NAUTICA',
  'POLO RALPH LAUREN',
  'REAL TREE',
  'RUSSELL',
  'CHAMPION',
  'COLUMBIA',
  'L.L. BEAN',
];

/**
 * Copy de la home. Escrito con la voz de ONLY ZS.
 * Si lo cambiás, mantené el tono: directo, corto, sin lenguaje de marketing.
 */
export const homeCopy = {
  tagline: 'Vintage · Second hand · Seleccionado a mano',
  /** Frase del corte editorial. Es literal del sitio viejo, y funciona. */
  statement: 'Vintage no significa perfecto.',
  statementBody:
    'Los artículos de segunda mano pueden venir con leves defectos. Si querés artículos perfectos, comprá nuevos.',
  latestLabel: 'Último ingreso',
  galleryLabel: 'Galería ZS',
  galleryIntro:
    'Looks reales de la comunidad. Mandá tu foto por Instagram y entrá a la galería.',
  collabsLabel: 'Colaboraciones',
  collabsIntro:
    'Proyectos que comparten la mirada de ONLY ZS: cultura under, skate, fotografía, archivo y calle.',
};

/**
 * Frases que se intercalan en la grilla del catálogo, cada tantas
 * piezas (ver src/components/products/ProductGrid.tsx). Mismo tono
 * que el resto del sitio: cortas, directas, sin lenguaje de venta.
 * Se van repitiendo en orden si el catálogo tiene más piezas que frases.
 */
export const gridStatements = [
  'Una sola unidad. No hay talle de repuesto.',
  'No hay dos piezas iguales, y nunca las va a haber.',
  'Usada no es lo opuesto de buena.',
  'Cada mancha tiene una historia. No la inventamos nosotros.',
  'Esto no es una colección nueva. Es lo que encontramos.',
];

/**
 * Páginas de información que se abren desde el footer.
 * Los textos son los mismos del sitio viejo: son reales, no plantillas.
 */
export const infoPages = [
  {
    slug: 'info',
    title: 'Info',
    body: [
      'Somos ONLY ZS, un emprendimiento de ropa vintage y de segunda mano con sede en La Rioja, Argentina.',
      'Tené en cuenta que los artículos de segunda mano pueden venir con leves defectos. Vintage no significa perfecto. Si querés artículos perfectos, comprá nuevos.',
      'WhatsApp: 3804 15-1730',
    ],
  },
  {
    slug: 'envios',
    title: 'Envíos y entregas',
    body: [
      'Hacemos envíos a todo el país por correo privado.',
      'El costo de envío se calcula al coordinar el pedido, según tu ubicación.',
      'También podés coordinar retiro o punto de encuentro en La Rioja.',
    ],
  },
  {
    slug: 'cambios',
    title: 'Cambios y devoluciones',
    body: [
      'No se realizan cambios ni devoluciones.',
      'Cada pieza está fotografiada de varios ángulos y los defectos, si los tiene, están indicados en la descripción. Si tenés dudas sobre una prenda, escribinos antes de comprar.',
    ],
  },
  {
    slug: 'faq',
    title: 'Preguntas frecuentes',
    body: [
      '¿Las prendas están lavadas? Sí, todas pasan por un proceso de lavado y desinfección antes de publicarse.',
      '¿Puedo ver la prenda en persona? Podés coordinar un encuentro en La Rioja. Escribinos por WhatsApp.',
      '¿Cómo pago? Transferencia, MercadoPago o efectivo en persona. El pago se coordina por WhatsApp, no se paga en la web.',
      '¿Hay más de una unidad? No. Cada pieza es única: cuando se vende, se vende.',
    ],
  },
];
