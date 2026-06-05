﻿﻿﻿/* =========================================================
   ONLY ZS — products.js
   Gestión de productos y galería comunitaria
========================================================= */

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px 0;">No se encontraron productos.</p>';
        return;
    }
    products.forEach((prod, index) => {
        const isWishlisted = wishlist.includes(prod.id);
        const isInCart = cart.some(item => item.id === prod.id);
        const cardImage = getOptimizedImage(prod.image, 'sm');
        
        let badgeHTML = '';
        if (!prod.inStock && !prod.isComingSoon) {
            badgeHTML = `<span class="product-badge badge-agotado" style="background: var(--color-gray, #777); color: #fff;">AGOTADO</span>`;
        } else if (prod.badge) {
            badgeHTML = `<span class="product-badge badge-${prod.badge.toLowerCase().replace('ó', 'o')}">${prod.badge}</span>`;
        }

        const priceHTML = prod.originalPrice
            ? `<span class="price-current">${formatMoney(prod.price)}</span> <span class="price-old">${formatMoney(prod.originalPrice)}</span>`
            : `<span class="price-current">${formatMoney(prod.price)}</span>`;

        let btnHTML = '';
        if (prod.isComingSoon) {
            btnHTML = `<button class="add-to-cart" style="background:#333;" disabled>Próximamente</button>`;
        } else if (prod.inStock) {
            let cartBtnHTML = isInCart 
                ? `<button class="add-to-cart in-cart" type="button" onclick="removeFromCart(${prod.id})" onmouseenter="this.innerText='Quitar del carrito'" onmouseleave="this.innerText='En el carrito'" style="background: var(--color-success, #28a745); color: #fff;">En el carrito</button>`
                : `<button class="add-to-cart" type="button" onclick="addToCart(${prod.id})">Agregar al Carrito</button>`;
            btnHTML = `<div class="product-actions">
                            <button class="buy-now" type="button" onclick="buyNow(${prod.id})">Comprar ahora</button>
                            ${cartBtnHTML}
                       </div>`;
        } else {
            btnHTML = '';
        }

        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = prod.id;
        card.innerHTML = `
            <div class="product-image-wrap">
                ${badgeHTML}
                <img src="${cardImage}"${getImageFallbackAttr(prod.image)} alt="${prod.name}" class="product-image ${prod.isComingSoon ? 'img-coming-soon' : ''}" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index < 2 ? 'high' : 'auto'}" width="720" height="900">
                ${!prod.isComingSoon ? `
                <button class="wishlist-icon ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${prod.id}, this)">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                </button>` : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${prod.category}</p>
                <h3 class="product-title">${prod.name}</h3>
                <div class="product-prices">${prod.isComingSoon ? '<span class="price-current" style="color:var(--color-gray)">-</span>' : (prod.inStock ? priceHTML : '<span class="price-current" style="color:var(--color-gray)">Agotado</span>')}</div>
                ${btnHTML}
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (!prod.isComingSoon && e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                openProductModal(prod.id);
            }
        });
        grid.appendChild(card);
    });
}

function setProductsPanelOpen(open) {
    const panel = document.getElementById('productsPanel');
    const toggle = document.getElementById('productsToggle');
    if (!panel || !toggle) return;

    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('active', open);
    const label = toggle.querySelector('span');
    if (label) label.innerText = open ? 'Ocultar productos' : 'Mostrar productos';
}

function filterByCategory(category) {
    setProductsPanelOpen(true);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) btn.classList.add('active');
    });
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
    const grid = document.getElementById('productsGrid');
    grid.style.opacity = 0;
    setTimeout(() => { renderProducts(filtered); grid.style.opacity = 1; }, 300);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function updateGridCartButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        if (!id) return;
        const isInCart = cart.some(item => item.id === id);
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn && !addToCartBtn.disabled) {
            if (isInCart) {
                addToCartBtn.classList.add('in-cart');
                addToCartBtn.style.background = 'var(--color-success, #28a745)';
                addToCartBtn.style.color = '#fff';
                addToCartBtn.innerText = 'En el carrito';
                addToCartBtn.setAttribute('onclick', `removeFromCart(${id})`);
                addToCartBtn.setAttribute('onmouseenter', `this.innerText='Quitar del carrito'`);
                addToCartBtn.setAttribute('onmouseleave', `this.innerText='En el carrito'`);
            } else {
                addToCartBtn.classList.remove('in-cart');
                addToCartBtn.style.background = '';
                addToCartBtn.style.color = '';
                addToCartBtn.innerText = 'Agregar al Carrito';
                addToCartBtn.setAttribute('onclick', `addToCart(${id})`);
                addToCartBtn.removeAttribute('onmouseenter');
                addToCartBtn.removeAttribute('onmouseleave');
            }
        }
    });
}
