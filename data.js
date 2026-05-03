/* =========================================================
   ONLY ZS — data.js
   Datos de productos y galería
========================================================= */

const productsData = [
    {
        id: 1,
        name: "Carhartt Hoodie",
        category: "Abrigos",
        price: 55000,
        originalPrice: 70000,
        badge: "OFERTA",
        image: "assets/images/Productos/Abrigos/buzo-carhartt-bordo.png",
        images: [
            "assets/images/Productos/Abrigos/buzo-carhartt-bordo.png",
            "assets/images/Productos/Abrigos/buzo-carhartt-bordo (2).png",
            "assets/images/Productos/Abrigos/buzo-carhartt-bordo (3).png",
            "assets/images/Productos/Abrigos/buzo-carhartt-bordo (4).png"
        ],
        description: "Hoodie color vino tinto con spell out en la manga, cuenta con los cordones de la capucha y todas sus etiquetas, tanto las exteriores como interiores.\nTalle XXL.\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },
    {
        id: 2,
        name: "Champion Hoodie",
        category: "Abrigos",
        price: 66000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/buzo-champions-negro.png",
        images: [
            "assets/images/Productos/Abrigos/buzo-champions-negro.png",
            "assets/images/Productos/Abrigos/buzo-champions-negro (2).png",
            "assets/images/Productos/Abrigos/buzo-champions-negro (3).png",
            "assets/images/Productos/Abrigos/buzo-champions-negro (4).png"
        ],
        description: "Hoodie con spell out bordado en frente, cuenta con su logo bordado tambien en la manga, etiquetas y perfecto estado.\nTalle XL.\nEstado: 10/10.",
        isNew: true,
        inStock: true
    },
    {
        id: 3,
        name: "Dickies Jeans",
        category: "Pantalones",
        price: 35000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Pantalones/DickiesJean.png",
        images: [
            "assets/images/Productos/Pantalones/DickiesJean.png",
            "assets/images/Productos/Pantalones/DickiesJean (2).png",
            "assets/images/Productos/Pantalones/DickiesJean (3).png",
            "assets/images/Productos/Pantalones/DickiesJean (4).png"
        ],
        description: "Jean Dickies clásico con fit recto. Resistente y cómodo, ideal para un estilo vintage con actitud.\nTalle: 34x30us\n104cm de largo por 42cm de ancho.\nEstado: 10/10, como nuevo.",
        isNew: false,
        inStock: true
    },
    {
        id: 4,
        name: "Under Armour CAP",
        category: "Accesorios",
        price: 20000,
        originalPrice: null,
        badge: "AGOTADO",
        image: "assets/images/Productos/Accesorios/UnderArmourCAPBlue.png",
        images: [
            "assets/images/Productos/Accesorios/UnderArmourCAPBlue.png",
            "assets/images/Productos/Accesorios/UnderArmourCAPBlue (2).png",
            "assets/images/Productos/Accesorios/UnderArmourCAPBlue (3).png",
            "assets/images/Productos/Accesorios/UnderArmourCAPBlue (4).png",
            "assets/images/Productos/Accesorios/UnderArmourCAPBlue (5).png"
        ],
        description: "Gorra Under Armour azul, con logo bordado y ajuste trasero.\nTalle único, apta para cabezones.\nEstado: 9,5/10, tiene algunos hilitos sueltos en la correa.",
        isNew: false,
        inStock: false
    },
    {
        id: 5,
        name: "Russell",
        category: "Remeras",
        price: 20000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras y Chombas/Rusell-Naranja.png",
        images: [
            "assets/images/Productos/Remeras y Chombas/Rusell-Naranja.png",
            "assets/images/Productos/Remeras y Chombas/Rusell-Naranja (2).png"
        ],
        description: "Merch oficial de los Baltimore Orioles al ganar la East Division Champions 2014\nDiseño grafico con la iconica mascota Oriole Bird y colores clasicos del equipo\nTalle L: 75cm de largo por 55cm de ancho\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },
    {
        id: 6,
        name: "Carhartt Force Grey Polo",
        category: "Remeras",
        price: 30000,
        originalPrice: 35000,
        badge: "OFERTA",
        image: "assets/images/Productos/Remeras y Chombas/Chomba-carhartt-blanca.png",
        images: [
            "assets/images/Productos/Remeras y Chombas/Chomba-carhartt-blanca.png",
            "assets/images/Productos/Remeras y Chombas/Chomba-carhartt-blanca (2).png",
            "assets/images/Productos/Remeras y Chombas/Chomba-carhartt-blanca (3).png",
            "assets/images/Productos/Remeras y Chombas/Chomba-carhartt-blanca (4).png",
            "assets/images/Productos/Remeras y Chombas/Chomba-carhartt-blanca (5).png"

        ],
        description: "Chomba de algodon y 35% polyester de punto trenzado, lo que logra suavidad y ligereza en el calce, ideal para altas temperaturas o uso prolongado.\nTalle L: 77cm de largo por 57cm de ancho\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },
    {
        id: 7,
        name: "Tote Bag Dickies Reworked",
        category: "Accesorios",
        price: 30000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Accesorios/ToteBagDickies.png",
        images: [
            "assets/images/Productos/Accesorios/ToteBagDickies.png",
            "assets/images/Productos/Accesorios/ToteBagDickies (2).png",
            "assets/images/Productos/Accesorios/ToteBagDickies (3).png",
            "assets/images/Productos/Accesorios/ToteBagDickies (4).png"
        ],
        description: "Alta calidad de sus materiales, costuras reforzadas para que puedan ser bien cargadas.\nposee bolsillo exterior al frente con su logo arriba, bolsillo inferior interno, y un bolsillo lateral profundo.\nMedidas: 39cm de alto por 34cm de ancho",
        isNew: false,
        inStock: true
    },
    {
        id: 8,
        name: "ADIDAS SAMBA",
        category: "Accesorios",
        price: 200000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Accesorios/Adidas-samba.png",
        images: [
            "assets/images/Productos/Accesorios/Adidas-samba.png",
            "assets/images/Productos/Accesorios/Adidas-samba (2).png",
            "assets/images/Productos/Accesorios/Adidas-samba (3).png",
            "assets/images/Productos/Accesorios/Adidas-samba (4).png",
            "assets/images/Productos/Accesorios/Adidas-samba (5).png",
            "assets/images/Productos/Accesorios/Adidas-samba (6).png",
            "assets/images/Productos/Accesorios/Adidas-samba (7).png"
        ],
        description: "Zapatillas Adidas Samba auténticas. Un clásico intemporal con sello deportivo y urbano.\nTalle: 10.5us, 43arg, 27cm.\nEstado: 10/10 sin caja.",
        isNew: false,
        inStock: true
    },
    {
        id: 9,
        name: "Carhartt Pocket",
        category: "Remeras",
        price: 30000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras y Chombas/carhartt-pocket-black.png",
        images: [
            "assets/images/Productos/Remeras y Chombas/carhartt-pocket-black.png",
            "assets/images/Productos/Remeras y Chombas/carhartt-pocket-black (2).png",
            "assets/images/Productos/Remeras y Chombas/carhartt-pocket-black (3).png",
            "assets/images/Productos/Remeras y Chombas/carhartt-pocket-black (4).png",
            "assets/images/Productos/Remeras y Chombas/carhartt-pocket-black (5).png"
        ],
        description: "Remera pocket de algodón, color bastante buscado ya que combina con todo, no dejando de lado la calidad 🇺🇸\nTalle L: 78cm de largo por 60cm de ancho\nEstado: 10/10",
        isNew: true,
        inStock: true
    }
];

const communityGalleryData = [
    {
        src: "assets/images/Productos/Galeria ZS/camperon-dickies-negro.png",
        alt: "Camperón Dickies negro en la comunidad ONLY ZS"
    },
    {
        src: "assets/images/Productos/Galeria ZS/chomba-club-america.png",
        alt: "Chomba Club América en la comunidad ONLY ZS"
    },
    {
        src: "assets/images/Productos/Galeria ZS/chomba-porche-roja.png",
        alt: "Chomba Porsche roja en la comunidad ONLY ZS"
    },
    {
        src: "assets/images/Productos/Galeria ZS/Captura de pantalla 2026-05-01 200048.png",
        alt: "Look de la comunidad ONLY ZS"
    },
    {
        src: "assets/images/Productos/Galeria ZS/Captura de pantalla 2026-05-01 200104.png",
        alt: "Foto enviada por la comunidad ONLY ZS"
    },
    {
        src: "assets/images/Productos/Galeria ZS/Captura de pantalla 2026-05-01 200131.png",
        alt: "Publicación de la comunidad ONLY ZS"
    }
];
