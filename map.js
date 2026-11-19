'use strict';
function createAtlas({boundsIndex,icon,esc,items,renderPopup,tip,toggle,showDetail,isSaved}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const map=L.map('map',{zoomControl:false,attributionControl:false,zoomSnap:.25,zoomDelta:1,minZoom:5,maxZoom:18,maxBounds:[[38.8,134],[48.0,153.5]],maxBoundsViscosity:.85,scrollWheelZoom:true,preferCanvas:true});
  const gsi='https://cyberjapandata.gsi.go.jp/xyz/std/';
  const AtlasTiles=L.TileLayer.extend({getTileUrl(c){const b=boundsIndex[c.z];if(b&&c.x>=b[0]&&c.y>=b[1]&&c.x<=b[2]&&c.y<=b[3])return 'atlas/'+c.z+'/'+c.x+'/'+c.y+'.webp';return gsi+c.z+'/'+c.x+'/'+c.y+'.png'}});
  new AtlasTiles('',{maxZoom:18,minZoom:5,keepBuffer:2}).addTo(map);
  L.control.scale({position:'bottomleft',metric:true,imperial:false,maxWidth:68}).addTo(map);
  const attr=L.control.attribution({position:'bottomright',prefix:false}).addTo(map);
  attr.addAttribution('<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a> · <a href="https://openfreemap.org/" target="_blank" rel="noopener">OpenFreeMap</a> / <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> · <a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noopener">地形</a> · <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>');
  const lookup=new Map(items.map(p=>[p.id,p]));
  const markers=new Map();
  const icons={stay:'home',play:'mountain',food:'utensils',transit:'plane'};
  const isBase=p=>p.id==='s01'||p.id==='s02';
  const markerIcon=p=>L.divIcon({className:'atlas-pin marker-'+p.layer+(isBase(p)?' lodging-pin':''),iconSize:[34,38],iconAnchor:[17,36],popupAnchor:[0,-30],tooltipAnchor:[0,-29],html:'<span class="pinshape '+(isSaved(p.id)?'saved':'')+'">'+icon(icons[p.layer],17)+'</span>'+(isBase(p)?'<span class="lodging-name">'+(p.id==='s01'?'美幌 · 站前ルポ':'相生 · Aioi House')+'</span>':'')});
  const lodging=L.layerGroup().addTo(map);
  const towns=[['网走市区',44.014,144.26,.13],['乌托罗',44.07,144.99,.08],['钏路市区',42.984,144.38,.09],['阿寒湖温泉',43.434,144.092,.08],['川汤温泉',43.638,144.435,.06],['斜里町',43.912,144.664,.08]];
  function clusterLabel(c){if(map.getZoom()>10.5||c.getChildCount()<5)return '';const pt=c.getLatLng();const t=towns.find(([,lat,lng,r])=>Math.hypot(pt.lat-lat,(pt.lng-lng)*.72)<r);return t?'<span class="cluster-name">'+t[0]+'</span>':''}
  const cluster=L.markerClusterGroup({showCoverageOnHover:false,spiderfyOnMaxZoom:true,zoomToBoundsOnClick:true,animate:!reduced,removeOutsideVisibleBounds:true,maxClusterRadius:z=>z>=13?32:z>=10?36:38,
    iconCreateFunction:c=>{const all=c.getAllChildMarkers(),layers=new Set(all.map(m=>m.place.layer)),type=layers.size===1?all[0].place.layer:'mix';return L.divIcon({className:'atlas-cluster marker-'+type,iconSize:[38,38],html:'<span class="cluster-shape '+type+(all.some(m=>isSaved(m.place.id))?' saved':'')+'">'+all.length+'</span>'+clusterLabel(c)})}});
  map.addLayer(cluster);
  const sea=L.marker([44.173,144.67],{interactive:false,keyboard:false,zIndexOffset:-900,icon:L.divIcon({className:'sea-name',html:'鄂霍次克海',iconSize:[116,22],iconAnchor:[58,11]})});
  function seaVisibility(){if(map.getZoom()<=10&&!map.hasLayer(sea))sea.addTo(map);else if(map.getZoom()>10&&map.hasLayer(sea))map.removeLayer(sea)}
  map.on('zoomend',seaVisibility);
  let shown=items,signature='',currentId=null;
  function popup(p){const div=document.createElement('div');div.innerHTML=renderPopup(p);
    div.querySelector('[data-pop-detail]').onclick=()=>showDetail(p.id);
    div.querySelector('[data-pop-save]').onclick=()=>{toggle(p.id);const m=markers.get(p.id);if(m?.isPopupOpen())m.getPopup().setContent(popup(p))};return div}
  function makeMarker(p){
    const m=L.marker([p.lat,p.lng],{icon:markerIcon(p),keyboard:true,title:p.title,alt:p.title,riseOnHover:true,zIndexOffset:isBase(p)?600:0});
    m.place=p;m.bindTooltip(()=>tip(p),{direction:'top',className:'atlas-tip',opacity:1,offset:[0,-3]});
    m.bindPopup(()=>popup(p),{maxWidth:300,minWidth:190,autoPan:true,autoPanPaddingTopLeft:[10,60],autoPanPaddingBottomRight:[12,35],closeButton:true});
    m.on('popupopen',()=>{m.closeTooltip();currentId=p.id});
    m.on('popupclose',()=>{if(currentId===p.id)currentId=null});
    return m
  }
  const clusterTip=c=>{const list=c.getAllChildMarkers().map(m=>m.place),top=list.slice().sort((a,b)=>Number(b.must)-Number(a.must)).slice(0,3);return '<small>此处有 '+list.length+' 个地点</small><b>'+top.map(p=>esc(p.title)).join(' · ')+'</b><span>点击展开，可查看每个地点</span>'};
  cluster.on('clustermouseover',e=>{const c=e.layer;if(!c.getTooltip())c.bindTooltip(()=>clusterTip(c),{direction:'top',className:'atlas-tip',opacity:1,offset:[0,-18]});c.openTooltip()});
  cluster.on('clustermouseout clusterclick',e=>e.layer.closeTooltip());
  function update(list){shown=list;const next=list.map(p=>p.id).join('|');if(next===signature)return;
    signature=next;cluster.clearLayers();lodging.clearLayers();const nextMarkers=[];for(const p of list){if(!markers.has(p.id))markers.set(p.id,makeMarker(p));const m=markers.get(p.id);if(isBase(p))lodging.addLayer(m);else nextMarkers.push(m)}cluster.addLayers(nextMarkers)}
  function all(){map.invalidateSize(false);const p=map.getContainer();const pad=p.clientWidth<500?[40,34]:[67,60];map.fitBounds([[42.969,143.81],[44.131,145.09]],{paddingTopLeft:pad,paddingBottomRight:pad,maxZoom:10,animate:false})}
  function fit(list=shown){if(!list.length)return;if(list.length===items.length){all();return}const b=L.latLngBounds(list.map(p=>[p.lat,p.lng]));map.fitBounds(b,{padding:[54,55],maxZoom:14,animate:false})}
  function open(id){const p=lookup.get(id),m=markers.get(id);if(!p||!m||(!cluster.hasLayer(m)&&!lodging.hasLayer(m)))return;
    map.invalidateSize(false);map.setView([p.lat,p.lng],Math.max(13,map.getZoom()),{animate:false});if(isBase(p))m.openPopup();else cluster.zoomToShowLayer(m,()=>{m.openPopup()})}
  function touch(id){const m=markers.get(id);if(!m)return;m.setIcon(markerIcon(m.place));if(cluster.hasLayer(m))cluster.refreshClusters(m);if(currentId===id&&m.isPopupOpen())m.getPopup().setContent(popup(m.place))}
  function resize(){map.invalidateSize(false)}
  return {map,update,open,touch,fit,all,resize}
}
