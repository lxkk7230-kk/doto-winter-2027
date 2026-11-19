'use strict';
const paths={
 map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z"/>',
 bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4z"/>',
 mountain:'<path d="m2 19 7-13 4 7 2-4 7 10H2Zm4-7 3 1 2-2"/>',
 food:'<path d="M4 3v5c0 2 6 2 6 0V3M7 3v18M16 14h4V3c-4 2-4 8-4 11Zm4 0v7"/>',
 utensils:'<path d="M4 3v5c0 2 6 2 6 0V3M7 3v18M16 14h4V3c-4 2-4 8-4 11Zm4 0v7"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18M7 14h3m3 0h3"/>',
 home:'<path d="m2 11 10-8 10 8M5 9v11h14V9M9 20v-7h6v7"/>',
 layers:'<path d="m2 8 10-5 10 5-10 5zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.3"/><rect x="14" y="3" width="7" height="7" rx="1.3"/><rect x="3" y="14" width="7" height="7" rx="1.3"/><rect x="14" y="14" width="7" height="7" rx="1.3"/>',
 search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',chevron:'<path d="m6 9 6 6 6-6"/>',
 expand:'<path d="M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6"/>',shrink:'<path d="M3 9h6V3m6 0v6h6m0 6h-6v6m-6 0v-6H3"/>',
 focus:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="m4 12 5 5L20 6"/>',
 marker:'<path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 camera:'<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',
 close:'<path d="m5 5 14 14M19 5 5 19"/>',sliders:'<path d="M3 7h5m5 0h8M3 17h10m5 0h3"/><circle cx="10.5" cy="7" r="2.5"/><circle cx="15.5" cy="17" r="2.5"/>',
 plane:'<path d="m3 14 7-3V4a2 2 0 0 1 4 0v7l7 3v2l-7-1v3l2 2v1l-4-1-4 1v-1l2-2v-3l-7 1z"/>',list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1m-1 6h1m-1 6h1"/>',
 share:'<circle cx="18" cy="5" r="2.5"/><circle cx="5" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m7 11 9-5M7 13l9 5"/>',
 navigation:'<path d="m3 10 18-7-7 18-3-8Z"/>', external:'<path d="M13 3h8v8m-1-7-10 10M9 5H4v15h15v-5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',snow:'<path d="M12 2v20M3.3 7 20.7 17M3.3 17 20.7 7M9 4l3 3 3-3m-6 16 3-3 3 3"/>'};
function icon(k,size=20){return '<svg class="ico '+k+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" aria-hidden="true">'+(paths[k]||paths.marker)+'</svg>'}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s);
const urlLink=(u,label,cls='')=>/^https?:\/\//.test(u||'')?'<a class="'+cls+'" href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>':'';
const priceShort=p=>(p.layer==='stay'?p.price.split(' · ')[0]:p.price).split(/[；;]/)[0].replace(/免费（¥0\s*\/\s*0 元）/,'免费 · 0 元').replace('（约 ',' · 约 ').replaceAll('）','');
const labels={food:'美食',play:'景点',stay:'住宿',transit:'交通'};
const layerIcon={food:'utensils',play:'mountain',stay:'home',transit:'plane'};
const placesOrder=['a02','a01','s01','a12','dinner','a22','a24','s02','f001','airport'];
const tabs=[['map','map','地图探索'],['food','utensils','美食图鉴'],['play','mountain','玩乐菜单'],['guide','calendar','行程路线']];
const must=new Set(['a01','a02','a12','a22','a24','dinner']);
const regionNames=['美幌','网走','女满别·大空','知床·斜里','清里·小清水','弟子屈·川汤','阿寒湖','津别·相生','钏路'];
const zoneFor=p=>{
 if(p.id==='airport')return regionNames[2];if(p.layer==='stay'&&p.id!=='s02')return regionNames[0];if(p.id==='s02'||p.id==='a31')return regionNames[7];
 if(['a07'].includes(p.id))return regionNames[2];if(p.id==='a10')return regionNames[4];if(['a11','a27'].includes(p.id))return regionNames[0];
 if(['a25','a26','a28','a29'].includes(p.id))return regionNames[5];
 if(p.layer==='play'&&p.region==='阿寒·津别')return regionNames[6];if(p.layer==='play'&&p.region==='美幌·网走')return regionNames[1];
 if(/女满别|大空/.test(p.region))return regionNames[2];if(/知床|斜里|乌托罗/.test(p.region))return regionNames[3];if(/清里|小清水/.test(p.region))return regionNames[4];if(/弟子屈|川汤|屈斜路/.test(p.region))return regionNames[5];
 if(/津别/.test(p.region))return regionNames[7];return p.region
};
function normalize(p){p.layer=p.layer||'food';p.title=p.cn?.split(/[（(]/)[0]?.trim()||p.name;p.price=p.price||'¥'+Number(p.yen).toLocaleString('en-US')+'（约 '+p.cny+' 元）';p.must=must.has(p.id);p.zone=zoneFor(p);return p}
const key='doto-winter-2027:plan-v1';
let items=[],byId=new Map(),saved=new Set(),savedAt='',atlas=null,page='',list=[],shared=null,storageOK=true;
const state={layer:'all',query:'',zone:'',type:'',must:false,wants:false,enabled:new Set(Object.keys(labels))};
const formatTime=val=>new Date(val).toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
function readPlan(){try{const p=JSON.parse(localStorage.getItem(key)||'{}');saved=new Set((Array.isArray(p.ids)?p.ids:[]).filter(id=>byId.has(id)));savedAt=p.at||''}catch{saved=new Set();savedAt=''}}
function persist(){try{const at=new Date().toISOString();localStorage.setItem(key,JSON.stringify({ids:[...saved],at}));savedAt=at;storageOK=true;return true}catch{storageOK=false;return false}}
let toastTimer;function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}
function tag(p){return '<span class="tagline"><i class="'+p.layer+'"></i>'+esc(p.zone)+' · '+esc(p.layer==='stay'?(p.id==='s01'||p.id==='s02'?'行程住处':'住宿比价'):labels[p.layer])+(p.must?'<span class="req">必去</span>':'')+'</span>'}
function saveMini(p){const on=saved.has(p.id);return '<button type="button" data-save="'+p.id+'" class="save-mini '+(on?'on':'')+'" aria-pressed="'+on+'" aria-label="'+esc((on?'移出清单，':'想去，')+p.title)+'" title="'+(on?'移出清单':'加入想去清单')+'">'+icon('bookmark',18)+'</button>'}
function toggle(id){if(!byId.has(id))return;const add=!saved.has(id);if(add)saved.add(id);else saved.delete(id);const ok=persist();refreshSaved(id);toast(ok?(add?'已加入想去清单':'已从清单移除'):'本浏览器无法保存，可复制清单链接留存')}
function updatePlanCount(){$('#plan-count').textContent=shared?.length??saved.size}
function refreshSaved(id){updatePlanCount();document.querySelectorAll('[data-save]').forEach(b=>{const p=byId.get(b.dataset.save);if(!p)return;const on=saved.has(p.id);b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',(on?'移出清单，':'想去，')+p.title);b.title=on?'移出清单':'加入想去清单'});if(id)atlas?.touch(id);if(state.wants)filter();if(page==='plan')drawPlan();if(page==='food'||page==='play')drawCatalog();const dialog=$('#detail');if(dialog.open)renderDetail(dialog.dataset.id)}
function navURL(p){
 if(p.layer==='stay'){
   const near=p.id==='s06';
   return near?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' 北海道 美幌町'):'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.lat+','+p.lng);
 }
 if(p.id==='a05'&&window.DOTO_ROUTES?.points?.a05){
   const parking=window.DOTO_ROUTES.points.a05;
   return 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination='+parking.lat+','+parking.lng;
 }
 if(/房源公开/.test(p.precision)||p.id==='a18'||/接送区域参考/.test(p.precision))return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.id==='a18'?'道の駅うとろ・シリエトク 斜里町':p.id==='a09'?'北海道網走市':p.name+' 北海道 '+(p.id==='s02'?'津別町相生':'美幌町'));return 'https://www.google.com/maps/dir/?api=1&destination='+p.lat+','+p.lng+'&travelmode=driving'}
function navLabel(p){return p.id==='a18'?'查看乌托罗集合区域':p.layer==='stay'?(p.id==='s06'?'按房源名称搜索':'在地图查看住宿位置'):p.id==='a05'?'导航到能取岬停车场':p.id==='a09'?'在地图查看参考区域':'在 Google 地图中导航'}
function popupCard(p){return '<img class="popimg" src="'+p.image+'" alt="'+esc(p.name)+'"><div class="popbody">'+tag(p)+'<h3>'+esc(p.title)+'</h3><p class="sub">'+esc(p.name)+'</p><p>'+esc(p.highlight)+'</p><b>'+esc(p.price)+'</b><div class="popfacts"><p>'+icon('clock',14)+' '+esc(p.hours)+' · '+esc(p.closed)+'</p><p>'+icon('marker',14)+' '+esc(p.drive)+'</p></div><div class="popactions"><button data-pop-detail class="secondary">地点详情</button><button class="primary" data-pop-save>'+icon(saved.has(p.id)?'check':'plus',14)+(saved.has(p.id)?' 已想去':' 想去')+'</button></div><div class="detail-links">'+urlLink(p.url,'查看来源')+urlLink(navURL(p),navLabel(p))+'</div></div>'}
function tip(p){return '<small>'+esc(labels[p.layer]+' · '+p.zone)+'</small><b>'+esc(p.title)+'</b><span>'+esc(priceShort(p))+'</span>'}
function facts(rows){return '<dl class="detail-facts">'+rows.filter(r=>r[1]).map(r=>'<dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd>').join('')+'</dl>'}
function roomPhotos(p){
 return (p.gallery||[]).map(photo=>{
  const file=window.dotoFloorplan?window.dotoFloorplan(photo.image):photo.image;
  return '<figure class="room-snapshot"><a target="_blank" rel="noopener" href="'+esc(file)+'"><img src="'+esc(file)+'" alt="'+esc(photo.caption)+'"></a><figcaption>'+esc(photo.caption)+' · '+urlLink(photo.source,'照片出处')+'</figcaption></figure>';
 }).join('');
}
function renderDetail(id){const p=byId.get(id);if(!p)return;const savedHere=saved.has(id);const choices=(p.links||[]).map(o=>urlLink(o.url,o.name)).join(' ');$('#detail-body').innerHTML='<img class="detail-pic" src="'+p.image+'" alt="'+esc(p.name)+'"><button class="square detail-close" data-close aria-label="关闭地点详情">'+icon('close')+'</button><div class="detail-content">'+tag(p)+'<h2 id="detail-title">'+esc(p.title)+'</h2><p class="local-name">'+esc(p.name)+'</p><p>'+esc(p.highlight)+'</p>'+roomPhotos(p)+facts([['人均参考',p.price],[p.layer==='stay'?'入住 / 退房':'开放时间',p.hours],[p.layer==='stay'?'房态 / 条款':'休息 / 限制',p.closed],[p.layer==='stay'?'交通':'从住处出发',p.drive],['招牌菜',p.signature],[(p.layer==='food'?'评价':'同行提示'),p.review],['地址',p.address],['点位说明',p.precision]])+(p.extra?'<p>'+esc(p.extra)+'</p>':'')+'<div class="detail-links">'+urlLink(p.url,p.layer==='food'?'店铺资料':'官方资料')+choices+urlLink(navURL(p),navLabel(p))+'</div><details class="detail-sources"><summary>照片与地图来源</summary>'+urlLink(p.photoSource,'实景照片出处')+' · '+urlLink(p.geoSource,'地图点位出处')+'</details></div><div class="detail-actions"><button data-detail-map class="secondary">'+icon('map',17)+' 地图上看</button><button data-detail-toggle class="primary" aria-pressed="'+savedHere+'">'+icon(savedHere?'check':'bookmark',17)+(savedHere?' 已想去 · 移出':' 加入想去清单')+'</button></div>';
 $('#detail-body [data-close]').onclick=()=>$('#detail').close();$('#detail-body [data-detail-toggle]').onclick=()=>toggle(id);$('#detail-body [data-detail-map]').onclick=()=>{$('#detail').close();locate(id)}}
function showDetail(id){const dialog=$('#detail');if(!byId.has(id))return;dialog.dataset.id=id;renderDetail(id);dialog.setAttribute('aria-labelledby','detail-title');if(!dialog.open)dialog.showModal();dialog.scrollTop=0}
function drawCatalog(){if(window.renderCatalog)window.renderCatalog({root:$('#catalog'),mode:page,items,saved,onToggle:toggle,showDetail,icon})}
function drawQuick(){const opts=[['all','grid','全部'],['play','mountain','景点'],['food','utensils','美食'],['stay','home','住宿']];$('#quickfilters').innerHTML=opts.map(([k,i,l])=>'<button data-quick="'+k+'" aria-pressed="'+(state.layer===k)+'" class="'+(state.layer===k?'active':'')+'">'+icon(i,15)+l+'</button>').join('')}
function closeMenus(){for(const [id,b] of [['#area-menu','#area-button'],['#layers-menu','#layer-button']]){$(id).hidden=true;$(b).setAttribute('aria-expanded','false')}}
function drawLayers(){$('#layers-menu').innerHTML=Object.entries(labels).map(([key,value])=>'<label><input type="checkbox" data-layer="'+key+'" '+(state.enabled.has(key)?'checked':'')+'><i class="dot '+key+'"></i>'+value+'</label>').join('')}
function filter(){const q=state.query.trim().toLowerCase();list=items.filter(p=>state.enabled.has(p.layer)&&(state.layer==='all'||state.layer===p.layer)&&(!state.zone||p.zone===state.zone)&&(!state.type||(p.layer==='food'&&p.type===state.type))&&(!state.must||p.must)&&(!state.wants||saved.has(p.id))&&(!q||[p.name,p.cn,p.region,p.zone,p.type,p.highlight,p.signature,p.layer==='stay'?p.extra:''].join(' ').toLowerCase().includes(q)));
 $('#result-count').textContent=list.length;$('#area-name').textContent=state.zone||'道东全域';$('#region-select').value=state.zone;$('#type-select').value=state.type;$('#must-filter').checked=state.must;$('#saved-filter').checked=state.wants;drawQuick();drawLayers();$('#extra-filter').style.color=state.zone||state.type||state.must||state.wants?'#a25431':'';
 $('#side-list').innerHTML=list.length?list.map(p=>'<article class="side-card"><button class="side-go" data-locate="'+p.id+'"><img class="side-photo" loading="lazy" src="'+p.image+'" alt=""><span class="side-text">'+tag(p)+'<strong>'+esc(p.title)+'</strong><span class="side-jp" lang="ja">'+esc(p.name)+'</span><span class="cost">'+esc(priceShort(p))+'</span></span></button>'+saveMini(p)+'</article>').join(''):'<div class="empty">没有符合条件的地点。<button data-reset class="secondary">清除筛选</button></div>';$('#side-list').scrollTop=0;atlas?.update(list)}
function reset(){state.layer='all';state.query='';state.zone='';state.type='';state.must=false;state.wants=false;state.enabled=new Set(Object.keys(labels));$('#map-search').value='';filter()}
function setMobileList(active){$('#workspace').classList.toggle('mobile-list',active);$('#mob-list').innerHTML=icon(active?'map':'list',16)+(active?'大地图':'地点列表');$('#mob-list').setAttribute('aria-expanded',String(active));atlas?.resize()}
function locate(id){if(page!=='map')go('map');if(!list.some(p=>p.id===id))reset();if(matchMedia('(max-width:760px)').matches)setMobileList(false);requestAnimationFrame(()=>atlas.open(id))}
function go(to){if(location.hash.slice(1).split('/')[0]===to){changePage();return}location.hash=to;changePage()}
function changePage(){if(!items.length)return;const requested=location.hash.slice(1).split('/')[0]||'map';page=['map','food','play','guide','plan'].includes(requested)?requested:'map';closeMenus();if(page!=='map'&&document.body.classList.contains('map-wide'))toggleWide(false);
 for(const el of document.querySelectorAll('.page'))el.classList.remove('active');const selector=page==='map'?'#workspace':page==='guide'?'#guide':page==='plan'?'#wishlist':'#catalog';$(selector).classList.add('active');document.querySelectorAll('[data-page]').forEach(el=>{el.classList.toggle('active',el.dataset.page===page);if(el.dataset.page===page)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});
 if(page==='map')requestAnimationFrame(()=>atlas?.resize());if(page==='food'||page==='play')drawCatalog();if(page==='guide'&&window.renderGuide)window.renderGuide({root:$('#guide'),items,showDetail,icon});if(page==='plan')drawPlan()}
function planCard(p,isShared){return '<article class="plan-card"><button data-show="'+p.id+'"><img src="'+p.image+'" loading="lazy" alt=""><span class="pcopy">'+tag(p)+'<strong>'+esc(p.title)+'</strong><small>'+esc(priceShort(p))+'</small></span></button>'+(!isShared?saveMini(p):'')+'</article>'}
function drawPlan(){const isShared=shared!==null;const ids=isShared?shared:[...saved];const rows=ids.map(id=>byId.get(id)).filter(Boolean);
 const groups=['play','food','stay','transit'].map(k=>{const g=rows.filter(p=>p.layer===k);return g.length?'<section class="plan-block"><h2>'+labels[k]+' · '+g.length+'</h2><div class="plan-grid">'+g.map(p=>planCard(p,isShared)).join('')+'</div></section>':''}).join('');
 $('#wishlist').innerHTML='<div class="plan-wrap"><header><span class="tagline">'+icon('bookmark',16)+' 地点收藏</span><h1>'+(isShared?'家人分享的清单':'想去清单')+'</h1><p>'+rows.length+' 个地点'+(isShared?' · 这是一份分享时的清单快照。':' · '+(savedAt&&storageOK?'已保存到此浏览器，最近更新于 '+formatTime(savedAt)+'。':'在地图和图鉴中点书签，即可在这里一起看。'))+'</p></header><div class="plan-tools">'+(isShared?'<button id="adopt" class="primary">'+icon('plus',17)+' 加到我的清单</button><button id="mine" class="secondary">查看我的清单</button>':'<button id="save-plan" class="primary">'+icon('check',17)+' 保存清单</button><button id="share-plan" class="secondary" '+(!rows.length?'disabled':'')+'>'+icon('share',17)+ ' 复制清单链接</button><button id="plan-on-map" class="secondary" '+(!rows.length?'disabled':'')+'>'+icon('map',17)+' 在地图看清单</button>')+'<a class="secondary route-family-link" href="#guide/A">'+icon('calendar',17)+' 看两套行程路线</a><a class="secondary" href="#guide/A/stays">'+icon('home',17)+' 比较美幌民宿</a></div><div id="share-fallback"></div>'+(rows.length?groups:'<div class="plan-empty">'+icon('bookmark',31)+'<p>清单还是空的。先从流冰、温泉或想吃的一餐挑起。</p><button class="secondary" data-page="map">去地图挑选</button></div>')+'</div>';
 if(isShared){$('#adopt').onclick=()=>{for(const id of ids)saved.add(id);const ok=persist();dropShare();refreshSaved();items.forEach(p=>atlas.touch(p.id));toast(ok?'已加入自己的清单':'已加入本次清单，可复制链接留存')};$('#mine').onclick=()=>{dropShare();drawPlan()}}else{$('#save-plan').onclick=()=>{const ok=persist();drawPlan();toast(ok?'已保存到此浏览器':'本浏览器无法保存，可复制清单链接留存')};$('#share-plan').onclick=sharePlan;$('#plan-on-map').onclick=()=>{go('map');reset();state.wants=true;filter();$('#filterbox').hidden=false;requestAnimationFrame(()=>atlas.fit(list))}}}
function dropShare(){shared=null;updatePlanCount();const u=new URL(location.href);u.searchParams.delete('want');history.replaceState(null,'',u)}
async function sharePlan(){const u=new URL('https://lxkk7230-kk.github.io/doto-winter-2027/');u.searchParams.set('want',[...saved].join(','));u.hash='plan';try{await navigator.clipboard.writeText(u.href);toast('清单链接已复制，可发给家人')}catch{$('#share-fallback').innerHTML='<label>复制这个清单链接<input readonly class="share-input"></label>';const input=$('.share-input');input.value=u.href;input.select()}}
function toggleWide(value){const b=$('#expand-map');const wanted=value??!document.body.classList.contains('map-wide');document.body.classList.toggle('map-wide',wanted);b.innerHTML=icon(wanted?'shrink':'expand',19);b.title=wanted?'收起大地图':'展开大地图';b.setAttribute('aria-label',b.title);if(wanted&&!document.fullscreenElement)document.documentElement.requestFullscreen?.().catch(()=>{});if(!wanted&&document.fullscreenElement)document.exitFullscreen?.().catch(()=>{});requestAnimationFrame(()=>atlas?.resize())}
function startUI(){
 document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));$('#mainnav').innerHTML=tabs.map(([id,i,name])=>'<button data-page="'+id+'" class="navlink">'+icon(i,18)+name+'</button>').join('');
 const sel=(el,vals,title)=>{el.innerHTML='<option value="">'+title+'</option>'+vals.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('')};sel($('#region-select'),regionNames,'全部地区');sel($('#type-select'),[...new Set(items.filter(p=>p.layer==='food').map(p=>p.type))].sort(),'全部料理');
 $('#area-menu').innerHTML=['',...regionNames].map(r=>'<button data-zone="'+esc(r)+'">'+(r||'道东全域')+'</button>').join('');
 $('#map-search').oninput=e=>{state.query=e.target.value;filter();if(state.query&&list.length)atlas.fit(list);else if(!state.query)atlas.fit(list)};$('#region-select').onchange=e=>{state.zone=e.target.value;filter();atlas.fit()};$('#type-select').onchange=e=>{state.type=e.target.value;if(state.type){state.layer='food';state.enabled.add('food')}filter();atlas.fit()};
 $('#saved-filter').onchange=e=>{state.wants=e.target.checked;filter();atlas.fit()};$('#must-filter').onchange=e=>{state.must=e.target.checked;filter();atlas.fit()};$('#extra-filter').onclick=()=>{$('#filterbox').hidden=!$('#filterbox').hidden;$('#extra-filter').setAttribute('aria-expanded',String(!$('#filterbox').hidden))};$('#clearfilters').onclick=()=>{reset();atlas.all()};
 $('#fit-map').onclick=()=>atlas.fit(list);$('#zoom-in').onclick=()=>atlas.map.zoomIn();$('#zoom-out').onclick=()=>atlas.map.zoomOut();$('#expand-map').onclick=()=>toggleWide();$('#mob-list').onclick=()=>setMobileList(!$('#workspace').classList.contains('mobile-list'));
 $('#detail').addEventListener('click',e=>{if(e.target===$('#detail')){const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)e.target.close()}});
 document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&document.body.classList.contains('map-wide'))toggleWide(false)});
 for(const [button,menu] of [['#area-button','#area-menu'],['#layer-button','#layers-menu']])$(button).onclick=()=>{const open=$(menu).hidden;closeMenus();$(menu).hidden=!open;$(button).setAttribute('aria-expanded',String(open))};
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!e.target.closest('.map-tools,.floatmenu'))closeMenus();if(!b)return;
 if(b.dataset.page)go(b.dataset.page);else if(b.hasAttribute('data-reset')){reset();atlas.all()}else if(b.hasAttribute('data-zone')){state.zone=b.dataset.zone;filter();atlas.fit();closeMenus()}else if(b.dataset.quick){state.layer=b.dataset.quick;state.enabled=new Set(Object.keys(labels));state.type='';filter();atlas.fit()}else if(b.dataset.save){toggle(b.dataset.save)}else if(b.dataset.locate){locate(b.dataset.locate)}else if(b.dataset.show){showDetail(b.dataset.show)}});
 $('#layers-menu').onchange=e=>{const k=e.target.dataset.layer;if(!k)return;if(e.target.checked)state.enabled.add(k);else state.enabled.delete(k);if(state.layer!=='all'&&!state.enabled.has(state.layer))state.layer='all';filter()};
 window.addEventListener('hashchange',changePage);window.addEventListener('resize',()=>atlas?.resize());window.addEventListener('storage',e=>{if(e.key===key||e.key===null){readPlan();items.forEach(p=>atlas.touch(p.id));refreshSaved()}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.body.classList.contains('map-wide')&&!$('#detail').open)toggleWide(false);closeMenus()}})}
async function init(){const [a,b,c,boundsIndex]=await Promise.all(['places','food1','food2','atlas'].map(async name=>{const r=await fetch('data/'+name+'.json');if(!r.ok)throw Error('无法加载 '+name);return r.json()}));
 items=[...a,...b,...c].map(normalize).sort((p,q)=>{const i=placesOrder.indexOf(p.id),j=placesOrder.indexOf(q.id);return (i<0?100:i)-(j<0?100:j)});byId=new Map(items.map(p=>[p.id,p]));readPlan();const param=new URL(location.href).searchParams.get('want');if(param!==null)shared=[...new Set(param.split(',').filter(id=>byId.has(id)))];
 startUI();atlas=createAtlas({boundsIndex,icon,esc,items,renderPopup:popupCard,tip,toggle,showDetail,isSaved:id=>saved.has(id)});atlas.all();filter();updatePlanCount();changePage()}
init().catch(e=>{$('#side-list').innerHTML='<div class="empty">地点数据暂时无法打开。<button class="secondary" onclick="location.reload()">重新加载</button></div>';console.error(e)});
