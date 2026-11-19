(() => {
  'use strict';

  const days = [
    {
      date: 6, week: '周六', short: '网走流冰祭', title: '第一晚，去网走看流冰祭',
      route: '羽田 · 女満別 · 美幌 · 網走', night: '美幌 Le Pou', drive: '机场至美幌约 15 分钟，美幌至网走约 30–40 分钟。',
      hero: 'a01', tag: '固定晚场', choices: ['a01','s01','f021'],
      stops: [
        ['12:20', '羽田起飞', '乘 JAL 前往女満別，14:00 抵达。'],
        ['14:00', '机场取车，先放行李', '领取 StepWGN 四驱七座，约 15:00 到 Guest House Le Pou。'],
        ['15:40 后', '出发去網走商港埠頭', '流冰祭首日 10:00–20:00，免费。把晚场留在今天。'],
        ['晚间', '网走晚饭，再回美幌', '可选有烤螃蟹的五十集屋。给雪夜回程留足时间。']
      ],
      note: '如果取车或入住晚一些，仍先去流冰祭，依晚场结束时间调整晚饭。'
    },
    {
      date: 7, week: '周日', short: '网走破冰船', title: '从船上看鄂霍次克海的流冰',
      route: '美幌 · 網走港 · 天都山 · 美幌', night: '美幌 Le Pou', drive: '美幌至船码头约 30–40 分钟。',
      hero: 'a02', tag: '优先安排', choices: ['a02','a03','f025'],
      stops: [
        ['09:30 左右', '美幌出发', '以 11:00 船班为例，提前至少 20 分钟到柜台办手续。请提前预约。'],
        ['11:00', '流氷観光砕氷船 おーろら', '航程约 1 小时，人均 ¥7,000（约 290 元）。也可选 09:30、12:30、14:00 或 15:30。'],
        ['中午', '道の駅流氷街道網走', '码头楼上可吃網走ちゃんぽん。若昨晚没看够，祭典今天至 16:00。'],
        ['下午', 'オホーツク流氷館', '冬季 16:00 停止入馆，16:30 关闭。人均 ¥990（约 40 元），山顶展望台免费。']
      ],
      note: '如果停航，把船改到 2 月 8 日，知床顺延到 9 日，今天用缓冲日的备选。縁戸周日、周一休。'
    },
    {
      date: 8, week: '周一', short: '知床流冰走', title: '到乌托罗，和向导走上流冰',
      route: '美幌 · ウトロ · オシンコシンの滝 · 美幌', night: '美幌 Le Pou', drive: '美幌至ウトロ单程约 2–2.5 小时，雪天另加时间。',
      hero: 'a12', tag: '随冰况调整', choices: ['a12','a15','a14'],
      stops: [
        ['07:30', '美幌出发', '留出雪路和换装时间，优先选午前稍晚或午后早段的场次。'],
        ['午间前后', '流氷ウォーク', '干式服上冰约 1.5–2 小时，人均约 ¥7,000–9,000（约 290–380 元）。以预订场次为准。'],
        ['午餐', '道の駅うとろ・シリエトク', '想留在岸上的家人可在这里休息，再去看ゴジラ岩；知床世界遺産センター冬季周二休馆。'],
        ['约 16:00', '从ウトロ返程', '能见度好可在国道停车场看オシンコシンの滝。瀑布上方道路、卖店和厕所冬季关闭。']
      ],
      note: '父母五十多岁，在三家候选运营商的年龄范围内。每人仍须能自行穿脱干式服、在凹凸冰面行走，请量力。未接岸或风浪大时听向导安排。'
    },
    {
      date: 9, week: '周二', short: '美幌缓冲日', title: '给流冰和天气，留一天余地',
      route: '美幌 · 網走湖或能取岬 · 美幌', night: '美幌 Le Pou', drive: '美幌至网走监狱约 20 分钟，至能取岬约 35–45 分钟。',
      hero: 'a04', tag: '缓冲日', choices: ['a04','a06','a11'],
      stops: [
        ['上午', '选一个主要活动', '博物館網走監獄 09:00–17:00，人均 ¥1,500（约 60 元）；也可改为自然堂湖上钓公鱼。'],
        ['午间', '帐篷钓或市区午餐', '自然堂手ぶら钓约 130 分钟，人均 ¥7,000（约 290 元）。预约与结冰情况先确认。'],
        ['下午', '风小再去能取岬', '停车场附近看海，免费。雪大时直接回美幌休息。'],
        ['晚间', '峠の湯びほろ', '一般 10:00–22:00，人均 ¥600（约 25 元）。本月第二个周三为明天。']
      ],
      note: '若今天换成知床，按 2 月 8 日的路线走。道の駅うとろ可等候；世界遗产中心冬季周二休馆。'
    },
    {
      date: 10, week: '周三', short: '搬家去相生', title: '经屈斜路湖与阿寒湖，搬去相生',
      route: '美幌峠 · 屈斜路湖砂湯 · 硫黄山 · 阿寒湖 · 津別 · 相生', night: '相生 Aioi House', drive: '按完整路线留出一整天。草案约 2.5–3.5 小时，雪路、游览和买菜另留余量。',
      hero: 'a25', tag: '更换住处', choices: ['a27','a25','s02'],
      stops: [
        ['约 08:30', '从美幌退房出发', '走国道 243 号到美幌峠。若暴风雪导致临时封路，跳过山口，按当天开放公路前往住处。'],
        ['上午至中午', '砂湯看天鹅，再看硫黄山', '湖岸较滑，在岸边看。餐食可选砂湯レストハウス或川湯，午后经弟子屈方向往阿寒湖。'],
        ['下午', '经阿寒湖前往津別镇补给', '先买晚餐和次日早餐。グリーンマートインつべつ一般 08:30–18:00，另有セイコーマート。'],
        ['傍晚', '入住 Aioi House', '津別镇至相生约 15–20 分钟。道の駅あいおい周三通常营业，冬季 16:00 关门。']
      ],
      note: '当天跳过摩周湖。相生住处旁边缺少餐馆和超市，如买菜时间紧，先去津別镇。'
    },
    {
      date: 11, week: '周四', short: '阿寒湖节日', title: '下午看阿伊努舞，夜里等湖上烟花',
      route: '相生 · 阿寒湖温泉 · アイヌコタン · 相生', night: '相生 Aioi House', drive: '相生至阿寒湖温泉单程约 25 分钟。',
      hero: 'a24', tag: '建国纪念日', choices: ['a22','a24','a20'],
      stops: [
        ['上午', '自选冰上钓或雪上摩托', 'あいすランド阿寒依结冰开放。公鱼钓人均 ¥2,200（约 90 元），雪上摩托约 ¥2,200–3,850（约 90–160 元）。'],
        ['中午', 'アイヌコタン逛工坊', '可预约民芸喫茶ポロンノ，尝阿伊努发酵土豆料理。'],
        ['15:00', '在イコㇿ看「満月のリムセ」', '冬季周末和节日有场，约 30 分钟，无需预约。人均 ¥2,200（约 90 元）。'],
        ['约 20:00', '阿寒湖冰上冬華美', '往年约 19:45 仪式、20:00 烟花，免费。2027 年日程待官网公布，当天下午再次确认。']
      ],
      note: '鹤雅日归汤最后入场一般为 15:00，另择时间。20:00 古式舞踊与烟花同时，今天保留烟花。'
    },
    {
      date: 12, week: '周五', short: '钏路炉端烧', title: '从丹顶鹤的雪原，走到炉端的炭火旁',
      route: '相生 · 阿寒国際ツルセンター · 釧路市区 · 相生', night: '相生 Aioi House', drive: '相生至钏路单程约 2 小时，途经阿寒国際ツルセンター。',
      hero: 'dinner', tag: '固定晚餐', choices: ['a32','f001','dinner'],
      stops: [
        ['上午', '阿寒国際ツルセンター', '相生出发约 1–1.5 小时。中心 09:00 开馆。想约 08:00 去户外观察，先问投喂地点、时段及能否进入。'],
        ['中午', '和商市場吃勝手丼', '自己挑海胆、蟹、扇贝配一碗米饭，人均约 ¥2,500（约 105 元）。周五一般营业。'],
        ['下午', '在幣舞橋走一小段', '还有余力，再挑钏路市湿原展望台或细岡展望台其中一处。'],
        ['17:00', '荣町 3-1「炉ばた」晚餐', '营业至 23:00，不定休，请提前致电 0154-22-6636 订位。约 19:00 开回相生，预计约 21:00 到。']
      ],
      note: '晚餐认准荣町 3-1 的发祥店。浜っ子位于荣町 2-1；港边的岸壁炉ばた仅 5–10 月营业。提前备好油料，次晨赶飞机。'
    },
    {
      date: 13, week: '周六', short: '女满别返程', title: '06:30 出发，08:00 还车',
      route: '相生 · 女満別空港 · 羽田', night: '返回羽田', drive: '相生至女満別机场约 1 小时，另留约 30 分钟雪路余量。',
      hero: 'airport', tag: '固定航班', choices: ['airport','s02'],
      stops: [
        ['06:30', '从 Aioi House 出发', '前一晚收好行李和早餐，直接前往女満別机场。'],
        ['约 07:30', '到达机场附近', '留出加油、卸行李和检查车况的时间。'],
        ['08:00', '女満別空港店还车', '交还车辆后乘门店接驳车前往航站楼。柜台办理和接驳均需预留时间。'],
        ['09:15', 'AIRDO 飞往羽田', '11:10 抵达羽田。早晨只安排还车和乘机。']
      ],
      note: '还车与起飞时间固定。取车时向 Orix 确认早班返还点、油箱要求和航站楼接驳安排。'
    }
  ];

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
  const state = {section: 'days', day: 0};

  function title(name, sub) {
    return '<div class="dg-heading"><h3>' + escape(name) + '</h3>' + (sub ? '<p>' + escape(sub) + '</p>' : '') + '</div>';
  }

  function placeName(item) {
    return item.name || item.cn || '';
  }

  function price(item) {
    if (typeof item.yen === 'number') return '¥' + item.yen.toLocaleString('zh-CN') + ' · 约 ' + item.cny + ' 元/人';
    return item.price || item.cost || '';
  }

  function choiceCards(ids, inventory) {
    const places = ids.map(id => inventory.get(id)).filter(Boolean);
    if (!places.length) return '';
    return '<div class="dg-choiceblock"><h4>当天地点</h4><div class="dg-choices">' + places.map(item =>
      '<button type="button" class="dg-choice" data-guide-place="' + escape(item.id) + '">' +
      (item.image ? '<img loading="lazy" src="' + escape(item.image) + '" alt="">' : '') +
      '<span><b>' + escape(placeName(item)) + '</b><small>' + escape(price(item) || item.region) + '</small></span></button>'
    ).join('') + '</div></div>';
  }

  function dayContent(inventory) {
    const day = days[state.day];
    const hero = inventory.get(day.hero) || {image: 'img/' + day.hero + '.jpg', name: day.short};
    return '<article class="dg-daypanel" aria-label="' + day.date + ' 日行程">' +
      '<div class="dg-overview"><button type="button" class="dg-photo" data-guide-place="' + escape(day.hero) + '" aria-label="查看' + escape(placeName(hero)) + '的详情"><img src="' + escape(hero.image || ('img/' + day.hero + '.jpg')) + '" alt="' + escape(placeName(hero)) + '"></button>' +
      '<div class="dg-daybody"><p class="dg-tag">' + escape(day.tag) + ' <span>·</span> 2 月 ' + day.date + ' 日 ' + day.week + '</p>' +
      '<h3>' + escape(day.title) + '</h3><p class="dg-route">' + escape(day.route) + '</p>' +
      '<dl class="dg-info"><div><dt>车程</dt><dd>' + escape(day.drive) + '</dd></div><div><dt>' + (day.date === 13 ? '抵达' : '过夜') + '</dt><dd>' + escape(day.night) + '</dd></div></dl></div></div><div class="dg-daybody dg-agenda"><h4>当天安排</h4>' +
      '<ol class="dg-stops">' + day.stops.map(([when, place, info]) => '<li><time>' + escape(when) + '</time><div><b>' + escape(place) + '</b><p>' + escape(info) + '</p></div></li>').join('') + '</ol>' +
      '<p class="dg-note">' + escape(day.note) + '</p>' + choiceCards(day.choices,inventory) + '</div></article>';
  }

  function daysView(inventory) {
    return '<div class="dg-dayselect" aria-label="选择日期">' + days.map((day, i) =>
      '<button type="button" data-guide-day="' + i + '" aria-pressed="' + (state.day === i) + '"><span>2/' + day.date + ' <small>' + day.week + '</small></span><b>' + escape(day.short) + '</b></button>'
    ).join('') + '</div><div data-guide-detail>' + dayContent(inventory) + '</div>' +
      '<div class="dg-footnote">2 月 7、8、9 日可随海况对调。优先 7 日坐船；若改到 8 日，知床顺延到 9 日。</div>';
  }

  function transportCard(name, info, content, links) {
    return '<article class="dg-fact"><h4>' + name + '</h4><p class="dg-factbig">' + info + '</p><p>' + content + '</p>' + (links ? '<div class="dg-links">' + links + '</div>' : '') + '</article>';
  }

  function stay(id, item, nights, name, room, rate, policy, links) {
    return '<article class="dg-stay"><img src="' + escape(item?.image || 'img/' + id + '.jpg') + '" alt="' + escape(name) + '" loading="lazy"><div><p class="dg-tag">' + nights + '</p><h4>' + name + '</h4><b class="dg-price">' + rate + '</b><p>' + room + '</p><p>' + policy + '</p><div class="dg-links">' + links + '</div></div></article>';
  }

  function logistics(inventory) {
    return title('住在哪里，怎么往返','四人同行，两处均按整栋、两间独立卧室选择。') +
      '<div class="dg-twocol">' + stay('s01',inventory.get('s01'),'2/6 入住 · 2/10 退房 · 4 晚','Guest House Le Pou','美幌站前。两间卧室各有 3 张单人床，可停 3 台车。女満別机场至住处约 15 分钟。','¥33,188 · 约 1,390 元/人','草案所列 Airbnb 条款为 2 月 5 日前可免费取消，预订页核对截止时刻。',link('airbnb1','Airbnb 房源')) +
      stay('s02',inventory.get('s02'),'2/10 入住 · 2/13 退房 · 3 晚','Aioi House','津別町相生，整栋约 50 平方米。一间双人床卧室，一间双单人床卧室。相生至阿寒湖约 25 分钟。','¥16,500 · 约 690 元/人','按 Booking 口径，2 月 9 日前可免费取消。Airbnb 曾列 2 月 5 日，按下单渠道核对。',link('booking','Booking 搜索')+link('airbnb2','Airbnb 备查')) + '</div>' +
      title('航班与四驱租车','时间均为日本当地时间。') +
      '<div class="dg-threecol">' +
      transportCard('2/6 周六 · JAL','12:20 羽田 · 14:00 女満別','去程固定中午起飞，留出首日晚场时间。',link('jal','JAL 官网')) +
      transportCard('2/13 周六 · AIRDO','09:15 女満別 · 11:10 羽田','06:30 从相生出发，08:00 在女満別还车。',link('airdo','AIRDO 官网')) +
      transportCard('たびらい × Orix','StepWGN 四驱七座','2/6 到达后取车，2/13 约 08:00 归还。含税、雪胎、免责补偿，油费另算。人均 ¥23,522（约 990 元）。',link('car','たびらい车型检索')+link('orix','Orix 机场门店')) +
      '</div><p class="dg-note">相生采购可放在搬家当天下午。津別镇的グリーンマートインつべつ一般 08:30–18:00，另有セイコーマート。道の駅あいおい冬季 09:00–16:00，周二休息。 '+ link('aioi','道の駅公告') + '</p>';
  }

  function budget() {
    const costs = [
      ['机票往返','JAL 去程，AIRDO 回程','27,225','1,140'],
      ['七座四驱租车','7 天，含雪胎与免责补偿','23,522','990'],
      ['美幌住宿','Guest House Le Pou · 4 晚','33,188','1,390'],
      ['相生住宿','Aioi House · 3 晚','16,500','690']
    ];
    return title('每人约 ¥100,435','约合人民币 4,220 元，包含往返机票、两处住宿和七座四驱租车。') +
      '<div class="dg-budget">' + costs.map(([name,info,yen,cny]) => '<div><span><b>' + name + '</b><small>' + info + '</small></span><span><b>¥' + yen + '</b><small>约 ' + cny + ' 元/人</small></span></div>').join('') + '</div>' +
      '<div class="dg-twocol dg-budget-notes">' + transportCard('可选 NOC','¥2,310 · 约 100 元/人','额外租车保障，单独决定是否购买。','') +
      transportCard('另付费用','按实际选择','油费、门票、体验和餐食均另付。日程与地图列出的活动、餐食价格为人均参考。','') +
      '</div><p class="dg-note">按 2026 年 11 月 19 日资料估算，100 日元约合 4.20 元。机票和美幌住宿曾按 1 美元约 150 日元换算。请在下单时核对总额和取消条款。</p>';
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

  window.renderGuide = function ({root, items, showDetail}) {
    const inventory = new Map(items.map(item => [item.id, item]));
    const sections = [['days','每日安排'],['travel','住宿与交通'],['budget','人均费用'],['winter','冬季路况与活动']];
    root.innerHTML = '<div class="dg-wrap"><header class="dg-intro"><div><p>2027 年 2 月 6 日至 13 日</p><h2>每日行程</h2></div><span>4 人同行 <i>·</i> 8 天 7 晚</span></header>' +
      '<nav class="dg-nav" aria-label="行程资料">' + sections.map(([key, label]) => '<button type="button" data-guide-section="' + key + '" aria-pressed="' + (state.section===key) + '">' + label + '</button>').join('') +
      '</nav><div class="dg-body" data-guide-body></div></div>';
    const body = root.querySelector('[data-guide-body]');
    function showSection() {
      const draw = {days: daysView, travel: logistics, budget, winter};
      body.innerHTML = draw[state.section](inventory);
    }
    showSection();
    root.onclick = event => {
      const target = event.target.closest('button');
      if (!target || !root.contains(target)) return;
      if (target.dataset.guidePlace) {
        showDetail(target.dataset.guidePlace);
      } else if (target.hasAttribute('data-guide-day')) {
        state.day = Number(target.dataset.guideDay);
        body.querySelectorAll('[data-guide-day]').forEach(button => button.setAttribute('aria-pressed', String(button===target)));
        body.querySelector('[data-guide-detail]').innerHTML = dayContent(inventory);
      } else if (target.dataset.guideSection) {
        state.section = target.dataset.guideSection;
        root.querySelectorAll('[data-guide-section]').forEach(button => button.setAttribute('aria-pressed', String(button===target)));
        showSection();
      }
    };
  };
})();
