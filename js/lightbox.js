/* ============================================================
   DELISH — shared lightbox
   Used by the home gallery preview and the Gallery page.
   Keyboard: ← → to navigate, Esc to close. Swipe on touch.
   ============================================================ */
(function () {
  'use strict';

  var items = [];
  var index = 0;
  var el = null;
  var touch = { x0: 0, y0: 0 };

  function build() {
    if (el) return el;
    el = document.createElement('div');
    el.className = 'lightbox';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Image viewer');
    el.innerHTML =
      '<img class="lb-img" alt="" />' +
      '<div class="lb-count"></div>' +
      '<div class="lb-cap"></div>' +
      '<button class="lb-btn lb-prev" aria-label="Previous image">' + chev('left') + '</button>' +
      '<button class="lb-btn lb-next" aria-label="Next image">' + chev('right') + '</button>' +
      '<button class="lb-close" aria-label="Close viewer">&times;</button>';
    document.body.appendChild(el);

    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.classList.contains('lb-close')) close();
      if (e.target.closest('.lb-next')) next();
      if (e.target.closest('.lb-prev')) prev();
    });

    el.addEventListener('touchstart', function (e) {
      touch.x0 = e.changedTouches[0].clientX;
      touch.y0 = e.changedTouches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touch.x0;
      var dy = e.changedTouches[0].clientY - touch.y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next() : prev());
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (!el.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
    return el;
  }

  function chev(dir) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="' +
      (dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6') + '"/></svg>';
  }

  function render() {
    if (!items.length) return;
    var cur = items[index];
    var img = el.querySelector('.lb-img');
    img.src = cur.src;
    img.alt = cur.cap || '';
    el.querySelector('.lb-cap').textContent = cur.cap || '';
    el.querySelector('.lb-count').textContent = (index + 1) + ' / ' + items.length;
  }

  function open(list, start) {
    items = list;
    index = start || 0;
    build();
    render();
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
  function next() { index = (index + 1) % items.length; render(); }
  function prev() { index = (index - 1 + items.length) % items.length; render(); }

  window.DELISH = window.DELISH || {};
  window.DELISH.lightbox = { open: open, close: close, next: next, prev: prev };

  /* Wire up any [data-lightbox] triggers already in the DOM */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-lightbox]') : null;
    if (!t) return;
    var scope = document.querySelector(t.getAttribute('data-lightbox'));
    if (!scope) return;
    e.preventDefault();
    var list = Array.prototype.map.call(scope.querySelectorAll('[data-src], img'), function (img) {
      return { src: img.getAttribute('data-src') || img.currentSrc || img.src, cap: img.getAttribute('data-cap') || img.getAttribute('alt') || '' };
    });
    open(list, Array.prototype.indexOf.call(scope.querySelectorAll('[data-src], img'), t.querySelector('img') || t));
  });
})();
