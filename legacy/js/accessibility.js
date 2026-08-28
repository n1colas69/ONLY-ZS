/* =========================================================
   ONLY ZS — accessibility.js
   Mejoras de accesibilidad para modales y formularios
========================================================= */

/**
 * Crea un "focus trap" para asegurar que el focus se mantenga dentro de un modal
 * Previene que el usuario acceda a contenido detrás del modal con teclado
 */
function createFocusTrap(modalElement) {
    if (!modalElement) return;
    
    const focusableElements = modalElement.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab - navegación atrás
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab - navegación adelante
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };
    
    modalElement.addEventListener('keydown', handleTabKey);
    
    // Retornar función para limpiar listener
    return () => modalElement.removeEventListener('keydown', handleTabKey);
}

/**
 * Valida formulario de checkout y marca campos con errores
 */
function validateCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return false;
    
    const errorContainer = document.getElementById('checkoutError');
    
    const requiredFields = [
        'checkoutName',
        'checkoutPhone',
        'checkoutProvince',
        'checkoutCity',
        'checkoutAddress',
        'checkoutZip',
        'checkoutDelivery',
        'checkoutPayment'
    ];
    
    const errors = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const hasValue = field.value && field.value.trim();
        
        if (!hasValue) {
            errors.push(field.previousElementSibling?.innerText || fieldId);
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', `${fieldId}-error`);
            
            // Mostrar mensaje de error
            const errorMsg = document.getElementById(`${fieldId}-error`);
            if (errorMsg) {
                errorMsg.style.display = 'block';
            }
        } else {
            field.setAttribute('aria-invalid', 'false');
            field.removeAttribute('aria-describedby');
            
            const errorMsg = document.getElementById(`${fieldId}-error`);
            if (errorMsg) {
                errorMsg.style.display = 'none';
            }
        }
    });
    
    if (errors.length > 0) {
        if (errorContainer) {
            errorContainer.innerText = `⚠️ Errores en: ${errors.join(', ')}`;
            errorContainer.setAttribute('role', 'alert');
            errorContainer.setAttribute('aria-live', 'assertive');
            errorContainer.style.display = 'block';
        }
        
        // Focus en el primer error
        const firstError = document.getElementById(requiredFields[0]);
        if (firstError) {
            firstError.focus();
        }
        
        return false;
    }
    
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
    return true;
}

/**
 * Agrega aria-hidden a iconos decorativos (Font Awesome)
 */
function hideDecorativeIcons() {
    document.querySelectorAll('.fas, .far, .fab').forEach(icon => {
        // Si el icono está dentro de un botón sin texto adicional
        const parent = icon.closest('button');
        if (parent && !parent.innerText.trim().replace(/\s/g, '')) {
            icon.setAttribute('aria-hidden', 'true');
        }
        
        // Si está en un span/div sin contenido de texto
        const textParent = icon.parentElement;
        if (textParent && !textParent.innerText.trim().replace(/\s/g, '') && 
            textParent.tagName !== 'BUTTON') {
            icon.setAttribute('aria-hidden', 'true');
        }
    });
}

/**
 * Mejora accesibilidad de modales existentes
 */
function enhanceModalAccessibility() {
    // Producto Modal
    const productModalOverlay = document.getElementById('productModalOverlay');
    if (productModalOverlay) {
        productModalOverlay.setAttribute('role', 'dialog');
        productModalOverlay.setAttribute('aria-modal', 'true');
        productModalOverlay.setAttribute('aria-labelledby', 'productModalName');
    }
    
    // Checkout Modal
    const checkoutModal = document.querySelector('.checkout-modal');
    if (checkoutModal) {
        checkoutModal.setAttribute('role', 'dialog');
        checkoutModal.setAttribute('aria-modal', 'true');
        checkoutModal.setAttribute('aria-labelledby', 'checkoutModalTitle');
    }
    
    // Gallery Lightbox
    const galleryLightbox = document.getElementById('galleryLightbox');
    if (galleryLightbox) {
        galleryLightbox.setAttribute('role', 'dialog');
        galleryLightbox.setAttribute('aria-modal', 'true');
        galleryLightbox.setAttribute('aria-label', 'Galería de fotos en pantalla completa');
    }
}

/**
 * Agrega roles a regiones importantes
 */
function enhanceRegionRoles() {
    // Galería de productos
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.setAttribute('role', 'region');
        productsGrid.setAttribute('aria-label', 'Catálogo de productos');
        productsGrid.setAttribute('aria-live', 'polite');
    }
    
    // Galería de comunidad
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.setAttribute('role', 'region');
        galleryGrid.setAttribute('aria-label', 'Galería de fotos de la comunidad');
        galleryGrid.setAttribute('aria-live', 'polite');
    }
    
    // Carrito
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.setAttribute('role', 'region');
        cartItems.setAttribute('aria-label', 'Artículos en el carrito');
        cartItems.setAttribute('aria-live', 'polite');
    }
    
    // Favoritos
    const wishlistItems = document.getElementById('wishlistItems');
    if (wishlistItems) {
        wishlistItems.setAttribute('role', 'region');
        wishlistItems.setAttribute('aria-label', 'Artículos marcados como favoritos');
        wishlistItems.setAttribute('aria-live', 'polite');
    }
}

/**
 * Mejorar validación de formulario de checkout
 */
function setupCheckoutValidation() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;
    
    // Validar en tiempo real
    checkoutForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            if (!field.value || !field.value.trim()) {
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.setAttribute('aria-invalid', 'false');
            }
        });
    });
    
    // Validar antes de submit
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateCheckoutForm()) {
            // No enviar, mostrar errores
            return;
        }
        
        // Aquí continuar con el envío
        console.log('Formulario válido, enviando...');
    });
}

/**
 * Mejorar enfoque visual en elementos interactivos
 */
function enhanceFocusStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Focus visible en todos los elementos interactivos */
        button:focus,
        input:focus,
        select:focus,
        textarea:focus,
        a:focus {
            outline: 3px solid var(--color-accent, #BFA16A);
            outline-offset: 2px;
        }
        
        /* Focus en elementos sin outline by default */
        [tabindex]:focus {
            outline: 3px solid var(--color-accent, #BFA16A);
            outline-offset: 2px;
        }
        
        /* Mejorar visibilidad de focus en botones */
        .btn:focus {
            box-shadow: 0 0 0 3px rgba(191, 161, 106, 0.3);
        }
        
        /* Estilos para errores de formulario */
        input[aria-invalid="true"],
        select[aria-invalid="true"],
        textarea[aria-invalid="true"] {
            border-color: var(--color-danger, #C0392B);
            background-color: rgba(192, 57, 43, 0.05);
        }
        
        .error-message {
            color: var(--color-danger, #C0392B);
            font-size: 0.85rem;
            margin-top: 4px;
            display: none;
        }
        
        .error-summary {
            background: rgba(192, 57, 43, 0.1);
            color: var(--color-danger, #C0392B);
            padding: 12px;
            border-radius: var(--radius, 4px);
            margin-bottom: 16px;
            display: none;
            border-left: 4px solid var(--color-danger, #C0392B);
        }
        
        .error-summary:not(:empty) {
            display: block;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Inicializar todas las mejoras de accesibilidad
 */
function initAccessibility() {
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            runAccessibilityEnhancements();
        });
    } else {
        runAccessibilityEnhancements();
    }
}

function runAccessibilityEnhancements() {
    hideDecorativeIcons();
    enhanceModalAccessibility();
    enhanceRegionRoles();
    setupCheckoutValidation();
    enhanceFocusStyles();
    
    console.log('✓ Mejoras de accesibilidad aplicadas');
}

// Auto-inicializar
initAccessibility();
