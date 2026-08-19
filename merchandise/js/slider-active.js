
/* Vanilla replacement for Swiper. Keeps the original .swiper markup/classes. */
(function(){
  "use strict";
  const configs = [
    [".aqf-text-slide-active", {desktop: "auto", gap:50, speed:2000, autoplay:20, mode:"marquee"}],
    [".aqf-slider-active", {desktop:1, gap:0, speed:1000, autoplay:5000, nav:true, dots:true}],
    [".aq-product-active", {desktop:4, 1200:3, 992:3, 768:2, 576:2, 0:1, gap:25}],
    [".aq-product-2-active", {desktop:4, 1200:3, 992:3, 768:2, 576:2, 0:1, gap:0}],
    [".aqf-collection-active", {desktop:5, 1200:5, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aq-testimonial-active", {desktop:3, 1200:3, 992:2, 768:1, 576:1, 0:1, gap:30}],
    [".fr-testimonial-active", {desktop:3, 1600:2, 1400:2, 1200:2, 992:2, 768:1, 576:1, 0:1, gap:30}],
    [".aqf-deals-slider-active", {desktop:3, 1400:3, 1200:2, 992:2, 768:2, 576:2, 0:1, gap:10}],
    [".grc-deals-slider-active", {desktop:4.5, 1400:4.5, 1200:3, 992:2, 768:2, 576:2, 0:1, gap:10}],
    [".grc-slider-active", {desktop:6, 1400:6, 1200:3, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".grc-slider-active-2", {desktop:5, 1400:5, 1200:3, 992:2, 768:2, 576:2, 0:1, gap:20}],
    [".aqb-gallery-active", {desktop:3, 1200:3, 992:2, 768:1, 0:1, gap:20}],
    [".aqb-product-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqb-category-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqb-product-inner-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-summer-active", {desktop:1, gap:0, speed:1000, autoplay:5000, nav:true, dots:true}],
    [".aqf-testimonial-active", {desktop:3, 1200:3, 992:2, 768:1, 0:1, gap:30}],
    [".aq-modal-slider-active", {desktop:1, gap:0, nav:true, dots:true, autoplay:0}],
    [".aq-shopgram-active", {desktop:5, 1200:5, 992:4, 768:3, 576:2, 0:2, gap:20}],
    [".elt-slider-active", {desktop:1, gap:0, nav:true, dots:true, autoplay:5000}],
    [".aq-brand-active", {desktop:5, 1200:5, 992:4, 768:3, 576:2, 0:2, gap:20}],
    [".grc-brand-active", {desktop:6, 1400:6, 1200:4, 992:3, 768:2, 576:2, 0:2, gap:20}],
    [".aq-header-discount-active", {desktop:1, gap:0, autoplay:5000}],
    [".aqf-categories-active", {desktop:5, 1200:5, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-categories-2-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-categories-3-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-categories-4-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-categories-5-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".med-categories-active", {desktop:5, 1200:5, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-category-2-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-arrivals-nav-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}],
    [".aqf-arrivals-product-active", {desktop:4, 1200:4, 992:3, 768:2, 576:2, 0:1, gap:20}]
  ];

  function perView(cfg){
    const w=window.innerWidth;
    const points=Object.keys(cfg).filter(k=>/^\d+$/.test(k)).map(Number).sort((a,b)=>a-b);
    let v=cfg.desktop||1;
    points.forEach(p=>{if(w>=p) v=cfg[p]});
    return v;
  }
  function setup(root,cfg){
    const wrapper=root.querySelector(".swiper-wrapper");
    if(!wrapper) return;
    const slides=[...wrapper.querySelectorAll(":scope > .swiper-slide")];
    if(!slides.length) return;
    const gap=cfg.gap||0;
    wrapper.style.gap=gap+"px";
    let index=0, timer=null;
    const marquee=cfg.mode==="marquee";
    if(marquee){
      wrapper.style.width="max-content";
      wrapper.style.animation="vanillaMarquee "+(Math.max(8,slides.length*4))+"s linear infinite";
      return;
    }
    function render(){
      const pv=perView(cfg);
      const width=(root.clientWidth-(pv-1)*gap)/pv;
      slides.forEach(s=>s.style.width=Math.max(0,width)+"px");
      const max=Math.max(0,slides.length-pv);
      if(index>max) index=cfg.loop!==false?0:max;
      wrapper.style.transform=`translateX(-${index*(width+gap)}px)`;
      root.dataset.index=index;
      const prev=document.querySelector(cfg.prev||"."+root.classList[0]+"-prev");
      const next=document.querySelector(cfg.next||"."+root.classList[0]+"-next");
      if(prev) prev.onclick=()=>{index=index<=0?max:index-1;render()};
      if(next) next.onclick=()=>{index=index>=max?0:index+1;render()};
      if(cfg.dots){
        let dots=root.parentElement.querySelector(".vanilla-dots");
        if(!dots){dots=document.createElement("div");dots.className="vanilla-dots aqf-slider-dot";root.parentElement.appendChild(dots)}
        dots.innerHTML="";
        for(let i=0;i<=max;i++){let b=document.createElement("button");b.type="button";b.className=i===index?"active":"";b.onclick=()=>{index=i;render()};dots.appendChild(b)}
      }
    }
    render();
    window.addEventListener("resize",()=>requestAnimationFrame(render));
    if(cfg.autoplay){
      timer=setInterval(()=>{index++;render()},cfg.autoplay);
      root.addEventListener("mouseenter",()=>{if(timer)clearInterval(timer)});
      root.addEventListener("mouseleave",()=>{if(cfg.autoplay)timer=setInterval(()=>{index++;render()},cfg.autoplay)});
    }
  }
  function init(){
    const style=document.createElement("style");
    style.textContent="@keyframes vanillaMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.vanilla-dots{display:flex;gap:8px;justify-content:center;margin-top:15px}.vanilla-dots button{width:8px;height:8px;border:0;border-radius:50%;padding:0;background:currentColor;opacity:.35;cursor:pointer}.vanilla-dots button.active{opacity:1}";
    document.head.appendChild(style);
    configs.forEach(([sel,cfg])=>document.querySelectorAll(sel).forEach(el=>setup(el,cfg)));
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
