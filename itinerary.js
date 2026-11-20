(() => {
  'use strict';
  const plans = window.DOTO_PLANS;
  const staySequence = '网走 2 晚 · 美幌 2 晚 · 相生 3 晚';
  const meta = {
    A:{label:'推荐行程',title:'7 日乘破冰船',photo:'a02',detail:'8 日轻松换住，9 日从木屋去知床'},
    B:{label:'停航备选',title:'8 日上午补船',photo:'a01',detail:'7 日留网走，8 日下船后照常入住木屋'}
  };
  const names = {airport:'女满别机场',abashiriBase:'网走市区（待订）',s05:'美幌生态木屋',s02:'相生住处',a31:'相生道之驿',a01:'流冰祭',a02:'破冰船',a12:'流冰徒步',a20:'湖面滑冰',a22:'伊克罗',a24:'冬華美烟花',f001:'钏路市中心',orix:'Orix 还车'};
  const week = ['六','日','一','二','三','四','五','六'];
  const dates = [6,7,8,9,10,11,12,13];
  const esc = v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = (s,d,variant) => '#guide/'+s+(d?'/'+d:'')+(d===12 && variant==='kushiro'?'/kushiro':'');
  let view;
  function draw({root,items,showDetail,icon}) {
    const parts=location.hash.slice(1).split('/');
    const scheme=parts[1]==='B'?'B':'A';
    const date=dates.includes(Number(parts[2]))?Number(parts[2]):0;
    const study=parts[2]==='stays';
    const variant=date===12 && parts[3]==='kushiro'?'kushiro':'';
    const key=scheme+'/'+(study?'stays':date)+'/'+variant;
    if(!view || view.root!==root) {
      const inventory=new Map(items.map(i=>[i.id,i]));
      root.innerHTML='<div class="rt-wrap"><div class="rt-stay-page" hidden></div><div class="rt-route-page"><header class="rt-intro"><div><h1>行程路线</h1><p>2027 年 2 月 6–13 日 <span>·</span> 北海道道东</p></div><span class="rt-trip">'+icon('calendar',17)+' 8 天 7 晚 · 4 人同行</span></header>'+
        '<nav class="rt-plans" aria-label="选择行程方案"></nav><a class="rt-stay-entry"></a>'+
        '<div class="rt-work"><aside class="rt-index"><h2>选一天看路线</h2><nav class="rt-days" aria-label="日期与停靠点"></nav></aside>'+
        '<div class="rt-right"><section class="rt-chart"><div class="rt-chartbar"><div><span class="rt-kicker"></span><h2 class="rt-maptitle"></h2></div><div class="rt-tools"><button type="button" class="rt-fit" title="显示整条路线" aria-label="显示整条路线">'+icon('focus',18)+'</button><button type="button" class="rt-expand" aria-label="展开大地图">'+icon('expand',17)+'<span>大图</span></button></div></div>'+
        '<div class="rt-mobile-picker"><label>看哪天 <select aria-label="选择要查看的路线日期"></select></label></div>'+
        '<div class="rt-free-choice"></div><div class="rt-chain"></div><div class="rt-canvas" aria-label="道东行车路线互动地图"></div><div class="rt-foot"></div></section><div class="rt-story"></div></div></div>'+
        '<section class="rt-ref"><h2>行前资料</h2><div class="rt-refitems"></div></section></div></div>';
      const mapNode=root.querySelector('.rt-canvas');
      const frame=root.querySelector('.rt-chart');
      const chooseDay = d=>{location.hash=url(view.scheme,d)};
      view={root,key:null,scheme,date,inventory,showDetail,icon,map:window.dotoMap.makeMap(mapNode,inventory,chooseDay,showDetail)};
      const resize=new ResizeObserver(()=>view.map.resize());resize.observe(mapNode);
      const expandBtn=root.querySelector('.rt-expand');
      function expand(wanted) {
        frame.classList.toggle('rt-expanded',wanted);
        expandBtn.innerHTML=icon(wanted?'shrink':'expand',17)+'<span>'+(wanted?'收起':'大图')+'</span>';
        expandBtn.setAttribute('aria-label',wanted?'收起大地图':'展开大地图'); expandBtn.setAttribute('aria-pressed',String(wanted));
        requestAnimationFrame(()=>view.map.fit());
      }
      expandBtn.onclick=()=>expand(!frame.classList.contains('rt-expanded'));
      document.addEventListener('keydown',e=>{if(e.key==='Escape' && !document.querySelector('#detail')?.open && frame.classList.contains('rt-expanded'))expand(false);});
      window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#guide')&&frame.classList.contains('rt-expanded'))expand(false);});
      root.querySelector('.rt-fit').onclick=()=>view.map.fit();
      root.querySelector('.rt-mobile-picker select').onchange=e=>chooseDay(+e.target.value);
      root.addEventListener('click',e=>{
        const place=e.target.closest('[data-rt-place]');
        if(place)showDetail(place.dataset.rtPlace);
        const pin=e.target.closest('[data-rt-focus]');
        if(pin) {view.map.focusStop(pin.dataset.rtFocus);frame.scrollIntoView({block:'nearest'});}
      });
    }
    if(view.key===key){if(!study)view.map.resize();return;}
    const {inventory,map}=view;
    view.key=key;view.scheme=scheme;view.date=date;
    const research=root.querySelector('.rt-stay-page');
    root.querySelector('.rt-route-page').hidden=study;
    research.hidden=!study;
    if(study){
      research.innerHTML=window.dotoStayResearch(inventory,scheme);
      root.scrollTop=0;
      return;
    }
    const entry=root.querySelector('.rt-stay-entry');
    entry.href=url(scheme,'stays');
    entry.innerHTML=icon('home',18)+'<span>网走市区（待订） <i>→</i> 美幌生态木屋（已约 8、9 日） <i>→</i> Aioi House</span><b>查看住宿日期与房型</b>';
    const daily=plans[scheme].days;
    const day=variant?plans[scheme].alternatives[variant]:daily[date];
    const colors=window.dotoMap.dayColors;
    root.querySelector('.rt-plans').innerHTML=Object.entries(meta).map(([id,m])=>{
      const item=inventory.get(m.photo);
      return '<a href="'+url(id,date,variant)+'" class="rt-plan" data-scheme="'+id+'" '+(id===scheme?'aria-current="true"':'')+'><img src="'+esc(item.image)+'" alt=""><div><span class="rt-planname">'+m.label+' <i>／</i> '+staySequence+'</span><strong>'+m.title+'</strong><small>'+m.detail+'</small></div><span class="rt-choice">'+(id===scheme?icon('check',15):'')+'</span></a>';
    }).join('');
    const nav=root.querySelector('.rt-days');
    nav.innerHTML='<a href="'+url(scheme)+'" class="rt-all" '+(!date?'aria-current="true"':'')+'>'+icon('map',18)+' 八天总览</a>'+
      dates.map(d=>{
        const item=daily[d]; const night=d===13?'返抵羽田':d<=7?'住网走 · 待订':d<=9?'住美幌木屋 · 已约':'住相生';
        return '<a href="'+url(scheme,d)+'" data-rt-day="'+d+'" class="rt-day" style="--day:'+colors[d]+'" '+(d===date?'aria-current="date"':'')+'><span class="rt-cal"><b>2/'+d+'</b><small>周'+week[d-6]+'</small></span><span class="rt-daytext"><strong>'+esc(item.short)+'</strong><small>'+night+(d===7||d===8?' <i></i> 方案差异':'')+'</small></span>'+icon('chevron',14)+'</a>';
      }).join('');
    const selector=root.querySelector('.rt-mobile-picker select');
    selector.innerHTML='<option value="0">八天总览</option>'+dates.map(d=>'<option value="'+d+'">2/'+d+' 周'+week[d-6]+' · '+esc(daily[d].short)+'</option>').join('');
    selector.value=String(date);
    root.dataset.scheme=scheme;
    root.querySelector('.rt-kicker').textContent=meta[scheme].label+' · '+(date?'2 月 '+date+' 日 周'+week[date-6]:'全程');
    root.querySelector('.rt-maptitle').textContent=date?day.short:'八天行车路线';
    const choice=root.querySelector('.rt-free-choice');
    choice.hidden=Boolean(date && date!==12);
    if(!choice.hidden){
      const options=[['','留在相生','没有固定安排'],['kushiro','去钏路玩一天','单程约 2 小时']];
      choice.innerHTML='<strong>2/12 自由日</strong><div>'+options.map(([v,label,note])=>'<a href="'+url(scheme,12,v)+'" '+(date===12 && variant===v?'aria-current="true"':'')+'><b>'+label+'</b><small>'+note+'</small></a>').join('')+'</div>';
    }
    const geo=variant?window.DOTO_ROUTES.alternatives[variant]:window.DOTO_ROUTES.days[scheme][date];
    const distance=geo && Number.isFinite(geo.km)?(geo.km===0?'市内自由活动':'约 '+(geo.km<1?geo.km.toFixed(1):Math.round(geo.km))+' 公里'):'';
    const chain=root.querySelector('.rt-chain');
    chain.hidden=!date;
    if(date) {
      chain.style.setProperty('--day',colors[date]);
      chain.innerHTML=day.stops.map((s,i)=>{
        const id=s.mapId||s.id;
        const label=names[id]||s.name;
        const caption=id==='s02'&&date===11?(i===0?'相生出发':'回相生'):label;
        const tag='<b>'+String(i+1)+'</b>'+esc(caption);
        return id && window.DOTO_ROUTES.points[id]?'<button type="button" data-rt-focus="'+esc(id)+'">'+tag+'</button>':'<span>'+tag+'</span>';
      }).join('<i aria-hidden="true">›</i>');
    }
    const modes=date>=6&&date<=8?'网走以 JR 網走駅示意，确定房源后再按实际地址导航':date===11?'实线自驾 · 虚线步行约 '+geo.walkKm+' 公里 · P 为停车场':date===6||date===13?'实线自驾 · 虚线为机场接驳':'沿道路估算，雪天预留时间';
    root.querySelector('.rt-foot').innerHTML=date?
      '<b style="--day:'+colors[date]+'"><i></i>'+esc(distance||'当日路线')+'</b><span>'+esc(day.summary)+'</span><small>'+esc(modes)+'</small>':
      '<b>'+icon('home',15)+' 住宿顺序</b><span>'+staySequence+'。选一天看当天的停靠顺序。</span>';
    map.paint(scheme,date,variant);
    const story=root.querySelector('.rt-story');
    if(date) {
      story.innerHTML='<article class="rt-agenda" style="--day:'+colors[date]+'"><div class="rt-agendahead"><div><span class="rt-kicker">当天安排</span><h2>'+esc(day.title)+'</h2></div><span class="rt-night">'+icon(date===13?'plane':'home',16)+' '+esc(day.night)+'</span></div><ol>'+
        day.stops.map((s,i)=>{
          const id=s.mapId||s.id;const onMap=id&&window.DOTO_ROUTES.points[id];
          const item=s.id&&inventory.get(s.id);
          return '<li><div class="rt-stopidx">'+(i+1)+'</div><time>'+esc(s.time)+'</time><div class="rt-stoptext">'+(item?'<button type="button" data-rt-place="'+esc(item.id)+'">'+esc(s.name)+'</button>':'<strong>'+esc(s.name)+'</strong>')+'<p>'+esc(s.note)+'</p></div>'+(onMap?'<button class="rt-target" type="button" title="在当天地图定位" aria-label="在地图定位 '+esc(s.name)+'" data-rt-focus="'+esc(id)+'">'+icon('focus',16)+'</button>':'')+'</li>';
        }).join('')+'</ol><p class="rt-note">'+esc(day.note)+'</p><div class="rt-sources">'+day.links.map(l=>'<a href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.name)+'</a>').join('')+'</div></article>';
    } else {
      const fork=[7,8];
      story.innerHTML='<section class="rt-fork"><h2>破冰船与换住时间</h2><div>'+fork.map(d=>'<a href="'+url(scheme,d)+'"><b>2/'+d+'</b><span>'+esc(daily[d].title)+'</span>'+icon('chevron',15)+'</a>').join('')+'</div></section>';
    }
    const reference=window.dotoReference;
    if(reference) {
      root.querySelector('.rt-refitems').innerHTML=[['住宿与交通',()=>reference.logistics(inventory,scheme)],['人均费用',()=>reference.budget(scheme)],['冬季封路与活动条件',reference.winter]].map(([label,fn])=>'<details><summary>'+label+'</summary><div class="dg-wrap rt-refbody">'+fn()+'</div></details>').join('');
    }
  }
  window.renderGuide=draw;
})();
