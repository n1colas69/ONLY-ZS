/* =========================================================
   ONLY ZS — data.js
   Datos de productos y galería
========================================================= */

    //PRODUCTOS

const productsData = [

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

    //PASAMONTAÑAS REAL TREE - PUBLICADO - NUEVO
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

    //CAMPERA L.L. BEAN - PUBLICADA - NUEVO - VENDIDO
    {
        id: "campera-ll-bean",
        name: "Campera L.L. Bean",
        category: "Abrigos",
        price: null,
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
        inStock: false,
        isComingSoon: false // <- Propiedad clave para bloquear la tarjeta
    },

    //MUSCULOSA NIKE GRIS - PUBLICADA - NUEVO
    {
        id: "musculosa-nike-gris",
        name: "Musculosa Nike Gris",
        category: "Pantalones",
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

        //MUSCULOSA NIKE GRIS - PUBLICADA - NUEVO
    {
        id: "camiseta-nike-boca",
        name: "Camiseta Boca Juniors 07/08",
        category: "Remeras",
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

    //CHOMBA NAUTICA AZUL - PUBLICADA - NUEVA
    {
        id: "chomba-nautica-azul",
        name: "Chomba Nautica Azul",
        category: "Remeras",
        price: 25000,
        originalPrice: null,
        badge: "NUEVA",
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

    //PANTALON LACOSTE-CORDEROY - PUBLICADO NUEVO
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

    //REMERA RUSSELL CHAMPIONS 2014 - PUBLICADO
    {
        id: "remera-russell-champions-2014",
        name: "Remera Russell Champions 2014",
        category: "Remeras",
        price: 20000,
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
        inStock: true
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


/*-------------------------------------------------------------------------*/


    //SHORT DICKIES GRIS - NO PUBLICADO
    {
        id: "bermuda-dickies-gris",
        name: "Bermuda Dickies",
        category: "Pantalones",
        price: 0,
        originalPrice: null,
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
