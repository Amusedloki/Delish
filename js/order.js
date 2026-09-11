/* ============================================================
   DELISH — Order page: summary, validation, WhatsApp hand-off
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var O = DATA.order || {};
  var D = window.DELISH = window.DELISH || {};
  var esc = window.escapeHtml;
  var fmt = window.formatNaira;

  var summary = document.getElementById('summaryBody');
  if (!summary) return;

  var C = DATA.contact || {};
  var form = document.getElementById('orderForm');

  /* ---------- Info strip ---------- */
  var etaEl = document.getElementById('orderEta');
  if (etaEl && O.prepMinutes) etaEl.textContent = '~' + O.prepMinutes + ' min';
  var feeEl = document.getElementById('orderFee');
  if (feeEl) {
    feeEl.textContent = O.deliveryFee ? fmt(O.deliveryFee) + ' delivery' : 'Free delivery';
  }
  var freeEl = document.getElementById('orderFreeOver');
  if (freeEl && O.freeDeliveryOver) {
    freeEl.textContent = 'Free over ' + fmt(O.freeDeliveryOver);
  }

  /* ---------- Area dropdown ---------- */
  var areaSel = document.getElementById('oArea');
  if (areaSel && O.areas) {
    O.areas.forEach(function (a) {
      var opt = document.createElement('option');
      opt.textContent = a;
      areaSel.appendChild(opt);
    });
  }

  /* ---------- Delivery / pickup toggle ---------- */
  var addressField = document.getElementById('addressField');
  var areaField = document.getElementById('areaField');
  function syncType() {
    var picked = document.querySelector('input[name="otype"]:checked');
    var isDelivery = !picked || picked.value === 'Delivery';
    addressField.style.display = isDelivery ? '' : 'none';
    areaField.style.display = isDelivery ? '' : 'none';
    document.getElementById('oAddress').required = isDelivery;
    areaSel.required = isDelivery;
  }
  form.addEventListener('change', function (e) {
    if (e.target.name === 'otype') syncType();
  });
  syncType();

  /* ---------- Summary rendering ---------- */
  function fee(subtotal) {
    return (O.freeDeliveryOver && subtotal >= O.freeDeliveryOver) ? 0 : (O.deliveryFee || 0);
  }

  function renderSummary() {
    var items = D.cart.items();
    if (!items.length) {
      summary.innerHTML =
        '<div class="order-empty">' +
          '<div class="cart-empty-ico"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/><path d="M2.5 3h2l2.4 12.4a1.8 1.8 0 0 0 1.8 1.6h9.2a1.8 1.8 0 0 0 1.8-1.5L21.5 7H6"/></svg></div>' +
          '<p><strong>Your order is empty.</strong></p>' +
          '<p>Add some dishes and come back to check out.</p>' +
          '<a class="btn btn--primary btn--sm" href="menu.html" data-notransition>Browse the Menu</a>' +
        '</div>';
      return;
    }
    var rows = items.map(function (it) {
      var d = D.dishById(it.id);
      if (!d) return '';
      return '<div class="cart-line" data-id="' + esc(d.id) + '">' +
        '<img class="cart-line-img" src="' + esc(d.image) + '" alt="" width="56" height="56" loading="lazy">' +
        '<div class="cart-line-info">' +
          '<span class="cart-line-name">' + esc(d.name) + '</span>' +
          '<span class="cart-line-price">' + fmt(d.price) + ' &times; ' + it.qty + '</span>' +
        '</div>' +
        '<span class="cart-line-total">' + fmt(d.price * it.qty) + '</span>' +
      '</div>';
    }).join('');

    var subtotal = D.cart.subtotal();
    var f = fee(subtotal);
    var belowMin = O.minOrder && subtotal < O.minOrder;

    summary.innerHTML = rows +
      '<div class="cart-totals">' +
        '<div><span>Subtotal</span><span>' + fmt(subtotal) + '</span></div>' +
        '<div><span>Delivery</span><span>' + (f ? fmt(f) : 'Free') + '</span></div>' +
        '<div class="cart-grand"><span>Total</span><span>' + fmt(subtotal + f) + '</span></div>' +
      '</div>' +
      (belowMin
        ? '<p class="cart-minnote">Minimum order is ' + fmt(O.minOrder) + ' \u2014 add ' + fmt(O.minOrder - subtotal) + ' more.</p>'
        : '<button class="btn wa-btn btn--block" type="submit" form="orderForm">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-3px;margin-right:8px" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2z"/><path d="M8.6 7.3c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l1 2.3c.1.3 0 .5-.1.7l-.5.7c-.2.2-.3.4-.1.7.7 1.2 1.9 2.2 3 2.8.3.2.5.1.7-.1l.6-.7c.2-.2.4-.3.7-.2l2.3 1.1c.3.2.5.3.5.5s0 .9-.3 1.3c-.3.4-.9.9-1.6.9-2.4-.1-5.5-1.9-7.2-4.4-1.1-1.6-1.6-3-1.6-4.2 0-.7.3-1.1.6-1.4z" fill="#fff"/></svg>' +
            'Send Order via WhatsApp' +
          '</button>') +
      '<p class="order-note">' + esc(O.note || 'Our team will confirm your order by phone or WhatsApp.') + '</p>' +
      '<div class="cart-foot-links" style="justify-content:center">' +
        '<button class="cart-clear" type="button" id="clearOrder">Clear order</button>' +
      '</div>';
  }
  renderSummary();

  summary.addEventListener('click', function (e) {
    if (e.target.closest('#clearOrder')) {
      D.cart.clear();
      renderSummary();
    }
  });

  /* ---------- Validation ---------- */
  var FIELDS = [
    { id: 'oName', test: function (v) { return v.trim().length >= 2; }, msg: 'Please enter your full name.' },
    { id: 'oPhone', test: function (v) { return v.replace(/\D/g, '').length >= 7; }, msg: 'Please enter a valid phone number.' },
    { id: 'oAddress', test: function (v) { return v.trim().length >= 8; }, msg: 'Please enter your delivery address.' },
    { id: 'oArea', test: function (v) { return !!v; }, msg: 'Please select your area.' }
  ];

  /* ---------- Submit → WhatsApp ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!D.cart.items().length) {
      D.toast('Your order is empty — add some dishes first.');
      return;
    }
    var subtotal = D.cart.subtotal();
    if (O.minOrder && subtotal < O.minOrder) {
      D.toast('Minimum order is ' + fmt(O.minOrder) + '.');
      return;
    }

    var valid = true;
    FIELDS.forEach(function (f) {
      var input = document.getElementById(f.id);
      var field = input.closest('.field');
      var required = !input.disabled && input.offsetParent !== null; // skip hidden (pickup)
      var ok = !required || f.test(input.value || '');
      field.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      D.toast('Please complete the highlighted fields.');
      var firstBad = form.querySelector('.field.invalid input, .field.invalid select');
      if (firstBad) firstBad.focus();
      return;
    }

    var picked = document.querySelector('input[name="otype"]:checked');
    var msg = D.buildOrderMessage({
      type: picked ? picked.value : 'Delivery',
      name: document.getElementById('oName').value.trim(),
      phone: document.getElementById('oPhone').value.trim(),
      address: document.getElementById('oAddress').value.trim(),
      area: areaSel.value,
      when: document.getElementById('oWhen').value.trim(),
      notes: document.getElementById('oNotes').value.trim()
    });
    window.location.href = D.whatsappOrderLink(msg);
  });

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('invalid')) field.classList.remove('invalid');
  });
})();
