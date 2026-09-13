const CONFIG = {
  eurHuf: 400,
  distanceRoundTrip: 990,
  fuelPrice: 1.60,
  consumption: 7.5,
  tollPerCar: 50,
  adultPass: 275,
  childPass: 138,
  daysFood: 5,
  nights: 4
};

const dates = [
  {start:"2027-01-20", end:"2027-01-24", label:"2027. január 20–24.", factor:1.00},
  {start:"2027-01-27", end:"2027-01-31", label:"2027. január 27–31.", factor:1.08},
  {start:"2027-02-03", end:"2027-02-07", label:"2027. február 3–7.", factor:1.08}
];

const accommodations = [
  {
    name:"Mountain Lodge Chalet-Turrach",
    capacity:10, size:"—", bedrooms:"4 háló", baths:"3 fürdő",
    distance:"475 m a pályától", sauna:true, hotTub:true, panorama:true,
    badge:"LEGJOBB 10 FŐRE", min:550, max:800,
    img:"https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1400&q=85",
    desc:"10 fős wellness chalet 1763 méteren, privát finn szaunával, panorámás whirlpoollal, sí- és snowboardtárolóval. Jó kompromisszum pályaelérés, férőhely és wellness között.",
    url:"https://www.chalet-turracherhoehe.at/",
    recommendation:"🏆 10 főre"
  },
  {
    name:"Chalet Golden Eagle",
    capacity:8, size:"135 m²", bedrooms:"4 háló", baths:"3 fürdő",
    distance:"~10 m / ski-in ski-out", sauna:true, hotTub:true, panorama:true,
    badge:"LEGJOBB PÁLYAELÉRÉS", min:650, max:900,
    img:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&w=1400&q=85",
    desc:"Közvetlenül a Märchenwaldabfahrt mellett. Saját szauna, fűtött kültéri hot tub, kandalló és klasszikus alpesi chalet hangulat. 8 főnél ez a legerősebb lokáció.",
    url:"https://www.roundwoodchalets.com/golden-eagle",
    recommendation:"🎿 Lokáció"
  },
  {
    name:"Naturchalets Turracher Höhe",
    capacity:8, size:"135–151 m²", bedrooms:"3–4 háló", baths:"4–5 fürdő",
    distance:"pár perc a pályákhoz", sauna:true, hotTub:true, panorama:true,
    badge:"LEGJOBB PANORÁMA", min:550, max:850,
    img:"https://alps-resorts.com/assets/images/0/nth9_unter_2mb-st8z74fr3pkz2xn.jpg",
    desc:"Modern prémium chaletek a zirbenfenyvesben. Saját szauna és kültéri hot tub, kilátással a pályákra és a Nockberge csúcsaira.",
    url:"https://alps-resorts.com/holiday-resorts/details/naturchalets-turracher-hoehe",
    recommendation:"🏔️ Panoráma"
  },
  {
    name:"Peak Existence Chalet",
    capacity:8, size:"—", bedrooms:"4 háló", baths:"4 fürdő",
    distance:"síléccel visszacsúszható", sauna:true, hotTub:true, panorama:true,
    badge:"LEGJOBB WELLNESS", min:500, max:750,
    img:"https://peakexistencechalet.com/assets/hot-tub-mkZRY_-O.png",
    desc:"Privát finn szauna és teraszos hot tub havas erdei kilátással. A Kornockbahn / Schafalmbahn / Hirschkogellift felől síléccel vissza lehet érkezni.",
    url:"https://peakexistencechalet.com/",
    recommendation:"♨️ Wellness"
  },
  {
    name:"Turrach Lodges Superior",
    capacity:10, size:"130 m²", bedrooms:"4 háló", baths:"4 fürdő",
    distance:"~1 km Kornockbahn", sauna:true, hotTub:true, panorama:true,
    badge:"JÓ ÁR/ÉRTÉK 10 FŐRE", min:500, max:750,
    img:"https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85",
    desc:"10 fős chalet 3 franciaágyas szobával + emeletes ágyas szobával, 4 fürdővel, finn szaunával és kültéri hot tubbal. A hivatalos oldal szezonon kívül €224/éjtől jelez árat.",
    url:"https://booking.alps-resorts.com/en/rentals/chalet-turrach-superior-chalet-for-10-people-with-sauna-and-outdoorjacuzzi-331791.html",
    recommendation:"💰 Ár/érték"
  }
];

let selectedDate = 0;

function midPrice(a){ return (a.min+a.max)/2; }
function eur(n){ return "€"+Math.round(n).toLocaleString("hu-HU"); }
function huf(n){ return Math.round(n*CONFIG.eurHuf).toLocaleString("hu-HU")+" Ft"; }

function renderStays(){
  const grid=document.getElementById("stayGrid");
  grid.innerHTML=accommodations.map((a,i)=>`
    <article class="stay-card ${i===0?"featured":""}">
      <div class="stay-image" style="background-image:url('${a.img}')">
        <span class="stay-badge">${a.badge}</span>
        <span class="stay-distance">⛷ ${a.distance}</span>
      </div>
      <div class="stay-body">
        <div class="stay-title-row"><h3>${a.name}</h3><span class="capacity">👥 max. ${a.capacity} fő</span></div>
        <div class="stay-meta">
          ${a.size!=="—"?`<span class="meta-chip">${a.size}</span>`:""}
          <span class="meta-chip">${a.bedrooms}</span><span class="meta-chip">${a.baths}</span>
          <span class="meta-chip">🧖 Szauna</span><span class="meta-chip">♨️ Hot tub</span>
        </div>
        <p class="stay-desc">${a.desc}</p>
        <div class="price-row">
          <div><small>Becsült 2027 téli ár</small><strong>${eur(a.min)}–${eur(a.max)} / éj</strong><small>4 éj kb. ${eur(midPrice(a)*4)}</small></div>
          <a href="${a.url}" target="_blank" rel="noopener">Szállás megnyitása ↗</a>
        </div>
      </div>
    </article>`).join("");

  document.getElementById("compareTable").innerHTML=accommodations.map(a=>`
    <tr><td><b>${a.name}</b></td><td>${a.capacity}</td><td>${a.distance}</td><td>✓</td><td>✓</td>
    <td>${eur(midPrice(a)*4)}</td><td>${a.recommendation}</td></tr>`).join("");

  const select=document.getElementById("accommodationSelect");
  select.innerHTML=accommodations.map((a,i)=>`<option value="${i}">${a.name}</option>`).join("");
}

function updateCalc(){
  const idx=+document.getElementById("accommodationSelect").value;
  const adults=Math.max(0,+document.getElementById("adults").value||0);
  const children=Math.max(0,+document.getElementById("children").value||0);
  const people=Math.max(1, adults+children);
  const cars=+document.getElementById("cars").value;
  const foodPerDay=+document.getElementById("foodLevel").value;
  const consumption=+document.getElementById("consumption").value;
  const fuelPrice=+document.getElementById("fuelPrice").value;
  const a=accommodations[idx];

  const accommodation=midPrice(a)*CONFIG.nights*dates[selectedDate].factor;
  const ski=adults*CONFIG.adultPass + children*CONFIG.childPass;
  const fuel=CONFIG.distanceRoundTrip*consumption/100*cars*fuelPrice;
  const travel=fuel+CONFIG.tollPerCar*cars;
  const food=people*foodPerDay*CONFIG.daysFood;
  const total=accommodation+ski+travel+food;
  const pp=total/people;

  document.getElementById("grandTotal").textContent=eur(total);
  document.getElementById("grandTotalHuf").textContent=huf(total);
  document.getElementById("perPerson").textContent=eur(pp);
  document.getElementById("perPersonHuf").textContent=huf(pp);
  document.getElementById("floatingTotal").textContent=huf(pp)+" / fő";
  document.getElementById("costAccommodation").textContent=eur(accommodation);
  document.getElementById("costPass").textContent=eur(ski);
  document.getElementById("costTravel").textContent=eur(travel);
  document.getElementById("costFood").textContent=eur(food);
  document.getElementById("travelFuelPreview").textContent=eur(fuel);

  [["Accommodation",accommodation],["Pass",ski],["Travel",travel],["Food",food]].forEach(([id,val])=>{
    document.getElementById("bar"+id).style.width=Math.min(100,val/total*100*2.3)+"%";
  });
}

function renderTimeline(){
  const d=dates[selectedDate];
  const start=new Date(d.start+"T12:00:00");
  const items=[
    ["Érkezés","Budapest → Turracher Höhe · check-in · szauna / jacuzzi"],
    ["Sínap 1","Reggeli a chaletben · egész napos síelés · közös vacsora"],
    ["Sínap 2","Síelés · hüttézés · esti wellness"],
    ["Sínap 3","Síelés · panoráma · családi vacsora"],
    ["Sínap 4 + haza","Délelőtt/délután sí · check-out · Turracher Höhe → Budapest"]
  ];
  const fmt=new Intl.DateTimeFormat("hu-HU",{month:"short",day:"2-digit",weekday:"short"});
  document.getElementById("timeline").innerHTML=items.map((it,i)=>{
    const x=new Date(start);x.setDate(start.getDate()+i);
    return `<div class="timeline-day"><small>${fmt.format(x).toUpperCase()}</small><strong>${it[0]}</strong><p>${it[1]}</p></div>`;
  }).join("");
}

document.querySelectorAll("[data-date]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    selectedDate=+btn.dataset.date;
    document.querySelectorAll("[data-date]").forEach(b=>b.classList.toggle("active",b===btn));
    updateCalc();renderTimeline();
  });
});

["accommodationSelect","adults","children","cars","foodLevel","consumption","fuelPrice"].forEach(id=>{
  document.getElementById(id).addEventListener("input",updateCalc);
});

renderStays();
renderTimeline();
updateCalc();

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.animate([{opacity:0,transform:"translateY(22px)"},{opacity:1,transform:"translateY(0)"}],{duration:650,easing:"cubic-bezier(.2,.7,.2,1)",fill:"both"});});
},{threshold:.08});
document.querySelectorAll(".stay-card,.date-card,.route-card,.pass-card,.podium-card").forEach(el=>io.observe(el));
