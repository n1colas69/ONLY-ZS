/* =========================================================
   ONLY ZS — app.js
   Inicialización principal de la aplicación
========================================================= */

// Estado global
let cart = JSON.parse(localStorage.getItem('zs_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('zs_wishlist')) || [];
let currentProductModal = null;
let currentProductPhoto = 0;
let currentGalleryPhoto = 0;

// Configuración de Colaboraciones
const upcomingCollaborationAvailable = false; // Cambiar a true cuando una colaboración esté disponible

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
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

    // 1. Persistencia Inteligente de Favoritos
    if (wishlist.length > 0) {
        const wishBtn = document.getElementById('wishlistBtn');
        if (wishBtn) {
            wishBtn.classList.add('pulse-animation');
            wishBtn.addEventListener('click', () => wishBtn.classList.remove('pulse-animation'), { once: true });
        }
    }

    // 2. Filtros Avanzados y Ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            let filtered = [...productsData];
            const activeFilter = document.querySelector('.filter-btn.active[data-filter]');
            if (activeFilter && activeFilter.dataset.filter !== 'all') {
                filtered = filtered.filter(p => p.category === activeFilter.dataset.filter);
            }
            
            if (val === 'price-asc') filtered.sort((a,b) => a.price - b.price);
            else if (val === 'price-desc') filtered.sort((a,b) => b.price - a.price);
            else if (val === 'newest') filtered.sort((a,b) => b.id - a.id);
            
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
                `${item.name} ${item.category}`.toLowerCase().includes(term)
            ).slice(0, 6);
            
            searchResults.innerHTML = matches.length ? matches.map(item => `
                <a class="brand-search-result" href="javascript:void(0)" onclick="document.getElementById('searchOverlay').classList.remove('active'); openProductModal(${item.id})">
                    <img src="${getOptimizedImage(item.image, 'sm')}"${getImageFallbackAttr(item.image)} alt="${item.name}" loading="lazy" decoding="async" width="50" height="50">
                    <span><strong>${item.name}</strong><span>${item.category} &middot; $${item.price}</span></span>
                </a>
            `).join('') : '<p style="color:rgba(255,255,255,0.6);font-size:0.9rem;">No hay resultados.</p>';
        });
    }

    // 4. Hover de Segunda Imagen y Etiqueta Pieza Única (Observer)
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('.product-card:not(.enhanced)').forEach(card => {
                card.classList.add('enhanced');
                const id = parseInt(card.getAttribute('data-id'));
                const product = productsData.find(p => p.id === id);
                if (product) {
                    const imgContainer = card.querySelector('.product-image-container') || card.querySelector('.product-img') || card;
                    imgContainer.style.position = 'relative';
                    
                    if (product.images && product.images.length > 1) {
                        const hoverImg = document.createElement('img');
                        hoverImg.src = product.images[1]; // Requiere misma ruta relativa
                        hoverImg.className = 'hover-img';
                        hoverImg.loading = 'lazy';
                        imgContainer.appendChild(hoverImg);
                    }
                    
                    if (product.inStock) { // Asume que todos en stock son únicas
                        const badge = document.createElement('span');
                        badge.className = 'badge unique-badge';
                        badge.innerText = 'PIEZA ÚNICA';
                        card.appendChild(badge);
                    }
                }
            });
        });
        observer.observe(productsGrid, { childList: true, subtree: true });
    }
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
