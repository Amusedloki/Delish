/* ============================================================
   DELISH — Testimonials page: featured carousel + review grid
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var D = window.DELISH || {};
  var esc = window.escapeHtml;

  var reviews = DATA.testimonials || [];

  /* Featured carousel */
  var tCar = document.getElementById('tCarousel');
  if (tCar && D.initTestimonialCarousel) {
    D.initTestimonialCarousel(tCar, reviews);
  }

  /* Review grid */
  var grid = document.getElementById('reviewGrid');
  if (grid && reviews.length) {
    grid.innerHTML = reviews.map(function (r, i) {
      return '<article class="review-card reveal" style="transition-delay:' + (i * 70) + 'ms">' +
        D.starsHTML(r.rating) +
        '<blockquote>\u201C' + esc(r.text) + '\u201D</blockquote>' +
        '<div class="review-head">' +
          '<span class="review-avatar" aria-hidden="true">' + esc(r.name.charAt(0)) + '</span>' +
          '<div class="who"><span class="t-name">' + esc(r.name) + '</span>' +
          '<span class="t-role">' + esc(r.role) + '</span></div>' +
        '</div>' +
        '</article>';
    }).join('');
    D.refreshReveal();
  }
})();
