// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navigation = document.querySelector('.navigation');
const fixedHeader = document.querySelector('.header-fixed');
const backToTop = document.querySelector('.back-to-top');

// Mobile Menu Toggle
if (mobileMenuToggle && navigation) {
    mobileMenuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navigation a').forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navigation.contains(e.target)) {
            navigation.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Fixed Header & Back to Top
let lastScrollY = 0;
let ticking = false;

function updateScrollElements() {
    const scrollY = window.scrollY;

    // Fixed Header
    if (fixedHeader) {
        if (scrollY > 300) {
            fixedHeader.classList.add('visible');
        } else {
            fixedHeader.classList.remove('visible');
        }
    }

    // Back to Top Button
    if (backToTop) {
        if (scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    lastScrollY = scrollY;
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// Back to Top Button
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Gallery Items Click Handler
function initGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item[data-link]');

    galleryItems.forEach(item => {
        const link = item.dataset.link;

        if (link) {
            item.addEventListener('click', () => {
                window.location.href = link;
            });

            // Add cursor pointer
            item.style.cursor = 'pointer';

            // Keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = link;
                }
            });
        }
    });
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = document.querySelector('.header-main')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay for gallery items to create staggered effect
                if (entry.target.classList.contains('gallery-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                } else {
                    entry.target.classList.add('visible');
                }

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// Gallery Item Animations
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        // Add alternating slide animations like in original
        if (index % 2 === 0) {
            item.classList.add('slide-left');
        } else {
            item.classList.add('slide-right');
        }
    });
}

// Image Loading with Error Handling
function initImageLoading() {
    const images = document.querySelectorAll('img[src]');

    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');

        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });

        img.addEventListener('error', () => {
            img.classList.remove('loading');
            img.classList.add('error');

            // Replace with placeholder if image fails
            if (img.src.includes('placeholder.jpg') === false) {
                console.warn('Image failed to load:', img.src);
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpbGQgbmljaHQgdmVyZsO8Z2JhcjwvdGV4dD4KPC9zdmc+';
                img.alt = 'Bild nicht verfügbar';
            }
        });
    });
}

// Form Handling (for future contact forms)
function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Handle form submission here
                console.log('Form submitted successfully');
                showNotification('Nachricht wurde gesendet!', 'success');
            } else {
                showNotification('Bitte füllen Sie alle erforderlichen Felder aus.', 'error');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification__close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Performance: Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility: Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window Resize Handler
const handleResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 980) {
        navigation.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }

    // Recalculate positions for scroll elements
    updateScrollElements();
}, 250);

window.addEventListener('resize', handleResize);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navigation.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }

    // Quick navigation with Alt + number keys
    if (e.altKey && !isNaN(e.key) && e.key >= 1 && e.key <= 6) {
        e.preventDefault();
        const navLinks = document.querySelectorAll('.navigation a');
        if (navLinks[e.key - 1]) {
            navLinks[e.key - 1].click();
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGalleryItems();
    initSmoothScrolling();
    initAnimations();
    initGalleryAnimations();
    initImageLoading();
    initForms();
    initLazyLoading();

    // Initial scroll check
    updateScrollElements();

    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        debounce
    };
}