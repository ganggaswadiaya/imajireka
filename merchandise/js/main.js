
(function(){
"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const add=(el,cl)=>el&&el.classList.add(cl), rem=(el,cl)=>el&&el.classList.remove(cl), tog=(el,cl)=>el&&el.classList.toggle(cl);

window.addEventListener("load",()=>{
  const loader=$("#loading"); if(loader){loader.style.transition="opacity .5s";loader.style.opacity="0";setTimeout(()=>loader.style.display="none",500)}
});
document.addEventListener("DOMContentLoaded",()=>{
  $$("[data-background]").forEach(el=>el.style.backgroundImage=`url(${el.dataset.background})`);
  $$("[data-width]").forEach(el=>el.style.width=el.dataset.width);
  $$("[data-height]").forEach(el=>el.style.height=el.dataset.height);
  $$("[data-bg-color]").forEach(el=>el.style.backgroundColor=el.dataset.bgColor);
  $$("[data-text-color]").forEach(el=>el.style.color=el.dataset.textColor);

  // Mobile offcanvas menus
  [".aq-mobile-menu-active",".aq-mobile-menu-2-active"].forEach((src,i)=>{
    const target=i?".aq-offcanvas-2-menu":".aq-offcanvas-menu";
    const menu=$(src), nav=$(target+" nav"); if(!menu||!nav)return;
    nav.innerHTML="";
    const clone=menu.querySelector(":scope > ul")?.cloneNode(true); if(!clone)return;
    nav.appendChild(clone);
    $$("li.has-dropdown",nav).forEach(li=>{
      const btn=document.createElement("button");btn.className="aq-menu-close";btn.type="button";
      btn.addEventListener("click",e=>{e.preventDefault();li.classList.toggle("active");const sub=li.querySelector(":scope > .submenu, :scope > .mega-menu");if(sub)sub.classList.toggle("show")});
      li.appendChild(btn);
    });
  });

  // Custom tabs
  $$(".aq-custom-tabs").forEach(t=>{
    const b=$$(".tab-btn",t), c=$$(".category-tab-content",t);
    b.forEach((x,i)=>x.addEventListener("click",()=>{b.forEach(y=>rem(y,"active"));c.forEach(y=>rem(y,"active"));add(x,"active");add(c[i],"active")}));
  });

  // Masonry/filter fallback
  $$(".masonary-menu").forEach(menu=>menu.addEventListener("click",e=>{
    const btn=e.target.closest("button"); if(!btn)return;
    e.preventDefault(); $$(".masonary-menu button").forEach(x=>rem(x,"active"));add(btn,"active");
    const filter=btn.dataset.filter;
    $$(".grid-item").forEach(item=>{item.style.display=filter==="*"||item.matches(filter)?"":"none"});
  }));

  // Image/video popup without Magnific Popup
  document.addEventListener("click",e=>{
    const img=e.target.closest(".popup-image");
    if(img){e.preventDefault();openLightbox(img.href||img.querySelector("img")?.src,"image");}
    const vid=e.target.closest(".popup-video");
    if(vid){e.preventDefault();openLightbox(vid.href,"video");}
  });
  function openLightbox(src,type){
    if(!src)return;
    let box=$("#vanilla-lightbox"); if(!box){box=document.createElement("div");box.id="vanilla-lightbox";box.innerHTML='<button class="vl-close" aria-label="Close">×</button><div class="vl-content"></div>';document.body.appendChild(box);
      box.addEventListener("click",e=>{if(e.target===box||e.target.classList.contains("vl-close"))box.classList.remove("show")});
    }
    const content=$(".vl-content",box);
    content.innerHTML=type==="video"?`<iframe src="${src}" allowfullscreen></iframe>`:`<img src="${src}" alt="">`;
    add(box,"show");
  }

  // Modal replacement for Bootstrap
  document.addEventListener("click",e=>{
    const trigger=e.target.closest('[data-bs-toggle="modal"]');
    if(trigger){e.preventDefault();const id=trigger.dataset.bsTarget;const m=id&&$(id);if(m)openModal(m)}
    if(e.target.closest('[data-bs-dismiss="modal"]'))closeModal(e.target.closest(".modal"));
    if(e.target.classList.contains("modal"))closeModal(e.target);
  });
  function openModal(m){add(m,"show");document.body.classList.add("modal-open");m.setAttribute("aria-hidden","false")}
  function closeModal(m){if(!m)return;rem(m,"show");document.body.classList.remove("modal-open");m.setAttribute("aria-hidden","true")}

  // Smooth scrolling
  $$(".smooth a").forEach(a=>a.addEventListener("click",e=>{
    const id=a.getAttribute("href"); if(id?.startsWith("#")&&$(id)){e.preventDefault();window.scrollTo({top:$(id).getBoundingClientRect().top+scrollY-60,behavior:"smooth"})}
  }));
  const topWrap=$(".back-to-top-wrapper");
  const progress=$(".progress-wrap");
  window.addEventListener("scroll",()=>{
    const y=scrollY;
    if(topWrap)toggle(topWrap,"back-to-top-btn-show",y>300);
    if(progress)toggle(progress,"active-progress",y>50);
  });
  $("#back_to_top")?.addEventListener("click",e=>{e.preventDefault();scrollTo({top:0,behavior:"smooth"})});
  progress?.addEventListener("click",e=>{e.preventDefault();scrollTo({top:0,behavior:"smooth"})});

  // Header language/currency/settings dropdowns
  function dropdown(toggleSel,listSel,cl){
    const t=$(toggleSel), l=$(listSel); if(!t||!l)return;
    document.addEventListener("click",e=>{
      if(t.contains(e.target))tog(l,cl); else rem(l,cl);
    });
  }
  dropdown(".aq-header-lang-toggle",".aq-header-lang ul","aq-lang-list-open");
  dropdown(".aq-header-currency-toggle",".aq-header-currency ul","aq-currency-list-open");
  const st=$("#aq-header-setting-toggle"), sl=$(".aq-header-setting ul");
  if(st&&sl)document.addEventListener("click",e=>e.stopPropagation()|| (st.contains(e.target)?tog(sl,"aq-setting-list-open"):rem(sl,"aq-setting-list-open")));

  $$(".aq-bottom-menu-item").forEach(x=>x.addEventListener("click",()=>{const p=x.closest(".aq-bottom-menu");$$(".aq-bottom-menu-item.active",p).forEach(y=>rem(y,"active"));add(x,"active")}));

  // Product swatches
  document.addEventListener("click",e=>{
    const sw=e.target.closest(".aq-color-swatch"); if(!sw)return;
    const src=$("img",sw)?.src, product=sw.closest(".aq-product-main"), image=product?.querySelector(".aq-product-img");
    if(src&&image)image.src=src;
    if(product)$$(".aq-color-swatch.active",product).forEach(x=>rem(x,"active"));add(sw,"active");
  });

  // Countdown
  const cd=$(".aq-date-countdown");
  if(cd&&cd.dataset.date){
    const target=new Date(cd.dataset.date).getTime();
    const tick=()=>{let d=target-Date.now();if(d<0){$("#countdown")&&( $("#countdown").innerHTML="<span class='alert'>Event Expired</span>");return}
      const day=86400000,h=3600000,m=60000,s=1000;
      const vals=[Math.floor(d/day),Math.floor(d%day/h),Math.floor(d%h/m),Math.floor(d%m/s)].map(v=>String(v).padStart(2,"0"));
      ["days","hours","minutes","seconds"].forEach((id,i)=>{const el=$("#"+id);if(el)el.textContent=vals[i]});
    };tick();setInterval(tick,1000);
  }

  // Quantity controls
  document.addEventListener("click",e=>{
    const minus=e.target.closest(".aq-cart-minus"), plus=e.target.closest(".aq-cart-plus");
    if(!minus&&!plus)return;e.preventDefault();
    const wrap=(minus||plus).parentElement, input=$("input",wrap);if(!input)return;
    let n=Number(input.value)||1;n=minus?Math.max(1,n-1):n+1;input.value=n;input.dispatchEvent(new Event("change",{bubbles:true}));
  });

  // Toggle forms / boxes
  function slideToggle(sel,btnSel){
    const el=$(sel); if(!el)return;
    $(btnSel)?.addEventListener("click",()=>el.classList.toggle("vanilla-open"));
  }
  slideToggle("#aqReturnCustomerLoginForm",".aq-checkout-login-form-reveal-btn");
  slideToggle("#aqCheckoutCouponForm",".aq-checkout-coupon-form-reveal-btn");
  slideToggle("#cbox_info","#cbox");slideToggle("#ship-box-info","#ship-box");
  const style=document.createElement("style");style.textContent=".vanilla-open{display:block!important}.aq-offcanvas-wrap.opened,.aq-search-wrap.opened,.aq-wishlist-active.opened,.aq-compare-active.opened,.aq-cartmini-active.opened,.aq-filter-active.opened{visibility:visible;opacity:1}#vanilla-lightbox{position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:none;align-items:center;justify-content:center;padding:30px}#vanilla-lightbox.show{display:flex}.vl-content img{max-width:90vw;max-height:90vh}.vl-content iframe{width:80vw;height:80vh;border:0}.vl-close{position:absolute;right:25px;top:15px;background:none;border:0;color:#fff;font-size:40px;cursor:pointer}.swiper{overflow:hidden}.swiper-wrapper{display:flex}.swiper-slide{flex-shrink:0}.aq-menu-close{cursor:pointer}";
  document.head.appendChild(style);

  // Side panels / overlays
  const openMap={".aq-wishlist-btn":".aq-wishlist-active",".aq-compare-btn":".aq-compare-active",".aq-product-filter-btn":".aq-filter-active",".aq-cart-btn":".aq-cartmini-active",".aq-des-btn":".aq-offcanvas-des-active",".aq-additional-btn":".aq-offcanvas-additional-active",".aq-shiping-btn":".aq-offcanvas-shiping-active",".aq-review-btn":".aq-offcanvas-review-active",".aq-offcanvas-toggle":".aq-offcanvas-wrap",".aq-search-toggle":".aq-search-wrap"};
  document.addEventListener("click",e=>{
    for(const [trigger,target] of Object.entries(openMap)){if(e.target.closest(trigger)){add($(target),"opened");add($(".body-overlay"),"opened");return}}
    if(e.target.closest(".aq-wishlist-close,.aq-compare-close,.aq-cartmini-close,.aq-sidebar-close,.aq-offcanvas-close,.aq-search-close,.body-overlay")){$$(".opened").forEach(x=>{if(x.matches(".aq-wishlist-active,.aq-compare-active,.aq-cartmini-active,.aq-offcanvas-des-active,.aq-offcanvas-additional-active,.aq-offcanvas-shiping-active,.aq-offcanvas-review-active,.aq-filter-active,.aq-search-wrap,.aq-offcanvas-wrap,.body-overlay"))rem(x,"opened")})}
  });

  // Notes/coupon/shipping mini panels
  const noteMap={".aq-note-btn":".note-active",".aq-coupon-btn":".coupon-active",".aq-shipping-btn":".shipping-active"};
  document.addEventListener("click",e=>{for(const [a,b] of Object.entries(noteMap))if(e.target.closest(a)){add($(b),"opened")}if(e.target.closest(".btn-cancel"))[".note-active",".coupon-active",".shipping-active"].forEach(x=>rem($(x),"opened"))});

  // Remove item
  document.addEventListener("click",e=>{
    if(e.target.closest(".aq-remove")){e.preventDefault();e.target.closest(".item-delete")?.remove()}
    if(e.target.closest(".clear-all-file")){e.preventDefault();e.target.closest(".all-file-delete")?.querySelectorAll(".item-delete").forEach(x=>x.remove())}
  });

  // Password visibility
  $$(".password-show-toggle").forEach(btn=>btn.addEventListener("click",()=>{const p=btn.closest(".aq-login-input"),i=p?.querySelector(".aq_password");if(!i)return;i.type=i.type==="password"?"text":"password";p.querySelector(".open-eye")?.style.setProperty("display",i.type==="text"?"block":"none");p.querySelector(".close-eye")?.style.setProperty("display",i.type==="password"?"block":"none")}));

  // Copy buttons
  document.addEventListener("click",e=>{const btn=e.target.closest(".copy-btn");if(!btn||btn.classList.contains("copied"))return;const sp=btn.querySelector("span");if(!sp)return;navigator.clipboard?.writeText(sp.innerText).then(()=>{add(btn,"copied");const old=sp.innerText;sp.innerText="COPIED";setTimeout(()=>{rem(btn,"copied");sp.innerText=old},1500)})});
  // Share link
  const share=$(".aq-share-link-wrapper");share?.querySelector(".aq-share-copy-btn")?.addEventListener("click",()=>{const input=share.querySelector(".aq-share-input");input?.select();navigator.clipboard?.writeText(input.value);add(share,"active");setTimeout(()=>rem(share,"active"),2500)});

  // Product filter select
  $$(".aq-product-filter-select").forEach(t=>t.addEventListener("click",e=>{e.stopPropagation();const p=t.closest(".aq-product-filter-select-wrap"),c=p?.querySelector(".aq-product-filter-select-content");$$(".aq-product-filter-select").forEach(x=>x!==t&&rem(x,"active"));$$(".aq-product-filter-select-content").forEach(x=>x!==c&&rem(x,"show"));tog(t,"active");tog(c,"show")}));
  document.addEventListener("click",()=>{$$(".aq-product-filter-select").forEach(x=>rem(x,"active"));$$(".aq-product-filter-select-content").forEach(x=>rem(x,"show"))});

  $(".hide-button")?.addEventListener("click",()=>{const x=$(".aq-header-top-area");if(x)x.style.display="none"});

  // Live sales notification
  const sales=$(".product-details-live-sales-box");
  if(sales){const show=()=>{sales.style.display="block";setTimeout(()=>sales.style.display="none",4600)};setTimeout(show,3000);setInterval(show,10000);$(".product-details-live-sales-close")?.addEventListener("click",()=>sales.style.display="none")}

  // Expand/collapse text
  const text=$(".slide-text"),toggleBtn=$(".toggle-btn");
  if(text&&toggleBtn){const h=45;if(text.scrollHeight<=h)toggleBtn.style.display="none";text.style.height=h+"px";toggleBtn.addEventListener("click",()=>{const open=text.classList.toggle("active");text.style.height=open?text.scrollHeight+"px":h+"px";toggleBtn.textContent=open?"Read Less":"Read More.."})}

  // Viewer count
  const viewer=$("#viewerCount");if(viewer){let n=18+Math.floor(Math.random()*28);viewer.textContent=n;setInterval(()=>{n=Math.max(18,Math.min(45,n+Math.floor(Math.random()*7)-3));viewer.textContent=n},3000)}

  // Infinite/load-more product cloning
  $$(".aq-load-more-2").forEach(btn=>{let count=0;btn.addEventListener("click",()=>{if(count>=3)return;const c=btn.closest(".aq-product-container")||$(".aq-product-container");if(!c)return;const items=$$(".aq-product-item",c);for(let i=0;i<Math.max(1,Math.floor(c.clientWidth/(items[0]?.offsetWidth||250)));i++){const item=items[Math.floor(Math.random()*items.length)];if(item)c.appendChild(item.cloneNode(true))}count++;if(count>=3)btn.remove()})});
});
})();
