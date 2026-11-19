(() => {
  'use strict';

  const states = new Map();
  const active = new WeakMap();
  const foodGroups = ['钏路', '网走', '女满别·大空', '美幌·津别', '知床·斜里', '清里·小清水', '弟子屈·阿寒湖'];
  const playGroups = ['美幌·网走', '知床', '阿寒·津别', '钏路'];
  const specialities = [
    ['炭火炉端烧', 'dinner', '钏路的炉边，鱼贝交给炭火。'],
    ['勝手丼', 'f001', '自己挑刺身，盖在热饭上。'],
    ['ザンギ', 'f006', '带酱油底味的钏路炸鸡。'],
    ['スパカツ', 'f005', '热铁盘上的猪排肉酱意面。'],
    ['成吉思汗烤肉', 'f028', '生羊肉配蔬菜，围炉现烤。'],
    ['鄂霍次克蟹', 'f021', '在网走试试用生蟹直接炭烤。'],
    ['弟子屈拉面', 'f078', '摩周山麓的鱼介酱油汤。'],
    ['阿伊努料理', 'f085', '在阿寒湖尝发酵土豆与山菜。'],
  ];
  const alerts = {
    f022: '2/7、2/8 店休', f058: '冬季营业待确认', f078: '出发前确认总本店地址',
    f046: '返程起飞时尚未开门', f047: '返程起飞时尚未开门', dinner: '钏路一日游可选',
    a01: '2/6 晚固定', a02: '优先 2/7', a12: '请量力，提前报名',
    a20: '必做滑冰 · 视冰场开放', a22: '2/11 节日 15:00', a24: '2027 场次待公布', a18: '仅随认证向导进入',
  };

  function escape(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  }

  function groupOf(item, food) {
    if (!food) {
      const n = parseInt(item.id.slice(1), 10);
      return playGroups[n <= 11 ? 0 : n <= 19 ? 1 : n <= 31 ? 2 : 3];
    }
    const n = Number(item.id.slice(1));
    if (item.id === 'dinner' || n <= 20 || n === 91) return foodGroups[0];
    if (n <= 33) return foodGroups[1];
    if (n <= 43 || n >= 92) return foodGroups[3];
    if (n <= 51) return foodGroups[2];
    if (n <= 63) return foodGroups[4];
    if (n <= 73) return foodGroups[5];
    return foodGroups[6];
  }

  function titleOf(item) {
    return item.title || String(item.cn || item.name).split(/[（(]/)[0];
  }

  function priceOf(item) {
    if (item.price) return item.price;
    if (item.yen != null) return '¥' + Number(item.yen).toLocaleString('zh-CN') + '（约 ' + item.cny + ' 元）';
    return '按现场菜单';
  }

  function picture(item, extraClass = '') {
    if (!item.image) return '<div class="wg-photo wg-photo-pending">现场照片待补</div>';
    const src = escape(item.image);
    return '<div class="wg-photo '+extraClass+'" style="--wg-picture:url(&quot;'+src+'&quot;)"><img src="'+src+'" alt="'+escape(titleOf(item))+'实景" loading="lazy" decoding="async"></div>';
  }

  function bookmark(item, ctx, hero = false) {
    const picked=ctx.saved.has(item.id);
    return '<button type="button" class="wg-bookmark'+(picked?' wg-chosen':'')+(hero?' wg-hero-save':'')+'" data-wg-pick="'+escape(item.id)+'" aria-pressed="'+picked+'" aria-label="'+escape((picked?'从想去清单移除':'加入想去清单，')+titleOf(item))+'" title="'+(picked?'已加入想去清单':'加入想去清单')+'">'+ctx.icon(picked?'check':'bookmark',19)+'</button>';
  }

  function hero(ctx, items, food) {
    const item = items.find(p => p.id === (food?'f028':'a02')) || items[0];
    const title = food ? '道东美食图鉴' : '冬季玩乐菜单';
    const kicker = food ? '沿着自驾环线吃什么' : '从两处住宿出发';
    const desc = food ? '网走的炭烤生羊肉、川汤的拉面、阿寒湖畔的阿伊努料理，沿途按口味挑一餐。' : '在海上看流冰，去湖边看天鹅，或找间温泉歇脚。挑好想去的地方，再决定哪天出发。';
    const count = food ? items.filter(p=>/^f\d{3}$/.test(p.id)).length : items.length;
    const stats = food ? count+' 家自选餐厅 · 另收钏路「炉ばた」' : count+' 项体验 · 4 个地区';
    const photo = item ? '<div class="wg-cover"><button type="button" data-wg-open="'+item.id+'" class="wg-cover-main">'+picture(item)+'<span class="wg-cover-cap"><span>'+ (food?'网走 · 生羊肉成吉思汗烤肉':'优先 2 月 7 日 · 网走')+'</span><strong>'+escape(item.name)+'</strong></span></button>'+bookmark(item,ctx,true)+'</div>' : '';
    return '<header class="wg-mast"><div class="wg-mast-copy"><span class="wg-over">'+kicker+'</span><h1>'+title+'</h1><p>'+desc+'</p><span class="wg-stats">'+stats+'</span></div>'+photo+'</header>';
  }

  function winterRoads() {
    return '<details class="wg-notes"><summary><span><strong>冬季通行</strong> 津別峠、知床峠封路。去摩周第一展望台请从弟子屈南侧进。</span><span class="wg-disclosure" aria-hidden="true">⌄</span></summary><div class="wg-note-body"><ul>'+
    '<li>津別峠（道道 588 号）封至 5 月 21 日。摩周第一展望台至跡佐登（道道 52 号）封至 4 月 16 日，裏摩周入口封至 4 月 20 日。</li>'+
    '<li>オンネトー、カムイワッカ冬季车辆无法进入。知床五湖一般道路封闭，仅能随认证向导入内。</li>'+
    '<li>夕陽台の湯、ホテル知床日帰り湯、岩尾別温泉露天風呂冬季停业。美幌峠和摩周湖展望点遇暴风雪可能临时关闭。</li></ul>'+
    '<a href="https://www.kushiro.pref.hokkaido.lg.jp/kk/kkk/kanrika/toukikou.html" target="_blank" rel="noopener">查看北海道官方封路公告</a></div></details>';
  }

  function guide(ctx, items, food) {
    if (!food) return winterRoads();
    const entries=specialities.map(([name,id,note])=>{
      const p=items.find(i=>i.id===id);
      return p ? '<button class="wg-special" type="button" data-wg-open="'+id+'">'+picture(p)+'<span><strong>'+name+'</strong><small>'+note+'</small></span></button>' : '';
    }).join('');
    return '<details class="wg-notes"><summary><span><strong>当地特色</strong> 炉端烧、勝手丼、阿伊努料理等八种地方味。</span><span class="wg-disclosure" aria-hidden="true">⌄</span></summary><div class="wg-specialities">'+entries+'</div></details>';
  }

  function card(item,ctx,food) {
    const title=titleOf(item);
    const japanese=item.name || '';
    const note=alerts[item.id] || (item.must?'行程必做':'');
    const category = food ? (item.type || '炉端烧') : groupOf(item,false);
    const summary=item.highlight || item.description || item.signature || '';
    const badge=note ? '<span class="wg-card-alert">'+escape(note)+'</span>' : '';
    const meta=(food ? item.region : '') || category;
    return '<article class="wg-card"><button type="button" data-wg-open="'+escape(item.id)+'" class="wg-card-main">'+
      '<div class="wg-card-visual">'+picture(item)+badge+'</div>'+
      '<div class="wg-card-copy"><div class="wg-card-meta">'+escape(meta)+(food && category!==meta?' · '+escape(category):'')+'</div>'+
      '<h3>'+escape(title)+'</h3>'+(japanese && title!==japanese?'<div class="wg-jp" lang="ja">'+escape(japanese)+'</div>':'')+
      '<p>'+escape(summary)+'</p><div class="wg-card-price"><small>人均参考</small><strong>'+escape(priceOf(item).replace(/^人均[约约\s]*/,''))+'</strong></div>'+
      '</div></button>'+bookmark(item,ctx)+'</article>';
  }

  function controlValue(ctx, mainItems, isFood) {
    const perMode=ctx.mode;
    if (!states.has(perMode)) {
      const validGroups=isFood ? foodGroups : playGroups;
      const group=new URL(location.href).searchParams.get(perMode+'Region');
      states.set(perMode,{region:validGroups.includes(group)?group:'全部',type:'全部',part:'全部',search:'',must:false,limit:16});
    }
    return states.get(perMode);
  }

  function match(item,s,food) {
    if (s.region!=='全部' && groupOf(item,food)!==s.region) return false;
    if (s.type!=='全部' && (item.type || (item.id==='dinner'?'炉端烧':''))!==s.type) return false;
    if (s.must && !item.must) return false;
    if (food && s.region==='钏路' && s.part!=='全部' && item.id!=='dinner') {
      const upper=Number(item.id.slice(1))<=11;
      if ((s.part==='上篇')!==upper) return false;
    }
    if (!s.search.trim()) return true;
    const text=[item.name,item.cn,item.type,item.region,item.highlight,item.signature,item.description,groupOf(item,food),item.title].join(' ').normalize('NFKC').toLowerCase();
    return s.search.toLowerCase().normalize('NFKC').trim().split(/\s+/).every(w=>text.includes(w));
  }

  function chip(text,count,key,value,selected) {
    return '<button type="button" class="wg-chip" data-wg-'+key+'="'+escape(value)+'" aria-pressed="'+selected+'">'+escape(text)+(count==null?'':' <span>'+count+'</span>')+'</button>';
  }

  function regionControls(normal,s,food) {
    const groups=food?foodGroups:playGroups;
    const chips=[chip('全部地区',normal.length,'region','全部',s.region==='全部'),...groups.map(g=>chip(g,normal.filter(p=>groupOf(p,food)===g).length,'region',g,g===s.region))];
    return '<div class="wg-regions" aria-label="按地区筛选">'+chips.join('')+'</div>';
  }

  function filterControls(ctx,normal,s,food) {
    const types=[...new Set(normal.map(p=>p.type).filter(Boolean))];
    const select=food?'<label class="wg-select"><span>菜式</span><select data-wg-type aria-label="按菜式筛选">'+['全部',...types].map(t=>'<option value="'+escape(t)+'"'+(s.type===t?' selected':'')+'>'+escape(t==='全部'?'全部菜式':t)+'</option>').join('')+'</select><b aria-hidden="true">⌄</b></label>':'';
    const must=food?'':chip('只看必做',null,'must','toggle',s.must);
    return '<div class="wg-filters"><label class="wg-search">'+ctx.icon('search',19)+'<input type="search" data-wg-query placeholder="'+(food?'搜店名、菜名或地区':'搜景点、温泉或体验')+'" value="'+escape(s.search)+'" aria-label="搜索图鉴"></label>'+select+must+'</div>';
  }

  function results(ctx,normal,extra,s,food) {
    const root=ctx.root;
    const filtered=normal.filter(p=>match(p,s,food));
    const extras=s.part==='全部' ? extra.filter(p=>match(p,s,food)) : [];
    const parts=root.querySelector('[data-wg-parts]');
    parts.innerHTML=food && s.region==='钏路' ? '<div class="wg-parts" aria-label="钏路分篇">'+['全部','上篇','下篇'].map((v,i)=>chip(['钏路全篇','上篇','下篇'][i],[21,11,10][i],'part',v,s.part===v)).join('')+'</div>' : '';
    root.querySelector('[data-wg-count]').textContent=food ? filtered.length+' 家自选餐厅'+(extras.length?' · 另收钏路「炉ばた」':'') : filtered.length+' 项玩乐';
    const displayed=filtered.slice(0,s.limit);
    const all=displayed.length===filtered.length ? [...displayed,...extras] : displayed;
    root.querySelector('[data-wg-results]').innerHTML=all.length ? all.map(p=>card(p,ctx,food)).join('') :
    '<div class="wg-empty"><strong>没有符合条件的地点</strong><p>换个地区、菜式或关键词再找找。</p><button type="button" data-wg-reset>清除筛选</button></div>';
    root.querySelector('[data-wg-morebox]').innerHTML=filtered.length>displayed.length ? '<button type="button" class="wg-more" data-wg-more>继续查看'+(food?'餐厅':'玩乐')+' <small>还剩 '+(filtered.length-displayed.length)+(food?' 家':' 项')+'</small></button>' : '';
  }

  window.renderCatalog=function renderCatalog(ctx) {
    const {root,mode,items}=ctx;
    if (!root || !Array.isArray(items) || !['food','play'].includes(mode)) return;
    active.get(root)?.abort();
    const controller = new AbortController();
    active.set(root,controller);
    const food=mode==='food';
    const normal=items.filter(p=>food?/^f\d{3}$/.test(p.id):/^a\d{2}$/.test(p.id)).sort((a,b)=>a.id.localeCompare(b.id));
    const extra=food?items.filter(p=>p.id==='dinner'):[];
    const relevant=[...normal,...extra];
    const state=controlValue(ctx,normal,food);
    const wasExpanded=!!root.querySelector('.wg-'+mode+' .wg-notes[open]');
    const redraw=()=>results(ctx,normal,extra,state,food);
    const rerender=()=>window.renderCatalog(ctx);
    root.innerHTML='<section class="wg-catalog wg-'+mode+'"><div class="wg-inner">'+hero(ctx,relevant,food)+guide(ctx,relevant,food)+
      '<div class="wg-index"><h2>'+(food?'按地区找餐厅':'按地区挑体验')+'</h2>'+regionControls(normal,state,food)+'<div data-wg-parts></div>'+filterControls(ctx,normal,state,food)+'</div>'+
      '<div class="wg-list-head"><h2>'+(food?'餐厅目录':'玩乐目录')+'</h2><span data-wg-count aria-live="polite"></span></div>'+
      '<div class="wg-grid" data-wg-results></div><div class="wg-morebox" data-wg-morebox></div></div></section>';
    if (wasExpanded) root.querySelector('.wg-notes').open=true;
    redraw();
    const opts={signal:controller.signal};
    root.addEventListener('click', event=>{
      const button=event.target.closest('button');
      if (!button || !root.contains(button)) return;
      const d=button.dataset;
      if (d.wgOpen) {ctx.showDetail(d.wgOpen);return;}
      if (d.wgPick) {
        const newValue=button.getAttribute('aria-pressed')!=='true';
        ctx.onToggle(d.wgPick);
        root.querySelectorAll('[data-wg-pick="'+d.wgPick+'"]').forEach(el=>{
          const item=relevant.find(p=>p.id===d.wgPick);
          el.classList.toggle('wg-chosen',newValue);el.setAttribute('aria-pressed',String(newValue));
          el.setAttribute('aria-label',(newValue?'从想去清单移除':'加入想去清单，')+titleOf(item));
          el.title=newValue?'已加入想去清单':'加入想去清单';
          el.innerHTML=ctx.icon(newValue?'check':'bookmark',19);
        });
        return;
      }
      if (d.wgMore!==undefined) {state.limit+=16;redraw();return;}
      let focusKey,focusValue;
      if (d.wgRegion) {
        state.region=d.wgRegion;state.part='全部';
        focusKey='region';focusValue=d.wgRegion;
        const url=new URL(location.href);
        if(state.region==='全部') url.searchParams.delete(mode+'Region'); else url.searchParams.set(mode+'Region',state.region);
        history.replaceState(history.state,'',url);
      } else if (d.wgPart) {state.part=d.wgPart;focusKey='part';focusValue=d.wgPart;}
      else if (d.wgMust) {state.must=!state.must;focusKey='must';focusValue='toggle';}
      else if (d.wgReset!==undefined) {
        Object.assign(state,{region:'全部',part:'全部',type:'全部',must:false,search:''});
        const url=new URL(location.href);url.searchParams.delete(mode+'Region');history.replaceState(history.state,'',url);
      } else return;
      state.limit=16;rerender();
      if (focusKey) root.querySelector('[data-wg-'+focusKey+'="'+focusValue+'"]')?.focus({preventScroll:true});
    },opts);
    root.addEventListener('input',e=>{
      if (e.target.matches('[data-wg-query]')) {state.search=e.target.value;state.limit=16;redraw();}
    },opts);
    root.addEventListener('change',e=>{
      if (e.target.matches('[data-wg-type]')) {state.type=e.target.value;state.limit=16;redraw();}
    },opts);
  };
})();
