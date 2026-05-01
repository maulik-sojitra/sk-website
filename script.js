// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function () {
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
        link.addEventListener('click', function () {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
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
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Fade in animation on scroll
// Use threshold: 0 so sections taller than the viewport (e.g. the products
// catalog) still trigger the reveal, since they can never reach a higher
// intersection ratio than viewport_height / section_height.
const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
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
window.addEventListener('resize', function () {
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
 *   2. Add a new entry below with the exact `file` name and display `code`.
 */
const PRODUCT_GROUPS = [
    {
        id: 'powder-containers',
        name: 'Powder Containers',
        range: 'SK 1 to SK 22',
        products: [
            { file: '01) SK - 1.png', code: 'SK - 1' },
            { file: '02) SK - 2.png', code: 'SK - 2' },
            { file: '03) SK - 3.png', code: 'SK - 3' },
            { file: '04) SK - 4.png', code: 'SK - 4' },
            { file: '05) SK - 5.png', code: 'SK - 5' },
            { file: '06) SK - 6.png', code: 'SK - 6' },
            { file: '07) SK - 7.png', code: 'SK - 7' },
            { file: '08) SK - 8.png', code: 'SK - 8' },
            { file: '09) SK - 9.png', code: 'SK - 9' },
            { file: '10) SK - 10.png', code: 'SK - 10' },
            { file: '11) SK - 11.png', code: 'SK - 11' },
            { file: '12) SK - 12.png', code: 'SK - 12' },
            { file: '13) SK - 13.png', code: 'SK - 13' },
            { file: '14) SK - 14.png', code: 'SK - 14' },
            { file: '15) SK - 15.png', code: 'SK - 15' },
            { file: '16) SK - 16.png', code: 'SK - 16' },
            { file: '17) SK - 17.png', code: 'SK - 17' },
            { file: '18) SK - 18.png', code: 'SK - 18' },
            { file: '19) SK - 19.png', code: 'SK - 19' },
            { file: '20) SK - 20.png', code: 'SK - 20' },
            { file: '21) SK - 21.png', code: 'SK - 21' },
            { file: '22) SK - 22.png', code: 'SK - 22' }
        ]
    },
    {
        id: 'spoons',
        name: 'Spoons',
        range: 'PP Spoon, Powderom Spoon, Doctor Spoon',
        products: [
            { file: '23) POWDEROM SPOON.png', code: 'POWDEROM SPOON' },
            { file: '24) PP SPOON.png', code: 'PP SPOON' },
            { file: '25) DOCTOR SPOON.png', code: 'DOCTOR SPOON' }
        ]
    },
    {
        id: 'tablet-containers',
        name: 'Tablet Containers',
        range: 'TC 30, 60, 90, 300',
        products: [
            { file: '26) TC - 30.png', code: 'TC - 30' },
            { file: '27) TC - 60.png', code: 'TC - 60' },
            { file: '28) TC - 90.png', code: 'TC - 90' },
            { file: '29) TC - 300.png', code: 'TC - 300' }
        ]
    },
    {
        id: 'oil-lotion-bottles',
        name: 'Oil Lotion Bottles',
        range: 'SK 60 ml to SK 500 ml',
        products: [
            { file: '30) SK - 60 ML ROUND.png', code: 'SK - 60 ML ROUND' },
            { file: '31) SK - 60 ML CYLINDRICAL.png', code: 'SK - 60 ML CYLINDRICAL' },
            { file: '32) SK - 100 ML ROUND.png', code: 'SK - 100 ML ROUND' },
            { file: '33) SK - 100 ML CYLINDRICAL.png', code: 'SK - 100 ML CYLINDRICAL' },
            { file: '34) SK - 200 ML ROUND.png', code: 'SK - 200 ML ROUND' },
            { file: '35) SK - 250 ML CYLINDRICAL.png', code: 'SK - 250 ML CYLINDRICAL' },
            { file: '36) SK - 500 ML ROUND.png', code: 'SK - 500 ML ROUND' },
            { file: '37) SK - 500 ML CYLINDRICAL.png', code: 'SK - 500 ML CYLINDRICAL' }
        ]
    },
    {
        id: 'pete-containers',
        name: 'PETE Containers',
        range: 'PETE 01 to PETE 04',
        products: [
            { file: '38) PETE - 01.png', code: 'PETE - 01' },
            { file: '39) PETE - 02.png', code: 'PETE - 02' },
            { file: '40) PETE - 03 350 MALT.png', code: 'PETE - 03 350 MALT' },
            { file: '41) PETE - 04 350 MALT.png', code: 'PETE - 04 350 MALT' }
        ]
    }
];

const PRODUCTS = PRODUCT_GROUPS.flatMap(group =>
    group.products.map(product => ({
        ...product,
        groupName: group.name
    }))
);

function getProductImageSrc(product) {
    return `assets/${encodeURIComponent(product.file)}`;
}

const productsGrid = document.getElementById('productsGrid');

if (productsGrid) {
    const emptyState = document.getElementById('productsEmpty');
    const productGroupsOverview = document.getElementById('productGroupsOverview');
    const productGroupsNav = document.getElementById('productGroupsNav');

    if (!PRODUCTS.length) {
        if (emptyState) emptyState.hidden = false;
    } else {
        if (productGroupsOverview) {
            const overviewFragment = document.createDocumentFragment();

            PRODUCT_GROUPS.forEach(group => {
                const card = document.createElement('a');
                card.className = 'product-group-card';
                card.href = `#${group.id}`;

                const previewImages = group.products.slice(0, 3).map(product => `
                    <span class="product-group-preview-image">
                        <img src="${getProductImageSrc(product)}" alt="" loading="lazy">
                    </span>
                `).join('');

                card.innerHTML = `
                    <span class="product-group-eyebrow">Category</span>
                    <h2>${group.name}</h2>
                    <p>${group.range}</p>
                    <div class="product-group-preview" aria-hidden="true">
                        ${previewImages}
                    </div>
                    <span class="product-group-count">${group.products.length} products</span>
                `;

                overviewFragment.appendChild(card);
            });

            productGroupsOverview.appendChild(overviewFragment);
        }

        if (productGroupsNav) {
            const navFragment = document.createDocumentFragment();
            const allLink = document.createElement('a');
            allLink.href = '#productsTop';
            allLink.className = 'product-group-chip';
            allLink.textContent = 'All';
            navFragment.appendChild(allLink);

            PRODUCT_GROUPS.forEach(group => {
                const link = document.createElement('a');
                link.href = `#${group.id}`;
                link.className = 'product-group-chip';
                link.textContent = group.name;
                navFragment.appendChild(link);
            });

            productGroupsNav.appendChild(navFragment);
        }

        const groupsFragment = document.createDocumentFragment();
        let productIndex = 0;

        PRODUCT_GROUPS.forEach(group => {
            const section = document.createElement('section');
            section.className = 'product-group-section';
            section.id = group.id;
            section.setAttribute('aria-labelledby', `${group.id}-title`);

            const groupGrid = document.createElement('div');
            groupGrid.className = 'products-grid';

            group.products.forEach(product => {
                const src = getProductImageSrc(product);
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'product-card';
                card.setAttribute('aria-label', `View ${product.code} in ${group.name}`);
                card.dataset.index = String(productIndex);

                card.innerHTML = `
                    <div class="product-image-wrap">
                        <img class="product-image" src="${src}" alt="Product ${product.code}" loading="lazy">
                    </div>
                    <div class="product-body">
                        <div class="product-code">${product.code}</div>
                    </div>
                `;

                groupGrid.appendChild(card);
                productIndex += 1;
            });

            section.innerHTML = `
                <div class="product-group-heading">
                    <div>
                        <span class="product-group-label">Product Group</span>
                        <h2 id="${group.id}-title">${group.name}</h2>
                        <p>${group.range}</p>
                    </div>
                    <span class="product-group-total">${group.products.length} products</span>
                </div>
            `;
            section.appendChild(groupGrid);
            groupsFragment.appendChild(section);
        });

        productsGrid.appendChild(groupsFragment);
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
        const src = getProductImageSrc(product);
        lightboxImage.src = src;
        lightboxImage.alt = `Product ${product.code}`;
        lightboxCaption.textContent = `${product.code} - ${product.groupName}`;
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

    productsGrid.addEventListener('click', function (e) {
        const card = e.target.closest('.product-card');
        if (!card) return;
        openLightbox(Number(card.dataset.index));
    });

    if (lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', showPrev);
        lightboxNext.addEventListener('click', showNext);

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function (e) {
            if (lightbox.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowRight') showNext();
            else if (e.key === 'ArrowLeft') showPrev();
        });
    }
}
