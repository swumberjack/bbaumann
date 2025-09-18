// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navigation = document.querySelector('.navigation');

mobileMenuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
});

// Fixed Header
const fixedHeader = document.querySelector('.header-fixed');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        fixedHeader.classList.add('visible');
        backToTop.classList.add('visible');
    } else {
        fixedHeader.classList.remove('visible');
        backToTop.classList.remove('visible');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
    });
});
