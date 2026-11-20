(() => {
  'use strict';

  const dates = {
    abashiriDates: '2/6–2/8', abashiriNights: 2,
    ecoDates: '2/8–2/10', ecoNights: 2, ecoPerPerson: 14300 * 2 / 4,
    aioiDates: '2/10–2/13', aioiNights: 3, aioiPrice: 16500
  };

  function bookingSearch(destination, checkin, checkout) {
    const url = new URL('https://www.booking.com/searchresults.zh-cn.html');
    url.search = new URLSearchParams({
      ss: destination, checkin, checkout, group_adults: '4',
      group_children: '0', no_rooms: '1', selected_currency: 'JPY'
    }).toString();
    return url.href;
  }
  const search = {
    abashiri: bookingSearch('北海道 網走市', '2027-02-06', '2027-02-08'),
    aioi: bookingSearch('Aioi House Tsubetsu', '2027-02-10', '2027-02-13')
  };

  const asset = file => window.dotoFloorplan ? window.dotoFloorplan(file) : file;
  const external = (url, label) => '<a target="_blank" rel="noopener noreferrer" href="' + esc(url) + '">' + esc(label) + ' ↗</a>';
  const detail = id => '<button type="button" data-rt-place="' + esc(id) + '">地点详情与地图</button>';

  function photoRow(place, caption) {
    const photos = [{image: place.image, caption}, ...(place.gallery || [])];
    return '<div class="stay-pair">' + photos.map(photo =>
      '<a href="' + esc(asset(photo.image)) + '" target="_blank" rel="noopener" aria-label="放大' + esc(place.name + ' · ' + photo.caption) + '">' +
      '<img src="' + esc(asset(photo.image)) + '" alt="' + esc(place.name + ' · ' + photo.caption) + '"><span>' + esc(photo.caption) + '</span></a>'
    ).join('') + '</div>';
  }

  function roomCard(place, info) {
    return '<article class="stay-card">' + (place ? photoRow(place, info.caption) : '') +
      '<div class="stay-copy"><div class="stay-status">' + esc(info.stay) + '</div><div class="stay-heading"><div><h2>' +
      esc(info.name) + '</h2>' + (place ? '<p lang="ja">' + esc(place.name) + '</p>' : '') +
      '</div><div class="stay-price">' + esc(info.price) + '<small>' + esc(info.priceNote) + '</small></div></div>' +
      '<p class="stay-desc">' + esc(info.description) + '</p><dl class="stay-facts">' +
      info.facts.map(([label, value]) => '<dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd>').join('') +
      '</dl><div class="stay-links">' + (place ? detail(place.id) : '') + info.links + '</div></div></article>';
  }

  function firstNightsOptions() {
    const jtb = 'https://www.jtb.co.jp/kokunai-hotel/htl/1203A02/plan/?checkindate=20270206&godate=20270206&backdate=20270208&staynight=2&room=1&roomassign=m4';
    const houses = [
      {
        name: 'ゲストハウス ビホロノビ', location: '美幌町美富', rate: '¥12,950 · 约 544 元',
        photo: 'img/nobi-living.jpg', caption: '翻新后的共用客厅', source: 'https://www.active-management.co.jp/guesthouse-bihoronobi/',
        layout: '2023 年翻新的整栋，三间独立卧室，门口可停车。8 日去生态木屋约 8 公里。',
        drive: '距码头约 35 公里，雪天单程预留 40–55 分钟。6 日先到 KITEN 取钥匙，再去流冰祭。',
        quote: '按直营价计算，已含两晚清洁费和住宿税。两天日历可申请，需等经营方确认。电话 050-1732-8726。',
        url: 'https://tabilmo.com/villas/r-hokkaido/hokkaido/area-7/villa/1911?checkin=2027-02-06&checkout=2027-02-08&adult=4&child=0&infant=0', action: '查看两晚日历'
      }, {
        name: '来運・水の学校', location: '斜里町来運', rate: '¥8,300 · 约 349 元',
        photo: 'img/raiun.jpg', caption: '旧教员住宅外观（非冬季照片）', source: 'https://www.raiun.org/?page_id=5',
        layout: '旧小学的教员住宅，约 59 平方米，三间卧室、独立厨房卫浴，含停车。选禁烟标准栋。',
        drive: '距码头约 49 公里，冬季单程预留 55–75 分钟。前台 21:00 结束，若先看祭典，建议 19:00 左右离场。',
        quote: 'JTB 指定两晚四人显示 ¥33,200（约 1,394 元），查询时有房。8 日 09:00 前退房，到生态木屋约 57 公里。',
        url: jtb, action: 'JTB 两晚报价'
      }, {
        name: 'Cottage Abashiri', location: '网走市豊郷', rate: '¥25,750 · 约 1,082 元',
        photo: 'img/toyosato.jpg', caption: '客厅和日式起居区', source: 'https://visit-abashiri.jp/stay/031a488cf0801764b24e6ef1445831f334bec506.html',
        layout: '整栋四间分隔卧室，可停车。房东标注至破冰船码头平时约 15 分钟，雪天留 20–30 分钟。',
        drive: '距港近，适合想把 6 日晚留给祭典的家人。两晚报价明显高于美幌和斜里两处。',
        quote: 'Airbnb 日本站指定两晚四人显示 ¥103,000（约 4,326 元），含平台费用。此处只用于比较近港位置。',
        url: 'https://www.airbnb.jp/rooms/1210504132487876690?check_in=2027-02-06&check_out=2027-02-08&adults=4&currency=JPY', action: '查看两晚报价'
      }
    ];
    return '<section class="stay-options" aria-label="前两晚住宿比较"><div class="stay-subhead"><h2>6、7 日住哪里</h2><span>四人平摊 · 每人两晚 · 2026 年 11 月 20 日查询</span></div>' +
      '<div class="stay-option-grid">' + houses.map(h => '<article><a href="' + esc(h.source) + '" target="_blank" rel="noopener noreferrer"><img src="' + esc(asset(h.photo)) + '" alt="' + esc(h.name + ' · ' + h.caption) + '"></a><div><small>' + esc(h.location) + '</small><h3>' + esc(h.name) + '</h3><strong>' + esc(h.rate) + '</strong><p>' + esc(h.layout) + '</p><p>' + esc(h.drive) + '</p><p>' + esc(h.quote) + '</p><div class="stay-links">' + external(h.source, '房型与照片') + external(h.url, h.action) + '</div></div></article>').join('') + '</div>' +
      '<details class="stay-checked"><summary>网走港附近和当地的低价房源</summary><p>呼人地区在网走港西南侧，去美幌顺路。呼人 2 Arun別邸和市区 Guesthouse LIA Ⅰ 的 Airbnb 页均显示 6–8 日四人无法连住。网走市营のとろ和道立てんとらんど的营地木屋二月休业。</p>' +
      '<p>美幌「日の出民泊住宅」是另一条询价线索。私人整栋 4LDK，2023 年部分翻新，四套日式被褥。若适用町里公布的冬季体验价，含清扫费四人两晚 ¥17,000（约 714 元），人均 ¥4,250（约 179 元）。普通家庭观光能否使用该价、两晚空房及停车请先问美幌町 0152-77-6548。</p><div class="stay-links">' +
      external('https://www.bihoro-iju.com/experience/house/', '日の出住宅与户型图') + external('https://www.city.abashiri.hokkaido.jp/site/lakeside/1278.html', 'のとろ开放季') + external('https://tentland.or.jp/facilities.html', 'てんとらんど开放季') + '</div></details></section>';
  }

  function render(inventory, scheme) {
    const eco = inventory.get('s05');
    const aioi = inventory.get('s02');
    const abashiriCard = roomCard(null, {
      name: '网走及周边 · 房源待订', stay: '第一段 · ' + dates.abashiriDates + ' · 两晚',
      price: '待选房', priceNote: '两晚人均待核',
      description: '6 日晚上去网走商港看流冰祭，7 日优先坐おーろら破冰船。两个地点相距约 10 分钟步行。',
      facts: [
        ['入住条件', '四位成人合住一整栋，两对各有一间能独立关门的卧室，并可停车。'],
        ['路线示意', '地图暂用网走市区作为首两晚的出发点。选在郊区时，请按下方卡片的车程安排出发。']
      ],
      links: external(search.abashiri, '搜索网走 · 两晚四人')
    });
    const ecoCard = roomCard(eco, {
      name: '美幌生态木屋', caption: '起居室', stay: '第二段 · ' + dates.ecoDates + ' · 两晚',
      price: '¥7,150', priceNote: '两晚人均约 300 元',
      description: '已约 2 月 8、9 日两晚，10 日退房。按家人确认的整栋每晚 ¥14,300（约 601 元）计算，每晚人均 ¥3,575（约 150 元）。',
      facts: [
        ['房间', '一楼东西两端各有一间独立双床房，中间是共用客厅与餐厅。'],
        ['位置', '美幌町「みどりの村」内，设有停车场。雪天去乌托罗单程预留 2–2.5 小时。'],
        ['设施', '美幌町的环保示范住宅，由株式会社パンクチュアル管理。住宿联系 050-1732-8726。']
      ],
      links: external(asset('img/plan-eco.png'), '放大卧室平面图') + external(eco.url, '美幌町设施介绍')
    });
    const aioiCard = roomCard(aioi, {
      name: '津别相生小屋', caption: '双人卧室', stay: '第三段 · ' + dates.aioiDates + ' · 三晚',
      price: '¥16,500', priceNote: '约 690 元 / 人',
      description: '沿用原安排。2 月 10 日入住，13 日 06:30 从这里出发去女满别机场。',
      facts: [
        ['房间', '约 50 平方米整栋，可做饭。两间独立卧室分别设一张双人床和两张单人床。'],
        ['位置', '到阿寒湖温泉街约 25 分钟，到女满别机场约 1 小时。入住前在美幌或津别镇买好食材。'],
        ['房价', '按 Booking 原三晚整栋报价由四人平摊。取消条件以实际预订渠道为准。']
      ],
      links: external(search.aioi, 'Booking 查询 · 三晚四人') + external(aioi.photoSource, '房东房型照片')
    });

    return '<div class="stay-research"><div class="stay-back"><a href="#guide/' + (scheme === 'B' ? 'B' : 'A') + '">‹ 返回' +
      (scheme === 'B' ? '方案二' : '方案一') + '路线</a></div><header class="stay-intro"><div><h1>三段住宿</h1>' +
      '<p>网走周边 <strong>2 晚</strong> → 美幌生态木屋 <strong>2 晚</strong> → 津别相生 <strong>3 晚</strong></p></div></header>' +
      '<div class="stay-subhead"><p>两套路线共用这七晚住宿。7 日船班遇停航时，8 日仍按约入住木屋。</p></div>' + abashiriCard + firstNightsOptions() +
      '<div class="stay-subhead"><h2>美幌与相生的房型</h2></div><div class="stay-grid">' +
      ecoCard + aioiCard + '</div></div>';
  }

  window.dotoStayDates = () => dates;
  window.dotoStaySearch = search;
  window.dotoStayResearch = render;
})();
