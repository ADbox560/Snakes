/* Configuración: escaleras (L), serpientes (S), colores, avatares, reglas (tiempo para robar, serpientes máximas) y estado global de la partida. */
const L=[[4,14],[9,31],[20,38],[28,84],[40,59],[51,67],[63,81],[71,91]],
S=[[17,7],[54,34],[62,19],[64,60],[87,24],[93,73],[95,75],[99,78]],
JUMP={};[...L,...S].forEach(([a,b])=>JUMP[a]=b);
const COL=["#ef4444","#3b82f6","#22c55e","#f59e0b","#a855f7","#ec4899","#14b8a6","#f97316","#84cc16","#64748b"],
AV=["🦊","🐼","🐸","🦁","🐙","🦄","🐯","🐵","🐧","🐶","🐱","🐰","🐻","🐨","🐮","🐷","🐢","🦉","🦋","🐬","🦖","🐲","🤖","👽","🚀","⚽","🎸","🎮","🍕","🌟","🔥","👑"],
STEAL_SEC=20,MAX_SNK=4;
let P=[],cur=0,busy=false,deck=[],asked=0,cor=false,pend=0,ans=0,stolen=false,tmrIv=null,selAv=null,places=0,nextFn=null;
