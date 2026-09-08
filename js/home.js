/* ============================================================
   DELISH — Home page behaviors
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var D = window.DELISH || {};
  var esc = window.escapeHtml;
  var fmt = window.formatNaira;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero background slideshow ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  if (slides.length > 1) {
    var cur = 0, timer = null, SLIDE_MS = 5200;
    function show(i) {
      slides[cur].classList.remove('active');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('active');
      var img = slides[cur].querySelector('img');
      if (img && !reduceMotion) {          // restart Ken Burns per slide
        img.style.animation = 'none';
        void img.offsetWidth;
        img.style.animation = '';
      }
    }
    function play() { if (timer) return; timer = setInterval(function () { show(cur + 1); }, SLIDE_MS); }
    function pause() { clearInterval(timer); timer = null; }
    slides[cur].classList.add('active');
    play();
    var hero = document.getElementById('homeHero');
    if (hero) {
      hero.addEventListener('mouseenter', pause);
      hero.addEventListener('mouseleave', play);
    }
    /* subtle parallax on the hero background */
    if (!reduceMotion) {
      window.addEventListener('scroll', function () {
        var y = window.scrollY || window.pageYOffset;
        if (y > window.innerHeight) return;
        slides.forEach(function (s) { s.style.transform = 'translateY(' + (y * 0.16) + 'px)'; });
      }, { passive: true });
    }
  }

  /* ---------- Featured dishes ---------- */
  var featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    D.renderDishes(featuredGrid, DATA.menu.filter(function (d) { return d.featured; }).slice(0, 6), false);
  }

  /* ---------- Dark menu strip ---------- */
  var stripTrack = document.getElementById('stripTrack');
  if (stripTrack) {
    var best = DATA.menu.filter(function (d) { return d.bestseller; }).slice(0, 8);
    stripTrack.innerHTML = best.map(function (d, i) {
      return '<div class="strip-card">' +
        '<span class="strip-no">0' + (i + 1) + '</span>' +
        '<span class="strip-name">' + esc(d.name) + '</span>' +
        '<span class="strip-desc">' + esc(d.description) + '</span>' +
        '<span class="strip-price">' + fmt(d.price) + '</span>' +
        '</div>';
    }).join('');
    function nudge(dir) {
      stripTrack.scrollBy({ left: dir * 340, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    var p = document.getElementById('stripPrev');
    var n = document.getElementById('stripNext');
    if (p) p.addEventListener('click', function () { nudge(-1); });
    if (n) n.addEventListener('click', function () { nudge(1); });
  }

  /* ---------- Testimonial carousel ---------- */
  var tCar = document.getElementById('tCarousel');
  if (tCar && D.initTestimonialCarousel) {
    D.initTestimonialCarousel(tCar, DATA.testimonials || []);
  }

  /* ---------- Gallery preview + lightbox ---------- */
  var gGrid = document.getElementById('galleryGrid');
  if (gGrid) {
    var subset = DATA.gallery.slice(0, 8);
    var spans = ['g-item--wide', '', 'g-item--tall', '', '', 'g-item--tall', 'g-item--wide', ''];
    gGrid.innerHTML = subset.map(function (g, i) {
      return '<figure class="g-item ' + (spans[i] || '') + '" tabindex="0" role="button" ' +
        'aria-label="Open image: ' + esc(g.cap) + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.cap) + '" loading="lazy">' +
        '<figcaption class="g-overlay"><span class="g-cap">' + esc(g.cap) + '</span>' +
        '<span class="g-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></span></figcaption>' +
        '</figure>';
    }).join('');
    var openAt = function (i) {
      if (D.lightbox) D.lightbox.open(subset.map(function (g) { return { src: g.src, cap: g.cap }; }), i);
    };
    gGrid.addEventListener('click', function (e) {
      var fig = e.target.closest('.g-item');
      if (fig) openAt(Array.prototype.indexOf.call(gGrid.children, fig));
    });
    gGrid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var fig = e.target.closest('.g-item');
      if (fig) { e.preventDefault(); openAt(Array.prototype.indexOf.call(gGrid.children, fig)); }
    });
  }

  /* ---------- Location / visit ---------- */
  var C = DATA.contact || {};
  var set = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
  var addrEl = document.getElementById('locAddress');
  if (addrEl) addrEl.textContent = C.address || '';
  var phoneEl = document.getElementById('locPhone');
  if (phoneEl) { phoneEl.textContent = C.phone || ''; phoneEl.href = 'tel:' + (C.phoneHref || ''); }
  var mailEl = document.getElementById('locEmail');
  if (mailEl) { mailEl.textContent = C.email || ''; mailEl.href = 'mailto:' + (C.email || ''); }
  var hoursEl = document.getElementById('hoursList');
  if (hoursEl && C.hours) {
    hoursEl.innerHTML = C.hours.map(function (h) {
      return '<li><span class="day">' + esc(h.day) + '</span><span class="time">' + esc(h.time) + '</span></li>';
    }).join('');
  }

  /* ---------- Final CTA parallax ---------- */
  var finalBg = document.querySelector('.final-cta .bg');
  if (finalBg && !reduceMotion) {
    window.addEventListener('scroll', function () {
      var r = finalBg.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      finalBg.style.transform = 'translateY(' + ((window.scrollY || 0) * 0.12) + 'px)';
    }, { passive: true });
  }
})();
