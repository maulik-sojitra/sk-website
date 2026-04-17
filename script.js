// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // Account for sticky navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Handle window resize - close mobile menu if window becomes large
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/*
 * Products showcase
 * -----------------
 * To add a new product:
 *   1. Place the image file inside the `assets/` folder.
 *   2. Add a new entry below with the file name (without extension) as the `code`.
 * The `code` becomes the displayed product code and the image is loaded from
 * `assets/<code>.png`.
 */
const PRODUCTS = [
    { code: 'SK - 1', ext: 'png' },
    { code: 'SK - 2', ext: 'png' }
];

const productsGrid = document.getElementById('productsGrid');

if (productsGrid) {
    const emptyState = document.getElementById('productsEmpty');

    if (!PRODUCTS.length) {
        if (emptyState) emptyState.hidden = false;
    } else {
        const fragment = document.createDocumentFragment();

        PRODUCTS.forEach((product, index) => {
            const src = `assets/${encodeURIComponent(product.code)}.${product.ext}`;

            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'product-card';
            card.setAttribute('aria-label', `View product ${product.code}`);
            card.dataset.index = String(index);

            card.innerHTML = `
                <div class="product-image-wrap">
                    <img class="product-image" src="${src}" alt="Product ${product.code}" loading="lazy">
                </div>
                <div class="product-body">
                    <div class="product-code">${product.code}</div>
                    <div class="product-label">Plastic Container</div>
                </div>
            `;

            fragment.appendChild(card);
        });

        productsGrid.appendChild(fragment);
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentIndex = 0;

    function renderLightbox(index) {
        const product = PRODUCTS[index];
        if (!product) return;
        currentIndex = index;
        const src = `assets/${encodeURIComponent(product.code)}.${product.ext}`;
        lightboxImage.src = src;
        lightboxImage.alt = `Product ${product.code}`;
        lightboxCaption.textContent = product.code;
    }

    function openLightbox(index) {
        renderLightbox(index);
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
    }

    function showNext() {
        renderLightbox((currentIndex + 1) % PRODUCTS.length);
    }

    function showPrev() {
        renderLightbox((currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length);
    }

    productsGrid.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        if (!card) return;
        openLightbox(Number(card.dataset.index));
    });

    if (lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', showPrev);
        lightboxNext.addEventListener('click', showNext);

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (lightbox.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowRight') showNext();
            else if (e.key === 'ArrowLeft') showPrev();
        });
    }
}
