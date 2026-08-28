﻿﻿﻿﻿﻿﻿﻿/* =========================================================
   ONLY ZS — app.js
   Inicialización principal de la aplicación
========================================================= */

// Estado global
let cart = JSON.parse(localStorage.getItem('zs_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('zs_wishlist')) || [];
let currentProductModal = null;
let currentProductPhoto = 0;
let currentGalleryPhoto = 0;

// Migración automática: convertimos IDs viejos a strings para no perder carritos previos
cart.forEach(item => item.id = String(item.id));
wishlist = wishlist.map(String);

// Configuración de Colaboraciones
const upcomingCollaborationAvailable = false; // Cambiar a true cuando una colaboración esté disponible


// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // PWA: Registro del Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW Falló:', err));
    }

    // Render inicial
    renderProducts(productsData);
    updateCounters();
    renderCart();
    renderWishlist();
    
    // Setup de componentes
    setupObservers();
    initFooterLinks();
    setupProductModal();
    setupCheckout();
    setupCommunityGallery();
    initCollaborationLock();
    
    // Setup de UI
    initUI();
    initCheckoutBtn();

    if (window.location.hash === '#products') {
        setProductsPanelOpen(true);
    }

    // Abrir producto específico desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('producto');
    if (productoId) {
        setProductsPanelOpen(true);
        setTimeout(() => openProductModal(productoId), 400); // Dar un poco de tiempo para cargar todo el UI
    }

    // 1. Persistencia Inteligente de Favoritos
    if (wishlist.length > 0) {
        const wishBtn = document.getElementById('wishlistBtn');
        if (wishBtn) {
            wishBtn.classList.add('pulse-animation');
            wishBtn.addEventListener('click', () => wishBtn.classList.remove('pulse-animation'), { once: true });
        }
    }

    // 2. Filtros Avanzados y Ordenamiento
    const filterContainer = document.querySelector('.filter-btn')?.parentElement;
    if (filterContainer && !document.querySelector('.filter-btn[data-filter="all"]')) {
        const resetFilterBtn = document.createElement('button');
        resetFilterBtn.className = 'filter-btn';
        resetFilterBtn.dataset.filter = 'all';
        resetFilterBtn.innerText = 'Quitar filtro';
        resetFilterBtn.onclick = () => filterByCategory('all');
        filterContainer.appendChild(resetFilterBtn);
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            let filtered = [...productsData];
            const activeFilter = document.querySelector('.filter-btn.active[data-filter]');
            if (activeFilter && activeFilter.dataset.filter !== 'all') {
                filtered = filtered.filter(p => p.category === activeFilter.dataset.filter);
            }
            
            if (val === 'price-asc' || val === 'price-desc' || val === 'newest') {
                filtered = filtered.filter(p => !p.isComingSoon);
            }
            
            if (val === 'price-asc') filtered.sort((a,b) => a.price - b.price);
            else if (val === 'price-desc') filtered.sort((a,b) => b.price - a.price);
            else if (val === 'newest') filtered.sort((a,b) => productsData.indexOf(a) - productsData.indexOf(b)); // Ordena según la posición en la lista (los de arriba primero)
            
            if (typeof renderProducts === 'function') renderProducts(filtered);
        });
    }

    // 3. Búsqueda predictiva con imágenes (index.html)
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('indexSearchResults');
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.trim().toLowerCase();
            searchResults.innerHTML = '';
            if (!term) return;
            
            const matches = productsData.filter(item => 
                !item.isComingSoon && `${item.name} ${item.category}`.toLowerCase().includes(term)
            ).slice(0, 6);
            
            searchResults.innerHTML = matches.length ? matches.map(item => `
                <a class="brand-search-result" href="javascript:void(0)" onclick="document.getElementById('searchOverlay').classList.remove('active'); openProductModal('${item.id}')">
                    <img src="${getOptimizedImage(item.image, 'sm')}"${getImageFallbackAttr(item.image)} alt="${item.name}" loading="lazy" decoding="async" width="50" height="50">
                    <span><strong>${item.name}</strong><span>${item.category} &middot; $${item.price}</span></span>
                </a>
            `).join('') : '<p style="color:rgba(255,255,255,0.6);font-size:0.9rem;">No hay resultados.</p>';
        });
    }

    // 4. Hover de Segunda Imagen (Observer)
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('.product-card:not(.enhanced)').forEach(card => {
                card.classList.add('enhanced');
                const id = card.getAttribute('data-id');
                const product = productsData.find(p => String(p.id) === String(id));
                if (product) {
                    const imgContainer = card.querySelector('.product-image-wrap') || card.querySelector('.product-image-container') || card.querySelector('.product-img') || card;
                    imgContainer.style.position = 'relative';
                    
                    if (product.images && product.images.length > 1 && !product.isComingSoon) {
                        const hoverImg = document.createElement('img');
                        hoverImg.src = getOptimizedImage(product.images[1], 'sm');
                        hoverImg.setAttribute('data-fallback-src', product.images[1]);
                        hoverImg.className = 'hover-img';
                        hoverImg.loading = 'lazy';
                        
                        const wishlistBtn = imgContainer.querySelector('.wishlist-icon');
                        if (wishlistBtn) {
                            imgContainer.insertBefore(hoverImg, wishlistBtn);
                        } else {
                            imgContainer.appendChild(hoverImg);
                        }
                    }
                }
            });
        });
        observer.observe(productsGrid, { childList: true, subtree: true });
    }

    // 5. Swipe-to-Close en Drawers
    const setupSwipeToClose = (drawerId, closeBtnId) => {
        const drawer = document.getElementById(drawerId);
        if (!drawer) return;
        let startX = 0;
        drawer.addEventListener('touchstart', e => startX = e.changedTouches[0].clientX, { passive: true });
        drawer.addEventListener('touchend', e => {
            let endX = e.changedTouches[0].clientX;
            if (endX - startX > 80) document.getElementById(closeBtnId)?.click();
        }, { passive: true });
    };
    setupSwipeToClose('cartDrawer', 'closeCart');
    setupSwipeToClose('wishlistDrawer', 'closeWishlist');

    // 6. Toasts Interactivos & Estados Vacíos Ilustrados (MutationObserver)
    const bodyObserver = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            // Toasts Interactivos
            if (m.addedNodes.length && m.target.id === 'toast-container') {
                m.addedNodes.forEach(toast => {
                    const text = toast.innerText?.toLowerCase() || '';
                    if (text.includes('agregado') && !toast.querySelector('.toast-view-cart')) {
                        const btn = document.createElement('button');
                        btn.className = 'toast-view-cart';
                        if (text.includes('favorito')) {
                            btn.innerHTML = 'VER FAVORITOS <i class="fas fa-arrow-right"></i>';
                            btn.onclick = () => document.getElementById('wishlistBtn')?.click();
                        } else {
                            btn.innerHTML = 'VER CARRITO <i class="fas fa-arrow-right"></i>';
                            btn.onclick = () => document.getElementById('cartBtn')?.click();
                        }
                        toast.appendChild(btn);
                    }
                });
            }
            // Estados vacíos (Carrito)
            if (m.target.id === 'cartItems' && m.target.children.length === 0 && !m.target.querySelector('.empty-state-container')) {
                m.target.innerHTML = `<div class="empty-state-container"><img src="assets/images/ONLY-ZS-LOGO.png" alt="Vacío"><h4>Tu carrito está vacío</h4><p>¡Explorá nuestro catálogo y sumá prendas únicas!</p><button class="btn btn-primary btn-sm" onclick="document.getElementById('closeCart').click()">IR A COMPRAR</button></div>`;
            }
            // Estados vacíos (Favoritos)
            if (m.target.id === 'wishlistItems' && m.target.children.length === 0 && !m.target.querySelector('.empty-state-container')) {
                m.target.innerHTML = `<div class="empty-state-container"><img src="assets/images/ONLY-ZS-LOGO.png" alt="Vacío"><h4>No hay favoritos</h4><p>Guardá las piezas que más te gusten para no perderlas.</p><button class="btn btn-primary btn-sm" onclick="document.getElementById('closeWishlist').click()">VER PRODUCTOS</button></div>`;
            }
        });
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // 7. Paginación / Cargar Más
    let currentItemsShown = 12;
    const updateLoadMore = () => {
        const grid = document.getElementById('productsGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const container = document.getElementById('loadMoreContainer');
        if (!grid || !loadMoreBtn || !container) return;
        
        const cards = Array.from(grid.children);
        
        // Asegurar que el botón tenga los estilos principales de la página
        loadMoreBtn.classList.add('btn', 'btn-primary');
        
        cards.forEach((card, index) => {
            if (index >= currentItemsShown) card.classList.add('product-hidden');
            else card.classList.remove('product-hidden');
        });
        
        container.style.display = cards.length > currentItemsShown ? 'flex' : 'none';
        container.style.justifyContent = 'center';
    };
    
    document.getElementById('loadMoreBtn')?.addEventListener('click', () => { currentItemsShown += 12; updateLoadMore(); });
    
    const originalRender = typeof renderProducts === 'function' ? renderProducts : null;
    if (originalRender) { window.renderProducts = function(data) { currentItemsShown = 12; originalRender(data); updateLoadMore(); }; }
    
    updateLoadMore();
});

// Función para bloquear/desbloquear la próxima colaboración
function initCollaborationLock() {
    const placeholderLink = document.querySelector('.brand-item-placeholder');
    if (!placeholderLink) return;
    
    if (upcomingCollaborationAvailable) {
        placeholderLink.classList.add('available');
        placeholderLink.style.pointerEvents = 'auto';
        placeholderLink.style.opacity = '1';
    } else {
        placeholderLink.classList.remove('available');
        placeholderLink.style.pointerEvents = 'none';
        placeholderLink.style.opacity = '0.4';
        placeholderLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showToast('Esta colaboración aún no está disponible');
        });
    }
}
