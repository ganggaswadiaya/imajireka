document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const nav=document.querySelector('.navbar-link');
  const toggle=document.querySelector('.nav-toggle');
  const links=[...document.querySelectorAll('.navbar-link a')];

  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>20);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
  });
  links.forEach(link=>link.addEventListener('click',()=>{
    links.forEach(item=>item.classList.remove('active')); link.classList.add('active');
    nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false');
    if(toggle) toggle.innerHTML='<i class="fa-solid fa-bars"></i>';
  }));

  const sections=[...document.querySelectorAll('main section[id]')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const id=entry.target.id;
      const active=document.querySelector(`.navbar-link a[href="#${id}"]`);
      if(active){links.forEach(l=>l.classList.remove('active'));active.classList.add('active');}
    });
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(section=>observer.observe(section));

  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  /* Work lightbox — klik karya untuk tampil full */
  const workItems=[...document.querySelectorAll('.work-item')];
  const lightbox=document.querySelector('#workLightbox');
  const lightboxImg=document.querySelector('#workLightboxImage');
  const lightboxTag=document.querySelector('#workLightboxTag');
  const lightboxTitle=document.querySelector('#workLightboxTitle');
  const lightboxCounter=document.querySelector('#workLightboxCounter');
  const closeBtn=document.querySelector('.work-lightbox-close');
  const prevBtn=document.querySelector('.work-lightbox-prev');
  const nextBtn=document.querySelector('.work-lightbox-next');
  let currentWork=0;
  let lastFocused=null;

  const getWorkData=index=>{
    const item=workItems[index];
    if(!item) return null;
    const img=item.querySelector('img');
    const tag=item.querySelector('figcaption span');
    const title=item.querySelector('figcaption strong');
    return {
      src:img?.getAttribute('src')||'',
      alt:img?.getAttribute('alt')||title?.textContent.trim()||'Karya Imajireka',
      tag:tag?.textContent.trim()||'',
      title:title?.textContent.trim()||''
    };
  };

  const renderWork=index=>{
    const data=getWorkData(index);
    if(!data||!lightboxImg) return;
    currentWork=(index+workItems.length)%workItems.length;
    lightboxImg.src=data.src;
    lightboxImg.alt=data.alt;
    if(lightboxTag) lightboxTag.textContent=data.tag;
    if(lightboxTitle) lightboxTitle.textContent=data.title;
    if(lightboxCounter) lightboxCounter.textContent=`${currentWork+1} / ${workItems.length}`;
  };

  const openLightbox=index=>{
    if(!lightbox||!workItems.length) return;
    lastFocused=document.activeElement;
    renderWork(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    closeBtn?.focus({preventScroll:true});
  };

  const closeLightbox=()=>{
    if(!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(lastFocused&&document.contains(lastFocused)) lastFocused.focus({preventScroll:true});
  };

  workItems.forEach((item,index)=>{
    item.addEventListener('click',()=>openLightbox(index));
    item.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        openLightbox(index);
      }
    });
  });
  closeBtn?.addEventListener('click',closeLightbox);
  prevBtn?.addEventListener('click',event=>{event.stopPropagation();renderWork(currentWork-1);});
  nextBtn?.addEventListener('click',event=>{event.stopPropagation();renderWork(currentWork+1);});
  lightbox?.querySelector('[data-lightbox-close]')?.addEventListener('click',closeLightbox);
  document.addEventListener('keydown',event=>{
    if(!lightbox?.classList.contains('open')) return;
    if(event.key==='Escape') closeLightbox();
    if(event.key==='ArrowLeft') renderWork(currentWork-1);
    if(event.key==='ArrowRight') renderWork(currentWork+1);
  });
});


/* =========================================================
   IMAJIREKA BILINGUAL SWITCHER
========================================================= */
(() => {
  const switcher = document.querySelector("#languageSwitcher");
  const toggle = document.querySelector("#languageToggle");
  const menu = document.querySelector("#languageMenu");
  const currentFlag = document.querySelector("#currentLanguageFlag");
  const options = [...document.querySelectorAll(".language-option")];

  if (!switcher || !toggle || !menu) return;

  // On mobile, place the existing language switcher inside the hamburger menu.
  // On desktop, restore it to its original navbar position.
  const originalParent = switcher.parentElement;
  const originalNextSibling = switcher.nextElementSibling;
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  function syncLanguagePlacement() {
    if (mobileQuery.matches) {
      const mobileMenu = document.querySelector("#mainNav");
      if (mobileMenu && switcher.parentElement !== mobileMenu) {
        mobileMenu.appendChild(switcher);
      }
    } else if (originalParent && switcher.parentElement !== originalParent) {
      if (originalNextSibling && originalNextSibling.parentElement === originalParent) {
        originalParent.insertBefore(switcher, originalNextSibling);
      } else {
        originalParent.appendChild(switcher);
      }
    }
  }

  syncLanguagePlacement();
  mobileQuery.addEventListener?.("change", syncLanguagePlacement);

  const translations = {
    id: {
      "nav.home":"Beranda","nav.about":"Tentang","nav.eco":"Ekosistem","nav.work":"Karya","nav.process":"Proses","nav.faq":"FAQ","nav.cta":"Mari Bicara",
      "hero.eyebrow":"Ekosistem Kreatif dari Bali",
      "hero.title":"Ruang untuk <span>imajinasi,</span><br>tempat ide jadi karya.",
      "hero.desc":"Imajireka adalah ekosistem kreatif dengan tiga layanan: Academy untuk belajar ilustrasi, Studio untuk pesan karya custom, dan Merchandise untuk produk ilustrasi siap pakai.",
      "hero.btn1":"Jelajahi Imajireka <i class=\"fa-solid fa-arrow-right\"></i>","hero.btn2":"Kenal Lebih Dekat",
      "hero.note":"Imajinasi · Kreasi · Untuk Semua",
      "about.label":"Tentang Imajireka","about.title":"Satu tempat untuk <span>belajar, berkarya, dan memiliki.</span>",
      "about.p1":"Imajireka adalah ekosistem kreatif dari Bali. Kamu bisa belajar ilustrasi di Academy, pesan ilustrasi custom di Studio, dan beli produk ilustrasi di Merchandise.",
      "about.p2":"Tiga layanan, satu tujuan: membuat kreativitas mudah dimulai, mudah dipakai, dan mudah dinikmati siapa pun.",
      "about.point1":"Belajar ilustrasi dari dasar di <span class=\"about-point-accent\">Imajireka Academy</span>","about.point2":"Pesan ilustrasi custom sesuai kebutuhan di <span class=\"about-point-accent\">Imajireka Studio</span>","about.point3":"Beli produk ilustrasi original di <span class=\"about-point-accent\">Imajireka Merchandise</span>",
      "eco.label":"Ekosistem Kami","eco.title":"Satu visi. <span>Tiga layanan.</span>",
      "eco.desc":"Pilih sesuai kebutuhanmu: mau belajar, mau pesan karya, atau mau beli produk jadi.",
      "eco.kicker1":"Belajar","eco.kicker2":"Custom","eco.kicker3":"Produk",
      "eco.p1":"Kelas ilustrasi online dan offline, dari dasar sampai mahir. Untuk pemula yang ingin bisa menggambar dengan terarah.",
      "eco.p2":"Jasa ilustrasi custom untuk buku, brand, kemasan, dan kebutuhan visual lain. Sampaikan idemu, kami gambar wujudnya.",
      "eco.p3":"Stiker, print, apparel, dan produk lain dengan karakter original Imajireka. Siap dibeli dan dipakai sehari-hari.",
      "eco.btn1":"Kenali Academy <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn2":"Kenali Studio <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn3":"Kenali Merchandise <i class=\"fa-solid fa-arrow-right\"></i>",
      "eco.line":"Belajar <b>→</b> Berkarya <b>→</b> Menikmati",
      "work.label":"Galeri Karya","work.title":"Lihat <span>hasil karya kami.</span>",
      "work.desc":"Dari suasana kelas, proses menggambar, sampai produk jadi. Semua dikerjakan langsung oleh tim Imajireka.",
      "work.cap1":"Suasana Kelas Academy","work.cap2":"Produk Merchandise","work.cap3":"Praktik Menggambar","work.cap4":"Hasil Karya Studio",
      "process.label":"Cara Kerja Kami","process.title":"Empat langkah <span>yang jelas.</span>",
      "process.desc":"Alur yang sama kami pakai untuk kelas maupun proyek, supaya prosesnya transparan dan hasilnya tepat.",
      "process.h1":"Ceritakan","process.h2":"Rancang","process.h3":"Kerjakan","process.h4":"Siap Pakai",
      "process.p1":"Sampaikan kebutuhan, tujuan, dan referensimu. Kami pastikan arahnya jelas sejak awal.","process.p2":"Kami buatkan pilihan konsep dan gaya visual untuk kamu pilih dan revisi.","process.p3":"Konsep terpilih kami kerjakan sampai selesai, dengan update rutin dari tim.","process.p4":"Kamu terima hasil akhir yang siap dipakai, dicetak, atau dipublikasikan.",
      "faq.label":"FAQ","faq.title":"Yang sering <span>ditanyakan.</span>","faq.desc":"Jawaban cepat sebelum kamu menghubungi kami.",
      "faq.q1":"Apa itu Imajireka?","faq.a1":"Ekosistem kreatif dari Bali dengan tiga layanan: Academy untuk belajar ilustrasi, Studio untuk jasa ilustrasi custom, dan Merchandise untuk produk ilustrasi.",
      "faq.q2":"Apa bedanya Academy, Studio, dan Merchandise?","faq.a2":"Academy untuk belajar. Studio untuk pesan karya custom. Merchandise untuk beli produk jadi.",
      "faq.q3":"Apakah bisa kerja sama dengan Imajireka?","faq.a3":"Bisa. Kami terbuka untuk proyek ilustrasi, kolaborasi brand, dan kemitraan. Hubungi kami lewat WhatsApp di bagian Kontak.",
      "faq.q4":"Bagaimana cara menghubungi Imajireka?","faq.a4":"Klik tombol WhatsApp di bagian Kontak bawah. Tim kami akan membalas di jam kerja.",
      "contact.label":"Hubungi Kami","contact.title":"MARI TERHUBUNG<br><span>DENGAN KAMI</span>","contact.desc":"Punya ide, pertanyaan, atau kebutuhan khusus? Ceritakan lewat WhatsApp — kami bantu carikan solusi terbaik.","contact.btn":"Hubungi Kami via WhatsApp <i class=\"fa-brands fa-whatsapp\"></i>",
      "footer.desc":"Ekosistem kreatif dari Bali untuk belajar ilustrasi, pesan jasa kreatif, dan beli merchandise.","footer.explore":"Jelajahi","footer.about":"Tentang","footer.eco":"Ekosistem","footer.work":"Karya","footer.process":"Proses","footer.follow":"Ikuti Kami","footer.contact":"Kontak","footer.rights":"© 2026 Imajireka. All Rights Reserved.","footer.made":"Made with imagination."
    },
    en: {
      "nav.home":"Home","nav.about":"About","nav.eco":"Ecosystem","nav.work":"Work","nav.process":"Process","nav.faq":"FAQ","nav.cta":"Let's Talk",
      "hero.eyebrow":"Creative Ecosystem from Bali",
      "hero.title":"A space for <span>imagination,</span><br>where ideas become works.",
      "hero.desc":"Imajireka is a creative ecosystem with three services: Academy to learn illustration, Studio to order custom work, and Merchandise for ready-to-use illustrated products.",
      "hero.btn1":"Explore Imajireka <i class=\"fa-solid fa-arrow-right\"></i>","hero.btn2":"Get to Know Us",
      "hero.note":"Imagination · Creation · For Everyone",
      "about.label":"About Imajireka","about.title":"One place to <span>learn, create, and own.</span>",
      "about.p1":"Imajireka is a creative ecosystem from Bali. Learn illustration at the Academy, order custom illustration at the Studio, and buy illustrated products at Merchandise.",
      "about.p2":"Three services, one goal: make creativity easy to start, easy to use, and easy to enjoy for everyone.",
      "about.point1":"Learn illustration from the basics at <span class=\"about-point-accent\">Imajireka Academy</span>","about.point2":"Order custom illustration for your needs at <span class=\"about-point-accent\">Imajireka Studio</span>","about.point3":"Buy original illustrated products at <span class=\"about-point-accent\">Imajireka Merchandise</span>",
      "eco.label":"Our Ecosystem","eco.title":"One vision. <span>Three services.</span>",
      "eco.desc":"Choose what you need: learn, order custom work, or buy finished products.",
      "eco.kicker1":"Learn","eco.kicker2":"Custom","eco.kicker3":"Products",
      "eco.p1":"Online and offline illustration classes, from beginner to advanced. For anyone who wants to draw with clear direction.",
      "eco.p2":"Custom illustration services for books, brands, packaging, and other visual needs. Tell us your idea, we draw it.",
      "eco.p3":"Stickers, prints, apparel, and other products with original Imajireka characters. Ready to buy and use daily.",
      "eco.btn1":"Discover Academy <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn2":"Discover Studio <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn3":"Discover Merchandise <i class=\"fa-solid fa-arrow-right\"></i>",
      "eco.line":"Learn <b>→</b> Create <b>→</b> Enjoy",
      "work.label":"Our Work","work.title":"See <span>what we make.</span>",
      "work.desc":"From classroom atmosphere, drawing process, to finished products. All made directly by the Imajireka team.",
      "work.cap1":"Academy Class Atmosphere","work.cap2":"Merchandise Products","work.cap3":"Drawing Practice","work.cap4":"Studio Client Work",
      "process.label":"How We Work","process.title":"Four <span>clear steps.</span>",
      "process.desc":"The same flow we use for classes and projects, so the process is transparent and the result hits the goal.",
      "process.h1":"Tell Us","process.h2":"Design","process.h3":"Produce","process.h4":"Ready to Use",
      "process.p1":"Share your needs, goals, and references. We make sure the direction is clear from the start.","process.p2":"We create concept and style options for you to choose and revise.","process.p3":"We finish the chosen concept with regular updates from the team.","process.p4":"You receive the final result ready to use, print, or publish.",
      "faq.label":"FAQ","faq.title":"Frequently <span>asked questions.</span>","faq.desc":"Quick answers before you contact us.",
      "faq.q1":"What is Imajireka?","faq.a1":"A creative ecosystem from Bali with three services: Academy for learning illustration, Studio for custom illustration services, and Merchandise for illustrated products.",
      "faq.q2":"What is the difference between Academy, Studio, and Merchandise?","faq.a2":"Academy is for learning. Studio is for ordering custom work. Merchandise is for buying finished products.",
      "faq.q3":"Can I collaborate with Imajireka?","faq.a3":"Yes. We are open for illustration projects, brand collaborations, and partnerships. Contact us via WhatsApp in the Contact section.",
      "faq.q4":"How can I contact Imajireka?","faq.a4":"Click the WhatsApp button in the Contact section below. Our team will reply during working hours.",
      "contact.label":"Contact Us","contact.title":"GET IN TOUCH<br><span>WITH US</span>","contact.desc":"Have an idea, question, or specific need? Tell us via WhatsApp — we will help find the best solution.","contact.btn":"Message Us on WhatsApp <i class=\"fa-brands fa-whatsapp\"></i>",
      "footer.desc":"A creative ecosystem from Bali to learn illustration, order creative services, and buy merchandise.","footer.explore":"Explore","footer.about":"About","footer.eco":"Ecosystem","footer.work":"Work","footer.process":"Process","footer.follow":"Follow Us","footer.contact":"Contact","footer.rights":"© 2026 Imajireka. All Rights Reserved.","footer.made":"Made with imagination."
    }
  };

  const setHTML = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  };
  const setAll = (selector, values) => {
    document.querySelectorAll(selector).forEach((el,i) => {
      if (values[i] !== undefined) el.innerHTML = values[i];
    });
  };

  function applyLanguage(lang) {
    const t = translations[lang];
    const map = {
      ".navbar-link a:nth-child(1)": "nav.home",
    };
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Elements kept selector-based so the existing design/layout remains untouched.
    setHTML(".hero h1",t["hero.title"]); setHTML(".hero-copy > p",t["hero.desc"]);
    setHTML(".hero-actions .btn-primary",t["hero.btn1"]); setHTML(".hero-actions .btn-secondary",t["hero.btn2"]);
    setHTML(".hero-note",'<span></span> '+t["hero.note"]); setHTML(".hero-copy .eyebrow",'<i class="fa-solid fa-sparkles"></i> '+t["hero.eyebrow"]);
    setHTML(".about-copy .section-label",t["about.label"]); setHTML(".about-copy h2",t["about.title"]);
    setAll(".about-copy > p",[t["about.p1"],t["about.p2"]]); setAll(".about-points div span",[t["about.point1"],t["about.point2"],t["about.point3"]]);
    setHTML(".ecosystem-section .section-label",t["eco.label"]); setHTML(".ecosystem-section .section-heading h2",t["eco.title"]); setHTML(".ecosystem-section .section-heading > p",t["eco.desc"]);
    setAll(".ecosystem-card .card-kicker",[t["eco.kicker1"],t["eco.kicker2"],t["eco.kicker3"]]); setAll(".ecosystem-card p",[t["eco.p1"],t["eco.p2"],t["eco.p3"]]);
    setAll(".ecosystem-card a",[t["eco.btn1"],t["eco.btn2"],t["eco.btn3"]]); setHTML(".ecosystem-line p",t["eco.line"]);
    setHTML(".work-heading .section-label",t["work.label"]); setHTML(".work-heading h2",t["work.title"]); setHTML(".work-heading > p",t["work.desc"]);
    setAll(".work-item figcaption strong",[t["work.cap1"],t["work.cap2"],t["work.cap3"],t["work.cap4"]]);
    setHTML(".process-section .section-label",t["process.label"]); setHTML(".process-section .section-heading h2",t["process.title"]); setHTML(".process-section .section-heading > p",t["process.desc"]);
    setAll(".process-card h3",[t["process.h1"],t["process.h2"],t["process.h3"],t["process.h4"]]); setAll(".process-card p",[t["process.p1"],t["process.p2"],t["process.p3"],t["process.p4"]]);
    setHTML(".faq-intro .section-label",t["faq.label"]); setHTML(".faq-intro h2",t["faq.title"]); setHTML(".faq-intro > p",t["faq.desc"]);
    setAll(".faq-list summary",[t["faq.q1"]+'<i class="fa-solid fa-plus"></i>',t["faq.q2"]+'<i class="fa-solid fa-plus"></i>',t["faq.q3"]+'<i class="fa-solid fa-plus"></i>',t["faq.q4"]+'<i class="fa-solid fa-plus"></i>']);
    setAll(".faq-list details p",[t["faq.a1"],t["faq.a2"],t["faq.a3"],t["faq.a4"]]);
    setHTML(".contact-inner .section-label",t["contact.label"]); setHTML(".contact-inner h2",t["contact.title"]); setHTML(".contact-inner > p",t["contact.desc"]); setHTML(".contact-button",t["contact.btn"]);
    setHTML(".footer-brand > p",t["footer.desc"]); setAll(".footer-links h4",[t["footer.explore"],t["footer.eco"],t["footer.follow"]]);
    const footerLinks=document.querySelectorAll(".footer-links");
    if(footerLinks[0]) setAll(".footer-links:first-child a",[t["footer.about"],t["footer.eco"],t["footer.work"],t["footer.process"]]);
    if(footerLinks[2]) footerLinks[2].querySelector("a:last-child").textContent=t["footer.contact"];
    setAll(".footer-bottom span",[t["footer.rights"],t["footer.made"]]);
    setHTML(".nav-cta",t["nav.cta"]+' <i class="fa-solid fa-arrow-right" style="margin-left: 0.4rem"></i>');

    currentFlag.src = lang === "id" ? "assets/flags/indonesia.svg" : "assets/flags/england.svg";
    options.forEach(o => o.classList.toggle("active",o.dataset.lang===lang));
    document.documentElement.lang = lang;
    localStorage.setItem("imajireka-language",lang);
  }

  const saved = localStorage.getItem("imajireka-language") || "id";
  applyLanguage(saved);

  toggle.addEventListener("click",(e)=>{
    e.stopPropagation();
    const open = switcher.classList.toggle("open");
    toggle.setAttribute("aria-expanded",String(open));
  });
  options.forEach(option => option.addEventListener("click",()=>{
    applyLanguage(option.dataset.lang);
    switcher.classList.remove("open");
    toggle.setAttribute("aria-expanded","false");
  }));
  document.addEventListener("click",(e)=>{
    if (!switcher.contains(e.target)) {
      switcher.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
    }
  });
  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){switcher.classList.remove("open");toggle.setAttribute("aria-expanded","false");}
  });
})();
