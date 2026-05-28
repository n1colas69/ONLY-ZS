/* =========================================================
   ONLY ZS — modals.js
   Modales de productos y checkout
========================================================= */

function openProductModal(productId) {
    currentProductModal = productId;
    currentProductPhoto = 0;
    updateProductModal();
    document.getElementById('productModalOverlay').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModalOverlay').classList.remove('active');
    currentProductModal = null;
    currentProductPhoto = 0;
}

function updateProductModal() {
    const product = productsData.find(p => p.id === currentProductModal);
    if (!product) return;

    const photos = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
    if (currentProductPhoto >= photos.length) currentProductPhoto = photos.length - 1;
    if (currentProductPhoto < 0) currentProductPhoto = 0;

    const isWishlisted = wishlist.includes(product.id);
    const priceHTML = product.originalPrice
        ? `<span class="price-current">${formatMoney(product.price)}</span> <span class="price-old">${formatMoney(product.originalPrice)}</span>`
        : `<span class="price-current">${formatMoney(product.price)}</span>`;

    // Update modal content
    const modalImage = document.getElementById('productModalImage');
    modalImage.classList.remove('image-enter');
    void modalImage.offsetWidth;
    modalImage.src = getOptimizedImage(photos[currentProductPhoto], 'lg');
    modalImage.dataset.fallbackSrc = photos[currentProductPhoto];
    modalImage.alt = product.name;
    modalImage.decoding = 'async';
    modalImage.classList.add('image-enter');
    document.getElementById('productModalCategory').innerText = product.category;
    document.getElementById('productModalName').innerText = product.name;
    document.getElementById('productModalPrices').innerHTML = priceHTML;
    document.getElementById('productModalStock').innerText = product.inStock ? '✓ En stock' : '✗ Agotado';
    document.getElementById('productModalStock').classList.toggle('out-of-stock', !product.inStock);
    document.getElementById('productModalDescription').innerText = product.description || 'Descripción no disponible.';

    renderProductThumbs(photos, currentProductPhoto);

    // Update wishlist button
    const wishlistBtn = document.getElementById('productModalWishlist');
    const icon = wishlistBtn.querySelector('i');
    if (isWishlisted) {
        icon.classList.replace('far', 'fas');
        wishlistBtn.classList.add('active');
    } else {
        icon.classList.replace('fas', 'far');
        wishlistBtn.classList.remove('active');
    }

    // Update add to cart button
    const addBtn = document.getElementById('productModalAddBtn');
    if (product.inStock) {
        addBtn.disabled = false;
        addBtn.style.background = '';
        addBtn.innerText = 'AGREGAR AL CARRITO';
    } else {
        addBtn.disabled = true;
        addBtn.style.background = '#777';
        addBtn.innerText = 'AGOTADO';
    }

    // Update navigation buttons
    const currentIndex = productsData.findIndex(p => p.id === currentProductModal);
    document.getElementById('productModalPrev').disabled = currentIndex === 0;
    document.getElementById('productModalNext').disabled = currentIndex === productsData.length - 1;

    const photoPrevBtn = document.getElementById('productPhotoPrev');
    const photoNextBtn = document.getElementById('productPhotoNext');
    if (photos.length > 1) {
        photoPrevBtn.disabled = false;
        photoNextBtn.disabled = false;
        photoPrevBtn.style.display = '';
        photoNextBtn.style.display = '';
    } else {
        photoPrevBtn.style.display = 'none';
        photoNextBtn.style.display = 'none';
    }

    preloadImage(photos[currentProductPhoto - 1], 'lg');
    preloadImage(photos[currentProductPhoto + 1], 'lg');
}

function updateProductPhoto(direction) {
    const product = productsData.find(p => p.id === currentProductModal);
    if (!product) return;
    const photos = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
    let newPhotoIndex = currentProductPhoto + direction;
    
    if (newPhotoIndex >= photos.length) newPhotoIndex = 0;
    if (newPhotoIndex < 0) newPhotoIndex = photos.length - 1;
    
    currentProductPhoto = newPhotoIndex;
    updateProductModal();
}

function setProductPhoto(index) {
    const product = productsData.find(p => p.id === currentProductModal);
    if (!product) return;
    const photos = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
    if (index >= 0 && index < photos.length) {
        currentProductPhoto = index;
        updateProductModal();
    }
}

function renderProductThumbs(photos, activeIndex) {
    const thumbsContainer = document.getElementById('productModalThumbs');
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = photos.map((src, index) => `
        <button class="product-modal-thumb${index === activeIndex ? ' active' : ''}" data-index="${index}" type="button">
            <img src="${getOptimizedImage(src, 'sm')}"${getImageFallbackAttr(src)} alt="Foto ${index + 1}" loading="lazy" decoding="async" width="72" height="72">
        </button>
    `).join('');
}

function navigateProductModal(direction) {
    const currentIndex = productsData.findIndex(p => p.id === currentProductModal);
    let newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < productsData.length) {
        currentProductModal = productsData[newIndex].id;
        currentProductPhoto = 0;
        updateProductModal();
    }
}

function setupProductModal() {
    const overlay = document.getElementById('productModalOverlay');
    const closeBtn = document.getElementById('productModalClose');
    const prevBtn = document.getElementById('productModalPrev');
    const nextBtn = document.getElementById('productModalNext');
    const addBtn = document.getElementById('productModalAddBtn');
    const buyBtn = document.getElementById('productModalBuyBtn');
    const wishlistBtn = document.getElementById('productModalWishlist');
    const photoPrevBtn = document.getElementById('productPhotoPrev');
    const photoNextBtn = document.getElementById('productPhotoNext');
    const thumbsContainer = document.getElementById('productModalThumbs');

    closeBtn.addEventListener('click', closeProductModal);

    // Soporte para Swipe en galería móvil
    const modalImageContainer = document.querySelector('.product-modal-gallery');
    if (modalImageContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        modalImageContainer.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].clientX, {passive: true});
        modalImageContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) updateProductPhoto(1);
            if (touchEndX - touchStartX > 50) updateProductPhoto(-1);
        }, {passive: true});
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeProductModal();
    });

    prevBtn.addEventListener('click', () => navigateProductModal(-1));
    nextBtn.addEventListener('click', () => navigateProductModal(1));

    photoPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); updateProductPhoto(-1); });
    photoNextBtn.addEventListener('click', (e) => { e.stopPropagation(); updateProductPhoto(1); });

    thumbsContainer.addEventListener('click', (e) => {
        const thumb = e.target.closest('.product-modal-thumb');
        if (!thumb) return;
        const index = Number(thumb.dataset.index);
        if (!Number.isNaN(index)) setProductPhoto(index);
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeProductModal();
        if (e.key === 'ArrowLeft') updateProductPhoto(-1);
        if (e.key === 'ArrowRight') updateProductPhoto(1);
    });

    // Lupa (Zoom) de Detalles de Prenda
    const zoomBox = document.querySelector('.product-modal-image');
    if (zoomBox) {
        let isZoomed = false;
        const applyZoom = (e) => {
            const img = document.getElementById('productModalImage');
            const { left, top, width, height } = zoomBox.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(2.5)';
            img.classList.remove('image-enter'); // Evita que la animación de entrada bloquee el zoom
        };
        zoomBox.addEventListener('click', (e) => {
            // Desactivar en móviles para evitar conflictos táctiles y con el gesto de swipe
            if (window.innerWidth <= 768) return;
            isZoomed = !isZoomed;
            if (isZoomed) applyZoom(e);
            else {
                const img = document.getElementById('productModalImage');
                img.style.transformOrigin = 'center center';
                img.style.transform = 'scale(1)';
            }
        });
        zoomBox.addEventListener('mousemove', (e) => {
            if (isZoomed && window.innerWidth > 768) applyZoom(e);
        });
        zoomBox.addEventListener('mouseleave', () => {
            if (window.innerWidth <= 768) return;
            isZoomed = false;
            const img = document.getElementById('productModalImage');
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    }

    addBtn.addEventListener('click', () => {
        if (currentProductModal) {
            addToCart(currentProductModal);
            
            // Microinteracción visual al agregar carrito
            const originalBg = addBtn.style.background;
            addBtn.innerText = '¡AGREGADO ✓!';
            addBtn.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                if (document.getElementById('productModalOverlay').classList.contains('active')) {
                    addBtn.innerText = 'AGREGAR AL CARRITO';
                    addBtn.style.background = originalBg;
                }
            }, 1500);
        }
    });

    buyBtn.addEventListener('click', () => {
        if (currentProductModal) {
            buyNow(currentProductModal);
        }
    });

    wishlistBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentProductModal) {
            const index = wishlist.indexOf(currentProductModal);
            if (index > -1) {
                wishlist.splice(index, 1);
                showToast("Removido de favoritos");
            } else {
                wishlist.push(currentProductModal);
                showToast("✓ Agregado a favoritos");
                bounceIcon('wishlistCount');
            }
            localStorage.setItem('zs_wishlist', JSON.stringify(wishlist));
            updateCounters();
            updateProductModal();
            renderWishlist();
            const activeFilter = document.querySelector('.filter-btn.active');
            const cat = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            renderProducts(cat === 'all' ? productsData : productsData.filter(p => p.category === cat));
        }
    });
}

/* CHECKOUT MODAL */

function openCheckoutModal() {
    renderCheckoutSummary();
    closeCartUI();
    document.getElementById('checkoutModalOverlay').classList.add('active');
    setTimeout(() => document.getElementById('checkoutName').focus(), 100);
}

function closeCheckoutModal() {
    document.getElementById('checkoutModalOverlay').classList.remove('active');
    document.getElementById('checkoutError').innerText = '';
}

function renderCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    const rows = cart.map(item => `
        <div class="checkout-summary-row">
            <span>${item.qty} x ${item.name}</span>
            <strong>${formatMoney(item.price * item.qty)}</strong>
        </div>
    `).join('');

    summary.innerHTML = `
        ${rows}
        <div class="checkout-summary-total">
            <span>Total productos</span>
            <strong>${formatMoney(getCartTotal())}</strong>
        </div>
        <div class="checkout-notice" style="margin-top: 16px;">
            <i class="fas fa-info-circle"></i> El pedido no se reserva hasta confirmar el mensaje por WhatsApp.
        </div>
    `;
}

function buildCheckoutMessage() {
    const getValue = (id) => document.getElementById(id).value.trim();
    const items = cart
        .map(item => `- ${item.qty} x ${item.name} (${formatMoney(item.price * item.qty)})`)
        .join('\n');
    const notes = getValue('checkoutNotes') || 'Sin notas';

    return `Hola ONLY ZS! Quiero coordinar esta compra:\n\n${items}\nTotal productos: ${formatMoney(getCartTotal())}\n\nDatos de entrega:\nNombre: ${getValue('checkoutName')}\nTeléfono: ${getValue('checkoutPhone')}\nProvincia: ${getValue('checkoutProvince')}\nCiudad: ${getValue('checkoutCity')} (CP: ${getValue('checkoutZip')})\nDirección: ${getValue('checkoutAddress')}\nEntrega: ${getValue('checkoutDelivery')}\nPago: ${getValue('checkoutPayment')}\nNotas: ${notes}`;
}

function setupCheckout() {
    const overlay = document.getElementById('checkoutModalOverlay');
    const closeBtn = document.getElementById('checkoutModalClose');
    const form = document.getElementById('checkoutForm');

    closeBtn.addEventListener('click', closeCheckoutModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeCheckoutModal();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const errorNode = document.getElementById('checkoutError');
        errorNode.innerText = '';

        if (cart.length === 0) {
            errorNode.innerText = 'Tu carrito está vacío.';
            return;
        }

        if (!form.checkValidity()) {
            errorNode.innerText = 'Completa los campos obligatorios para coordinar la entrega.';
            form.reportValidity();
            return;
        }

    const zip = document.getElementById('checkoutZip');
    if (zip && zip.value.trim().length < 4) {
        errorNode.innerText = 'Por favor, ingresa un Código Postal válido (mínimo 4 caracteres).';
        return;
    }

        const message = buildCheckoutMessage();
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener');
        showToast('Pedido listo para enviar por WhatsApp');
    });
}
