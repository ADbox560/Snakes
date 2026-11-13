/* Guardar y cargar avance de la partida (archivo JSON). */
function saveGame(){
 if(busy){$("msg").textContent="Espera a que termine el turno para guardar.";return}
 const d={v:1,fecha:new Date().toISOString(),P,cur,deck,asked,Q,places};
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(d)],{type:"application/json"}));
 const nm=P.map(p=>p.n).join("-").replace(/[^\wáéíóúñÁÉÍÓÚÑ-]+/g,"_").slice(0,40);
 a.download=`partida_${nm}_${d.fecha.slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
 $("msg").textContent="💾 Avance guardado: busca el archivo en tu carpeta de descargas."}
function loadGame(f){
 if(!f)return;
 if(busy){alert("Espera a que termine el turno para cargar otra partida.");return}
 const r=new FileReader();
 r.onload=()=>{try{
  const d=JSON.parse(r.result);
  if(!d||!Array.isArray(d.P)||!d.P.length||d.P.length>10||!Array.isArray(d.Q)||!d.Q.length||!Array.isArray(d.deck))throw 0;
  if(!d.Q.every(q=>q&&typeof q.q==="string"&&Array.isArray(q.o)&&q.o.length>1&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length))throw 0;
  if(!d.P.every(p=>p&&typeof p.n==="string"&&Number.isInteger(p.pos)&&p.pos>=0&&p.pos<=100))throw 0;
  Q=d.Q;
  P=d.P.map((p,i)=>({n:p.n.slice(0,14),e:AV.includes(p.e)?p.e:AV[i%AV.length],c:/^#[0-9a-f]{6}$/i.test(p.c)?p.c:COL[i%COL.length],pos:p.pos,ok:+p.ok||0,no:+p.no||0,snk:+p.snk||0,out:!!p.out,fin:+p.fin>0?Math.floor(+p.fin):0}));
  deck=d.deck.filter(i=>Number.isInteger(i)&&i>=0&&i<Q.length);asked=+d.asked||0;
  cur=Number.isInteger(d.cur)&&d.cur>=0&&d.cur<P.length?d.cur:0;let fc=Math.max(0,...P.map(p=>p.fin));P.forEach(p=>{if(p.pos===100&&!p.fin)p.fin=++fc});places=fc;
  if(P[cur].out||P[cur].fin)nextTurn();
  busy=false;stopTimer();$("modal").classList.remove("show");
  $("setup").classList.add("hide");$("game").classList.remove("hide");
  build();upd();$("roll").disabled=false;$("msg").textContent="📂 Partida cargada. ¡Continúa el juego!";nextFn=null;
  if(!deck.length||!active().length)finishGame();
 }catch(e){alert("No se pudo cargar el archivo: no parece una partida guardada válida.")}};
 r.readAsText(f)}
$("lf").onchange=e=>{const f=e.target.files[0];e.target.value="";loadGame(f)};
$("loadS").onclick=$("loadB").onclick=()=>$("lf").click();
$("saveB").onclick=saveGame;
