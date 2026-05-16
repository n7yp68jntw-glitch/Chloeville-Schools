// ========================================
// CHLOEVILLE PRIMARY SCHOOL
// Interactive JavaScript Features
// ========================================

// ========================================
// 1. HAMBURGER MENU FUNCTIONALITY
// ========================================
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ========================================
// 2. ACTIVE NAVIGATION LINK ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 3. SMOOTH SCROLL BEHAVIOR
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 4. FADE IN ON SCROLL ANIMATION
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll(
    '.action-card, .academic-card, .why-card, .news-card, .step-box'
).forEach(element => {
    observer.observe(element);
});

// ========================================
// 5. CONTACT FORM VALIDATION
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ========================================
// 6. SCROLL TO TOP BUTTON
// ========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.innerHTML = '↑';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 7. RIPPLE EFFECT ON BUTTONS
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);
}

document.querySelectorAll('.cta-button, .hub-btn, .submit-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ========================================
// 8. FORM INPUT FOCUS EFFECTS
// ========================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
    });

    input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
    });
});

// ========================================
// 9. COUNTER ANIMATION FOR STATS (IF NEEDED)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// 10. PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ========================================
// 11. KEYBOARD NAVIGATION FOR ACCESSIBILITY
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// 12. MOBILE VIEWPORT OPTIMIZATION
// ========================================
function setupResponsive() {
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.position = 'absolute';
        }
    }
}

setupResponsive();
window.addEventListener('resize', setupResponsive);

// ========================================
// 13. LAZY LOAD IMAGES (if any)
// ========================================
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// 14. CONSOLE LOG INFO
// ========================================
console.log('%cChloeville Primary School', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cBuilding Futures Through Quality Education', 'font-size: 14px; color: #3b82f6;');
console.log('Website loaded successfully! 🎓');
