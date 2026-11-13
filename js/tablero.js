/* Tablero: construye las casillas, coloca las fichas y dibuja escaleras y serpientes en SVG. */
function build(){
 const b=$("board");b.innerHTML='<svg id="fx" viewBox="0 0 100 100"></svg>';
 for(let n=1;n<=100;n++){const [x,y]=xy(n),d=document.createElement("div");d.className="cell";d.style.left=x+"%";d.style.top=y+"%";d.textContent=n;b.appendChild(d)}
 $("fx").innerHTML=draw();
 P.forEach((p,i)=>{const t=document.createElement("div");t.className="tok";t.id="t"+i;t.style.background=p.c;t.textContent=p.out?"💀":p.e;if(p.out)t.style.opacity=".45";b.appendChild(t);place(i)})}
function place(i){const p=P[i],[x,y]=xy(p.pos||1),o=(i%3)*2.8+.2,q=Math.floor(i/3)*3.2+.3,t=$("t"+i);
 t.style.left=(x+o)+"%";t.style.top=(y+q)+"%"}
function draw(){
const c=n=>{const[x,y]=xy(n);return[x+5,y+5]},K=['#16a34a','#dc2626','#7c3aed','#ea580c','#0891b2','#db2777','#65a30d','#ca8a04'];let s='';
L.forEach(([a,z])=>{const[x1,y1]=c(a),[x2,y2]=c(z),dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),nx=-dy/l*1.5,ny=dx/l*1.5,n=Math.floor(l/3.4);
s+=`<g class='lad'>`;
for(let k=1;k<=n;k++){const t=k/(n+1),mx=x1+dx*t,my=y1+dy*t;s+=`<line x1='${mx+nx}' y1='${my+ny}' x2='${mx-nx}' y2='${my-ny}' stroke='#78350f' stroke-width='.9' stroke-linecap='round'/>`}
[1,-1].forEach(m=>{s+=`<line x1='${x1+nx*m}' y1='${y1+ny*m}' x2='${x2+nx*m}' y2='${y2+ny*m}' stroke='#78350f' stroke-width='1.3' stroke-linecap='round'/><line x1='${x1+nx*m}' y1='${y1+ny*m}' x2='${x2+nx*m}' y2='${y2+ny*m}' stroke='#f59e0b' stroke-width='.5' stroke-linecap='round'/>`});
s+='</g>'});
S.forEach(([a,z],i)=>{const[x1,y1]=c(a),[x2,y2]=c(z),dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),ux=dx/l,uy=dy/l,px=-uy,py=ux,N=30,m=Math.max(2,Math.round(l/10));let pts=[];
for(let k=0;k<=N;k++){const t=k/N,w=Math.sin(t*Math.PI*m)*3.2;pts.push((x1+dx*t+px*w).toFixed(1)+','+(y1+dy*t+py*w).toFixed(1))}
const d=pts.join(' '),q=K[i%8],f=`fill='none' stroke-linecap='round' stroke-linejoin='round'`;
s+=`<g class='snk' style='animation-delay:-${i*.7}s'><polyline points='${d}' ${f} stroke='#0007' stroke-width='3.1'/><polyline points='${d}' ${f} stroke='${q}' stroke-width='2.4'/><polyline class='scl' points='${d}' ${f} stroke='#ffffffaa' stroke-width='2.4' stroke-dasharray='.7 2'/>`;
s+=`<line x1='${x1-ux*2}' y1='${y1-uy*2}' x2='${x1-ux*4.2}' y2='${y1-uy*4.2}' stroke='#ef4444' stroke-width='.4'/><circle cx='${x1}' cy='${y1}' r='2.5' fill='${q}' stroke='#0007' stroke-width='.4'/>`;
[1,-1].forEach(e=>{s+=`<circle cx='${x1-ux*.6+px*e*1.1}' cy='${y1-uy*.6+py*e*1.1}' r='.75' fill='#fff'/><circle cx='${x1-ux*.9+px*e*1.1}' cy='${y1-uy*.9+py*e*1.1}' r='.35' fill='#000'/>`});
s+='</g>'});
return s}
