(() => {
  'use strict';

  // Four adults share the town's training-accommodation rate of ¥13,000 per night.
  function stayDates(scheme) {
    const ecoNights = scheme === 'B' ? 3 : 4;
    const changeDay = 6 + ecoNights;
    const aioiNights = 7 - ecoNights;
    return {
      changeDay, ecoNights, aioiNights,
      ecoDates: '2/6–2/' + changeDay,
      aioiDates: '2/' + changeDay + '–2/13',
      ecoPrice: 3250 * ecoNights,
      aioiPrice: aioiNights === 3 ? 16500 : null
    };
  }

  const asset = file => window.dotoFloorplan ? window.dotoFloorplan(file) : file;
  const external = (url, label) => '<a target="_blank" rel="noopener noreferrer" href="' + esc(url) + '">' + esc(label) + ' ↗</a>';
  const detail = id => '<button type="button" data-rt-place="' + esc(id) + '">地点详情与地图</button>';

  function photoRow(place, caption) {
    const photos = [{image:place.image, caption}, ...(place.gallery || []).map(photo => ({
      image:asset(photo.image), caption:photo.caption
    }))];
    return '<div class="stay-pair">' + photos.map(photo =>
      '<a href="' + esc(photo.image) + '" target="_blank" rel="noopener" aria-label="放大' + esc(place.name + ' · ' + photo.caption) + '">' +
      '<img src="' + esc(photo.image) + '" alt="' + esc(place.name + ' · ' + photo.caption) + '"><span>' + esc(photo.caption) + '</span></a>'
    ).join('') + '</div>';
  }

  function roomCard(place, info) {
    const price = info.amount === null
      ? '待核价<small>四晚人均</small>'
      : '¥' + info.amount.toLocaleString('zh-CN') + '<small>约 ' + info.yuan + ' 元 / 人</small>';
    return '<article class="stay-card">' + photoRow(place, info.caption) +
      '<div class="stay-copy"><div class="stay-status">' + esc(info.stay) + '</div><div class="stay-heading"><div><h2>' +
      esc(info.name) + '</h2><p lang="ja">' + esc(place.name) + '</p></div><div class="stay-price">' + price + '</div></div>' +
      '<p class="stay-desc">' + esc(info.description) + '</p><dl class="stay-facts">' +
      info.facts.map(([label, value]) => '<dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd>').join('') +
      '</dl><div class="stay-links">' + detail(place.id) + info.links + '</div></div></article>';
  }

  function render(inventory, scheme) {
    const dates = stayDates(scheme);
    const eco = inventory.get('s05');
    const aioi = inventory.get('s02');
    const toggle = (id, label) => '<a href="#guide/' + id + '/stays" ' + (id === scheme ? 'aria-current="true"' : '') + '>' + label + '</a>';
    const ecoCard = roomCard(eco, {
      name: '美幌生态木屋', caption: '起居室', stay: '前段 · ' + dates.ecoDates + ' · ' + dates.ecoNights + ' 晚',
      amount: dates.ecoPrice, yuan: Math.round(dates.ecoPrice * .042),
      description: '美幌町在「みどりの村」建的环保示范住宅，由株式会社パンクチュアル管理，整栋对外受理住宿预约。',
      facts: [
        ['房间', '一楼东西两端各有一间独立双床房，共用中间的挑高客厅和餐厅。'],
        ['位置', '美幌站西侧，有停车场。到网走流冰祭约 33 公里，到乌托罗约 93 公里。'],
        ['价格与预约', '按町政府公示的研修住宿价估算，每晚每人 ¥3,250（约 137 元）。2/6 起的空房、家庭观光入住手续及含税实付请致电 050-1732-8726 确认。']
      ],
      links: external(asset('img/plan-eco.png'), '放大卧室平面图') + external(eco.url, '町政府价目与预约')
    });
    const aioiCard = roomCard(aioi, {
      name: '津别相生小屋', caption: '双人卧室', stay: '后段 · ' + dates.aioiDates + ' · ' + dates.aioiNights + ' 晚',
      amount: dates.aioiPrice, yuan: 690,
      description: '位于津別町相生，女满别机场与阿寒湖之间。约 50 平方米的整栋小屋，可自己做饭。',
      facts: [
        ['房间', '两间独立卧室，一间放一张双人床，另一间放两张单人床。'],
        ['位置', '至阿寒湖温泉街约 19 公里，通常开车约 25 分钟。附近缺少商店，入住前买好晚餐和早餐。'],
        ['价格与预约', dates.aioiPrice === null
          ? '需按 2/9 入住、2/13 退房重新查询四人整栋的四晚总价、空房和取消期限。'
          : '沿用 Booking 的三晚参考报价。原条款列 2/9 前可免费取消，当前房态、价格和具体截止时间以下单页为准。']
      ],
      links: external(aioi.url, 'Booking 查询') + external(aioi.photoSource, '房东房型照片')
    });

    return '<div class="stay-research"><div class="stay-back"><a href="#guide/' + scheme + '">‹ 返回' +
      (scheme === 'B' ? '方案二' : '方案一') + '路线</a></div><header class="stay-intro"><div><h1>两处住宿</h1>' +
      '<p>先住美幌生态木屋，<strong>2 月 ' + dates.changeDay + ' 日换住津别相生</strong>，住到 13 日返程。</p></div>' +
      '<nav class="stay-switch" aria-label="选择住宿方案">' +
      toggle('A','方案一 · 4＋3 晚') + toggle('B','方案二 · 3＋4 晚') + '</nav></header>' +
      '<div class="stay-subhead"><h2>美幌 → 津别相生</h2><span>整栋 · 每段价格按四位成人平摊</span></div><div class="stay-grid">' +
      ecoCard + aioiCard + '</div><p class="stay-foot">两栋之间的直接公路距离约 40 公里。换住当天的游览路线与车程见按日行程。人民币按 100 日元约合 4.20 元换算。</p></div>';
  }

  window.dotoStayDates = stayDates;
  window.dotoStayResearch = render;
})();
