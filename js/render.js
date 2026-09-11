/* ============================================================
   DELISH — shared render helpers
   Dish cards, badges, star ratings, food detail modal, toast
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var D = window.DELISH = window.DELISH || {};
  var fmt = window.formatNaira;

  /* ---------- Lookup ---------- */
  D.dishById = function (id) {
    return (DATA.menu || []).filter(function (d) { return d.id === id; })[0] || null;
  };

  /* ---------- Badges ---------- */
  function badgeCls(tag) {
    var t = String(tag || '').toUpperCase();
    if (t.indexOf('BESTSELLER') > -1) return 'badge--accent';
    if (t.indexOf('CHEF') > -1 || t.indexOf('NEW') > -1) return 'badge--primary';
    if (t.indexOf('VEGETARIAN') > -1) return 'badge--cream';
    return '';
  }
  D.badgeHTML = function (dish) {
    var tags = (dish.tags || []).slice();
    if (dish.bestseller && tags.indexOf('BESTSELLER') === -1) tags.unshift('BESTSELLER');
    return tags.map(function (t) {
      return '<span class="badge ' + badgeCls(t) + '">' + window.escapeHtml(t) + '</span>';
    }).join('');
  };
  D.metaIconsHTML = function (dish) {
    var out = '';
    if (dish.vegetarian) out += '<span class="tag-ico" title="Vegetarian">&#127807;</span>';
    if (dish.spicy) out += '<span class="tag-ico" title="Spice level ' + dish.spicy + '/3">&#128293;</span>';
    return out;
  };
  D.starsHTML = function (n) {
    var s = '';
    for (var i = 1; i <= 5; i++) s += (i <= n ? '\u2605' : '\u2606');
    return '<span class="t-stars" aria-label="' + (n || 0) + ' out of 5 stars">' + s + '</span>';
  };

  /* ---------- Dish card ---------- */
  D.dishCardHTML = function (dish) {
    return (
      '<article class="dish-card reveal" data-id="' + window.escapeHtml(dish.id) + '">' +
        '<div class="dish-media">' +
          '<div class="dish-badges">' + D.badgeHTML(dish) + '</div>' +
          '<img src="' + window.escapeHtml(dish.image) + '" alt="' + window.escapeHtml(dish.name) +
            '" loading="lazy" width="900" height="700">' +
          '<div class="dish-tags">' + D.metaIconsHTML(dish) + '</div>' +
        '</div>' +
        '<div class="dish-body">' +
          '<div class="dish-top">' +
            '<h3 class="dish-name">' + window.escapeHtml(dish.name) + '</h3>' +
            '<span class="dish-price">' + fmt(dish.price) + '</span>' +
          '</div>' +
          '<div class="dish-cat">' + window.escapeHtml(dish.category) + '</div>' +
          '<p class="dish-desc">' + window.escapeHtml(dish.description) + '</p>' +
          '<div class="dish-actions">' +
            '<a class="view-link" href="menu.html" data-notransition>' +
              'View Details <span class="arr">&#8594;</span></a>' +
            '<button class="btn btn--primary btn--sm add-btn" type="button" data-add="' + window.escapeHtml(dish.id) + '">Add to Order</button>' +
            (dish.spicy ? '<span class="dish-spicy">&#128293; ' + dish.spicy + '/3</span>' : '') +
          '</div>' +
        '</div>' +
      '</article>'
    );
  };

  D.renderDishes = function (container, list, animate) {
    if (!container) return;
    container.innerHTML = list.map(function (d, i) {
      var html = D.dishCardHTML(d);
      if (animate) {
        html = html.replace('class="dish-card reveal"',
          'class="dish-card anim-in" style="animation-delay:' + (i * 70) + 'ms"');
      }
      return html;
    }).join('');
    if (!animate) D.refreshReveal();
  };

  /* ---------- Add-to-order delegation (works for every rendered card) ---------- */
  document.addEventListener('click', function (e) {
    var addBtn = e.target.closest ? e.target.closest('[data-add]') : null;
    if (!addBtn) return;
    e.preventDefault();
    e.stopPropagation();
    if (D.cart && D.cart.add) D.cart.add(addBtn.getAttribute('data-add'), 1);
  });

  /* ---------- Food detail modal ---------- */
  var modalEl = null;
  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'modal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Dish details');
    modalEl.innerHTML =
      '<div class="modal-backdrop"></div>' +
      '<div class="modal-panel">' +
        '<div class="modal-media"><img alt="" /></div>' +
        '<div class="modal-body">' +
          '<span class="dish-cat"></span>' +
          '<h3 class="dish-name"></h3>' +
          '<span class="dish-price"></span>' +
          '<p class="modal-desc"></p>' +
          '<div class="modal-sec"><h4>Ingredients</h4><div class="ing-list"></div></div>' +
          '<div class="modal-badges"></div>' +
          '<div class="modal-qty">' +
            '<button class="qty-btn" type="button" data-mqty="-1" aria-label="Decrease quantity">&minus;</button>' +
            '<input class="qty-input" type="number" min="1" max="99" value="1" aria-label="Quantity">' +
            '<button class="qty-btn" type="button" data-mqty="1" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<div class="modal-cta">' +
            '<button class="btn btn--primary modal-add-btn">Add to Order</button>' +
            '<a class="btn btn--ghost-dark" href="contact.html">Reserve a Table</a>' +
          '</div>' +
        '</div>' +
        '<button class="modal-close" aria-label="Close">&times;</button>' +
      '</div>';
    document.body.appendChild(modalEl);

    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl || e.target.classList.contains('modal-backdrop') ||
          e.target.classList.contains('modal-close')) closeModal();
    });
    var mQty = modalEl.querySelector('.qty-input');
    modalEl.querySelectorAll('[data-mqty]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = (parseInt(mQty.value, 10) || 1) + parseInt(b.getAttribute('data-mqty'), 10);
        mQty.value = Math.min(99, Math.max(1, v));
      });
    });
    modalEl.querySelector('.modal-add-btn').addEventListener('click', function () {
      if (currentDish && D.cart && D.cart.add) {
        D.cart.add(currentDish.id, parseInt(mQty.value, 10) || 1);
        closeModal();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
    });
    return modalEl;
  }
  var currentDish = null;
  D.openFoodModal = function (dish) {
    if (!dish) return;
    currentDish = dish;
    var m = ensureModal();
    m.querySelector('.modal-media img').src = dish.image;
    m.querySelector('.modal-media img').alt = dish.name;
    m.querySelector('.dish-cat').textContent = dish.category;
    m.querySelector('.dish-name').textContent = dish.name;
    m.querySelector('.dish-price').textContent = fmt(dish.price);
    m.querySelector('.modal-desc').textContent = dish.description;
    m.querySelector('.qty-input').value = '1';
    var ing = dish.ingredients || (dish.description.split(', ').slice(0, 3));
    m.querySelector('.ing-list').innerHTML = ing.map(function (i) {
      return '<span class="ing-chip">' + window.escapeHtml(i) + '</span>';
    }).join('');
    m.querySelector('.modal-badges').innerHTML = D.badgeHTML(dish) + D.metaIconsHTML(dish).replace(/tag-ico/g, 'tag-ico') ;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    m.querySelector('.modal-close').focus();
  };
  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }
  D.closeFoodModal = closeModal;

  /* Delegated open on dish cards (menu + home + specials) */
  document.addEventListener('click', function (e) {
    var card = e.target.closest ? e.target.closest('.dish-card[data-id]') : null;
    if (!card) return;
    if (e.target.closest('a') || e.target.closest('[data-add]')) return; // let links / add-to-order be
    var dish = D.dishById(card.getAttribute('data-id'));
    if (dish) D.openFoodModal(dish);
  });

  /* ---------- Testimonial carousel (shared) ---------- */
  D.initTestimonialCarousel = function (wrap, items) {
    if (!wrap || !items.length) return null;
    var viewport = wrap.querySelector('.t-viewport');
    var track = wrap.querySelector('.t-track');
    var dotsEl = wrap.querySelector('.t-dots');
    var prev = wrap.querySelector('.t-prev');
    var next = wrap.querySelector('.t-next');
    if (!track || !dotsEl) return null;
    track.innerHTML = items.map(function (t) {
      return '<div class="t-slide">' + D.starsHTML(t.rating) +
        '<p class="t-quote">\u201C' + window.escapeHtml(t.text) + '\u201D</p>' +
        '<div class="t-name">' + window.escapeHtml(t.name) + '</div>' +
        '<div class="t-role">' + window.escapeHtml(t.role) + '</div></div>';
    }).join('');
    dotsEl.innerHTML = items.map(function (_, i) {
      return '<button class="t-dot" aria-label="Show review ' + (i + 1) + '"></button>';
    }).join('');
    var dots = dotsEl.querySelectorAll('.t-dot');
    var cur = 0, timer = null;
    function go(i) {
      cur = (i + items.length) % items.length;
      track.style.transform = 'translateX(-' + cur * 100 + '%)';
      dots.forEach(function (d, j) { d.classList.toggle('active', j === cur); });
    }
    function play() { if (timer) clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 6000); }
    function pause() { if (timer) clearInterval(timer); timer = null; }
    go(0); play();
    if (prev) prev.addEventListener('click', function () { pause(); go(cur - 1); play(); });
    if (next) next.addEventListener('click', function () { pause(); go(cur + 1); play(); });
    dots.forEach(function (d, j) {
      d.addEventListener('click', function () { pause(); go(j); play(); });
    });
    wrap.addEventListener('mouseenter', pause);
    wrap.addEventListener('mouseleave', play);
    var x0 = null;
    if (viewport) {
      viewport.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
      viewport.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 48) (dx < 0 ? next.click() : prev.click());
        x0 = null;
      }, { passive: true });
    }
    return { go: go };
  };

  /* ---------- Toast ---------- */
  var toastEl = null;
  D.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);' +
        'background:var(--c-dark);color:#fff;padding:.85rem 1.4rem;border-radius:999px;' +
        'font-size:.9rem;box-shadow:0 18px 40px -18px rgba(0,0,0,.6);z-index:1800;opacity:0;' +
        'transition:opacity .3s,transform .3s;max-width:min(92vw,480px);text-align:center;pointer-events:none;';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function () {
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3400);
  };
})();
