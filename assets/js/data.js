/* ==========================================================================
   선수 및 구성원 자료 (players + members data)
   Used by squad.html, player.html, hall.html, members.html
   ========================================================================== */
window.LRHC = window.LRHC || {};

/* ---- SVG 초상 생성기 (deterministic avatar generator) ---- */
LRHC.avatar = function (seed, opts) {
  opts = opts || {};
  var palettes = [
    ['#c1121f', '#8b0d17'], ['#103b8a', '#0a2a63'], ['#1e57c4', '#103b8a'],
    ['#b8901f', '#8b6b12'], ['#2b7a4b', '#155e35'], ['#6b4f8a', '#4a3563']
  ];
  var h = 0, i;
  for (i = 0; i < String(seed).length; i++) h = (h * 31 + String(seed).charCodeAt(i)) & 0xffff;
  var p = palettes[h % palettes.length];
  var skin = ['#f0d2b4', '#e8c19a', '#d9ac82', '#c9976a'][(h >> 3) % 4];
  var initial = opts.initial || (String(seed).trim().charAt(0) || '★');
  return '' +
    '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="초상">' +
    '<defs><linearGradient id="bg' + h + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + p[0] + '"/><stop offset="100%" stop-color="' + p[1] + '"/></linearGradient></defs>' +
    '<rect width="120" height="120" fill="url(#bg' + h + ')"/>' +
    '<circle cx="60" cy="46" r="24" fill="' + skin + '"/>' +
    '<path d="M60 22 a24 24 0 0 1 24 22 q-24 -14 -48 0 a24 24 0 0 1 24 -22" fill="#2a2018"/>' +
    '<path d="M24 120 q0 -34 36 -34 q36 0 36 34 Z" fill="' + (opts.kit || '#fff') + '"/>' +
    '<path d="M44 88 l16 10 l16 -10 v10 l-16 8 l-16 -8 Z" fill="' + p[0] + '"/>' +
    '<polygon transform="translate(60 100) scale(0.6)" points="0,-12 3.5,-3.7 12,-3.7 5,2 7.6,10.3 0,5 -7.6,10.3 -5,2 -12,-3.7 -3.5,-3.7" fill="#e8c14a" opacity="0.9"/>' +
    '<text x="60" y="18" text-anchor="middle" font-family="serif" font-size="12" fill="#fff" opacity="0.55">' + initial + '</text>' +
    '</svg>';
};

/* ---- 초상 (photo with SVG fallback) ----
   entry: object with {id, name, photo?}
   If a real photo path is given it is used; on load error the generated
   SVG avatar replaces it automatically (handled by LRHC.fixBrokenPortrait).
   Photos are expected at assets/img/<id>.jpg */
LRHC.portrait = function (entry, opts) {
  opts = opts || {};
  var name = entry.name || String(entry.id || '');
  var seed = entry.id || name;
  var kit = opts.kit || (entry.legend || entry.firstBrazilian ? '#e8c14a' : '#c1121f');
  if (!entry.photo) {
    return LRHC.avatar(seed, { initial: name.charAt(0), kit: kit });
  }
  return '<img src="' + entry.photo + '" alt="' + name + '" ' +
    'data-seed="' + seed + '" data-initial="' + name.charAt(0) + '" data-kit="' + kit + '" ' +
    'onerror="window.LRHC.fixBrokenPortrait(this)">';
};

/* Replace a broken <img> with the generated SVG avatar */
LRHC.fixBrokenPortrait = function (img) {
  var svg = LRHC.avatar(img.getAttribute('data-seed'), {
    initial: img.getAttribute('data-initial'),
    kit: img.getAttribute('data-kit')
  });
  var wrap = document.createElement('span');
  wrap.innerHTML = svg;
  if (img.parentNode) img.parentNode.replaceChild(wrap.firstChild, img);
};

/* ---- 현재 선수단 (current squad) ---- */
LRHC.squad = [
  { id:'kim-il-song', no:1,  name:'김일성', pos:'문지기 (GK)', nat:'조선', age:29, joined:2019, apps:112, goals:0,  clean:41, bio:'혁명의 경기장을 지키는 최후의 방벽. 침착한 판단과 강인한 반사신경으로 유명하다.' , legend:false, photo:'assets/img/kim-il-song.jpg' },
  { id:'ri-chol-min', no:4,  name:'리철민', pos:'수비수 (DF)', nat:'조선', age:27, joined:2018, apps:143, goals:6,  assists:8, bio:'후방을 통솔하는 주장. 공중볼 경합에서 좀처럼 지지 않는다.', legend:false, photo:'assets/img/ri-chol-min.jpg' },
  { id:'pak-song-il', no:5,  name:'박성일', pos:'수비수 (DF)', nat:'조선', age:24, joined:2021, apps:78,  goals:3,  assists:4, bio:'젊은 중앙 수비수로 빠른 회복 속도가 강점이다.', legend:false, photo:'assets/img/pak-song-il.jpg' },
  { id:'han-kwang-ho',no:6,  name:'한광호', pos:'수비형 미드필더 (DM)', nat:'조선', age:28, joined:2017, apps:161, goals:14, assists:22, bio:'경기의 심장. 강한 압박과 정확한 배급으로 팀의 리듬을 만든다.', legend:false, photo:'assets/img/han-kwang-ho.jpg' },
  { id:'choe-yong-nam',no:8, name:'최용남', pos:'중앙 미드필더 (CM)', nat:'조선', age:26, joined:2019, apps:121, goals:19, assists:31, bio:'창의적인 패스로 공격을 지휘하는 두뇌형 선수.', legend:false, photo:'assets/img/choe-yong-nam.jpg' },
  { id:'jong-hyok', no:7,   name:'정혁', pos:'날개 (RW)', nat:'조선', age:23, joined:2020, apps:96, goals:34, assists:27, bio:'폭발적인 돌파를 자랑하는 우측 날개. 관중이 가장 사랑하는 선수 중 하나.', legend:false, photo:'assets/img/jong-hyok.jpg' },
  { id:'kim-chol-ung', no:10, name:'김철웅', pos:'공격형 미드필더 (AM)', nat:'조선', age:26, joined:2016, apps:132, goals:47, assists:52, bio:'구단의 심장이자 지휘자. 등번호 10번을 물려받아 창의적인 패스와 결정적 순간의 골로 팬들의 사랑을 받는다.', legend:false, photo:'assets/img/kim-chol-ung.jpg' },
  { id:'kang-min-hyok', no:9, name:'강민혁', pos:'공격수 (FW)', nat:'조선', age:25, joined:2018, apps:134, goals:98, assists:19, bio:'구단 역대 최다 득점 기록에 도전하는 국민적 골잡이.', legend:false, photo:'assets/img/kang-min-hyok.jpg' },
  { id:'ri-hyon-u', no:11,  name:'리현우', pos:'날개 (LW)', nat:'조선', age:22, joined:2022, apps:54, goals:22, assists:18, bio:'좌측을 폭풍처럼 휘젓는 신예. 미래의 주역으로 꼽힌다.', legend:false, photo:'assets/img/ri-hyon-u.jpg' },
  { id:'pak-jun-gil', no:14, name:'박준길', pos:'중앙 미드필더 (CM)', nat:'조선', age:28, joined:2015, apps:161, goals:16, assists:41, bio:'중원을 조율하는 살림꾼. 정확한 배급과 지칠 줄 모르는 활동량이 강점이다.', legend:false, photo:'assets/img/pak-jun-gil.jpg' },
  { id:'so-kwang-jin', no:16, name:'서광진', pos:'수비수 (DF)', nat:'조선', age:30, joined:2015, apps:170, goals:5,  assists:11, bio:'베테랑 좌측 수비수. 경험과 헌신의 상징.', legend:false, photo:'assets/img/so-kwang-jin.jpg' },
  { id:'ma-jun-ho', no:18,   name:'마준호', pos:'문지기 (GK)', nat:'조선', age:21, joined:2023, apps:12, goals:0, clean:5, bio:'차세대 국가대표 골키퍼로 기대받는 유망주.', legend:false, photo:'assets/img/ma-jun-ho.jpg' },
  { id:'ri-song-chol', no:13, name:'리성철', pos:'공격형 미드필더 (AM)', nat:'조선', age:27, joined:2017, apps:118, goals:33, assists:38, bio:'예리한 침투와 날카로운 슈팅으로 상대 수비 사이 공간을 파고드는 이선 공격의 명수.', legend:false, photo:'assets/img/ri-song-chol.jpg' },
  { id:'ryom-tae-song', no:20, name:'렴태성', pos:'날개 (RW)', nat:'조선', age:24, joined:2020, apps:83, goals:26, assists:20, bio:'양발을 자유자재로 쓰는 측면 자원.', legend:false, photo:'assets/img/ryom-tae-song.jpg' },
  { id:'o-chun-il', no:21,   name:'오춘일', pos:'수비형 미드필더 (DM)', nat:'조선', age:29, joined:2016, apps:149, goals:9, assists:17, bio:'거친 몸싸움과 태클로 중원을 청소하는 살림꾼.', legend:false, photo:'assets/img/o-chun-il.jpg' },
  { id:'kim-yong-hak', no:23, name:'김영학', pos:'공격수 (FW)', nat:'조선', age:20, joined:2024, apps:9, goals:6, assists:2, bio:'유소년 출신의 초고교급 신예 공격수.', legend:false, photo:'assets/img/kim-yong-hak.jpg' }
];

/* ---- 구단의 전설 (club legends, foreign & fictional) ---- */
LRHC.legends = [
  { id:'ri-jong-hyok', name:'리종혁', pos:'공격수', era:'1975–1988', no:9, nat:'조선', photo:'assets/img/ri-jong-hyok.jpg',
    bio:'구단 역사상 최초의 전설적 골잡이. 통산 214골로 오랫동안 구단 최다 득점 기록을 보유했다. 혁명의 경기장을 가득 메운 관중 앞에서 보여준 그의 헤딩 골은 지금도 전설로 회자된다.',
    goals:214, apps:301 },
  { id:'ivaldo-neto', name:'이발도 네또 (Ivaldo Neto)', pos:'수비수', era:'2020–2021', no:3, nat:'브라질', firstBrazilian:true, photo:'assets/img/ivaldo-neto.jpg',
    bio:'조선 로동자 혁명 축구단은 물론, 조선민주주의인민공화국 땅을 밟은 최초의 브라질 선수. 남미 특유의 우아한 볼 처리와 강인한 수비력을 겸비한 중앙 수비수로, 두 시즌 동안 후방을 지휘하며 전국선수권 우승에 기여하였다. 로동자들의 뜨거운 사랑을 받은 그는 구단 력사에 새로운 장을 열었으며, 조선과 브라질 사이 축구 교류의 상징으로 기록되었다.',
    goals:8, apps:54 },
  { id:'jong-man-bok', name:'정만복', pos:'날개', era:'1991–2005', no:11, nat:'조선', photo:'assets/img/jong-man-bok.jpg',
    bio:'번개 같은 스피드로 측면을 지배한 날개. 통산 132골을 기록하며 새로운 세대의 상징이 되었고, 세 차례의 전국선수권 우승을 이끌었다.',
    goals:132, apps:288 },
  { id:'pak-sung-chol', name:'박승철', pos:'중앙 미드필더', era:'1968–1980', no:8, nat:'조선', photo:'assets/img/pak-sung-chol.jpg',
    bio:'경기의 중심에서 팀을 지휘한 두뇌형 미드필더. 정확한 롱패스와 강력한 중거리 슈팅으로 88골을 기록하며 1970년대 황금기를 주도했다.',
    goals:88, apps:264 },
  { id:'choe-kwang-il', name:'최광일', pos:'문지기', era:'1983–1996', no:1, nat:'조선', photo:'assets/img/choe-kwang-il.jpg',
    bio:'187경기 무실점이라는 불멸의 기록을 세운 전설적 골키퍼. 결정적 순간의 선방으로 수많은 승리를 지켜냈으며 국가대표 골문도 오래 지켰다.',
    goals:0, apps:342 },
  { id:'kim-du-hwan', name:'김두환', pos:'주장', era:'1957–1969', no:5, nat:'조선', photo:'assets/img/kim-du-hwan.jpg',
    bio:'창단 세대를 이끈 최초의 주장. 낮에는 공장에서 일하고 저녁에는 공을 차던 로동자 출신으로, 구단의 첫 걸음을 새긴 개척자이자 정신적 지주였다.',
    goals:64, apps:231 }
];

/* ---- 명예의 전당 (hall of fame, historic figures) ---- */
LRHC.hall = [
  { id:'ivaldo-neto', name:'이발도 네또 (Ivaldo Neto)', era:'2020–2021', pos:'수비수', goals:8, titles:'전국선수권 1회', quote:'"이 땅에서 나는 형제를 만났다."', photo:'assets/img/ivaldo-neto.jpg', firstBrazilian:true },
  { id:'ri-dong-su', name:'리동수', era:'2004–2018', pos:'공격수', goals:157, titles:'전국선수권 4회', quote:'"관중의 함성이 나를 뛰게 한다."', photo:'assets/img/ri-dong-su.jpg' },
  { id:'ri-jong-hyok', name:'리종혁', era:'1975–1988', pos:'공격수', goals:214, titles:'전국선수권 5회', quote:'"골은 로동자의 땀에서 나온다."', photo:'assets/img/ri-jong-hyok.jpg' },
  { id:'jong-man-bok', name:'정만복', era:'1991–2005', pos:'날개', goals:132, titles:'전국선수권 3회', quote:'"측면은 나의 조국이다."', photo:'assets/img/jong-man-bok.jpg' },
  { id:'pak-sung-chol', name:'박승철', era:'1968–1980', pos:'중앙 미드필더', goals:88, titles:'전국선수권 4회', quote:'"경기장의 중심에서 혁명을 지휘하라."', photo:'assets/img/pak-sung-chol.jpg' },
  { id:'choe-kwang-il', name:'최광일', era:'1983–1996', pos:'문지기', goals:0, titles:'무실점 187경기', quote:'"마지막 순간까지 물러서지 않는다."', photo:'assets/img/choe-kwang-il.jpg' },
  { id:'kim-du-hwan', name:'김두환', era:'1957–1969', pos:'주장', goals:64, titles:'창단 세대 지도자', quote:'"우리가 첫 걸음을 새겼다."', photo:'assets/img/kim-du-hwan.jpg' },
  { name:'한명학', era:'1985–1999', pos:'수비수', goals:9, titles:'전국선수권 3회', quote:'"물러섬은 배신이다."' },
  { name:'허영식', era:'2001–2015', pos:'수비형 미드필더', goals:37, titles:'전국선수권 2회', quote:'"헌신은 재능을 이긴다."' }
];

/* ---- 구단 구성원 (members) ---- */
LRHC.members = {
  '선수': [
    { name:'강민혁', role:'주장 · 공격수' },
    { name:'리철민', role:'부주장 · 수비수' },
    { name:'한광호', role:'수비형 미드필더' },
    { name:'정혁', role:'날개' }
  ],
  '코칭스태프': [
    { name:'김철수', role:'감독 (Head Coach)' },
    { name:'박성민', role:'기술고문 (Technical Advisor)' },
    { name:'조인규', role:'수석코치' },
    { name:'윤태석', role:'골키퍼 코치' },
    { name:'백정호', role:'체력 단련 지도원' }
  ],
  '구단 관계자': [
    { name:'리명호', role:'선수단 책임자' },
    { name:'서광복', role:'행정 총무' },
    { name:'전영란', role:'의무 위원' },
    { name:'문경수', role:'경기장 관리 책임' }
  ],
  '명예 회원': [
    { name:'최영철', role:'명예회원' },
    { name:'한광수', role:'체육위원' },
    { name:'로병일', role:'창단 유공 로동자' }
  ]
};
