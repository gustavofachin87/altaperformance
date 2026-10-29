/* ====== EDITE AQUI ====== */
const CONFIG = {
  whatsapp: "5541985071712",           // DDI + DDD + número, só dígitos
  mensagem: "Olá! Vim pelo site e quero agendar um horário.",
  telefone: "(41) 98507-1712",
  endereco: "Rua Professor João Soares Barcelos, 188, Hauer, Curitiba/PR",
  horario:  "Seg a sex, 8h às 18h. Sáb e dom fechado",
  mapa:     "https://www.google.com/maps/place/Oficina+Mec%C3%A2nica+Alta+Performance/data=!4m2!3m1!1s0x0:0x3cad429d4b9a9c77?sa=X&ved=1t:2428&hl=pt-BR&ictx=111",
    fotos: ["fotos/1.jpg","fotos/2.jpg","fotos/3.jpg","fotos/4.jpg","fotos/5.jpg","fotos/6.jpg"]
};
/* ======================== */

// links
const wl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;
document.querySelectorAll('[data-wpp]').forEach(a=>{a.href=wl;a.target="_blank";a.rel="noopener"});
document.querySelectorAll('[data-map]').forEach(a=>{a.href=CONFIG.mapa;a.target="_blank";a.rel="noopener"});
document.getElementById('addr').textContent=CONFIG.endereco;
document.getElementById('hours').textContent=CONFIG.horario;
document.getElementById('phone').textContent=CONFIG.telefone;
document.getElementById('yr').textContent=new Date().getFullYear();

// fotos com fallback
document.querySelectorAll('#bento .ph').forEach((box,i)=>{
  const img=box.querySelector('img');
  img.onerror=()=>box.classList.add('empty');
  img.src=CONFIG.fotos[i]||"";
  if(!CONFIG.fotos[i]) box.classList.add('empty');
});

// faixa
const words=["Diagnóstico","Freios","Suspensão","Motor","Revisão","Elétrica","Alinhamento","Troca de óleo"];
const mq=document.getElementById('marq');
mq.innerHTML=[...words,...words].map(w=>`<span>${w}</span><i></i>`).join('');

// reveal ao rolar
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const sib=[...e.target.parentElement.children].indexOf(e.target);
    e.target.style.transitionDelay=Math.min(sib*70,350)+'ms';
    e.target.classList.add('in');io.unobserve(e.target);
  }
}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// spotlight nos cards
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--x',(e.clientX-r.left)+'px');
    c.style.setProperty('--y',(e.clientY-r.top)+'px');
  });
});

// luz do cursor
const root=document.documentElement;
addEventListener('pointermove',e=>{root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px')},{passive:true});

// linha do processo acompanha a rolagem
const steps=document.getElementById('steps'), st=[...steps.children];
function prog(){
  const r=steps.getBoundingClientRect(), vh=innerHeight;
  const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.25)));
  steps.style.setProperty('--p',p);
  st.forEach((s,i)=>s.classList.toggle('on',p>=i/(st.length-1)-.02&&p>0.02));
}
addEventListener('scroll',prog,{passive:true});prog();

// menu esconde ao descer e volta ao subir
let ly=0;const nav=document.querySelector('.nav-in');
addEventListener('scroll',()=>{
  const y=scrollY;nav.style.transform=(y>ly&&y>300)?'translateY(-90px)':'none';ly=y;
},{passive:true});
