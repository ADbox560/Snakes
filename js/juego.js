/* Lógica del juego: turnos, dado, preguntas, robar avance, movimiento, serpientes/escaleras, lugares en el podio y fin de la partida. */
function upd(){
 $("score").innerHTML=P.map((p,i)=>`<span class="chip ${i===cur&&!p.out&&!p.fin?"on":""}" style="${p.out?"opacity:.5;text-decoration:line-through":""}">${p.e} <b>${esc(p.n)}</b> · ${p.fin?medal(p.fin)+" lugar":"casilla "+p.pos} · ✅${p.ok} ❌${p.no} · 🐍${p.snk}/${MAX_SNK}${p.out?" ☠️":""}</span>`).join("");
 $("turn").innerHTML=`Turno de <b>${P[cur].e} ${esc(P[cur].n)}</b><br><small>❓ Preguntas restantes: ${deck.length}</small>`;
 P.forEach((p,i)=>{const t=$("t"+i);if(t)t.classList.toggle("fin",!!p.fin)})}
$("roll").onclick=()=>{
 if(busy)return;busy=true;$("roll").disabled=true;const d=$("dice");d.classList.add("roll");$("msg").textContent="";
 let k=0;const iv=setInterval(()=>{d.textContent=["⚀","⚁","⚂","⚃","⚄","⚅"][Math.floor(Math.random()*6)];if(++k>8){clearInterval(iv);d.classList.remove("roll");pend=1+Math.floor(Math.random()*6);d.textContent=["⚀","⚁","⚂","⚃","⚄","⚅"][pend-1];$("msg").textContent=`Sacaste ${pend}. ¡Responde para avanzar!`;setTimeout(ask,700)}},80)};
function stopTimer(){if(tmrIv){clearInterval(tmrIv);tmrIv=null}}
function stealIdx(){return P.map((p,i)=>i).filter(i=>i!==cur&&!P[i].out&&!P[i].fin)}
function startSteal(){
 stopTimer();const box=$("steal"),btn=$("stealBtn"),tx=$("tmr");
 $("stealList").classList.add("hide");$("stealList").innerHTML="";
 if(!stealIdx().length){box.classList.add("hide");return}
 box.classList.remove("hide");btn.disabled=true;let t=STEAL_SEC;tx.textContent=`⏳ ${t} s para decidir…`;
 tmrIv=setInterval(()=>{t--;if(t>0)tx.textContent=`⏳ ${t} s para decidir…`;else{stopTimer();tx.textContent="⏰ Se acabó el tiempo: otro jugador puede robar el avance.";btn.disabled=false}},1000)}
$("stealBtn").onclick=()=>{
 const l=$("stealList");l.innerHTML="<small>¿Quién roba el avance?</small><div class='chips'>"+stealIdx().map(i=>`<button type="button" class="alt" data-i="${i}">${P[i].e} ${esc(P[i].n)}</button>`).join("")+"</div>";l.classList.remove("hide")};
$("stealList").onclick=e=>{const b=e.target.closest("button[data-i]");if(!b)return;
 ans=+b.dataset.i;stolen=true;$("steal").classList.add("hide");
 $("qmeta").textContent=`🥷 ${P[ans].n} roba el avance de ${P[cur].n}`};
function ask(){
 if(!deck.length){finishGame();return}
 const qi=deck.pop(),q=Q[qi];asked++;ans=cur;stolen=false;
 $("qmeta").textContent=`${P[cur].n} · Pregunta ${qi+1} de ${Q.length} del cuestionario`;$("qt").textContent=(qi+1)+". "+q.q;
 $("qo").innerHTML="";$("fb").style.display="none";$("next").classList.add("hide");$("next").textContent="Continuar";
 q.o.forEach((t,i)=>{const b=document.createElement("button");b.className="opt";b.innerHTML=`<b>${"ABCDEFGH"[i]})</b> `;b.append(t);
  b.onclick=()=>{
   stopTimer();$("steal").classList.add("hide");
   [...$("qo").children].forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add("ok")});
   cor=i===q.a;if(!cor)b.classList.add("no");
   const who=P[ans];cor?who.ok++:who.no++;
   const f=$("fb");f.style.display="block";f.innerHTML=(stolen&&cor?`🥷 <b>¡${esc(who.n)} robó el avance!</b> `:"")+(cor?"🎉 <b>¡Correcto!</b> ":"😅 <b>Casi.</b> La respuesta correcta es el inciso <b>"+"ABCDEFGH"[q.a]+"</b>. ")+"<br>"+esc(q.e||"");
   nextFn=()=>cor?move(pend,ans):endTurn(stolen?`${P[ans].n} falló al robar: nadie avanza.`:"Respuesta incorrecta: te quedas en tu casilla.",cur);
   $("next").classList.remove("hide")};
  $("qo").appendChild(b)});
 startSteal();
 $("modal").classList.add("show")}
$("next").onclick=()=>{$("modal").classList.remove("show");const f=nextFn;nextFn=null;if(f)f()};
function move(d,idx){
 const p=P[idx];let pos=p.pos,dir=1,path=[];
 for(let i=0;i<d;i++){pos+=dir;path.push(pos);if(pos===100)dir=-1}
 let k=0;const iv=setInterval(()=>{
  p.pos=path[k++];place(idx);{const t=$("t"+idx);t.classList.remove("hop");void t.offsetWidth;t.classList.add("hop")}
  if(k>=path.length){clearInterval(iv);
   setTimeout(()=>{
    if(JUMP[p.pos]){const up=JUMP[p.pos]>p.pos;const tk=$("t"+idx);p.pos=JUMP[p.pos];tk.classList.add("slow",up?"up":"dn");place(idx);
     let mm=up?"🪜 ¡Escalera! Subes a la casilla "+p.pos:"🐍 ¡Serpiente! Bajas a la casilla "+p.pos;
     if(!up){p.snk++;mm+=` (serpientes: ${p.snk}/${MAX_SNK})`;if(p.snk>=MAX_SNK){p.out=true;mm=`☠️ ¡Cuarta serpiente! ${p.n} queda eliminado.`}}
     $("msg").textContent=mm;
     setTimeout(()=>{tk.classList.remove("slow","up","dn");if(p.out){tk.textContent="💀";tk.style.opacity=".45"}endTurn(mm,idx)},1500)}
    else endTurn("",idx)},400)}},280)}
function nextTurn(){let n=0;do{cur=(cur+1)%P.length}while((P[cur].out||P[cur].fin)&&++n<=P.length)}
function active(){return P.filter(p=>!p.out&&!p.fin)}
function showInfo(meta,title,html,btn,fn){
 stopTimer();$("steal").classList.add("hide");
 $("qmeta").textContent=meta;$("qt").textContent=title;$("qo").innerHTML=html;$("fb").style.display="none";
 $("next").textContent=btn;$("next").classList.remove("hide");nextFn=fn;$("modal").classList.add("show")}
function endTurn(m,idx){
 const p=P[idx];
 if(p.pos===100&&!p.fin){
  p.fin=++places;upd();confetti(25);
  const goOn=!!(active().length&&deck.length);
  showInfo("¡Meta alcanzada!",`${medal(p.fin)} ¡${p.n} llegó a la meta!`,`<p>${p.e} <b>${esc(p.n)}</b> ocupa el <b>${p.fin}º lugar</b>.</p>`+(goOn?`<p>El juego continúa con los jugadores que siguen en el tablero. Preguntas restantes: ${deck.length}.</p>`:""),goOn?"Continuar":"Ver resultados",()=>nextStep(`${p.n} terminó en el ${p.fin}º lugar.`));
  return}
 nextStep(m)}
function nextStep(m){
 if(!deck.length||!active().length){finishGame();return}
 $("msg").textContent=m;nextTurn();busy=false;$("roll").disabled=false;upd()}
function finishGame(){
 busy=true;$("roll").disabled=true;upd();
 const F=P.filter(p=>p.fin).sort((a,b)=>a.fin-b.fin),
  R=P.filter(p=>!p.fin).sort((a,b)=>(a.out-b.out)||b.pos-a.pos||b.ok-a.ok),
  st=x=>`✅ ${x.ok} · ❌ ${x.no} · 🐍 ${x.snk}`;
 let n=F.length;
 const rows=F.map(x=>`<p>${medal(x.fin)} ${x.e} <b>${esc(x.n)}</b> · llegó a la meta · ${st(x)}</p>`).join("")
  +R.map(x=>`<p>${++n}º ${x.e} <b>${esc(x.n)}</b> · ${x.out?"☠️ eliminado en la casilla "+x.pos:"casilla "+x.pos} · ${st(x)}</p>`).join("");
 const why=!deck.length?"📚 ¡Se acabaron las preguntas!":"🏁 Ya no queda nadie jugando";
 showInfo("¡Fin del juego!",why,`<p><b>${F.length?"🏆 Ganó "+esc(F[0].n)+", el primero en llegar a la meta":"Nadie llegó a la meta"}</b></p><p><b>Clasificación final:</b></p>`+rows,"Jugar de nuevo",()=>location.reload());
 if(F.length)confetti(40)}
