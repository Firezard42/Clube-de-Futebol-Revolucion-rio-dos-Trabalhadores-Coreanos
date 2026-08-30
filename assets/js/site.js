/* ==========================================================================
   조선 로동자 혁명 축구단 — 공용 스크립트
   Shared retro portal script
   ========================================================================== */
(function () {
  'use strict';

  /* ---- 실시간 시계 (live clock, Pyongyang time label) ---- */
  function tickClock() {
    var el = document.getElementById('gov-clock');
    if (!el) return;
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var jucheYear = now.getFullYear() - 1911; // 주체 연호
    var txt = '주체 ' + jucheYear + '년 · ' +
      (now.getMonth() + 1) + '월 ' + now.getDate() + '일 · ' +
      pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    el.textContent = txt;
  }

  /* ---- 방문자 수 (fake visitor odometer) ---- */
  function visitorCounter() {
    var el = document.getElementById('visitor-count');
    if (!el) return;
    var base = 1852743;
    var key = 'lrhc_visits';
    var v = parseInt(localStorage.getItem(key) || '0', 10);
    v += 1;
    localStorage.setItem(key, String(v));
    el.textContent = String(base + v).padStart(8, '0');
  }

  /* ---- 통계 막대 애니메이션 (animate bar charts on view) ---- */
  function animateBars() {
    var bars = document.querySelectorAll('.bar-fill[data-pct]');
    if (!bars.length) return;
    var run = function () {
      bars.forEach(function (b) {
        b.style.width = b.getAttribute('data-pct') + '%';
      });
    };
    setTimeout(run, 300);
  }

  /* ---- 현재 메뉴 강조 (highlight active nav item) ---- */
  function highlightNav() {
    var path = location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('nav.main-nav a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  /* ---- 갤러리 라이트박스 (image lightbox) ---- */
  function galleryLightbox() {
    var items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<div class="lightbox-inner">' +
        '<span class="lightbox-close" aria-label="닫기">&times;</span>' +
        '<img class="lightbox-img" src="" alt="">' +
        '<div class="lightbox-cap"></div>' +
      '</div>';
    document.body.appendChild(box);
    var lbImg = box.querySelector('.lightbox-img');
    var lbCap = box.querySelector('.lightbox-cap');

    function close() { box.classList.remove('open'); }

    items.forEach(function (it) {
      it.addEventListener('click', function () {
        var img = it.querySelector('img');
        var cap = it.querySelector('.cap');
        var en = it.getAttribute('data-en');
        if (!img) return; // SVG-only items just ignore
        lbImg.src = img.src;
        lbImg.alt = cap ? cap.textContent : '';
        lbCap.innerHTML = (cap ? cap.textContent : '') +
          (en ? '<span class="lb-en">' + en + '</span>' : '');
        box.classList.add('open');
      });
    });

    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox-close')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    tickClock();
    setInterval(tickClock, 1000);
    visitorCounter();
    animateBars();
    highlightNav();
    galleryLightbox();
  });
})();
