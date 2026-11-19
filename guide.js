(() => {
  'use strict';

  const urls = {
    airbnb1: 'https://www.airbnb.jp/rooms/1806958276032753119',
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

  const stayChoices = scheme => '<a href="#guide/' + (scheme === 'B' ? 'B' : 'A') + '/stays">比较美幌住宿</a>';

  function logistics(inventory, scheme) {
    const moveEarly = scheme === 'B';
    const shopping = moveEarly
      ? '2/9 周二换住。去上里森林吃过午饭后，回津别镇买菜再前往相生。道の駅あいおい周二休息。'
      : '2/10 周三换住。出美幌前买好晚餐和次日早餐。若需补给，道の駅あいおい冬季一般 09:00–16:00，周三通常营业。';
    return title('两处整栋住处','四人同行，每处都选两间独立卧室。') +
      '<div class="dg-twocol">' + stay('s01', inventory.get('s01'),
        moveEarly ? '2/6 入住 · 2/9 退房 · 3 晚' : '2/6 入住 · 2/10 退房 · 4 晚',
        '美幌站前 · ゲストハウス ルポ', '两间独立卧室都在二楼，每间 3 张单人床。可停 3 台车，女満別机场至住处约 15 分钟。',
        moveEarly ? '3 晚人均 ¥27,451 · 约 1,153 元' : '4 晚人均 ¥35,248 · 约 1,480 元',
        '11 月 19 日 Airbnb 四人入住税前价。报价列 2 月 5 日前免费取消，具体时刻见下单页。',
        link('airbnb1','Airbnb 房源') + stayChoices(scheme)) +
      stay('s02', inventory.get('s02'),
        moveEarly ? '2/9 入住 · 2/13 退房 · 4 晚' : '2/10 入住 · 2/13 退房 · 3 晚',
        'Aioi House', '津別町相生，整栋约 50 平方米。一间双人床卧室，一间双单人床卧室。相生至阿寒湖约 25 分钟。',
        moveEarly ? '4 晚房价待查' : '3 晚原报价人均 ¥16,500 · 约 690 元',
        moveEarly ? '按 2/9–2/13 在 Booking 重新核对四人整栋房价、空房和取消条款。' : '原 Booking 报价在 2 月 9 日前可免费取消。Airbnb 曾列 2 月 5 日，以实际下单渠道为准。',
        link('booking','Booking 搜索') + link('airbnb2','Airbnb 备查')) + '</div>' +
      title('航班与四驱租车','时间均为日本当地时间。') +
      '<div class="dg-threecol">' +
      transportCard('2/6 周六 · JAL','12:20 羽田 · 14:00 女満別','去程固定中午起飞，留出首日晚场时间。',link('jal','JAL 官网')) +
      transportCard('2/13 周六 · AIRDO','09:15 女満別 · 11:10 羽田','06:30 从相生出发，08:00 在女満別还车。',link('airdo','AIRDO 官网')) +
      transportCard('たびらい × Orix','StepWGN 四驱七座','2/6 到达后取车，2/13 约 08:00 归还。含税、雪胎、免责补偿，油费另算。人均 ¥23,522（约 990 元）。',link('car','たびらい车型检索')+link('orix','Orix 机场门店')) +
      '</div><p class="dg-note">' + shopping + ' 津別镇的グリーンマートインつべつ一般 08:30–18:00，镇上另有セイコーマート。 ' + link('aioi','道の駅公告') + '</p>';
  }

  function budget(scheme) {
    const moveEarly = scheme === 'B';
    const costs = [
      ['机票往返','JAL 去程，AIRDO 回程','¥27,225','约 1,140 元/人'],
      ['七座四驱租车','7 天，含雪胎与免责补偿','¥23,522','约 990 元/人'],
      ['美幌站前ルポ','Airbnb 税前 · ' + (moveEarly ? '2/6–2/9 三晚' : '2/6–2/10 四晚'),
        moveEarly ? '¥27,451' : '¥35,248', moveEarly ? '约 1,153 元/人' : '约 1,480 元/人'],
      ['相生住宿','Aioi House · ' + (moveEarly ? '4 晚' : '3 晚'),
        moveEarly ? '待核价' : '¥16,500', moveEarly ? '2/9–2/13' : '约 690 元/人']
    ];
    const heading = moveEarly
      ? title('已知部分每人约 ¥78,198 · 约 3,284 元','含机票、租车及站前ルポ三晚税前价。相生四晚房价待查，七晚合计待定。')
      : title('目前估算每人约 ¥102,495 · 约 4,305 元','含机票、租车、站前ルポ四晚税前价，以及相生三晚原报价。');
    return heading + '<div class="dg-budget">' +
      costs.map(([name,info,amount,detail]) => '<div><span><b>' + name + '</b><small>' + info + '</small></span><span><b>' + amount + '</b><small>' + detail + '</small></span></div>').join('') + '</div>' +
      '<div class="dg-twocol dg-budget-notes">' + transportCard('可选 NOC','¥2,310 · 约 100 元/人','额外租车保障，单独决定是否购买。','') +
      transportCard('另付费用','按实际选择','油费、门票、体验和餐食均另付。日程与地图列出的活动、餐食价格为人均参考。','') +
      '</div><p class="dg-note">' + (moveEarly
        ? '相生 2/9–2/13 的房价及取消期限以四晚订单为准。'
        : '原预算按站前ルポ四晚人均 ¥33,188（约 1,390 元）计算，原合计人均 ¥100,435（约 4,220 元）。') +
      ' 人民币按 100 日元约合 4.20 元折算。另收的住宿税以结算时为准。</p><div class="dg-links">' + stayChoices(scheme) + '</div>';
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
