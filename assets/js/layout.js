/* ==========================================================================
   공용 레이아웃 삽입 (shared header / nav / footer injection)
   Keeps every page consistent without duplicating markup.
   ========================================================================== */
(function () {
  'use strict';

  var CREST = '' +
    '<svg viewBox="0 0 200 200" role="img" aria-label="휘장">' +
    '<defs>' +
    '<radialGradient id="cg-sky" cx="50%" cy="38%" r="75%"><stop offset="0%" stop-color="#2b64c9"/><stop offset="100%" stop-color="#0a2a63"/></radialGradient>' +
    '<linearGradient id="cg-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f4d97a"/><stop offset="100%" stop-color="#b8901f"/></linearGradient>' +
    '<linearGradient id="cg-mtn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e9eef8"/><stop offset="100%" stop-color="#7f96c0"/></linearGradient>' +
    '</defs>' +
    '<circle cx="100" cy="100" r="96" fill="url(#cg-gold)" stroke="#8b6b12" stroke-width="2"/>' +
    '<circle cx="100" cy="100" r="88" fill="#0a2a63" stroke="#8b6b12" stroke-width="1"/>' +
    '<path id="cg-topL" d="M18,100 a82,82 0 0,1 82,-82" fill="none"/>' +
    '<path id="cg-top" d="M100,18 a82,82 0 0,1 82,82" fill="none"/>' +
    '<text fill="#f4d97a" font-family="serif" font-size="13" font-weight="700" letter-spacing="2"><textPath href="#cg-topL" startOffset="6%">조선 로동자 혁명</textPath></text>' +
    '<text fill="#f4d97a" font-family="serif" font-size="13" font-weight="700" letter-spacing="6"><textPath href="#cg-top" startOffset="60%">축구단</textPath></text>' +
    '<circle cx="100" cy="104" r="66" fill="url(#cg-sky)" stroke="#f4d97a" stroke-width="2"/>' +
    '<g transform="translate(100,52)"><polygon points="0,-18 5.3,-5.5 18,-5.5 7.6,3 11.5,15.5 0,7.5 -11.5,15.5 -7.6,3 -18,-5.5 -5.3,-5.5" fill="#c1121f" stroke="#f4d97a" stroke-width="1.2"/></g>' +
    '<path d="M40,150 L66,104 L86,132 L104,96 L128,140 L160,150 Z" fill="url(#cg-mtn)" stroke="#5c6f96" stroke-width="1"/>' +
    '<path d="M66,104 L74,116 L58,116 Z" fill="#fff" opacity="0.85"/>' +
    '<path d="M104,96 L112,110 L96,110 Z" fill="#fff" opacity="0.85"/>' +
    '<g stroke="#f4d97a" stroke-width="4" stroke-linecap="round" opacity="0.9"><line x1="70" y1="150" x2="122" y2="112"/><line x1="130" y1="150" x2="78" y2="112"/></g>' +
    '<rect x="118" y="106" width="16" height="9" rx="1.5" transform="rotate(38 126 110)" fill="#d9dee8" stroke="#5c6f96"/>' +
    '<path d="M74,112 q-14,-2 -16,10" fill="none" stroke="#d9dee8" stroke-width="5" stroke-linecap="round"/>' +
    '<g transform="translate(100,138)"><circle r="22" fill="#fff" stroke="#0a2a63" stroke-width="2"/>' +
    '<polygon points="0,-9 8.5,-3 5.3,7 -5.3,7 -8.5,-3" fill="#14213d"/>' +
    '<g fill="none" stroke="#14213d" stroke-width="1.6"><line x1="0" y1="-9" x2="0" y2="-20"/><line x1="8.5" y1="-3" x2="18" y2="-8"/><line x1="5.3" y1="7" x2="13" y2="16"/><line x1="-5.3" y1="7" x2="-13" y2="16"/><line x1="-8.5" y1="-3" x2="-18" y2="-8"/></g></g>' +
    '<g transform="translate(100,178)"><rect x="-40" y="-11" width="80" height="20" rx="2" fill="#c1121f" stroke="#f4d97a" stroke-width="1.5"/>' +
    '<text x="0" y="3" text-anchor="middle" fill="#fff" font-family="serif" font-size="11" font-weight="700" letter-spacing="1">主體 1957</text></g>' +
    '</svg>';

  var NAV = [
    ['index.html', '홈', 'HOME'],
    ['club.html', '구단 소개', 'CLUB'],
    ['squad.html', '선수단', 'SQUAD'],
    ['history.html', '역사', 'HISTORY'],
    ['fixtures.html', '경기 일정', 'FIXTURES'],
    ['standings.html', '순위', 'STANDINGS'],
    ['hall.html', '명예의 전당', 'HALL OF FAME'],
    ['gallery.html', '사진관', 'GALLERY'],
    ['news.html', '소식', 'NEWS'],
    ['contact.html', '연락처', 'CONTACT']
  ];

  function buildHeader() {
    var host = document.querySelector('[data-layout="header"]');
    if (!host) return;
    var nav = NAV.map(function (n) {
      return '<li><a href="' + n[0] + '">' + n[1] + '<span class="en">' + n[2] + '</span></a></li>';
    }).join('');

    host.innerHTML =
      '<div class="gov-ribbon"><div class="wrap">' +
        '<div class="marquee-zone"><marquee behavior="scroll" scrollamount="4">☭ 조선민주주의인민공화국 국가체육위원회 공인 · 로동혁명축구단 공식 홈페지 · 로동자의 힘, 혁명의 정신, 승리의 축구 ☭</marquee></div>' +
        '<div class="clock" id="gov-clock">주체 …</div>' +
      '</div></div>' +
      '<header class="site-head"><div class="wrap">' +
        '<a href="index.html" class="crest-holder">' + CREST + '</a>' +
        '<div class="head-titles">' +
          '<h1>조선 로동자 혁명 축구단</h1>' +
          '<div class="abbr">로동혁명축구단 · JOSEON RODONGJA HYEONGMYEONG CHUKGUDAN</div>' +
          '<div class="slogan">로동자의 힘, 혁명의 정신, 승리의 축구' +
            '<div class="slogan-en">A força dos trabalhadores, o espírito da revolução, o futebol da vitória</div>' +
          '</div>' +
        '</div>' +
        '<div class="head-star">★</div>' +
      '</div></header>' +
      '<nav class="main-nav"><ul>' + nav + '</ul></nav>';
  }

  function buildFooter() {
    var host = document.querySelector('[data-layout="footer"]');
    if (!host) return;
    var links = NAV.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join(' · ');
    host.innerHTML =
      '<footer class="site-foot"><div class="wrap">' +
        '<div class="foot-crest">' + CREST + '</div>' +
        '<div class="foot-name">조선 로동자 혁명 축구단</div>' +
        '<div class="foot-slogan">로동자의 힘 • 축구의 영광 • 하나된 승리</div>' +
        '<div class="foot-links">' + links + '</div>' +
        '<div class="visitor">방문자 수 · TOTAL VISITORS: <span class="odometer" id="visitor-count">00000000</span></div>'
      '</div></footer>';
  }

  buildHeader();
  buildFooter();
})();
