/* ============================================================
   DELISH — Specials page: today's special, picks, limited offers
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var D = window.DELISH || {};
  var esc = window.escapeHtml;

  var S = DATA.specials || {};

  /* Today's special (hero feature) */
  if (S.today) {
    var feat = document.getElementById('specialFeature');
    if (feat) {
      var bg = feat.querySelector('.bg img');
      if (bg) bg.src = S.today.image;
      var chip = feat.querySelector('.special-chip');
      if (chip) chip.textContent = S.today.tag;
      var h2 = feat.querySelector('h2');
      if (h2) h2.textContent = S.today.name;
      var p = feat.querySelector('p');
      if (p) p.textContent = S.today.desc;
      var price = feat.querySelector('.strip-price');
      if (price) price.textContent = window.formatNaira(S.today.price);
    }
  }

  /* Chef's picks + seasonal favorites (reuse menu grid) */
  function fill(id, ids) {
    var el = document.getElementById(id);
    if (!el) return;
    D.renderDishes(el, ids.map(D.dishById).filter(Boolean), false);
  }
  fill('chefsGrid', S.chefsPicks || []);
  fill('seasonalGrid', S.seasonal || []);

  /* Limited-time experiences */
  var lim = document.getElementById('limitedGrid');
  if (lim && S.limited) {
    lim.innerHTML = S.limited.map(function (x) {
      return '<article class="limited-card reveal">' +
        '<img src="' + esc(x.image) + '" alt="' + esc(x.name) + '" loading="lazy">' +
        '<div class="hero-overlay"></div>' +
        '<div class="content">' +
          '<span class="special-chip">' + esc(x.tag) + '</span>' +
          '<h3>' + esc(x.name) + '</h3>' +
          '<p>' + esc(x.desc) + '</p>' +
        '</div>' +
        '</article>';
    }).join('');
    D.refreshReveal();
  }
})();
