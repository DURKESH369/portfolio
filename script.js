// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000);
  }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change and progress bar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const progressBar = document.getElementById('progressBar');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Progress bar
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
});

// Modern Scroll animations with staggered effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('is-visible');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.stagger-animate');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections and reveal utilities
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Staggered animations for cards and elements
document.querySelectorAll('.project-card, .skill-category, .stat, .contact-card').forEach((el, idx) => {
    el.classList.add('reveal-up');
    observer.observe(el);
    el.style.transitionDelay = `${Math.min(idx * 80, 400)}ms`;
});

// Add stagger animation class to skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.classList.add('stagger-animate');
    item.style.transitionDelay = `${index * 50}ms`;
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});

// Add smooth reveal animation for project cards
function revealProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('reveal-up');
        card.style.transitionDelay = `${index * 100}ms`;
    });
}

// Trigger project cards animation when projects section is visible
const projectsSection = document.querySelector('#projects');
if (projectsSection) {
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealProjectCards();
                projectsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    projectsObserver.observe(projectsSection);
}

// Contact form handling
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        const success = this.querySelector('.success-message');
        if (success) {
            success.textContent = 'Thanks! Your message has been sent.';
            success.style.display = 'block';
        }
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + '+';
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    body.loaded .hero {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Theme toggle
const themeToggleBtn = document.querySelector('.theme-toggle');

function applyTheme(isDark) {
    document.body.classList.toggle('theme-dark', isDark);
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', String(isDark));
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
        }
    }
}

function resolveInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
        applyTheme(stored === 'dark');
        return;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);
}

resolveInitialTheme();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('theme-dark');
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Sync with system preference if user hasn't chosen explicitly
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
    const stored = localStorage.getItem('theme');
    if (!stored) {
        applyTheme(e.matches);
    }
});

// Reduced motion handling
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

// Download resume button -> print dialog (user can save as PDF)
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        window.print();
    });
}

// Dynamic background particles (stars and dots)
function initFlowingBackground() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const floatingStars = document.querySelector('.floating-stars');
    const flyingStars = document.querySelector('.flying-stars');
    const diagonalStars = document.querySelector('.diagonal-stars');
    const smallDots = document.querySelector('.small-dots');
    if (!floatingStars || !flyingStars || !diagonalStars || !smallDots) return;

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const clearChildren = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };
    clearChildren(floatingStars);
    clearChildren(flyingStars);
    clearChildren(diagonalStars);
    clearChildren(smallDots);

    const rand = (min, max) => Math.random() * (max - min) + min;
    const create = (container, className, count, genProps) => {
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = className;
            const props = genProps(i);
            if (props.content) el.textContent = props.content;
            if (props.x !== undefined) el.style.setProperty('--x', props.x + 'vw');
            if (props.y !== undefined) el.style.setProperty('--y', props.y + 'vh');
            if (props.dur !== undefined) el.style.setProperty('--dur', props.dur + 's');
            if (props.delay !== undefined) el.style.animationDelay = props.delay + 's';
            if (props.color !== undefined) el.style.setProperty('--c', props.color);
            if (props.sizeRem !== undefined) el.style.fontSize = props.sizeRem + 'rem';
            if (props.opacity !== undefined) el.style.opacity = props.opacity;
            if (props.widthPx !== undefined) {
                el.style.width = props.widthPx + 'px';
                el.style.height = (props.heightPx ?? props.widthPx) + 'px';
            }
            container.appendChild(el);
        }
    };

    // Counts scale with screen size
    const scale = vw >= 1400 ? 1.6 : vw >= 1024 ? 1.3 : vw >= 768 ? 1.0 : 0.85;

    const palette = ['#60a5fa', '#3b82f6', '#38bdf8', '#22d3ee', '#34d399', '#10b981', '#a3e635', '#facc15', '#f59e0b', '#f97316', '#fb7185', '#ef4444', '#f472b6', '#a78bfa', '#8b5cf6', '#06b6d4'];

    create(floatingStars, 'star', Math.round(24 * scale), () => ({
        content: '★',
        x: rand(0, 100),
        dur: rand(14, 22),
        delay: -rand(0, 20),
        color: palette[Math.floor(rand(0, palette.length))],
        sizeRem: rand(0.7, 1.6),
        opacity: rand(0.4, 0.8)
    }));

    create(flyingStars, 'flying-star', Math.round(20 * scale), () => ({
        content: '★',
        y: -rand(0, 50),
        dur: rand(10, 16),
        delay: -rand(0, 20),
        color: palette[Math.floor(rand(0, palette.length))],
        sizeRem: rand(0.6, 1.3),
        opacity: rand(0.35, 0.7)
    }));

    create(diagonalStars, 'diagonal-star', Math.round(16 * scale), () => ({
        content: '★',
        dur: rand(16, 24),
        delay: -rand(0, 25),
        color: palette[Math.floor(rand(0, palette.length))],
        sizeRem: rand(0.6, 1.2),
        opacity: rand(0.3, 0.6)
    }));

    create(smallDots, 'small-dot', Math.round(60 * scale), () => ({
        y: -rand(0, 60),
        dur: rand(10, 18),
        delay: -rand(0, 20),
        color: palette[Math.floor(rand(0, palette.length))],
        widthPx: rand(2, 4),
        heightPx: rand(2, 4),
        opacity: rand(0.4, 0.9)
    }));
}

window.addEventListener('load', initFlowingBackground);
window.addEventListener('resize', (() => {
    let t;
    return () => { clearTimeout(t); t = setTimeout(initFlowingBackground, 300); };
})());

// Falling gold stars over Skills section
function initSkillsStars() {
    // Feature flag: only run when body has .show-skills-stars
    if (!document.body.classList.contains('show-skills-stars')) return;
    // Keep this layer disabled so we only use rails + fly stars
    return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const skills = document.querySelector('#skills');
    const layer = document.querySelector('.skills-stars');
    if (!skills || !layer) return;

    // Clear existing
    while (layer.firstChild) layer.removeChild(layer.firstChild);

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const count = vw >= 1280 ? 36 : vw >= 1024 ? 28 : vw >= 768 ? 22 : 16;

    const rand = (min, max) => Math.random() * (max - min) + min;
    // Falling stars
    for (let i = 0; i < Math.round(count * 0.7); i++) {
        const star = document.createElement('div');
        star.className = 'skills-star';
        star.textContent = '★';
        // Random horizontal start position within the section
        const startX = rand(0, 100);
        const swing = rand(-40, 40);
        const duration = rand(6, 10);
        const delay = -rand(0, 10);
        const size = rand(0.7, 1.8);
        const opacity = rand(0.55, 0.95);
        star.style.left = `${startX}%`;
        star.style.setProperty('--sx', `${startX}%`);
        star.style.setProperty('--swing', `${swing}px`);
        star.style.setProperty('--sdur', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        star.style.fontSize = `${size}rem`;
        star.style.opacity = opacity.toString();
        layer.appendChild(star);
    }

    // Flying (side-to-side) stars
    const flyCount = Math.max(6, Math.round(count * 0.4));
    for (let i = 0; i < flyCount; i++) {
        const star = document.createElement('div');
        star.className = 'skills-star float';
        star.textContent = '★';
        const rand = (min, max) => Math.random() * (max - min) + min;
        const top = rand(5, 95);
        const fromLeft = Math.random() < 0.5 ? -15 : 115; // start outside either side
        const toShift = fromLeft < 0 ? 140 : -140; // travel across to the other side
        const duration = rand(9, 16);
        const delay = -rand(0, 12);
        const size = rand(0.6, 1.6);
        const opacity = rand(0.55, 0.95);
        star.style.top = `${top}%`;
        star.style.left = `${fromLeft}%`;
        star.style.setProperty('--fromX', `${fromLeft}%`);
        star.style.setProperty('--toX', `${toShift}%`);
        star.style.setProperty('--sdur', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        star.style.fontSize = `${size}rem`;
        star.style.opacity = opacity.toString();
        layer.appendChild(star);
    }
}

window.addEventListener('load', initSkillsStars);
window.addEventListener('resize', (() => {
    let t;
    return () => { clearTimeout(t); t = setTimeout(initSkillsStars, 300); };
})());

// Full-container flying stars (behind text)
function initSkillsFlyStars() {
    if (!document.body.classList.contains('show-skills-stars')) return;
    const skills = document.querySelector('#skills');
    const layer = document.querySelector('.skills-fly-stars');
    if (!skills || !layer) return;
    while (layer.firstChild) layer.removeChild(layer.firstChild);
    const count = 2; // two flying stars across the container
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'skills-fly-star';
        star.textContent = '★';
        const y = Math.random() * 100; // any row across container
        const fromLeft = Math.random() < 0.5 ? -12 : 112;
        const toLeft = fromLeft < 0 ? 112 : -12;
        const dur = 11 + Math.random() * 4;
        const delay = -Math.random() * 12;
        const size = 1.0 + Math.random() * 0.4;
        const opacity = 0.7 + Math.random() * 0.25;
        star.style.top = `${y}%`;
        star.style.left = `${fromLeft}%`;
        star.style.setProperty('--fromX', `${fromLeft}%`);
        star.style.setProperty('--toX', `${toLeft}%`);
        star.style.setProperty('--y', `${y}%`);
        star.style.setProperty('--dur', `${dur}s`);
        star.style.animationDelay = `${delay}s`;
        star.style.fontSize = `${size}rem`;
        star.style.opacity = opacity.toString();
        layer.appendChild(star);
    }
}

window.addEventListener('load', initSkillsFlyStars);
window.addEventListener('resize', (() => {
    let t;
    return () => { clearTimeout(t); t = setTimeout(initSkillsFlyStars, 300); };
})());
// Rails of glowing falling stars outside each skill card
function initSkillCardRails() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const grid = document.querySelector('.skills .skills-grid');
    if (!grid) return;

    // Wrap each skill-category once
    const categories = Array.from(grid.querySelectorAll('.skill-category'));
    categories.forEach((card) => {
        if (card.parentElement && card.parentElement.classList.contains('skill-card-wrap')) {
            // Already wrapped: just (re)populate rails
            const wrap = card.parentElement;
            const leftRail = wrap.querySelector('.star-rail.left');
            const rightRail = wrap.querySelector('.star-rail.right');
            [leftRail, rightRail].forEach((rail) => {
                if (!rail) return;
                while (rail.firstChild) rail.removeChild(rail.firstChild);
                populateRail(rail);
            });
            return;
        }

        const wrap = document.createElement('div');
        wrap.className = 'skill-card-wrap';
        const leftRail = document.createElement('div');
        leftRail.className = 'star-rail left';
        leftRail.setAttribute('aria-hidden', 'true');
        const rightRail = document.createElement('div');
        rightRail.className = 'star-rail right';
        rightRail.setAttribute('aria-hidden', 'true');

        // Build structure: wrap -> rails + card
        card.parentElement.insertBefore(wrap, card);
        wrap.appendChild(leftRail);
        wrap.appendChild(rightRail);
        wrap.appendChild(card);
        populateRail(leftRail);
        populateRail(rightRail);
    });

    function populateRail(rail) {
        const count = 1; // one star per rail
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'rail-star';
            star.textContent = '★';
            const top = Math.random() * 100;
            const delay = -Math.random() * 10;
            const dur = 10 + Math.random() * 4;
            const size = 0.9 + Math.random() * 0.4; // rem
            const opacity = 0.7 + Math.random() * 0.25;
            star.style.top = `${top}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.setProperty('--dur', `${dur}s`);
            star.style.fontSize = `${size}rem`;
            star.style.opacity = opacity.toString();
            rail.appendChild(star);
        }
    }
}

window.addEventListener('load', initSkillCardRails);
window.addEventListener('resize', (() => {
    let t;
    return () => { clearTimeout(t); t = setTimeout(initSkillCardRails, 300); };
})());
