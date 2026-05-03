/* =========================================================
   ONLY ZS — scroll.js
   Efectos de scroll, parallax y cursor
========================================================= */

let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
        navbar.classList.toggle('hidden', window.scrollY > lastScrollY);
    } else {
        navbar.classList.remove('scrolled', 'hidden');
    }
    lastScrollY = window.scrollY;
    const hero = document.getElementById('hero');
    if (hero && window.scrollY <= hero.offsetHeight) {
        hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    }
});

function setupObservers() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    reveals.forEach(reveal => observer.observe(reveal));
}

// Custom Cursor
const cursor = document.getElementById('custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, input, label').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });
}
