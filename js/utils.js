/* Utilidades compartidas: atajo del DOM, escape de HTML, coordenadas del tablero, medallas y confeti. */
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function xy(n){const r=Math.floor((n-1)/10),c=r%2?9-(n-1)%10:(n-1)%10;return[c*10,(9-r)*10]}
const medal=n=>(["🥇","🥈","🥉"][n-1]||"🏅")+" "+n+"º";
function confetti(n){for(let i=0;i<n;i++){const c=document.createElement("div");c.className="conf";c.textContent=["🎉","⭐","🎊","✨"][i%4];c.style.left=Math.random()*100+"vw";c.style.animationDelay=Math.random()*1.5+"s";document.body.appendChild(c);setTimeout(()=>c.remove(),5500)}}
