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
