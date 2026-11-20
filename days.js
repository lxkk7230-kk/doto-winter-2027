(() => {
  'use strict';
  const kitami = '北见 · Miyoshi 別邸（待订）';
  const bihoro = '美幌 · びほろエコハウス';
  const aioi = '津别相生 · Aioi House';
  const stop = (time, name, note, id, mapId) => ({ time, name, note, id, mapId });
  const link = (name, url) => ({ name, url });
  const roads = link('北海道冬季封路', 'https://www.kushiro.pref.hokkaido.lg.jp/kk/kkk/kanrika/toukikou.html');
  const station = link('相生道之驿', 'https://michinoeki-aioi.com/');
  const firstStay = link('Miyoshi 別邸 · 房源与入住说明', window.dotoStaySearch?.first || 'https://www.airbnb.jp/rooms/1691606985272696121?check_in=2027-02-06&check_out=2027-02-08&adults=4&currency=JPY');
  const driveTimes = link('北见至网走 · 道东观光路线', 'https://ja.visit-eastern-hokkaido.jp/plans/route39/');
  const sailing = link('おーろら船班', 'https://www.ms-aurora.com/abashiri/prices/');
  const cabin = link('美幌木屋入住信息', 'https://bihoro.jp/hotel/127/');
  const kitamiStop = (time, name, note) => stop(time, name, note, 's01');
  const embark = stop('11:00–12:00','网走乘おーろら破冰船','提前订 11:00 班。建议 10:15 左右到道の駅流氷街道網走，最晚 10:40 办完手续。航程约 1 小时，人均 ¥7,000（约 290 元）。','a02');
  const cabinArrival = stop('约 15:00','入住びほろエコハウス','以电话约定的交接时间为准。已约 8、9 日两晚，整栋每晚 ¥14,300（约 601 元），两晚人均 ¥7,150（约 300 元）。','s05');
  const arrival = {
    short:'网走流冰祭晚场', title:'下飞机直奔网走，看完流冰祭再去北见', summary:'女满别机场 → 网走商港埠头 → 北见 Miyoshi 別邸', night:kitami, hero:'a01',
    stops:[
      stop('12:20–14:00','JAL 羽田飞女满别','14:00 抵达女满别。取好行李后前往租车门店。','airport'),
      stop('约 15:00','Orix 女満別空港店取车','取七座四驱，带行李直接去网走。门店到会场约 22 公里，雪天行车预留 40–60 分钟，另留停车时间。',undefined,'orix'),
      stop('约 16:00 起','網走流氷まつり','在网走商港埠头看冰雕和晚场。会场至 20:00，入场人均 ¥0（0 元）。','a01'),
      kitamiStop('晚场后','前往北见 Miyoshi 別邸','会场至北见住处约 48 公里，冬季单程预留 1 小时 10 分至 1 小时 35 分。若 20:00 离开，预计约 21:10–21:35 抵达，停车散场和降雪还可能延后。')
    ],
    note:'北见房源可自助入住。订前先确认约 21:30 到店能否取钥匙。若须早到，按房东截止时间倒推离场，提前约 1 小时 35 分钟再加散场余量。', links:[link('流冰祭官方日程','https://visit-abashiri.jp/event/b9b5c81d6a90669b636d2b1511eafef4416fbcc5.html'),firstStay,driveTimes]
  };
  const boat = {
    short:'网走坐破冰船', title:'上午坐 11 点的船，下午留白',summary:'北见 Miyoshi 別邸 → 网走破冰船码头 → 北见',night:kitami,hero:'a02',
    stops:[
      kitamiStop('约 08:35','从北见去网走港','早饭后出发，北见至码头约 47 公里，冬季单程预留 1 小时 10 分至 1 小时 35 分。先看船公司的运行通知，雪大时再提早。'),embark,
      kitamiStop('午饭后','回北见连住第二晚','可在码头附近用午饭，下午按体力返回北见。')
    ], note:'7 日若停航，先问 8 日上午的空位。若正常开船但海面无流冰，船公司可能改走能取岬观光航线。',links:[sailing,driveTimes]
  };
  const moveToCabin = {
    short:'入住美幌小木屋',title:'北见退房，在美幌吃午饭、住木屋',summary:'北见 Miyoshi 別邸 → 美幌生态木屋',night:bihoro,hero:'s05',
    stops:[
      kitamiStop('上午','北见退房','退房按房东约定。带行李向美幌出发，北见至木屋约 28 公里，冬季预留 40–55 分钟。'),
      cabinArrival
    ],note:'上午和下午交接之间，在美幌镇上吃午饭就好。今天只搬一次行李。',links:[firstStay,cabin]
  };
  const weatherDay = {
    short:'停航时留在北见',title:'船停航，当天就在北见休息',summary:'北见 Miyoshi 別邸 · 当晚续住',night:kitami,hero:'s01',
    stops:[kitamiStop('全天自由','在北见休息','先向船公司查询 8 日上午的船位，再决定是否补船。住处步行范围内有超市和便利店。')],
    note:'留在北见没有必要往返网走。8 日和 9 日已有木屋预约。',links:[sailing,firstStay]
  };
  const makeupBoat = {
    short:'补船后入住小木屋',title:'上午网走补船，下午交接美幌木屋',summary:'北见 Miyoshi 別邸 → 网走破冰船码头 → 美幌生态木屋',night:bihoro,hero:'a02',
    stops:[
      kitamiStop('约 08:35','北见退房，带行李去网走','按补订 11:00 班估算，至码头约 47 公里，冬季单程预留 1 小时 10 分至 1 小时 35 分。若班次有变，按实际开船时间倒推。'),
      {...embark,name:'补乘おーろら破冰船'},
      {...cabinArrival,note:'下船后在网走吃午饭，再开往美幌木屋，雪天预留约 40–60 分钟。按已约时间交接钥匙。'}
    ],note:'先确认余位和当天运行。若 8 日仍停航，就从北见直接去美幌木屋，单程约 40–55 分钟。',links:[sailing,cabin,driveTimes]
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
