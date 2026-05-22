/* =========================================================
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
        const cardImage = getOptimizedImage(prod.image, 'sm');
        const badgeHTML = prod.badge
            ? `<span class="product-badge badge-${prod.badge.toLowerCase()}">${prod.badge}</span>` : '';
        const priceHTML = prod.originalPrice
            ? `<span class="price-current">${formatMoney(prod.price)}</span> <span class="price-old">${formatMoney(prod.originalPrice)}</span>`
            : `<span class="price-current">${formatMoney(prod.price)}</span>`;
        const btnHTML = prod.inStock
            ? `<div class="product-actions">
                    <button class="buy-now" type="button" onclick="buyNow(${prod.id})">Comprar ahora</button>
                    <button class="add-to-cart" type="button" onclick="addToCart(${prod.id})">Agregar al Carrito</button>
               </div>`
            : `<button class="add-to-cart" style="background:#777;" disabled>Agotado</button>`;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-wrap">
                ${badgeHTML}
                <img src="${cardImage}"${getImageFallbackAttr(prod.image)} alt="${prod.name}" class="product-image" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index < 2 ? 'high' : 'auto'}" width="720" height="900">
                <button class="wishlist-icon ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${prod.id}, this)">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <p class="product-category">${prod.category}</p>
                <h3 class="product-title">${prod.name}</h3>
                <div class="product-prices">${priceHTML}</div>
                ${btnHTML}
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
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
    const filtered = productsData.filter(p => p.category === category);
    const grid = document.getElementById('productsGrid');
    grid.style.opacity = 0;
    setTimeout(() => { renderProducts(filtered); grid.style.opacity = 1; }, 300);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
