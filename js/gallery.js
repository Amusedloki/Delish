/* ============================================================
   DELISH — Gallery page: filter + masonry + lightbox
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var D = window.DELISH || {};
  var esc = window.escapeHtml;

  var masonry = document.getElementById('masonry');
  if (!masonry) return;

  var all = DATA.gallery || [];
  var current = all;

  function itemHTML(g) {
    return '<figure class="m-item" tabindex="0" role="button" aria-label="Open image: ' + esc(g.cap) + '">' +
      '<img src="' + esc(g.src) + '" alt="' + esc(g.cap) + '" loading="lazy">' +
      '<figcaption class="g-overlay"><span class="g-cap">' + esc(g.cap) + '</span>' +
      '<span class="g-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></span></figcaption>' +
      '</figure>';
  }

  function render(list) {
    current = list;
    masonry.innerHTML = list.map(function (g, i) {
      return itemHTML(g).replace('<figure class="m-item"',
        '<figure class="m-item anim-in" style="animation-delay:' + (i * 60) + 'ms"');
    }).join('');
  }

  function openAt(i) {
    if (D.lightbox) D.lightbox.open(current.map(function (g) { return { src: g.src, cap: g.cap }; }), i);
  }

  masonry.addEventListener('click', function (e) {
    var fig = e.target.closest('.m-item');
    if (fig) openAt(Array.prototype.indexOf.call(masonry.children, fig));
  });
  masonry.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var fig = e.target.closest('.m-item');
    if (fig) { e.preventDefault(); openAt(Array.prototype.indexOf.call(masonry.children, fig)); }
  });

  /* categories derived from data */
  var cats = ['All'];
  all.forEach(function (g) {
    if (cats.indexOf(g.cat) === -1) cats.push(g.cat);
  });
  var bar = document.getElementById('galleryFilter');
  bar.innerHTML = cats.map(function (c) {
    return '<button class="filter-btn' + (c === 'All' ? ' active' : '') + '" data-cat="' + esc(c) + '" aria-pressed="' + (c === 'All') + '">' + esc(c) + '</button>';
  }).join('');

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    var cat = btn.getAttribute('data-cat');
    bar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
    render(cat === 'All' ? all : all.filter(function (g) { return g.cat === cat; }));
  });

  render(all);
})();
