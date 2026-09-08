(function () {
  'use strict';
  var DATA = window.DELISH_DATA || {};
  var esc = window.escapeHtml;

  var C = DATA.contact || {};
  var setText = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
  setText('cAddress', C.address || '');
  var phoneEl = document.getElementById('cPhone');
  if (phoneEl) { phoneEl.textContent = C.phone || ''; phoneEl.href = 'tel:' + (C.phoneHref || ''); }
  var mailEl = document.getElementById('cEmail');
  if (mailEl) { mailEl.textContent = C.email || ''; mailEl.href = 'mailto:' + (C.email || ''); }
  var hoursEl = document.getElementById('cHours');
  if (hoursEl && C.hours) {
    hoursEl.innerHTML = C.hours.map(function (h) {
      return '<li><span class="day">' + esc(h.day) + '</span><span class="time">' + esc(h.time) + '</span></li>';
    }).join('');
  }
  var mapFrame = document.getElementById('mapFrame');
  if (mapFrame && C.mapEmbed) mapFrame.src = C.mapEmbed;
  var dirBtn = document.getElementById('directionsBtn');
  if (dirBtn && C.directionsUrl) dirBtn.href = C.directionsUrl;

  var form = document.getElementById('reservationForm');
  if (!form) return;

  var FIELDS = [
    { id: 'rName',  test: function (v) { return v.trim().length >= 2; },            msg: 'Please enter your full name.' },
    { id: 'rPhone', test: function (v) { return v.replace(/\D/g, '').length >= 7; }, msg: 'Please enter a valid phone number.' },
    { id: 'rEmail', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: 'Please enter a valid email address.' },
    { id: 'rDate',  test: function (v) { return !!v && new Date(v) >= new Date(new Date().toDateString()); }, msg: 'Please choose today or a future date.' },
    { id: 'rTime',  test: function (v) { return !!v; },                             msg: 'Please choose a preferred time.' },
    { id: 'rGuests',test: function (v) { var n = parseInt(v, 10); return n >= 1 && n <= 30; }, msg: 'Please enter a guest count between 1 and 30.' }
  ];

  var msgBox = document.getElementById('formMsg');

  function showMsg(type, text) {
    msgBox.className = 'form-msg show form-msg--' + type;
    msgBox.querySelector('.msg-text').textContent = text;
    msgBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    FIELDS.forEach(function (f) {
      var input = document.getElementById(f.id);
      var ok = f.test(input.value);
      input.closest('.field').classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      showMsg('error', 'Please fix the highlighted fields and try again.');
      var firstBad = form.querySelector('.field.invalid input, .field.invalid select');
      if (firstBad) firstBad.focus();
      return;
    }

    showMsg('success', 'Thank you — your reservation request has been received. Our team will confirm by phone or email shortly.');
    form.reset();
  });

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('invalid')) field.classList.remove('invalid');
  });
})();
