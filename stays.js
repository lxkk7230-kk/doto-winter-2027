(() => {
  'use strict';

  const dates = {
    firstDates: '2/6–2/8', firstNights: 2, firstPerPerson: 13600,
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
    first: 'https://www.airbnb.jp/rooms/1691606985272696121?check_in=2027-02-06&check_out=2027-02-08&adults=4&currency=JPY',
    aioi: bookingSearch('Aioi House Tsubetsu', '2027-02-10', '2027-02-13')
  };

  const asset = file => window.dotoFloorplan ? window.dotoFloorplan(file) : file;
  const external = (url, label) => '<a target="_blank" rel="noopener noreferrer" href="' + esc(url) + '">' + esc(label) + ' ↗</a>';
  const detail = id => '<button type="button" data-rt-place="' + esc(id) + '">地点详情与地图</button>';

  function photoRow(place, caption) {
    const photos = [{image: place.image, caption}, ...(place.gallery || []).slice(0, 1)];
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
    const miyoshi = inventory.get('s01');
    const firstCard = roomCard(miyoshi, {
      name: '北见 · 美芳町', caption: '一楼客厅', stay: '第一段 · ' + dates.firstDates + ' · 拟住，待订',
      price: '¥13,600', priceNote: '两晚人均约 571 元，含住宿税预算',
      description: '两间卧室都在二楼，各自可上锁。爸妈可以睡有小双人床的一间，另一对在隔壁铺两套单人日式床垫。浴室和厕所在一楼。',
      facts: [
        ['供暖', '客厅有 FF 暖炉和空调。有床的卧室装有空调，铺床垫的卧室只有风扇，订前向房东确认二月夜间如何取暖。'],
        ['自驾', '女满别机场至北见约 34 公里，冬季留 45–60 分钟。北见至网走商港、破冰船码头约 47–48 公里，留 1 小时 10 分–1 小时 35 分。8 日换住美幌生态木屋约 28 公里，留 40–55 分钟。'],
        ['入住', '可自助入住，房前可停一辆大型车。地图标在美芳町九丁目街区中心，门牌、停车位和取钥匙方式以房东指引为准。'],
        ['报价', '11 月 20 日四人两晚平台价 ¥52,000（约 2,184 元），人均 ¥13,000（约 546 元）。若结算时未含住宿税，每人另预留 ¥600（约 25 元），全家含税预算 ¥54,400（约 2,285 元）。']
      ],
      links: external(search.first, '四人两晚报价') + external(asset('img/miyoshi-plan.jpg'), '放大房东户型图') + external(miyoshi.links[2].url, '住宿税率')
    });
    const ecoCard = roomCard(eco, {
      name: '美幌生态木屋', caption: '起居室', stay: '第二段 · ' + dates.ecoDates + ' · 两晚',
      price: '¥7,150', priceNote: '两晚人均约 300 元',
      description: '已约 2 月 8、9 日两晚，10 日退房。按家人确认的整栋每晚 ¥14,300（约 601 元）计算，每晚人均 ¥3,575（约 150 元）。',
      facts: [
        ['房间', '一楼东西两端各有一间独立双床房，中间是共用客厅与餐厅。'],
        ['位置', '美幌町「みどりの村」内，设有停车场。雪天去乌托罗单程预留 2–2.5 小时。'],
        ['供暖', '建筑档案列有温水地暖、起居室木颗粒炉和卧室辅助电暖板。原设计未设夏季制冷。卧室能否自行调温，请向住宿窗口 050-1732-8726 确认。']
      ],
      links: external(asset('img/plan-eco.png'), '放大卧室平面图') + external(eco.url, '美幌町设施介绍') + external('https://ecohouse.niaa.jp/bihoro/', '采暖设计档案')
    });
    const aioiCard = roomCard(aioi, {
      name: '津别相生小屋', caption: '双人卧室', stay: '第三段 · ' + dates.aioiDates + ' · 拟住，待订',
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
      '<p>北见 Miyoshi 別邸 <strong>2 晚</strong> → 美幌生态木屋 <strong>2 晚</strong> → 津别相生 <strong>3 晚</strong></p></div></header>' +
      '<div class="stay-subhead"><p>两套路线共用这七晚住宿。7 日船班遇停航时，8 日仍按约入住木屋。</p></div>' + firstCard +
      '<div class="stay-subhead"><h2>美幌与相生的房型</h2></div><div class="stay-grid">' +
      ecoCard + aioiCard + '</div></div>';
  }

  // Keep older guide bundles usable while browsers refresh the route and stay scripts.
  dates.reposDates = dates.firstDates;
  dates.reposNights = dates.firstNights;
  dates.reposPerPerson = dates.firstPerPerson;
  search.repos = search.first;
  window.dotoStayDates = () => dates;
  window.dotoStaySearch = search;
  window.dotoStayResearch = render;
})();
