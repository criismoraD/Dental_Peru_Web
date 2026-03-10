/* ===========================
   Sonríe Perú — Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar scroll effect ─────────────────────────
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ─── Mobile menu toggle ──────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // ─── Scroll reveal (Intersection Observer) ───────
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Animated counters ───────────────────────────
    const statNumbers = document.querySelectorAll('.hero__stat-number[data-target]');

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(target * eased).toLocaleString('es-PE');

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach(el => counterObserver.observe(el));

    // ─── Testimonials slider ─────────────────────────
    const track = document.getElementById('testimonialsTrack');
    const dots = document.querySelectorAll('.testimonials__dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index, 10));
        });
    });

    // Auto-advance every 5 seconds
    setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);

    // ─── Contact form (demo handler) ─────────────────
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const nombre = formData.get('nombre');

        // Simulate success
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '¡Enviado correctamente!';
        btn.style.background = 'linear-gradient(135deg, #2CB5A0, #2CB5A0)';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });

    // ─── Smooth scroll for anchor links ──────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
