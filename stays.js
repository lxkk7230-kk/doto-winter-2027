(() => {
  'use strict';
  const airbnb = (id, nights) => 'https://www.airbnb.jp/rooms/' + id +
    '?check_in=2027-02-06&check_out=2027-02-' + (nights === 4 ? '10' : '09') + '&adults=4&guests=4&currency=JPY';
  const format = n => n.toLocaleString('zh-CN');
  function price(total) {
    return '¥' + format(Math.round(total / 4)) + '<small>约 ' + format(Math.round(total / 4 * .042)) + ' 元 / 人</small>';
  }
  const localPlan = path => window.dotoFloorplan ? window.dotoFloorplan(path) : path;
  const planNobi = 'https://www.bihoro-iju.com/wp-content/themes/bihoro-iju/img/house/plan_05@2x.jpg';
  const planEco = 'https://www.town.bihoro.hokkaido.jp/uploaded/image/4764.png';
  const calendarNobi = 'https://calendar.google.com/calendar/embed?src=reserve%40punctual.co.jp&ctz=Asia%2FTokyo&dates=20270201%2F20270228';
  const external = (url, label) => '<a target="_blank" rel="noopener noreferrer" href="' + esc(url) + '">' + esc(label) + ' ↗</a>';
  const detail = (id, label) => '<button type="button" data-rt-place="' + id + '">' + label + '</button>';

  function candidate(p, cfg, nights) {
    const total = cfg.totals[nights];
    const photos = [[localPlan(p.gallery[0].image), p.gallery[0].caption], [p.image, cfg.otherCaption]];
    const photoRow = photos.map(([image, label]) => '<a href="' + esc(image) + '" target="_blank" rel="noopener" aria-label="放大' + esc(label) + '"><img src="' + esc(image) + '" alt="' + esc(p.name + ' · ' + label) + '"><span>'+esc(label)+'</span></a>').join('');
    return '<article class="stay-card"><div class="stay-pair">' + photoRow + '</div>' +
      '<div class="stay-copy"><div class="stay-status">' + esc(cfg.tag) + '</div><div class="stay-heading"><div><h2>' + esc(cfg.name) + '</h2><p lang="ja">' + esc(p.name) + '</p></div><div class="stay-price">' + price(total) + '</div></div>' +
      '<p class="stay-desc">' + esc(cfg.desc) + '</p><dl class="stay-facts"><dt>怎么睡</dt><dd>' + esc(cfg.rooms) + '</dd><dt>怎么住</dt><dd>' + esc(cfg.drive) + '</dd><dt>房态与费用</dt><dd>' + esc(cfg.status) + '</dd></dl>' +
      '<div class="stay-links">' + detail(p.id,'照片与位置') + external(localPlan(cfg.local), '放大卧室平面图') + external(cfg.source, '房型与收费') + external(cfg.plan, '图纸出处') + (cfg.calendar ? external(cfg.calendar,'看 2 月日历') : '') + '</div></div></article>';
  }

  function render(inventory, scheme) {
    const nights = scheme === 'A' ? 4 : 3;
    const windowName = nights === 4 ? '2/6–2/10' : '2/6–2/9';
    const toggle = (s, str) => '<a href="#guide/' + s + '/stays" ' + (s === scheme ? 'aria-current="true"' : '') + '>' + str + '</a>';
    const nb = candidate(inventory.get('s04'), {
      name:'ビホロノビ',tag:'房东日历未标占用 · 申请制',otherCaption:'房屋外观', totals:{4:101600,3:78200},
      desc:'2023 年翻新的乡间木屋。两对各睡一间，客厅留给大家一起吃饭。',
      rooms:'二楼两间各有房门。主卧有两张床，可以给爸妈睡；次卧铺两套日式被褥。一楼另有一间可铺双人被褥。',
      drive:'女满别机场到房子约 20 分钟。先去 KITEN 领钥匙，再开约 10 分钟到住处。到流冰祭约 36 公里，到乌托罗约 96 公里。',
      status:'本页已计一次清扫和每人每晚住宿税。房东日历在这段日期未标占用，提交问询后由房东确认。',
      source:'https://www.active-management.co.jp/guesthouse-bihoronobi/',plan:planNobi,local:'img/plan-nobi.jpg',calendar:calendarNobi
    }, nights);
    const eco = candidate(inventory.get('s05'), {
      name:'美幌生态木屋',tag:'研修住宿公示价 · 需电话确认',otherCaption:'起居室',totals:{4:52000,3:39000},
      desc:'如果喜欢丘宿宽敞明亮的客厅，可以先看这栋。木结构挑高客厅和大窗户很适合四个人共用。',
      rooms:'一楼东西两间卧室各有两张单人床、各自进门。两对可以都睡床，也不用爬楼。楼上还有第三间卧室。',
      drive:'在美幌站西侧的「みどりの村」，15:00 起入住，有停车场。到流冰祭约 33 公里，到乌托罗约 93 公里，各比站前ルポ多约 2 公里。',
      status:'按镇政府研修住宿公示价计算。家庭旅行能否按此价连住、最终税费和空房须向管理方确认。电话 050-1732-8726。',
      source:'https://www.town.bihoro.hokkaido.jp/site/kanko/2590.html',plan:planEco,local:'img/plan-eco.png'
    }, nights);
    const rep = inventory.get('s01'), other = inventory.get('s06');
    const notes = [
      [rep,'行程原住处 · 站前ルポ',nights === 4 ? 140990 : 109802,'二楼两间独立卧室，各有三张单人床。卫浴在一楼，四个人都能睡床。','Airbnb 指定日期税前价。原行程四晚曾报每人 ¥33,188（约 1,394 元）。', '1806958276032753119'],
      [other,'同镇比价 · BihoroStay A',nights === 4 ? 126500 : 97000,'114 平方米整栋。一楼 A11 有实体门；二楼两间卧区彼此敞开，图纸显示与楼梯厅之间有门。两对宜各住一层。','Airbnb 标注无额外手续费，住宿税未单列。四晚已比丘宿每人贵 ¥2,075（约 87 元）。','1248045537734551104']
    ];
    return '<div class="stay-research"><div class="stay-back"><a href="#guide/' + scheme + '">‹ 返回' + (scheme === 'A' ? '方案一' : '方案二') + '路线</a></div>' +
      '<header class="stay-intro"><div><h1>美幌住宿对比</h1><p>四个人、两对，各自能关上房门。四晚预算按你截图里的丘宿，每人最多 <strong>¥29,550（约 1,241 元）</strong>。</p></div>' +
      '<nav class="stay-switch" aria-label="选择住宿日期">' + toggle('A','2/6–10 · 四晚') + toggle('B','2/6–9 · 三晚') + '</nav></header>' +
      '<div class="stay-subhead"><h2>预算内先看这两栋</h2><span>' + windowName + ' · 全程人均住宿费</span></div><div class="stay-grid">' + nb + eco + '</div>' +
      '<div class="stay-subhead"><h2>另两栋同镇房源</h2><span>四晚均高于丘宿截图价</span></div><div class="stay-grid">' +
      notes.map(([p,name,total,layout,info,id])=>'<article class="stay-compare"><button type="button" data-rt-place="'+p.id+'" aria-label="查看'+esc(name)+'"><img loading="lazy" src="'+esc(p.image)+'" alt="'+esc(p.name)+'"></button><div><h3>'+esc(name)+'</h3><div class="stay-amount">'+price(total)+'</div><p>'+esc(layout)+'</p><p>'+esc(info)+'</p><div class="stay-links">'+detail(p.id,'照片与位置')+external(airbnb(id,nights),'查看这几晚的报价')+(p.id==='s06'?external(localPlan('img/plan-stay-a.jpg'),'放大楼层平面图'):'')+'</div></div></article>').join('') + '</div>' +
      '<aside class="stay-excluded"><b>截图里的「丘宿」为什么从行程里拿掉了？</b><p>它有一间双床卧室。四人入住时，另外两人睡在厨房旁的地铺。两套行程都从站前ルポ出发。</p>' +
      external('https://gloce.airhost.co/ja/houses/342493','丘宿房型说明')+'</aside>'+
      '<details class="stay-checked"><summary>另外查过哪些房子？</summary><p>Bihoro111 Family Villa 的房东日历在 2/6、2/7 没有余房。Guest House Lea lea 在楽天トラベル上查询两段日期均无空房。日の出民泊住宅通过移住体验项目受理，这趟家庭观光能否享受该价格尚待确认。</p><div class="stay-links">'+external('https://nena.airhost.co/ja/houses/867559?start_date=2027-02-06&end_date=2027-02-10&adults=4','Bihoro111 房东日历')+external('https://travel.rakuten.co.jp/HOTEL/200161/200161.html','Lea lea 的楽天房源')+external('https://www.bihoro-iju.com/experience/house/','美幌町体验住宅')+'</div></details><p class="stay-foot">路程为地图估算的单程公路距离。核价日期为 2026 年 11 月 19 日。人民币按 100 日元约合 4.20 元换算。金额为四位成人平摊，仅供选房。</p></div>';
  }
  window.dotoStayResearch = render;
})();
