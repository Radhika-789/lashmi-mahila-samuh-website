/* ============================================================
   main.js — Lashmi Mahila Samuh
   Handles: Navbar scroll, mobile menu, FAQ accordion,
            scroll animations, counter animation, active nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAVBAR — scroll background + active link highlight
  ---------------------------------------------------------- */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    // Toggle scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section link
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar(); // run once on load


  /* ----------------------------------------------------------
     2. MOBILE HAMBURGER MENU
  ---------------------------------------------------------- */
  const hamburger    = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });


  /* ----------------------------------------------------------
     3. FAQ ACCORDION
  ---------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => i.classList.remove('open'));

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });


  /* ----------------------------------------------------------
     4. SCROLL ANIMATIONS — Intersection Observer
  ---------------------------------------------------------- */
  const animateEls = document.querySelectorAll('[data-animate]');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

        setTimeout(() => {
          el.classList.add('animated');
        }, delay);

        animationObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  animateEls.forEach(el => animationObserver.observe(el));


  /* ----------------------------------------------------------
     5. COUNTER ANIMATION — animates stat numbers up
  ---------------------------------------------------------- */
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  let countersStarted = false;

  function animateCounter(el, target, duration = 1800) {
    const start     = performance.now();
    const isLarge   = target >= 1000;
    const increment = isLarge ? Math.ceil(target / 80) : 1;

    function update(time) {
      const elapsed  = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);

      el.textContent = isLarge ? current.toLocaleString('en-IN') : current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isLarge ? target.toLocaleString('en-IN') : target;
      }
    }
    requestAnimationFrame(update);
  }

  const statsSection  = document.querySelector('.stats-grid');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach(el => {
          const target = parseInt(el.dataset.count);
          animateCounter(el, target);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) counterObserver.observe(statsSection);


  /* ----------------------------------------------------------
     6. SMOOTH SCROLL — for all anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------------------------------
     7. HERO PARALLAX — subtle background movement on scroll
  ---------------------------------------------------------- */
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

});
