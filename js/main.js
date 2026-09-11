/* ============================================================
   DELISH — shared global behaviors
   Header, mobile nav, page transitions, scroll reveal,
   scroll progress, back-to-top, custom cursor, image fallback
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.DELISH_DATA || {};
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Format helpers ---------- */
  window.formatNaira = function (n) {
    return '\u20A6' + Number(n || 0).toLocaleString('en-NG');
  };
  window.escapeHtml = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* ---------- Image fallback (hotlink-safe) ---------- */
  var FALLBACK = (DATA.fallbackImg || '');
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.getAttribute('data-fbk') && FALLBACK) {
      t.setAttribute('data-fbk', '1');
      t.src = FALLBACK;
    }
  }, true);

  /* ---------- Page fade-in / fade-out transitions ---------- */
  document.documentElement.classList.add('js');
  function ready() {
    document.body.classList.add('is-ready');
    document.querySelectorAll('.hero-content').forEach(function (hc) {
      Array.prototype.forEach.call(hc.children, function (c, i) {
        c.style.transitionDelay = (0.1 + i * 0.12) + 's';
      });
      hc.classList.add('in');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

  if (!reduceMotion) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      if (a.target && a.target !== '_self') return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 ||
          href.indexOf('tel:') === 0 || href.indexOf('http') === 0) return;
      if (a.hasAttribute('data-notransition')) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(function () { window.location.href = a.href; }, 280);
    }, true);
  }

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    var bar = document.getElementById('scrollProgress');
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    }
    var top = document.getElementById('toTop');
    if (top) top.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile navigation ---------- */
  /* NOTE: the CSS shows the overlay via .mobile-nav.open, so the .open
     class must be kept in sync with body.nav-open or the menu never appears. */
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var closeBtn = document.getElementById('navClose');
  function openNav() {
    document.body.classList.add('nav-open');
    if (mobileNav) mobileNav.classList.add('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }
  }
  function closeNav() {
    document.body.classList.remove('nav-open');
    if (mobileNav) mobileNav.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }
  if (toggle) toggle.addEventListener('click', function () {
    document.body.classList.contains('nav-open') ? closeNav() : openNav();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }
  window.DELISH = window.DELISH || {};
  window.DELISH.closeNav = closeNav;

  /* ---------- Scroll reveal + stagger ---------- */
  var revealObs = null;
  function initReveal(scope) {
    var root = scope || document;
    if (!('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    if (!revealObs) {
      revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            revealObs.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    root.querySelectorAll('.reveal').forEach(function (el) {
      if (!el.classList.contains('in')) revealObs.observe(el);
    });
    root.querySelectorAll('.stagger').forEach(function (group) {
      group.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = (i * 90) + 'ms';
      });
    });
  }
  window.DELISH = window.DELISH || {};
  window.DELISH.refreshReveal = function () { initReveal(document); };
  initReveal(document);

  /* ---------- Custom cursor (desktop only) ---------- */
  var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (finePointer && !reduceMotion) {
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.id = 'cursorDot'; ring.id = 'cursorRing';
    dot.style.opacity = '0'; ring.style.opacity = '0';
    document.body.appendChild(dot); document.body.appendChild(ring);
    document.body.classList.add('cursor-on');
    var mx = -100, my = -100, rx = -100, ry = -100, raf = null, seen = false;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!seen) { seen = true; dot.style.opacity = '1'; ring.style.opacity = '1'; }
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      if (!raf) {
        raf = requestAnimationFrame(function loop() {
          rx += (mx - rx) * 0.42;   // tight follow — barely trails
          ry += (my - ry) * 0.42;
          ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
          raf = null;
        });
      }
    }, { passive: true });
    /* fade out when the mouse leaves the window */
    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity = '1'; ring.style.opacity = '1';
    });
    var hoverSel = 'a, button, .dish-card, .g-item, .m-item, .strip-card, .t-btn, .lb-btn, input, select, textarea, [data-cursor]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) ring.classList.add('hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) ring.classList.remove('hover');
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
