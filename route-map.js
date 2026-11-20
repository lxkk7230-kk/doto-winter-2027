(() => {
  'use strict';

  const dayColors = {6:'#ac4833',7:'#2b6c9e',8:'#136f59',9:'#95558c',10:'#aa651c',11:'#236d83',12:'#585395',13:'#706950'};
  const stays = new Set(['s01','s05','s02']);
  const baseLabels = [
    ['s01','北见 · Miyoshi','①','2/6–8','left'],
    ['s05','美幌生态木屋','②','2/8–10','right'],
    ['s02','相生 · Aioi House','③','2/10–13','left'],
    ['a02','网走港','','','right'],
    ['airport','女满别机场','','','left']
  ];
  const atlasBounds = {7:[112,44,118,48],8:[227,90,234,96],9:[457,182,465,191],10:[915,365,931,382]};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function basemap(map) {
    if (window.addOfflineAtlasTiles) {
      window.addOfflineAtlasTiles(map);
    } else {
      const Tiles = L.TileLayer.extend({
        getTileUrl({x,y,z}) {
          const box = atlasBounds[z];
          if (box && x >= box[0] && y >= box[1] && x <= box[2] && y <= box[3]) return 'atlas/'+z+'/'+x+'/'+y+'.webp';
          return 'https://cyberjapandata.gsi.go.jp/xyz/std/'+z+'/'+x+'/'+y+'.png';
        }
      });
      new Tiles('', {maxZoom:18,maxNativeZoom:10,minZoom:6,keepBuffer:2}).addTo(map);
      L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',{
        minZoom:11,maxZoom:18,keepBuffer:1
      }).addTo(map);
    }
    L.control.attribution({prefix:false,position:'bottomright'}).addTo(map)
      .addAttribution('<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a> · <a href="https://openfreemap.org/" target="_blank" rel="noopener">OpenFreeMap</a> / <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> · <a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noopener">地形</a> · <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>');
  }

  function makeMap(node, inventory, chooseDay, showDetail) {
    const data = window.DOTO_ROUTES;
    const map = L.map(node,{zoomControl:false,attributionControl:false,minZoom:6,maxZoom:18,zoomSnap:.25,zoomDelta:1,scrollWheelZoom:true,preferCanvas:true,zoomAnimation:false,fadeAnimation:false});
    basemap(map);
    L.control.zoom({position:'bottomright',zoomInTitle:'放大地图',zoomOutTitle:'缩小地图'}).addTo(map);
    L.control.scale({metric:true,imperial:false,maxWidth:70,position:'bottomleft'}).addTo(map);
    const tracks = L.layerGroup().addTo(map);
    const pins = L.layerGroup().addTo(map);
    let bounds;
    let groups = new Map();
    let scheme = 'A';
    let selected = 0;
    let alternative = '';
    let baseView = false;
    let labels = [];

    // Choose the nearest free position for each label at the current zoom.
    function placeLabels() {
      if (!labels.length || !node.clientWidth) return;
      const frame = node.getBoundingClientRect();
      const boxes = [];
      const tips = labels.map(({marker})=>marker.getTooltip()?.getElement());
      tips.forEach(el=>{if(el){el.style.marginLeft='0px';el.style.marginTop='0px';}});
      const anchors = labels.map(({marker})=>{
        const p=map.latLngToContainerPoint(marker.getLatLng());
        return {x:p.x+frame.left,y:p.y+frame.top};
      });
      const overlap = (a,b)=>Math.max(0,Math.min(a.r,b.r)-Math.max(a.l,b.l))*Math.max(0,Math.min(a.b,b.b)-Math.max(a.t,b.t));
      tips.forEach((el,i)=>{
        const p=anchors[i];
        if (!el || p.x<frame.left || p.x>frame.right || p.y<frame.top || p.y>frame.bottom) return;
        const r=el.getBoundingClientRect(), w=r.width, h=r.height, gap=stays.has(labels[i].id)?12:8;
        const left=p.x-gap-w, right=p.x+gap, middle=p.x-w/2, y=p.y-h/2;
        const near=labels[i].side==='left'?left:right, far=near===left?right:left;
        const options=[[near,y],[far,y],[middle,p.y-gap-h],[middle,p.y+gap],
          [near,p.y-gap-h],[far,p.y-gap-h],[near,p.y+gap],[far,p.y+gap]];
        let best, score=Infinity;
        for (const [n,[x,top]] of options.entries()) {
          const b={l:x-2,r:x+w+2,t:top-2,b:top+h+2};
          const clip=Math.max(0,frame.left+3-b.l)+Math.max(0,b.r-frame.right+3)
            +Math.max(0,frame.top+3-b.t)+Math.max(0,b.b-frame.bottom+3);
          const cost=clip*1000+n+boxes.reduce((s,box)=>s+overlap(box,b)*10,0)
            +anchors.reduce((s,a)=>s+overlap(b,{l:a.x-5,r:a.x+5,t:a.y-5,b:a.y+5})*6,0);
          if(cost<score){best=b;score=cost;}
        }
        el.style.marginLeft=(best.l+2-r.left)+'px';
        el.style.marginTop=(best.t+2-r.top)+'px';
        boxes.push(best);
      });
    }
    map.on('moveend zoomend resize',placeLabels);

    function fit() {
      map.invalidateSize({pan:false});
      if (!bounds || !bounds.isValid()) return;
      const narrow = node.clientWidth < 580;
      map.fitBounds(bounds,{paddingTopLeft:narrow?[22,22]:[48,32],paddingBottomRight:narrow?[24,32]:[54,37],maxZoom:selected===12?17:13,animate:false});
      placeLabels();
    }
    function routeFor(day) {
      if (day === 12 && alternative) return data.alternatives[alternative];
      return data.days[scheme][String(day)];
    }
    function stopMarker(id, point, nums, day, label, direction, entries=[], dateRange='') {
      const item = inventory.get(id);
      const tag = nums.join('·');
      const color = day ? dayColors[day] : (stays.has(id) ? '#173f3a' : '#4d615c');
      const name = label || point.name || item?.title || id;
      const size = tag.length>2?34:25;
      const marker = L.marker([point.lat,point.lng],{title:name,alt:name,keyboard:true,riseOnHover:true,
        zIndexOffset:!day&&stays.has(id)?100:0,
        icon:L.divIcon({className:'rt-pin',iconSize:[size,25],iconAnchor:[size/2,12],html:'<span class="'+(day||tag?'rt-pin-num':'rt-overpin')+'" style="--pin:'+color+'">'+esc(tag)+'</span>'})}).addTo(pins);
      const different = [...new Set(entries.map(e=>e.id))];
      const tooltip = different.length>1?different.map(id=>data.points[id].name).join(' · '):name;
      const overviewLabel='<b>'+esc(name)+'</b>'+(dateRange?'<br><small>'+esc(dateRange)+'</small>':'');
      marker.bindTooltip(day ? esc(tooltip) : overviewLabel,{permanent:!day,direction:'right',offset:[5,0],className:day?'rt-tip':'rt-placelabel'});
      if(!day)labels.push({id,marker,side:direction});
      function popup(preferred) {
        const chosen = preferred || id;
        const place = inventory.get(chosen);
        const geo = data.points[chosen] || point;
        const el = document.createElement('div');
        el.className='rt-popup';
        const img=place?.image?'<img src="'+esc(place.image)+'" alt="">':'';
        const hint=day || stays.has(chosen) ? (geo.note||place?.highlight||'') : '';
        el.innerHTML=img+'<strong>'+esc(preferred?geo.name:name)+'</strong>'+(hint?'<p>'+esc(hint)+'</p>':'');
        if (stays.has(chosen)) {
          const stay=document.createElement('a');
          stay.className='rt-poplink';
          stay.href='#guide/'+scheme+'/stays';
          stay.textContent='查看住宿';
          el.append(stay);
        }
        if (day) {
          const ids=different.length ? [chosen,...different.filter(i=>i!==chosen)] : [chosen];
          for (const which of ids) {
            if (!inventory.has(which)) continue;
            const btn=document.createElement('button');
            btn.type='button';btn.className='rt-poplink';btn.dataset.popupPlace=which;
            btn.textContent=ids.length===1?'地点详情':data.points[which].name+' · 详情';
            btn.onclick=()=>showDetail(which);el.append(btn);
          }
        }
        if(!day) {
          for(const [d,entry] of Object.entries(window.DOTO_PLANS[scheme].days)) {
            if(entry.stops.some(s=>(s.mapId||s.id)===id)) {
              const btn=document.createElement('button'); btn.className='rt-poplink'; btn.textContent='2/'+d+' '+entry.short; btn.onclick=()=>chooseDay(+d); el.append(btn);
            }
          }
        }
        const pop=L.popup({minWidth:165,maxWidth:225,maxHeight:Math.max(90,Math.min(210,node.clientHeight-105)),
          autoPan:true,autoPanPadding:[14,20]
        }).setLatLng(marker.getLatLng()).setContent(el).openOn(map);
        const photo=el.querySelector('img');
        if(photo && !photo.complete) photo.addEventListener('load',()=>{if(map.hasLayer(pop))pop.update();},{once:true});
      }
      marker.on('click',()=>popup());
      return {marker,popup};
    }
    function drawDay(day, overview) {
      const d = routeFor(day);
      if (!d) return;
      const color = dayColors[day];
      for(const key of new Set(d.segments)) {
        const seg = data.segments[key];
        if(!seg?.coords?.length) continue;
        const dash = seg.mode === 'walk' ? '3 6' : seg.mode === 'shuttle' ? '7 5' : undefined;
        const opacity = overview ? .8 : .98;
        const weight = overview ? 3 : 5;
        bounds.extend(L.latLngBounds(seg.coords));
        L.polyline(seg.coords,{color:'#fff',opacity:.8,weight:weight+2,interactive:false,smoothFactor:.6}).addTo(tracks);
        const line=L.polyline(seg.coords,{color,opacity,weight,dashArray:dash,lineCap:'round',smoothFactor:.6}).addTo(tracks);
        if(overview) {
          line.bindTooltip('2/'+day+' · '+window.DOTO_PLANS[scheme].days[day].short,{sticky:true});
          line.on('click',()=>chooseDay(day));
        }
      }
    }
    function drawBases() {
      const legs=[['s01>s05','#126a60','2/8 · 北见 → 美幌'],['s05>s02','#a56223','2/10 · 美幌 → 相生']];
      for (const [id,color,title] of legs) {
        const seg=data.segments[id];
        bounds.extend(L.latLngBounds(seg.coords));
        L.polyline(seg.coords,{color:'#fff',weight:7,opacity:.9,interactive:false}).addTo(tracks);
        L.polyline(seg.coords,{color,weight:4,opacity:.95}).bindTooltip(title,{sticky:true}).addTo(tracks);
      }
    }
    function paint(which,day,variant) {
      scheme=which; selected=+day||0;
      baseView=day==='bases';
      alternative=selected===12 && variant==='kushiro' ? 'kushiro' : '';
      map.closePopup();
      labels=[]; tracks.clearLayers(); pins.clearLayers(); groups=new Map(); bounds=L.latLngBounds([]);
      if(!selected) {
        if(baseView)drawBases();
        else Object.keys(data.days[scheme]).forEach(d=>drawDay(+d,true));
        const overview=baseView?baseLabels:[...baseLabels,['a12','乌托罗','','','left'],['a22','阿寒湖','','','right']];
        overview.forEach(([id,name,num,dates,dir])=>{
          const p=data.points[id];
          bounds.extend([p.lat,p.lng]);
          groups.set(id,stopMarker(id,p,num?[num]:[],0,name,dir,[],baseView?dates:''));
        });
      } else {
        drawDay(selected,false);
        const plan=window.DOTO_PLANS[scheme];
        const stops=(alternative ? plan.alternatives[alternative] : plan.days[selected]).stops;
        const marks=new Map();
        stops.forEach((s,i)=>{
          const id=s.mapId||s.id;
          const p=data.points[id]; if(!p)return;
          const key=p.lat.toFixed(4)+','+p.lng.toFixed(4);
          if(!marks.has(key))marks.set(key,{id,p,nums:[],ids:[]});
          const m=marks.get(key);m.nums.push(i+1);m.ids.push(id);bounds.extend([p.lat,p.lng]);
        });
        marks.forEach(m=>{
          const pin=stopMarker(m.id,m.p,m.nums,selected,undefined,undefined,m.ids.map(id=>({id})));
          m.ids.forEach(id=>groups.set(id,pin));
        });
        if(selected===11 && !groups.has('akanpark')) {
          groups.set('akanpark',stopMarker('akanpark',data.points.akanpark,['P'],selected));
        }
      }
      fit();
    }
    function focusStop(id) {
      const pin=groups.get(id); if(!pin)return;
      map.setView(pin.marker.getLatLng(),Math.max(map.getZoom(),13),{animate:false});
      pin.popup(id);
    }
    return {paint,fit,focusStop,resize:()=>map.invalidateSize({pan:false}),map};
  }
  window.dotoMap = {makeMap,dayColors};
})();
