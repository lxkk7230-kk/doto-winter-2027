(() => {
  'use strict';

  const urls = {
    eco: 'https://www.town.bihoro.hokkaido.jp/site/kanko/2590.html',
    airbnb2: 'https://www.airbnb.jp/rooms/1425790170855532409',
    booking: 'https://www.booking.com/searchresults.html?ss=Aioi+House+Tsubetsu',
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

  const stayOverview = scheme => '<a href="#guide/' + (scheme === 'B' ? 'B' : 'A') + '/stays">查看两处住宿与房型</a>';

  function logistics(inventory, scheme) {
    const moveEarly = scheme === 'B';
    const dates = window.dotoStayDates(scheme);
    const shopping = moveEarly
      ? '2/9 周二换住。沿国道 240 号去相生，经过津别镇时买菜。道の駅あいおい周二休息。'
      : '2/10 周三换住。出美幌前买好晚餐和次日早餐。若需补给，道の駅あいおい冬季一般 09:00–16:00，周三通常营业。';
    return title('两处整栋住处','四人分住两间独立卧室。2 月 ' + dates.changeDay + ' 日从美幌换住津别相生。') +
      '<div class="dg-twocol">' + stay('s05', inventory.get('s05'),
        dates.ecoDates + ' · ' + dates.ecoNights + ' 晚',
        '美幌生态木屋 · びほろエコハウス', '美幌町在みどりの村设立的整栋环保示范住宅。一楼东西两间独立卧室各有两张单人床，中间是客厅和餐厅。',
        dates.ecoNights + ' 晚人均 ¥' + dates.ecoPrice.toLocaleString('zh-CN') + ' · 约 ' + Math.round(dates.ecoPrice * .042) + ' 元',
        '按町政府研修住宿公示价估算。运营方接受住宿预约，2/6 起的空房、家庭旅行使用条件和最终收费请致电 050-1732-8726。',
        link('eco','町政府价目与预约') + stayOverview(scheme)) +
      stay('s02', inventory.get('s02'),
        dates.aioiDates + ' · ' + dates.aioiNights + ' 晚',
        '津别相生 · Aioi House', '约 50 平方米整栋，一间双人床卧室，一间双单人床卧室。相生至阿寒湖温泉街约 19 公里，车程约 25 分钟。',
        moveEarly ? '4 晚房价待查' : '3 晚原报价人均 ¥16,500 · 约 690 元',
        moveEarly ? '按 2/9–2/13 在 Booking 核对四人整栋的空房、总价与取消条款。' : '原 Booking 报价列 2/9 前免费取消，实际房价和取消截止时刻以预订页为准。',
        link('booking','Booking 搜索') + link('airbnb2','房东照片')) + '</div>' +
      title('航班与四驱租车','时间均为日本当地时间。') +
      '<div class="dg-threecol">' +
      transportCard('2/6 周六 · JAL','12:20 羽田 · 14:00 女満別','去程固定中午起飞，留出首日晚场时间。',link('jal','JAL 官网')) +
      transportCard('2/13 周六 · AIRDO','09:15 女満別 · 11:10 羽田','06:30 从相生出发，08:00 在女満別还车。',link('airdo','AIRDO 官网')) +
      transportCard('たびらい × Orix','StepWGN 四驱七座','2/6 到达后取车，2/13 约 08:00 归还。含税、雪胎、免责补偿，油费另算。人均 ¥23,522（约 990 元）。',link('car','たびらい车型检索')+link('orix','Orix 机场门店')) +
      '</div><p class="dg-note">' + shopping + ' 津別镇的グリーンマートインつべつ一般 08:30–18:00，镇上另有セイコーマート。 ' + link('aioi','道の駅公告') + '</p>';
  }

  function budget(scheme) {
    const dates = window.dotoStayDates(scheme);
    const moveEarly = dates.aioiPrice === null;
    const costs = [
      ['机票往返','JAL 去程，AIRDO 回程','¥27,225','约 1,140 元/人'],
      ['七座四驱租车','7 天，含雪胎与免责补偿','¥23,522','约 990 元/人'],
      ['美幌生态木屋','びほろエコハウス · 研修公示价 · ' + dates.ecoDates,
        '¥' + dates.ecoPrice.toLocaleString('zh-CN'), '约 ' + Math.round(dates.ecoPrice * .042) + ' 元/人'],
      ['相生住宿','Aioi House · ' + dates.aioiDates,
        moveEarly ? '待核价' : '¥16,500', moveEarly ? '四晚整栋待询' : '约 690 元/人']
    ];
    const known = 27225 + 23522 + dates.ecoPrice + (dates.aioiPrice || 0);
    const heading = title((moveEarly ? '已知部分每人约 ' : '预算每人约 ') + '¥' + known.toLocaleString('zh-CN') + ' · 约 ' + Math.round(known * .042).toLocaleString('zh-CN') + ' 元',
      moveEarly ? '含机票、租车及生态木屋三晚研修公示价。相生四晚待核，确认后才能计算七晚总额。'
        : '含机票、租车、美幌生态木屋四晚研修公示价，以及相生三晚的原 Booking 报价。');
    return heading + '<div class="dg-budget">' +
      costs.map(([name,info,amount,detail]) => '<div><span><b>' + name + '</b><small>' + info + '</small></span><span><b>' + amount + '</b><small>' + detail + '</small></span></div>').join('') + '</div>' +
      '<div class="dg-twocol dg-budget-notes">' + transportCard('可选 NOC','¥2,310 · 约 100 元/人','额外租车保障，单独决定是否购买。','') +
      transportCard('另付费用','按实际选择','油费、门票、体验和餐食均另付。日程与地图列出的活动、餐食价格为人均参考。','') +
      '</div><p class="dg-note">生态木屋按四位成人分摊，实际空房和收费以运营方回复为准。人民币按 100 日元约合 4.20 元换算。</p><div class="dg-links">' + stayOverview(scheme) + '</div>';
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
        '请量力。须能自行穿脱干式服、在不平冰面行走。风浪大或冰未接岸时可能停办。岸上可选道の駅うとろ、港边ゴジラ岩，或开放日的知床世界遺産センター。',
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
