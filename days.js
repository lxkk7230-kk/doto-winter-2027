(() => {
  'use strict';
  const bihoro = '美幌 · びほろエコハウス';
  const aioi = '津别相生 · Aioi House';
  const stop = (time, name, note, id, mapId) => ({ time, name, note, id, mapId });
  const link = (name, url) => ({ name, url });
  const roads = link('北海道冬季封路', 'https://www.kushiro.pref.hokkaido.lg.jp/kk/kkk/kanrika/toukikou.html');
  const station = link('相生道之驿', 'https://michinoeki-aioi.com/');
  const arrival = {
    short:'网走流冰祭晚场', title:'安顿好，只去网走看晚场', summary:'女满别机场 → 美幌木屋 → 网走港 → 木屋', night:bihoro, hero:'a01',
    stops:[
      stop('12:20–14:00','JAL 羽田飞女满别','到达后取四驱车。','airport'),
      stop('约 15:00','美幌木屋放行李','机场至木屋约 15–25 分钟。木屋的入住和交钥匙时间请提前电话确认。','s05'),
      stop('15:40 后出发','網走流氷まつり','木屋至网走港约 30–40 分钟。晚场至 20:00，人均 ¥0（0 元）。','a01'),
      stop('看完后','回木屋','晚饭在网走或回美幌吃，随当晚胃口。','s05')
    ],
    note:'当天唯一要赶的是流冰祭晚场。', links:[link('流冰祭官方日程','https://visit-abashiri.jp/event/b9b5c81d6a90669b636d2b1511eafef4416fbcc5.html')]
  };
  const boat = {
    short:'网走坐破冰船', title:'坐一班破冰船，下午留白',summary:'美幌木屋 → 网走港 → 木屋',night:bihoro,hero:'a02',
    stops:[
      stop('约 08:00','木屋出发','去网走港约 30–40 分钟，给雪路和办手续留时间。','s05'),
      stop('09:30–10:30','流氷観光砕氷船 おーろら','建议提前订 09:30 班，09:10 前办手续。人均 ¥7,000（约 290 元）。','a02'),
      stop('下船后自由','回美幌或在港边吃午饭','几点回木屋都可以。','s05')
    ],
    note:'若 7 日停航，先确认 8 日船位，再问向导能否把知床移到 9 日。',links:[link('おーろら船班','https://www.ms-aurora.com/abashiri/prices/')]
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
  const northReserve = {
    short:'美幌自由日',title:'给流冰留一天，也可以睡到自然醒',summary:'自由日 · 地图示意想看海雕时的往返',night:bihoro,hero:'a09',
    stops:[
      stop('上午','在木屋慢慢吃早餐','前两天都顺利，今天就由你们安排。','s05'),
      stop('有兴致才去','网走看海雕','当天只挑这一件就够。自然堂向导行程约 90 分钟，人均 ¥5,000（约 210 元），需确认集合与空位。','a09'),
      stop('下午','回木屋','也可以整天留在美幌，明天再换住处。','s05')
    ],
    note:'若船和知床顺延，今天直接用来补知床，观鸟留给下次。',links:[link('自然堂观鸟','https://www.jinendo.net/program_w/program03/')]
  };
  const transfer = {
    short:'美幌换住相生',title:'买好食材，直接去相生住下',summary:'美幌木屋 → 经津别镇 → Aioi House',night:aioi,hero:'s02',
    stops:[
      stop('上午退房','离开美幌木屋','在美幌或顺路的津别镇买好晚饭和早餐。','s05'),
      stop('下午','入住 Aioi House','沿国道 240 号到相生，两处住处相距约 40 公里，冬季可留 1 小时，另计采购和等候入住。','s02')
    ],
    note:'这是全程唯一一次搬行李。把下午留给新住处和周围，不绕去湖区。',links:[station,roads]
  };
  const earlyTransfer = {...transfer,note:'方案二在周二提前一天换住，相生道之驿周二休，可在津别镇买菜。若冰上活动顺延至今天，提前与向导核对场次和到店时间；想给天气留完整一天，选方案一更宽松。'};
  const mashu = {
    short:'天气好去摩周湖',title:'有能见度，就去摩周湖看一眼',summary:'相生 → 经弟子屈镇 → 摩周第一展望台 → 原路回相生',night:aioi,hero:'a28',
    stops:[
      stop('早餐后','相生出发','先查展望台开放和山上能见度，再决定出门。','s02'),
      stop('上午或午后','摩周湖カムイテラス','经弟子屈镇，从南线到第一展望台。冬季停车人均 ¥0（0 元）。停车后短走即可看湖。','a28'),
      stop('看够就走','回相生','走同一条南线下山，可顺路在弟子屈吃碗拉面。','s02')
    ],
    note:'只选一个湖。北侧去川汤的道道 52 号冬季封闭；遇大雪就在相生休息。',links:[link('摩周第一展望台','https://mashuko-iozan.jp/mashuko-kamui-terrace'),roads]
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
  const common = {6:arrival,7:boat,8:iceWalk,11:lakeAkan,12:freeDay,13:departure};
  window.DOTO_PLANS = {
    A:{days:{...common,9:northReserve,10:transfer},alternatives:{kushiro}},
    B:{days:{...common,9:earlyTransfer,10:mashu},alternatives:{kushiro}}
  };
})();
