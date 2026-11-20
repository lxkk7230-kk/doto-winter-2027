(() => {
  'use strict';
  const abashiri = '网走市区 · 住处待订';
  const bihoro = '美幌 · びほろエコハウス';
  const aioi = '津别相生 · Aioi House';
  const stop = (time, name, note, id, mapId) => ({ time, name, note, id, mapId });
  const link = (name, url) => ({ name, url });
  const roads = link('北海道冬季封路', 'https://www.kushiro.pref.hokkaido.lg.jp/kk/kkk/kanrika/toukikou.html');
  const station = link('相生道之驿', 'https://michinoeki-aioi.com/');
  const abashiriMap = 'abashiriBase';
  const access = link('机场到网走市区', 'https://visit-abashiri.jp/access/');
  const sailing = link('おーろら船班', 'https://www.ms-aurora.com/abashiri/prices/');
  const cabin = link('美幌木屋入住信息', 'https://bihoro.jp/hotel/127/');
  const townStop = (time, name, note) => stop(time, name, note, undefined, abashiriMap);
  const embark = stop('09:30–10:30','网走乘おーろら破冰船','建议提前订 09:30 班，09:10 前办完手续。航程约 1 小时，人均 ¥7,000（约 290 元）。','a02');
  const cabinArrival = stop('约 15:00','入住びほろエコハウス','按你们与木屋约定的时间交接钥匙。住 8、9 日两晚，10 日上午退房。','s05');
  const arrival = {
    short:'网走流冰祭晚场', title:'抵达后住网走，晚上看流冰祭', summary:'女满别机场 → 网走市区 → 网走商港埠头 → 市区', night:abashiri, hero:'a01',
    stops:[
      stop('12:20–14:00','JAL 羽田飞女满别','14:00 抵达，取四驱车。机场至网走市区通常约 30 分钟，冬季另留余量。','airport'),
      townStop('取车后','到网走放行李','建议首两晚连住网走市区。图上用 JR 網走駅表示区域，确认房源后请按房东地址导航。'),
      stop('傍晚','網走流氷まつり','到商港埠头看冰雕和晚场，计划至 20:00。入场人均 ¥0（0 元）。','a01'),
      townStop('看完后','在网走过夜','附近吃完晚饭，就回市区住处。')
    ],
    note:'找整栋且有两间独立卧室的住处。第二天的码头也在网走市区。', links:[link('流冰祭官方日程','https://visit-abashiri.jp/event/b9b5c81d6a90669b636d2b1511eafef4416fbcc5.html'),access]
  };
  const boat = {
    short:'网走坐破冰船', title:'上午看流冰，下午留白',summary:'网走市区 → 破冰船码头 → 市区',night:abashiri,hero:'a02',
    stops:[
      townStop('早餐后','从网走住处出发','到道の駅流氷街道網走的码头，按实际住址安排出门时间。'),embark,
      townStop('下船后自由','在网走连住第二晚','在港边吃个午饭，下午想休息就回住处。')
    ], note:'若船方取消 7 日的班次，切换到停航备选，问 8 日上午还有没有船位。',links:[sailing]
  };
  const moveToCabin = {
    short:'入住美幌小木屋',title:'网走退房，下午搬进约好的小木屋',summary:'网走市区 → 美幌生态木屋',night:bihoro,hero:'s05',
    stops:[
      townStop('上午退房','告别网走','睡饱、吃过早餐再走。网走到美幌冬季预留约 45–60 分钟，途中可以顺路买菜。'),
      cabinArrival
    ],note:'今天只换住处。知床的车程留给明天。',links:[cabin]
  };
  const weatherDay = {
    short:'停航时留在网走',title:'船停航，就在网走休息一天',summary:'网走市区自由活动 · 当晚续住',night:abashiri,hero:'a01',
    stops:[townStop('全天自由','留在网走市区','先联系船公司问 8 日上午的空位。如果想再看流冰祭，周日白天计划至 16:00 开放。')],
    note:'第二晚继续住同一处。地图标的是网走站周边，今天不用按路线开车。',links:[sailing]
  };
  const makeupBoat = {
    short:'补船后入住小木屋',title:'上午在网走补船，下午再去美幌',summary:'网走市区 → 破冰船码头 → 美幌生态木屋',night:bihoro,hero:'a02',
    stops:[
      townStop('早餐后','网走退房','按船班安排退房和行李，给码头手续预留至少 20 分钟。'),
      {...embark, time:'上午 · 以改订为准',note:'改订成功再去码头。航程约 1 小时，人均 ¥7,000（约 290 元）。若仍停航，下午照常去木屋。'},
      cabinArrival
    ],note:'午饭后再向美幌出发。9 日仍从木屋往返知床。',links:[sailing,cabin]
  };

  const iceWalk = {
    short:'知床走流冰',title:'把这一天留给乌托罗的流冰',summary:'美幌木屋 → ウトロ集合点 → 木屋',night:bihoro,hero:'a12',
    stops:[
      stop('约 08:30','木屋出发','到乌托罗单程约 2–2.5 小时，到了在港边吃午饭。','s05'),
      stop('13:00–14:30','シンラ 流氷ウォーク','提前报名，按向导邮件到道の駅うとろ等指定地点集合。人均 ¥8,000（约 340 元）。需自行穿脱干式服并能在不平冰面行走，请量力。','a12'),
      stop('约 14:45','回美幌','走完就返程，天黑前能多走一段。','s05')
    ],
    note:'不上冰的家人可在道の駅うとろ等。风浪大或流冰未接岸时，以向导通知为准。', links:[link('シンラ集合与场次','https://www.shinra.or.jp/ryuhyo_walk.html')]
  };
  const transfer = {
    short:'美幌换住相生',title:'买好食材，直接去相生住下',summary:'美幌木屋 → 经津别镇 → Aioi House',night:aioi,hero:'s02',
    stops:[
      stop('上午 10:00 前','美幌木屋退房','在美幌或顺路的津别镇买好晚饭和早餐。','s05'),
      stop('下午','入住 Aioi House','沿国道 240 号到相生，两处住处相距约 40 公里，冬季可留 1 小时，另计采购和等候入住。','s02')
    ],
    note:'10 日上午结束已约的两晚木屋住宿。接下来连住相生三晚。',links:[station,roads]
  };
  const lakeAkan = {
    short:'阿寒湖滑冰、烟花',title:'一个下午和晚上，都在阿寒湖',summary:'相生 → 阿寒湖温泉街和湖岸 → 相生',night:aioi,hero:'a24',
    stops:[
      stop('午前后','从相生去阿寒湖','单程约 25 分钟。车停湖边，接下来在同一个温泉小镇活动。','s02'),
      stop('午后','あいすランド阿寒滑冰','冰场开放时，滑一小时就有充足时间换鞋、暖身。租鞋及场地人均约 ¥1,100（约 46 元）。','a20'),
      stop('15:00–15:30','伊克罗《満月のリㇺセ》','建国纪念日按冬季节假日场次。人均 ¥2,200（约 90 元），看完坐下来吃饭、歇到烟花开场。','a22'),
      stop('约 20:00','湖畔看冬華美烟花','人均 ¥0（0 元），具体时刻与观赏位置行前核对活动方公告。','a24'),
      stop('烟花结束','回 Aioi House','沿来路返回，车程约 25 分钟。','s02')
    ],
    note:'下午的演出和晚上的烟花互不冲突。两场之间的时间都留给休息。',links:[link('湖面冰场','https://www.koudai-akan.com/iceland.html'),link('伊克罗演出日程','https://www.akanainu.jp/schedule/'),link('冬華美烟花','https://www.tsurugagroup.com/plans/fuyu_hanabi/')]
  };
  const freeDay = {
    short:'自由日 · 相生或钏路',title:'住处附近随意走走，几点出门都行',summary:'Aioi House → 道の駅あいおい（可选）→ 住处',night:aioi,hero:'a31',
    stops:[
      stop('睡到自然醒','在相生吃早餐','想留在屋里休息，今天就没有车程。','s02'),
      stop('想出门时','道の駅あいおい','旧车站就在旁边。可买刚烤好的クマヤキ，人均一枚 ¥240（约 10 元），或坐下来吃午饭。','a31'),
      stop('下午','回 Aioi House','收好行李，第二天早上直接去机场。','s02')
    ],
    note:'也可以把整天给钏路。上方切换后就能看往返路线。',links:[station,link('相生鉄道公園','https://michinoeki-aioi.com/look/')]
  };
  const kushiro = {
    short:'自由日 · 钏路一日游',title:'留一整天给钏路，只逛想逛的地方',summary:'Aioi House → 钏路市中心自由活动 → Aioi House',night:aioi,hero:'f001',
    stops:[
      stop('早餐后','从相生出发','沿阿寒方向去钏路，单程约 2 小时，遇雪更久。','s02'),
      stop('白天自由','逛钏路市区','地图用和商市场标出市中心的落脚点。想吃海鲜可在这里做一碗勝手丼，人均约 ¥2,500（约 105 元）。吃什么、走多远，都到时再决定。','f001'),
      stop('下午或晚饭后','回相生过夜','想早点回就下午走。想吃炉端烧才留到 17:00 开门，饭后还有约 2 小时雪夜车程。','s02')
    ],
    note:'荣町 3-1「炉ばた」为可选晚饭。想去可电话 0154-22-6636 问位。次日仍在 06:30 从相生出发。',links:[link('釧路和商市場','https://www.washoichiba.com/'),link('炉ばた营业时间','https://www.robata.cc/'),link('相生至钏路车程','https://michinoeki-aioi.com/kumayaki/')]
  };
  const departure = {
    short:'还车与返程',title:'06:30 离开相生，08:00 还车',summary:'相生 → Orix 女满别空港店 → 女满别航站楼 → 羽田',night:'返抵羽田',hero:'airport',
    stops:[
      stop('06:30','从 Aioi House 出发','到女满别约 1 小时，另留约半小时雪路余量。','s02'),
      stop('约 08:00','Orix 女満別空港店还车','交车后乘门店接驳去航站楼，提车时提前核对早班交接。',undefined,'orix'),
      stop('09:15–11:10','AIRDO 飞回羽田','09:15 女满别起飞，11:10 抵达羽田。','airport')
    ],
    note:'早餐和行李前一晚准备好。',links:[link('Orix 女満別空港店','https://car.orix.co.jp/shops/?shops_pk=27'),link('AIRDO','https://www.airdo.jp/')]
  };
  const common = {6:arrival,9:iceWalk,10:transfer,11:lakeAkan,12:freeDay,13:departure};
  window.DOTO_PLANS = {
    A:{days:{...common,7:boat,8:moveToCabin},alternatives:{kushiro}},
    B:{days:{...common,7:weatherDay,8:makeupBoat},alternatives:{kushiro}}
  };
})();
