/* =========================================================
   ONLY ZS — data.js
   Datos de productos y galería
========================================================= */

    //PRODUCTOS

const productsData = [

    //BERMUDA DICKIES BEIGE - PUBLICADA - NUEVO
    {
        id: "bermuda-dickies-beige",
        name: "Bermuda Dickies Beige",
        category: "Pantalones",
        price: 25000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/BERMUDA-DICKIES-BEIGE/BERMUDA-DICKIES-BEIGE-6.jpg"
        ],
        description: "Bermuda doble logo Dickies Genuine. material rigido color beige sin detalles, doble logo adelante y atras.\nTalle: 40us\n50cm de cintura x 57cm de largo\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //ROMPE VIENTOS POLO RALPH LAUREN - NO PUBLICADO
    {
        id: "rompe-vientos-polo-ralph-lauren",
        name: "Rompe Vientos Polo Ralph Lauren",
        category: "Abrigos",
        price: null,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-4.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-5.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-6.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-POLO/ROMPE-VIENTOS-POLO-7.jpg"
        ],
        description: "Buzo tipo rompevientos sin capucha, Cookie Patch, prenda de los 80’-90’ de PRL. no hay mucho que decir sobre esta prenda, joyon vintage coleccionable, además colores de bokita viejo\nTalle: XL\nEstado: 9/10.",
        isNew: true,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //POLO JEANS CO. RALPH LAUREN - PUBLICADO - NUEVO - VENDIDO
    {
        id: "polo-jeans-co-ralph-lauren",
        name: "Polo Jeans Co. Ralph Lauren",
        category: "Remeras",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-6.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-7.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-JEANS-CO/POLO-JEANS-CO-8.jpg"
        ],
        description: "crewneck tipo Henley de la linea Polo Jeans by Ralph Lauren, con botones en su cuello, estilo de mangas tipo baisball, big logo en su espalda. Prenda de los 90’-00’ en impecable estado.\nTalle: XL\nEstado: 10/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CREWNECK-POLO-RALPH-LAUREN - PUBLICADO - VENDIDO
    {
        id: "crewneck-polo-ralph-lauren",
        name: "Crewneck Polo Ralph Lauren",
        category: "Abrigos",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: "assets/images/Productos/Abrigos/Buzos/CREWNECK-POLO-RALPH-LAUREN/CREWNECK-POLO-RALPH-LAUREN-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Buzos/CREWNECK-POLO-RALPH-LAUREN/CREWNECK-POLO-RALPH-LAUREN-1.jpg",
            "assets/images/Productos/Abrigos/Buzos/CREWNECK-POLO-RALPH-LAUREN/CREWNECK-POLO-RALPH-LAUREN-2.jpg",
            "assets/images/Productos/Abrigos/Buzos/CREWNECK-POLO-RALPH-LAUREN/CREWNECK-POLO-RALPH-LAUREN-3.jpg",
            "assets/images/Productos/Abrigos/Buzos/CREWNECK-POLO-RALPH-LAUREN/CREWNECK-POLO-RALPH-LAUREN-4.jpg",
            "assets/images/Productos/Abrigos/Buzos/CREWNECK-POLO-RALPH-LAUREN/CREWNECK-POLO-RALPH-LAUREN-5.jpg"
        ],
        description: "Crewneck a rayas de algodon pesado, prenda original de PRL.\nCon puños y bordado en su pecho, buzo con un diseño muy poco visto.\nPrenda de los 90’-00’s. A finales de los 90, Ralph Lauren tiró por los patrones de rayas horizontales de estilo country club o rugby.\nTalle: L\nEstado: 9.5/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA MANGAS LARGAS L.L. BEAN - PUBLICADA - NUEVO
    {
        id: "remera-mangas-largas-ll-bean",
        name: "Remera Mangas Largas L.L. Bean",
        category: "Remeras",
        price: 25000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Remeras/MANGASLARGAS-LL-BEAN/MANGASLARGAS-LL-BEAN-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/MANGASLARGAS-LL-BEAN/MANGASLARGAS-LL-BEAN-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/MANGASLARGAS-LL-BEAN/MANGASLARGAS-LL-BEAN-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/MANGASLARGAS-LL-BEAN/MANGASLARGAS-LL-BEAN-3.jpg"
        ],
        description: "Remera mangas largas liviana, color basico azul oscuro. tipo termica\nTalle: M\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA PAISANO'S VINTAGE - PUBLICADA - NUEVO
    {
        id: "remera-paisanos",
        name: "Remera Paisano's",
        category: "Remeras",
        price: 15000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-PAISANOS/REMERA-PAISANOS-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-PAISANOS/REMERA-PAISANOS-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-PAISANOS/REMERA-PAISANOS-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-PAISANOS/REMERA-PAISANOS-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-PAISANOS/REMERA-PAISANOS-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-PAISANOS/REMERA-PAISANOS-5.jpg"
        ],
        description: "Remera vintage con serigrafia en el frente y en la espalda, tiene un solo detalle visible en la última foto.\nTalle: M\nEstado: 9/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CHOMBA POLO RALPH LAUREN ROJA - PUBLICADA - NUEVO
    {
        id: "chomba-polo-ralph-lauren-roja",
        name: "Chomba Polo Ralph Lauren",
        category: "Remeras",
        price: 32000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-ROJA/CHOMBA-POLO-ROJA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-ROJA/CHOMBA-POLO-ROJA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-ROJA/CHOMBA-POLO-ROJA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-ROJA/CHOMBA-POLO-ROJA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-ROJA/CHOMBA-POLO-ROJA-4.jpg"
        ],
        description: "Polo de piqué PRL con su big logo bordado en el pecho y el numero 3 en su manga derecha. Corte americano, color impecable.\nTalle: 14-16\nLargo: 66cm (62cm adelante)\nAncho: 47cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CHOMBA POLO RALPH LAUREN GRIS - PUBLICADA - NUEVO
    {
        id: "chomba-polo-ralph-lauren",
        name: "Chomba Polo Ralph Lauren",
        category: "Remeras",
        price: 28000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-GRIS/CHOMBA-POLO-GRIS-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-GRIS/CHOMBA-POLO-GRIS-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-GRIS/CHOMBA-POLO-GRIS-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-GRIS/CHOMBA-POLO-GRIS-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-GRIS/CHOMBA-POLO-GRIS-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-GRIS/CHOMBA-POLO-GRIS-5.jpg"
        ],
        description: "Chomba piqué gris original de PRL. Corte americano abajo, gris claro.\nTalle: 14-16\nLargo: 66cm (63cm adelante)\nAncho: 47cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA PUFFER POLO RALPH LAUREN - NO PUBLICADA - NUEVO
    {
        id: "campera-puffer-polo-ralph-lauren",
        name: "Campera Puffer Polo Ralph Lauren",
        category: "Abrigos",
        price: null,
        originalPrice: null,
        badge: null,
        image: "assets/images/HERO-ZS.PNG",
        images: [

        ],
        description: "Puffer de plumas Big Ponny original de PRL.\nBastante inflada tiene capucha, bolsillo en las mangas, con su big logo bordado en el frente colores muy buscados.\nTalle: 14/16\nLargo: 61cm\nAncho: 53cm\nEstado: 9/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER LEVI'S - PUBLICADO - NUEVO
    {
        id: "sueter-levi's",
        name: "Sueter Levi's",
        category: "Abrigos",
        price: 30000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Sueter/SUETER-LEVIS/SUETER-LEVIS-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/SUETER-LEVIS/SUETER-LEVIS-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-LEVIS/SUETER-LEVIS-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-LEVIS/SUETER-LEVIS-3.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-LEVIS/SUETER-LEVIS-4.jpg"
        ],
        description: "Sueter de hilo original, no es tan liviano posee los puños y cintura en buenas condiciones, sin detalles.\nTalle: XL\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //PANTALON POLO RALPH LAUREN - PUBLICADO - NUEVO
    {
        id: "pantalon-polo-ralph-lauren",
        name: "Pantalón Polo Ralph Lauren",
        category: "Pantalones",
        price: 40000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-6.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-7.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-POLO-AZUL/PANTALON-POLO-AZUL-8.jpg"
        ],
        description: "Clasic Polo Chino azul oscuro, corte chino con su etiqueta en la parte de tras, tiene un ruedo en sus botamangas aprox de 4cm.\nTalle: 40us\nCintura: 50cm\nLargo: 110cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA ROMPEVIENTOS COLUMBIA - PUBLICADA - NUEVO
    {
        id: "campera-rompevientos-columbia",
        name: "Campera Rompevientos Columbia",
        category: "Abrigos",
        price: 50000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-4.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-5.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-6.jpg",
            "assets/images/Productos/Abrigos/Camperas/ROMPE-VIENTOS-COLUMBIA/ROMPE-VIENTOS-COLUMBIA-7.jpg"
        ],
        description: "Campera tipo rompevientos con polar interno bastante abrigada, color bastante buscado con detalles bordados, cierre en los bolsillos y reguladores en la cintura.\nTalle: M\nLargo: 62cm\nAncho: 60cm\nEstado: 9,5/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CHALECO COLUMBIA NEGRO - PUBLICADO - NUEVO
    {
        id: "chaleco-columbia-negro",
        name: "Chaleco Columbia",
        category: "Abrigos",
        price: 20000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-1.jpg",
            "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-2.jpg",
            "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-3.jpg",
            "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-4.jpg",
            "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-5.jpg",
            "assets/images/Productos/Abrigos/Chalecos/CHALECO-COLUMBIA-NEGRO/CHALECO-COLUMBIA-6.jpg"
        ],
        description: "Chaleco tipo polar con cierre en sus bolsillos, no es tan pesado, logo en el frente.\nTalle: S/M\nLargo: 56cm\nAncho: 54cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA POLO RALPH LAUREN ROJA- PUBLICADA - NUEVO - VENDIDO
    {
        id: "remera-polo-ralph-lauren-roja",
        name: "Remera Polo Ralph Lauren",
        category: "Remeras",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-MANGAS-LARGAS-ROJA/POLO-MANGAS-LARGAS-ROJA-6.jpg"
        ],
        description: "Remera básica mangas largas, de algodón liviana bastante comoda y clásica, logo bordado, color sin desgastes.\nTalle: L\nLargo: 64cm\nAncho: 52cm\nEstado: 10/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA POLO RALPH LAUREN - PUBLICADA - NUEVO
    {
        id: "campera-polo-ralph-lauren",
        name: "Campera Polo Ralph Lauren",
        category: "Abrigos",
        price: 50000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Camperas/CAMPERA-POLO-AZUL/CAMPERA-POLO-AZUL-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-POLO-AZUL/CAMPERA-POLO-AZUL-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-POLO-AZUL/CAMPERA-POLO-AZUL-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-POLO-AZUL/CAMPERA-POLO-AZUL-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-POLO-AZUL/CAMPERA-POLO-AZUL-4.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-POLO-AZUL/CAMPERA-POLO-AZUL-5.jpg"
        ],
        description: "Zip-up de algodon bastante pesado, color sin ningun tipo de desgaste.\nTalle: L\nLargo: 69cm\nAncho: 60cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA CARHARTT - PUBLICADA - NUEVO
    {
        id: "campera-carhartt",
        name: "Campera Carhartt",
        category: "Abrigos",
        price: 50000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-4.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-5.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-6.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-CARHARTT-GRIS/CAMPERA-CARHARTT-GRIS-7.jpg"
        ],
        description: "Zip-up original, material pesado\nTalle: L\nLargo: 74cm\nAncho: 57cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER POLO RALPH LAUREN ROJO - PUBLICADO - VENDIDO
    {
        id: "sueter-polo-ralph-lauren",
        name: "Sueter Polo Ralph Lauren",
        category: "Abrigos",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: "assets/images/Productos/Abrigos/Sueter/SUETER-POLO-ROJO/SUETER-POLO-ROJO-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/SUETER-POLO-ROJO/SUETER-POLO-ROJO-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-POLO-ROJO/SUETER-POLO-ROJO-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-POLO-ROJO/SUETER-POLO-ROJO-3.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-POLO-ROJO/SUETER-POLO-ROJO-4.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-POLO-ROJO/SUETER-POLO-ROJO-5.jpg"
        ],
        description: "Sueter tejido vintage, material pesado con su logo bordado en color negro, prenda con bastantes años encima, en excelente estado, color intacto.\nTalle: L\nLargo: 64cm\nAncho: 66cm\nEstado: 9/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISETA MANGAS LARGAS REAL TREE - PUBLICADA - NUEVO
    {
        id: "camiseta-real-tree",
        name: "Camiseta Mangas Largas Real Tree",
        category: "Camisetas",
        price: 20000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-6.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-7.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/REAL-TREE-MANGAS-LARGAS/REAL-TREE-MANGAS-LARGAS-8.jpg"
        ],
        description: "Camiseta mangas largas con tecnología Scent Control, material liviano tipo deportivo y suave, secaso rápido , en el interior de las axilas con mallas para mejor ventilación.\nCamo MAX-7 XT\nTalle: S\nLargo: 66cm\nAncho 48cm\nMangas: 62cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //HOODIE CHAMPION PINK
    {
        id: "hoodie-champion-pink",
        name: "Hoodie Champion Pink",
        category: "Buzos",
        price: 50000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-1.jpg",
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-2.jpg",
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-3.jpg",
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-4.jpg",
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-5.jpg",
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-6.jpg",
            "assets/images/Productos/Abrigos/Buzos/CHAMPION-HOODIE-PINK/CHAMPION-HOODIE-PINK-7.jpg"
        ],
        description: "Double spell out pink hoodie.\nBuzo tipo canguro con bordados en el frente y en las mangas (spell out). Posee las características de la linea Reverse Weave de Champion, aunque por la etiqueta no sea esta linea, es un buzo bastante pesado y abrigado, con extremos metalicos en los cordones. Color og.\nTalle: XXL\nLargo: 68cm\nAncho: 58cm\nMangas: 60cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //DICKIES FOR WOMEN - PUBLICADA - NUEVO
    {
        id: "dickies-for-women",
        name: "Dickies for Women",
        category: "Pantalones",
        price: 40000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-FOR-WOMAN/DICKIES-FOR-WOMAN-6.jpg"
        ],
        description: "Pantalón workwear color negro, material resistente apto para esfuerzos duros.\nTalle: 9\nCintura: 42cm\nLargo: 102cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER TOMMY HILFIGER - PUBLICADO - VENDIDO
    {
        id: "sueter-tommy-hilfiger",
        name: "Sueter Tommy Hilfiger",
        category: "Abrigos",
        price: null,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Abrigos/Sueter/SUETER-TOMMY-HILFIGER/SUETER-TOMMY-HILFIGER-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/SUETER-TOMMY-HILFIGER/SUETER-TOMMY-HILFIGER-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-TOMMY-HILFIGER/SUETER-TOMMY-HILFIGER-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-TOMMY-HILFIGER/SUETER-TOMMY-HILFIGER-3.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-TOMMY-HILFIGER/SUETER-TOMMY-HILFIGER-4.jpg",
            "assets/images/Productos/Abrigos/Sueter/SUETER-TOMMY-HILFIGER/SUETER-TOMMY-HILFIGER-5.jpg"
        ],
        description: "Sueter pesado original de TH. Puños y cintura sin desgastes, color en buen estado tiene el logo Crest bordado en el pecho.\nTalle: M\nLargo: 68cm\nAncho: 60cm\nEstado: 10/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    /*
    //HOODIE REAL TREE - PUBLICADA - VENDIDO
    {
        id: "hoodie-realtree",
        name: "Hoodie Real Tree",
        category: "Buzos",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: 
        images: [

        ],
        description: "Hoodie original, algodon de excelente calidad, color y estampado sin desgastes, tiene el interior de la capucha cammo tipo realtree.\nTalle: XL\n70cm de largo X 64cm de ancho\nEstado: 9/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },
    */

    //HOODIE SPELL OUT CHAMPIONS NEGRO - VENDIDO
    {
        id: "hoodie-spell-out-champions",
        name: "Hoodie Spell Out Champions",
        category: "Buzos",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-NEGRO/HOODIE-CHAMPIONS-NEGRO-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-NEGRO/HOODIE-CHAMPIONS-NEGRO-1.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-NEGRO/HOODIE-CHAMPIONS-NEGRO-2.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-NEGRO/HOODIE-CHAMPIONS-NEGRO-3.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-NEGRO/HOODIE-CHAMPIONS-NEGRO-4.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-NEGRO/HOODIE-CHAMPIONS-NEGRO-5.jpg"
        ],
        description: "buzo con capucha original, tiene detalle bordado en su manga y spell out en su frente, a estrenar no tiene rastros de desgaste ni detalles, puños poco estirados.\nTalle: 2XL\nLargo: 64cm\nAncho: 64cm\nEstado: 10/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //HOODIE BASIC CHAMPIONS AZUL - PUBLICADA - VENDIDO
    {
        id: "hoodie-basic-champions",
        name: "Hoodie Basic Champions Azul",
        category: "Buzos",
        price: null,
        originalPrice: null,
        badge: "VENDIDO",
        image: "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-AZUL/HOODIE-CHAMPIONS-AZUL-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-AZUL/HOODIE-CHAMPIONS-AZUL-1.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-AZUL/HOODIE-CHAMPIONS-AZUL-2.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-AZUL/HOODIE-CHAMPIONS-AZUL-3.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-AZUL/HOODIE-CHAMPIONS-AZUL-4.jpg",
            "assets/images/Productos/Abrigos/Buzos/HOODIE-CHAMPIONS-AZUL/HOODIE-CHAMPIONS-AZUL-5.jpg"
        ],
        description: "Buzo con capucha original, tiene detalle bordado en su manga y extremos metalicos en los cordones, no posee desgastes ni detalles, color bastante buscado combinable\nTalle: L\nLargo: 68cm\nAncho: 60cm\nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA CHAMPION BALDWIN WALLACE - NO PUBLICADA
    {
        id: "remera-champion",
        name: "Remera Champion Baldwin Wallace",
        category: "Remeras",
        price: 20000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/HERO-ZS.PNG",
        images: [

        ],
        description: "Remera de algodón con estampado en el frente y detalle bordado tipico de la marca en su manga, es bastante comoda y tiene confección tubular (sin costuras en los costados)\nTalle: XL\nLargo: 68cm\nAncho: 56cm\nEstado: 10/10.",
        isNew: true,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA NAUTICA ROJA - PUBLICADA
    {
        id: "remera-nautica-roja",
        name: "Remera Nautica",
        category: "Remeras",
        price: 15000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-NAUTICA-ROJA/REMERA-NAUTICA-ROJA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-NAUTICA-ROJA/REMERA-NAUTICA-ROJA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-NAUTICA-ROJA/REMERA-NAUTICA-ROJA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-NAUTICA-ROJA/REMERA-NAUTICA-ROJA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-NAUTICA-ROJA/REMERA-NAUTICA-ROJA-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-NAUTICA-ROJA/REMERA-NAUTICA-ROJA-5.jpg"
        ],
        description: "Remera de algodón original con estampado en el frente, practicamente a estrenar no tiene ninguna tipo de detalle ni desgaste.\nTalle: M\nLargo: 72cm\nAncho: 56cm\nEstado: 10/10.",
        isNew: false,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //DICKIES CARGO BEIGE - PUBLICADA - NUEVO
    {
        id: "dickies-cargo",
        name: "Dickies Cargo",
        category: "Pantalones",
        price: 35000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-CARGO-BEIGE/DICKIES-CARGO-BEIGE-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-CARGO-BEIGE/DICKIES-CARGO-BEIGE-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-CARGO-BEIGE/DICKIES-CARGO-BEIGE-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-CARGO-BEIGE/DICKIES-CARGO-BEIGE-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-CARGO-BEIGE/DICKIES-CARGO-BEIGE-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/DICKIES-CARGO-BEIGE/DICKIES-CARGO-BEIGE-6.jpg"
        ],
        description: "Basico workwear color beige con bolsillos extras en sus costados, material super resistente y costuras reforzadas para trabajos duros, color intacto sin desgastes ni detalles.\nTalle: 38us\nCintura: 48cm\nLargo: 110cm\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA PUFFER NAUTICA MULTICOLOR - PUBLICADO - NUEVO
    {
        id: "campera-nautica-multicolor",
        name: "Campera Nautica Multicolor",
        category: "Abrigos",
        price: 100000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-4.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-5.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-6.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFFER-NAUTICA-MULTICOLOR/CAMPERA-PUFFER-NAUTICA-MULTICOLOR-7.jpg"
        ],
        description: "Campera puffer nautica expedition.\nTalle: XL\n80 atras 75 adelante x 60 de ancho\nEstado: 9/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER DOCKERS - PUBLICADO - NUEVO
    {
        id: "sueter-dockers",
        name: "Sueter Dockers",
        category: "Abrigos",
        price: 20000,
        badge: "NUEVO",
        originalPrice: null,
        image: "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-3.jpg",
            "assets/images/Productos/Abrigos/Sueter/DOCKERS/SUETER-DOCKERS-4.jpg"
        ],
        description: "Sueter de punto blanco marca Dockers con diseño impreso geometrico y navideño en el pecho con cuello redondo\nTalle: XL\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER MISSONI - PUBLICADO NUEVO
    {
        id: "sueter-missoni",
        name: "Sueter Missoni",
        category: "Abrigos",
        price: 35000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/MISSONI/SUETER-MISSONI-3.jpg"
        ],
        description: "Sueter con diseño de punto chevron.\nTalle: XL\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //JEAN DICKIES CARPINTERO - PUBLICADO - NUEVO
    {
        id: "jean-dickies-carpintero",
        name: "Jean Dickies Carpintero",
        category: "Pantalones",
        price: 45000,
        badge: "NUEVO",
        originalPrice: null,
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/JEAN-DICKIES-CARPINTERO/JEAN-DICKIES-CARPINTERO-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/JEAN-DICKIES-CARPINTERO/JEAN-DICKIES-CARPINTERO-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/JEAN-DICKIES-CARPINTERO/JEAN-DICKIES-CARPINTERO-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/JEAN-DICKIES-CARPINTERO/JEAN-DICKIES-CARPINTERO-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/JEAN-DICKIES-CARPINTERO/JEAN-DICKIES-CARPINTERO-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/JEAN-DICKIES-CARPINTERO/JEAN-DICKIES-CARPINTERO-5.jpg"
        ],
        description: "Modelo Slim fit trabajado con pintura de tela sobre la misma tela aun a estrenar, posee todas sus etiquetas lit sin uso.\nTalle: 36us\n46 de cintura\n104 de largo\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //PANTALON L.L BEAN - PUBLICADO - NUEVO
    {
        id: "pantalon-ll-bean",
        name: "Pantalón L.L. Bean",
        category: "Pantalones",
        price: 45000,
        originalPrice: null,
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-L-L-BEAN/PANTALON-L-L-BEAN-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-L-L-BEAN/PANTALON-L-L-BEAN-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-L-L-BEAN/PANTALON-L-L-BEAN-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-L-L-BEAN/PANTALON-L-L-BEAN-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-L-L-BEAN/PANTALON-L-L-BEAN-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-L-L-BEAN/PANTALON-L-L-BEAN-5.jpg"
        ],
        description: "Pantalon de vestir a estrenar, con etiquetas.\nTalle: 36us\nEstado: 10/10",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISETA BOCA - PUBLICADA - NUEVO
    {
        id: "camiseta-nike-boca",
        name: "Camiseta Boca Juniors 07/08",
        category: "Camisetas",
        price: 35000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-BOCA-07-08/CAMISETA-BOCA-07-08-6.jpg"
        ],
        description: "Camiseta alternativa, excelente calidad. Temporada 07/08, la que uso Boca cuando gano la Libertadores.\nTalle: M",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA GOODYEAR MC RAYAS - PUBLICADA - NUEVO
    {
        id: "remera-goodyear-mc",
        name: "Remera Goodyear",
        category: "Remeras",
        price: 18000,
        originalPrice: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-GOODYEAR-MC/REMERA-GOODYEAR-MC-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-GOODYEAR-MC/REMERA-GOODYEAR-MC-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-GOODYEAR-MC/REMERA-GOODYEAR-MC-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-GOODYEAR-MC/REMERA-GOODYEAR-MC-3.jpg"
        ],
        description: "Remera a rayas, sin detalles. De algodon.\nTalle: L\n75x61\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //PANTALON NAUTICA CHINO BEIGE - PUBLICADA - NUEVO
    {
        id: "pantalon-nautica-chino",
        name: "Pantalon Nautica",
        category: "Pantalones",
        price: 30000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-NAUTICA-CHINO-BEIGE/PANTALON-NAUTICA-CHINO-BEIGE-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-NAUTICA-CHINO-BEIGE/PANTALON-NAUTICA-CHINO-BEIGE-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-NAUTICA-CHINO-BEIGE/PANTALON-NAUTICA-CHINO-BEIGE-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-NAUTICA-CHINO-BEIGE/PANTALON-NAUTICA-CHINO-BEIGE-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-NAUTICA-CHINO-BEIGE/PANTALON-NAUTICA-CHINO-BEIGE-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/PANTALON-NAUTICA-CHINO-BEIGE/PANTALON-NAUTICA-CHINO-BEIGE-5.jpg"
        ],
        description: "Pantalon de vestir original clasico sin bolsillos extras, y color beige\nTalle: 38us\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //GORRA JOHN DEERE - PUBLICADA NUEVA
    {
        id: "gorra-john-deere",
        name: "Gorra John Deere",
        category: "Accesorios",
        price: 60000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Accesorios/Gorras/John-Deere/GORRA-JOHN-DEERE-1.jpg",
        images: [
            "assets/images/Productos/Accesorios/Gorras/John-Deere/GORRA-JOHN-DEERE-1.jpg",
            "assets/images/Productos/Accesorios/Gorras/John-Deere/GORRA-JOHN-DEERE-2.jpg",
            "assets/images/Productos/Accesorios/Gorras/John-Deere/GORRA-JOHN-DEERE-3.jpg"
        ],
        description: "Logo bordado en frente de la marca con correa de tela ajustable en la parte trasera.\nTalle: Unico AC (Apto Cabezones)\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CHOMBA NAUTICA AZUL - PUBLICADA - NUEVA
    {
        id: "chomba-nautica-azul",
        name: "Chomba Nautica Azul",
        category: "Remeras",
        price: 25000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/NAUTICA-AZUL/CHOMBA-NAUTICA-AZUL-4.jpg"
        ],
        description: "chomba de vestir a rayas de material liviano, conserva botones originales sin desgastes y detalle con el nombre en la manga\nTalle: XL\nEstado: 9.5/10",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA PUFFER NAUTICA - PUBLICADA
    {
        id: "campera-puffer-nautica",
        name: "Campera Puffer Nautica",
        category: "Abrigos",
        price: 65000,
        originalPrice: null,
        image: "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFF-NAUTICA/CAMPERA-PUFFER-NAUTICA-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFF-NAUTICA/CAMPERA-PUFFER-NAUTICA-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFF-NAUTICA/CAMPERA-PUFFER-NAUTICA-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFF-NAUTICA/CAMPERA-PUFFER-NAUTICA-3.jpg",
            "assets/images/Productos/Abrigos/Camperas/CAMPERA-PUFF-NAUTICA/CAMPERA-PUFFER-NAUTICA-4.jpg"
        ],
        description: "Campera abrigada con spell out en la manga, tiene detalles en otros colores y posee reguladores funcionando al igual que los cierres.\nTalle: M\nEstado: 8.5/10",
        isNew: false,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMPERA L.L. BEAN - PUBLICADA - NUEVO
    {
        id: "campera-ll-bean",
        name: "Campera L.L. Bean",
        category: "Abrigos",
        price: 45000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Camperas/L-L-BEAN/CAMPERA-POLAR-L-L-BEAN-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Camperas/L-L-BEAN/CAMPERA-POLAR-L-L-BEAN-1.jpg",
            "assets/images/Productos/Abrigos/Camperas/L-L-BEAN/CAMPERA-POLAR-L-L-BEAN-2.jpg",
            "assets/images/Productos/Abrigos/Camperas/L-L-BEAN/CAMPERA-POLAR-L-L-BEAN-3.jpg"
        ],
        description: "Campera material polar con bolsillos y cierres, 3 bolsillos en total material abrigado spell out en el pecho\nTalle: M/L\n68cm de largo\n60cm de ancho\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //SUETER VINTAGE - PUBLICADA - NUEVO
    {
        id: "sueter-vintage",
        name: "Sueter Vintage",
        category: "Abrigos",
        price: 35000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Sueter/VINTAGE/SUETER-VINTAGE-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Sueter/VINTAGE/SUETER-VINTAGE-1.jpg",
            "assets/images/Productos/Abrigos/Sueter/VINTAGE/SUETER-VINTAGE-2.jpg",
            "assets/images/Productos/Abrigos/Sueter/VINTAGE/SUETER-VINTAGE-3.jpg"
        ],
        description: "Tipo vintage, tramado clasico con colores aun bastante conservados\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISA CHAPS MANGALARGA ROJA - PUBLICADA
    {
        id: "camisa-chaps-mangalarga",
        name: "Camisa Chaps Manga larga",
        category: "Camisas",
        price: 15000,
        originalPrice: null,
        image: "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-1.jpg",
        images: [
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-1.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-2.jpg",
            "assets/images/Productos/Camisas/CHAPS/CAMISA-CHAPS-MANGALARGA-3.jpg"
        ],
        description: "Camisa de vestir con cuadrille combinando el azul rojo y blanco, posee botones originales y de respuesto, sin detalles ni manchas.\nTalle: XL (16)\n62cm de largo\n50cm de ancho\nEstado: 10/10.",
        isNew: false,
        inStock: true,
    },

    //RELOJ CASIO - PUBLICADO NUEVO
    {
        id: "reloj-casio",
        name: "Reloj Casio",
        category: "Accesorios",
        price: 180000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-1.jpg",
        images: [
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-1.jpg",
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-2.jpg",
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-3.jpg",
            "assets/images/Productos/Accesorios/Relojes/RELOJ-CASIO-4.jpg"
        ],
        description: "Reloj casio edifice modelo de la formula 1 (no.tiene pilas anda perfecto)\nEstado: 9.5/10.",
        isNew: false,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //MUSCULOSA NIKE GRIS - PUBLICADA - NUEVO
    {
        id: "musculosa-nike-gris",
        name: "Musculosa Nike Gris",
        category: "Remeras",
        price: 15000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Remeras/MUSCULOSA-NIKE-GRIS/MUSCULOSA-NIKE-GRIS-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/MUSCULOSA-NIKE-GRIS/MUSCULOSA-NIKE-GRIS-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/MUSCULOSA-NIKE-GRIS/MUSCULOSA-NIKE-GRIS-2.jpg"
        ],
        description: "Musculosa deportiva original, basica color gris sin desgastes\nTalle: L\n74x52\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISA RALPH LAUREN OXFORD STRIPED - PUBLICADO
    {
        id: "ralph-lauren-oxford-striped",
        name: "Ralph Lauren Oxford Striped",
        category: "Camisas",
        price: 30000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Camisas/RALPH-LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-1.jpg",
        images: [
            "assets/images/Productos/Camisas/RALPH-LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-1.jpg",
            "assets/images/Productos/Camisas/RALPH-LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-.jpg",
            "assets/images/Productos/Camisas/RALPH-LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-3.jpg",
            "assets/images/Productos/Camisas/RALPH-LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-4.jpg",
            "assets/images/Productos/Camisas/RALPH-LAUREN/RALPH-LAUREN-0XFORD-STRIPED-SHIRT-5.jpg"
        ],
        description: "Camisa Ralph Lauren de rayas finas azul y blanco, logo bordado chico, estética tipo old money.\nTalle L: 70cm (74 atras)de largo por 58cm de ancho.\nEstado: 9/10.",
        isNew: false,
        inStock: true
    },

    //POLO Ralph Lauren H1 TECH - PUBLICADO
    {
        id: "polo-ralph-lauren-h1-tech",
        name: "Polo Ralph Lauren H1 Tech",
        category: "Remeras",
        price: 50000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/POLO-H1-TECH/POLO-H1-TECH-6.jpg"

        ],
        description: "Polo Ralph Lauren Hi Tech long sleeve.\nInspirada en la línea outdoor de los 90s, pieza retro muy buscada dentro del universo Polo.\nTalle M: 74cm de largo por 55cm de ancho\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },

    //CAMISA CHAPS ROJA MANGACORTA - PUBLICADO
    {
        id: "camisa-chaps-roja-mc",
        name: "Camisa Chaps Roja Manga Corta",
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

    //REMERA RUSSELL CHAMPIONS 2014 - PUBLICADO
    {
        id: "remera-russell-champions-2014",
        name: "Remera Russell Champions 2014",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/RUSSELL-CHAMPIONS-2014-NARANJA/RUSSELL-CHAMPIONS-2014-3.jpg"
        ],
        description: "Merch oficial de los Baltimore Orioles al ganar la East Division Champions 2014.\nDiseño gráfico con la icónica mascota Oriole Bird y colores clásicos del equipo.\nTalle L: 75cm de largo por 55 cm de ancho.\nEstado: 10/10",
        isNew: false,
        inStock: false
    },

    //SHORT CARHARTT - PUBLICADO
    {
        id: "bermuda-carhartt",
        name: "Bermuda Carhartt",
        category: "Pantalones",
        price: 40000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-CARHARTT/SHORT-CARHARTT-4.jpg"
        ],
        description: "Bermuda carpintero de jean bastante rigido, cuenta con varios bolsillos y un material super resistente, tag de cuero.\nTalle 40us(50AR): 60cm de cintura por 56cm de largo.\nEstado: 10/10.",
        isNew: false,
        inStock: true
    },

    //BUZO VERDE REAL TREE - PUBLICADO
    {
        id: "buzo-real-tree",
        name: "Buzo Real-Tree",
        category: "Abrigos",
        price: 25000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REALTREE-MANGALARGA-VERDE/REAL-TREE-MANGAS-LARGAS-2.jpg"
        ],
        description: "Crewneck de algodón con logo en el frente, bastante liviano de media estación. Sin capucha.\nTalle L: 68cm de largo x 60cm de ancho.\nEstado: 9/10 tiene un leve desgaste general.",
        isNew: false,
        inStock: true
    },

    //REMERA ADIDAS MC NARANJA - PUBLICADA - NUEVO
    {
        id: "remera-adidas-mc-naranja",
        name: "Remera Adidas",
        category: "Remeras",
        price: 20000,
        originalPrice: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-ADIDAS-MC-NARANJA/REMERA-ADIDAS-MC-NARANJA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-ADIDAS-MC-NARANJA/REMERA-ADIDAS-MC-NARANJA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-ADIDAS-MC-NARANJA/REMERA-ADIDAS-MC-NARANJA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/REMERA-ADIDAS-MC-NARANJA/REMERA-ADIDAS-MC-NARANJA-3.jpg"
        ],
        description: "Remera de algodon con estampado original en su torso, no tiene desgastes en el estampado pero si un poco en la tela, detalles\nTalle: L\nEstado: 9/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //WRANGLER WORKWEAR CARPENTER - NO PUBLICADA
    {
        id: "wrangler-workwear-carpenter",
        name: "Wrangler Workwear Carpenter",
        category: "Pantalones",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/WRANGLER-WORKWEAR/WRANGLER-WORKWEAR-6.jpg"
        ],
        description: "Carpintero tipo workwear, prenda creada para resistir esfuerzos duros en trabajos que requieren prendas resistentes y de buena calidad, duraderas. Color original tiene algunos bolsillos extras y tiras carpinteras para colgar herramientas\nTalle: 40us\nCintura: 50cm\nLargo: 112cm\nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },


/*-------------------------------------------------------------------------

    //REMERA VINTAGE MAC DEMARCO - NO PUBLICADA
    {
        id: "remera-vintage",
        name: "Remera Vintage",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: 
        images: [

        ],
        description: "Remera vintage de algodon con estampado, sin manchas ni roturas.\nTalle: L\nCintura: \nLargo: \nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERAS NAUTICA X2 ROJAS - PUBLICADO
    {
        id: "remeras-nautica-x2",
        name: "Nautica X2",
        category: "Remeras",
        price: 50000,
        originalPrice: null,
        badge: null,
        image: "assets/images/Productos/Remeras-Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-5.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/NAUTICA-ROJAS-X2/NAUTICAS-ROJA-1.jpg"
        ],
        description: "Remeras Nautica color rojo. Se venden juntas o separadas.\nAmbas talle: M\n$25.000 c/u\nEstado: 10/10",
        isNew: false,
        inStock: true
    },

    //REMERA CHAPS - NO PUBLICADA
    {
        id: "remera-chaps",
        name: "Remera Chaps",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: 
        images: [

        ],
        description: "Remera tipo polo original, cuenta con su logo bordado en el pecho y un corte americano, a estrenar!\nTalle: XL\nCintura: \nLargo: \nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CHOMBA LACOSTE - NO PUBLICADA
    {
        id: "chomba-lacoste",
        name: "Chomba Lacoste",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: 
        images: [

        ],
        description: "Chomba mangas largas vintage original. Color salmon intacto muy clasico de hace unos años.\nTalle: XL\nCintura: \nLargo: \nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //JEAN CARPENTER - NO PUBLICADA
    {
        id: "jean-carpenter",
        name: "Jean Carpenter",
        category: "Pantalones",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: 
        images: [

        ],
        description: "Carpintero de jean con un material muy resistente, pesado con bolsillos carpinteros, tag de cuero y color intacto.\nTalle: 36us\nCintura: \nLargo: \nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //SHORT DICKIES GRIS - NO PUBLICADO
    {
        id: "bermuda-dickies-gris",
        name: "Bermuda Dickies",
        category: "Pantalones",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Shorts/JEAN-DICKIES-GRIS/SHORT-JEAN-DICKIES-GENUINE-6.jpg"
        ],
        description: "Bermuda de jean gris dickies genuine, bolsillos extras por si fin workwear, material super resistente no tiene detalles ni desgastes\nTalle: 44us\n54 de cintura\n70 de largo\nEstado: 10/10.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    },

    //CAMISETA ALEMANIA - NO PUBLICADA
    {
        id: "camiseta-alemania",
        name: "Camiseta Alemania",
        category: "Camisetas",
        price: 0,
        originalPrice: null,
        badge: "PRÓXIMAMENTE",
        image: "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-ALEMANIA/CAMISETA-ALEMANIA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-ALEMANIA/CAMISETA-ALEMANIA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-ALEMANIA/CAMISETA-ALEMANIA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-ALEMANIA/CAMISETA-ALEMANIA-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-ALEMANIA/CAMISETA-ALEMANIA-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Camisetas/CAMISETA-ALEMANIA/CAMISETA-ALEMANIA-6.jpg"
        ],
        description: "Muy pronto en Only ZS.",
        isNew: false,
        inStock: false,
        isComingSoon: true // <- Propiedad clave para bloquear la tarjeta
    }
*/
/*----------------------------VENDIDOS---------------------------------------*/

    //CARHARTT CARPENTER JEAN - PUBLICADA
    {
        id: "carhartt-carpenter-jean",
        name: "Carhartt Carpenter Jean",
        category: "Pantalones",
        price: null,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/CARHARTT-CARPENTER/CARHARTT-CARPENTER-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/CARHARTT-CARPENTER/CARHARTT-CARPENTER-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/CARHARTT-CARPENTER/CARHARTT-CARPENTER-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/CARHARTT-CARPENTER/CARHARTT-CARPENTER-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/CARHARTT-CARPENTER/CARHARTT-CARPENTER-4.jpg"
        ],
        description: "Jean carpintero rigido, de materiales bastante resistentes a trabajos y esfuerzos duros, tag de cuero en la parte de atras y color sin desgastes ni detalles, talle bastante pedido/buscado mas en estas condiciones.\nTalle: 36us\nCintura: 46cm\nLargo: 114cm\nEstado: 10/10.",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //BUZO NIKE MARRON - PUBLICADO - VENDIDO
    {
        id: "buzo-nike-capucha",
        name: "Buzo Nike Center Swoosh",
        category: "Abrigos",
        price: 95000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Abrigos/Buzos/BUZO-NIKE-C-CAPUCHA/BUZO-NIKE-C-CAPUCHA-1.jpg",
        images: [
            "assets/images/Productos/Abrigos/Buzos/BUZO-NIKE-C-CAPUCHA/BUZO-NIKE-C-CAPUCHA-1.jpg",
            "assets/images/Productos/Abrigos/Buzos/BUZO-NIKE-C-CAPUCHA/BUZO-NIKE-C-CAPUCHA-2.jpg",
            "assets/images/Productos/Abrigos/Buzos/BUZO-NIKE-C-CAPUCHA/BUZO-NIKE-C-CAPUCHA-3.jpg",
            "assets/images/Productos/Abrigos/Buzos/BUZO-NIKE-C-CAPUCHA/BUZO-NIKE-C-CAPUCHA-4.jpg"
        ],
        description: "Buzo nike de material tipo felpa color marron. Original con etiquetas.\nTalle: M pero va para L/XL\nMedidas: 70x64\nEstado: 10/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //REMERA GILDAN BROCKPORT ML - PUBLICADA - VENDIDA
    {
        id: "remera-gildan-brockport-ml",
        name: "Remera Gildan Brockport ML",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Remeras/GILDAN-BROCKPORT-ML/GILDAN-BROCKPORT-ML-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Remeras/GILDAN-BROCKPORT-ML/GILDAN-BROCKPORT-ML-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/GILDAN-BROCKPORT-ML/GILDAN-BROCKPORT-ML-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Remeras/GILDAN-BROCKPORT-ML/GILDAN-BROCKPORT-ML-3.jpg"
        ],
        description: "Remera Gildan Brockport mangalarga\nTalle: L\nEstado: 10/10",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //PASAMONTAÑAS REAL TREE - PUBLICADO - VENDIDO
    {
        id: "pasamontanas-realtree",
        name: "Pasamontañas Real Tree",
        category: "Accesorios",
        price: 55000,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Accesorios/Pasamontanas/REAL-TREE/PASAMONTANAS-REALTREE-1.jpg",
        images: [
            "assets/images/Productos/Accesorios/Pasamontanas/REAL-TREE/PASAMONTANAS-REALTREE-1.jpg",
            "assets/images/Productos/Accesorios/Pasamontanas/REAL-TREE/PASAMONTANAS-REALTREE-2.jpg",
            "assets/images/Productos/Accesorios/Pasamontanas/REAL-TREE/PASAMONTANAS-REALTREE-3.jpg"
        ],
        description: "Balaclava liviano camuflado (sin desgaste)\nTalle: Unico AC (Apto Cabezones)\nEstado: 9.5/10.",
        isNew: true,
        inStock: true,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //PANTALON LACOSTE-CORDEROY - PUBLICADO VENDIDO
    {
        id: "lacoste-corderoy",
        name: "Lacoste Corderoy",
        category: "Pantalones",
        price: 35000,
        originalPrice: null,
        image: "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-1.jpg",
        images: [
            "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-1.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-2.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-3.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-4.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-5.jpg",
            "assets/images/Productos/Pantalones-Shorts/Pantalones/LACOSTE-CORDEROY/PANTALON-LACOSTE-CORDEROY-CRUDO-6.jpg"
        ],
        description: "Pantalon tipo corderoy abrigado original, posee detalle metalico sobre uno de sus bolsillos, cuenta con sus botones respectivos y libre de detalles y manchas, color crudo no blanco.\nTalle: 38us\n48 de Cintura\n108 de largo\nEstado: 10/10.",
        isNew: true,
        inStock: true,
    },

    //CHOMBA POLO AZUL LISA - PUBLICADO - VENDIDA
    {
        id: "chomba-polo-azul-lisa",
        name: "Chomba Polo Azul Lisa",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-AZUL-LISA/CHOMBA-POLO-AZUL-LISA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-AZUL-LISA/CHOMBA-POLO-AZUL-LISA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-AZUL-LISA/CHOMBA-POLO-AZUL-LISA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-AZUL-LISA/CHOMBA-POLO-AZUL-LISA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-AZUL-LISA/CHOMBA-POLO-AZUL-LISA-4.jpg"
        ],
        description: "Chomba polo azul pique.\nTalle: L\nMedidas: 75 atras x 68 adelante x 60 de ancho.\nEstado: 9.5/10",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },



        //CHOMBA POLO GOLF AZUL A RAYAS - PUBLICADO - NUEVO
    {
        id: "chomba-polo-golf-rayas",
        name: "Chomba Polo Golf Rayada",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-RAYADA/CHOMBA-POLO-RAYADA-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-RAYADA/CHOMBA-POLO-RAYADA-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-RAYADA/CHOMBA-POLO-RAYADA-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-RAYADA/CHOMBA-POLO-RAYADA-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-POLO-RAYADA/CHOMBA-POLO-RAYADA-4.jpg"
        ],
        description: "Chomba polo golf rayada.\nTalle: XL\nMedidas: 80 atras x 73 adelante x 60 de ancho.\nEstado: 9/10",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

        //CHOMBA POLO VERDE MANGA LARGA - PUBLICADO - NUEVO
    {
        id: "chomba-polo-verda-ml",
        name: "Chomba Polo Manga Larga Verde",
        category: "Remeras",
        price: 0,
        originalPrice: null,
        badge: "NUEVO",
        image: "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-1.jpg",
        images: [
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-1.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-2.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-3.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-4.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-5.jpg",
            "assets/images/Productos/Remeras-Chombas/Chombas/CHOMBA-VERDE-ML/CHOMBA-VERDE-ML-6.jpg"
        ],
        description: "Chomba polo verde pique manga larga.\nTalle: XL\nMedidas: 80 atras x 75 adelante x 60 de ancho. 65cm de manga\nEstado: 10/10",
        isNew: true,
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

];


/*--------------------------------------------------------------------------*/


    //GALERIA ZS

const communityGalleryData = [
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-1.jpg",
        alt: "Galería ZS foto 1"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-2.jpg",
        alt: "Galería ZS foto 2"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-3.jpg",
        alt: "Galería ZS foto 3"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-4.jpg",
        alt: "Galería ZS foto 4"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-5.jpg",
        alt: "Galería ZS foto 5"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-6.jpg",
        alt: "Galería ZS foto 6"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-7.jpg",
        alt: "Galería ZS foto 7"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-8.jpg",
        alt: "Galería ZS foto 8"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-9.jpg",
        alt: "Galería ZS foto 9"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-10.jpg",
        alt: "Galería ZS foto 10"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-11.jpg",
        alt: "Galería ZS foto 11"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-12.jpg",
        alt: "Galería ZS foto 12"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-13.jpg",
        alt: "Galería ZS foto 13"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-14.jpg",
        alt: "Galería ZS foto 14"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-15.jpg",
        alt: "Galería ZS foto 15"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-16.jpg",
        alt: "Galería ZS foto 16"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-17.jpg",
        alt: "Galería ZS foto 17"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-18.jpg",
        alt: "Galería ZS foto 18"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-19.jpg",
        alt: "Galería ZS foto 19"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-20.jpg",
        alt: "Galería ZS foto 20"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-21.jpg",
        alt: "Galería ZS foto 21"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-22.jpg",
        alt: "Galería ZS foto 22"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-23.jpg",
        alt: "Galería ZS foto 23"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-24.jpg",
        alt: "Galería ZS foto 24"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-25.jpg",
        alt: "Galería ZS foto 25"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-26.jpg",
        alt: "Galería ZS foto 26"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-27.jpg",
        alt: "Galería ZS foto 27"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-28.jpg",
        alt: "Galería ZS foto 28"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-29.jpg",
        alt: "Galería ZS foto 29"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-30.jpg",
        alt: "Galería ZS foto 30"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-31.jpg",
        alt: "Galería ZS foto 31"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-32.jpg",
        alt: "Galería ZS foto 32"
    },
    {
        src: "assets/images/Galeria-ZS/GALERIA-ZS-33.jpg",
        alt: "Galería ZS foto 33"
    }
];


/*---------------------------------------------------------------------*/


    //COLLABORATIONS

const collaborationsData = [

    //CULTO A LAS CALLES
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
        heroImage: "assets/images/Brand/Culto-A-Las-Calles/HERO-CULTO-A-LAS-CALLES.jpg",
        gallery: [
            "assets/images/Brand/Culto-A-Las-Calles/CULTO-A-LAS-CALLES-1.jpg",
            "assets/images/Brand/Culto-A-Las-Calles/CULTO-A-LAS-CALLES-2.jpg",
            "assets/images/Brand/Culto-A-Las-Calles/CULTO-A-LAS-CALLES-3.jpg",
            "assets/images/Brand/Culto-A-Las-Calles/CULTO-A-LAS-CALLES-4.jpg"
        ]
    },

    //DEEP INDUMENTARIA
    {
        key: "Deep-Indumentaria",
        title: "Deep Indumentaria",
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
