/* =========================================================
   ONLY ZS — data.js
   Datos de productos y galería
========================================================= */

const productsData = [
    //SHORT CARHARTT
    {
        id: 1,
        name: "Short Carhartt",
        category: "Pantalones",
        price: 40000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-1.jpg",
        images: [
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-1.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-2.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-3.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-4.jpg"
        ],
        description: "Short carpintero de jean bastante rigido, cuenta con varios bolsillos y un material super resistente, tag de cuero.\nTalle 40us(50🇦🇷): 60cm de cintura por 56cm de largo.\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },

    //REMERA MANGALARGA VERDE REAL TREE
    {
        id: 2,
        name: "REAL TREE",
        category: "Remeras",
        price: 25000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras y Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-.jpg",
        images: [
            "assets/images/Productos/Remeras y Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-1.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-2.jpg"
        ],
        description: "Crewneck de algodón con logo en el frente, bastante liviano de media estación.\nTalle L: 68cm de largo x 60cm de ancho.\nEstado: 9/10 tiene un leve desgaste general.",
        isNew: false,
        inStock: true
    },

    //REMERAS NAUTICA X2 ROJAS
    {
        id: 3,
        name: "Nautica",
        category: "Remeras",
        price: 50000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras y Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-5.jpg",
        images: [
            "assets/images/Productos/Remeras y Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-5.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-4.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-2.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-3.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-1.jpg"
        ],
        description: "Remeras Nautica color rojo. Se venden juntas o separadas.\nAmbas talle: M\n$25.000 c/u\nEstado: 10/10",
        isNew: false,
        inStock: true
    },

    //REMERA RUSSELL CHAMPIONS 2014
    {
        id: 4,
        name: "Remera RUSSELL",
        category: "Remeras",
        price: 20000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras y Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-1.jpg",
        images: [
            "assets/images/Productos/Remeras y Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-1.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-2.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-3.jpg"
        ],
        description: "Merch oficial de los Baltimore Orioles al ganar la East Division Champions 2014.\nDiseño gráfico con la icónica mascota Oriole Bird y colores clásicos del equipo.\nTalle L: 75cm de largo por 55 cm de ancho.\nEstado: 10/10",
        isNew: false,
        inStock: true
    },

    //CAMISA CHAPS ROJA MANGACORTA
    {
        id: 5,
        name: "Camisa Chaps",
        category: "Camisas",
        price: 15000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-2-1.jpg",
        images: [
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-2-1.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-2-2.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-2-3.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-2-4.jpg"
        ],
        description: "Camisa liviana original, mangas cortas con cuadrille bastante visto en la linea Chaps.\nTalle XL: 72cm de largo por 60cm de ancho\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },

    //POLO Ralph Lauren H1 TECH
    {
        id: 6,
        name: "Polo Ralph Lauren",
        category: "Remeras",
        price: 50000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-1.jpg",
        images: [
            "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-1.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-2.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-3.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-4.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-5.jpg",
            "assets/images/Productos/Remeras y Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-6.jpg"

        ],
        description: "Polo Ralph Lauren Hi Tech long sleeve.\nInspirada en la línea outdoor de los 90s, pieza retro muy buscada dentro del universo Polo.\nTalle M: 74cm de largo por 55cm de ancho\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },

    //CAMISA RALPH LAUREN OXFORD STRIPED
    {
        id: 7,
        name: "RALPH LAUREN OXFORD STRIPED SHIRT",
        category: "Camisas",
        price: 30000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Camisas/RALPH LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-1.jpg",
        images: [
            "assets/images/Productos/Camisas/RALPH LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-1.jpg",
            "assets/images/Productos/Camisas/RALPH LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-2.jpg",
            "assets/images/Productos/Camisas/RALPH LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-3.jpg",
            "assets/images/Productos/Camisas/RALPH LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-4.jpg",
            "assets/images/Productos/Camisas/RALPH LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-5.jpg"
        ],
        description: "Camisa Ralph Lauren de rayas finas azul y blanco, logo bordado chico, estética tipo old money.\nTalle L: 70cm (74 atras)de largo por 58cm de ancho.\nEstado: 9/10.",
        isNew: false,
        inStock: true
    },

    //SHORT DICKIES GRIS
    {
        id: 8,
        name: "Short Dickies",
        category: "Pantalones",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-1.jpg",
        images: [
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-1.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-2.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-3.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-4.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-5.jpg",
            "assets/images/Productos/Pantalones y Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-6.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //PANTALON LACOSTE-CORDERO
    {
        id: 9,
        name: "Proximamente",
        category: "Pantalones",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-1.jpg",
        images: [
            "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-1.jpg",
            "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-2.jpg",
            "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-3.jpg",
            "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-4.jpg",
            "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-5.jpg",
            "assets/images/Productos/Pantalones y Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-6.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISA CHAPS MANGALARGA ROJA
    {
        id: 10,
        name: "Proximamente",
        category: "Camisas",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-1.jpg",
        images: [
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-1.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-2.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-3.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA PUFFER NAUTICA
    {
        id: 11,
        name: "Proximamente",
        category: "Abrigos",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Abrigos/Camperas/CAMPERA PUFF NAUTICA/CAMPERA-PUFFER-NAUTICA-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/CAMPERA PUFF NAUTICA/CAMPERA-PUFFER-NAUTICA-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA PUFF NAUTICA/CAMPERA-PUFFER-NAUTICA-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA PUFF NAUTICA/CAMPERA-PUFFER-NAUTICA-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA PUFF NAUTICA/CAMPERA-PUFFER-NAUTICA-4.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA L.L. BEAN
    {
        id: 12,
        name: "Proximamente",
        category: "Abrigos",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Abrigos/Camperas/L.L. BEAN/CAMPERA-POLAR-L.L.BEAN-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/L.L. BEAN/CAMPERA-POLAR-L.L.BEAN-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/L.L. BEAN/CAMPERA-POLAR-L.L.BEAN-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/L.L. BEAN/CAMPERA-POLAR-L.L.BEAN-3.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER DOCKERS
    {
        id: 13,
        name: "Proximamente",
        category: "Abrigos",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-3.jpg",
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-4.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER MISSONI
    {
        id: 14,
        name: "Proximamente",
        category: "Abrigos",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-3.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //GORRA JOHN DEERE
    {
        id: 15,
        name: "Proximamente",
        category: "Accesorios",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Accesorios/Gorras/John Deere/GORRA-JOHN-DEERE-1.jpg",
        images: [
            "assets/images/Productos/Accesorios/Gorras/John Deere/GORRA-JOHN-DEERE-1.jpg",
            "assets/images/Productos/Accesorios/Gorras/John Deere/GORRA-JOHN-DEERE-2.jpg",
            "assets/images/Productos/Accesorios/Gorras/John Deere/GORRA-JOHN-DEERE-3.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //PASAMONTAÑAS REAL TREE
    {
        id: 16,
        name: "Proximamente",
        category: "Accesorios",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Accesorios/Pasamontañas/REAL TREE/PASAMONTAÑAS-REALTREE-1.jpg",
        images: [
            "assets/images/Productos/Accesorios/Pasamontañas/REAL TREE/PASAMONTAÑAS-REALTREE-1.jpg",
            "assets/images/Productos/Accesorios/Pasamontañas/REAL TREE/PASAMONTAÑAS-REALTREE-2.jpg",
            "assets/images/Productos/Accesorios/Pasamontañas/REAL TREE/PASAMONTAÑAS-REALTREE-3.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //RELOJ CASIO
    {
        id: 17,
        name: "Proximamente",
        category: "Accesorios",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-1.jpg",
        images: [
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-1.jpg",
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-2.jpg",
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-3.jpg",
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-4.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISETA ALEMANIA
    {
        id: 18,
        name: "Proximamente",
        category: "Camisetas",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-1.jpg",
        images: [
            "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-1.jpg",
            "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-2.jpg",
            "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-3.jpg",
            "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-4.jpg",
            "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-5.jpg",
            "assets/images/Productos/Remeras y Chombas/Camisetas/Camiseta Alemania/CAMISETA-ALEMANIA-6.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CHOMBA NAUTICA AZUL
    {
        id: 19,
        name: "Proximamente",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Remeras y Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-1.jpg",
        images: [
            "assets/images/Productos/Remeras y Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-1.jpg",
            "assets/images/Productos/Remeras y Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-2.jpg",
            "assets/images/Productos/Remeras y Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-3.jpg",
            "assets/images/Productos/Remeras y Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-4.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    }

    /*PROXIMAMENTE
    {
        id: 20,
        name: "Proximamente",
        category: "",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/",
        images: [

        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    }, 
    */
];

const communityGalleryData = [
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-1.jpg",
        alt: "Galería ZS foto 1"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-2.jpg",
        alt: "Galería ZS foto 2"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-3.jpg",
        alt: "Galería ZS foto 3"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-4.jpg",
        alt: "Galería ZS foto 4"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-5.jpg",
        alt: "Galería ZS foto 5"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-6.jpg",
        alt: "Galería ZS foto 6"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-7.jpg",
        alt: "Galería ZS foto 7"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-8.jpg",
        alt: "Galería ZS foto 8"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-9.jpg",
        alt: "Galería ZS foto 9"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-10.jpg",
        alt: "Galería ZS foto 10"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-11.jpg",
        alt: "Galería ZS foto 11"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-12.jpg",
        alt: "Galería ZS foto 12"
    },
    {
        src: "assets/images/Productos/Galeria ZS/GALERIA-ZS-13.jpg",
        alt: "Galería ZS foto 13"
    }
];

const collaborationsData = [
    {
        key: "culto-a-las-calles",
        title: "Culto A Las Calles",
        tagline: "Culto, skate y calle en fotografía.",
        description: "Culto A Las Calles documenta la escena desde adentro: spots, sesiones nocturnas, ruedas gastadas y ese pulso de calle que no se fabrica. Sus fotos, realizadas por Pato, convierten cada truco y cada esquina en archivo visual de la calle.",
        website: "",
        instagram: "https://www.instagram.com/culto.a.las.calles/",
        youtube: "https://www.youtube.com/@culto.a.las.calles",
        latestVideoTitle: "el caos x ellas",
        latestVideo: "https://www.youtube.com/watch?v=qB2GjHAJyXo",
        heroImage: "assets/images/Brand/Culto A Las Calles/HERO-CULTO-A-LAS-CALLES.jpg",
        gallery: [
            "assets/images/Brand/Culto A Las Calles/CULTO-A-LAS-CALLES-1.jpg",
            "assets/images/Brand/Culto A Las Calles/CULTO-A-LAS-CALLES-2.jpg",
            "assets/images/Brand/Culto A Las Calles/CULTO-A-LAS-CALLES-3.jpg",
            "assets/images/Brand/Culto A Las Calles/CULTO-A-LAS-CALLES-4.jpg"
        ]
    },
    {
        key: "proxima-colaboracion",
        title: "Próxima Colaboración",
        tagline: "Lugar preparado para la segunda marca.",
        description: "Este espacio queda reservado para sumar la próxima colaboración. La página ya mantiene la misma estructura visual: portada, información de marca, redes, contacto y galería.",
        website: "index.html#collaborations",
        instagram: "https://www.instagram.com/only_zonasur/",
        youtube: "",
        latestVideoTitle: "",
        latestVideo: "",
        heroImage: "assets/images/HERO-ZS.png",
        gallery: [
            "assets/images/HERO-ZS.png"
        ]
    }
];
