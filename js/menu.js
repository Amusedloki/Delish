/* ============================================================
   DELISH — Menu page: sticky category filter + animated grid
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var D = window.DELISH || {};

  var grid = document.getElementById('menuGrid');
  var note = document.getElementById('menuNote');
  if (!grid) return;

  var all = DATA.menu || [];

  function apply(cat, btn) {
    var list = (cat === 'All') ? all : all.filter(function (d) { return d.category === cat; });
    D.renderDishes(grid, list, true);
    if (note) {
      note.textContent = (btn ? btn.textContent + ' — ' : '') + list.length + ' dish' + (list.length === 1 ? '' : 'es');
    }
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-cat') || 'All', btn);
    });
  });

  /* initial render */
  var active = document.querySelector('.filter-btn.active');
  apply(active ? active.getAttribute('data-cat') : 'All', active);
})();
