/* Pantalla inicial: elegir avatar, agregar/quitar jugadores, cargar preguntas propias (JSON) y comenzar la partida. */
function drawAvs(){
 if(!selAv||P.some(p=>p.e===selAv))selAv=AV.find(a=>!P.some(p=>p.e===a))||null;
 $("avs").innerHTML=AV.map(a=>`<button type="button" class="av${a===selAv?" sel":""}${P.some(p=>p.e===a)?" taken":""}" data-a="${a}">${a}</button>`).join("")}
$("avs").onclick=e=>{const b=e.target.closest(".av");if(!b)return;selAv=b.dataset.a;drawAvs()};
function drawPlist(){$("plist").innerHTML=P.map((p,i)=>`<span class="chip">${p.e} ${esc(p.n)} <a href="#" data-i="${i}" style="text-decoration:none">✕</a></span>`).join("");$("start").disabled=!P.length;$("add").disabled=P.length>=10;drawAvs()}
$("add").onclick=()=>{const v=$("pn").value.trim();if(!v||!selAv||P.length>=10)return;const c=COL.find(x=>!P.some(p=>p.c===x))||COL[0];P.push({n:v,e:selAv,c,pos:0,ok:0,no:0,snk:0,out:false,fin:0});$("pn").value="";drawPlist()};
$("pn").onkeydown=e=>{if(e.key==="Enter")$("add").click()};
$("plist").onclick=e=>{const i=e.target.dataset.i;if(i!==undefined){e.preventDefault();P.splice(+i,1);drawPlist()}};
$("start").onclick=()=>{
 const t=$("imp").value.trim();
 if(t){try{const j=JSON.parse(t);if(Array.isArray(j)&&j.length)Q=j}catch(e){alert("El JSON de preguntas no es válido. Se usarán las preguntas de ejemplo.")}}
 deck=Q.map((_,i)=>i).sort(()=>Math.random()-.5);
 $("setup").classList.add("hide");$("game").classList.remove("hide");build();upd()};
