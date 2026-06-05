const fs = require('fs');
let file = fs.readFileSync('js/components/products.js', 'utf8');
file = file.replace(
    '<div class="product-prices">${prod.isComingSoon ? \'<span class="price-current" style="color:var(--color-gray)">-</span>\' : priceHTML}</div>',
    '<div class="product-prices">${prod.isComingSoon ? \'<span class="price-current" style="color:var(--color-gray)">-</span>\' : (prod.inStock ? priceHTML : \'\')}</div>'
);
fs.writeFileSync('js/components/products.js', file);
