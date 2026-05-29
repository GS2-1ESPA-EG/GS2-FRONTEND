/* OrbitStock — Main JavaScript */

'use strict';

/* ────────────────────────────────────────────────────────────
   STAR FIELD
   ──────────────────────────────────────────────────────────── */
function createStarField() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let raf;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        buildStars();
    }

    function buildStars() {
        stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 7000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x:     Math.random() * canvas.width,
                y:     Math.random() * canvas.height,
                r:     Math.random() * 1.4 + 0.2,
                alpha: Math.random(),
                speed: Math.random() * 0.007 + 0.002,
                dir:   Math.random() > 0.5 ? 1 : -1,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.alpha += s.speed * s.dir;
            if (s.alpha >= 1 || s.alpha <= 0.05) s.dir *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha})`;
            ctx.fill();
        });
        raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            cancelAnimationFrame(raf);
            resize();
            draw();
        }, 150);
    });
}

/* ────────────────────────────────────────────────────────────
   MOBILE NAVIGATION
   ──────────────────────────────────────────────────────────── */
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu   = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('nav-menu--open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.classList.toggle('nav-toggle--open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', e => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });

    function closeMenu() {
        menu.classList.remove('nav-menu--open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('nav-toggle--open');
        document.body.style.overflow = '';
    }
}

/* ────────────────────────────────────────────────────────────
   ACTIVE NAV LINK
   ──────────────────────────────────────────────────────────── */
function setActiveNavLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const match = href === page
            || (page === '' && href === 'index.html')
            || (page === 'index.html' && href === 'index.html');
        if (match) {
            link.classList.add('nav-link--active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/* ────────────────────────────────────────────────────────────
   HEADER SCROLL STYLE
   ──────────────────────────────────────────────────────────── */
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 80);
    }, { passive: true });
}

/* ────────────────────────────────────────────────────────────
   SCROLL-TRIGGERED ANIMATIONS
   ──────────────────────────────────────────────────────────── */
function initScrollAnimations() {
    const els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
}

/* ────────────────────────────────────────────────────────────
   COUNTER ANIMATION
   ──────────────────────────────────────────────────────────── */
function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();
    const isFloat  = String(target).includes('.');
    const decimals = isFloat ? (String(target).split('.')[1] || '').length : 0;

    function ease(t) { return 1 - Math.pow(1 - t, 3); }

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const current  = ease(progress) * target;
        el.textContent = prefix + (decimals
            ? current.toFixed(decimals)
            : Math.round(current).toLocaleString('pt-BR')) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
}

/* ────────────────────────────────────────────────────────────
   PROGRESS BARS
   ──────────────────────────────────────────────────────────── */
function initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill');
    if (!bars.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = (entry.target.dataset.progress || 0) + '%';
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    bars.forEach(b => io.observe(b));
}

/* ────────────────────────────────────────────────────────────
   TABS
   ──────────────────────────────────────────────────────────── */
function initTabs() {
    const btns = document.querySelectorAll('[data-tab-btn]');
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const group  = btn.dataset.tabGroup;
            const target = btn.dataset.tabBtn;

            document.querySelectorAll(`[data-tab-btn][data-tab-group="${group}"]`)
                .forEach(b => b.classList.remove('tab-btn--active'));
            document.querySelectorAll(`[data-tab-panel][data-tab-group="${group}"]`)
                .forEach(p => p.classList.remove('tab-panel--active'));

            btn.classList.add('tab-btn--active');
            const panel = document.querySelector(
                `[data-tab-panel="${target}"][data-tab-group="${group}"]`
            );
            if (panel) panel.classList.add('tab-panel--active');
        });
    });
}

/* ────────────────────────────────────────────────────────────
   INIT
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    createStarField();
    initMobileNav();
    setActiveNavLink();
    initHeaderScroll();
    initScrollAnimations();
    initCounters();
    initProgressBars();
    initTabs();
});
