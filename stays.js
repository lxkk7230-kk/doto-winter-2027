(() => {
  'use strict';

  const dates = {
    abashiriDates: '2/6–2/8', abashiriNights: 2,
    ecoDates: '2/8–2/10', ecoNights: 2,
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

  function render(inventory, scheme) {
    const eco = inventory.get('s05');
    const aioi = inventory.get('s02');
    const abashiriCard = roomCard(null, {
      name: '网走市区 · 房源待订', stay: '第一段 · ' + dates.abashiriDates + ' · 两晚',
      price: '待选房', priceNote: '两晚人均待核',
      description: '6 日和 7 日住网走。第一晚去流冰祭，第二天从网走港坐破冰船。',
      facts: [
        ['入住条件', '四位成人合住一整栋，两对各有一间能独立关门的卧室，并可停车。'],
        ['挑选房源', '打开搜索后选择整套或整栋。查看户型图或向房东确认两间卧室都有房门，再核对两晚含税总价。']
      ],
      links: external(search.abashiri, '搜索网走 · 两晚四人')
    });
    const ecoCard = roomCard(eco, {
      name: '美幌生态木屋', caption: '起居室', stay: '第二段 · ' + dates.ecoDates + ' · 两晚',
      price: '已约好', priceNote: '两晚金额待补',
      description: '2 月 8 日入住，8、9 日过夜，10 日退房。家人已向木屋约好这两晚。',
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
      '<p>网走市区 <strong>2 晚</strong> → 美幌生态木屋 <strong>2 晚</strong> → 津别相生 <strong>3 晚</strong></p></div></header>' +
      '<div class="stay-subhead"><p>两套路线共用这七晚住宿。7 日船班遇停航时，8 日仍按约入住木屋。</p></div>' + abashiriCard +
      '<div class="stay-subhead"><h2>美幌与相生的房型</h2></div><div class="stay-grid">' +
      ecoCard + aioiCard + '</div></div>';
  }

  window.dotoStayDates = () => dates;
  window.dotoStaySearch = search;
  window.dotoStayResearch = render;
})();
