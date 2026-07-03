// ============================================
// TRIJAL ENTERPRISES - Premium JavaScript
// All Interactive Features & Animations
// ============================================

// Prevent Flash of Unstyled Content (FOUC)
document.documentElement.style.visibility = 'visible';
document.body.style.visibility = 'visible';
document.documentElement.style.opacity = '1';
document.body.style.opacity = '1';

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 100
});

// ============================================
// 0. Image Slider
// ============================================
let slideIndex = 1;

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Initialize slider on page load
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlides(slideIndex);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}

window.addEventListener('load', initSlider);

// Auto-advance slides
setInterval(() => {
    changeSlide(1);
}, 5000);

// ============================================
// 1. Scroll Progress Bar
// ============================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// 2. Sticky Navbar & Mobile Menu
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
});

// ============================================
// 3. Typewriter Effect
// ============================================
function typewriterEffect() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    const words = ['Drilling Solutions', 'Excellence', 'Innovation', 'Reliability'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (!isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
                return;
            }
        }
        
        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
}

typewriterEffect();

// ============================================
// 4. Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter, .stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.classList.add('counted');
                    }
                };

                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ============================================
// 5. Gallery Filter
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'slideIn 0.6s ease-out';
                }, 10);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ============================================
// 6. Lightbox Gallery
// ============================================
const lightboxBtns = document.querySelectorAll('.lightbox-btn');

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const imageSrc = btn.getAttribute('href');
        openLightbox(imageSrc);
    });
});

function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="Gallery Image">
        </div>
    `;
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        animation: zoomIn 0.3s ease;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 40px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.color = '#F9A826';
        closeBtn.style.transform = 'scale(1.2)';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.color = 'white';
        closeBtn.style.transform = 'scale(1)';
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => lightbox.remove(), 300);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        }
    });

    document.body.appendChild(lightbox);
}



// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ============================================
// 8. FAQ Accordion
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        item.classList.toggle('active');
    });
});

// ============================================
// 9. Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#25D366';

        contactForm.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);

        console.log('Form submitted successfully');
    });
}

// ============================================
// 10. Back to Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 11. Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 12. Parallax Background Effect
// ============================================
const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroImage = heroSection.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// ============================================
// 13. Equipment Card Hover Effects
// ============================================
const equipmentCards = document.querySelectorAll('.equipment-card');

equipmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// 14. Service Card Animations
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// 15. Infinite Logo Slider
// ============================================
function setupInfiniteSlider() {
    const track = document.querySelector('.clients-track');
    if (!track) return;

    const logos = track.querySelectorAll('.client-logo');
    
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
}

setupInfiniteSlider();

// ============================================
// 16. Navbar Background on Scroll
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// ============================================
// 17. Floating Animation for Cards
// ============================================
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .about-image {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

addFloatingAnimation();

// ============================================
// 18. Text Reveal Animation
// ============================================
function textRevealAnimation() {
    const textReveals = document.querySelectorAll('.text-reveal');
    
    textReveals.forEach(element => {
        const text = element.textContent;
        element.innerHTML = text.split('').map((char, index) => 
            `<span style="animation: reveal 0.5s ease-out ${index * 0.05}s both;">${char}</span>`
        ).join('');
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes reveal {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

textRevealAnimation();

// ============================================
// 19. Intersection Observer for Animations
// ============================================
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .equipment-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

setupIntersectionObserver();

// ============================================
// 20. Equipment Details Modal
// ============================================
const viewBtns = document.querySelectorAll('.view-btn');

viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.equipment-card');
        const title = card.querySelector('.equipment-info h3').textContent;
        const description = card.querySelector('.equipment-info p').textContent;
        
        alert(`${title}\n\n${description}\n\nFor more details, please contact us.`);
    });
});

// ============================================
// 21. Dynamic Year in Footer
// ============================================
function updateFooterYear() {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${year} TRIJAL ENTERPRISES. All rights reserved.`;
    }
}

updateFooterYear();

// ============================================
// 22. Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.remove();
        }
    }

    if (e.key === 'ArrowRight') {
        if (nextBtn) nextBtn.click();
    }

    if (e.key === 'ArrowLeft') {
        if (prevBtn) prevBtn.click();
    }
});

// ============================================
// 23. Performance Optimization
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ============================================
// 24. Mobile Touch Optimizations
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        if (nextBtn) nextBtn.click();
    }
    if (touchEndX > touchStartX + 50) {
        if (prevBtn) prevBtn.click();
    }
}

// ============================================
// 25. Initialize All Features
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('TRIJAL ENTERPRISES Website Loaded Successfully');
    AOS.refresh();
});

// ============================================
// 26. Prevent FOUC
// ============================================
document.documentElement.style.opacity = '1';

// ============================================
// 27. Service Card Icon Animation
// ============================================
const serviceIcons = document.querySelectorAll('.service-icon');

serviceIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg) scale(1.2)';
        this.style.transition = 'transform 0.6s ease';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

// ============================================
// 28. Why Choose Us Icon Animation
// ============================================
const whyIcons = document.querySelectorAll('.why-icon');

whyIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease';
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// 29. Form Input Focus Effects
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ============================================
// End of Script
// ============================================
