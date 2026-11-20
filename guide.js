(() => {
  'use strict';

  const urls = {
    eco: 'https://www.town.bihoro.hokkaido.jp/site/kanko/2590.html',
    airbnb2: 'https://www.airbnb.jp/rooms/1425790170855532409',
    booking: window.dotoStaySearch.aioi,
    repos: window.dotoStaySearch.repos,
    jal: 'https://www.jal.co.jp/jp/ja/', airdo: 'https://www.airdo.jp/',
    orix: 'https://car.orix.co.jp/shops/?shops_pk=27',
    car: 'https://www.tabirai.net/car/hokkaido/search/rentacar.aspx?SYF=20270206&SYT=20270213&SAFG=1&SATG=1&SAF=101206&SAT=101206&SSM=2&SYFT=15%3A00&SYTT=08%3A00&STP=6&SPF=101&SPT=101',
    closed: 'https://www.kushiro.pref.hokkaido.lg.jp/kk/kkk/kanrika/toukikou.html',
    conditions: 'https://info-road.hdb.hkd.mlit.go.jp/RoadInfo/index.htm',
    aioi: 'https://michinoeki-aioi.com/', shinra: 'https://www.shinra.or.jp/ryuhyo_walk.html',
    picchio: 'https://shiretoko-picchio.com/ryuhyo-jp/', godzilla: 'https://kamuiwakka.jp/utoro/'
  };

  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = (key, label) => '<a href="' + escape(urls[key]) + '" target="_blank" rel="noopener noreferrer">' + escape(label) + '</a>';

  function title(name, sub) {
    return '<div class="dg-heading"><h3>' + escape(name) + '</h3>' + (sub ? '<p>' + escape(sub) + '</p>' : '') + '</div>';
  }

  function transportCard(name, info, content, links) {
    return '<article class="dg-fact"><h4>' + name + '</h4><p class="dg-factbig">' + info + '</p><p>' + content + '</p>' + (links ? '<div class="dg-links">' + links + '</div>' : '') + '</article>';
  }

  function stay(id, item, nights, name, room, rate, policy, links) {
    return '<article class="dg-stay"><img src="' + escape(item?.image || 'img/' + id + '.jpg') + '" alt="' + escape(name) + '" loading="lazy"><div><p class="dg-tag">' + nights + '</p><h4>' + name + '</h4><b class="dg-price">' + rate + '</b><p>' + room + '</p><p>' + policy + '</p><div class="dg-links">' + links + '</div></div></article>';
  }

  const stayOverview = scheme => '<a href="#guide/' + (scheme === 'B' ? 'B' : 'A') + '/stays">查看三段住宿与房型</a>';

  function logistics(inventory, scheme) {
    const dates = window.dotoStayDates();
    const shopping = '2/10 周三换住相生，出美幌前或途经津别镇时买好晚餐与次日早餐。相生道之驿冬季营业到 16:00。';
    return title('七晚住宿','2/6 美幌站前ルポ两晚 → 2/8 美幌生态木屋两晚 → 2/10 津别相生三晚。两个方案的住宿相同。') +
      transportCard('第一段 · ' + dates.reposDates + ' · 两晚','美幌站前ルポ · 首选待订',
        '两晚人均约 ¥19,654（约 825 元）。二楼两间卧室均有房门和三张单人床，客厅与两间卧室各配空调和煤油暖炉。',
        link('repos','指定日期报价') + stayOverview(scheme)) +
      '<div class="dg-twocol">' + stay('s05', inventory.get('s05'),
        '第二段 · ' + dates.ecoDates + ' · 两晚', '美幌生态木屋 · びほろエコハウス',
        '一楼东西各有一间独立双床卧室，中间是客厅和餐厅。', '已约好，两晚人均 ¥7,150 · 约 300 元',
        '8 日入住，8、9 日过夜，10 日退房。', link('eco','美幌町设施介绍') + stayOverview(scheme)) +
      stay('s02', inventory.get('s02'),
        '第三段 · ' + dates.aioiDates + ' · 三晚', '津别相生 · Aioi House',
        '约 50 平方米整栋，一间双人床卧室，一间双单人床卧室。至阿寒湖温泉街约 19 公里，车程约 25 分钟。',
        '三晚原报价人均 ¥16,500 · 约 690 元', '沿用原安排。房价与取消条件以实际预订渠道为准。',
        link('booking','Booking 查询 · 三晚四人') + link('airbnb2','房东照片')) + '</div>' +
      title('航班与四驱租车','时间均为日本当地时间。') +
      '<div class="dg-threecol">' +
      transportCard('2/6 周六 · JAL','12:20 羽田 · 14:00 女満別','去程固定中午起飞，留出首日晚场时间。',link('jal','JAL 官网')) +
      transportCard('2/13 周六 · AIRDO','09:15 女満別 · 11:10 羽田','06:30 从相生出发，08:00 在女満別还车。',link('airdo','AIRDO 官网')) +
      transportCard('たびらい × Orix','StepWGN 四驱七座','2/6 到达后取车，2/13 约 08:00 归还。含税、雪胎、免责补偿，油费另算。人均 ¥23,522（约 990 元）。',link('car','たびらい车型检索')+link('orix','Orix 机场门店')) +
      '</div><p class="dg-note">' + shopping + ' 津別镇的グリーンマートインつべつ一般 08:30–18:00，镇上另有セイコーマート。 ' + link('aioi','道の駅公告') + '</p>';
  }

  function budget(scheme) {
    const dates = window.dotoStayDates();
    const costs = [
      ['机票往返','JAL 去程，AIRDO 回程','¥27,225','约 1,140 元/人'],
      ['七座四驱租车','7 天，含雪胎与免责补偿','¥23,522','约 990 元/人'],
      ['美幌站前ルポ',dates.reposDates + ' · 两晚 · 首选待订','约 ¥19,654','约 825 元/人'],
      ['美幌生态木屋',dates.ecoDates + ' · 两晚 · 已约好','¥7,150','约 300 元/人 · 整栋每晚 ¥14,300（约 601 元），四人平摊'],
      ['津别相生住宿',dates.aioiDates + ' · Aioi House 三晚原报价','¥16,500','约 690 元/人']
    ];
    const total = 27225 + 23522 + dates.reposPerPerson + dates.ecoPerPerson + dates.aioiPrice;
    const heading = title('人均参考合计约 ¥' + Math.round(total).toLocaleString('zh-CN') + ' · 约 ' + Math.round(total * .042).toLocaleString('zh-CN') + ' 元',
      '含往返机票、七座四驱租车与七晚住宿。前两晚按美幌站前ルポ四人整栋报价估算，最终以订房明细为准。');
    return heading + '<div class="dg-budget">' +
      costs.map(([name,info,amount,detail]) => '<div><span><b>' + name + '</b><small>' + info + '</small></span><span><b>' + amount + '</b><small>' + detail + '</small></span></div>').join('') + '</div>' +
      '<div class="dg-twocol dg-budget-notes">' + transportCard('可选 NOC','¥2,310 · 约 100 元/人','额外租车保障，单独决定是否购买。','') +
      transportCard('另付费用','按实际选择','油费、门票、体验和餐食均另付。日程与地图列出的活动、餐食价格为人均参考。','') +
      '</div><p class="dg-note">住宿与租车按四位成人平摊。人民币按 100 日元约合 4.20 元换算。</p><div class="dg-links">' + stayOverview(scheme) + '</div>';
  }

  function winter() {
    const details = [
      ['冬季禁止自驾的路段',[
        '津別峠（道道 588 号）于 2026/11/2–2027/5/21 封路。',
        '道道 52 号摩周第一展望台至跡佐登段于 2026/11/2–2027/4/16 封路。去第一展望台请从弟子屈镇区南侧进入。第三展望台冬季关闭。',
        '裏摩周入口于 2026/10/30–2027/4/20 封闭。オンネトー、知床峠、カムイワッカ冬季道路封闭。',
        '知床五湖一般道路冬季封闭，仅能随认证向导走访。美幌峠和摩周湖カムイテラス遇暴风雪也会临时关闭。'
      ]],
      ['上冰、雪鞋与岸上等候',[
        '父母五十多岁。シンラ开放年龄 7–74 岁、约 1.5 小时、人均 ¥8,000（约 340 元）；ピッキオ知床与ゴジラ岩観光也可分别咨询，最终以运营商年龄及健康条件为准。',
        'ピッキオ知床参考 09:00、15:00，人均 ¥7,000 起（约 290 元起）；ゴジラ岩観光参考 10:00、13:30、15:30，人均 ¥9,000（约 380 元）。须提前报名。',
        '请量力。须能自行穿脱干式服、在不平冰面行走。风浪大或冰未接岸时可能停办。2/9 是周二，知床世界遺産センター休馆。家人可在道の駅うとろ休息或在港边看ゴジラ岩。',
        '小清水海岸雪鞋年龄范围 8–70 岁。冬季知床五湖雪鞋约 3.5 公里、4.5 小时，13–74 岁，适合健脚者。'
      ]],
      ['冬季休业与场次冲突',[
        '夕陽台の湯、ホテル知床日归汤、岩尾別温泉露天風呂冬季关闭。KIKI知床可能因客满暂停日归入浴，请先致电 0152-24-2104。',
        '鹤雅日归汤通常 14:00–18:00，最后入场 15:00。2/11 先看 15:00 イコㇿ，晚上为烟花保留 20:00。',
        '自然堂網走湖公鱼钓 2027 年预约拟于 11 月 20 日开放。女満別湖畔冰钓在 2026 年曾于 2/11 提前收季，2027 年开放日与冰况须另查。'
      ]]
    ];
    return title('雪路与活动条件','出发前看封路公告，当天再查天气、路况和各设施营业情况。') +
      '<div class="dg-links dg-roadlinks">' + link('closed','北海道冬季封路公告')+link('conditions','当日道路信息') + '</div><div class="dg-details">' +
      details.map(([label, lines],i) => '<details' + (i===0?' open':'') + '><summary>' + label + '</summary><ul>' + lines.map(text => '<li>' + text + '</li>').join('') +
        '</ul>' + (i===1 ? '<div class="dg-links">' + link('shinra','シンラ') + link('picchio','ピッキオ知床') + link('godzilla','ゴジラ岩観光') + '</div>' : '') + '</details>').join('') + '</div>';
  }

  window.dotoReference = { logistics, budget, winter };
})();
