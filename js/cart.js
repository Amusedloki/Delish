/* ============================================================
   DELISH — Online ordering
   Cart store (localStorage), header cart button, slide-in cart
   drawer injected on every page, WhatsApp checkout hand-off.
   NOTE: WhatsApp checkout sends a structured order summary to the
   restaurant's WhatsApp — no customer payment is handled here.
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.DELISH_DATA || {};
  var O = DATA.order || {};
  var D = window.DELISH = window.DELISH || {};
  var esc = window.escapeHtml;
  var fmt = window.formatNaira;

  var CART_KEY = 'delish.cart.v1';
  var WA_LINK = 'https://wa.me/' + String(O.whatsapp || '').replace(/\D/g, '');

  /* ================= Cart store ================= */
  var items = load();

  function load() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(function (it) {
        return it && it.id && it.qty > 0;
      }) : [];
    } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* private mode */ }
  }
  function findItem(id) {
    for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
    return null;
  }
  function dish(id) { return D.dishById ? D.dishById(id) : null; }

  function emit() {
    save();
    render();
    updateBadge();
  }

  D.cart = {
    add: function (id, qty) {
      var d = dish(id);
      if (!d) return;
      var q = Math.max(1, parseInt(qty || 1, 10) || 1);
      var it = findItem(id);
      if (it) it.qty = Math.min(99, it.qty + q);
      else items.push({ id: id, qty: q });
      emit();
      openDrawer();
      D.toast(d.name + ' added to your order');
    },
    setQty: function (id, qty) {
      var it = findItem(id);
      if (!it) return;
      var q = parseInt(qty, 10);
      if (isNaN(q) || q <= 0) items = items.filter(function (x) { return x.id !== id; });
      else it.qty = Math.min(99, q);
      emit();
    },
    remove: function (id) {
      items = items.filter(function (x) { return x.id !== id; });
      emit();
    },
    clear: function () { items = []; emit(); },
    count: function () { return items.reduce(function (n, it) { return n + it.qty; }, 0); },
    subtotal: function () {
      return items.reduce(function (sum, it) {
        var d = dish(it.id);
        return d ? sum + d.price * it.qty : sum;
      }, 0);
    },
    items: function () { return items.slice(); }
  };

  /* ================= Header cart button ================= */
  function ensureCartBtn() {
    var header = document.querySelector('.site-header .header-inner');
    if (!header || document.getElementById('cartBtn')) return;
    var btn = document.createElement('button');
    btn.className = 'cart-btn';
    btn.id = 'cartBtn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open your order');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="9" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/>' +
      '<path d="M2.5 3h2l2.4 12.4a1.8 1.8 0 0 0 1.8 1.6h9.2a1.8 1.8 0 0 0 1.8-1.5L21.5 7H6"/></svg>' +
      '<span class="cart-count" id="cartCount" aria-live="polite">0</span>';
    btn.addEventListener('click', openDrawer);
    var toggle = document.getElementById('navToggle');
    if (toggle && toggle.parentNode === header) header.insertBefore(btn, toggle);
    else header.appendChild(btn);
  }

  function updateBadge() {
    var el = document.getElementById('cartCount');
    if (!el) return;
    var n = D.cart.count();
    el.textContent = n > 99 ? '99+' : String(n);
    el.classList.toggle('show', n > 0);
    var btn = document.getElementById('cartBtn');
    if (btn) btn.classList.toggle('has-items', n > 0);
  }

  /* ================= Drawer ================= */
  var drawer = null, backdrop = null, lastFocus = null;

  function ensureDrawer() {
    if (drawer) return;
    backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.hidden = true;
    drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.hidden = true;
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Your order');
    drawer.innerHTML =
      '<div class="cart-head">' +
        '<h3>Your Order</h3>' +
        '<button class="cart-close" id="cartClose" type="button" aria-label="Close cart">&times;</button>' +
      '</div>' +
      '<div class="cart-body" id="cartBody"></div>' +
      '<div class="cart-foot" id="cartFoot"></div>';
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('#cartClose')) return close();
      var btn = e.target.closest('[data-cart]');
      if (!btn) return;
      var act = btn.getAttribute('data-cart');
      var id = btn.getAttribute('data-id') || '';
      var wrap = btn.closest('.cart-line');
      var input = wrap ? wrap.querySelector('.qty-input') : null;
      var cur = input ? parseInt(input.value, 10) || 0 : 0;
      if (act === 'inc') D.cart.setQty(id, cur + 1);
      else if (act === 'dec') D.cart.setQty(id, cur - 1);
      else if (act === 'rm') D.cart.remove(id);
      else if (act === 'clear') D.cart.clear();
      else if (act === 'checkout') window.location.href = 'order.html';
    });
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && !drawer.hidden) close();
    });
  }

  function openDrawer() {
    ensureDrawer();
    lastFocus = document.activeElement;
    drawer.hidden = false;   // unhide BEFORE render() — render skips a hidden drawer
    backdrop.hidden = false;
    render();
    requestAnimationFrame(function () {
      drawer.classList.add('open');
      backdrop.classList.add('show');
      var c = document.getElementById('cartClose');
      if (c) c.focus();
    });
  }
  function close() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    setTimeout(function () {
      drawer.hidden = true;
      backdrop.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 300);
  }
  D.openCart = openDrawer;
  D.closeCart = close;

  /* ================= Drawer rendering ================= */
  function lineHTML(it) {
    var d = dish(it.id);
    if (!d) return '';
    return (
      '<div class="cart-line" data-id="' + esc(d.id) + '">' +
        '<img class="cart-line-img" src="' + esc(d.image) + '" alt="" width="64" height="64" loading="lazy">' +
        '<div class="cart-line-info">' +
          '<span class="cart-line-name">' + esc(d.name) + '</span>' +
          '<span class="cart-line-price">' + fmt(d.price) + '</span>' +
          '<div class="qty-row">' +
            '<button class="qty-btn" type="button" data-cart="dec" data-id="' + esc(d.id) + '" aria-label="Decrease quantity">&minus;</button>' +
            '<input class="qty-input" type="number" min="1" max="99" value="' + it.qty + '" aria-label="Quantity for ' + esc(d.name) + '">' +
            '<button class="qty-btn" type="button" data-cart="inc" data-id="' + esc(d.id) + '" aria-label="Increase quantity">+</button>' +
            '<button class="cart-rm" type="button" data-cart="rm" data-id="' + esc(d.id) + '" aria-label="Remove ' + esc(d.name) + '">Remove</button>' +
          '</div>' +
        '</div>' +
        '<span class="cart-line-total">' + fmt(d.price * it.qty) + '</span>' +
      '</div>'
    );
  }

  function render() {
    if (!drawer || drawer.hidden) return;
    var body = document.getElementById('cartBody');
    var foot = document.getElementById('cartFoot');
    if (!body || !foot) return;

    if (!items.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
          '<div class="cart-empty-ico"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/><path d="M2.5 3h2l2.4 12.4a1.8 1.8 0 0 0 1.8 1.6h9.2a1.8 1.8 0 0 0 1.8-1.5L21.5 7H6"/></svg></div>' +
          '<p><strong>Your order is empty.</strong></p>' +
          '<p>Browse the menu and add something delicious.</p>' +
          '<a class="btn btn--primary btn--sm" href="menu.html" data-notransition>View the Menu</a>' +
        '</div>';
      foot.innerHTML = '';
      return;
    }

    var subtotal = D.cart.subtotal();
    var fee = (O.freeDeliveryOver && subtotal >= O.freeDeliveryOver) ? 0 : (O.deliveryFee || 0);
    var belowMin = O.minOrder && subtotal < O.minOrder;
    var missing = O.freeDeliveryOver ? Math.max(0, O.freeDeliveryOver - subtotal) : 0;

    body.innerHTML =
      '<div class="cart-lines">' + items.map(lineHTML).join('') + '</div>' +
      (missing > 0
        ? '<p class="cart-nudge">Add ' + fmt(missing) + ' more for free delivery.</p>'
        : '<p class="cart-nudge ok">You\u2019ve unlocked free delivery.</p>');

    foot.innerHTML =
      '<div class="cart-totals">' +
        '<div><span>Subtotal</span><span>' + fmt(subtotal) + '</span></div>' +
        '<div><span>Delivery</span><span>' + (fee ? fmt(fee) : 'Free') + '</span></div>' +
        '<div class="cart-grand"><span>Total</span><span>' + fmt(subtotal + fee) + '</span></div>' +
      '</div>' +
      (belowMin
        ? '<p class="cart-minnote">Minimum order is ' + fmt(O.minOrder) + ' \u2014 add ' + fmt(O.minOrder - subtotal) + ' more to check out.</p>' +
          '<button class="btn btn--dark btn--block" type="button" disabled>Minimum order not reached</button>'
        : '<a class="btn btn--primary btn--block" href="order.html" data-notransition data-cart="checkout">Checkout <span class="arr">&#8594;</span></a>') +
      '<div class="cart-foot-links">' +
        '<button class="cart-clear" type="button" data-cart="clear">Clear order</button>' +
        '<span class="cart-eta">\u23F1 ' + (O.prepMinutes || 35) + ' min prep \u00B7 pay on delivery</span>' +
      '</div>';
  }

  /* ================= Order note for WhatsApp ================= */
  D.buildOrderMessage = function (form) {
    var f = form || {};
    var lines = [];
    lines.push('NEW ORDER \u2014 ' + (DATA.contact ? DATA.contact.name : 'Delish'));
    lines.push('');
    lines.push('ITEMS');
    items.forEach(function (it) {
      var d = dish(it.id);
      if (d) lines.push('\u2022 ' + d.name + ' x' + it.qty + ' \u2014 ' + fmt(d.price * it.qty));
    });
    var subtotal = D.cart.subtotal();
    var fee = (O.freeDeliveryOver && subtotal >= O.freeDeliveryOver) ? 0 : (O.deliveryFee || 0);
    lines.push('');
    lines.push('Subtotal: ' + fmt(subtotal));
    lines.push('Delivery: ' + (fee ? fmt(fee) : 'Free'));
    lines.push('TOTAL: ' + fmt(subtotal + fee));
    if (f.type) lines.push('Type: ' + f.type);
    if (f.name) lines.push('Name: ' + f.name);
    if (f.phone) lines.push('Phone: ' + f.phone);
    if (f.address) lines.push('Address: ' + f.address);
    if (f.area) lines.push('Area: ' + f.area);
    if (f.when) lines.push('Preferred: ' + f.when);
    if (f.notes) lines.push('Notes: ' + f.notes);
    lines.push('');
    lines.push('Sent from ' + (window.location.origin && window.location.origin.indexOf('http') === 0 ? window.location.origin : 'the Delish website'));
    return lines.join('\n');
  };

  D.whatsappOrderLink = function (msg) {
    return WA_LINK + '?text=' + encodeURIComponent(msg || 'Hello ' + (DATA.contact ? DATA.contact.name : 'Delish') + ', I\u2019d like to place an order.');
  };

  /* ================= Boot ================= */
  ensureCartBtn();
  updateBadge();
})();
