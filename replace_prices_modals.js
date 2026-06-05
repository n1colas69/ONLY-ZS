const fs = require('fs');
let file = fs.readFileSync('js/components/modals.js', 'utf8');
file = file.replace(
    "document.getElementById('productModalPrices').innerHTML = priceHTML;",
    "document.getElementById('productModalPrices').innerHTML = product.inStock ? priceHTML : '';"
);
fs.writeFileSync('js/components/modals.js', file);
