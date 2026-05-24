/* =========================================================
   ONLY ZS — ui.js
   Interacciones de UI, drawers y búsqueda
========================================================= */

function initUI() {
    // Carrito
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer  = document.getElementById('cartDrawer');
    document.getElementById('cartBtn').addEventListener('click', () => {
        cartOverlay.classList.add('active');
        cartDrawer.classList.add('active');
    });
    window.closeCartUI = () => {
        cartOverlay.classList.remove('active');
        cartDrawer.classList.remove('active');
    };
    document.getElementById('closeCart').addEventListener('click', closeCartUI);
    cartOverlay.addEventListener('click', closeCartUI);

    // Wishlist
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    const wishlistDrawer  = document.getElementById('wishlistDrawer');
    document.getElementById('wishlistBtn').addEventListener('click', () => {
        wishlistOverlay.classList.add('active');
        wishlistDrawer.classList.add('active');
    });
    const closeWishlistUI = () => {
        wishlistOverlay.classList.remove('active');
        wishlistDrawer.classList.remove('active');
    };
    document.getElementById('closeWishlist').addEventListener('click', closeWishlistUI);
    wishlistOverlay.addEventListener('click', closeWishlistUI);

    // Buscador
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput   = document.getElementById('searchInput');
    document.getElementById('searchBtn').addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
    const closeSearchUI = () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        renderProducts(productsData);
    };
    document.getElementById('closeSearch').addEventListener('click', closeSearchUI);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeSearchUI(); closeCartUI(); closeWishlistUI(); }
    });
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = productsData.filter(p =>
            p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
        );
        setProductsPanelOpen(true);
        renderProducts(filtered);
        document.getElementById('products').scrollIntoView();
    });

    const productsToggle = document.getElementById('productsToggle');
    if (productsToggle) {
        productsToggle.addEventListener('click', () => {
            const isOpen = productsToggle.getAttribute('aria-expanded') === 'true';
            setProductsPanelOpen(!isOpen);
        });
    }
    document.querySelectorAll('a[href="#products"], a[href="index.html#products"]').forEach(link => {
        link.addEventListener('click', () => setProductsPanelOpen(true));
    });

    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.getAttribute('data-filter');
            const filtered = cat === 'all' ? productsData : productsData.filter(p => p.category === cat);
            const grid = document.getElementById('productsGrid');
            grid.style.opacity = 0;
            setTimeout(() => { renderProducts(filtered); grid.style.opacity = 1; }, 300);
        });
    });

    // Menú Mobile
    document.getElementById('hamburgerBtn').addEventListener('click', () => {
        document.getElementById('mobileNav').classList.toggle('active');
    });
    document.getElementById('mobileNavClose')?.addEventListener('click', () => {
        document.getElementById('mobileNav').classList.remove('active');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('active'));
    });

    // Categorías
    document.querySelectorAll('.category-card').forEach(card => {
        const btn = card.querySelector('.btn');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterByCategory(card.getAttribute('data-category'));
        });
        card.addEventListener('click', () => filterByCategory(card.getAttribute('data-category')));
    });
}

function initFooterLinks() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose   = document.getElementById('modalClose');
    const infos = {
        linkContacto: {
            title: 'Info',
            body: `
                <p>¡Hola! Somos Only ZS, un emprendimiento de ropa vintage y de segunda mano con sede en La Rioja, Argentina.</p>
                <p>Por favor, tenga en cuenta que los artículos de segunda mano pueden venir con leves defectos. Vintage no significa perfecto. Si quieres artículos perfectos compra nuevos.</p>
                <p>3804 15-1730</p>
            `
        },
        linkEnvios: {
            title: 'ENVÍOS Y ENTREGAS',
            body: `
                <p>Realizamos envíos a todo el país a través de correo privado.</p>
                <p>El costo de envío se calcula al momento del pago según tu ubicación.</p>
            `
        },
        linkDevoluciones: {
            title: 'CAMBIOS Y DEVOLUCIONES',
            body: `
                <p>Los cambios o devoluciones se gestionan previo contacto por WhatsApp con nuestro equipo.</p>
                <p>Por favor envíanos el número de pedido y una breve descripción del problema para que podamos ayudarte rápidamente.</p>
            `
        },
        linkFaq: {
            title: 'PREGUNTAS FRECUENTES',
            body: `
                <p><strong>¿Las prendas están lavadas?</strong><br>Sí, todas pasan por un proceso de lavado y desinfección antes de ser publicadas.</p>
                <p><strong>¿Puedo ver la prenda en persona?</strong><br>Podés coordinar un encuentro en La Rioja. Contactanos por WhatsApp.</p>
                <p><strong>¿Cómo pago?</strong><br>Aceptamos transferencia bancaria, MercadoPago, efectivo en persona, Visa y Mastercard.</p>
                <p><strong>¿Las prendas son originales?</strong><br>Sí. Cada pieza es cuidadosamente verificada antes de publicarse.</p>
            `
        }

    };
    Object.keys(infos).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('modalTitle').innerText = infos[id].title;
            document.getElementById('modalBody').innerHTML  = infos[id].body;
            modalOverlay.classList.add('active');
        });
    });
    const closeModal = () => modalOverlay.classList.remove('active');
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
}

/* Newsletter removed: initNewsletter() deleted to disable subscription form handling */

function initCheckoutBtn() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!checkoutBtn) return;
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) { showToast("Tu carrito está vacío"); return; }
        openCheckoutModal();
    });
}
