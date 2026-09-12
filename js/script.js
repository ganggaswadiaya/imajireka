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
      "hero.desc":"Imajireka hadir sebagai ruang kreatif yang mempertemukan proses belajar, layanan kreatif, dan produk merchandise dalam satu ekosistem.",
      "hero.btn1":"Jelajahi Imajireka <i class=\"fa-solid fa-arrow-right\"></i>","hero.btn2":"Kenal Lebih Dekat",
      "hero.note":"Imajinasi · Kreasi · Untuk Semua",
      "about.label":"Tentang Imajireka","about.title":"Lebih dari sekadar <span>perusahaan kreatif.</span>",
      "about.p1":"Imajireka adalah ekosistem kreatif yang dibangun untuk memberi ruang bagi ide untuk tumbuh. Kami menghubungkan tiga bagian yang saling melengkapi: belajar melalui Academy, mewujudkan kebutuhan kreatif melalui Studio, dan membawa karya lebih dekat melalui Merchandise.",
      "about.p2":"Dengan satu identitas, setiap bagian Imajireka memiliki peran yang berbeda namun bergerak menuju tujuan yang sama: membuat kreativitas lebih mudah dipelajari, digunakan, dan dinikmati.",
      "about.point1":"Belajar dan berkembang bersama <span class=\"about-point-accent\">Imajireka Academy</span>","about.point2":"Wujudkan ide kreatifmu di <span class=\"about-point-accent\">Imajireka Studio</span>","about.point3":"Bawa karyamu menjadi nyata di <span class=\"about-point-accent\">Imajireka Merchandise</span>",
      "eco.label":"Ekosistem Kami","eco.title":"Satu visi. <span>Tiga pilar.</span>",
      "eco.desc":"Tiga bagian Imajireka dirancang untuk menemani perjalanan kreatif dari proses belajar hingga karya yang bisa dinikmati.",
      "eco.kicker1":"Belajar","eco.kicker2":"Berkarya","eco.kicker3":"Pengalaman",
      "eco.p1":"Ruang belajar ilustrasi untuk mengembangkan kemampuan, memahami proses kreatif, dan membangun kepercayaan diri dalam berkarya.",
      "eco.p2":"Layanan kreatif untuk membantu menerjemahkan ide menjadi ilustrasi, visual, dan kebutuhan komunikasi yang lebih bermakna.",
      "eco.p3":"Produk merchandise yang membawa karakter dan karya Imajireka ke dalam benda-benda yang dekat dengan keseharian.",
      "eco.btn1":"Kenali Academy <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn2":"Kenali Studio <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn3":"Kenali Merchandise <i class=\"fa-solid fa-arrow-right\"></i>",
      "eco.line":"Belajar <b>→</b> Berkarya <b>→</b> Pengalaman",
      "work.label":"Sekilas tentang Imajireka","work.title":"Ide yang <span>menjadi karya.</span>",
      "work.desc":"Kreativitas Imajireka hadir dalam berbagai bentuk—dari proses belajar, eksplorasi visual, hingga karya yang dibawa ke kehidupan sehari-hari.",
      "work.cap1":"Eksplorasi Ilustrasi","work.cap2":"Proses Berkarya","work.cap3":"Ruang untuk Bertumbuh","work.cap4":"Setiap Ide Punya Cerita",
      "process.label":"Alur Kreatif Kami","process.title":"Dari ide menuju <span>impact.</span>",
      "process.desc":"Setiap perjalanan kreatif punya bentuk yang berbeda. Imajireka menjaganya tetap terarah, kolaboratif, dan relevan dengan tujuan.",
      "process.h1":"Temukan","process.h2":"Jelajahi","process.h3":"Ciptakan","process.h4":"Wujudkan",
      "process.p1":"Memahami ide, kebutuhan, tujuan, dan cerita di balik sebuah karya.","process.p2":"Mengeksplorasi konsep, referensi, gaya visual, dan berbagai kemungkinan.","process.p3":"Mengubah konsep menjadi karya melalui proses yang terukur dan kolaboratif.","process.p4":"Membawa hasil akhir menjadi sesuatu yang bisa digunakan, dipelajari, atau dinikmati.",
      "faq.label":"FAQ","faq.title":"Punya pertanyaan tentang <span>Imajireka?</span>","faq.desc":"Beberapa hal yang sering ingin diketahui sebelum mengenal lebih jauh ekosistem Imajireka.",
      "faq.q1":"Apa itu Imajireka?","faq.a1":"Imajireka adalah creative ecosystem yang menaungi Imajireka Academy, Imajireka Studio, dan Imajireka Merchandise.",
      "faq.q2":"Apa perbedaan Academy, Studio, dan Merchandise?","faq.a2":"Academy berfokus pada pembelajaran ilustrasi, Studio pada layanan kreatif, sedangkan Merchandise menghadirkan produk yang membawa karya Imajireka ke keseharian.",
      "faq.q3":"Apakah saya bisa bekerja sama dengan Imajireka?","faq.a3":"Tentu. Untuk kebutuhan kolaborasi, jasa kreatif, atau pertanyaan lainnya, silakan hubungi tim Imajireka melalui kontak yang tersedia.",
      "faq.q4":"Bagaimana cara menghubungi Imajireka?","faq.a4":"Kamu dapat menghubungi tim Imajireka melalui kanal komunikasi yang tercantum pada bagian kontak.",
      "contact.label":"Hubungi Kami","contact.title":"MARI TERHUBUNG<br><span>DENGAN KAMI</span>","contact.desc":"Temukan jawaban atas pertanyaan yang paling sering diajukan mengenai kelas, studio kreatif, dan<br class=\"contact-break\"> merchandise.","contact.btn":"Hubungi Kami Melalui Whatsapp <i class=\"fa-brands fa-whatsapp\"></i>",
      "footer.desc":"Imajireka adalah ruang kreatif yang menghubungkan belajar, berkarya, dan berkembang.","footer.explore":"Jelajahi","footer.about":"Tentang","footer.eco":"Ekosistem","footer.work":"Karya","footer.process":"Proses","footer.follow":"Ikuti Kami","footer.contact":"Kontak","footer.rights":"© 2026 Imajireka. All Rights Reserved.","footer.made":"Made with imagination."
    },
    en: {
      "nav.home":"Home","nav.about":"About","nav.eco":"Ecosystem","nav.work":"Work","nav.process":"Process","nav.faq":"FAQ","nav.cta":"Let's Talk",
      "hero.eyebrow":"Creative Ecosystem from Bali",
      "hero.title":"Create. <span>Learn.</span><br>Build your creative future.",
      "hero.desc":"Imajireka is a creative space connecting learning, creative services, and merchandise in one ecosystem.",
      "hero.btn1":"Explore Imajireka <i class=\"fa-solid fa-arrow-right\"></i>","hero.btn2":"Get to Know Us",
      "hero.note":"Imagination · Creation · For Everyone",
      "about.label":"About Imajireka","about.title":"More than just a <span>creative company.</span>",
      "about.p1":"Imajireka is a creative ecosystem built to give ideas room to grow. We connect three complementary parts: learning through Academy, bringing creative needs to life through Studio, and bringing creations closer through Merchandise.",
      "about.p2":"With one identity, each part of Imajireka has a different role while moving toward the same goal: making creativity easier to learn, use, and enjoy.",
      "about.point1":"Learn and grow with <span class=\"about-point-accent\">Imajireka Academy</span>","about.point2":"Bring your creative ideas to life at <span class=\"about-point-accent\">Imajireka Studio</span>","about.point3":"Turn your creations into reality with <span class=\"about-point-accent\">Imajireka Merchandise</span>",
      "eco.label":"Our Ecosystem","eco.title":"One vision. <span>Three pillars.</span>",
      "eco.desc":"Three parts of Imajireka are designed to accompany the creative journey from learning to creations that can be enjoyed.",
      "eco.kicker1":"Learn","eco.kicker2":"Create","eco.kicker3":"Experience",
      "eco.p1":"An illustration learning space to develop skills, understand the creative process, and build confidence in creating.",
      "eco.p2":"Creative services that help translate ideas into illustrations, visuals, and more meaningful communication needs.",
      "eco.p3":"Merchandise products that bring Imajireka's characters and creations into objects close to everyday life.",
      "eco.btn1":"Discover Academy <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn2":"Discover Studio <i class=\"fa-solid fa-arrow-right\"></i>","eco.btn3":"Discover Merchandise <i class=\"fa-solid fa-arrow-right\"></i>",
      "eco.line":"Learn <b>→</b> Create <b>→</b> Experience",
      "work.label":"A Glimpse of Imajireka","work.title":"Ideas that <span>become creations.</span>",
      "work.desc":"Imajireka's creativity takes many forms—from learning and visual exploration to creations brought into everyday life.",
      "work.cap1":"Illustration Exploration","work.cap2":"The Creative Process","work.cap3":"Room to Grow","work.cap4":"Every Idea Has a Story",
      "process.label":"Our Creative Flow","process.title":"From idea to <span>impact.</span>",
      "process.desc":"Every creative journey takes a different shape. Imajireka keeps it focused, collaborative, and relevant to the goal.",
      "process.h1":"Discover","process.h2":"Explore","process.h3":"Create","process.h4":"Deliver",
      "process.p1":"Understanding the idea, needs, goals, and story behind a creation.","process.p2":"Exploring concepts, references, visual styles, and different possibilities.","process.p3":"Turning concepts into creations through a structured and collaborative process.","process.p4":"Bringing the final result to life as something that can be used, learned from, or enjoyed.",
      "faq.label":"FAQ","faq.title":"Have questions about <span>Imajireka?</span>","faq.desc":"A few things people often want to know before getting to know the Imajireka ecosystem.",
      "faq.q1":"What is Imajireka?","faq.a1":"Imajireka is a creative ecosystem that brings together Imajireka Academy, Imajireka Studio, and Imajireka Merchandise.",
      "faq.q2":"What is the difference between Academy, Studio, and Merchandise?","faq.a2":"Academy focuses on illustration learning, Studio on creative services, while Merchandise brings Imajireka's creations into everyday products.",
      "faq.q3":"Can I collaborate with Imajireka?","faq.a3":"Absolutely. For collaborations, creative services, or other inquiries, please contact the Imajireka team through the available contact channels.",
      "faq.q4":"How can I contact Imajireka?","faq.a4":"You can contact the Imajireka team through the communication channels listed in the contact section.",
      "contact.label":"Contact Us","contact.title":"GET IN TOUCH<br><span>WITH US</span>","contact.desc":"Find answers to the most common questions about Imajireka classes, creative studio, and<br class=\"contact-break\"> merchandise.","contact.btn":"Message Us On WhatsApp <i class=\"fa-brands fa-whatsapp\"></i>",
      "footer.desc":"Imajireka is a creative space connecting learning, creating, and growing.","footer.explore":"Explore","footer.about":"About","footer.eco":"Ecosystem","footer.work":"Work","footer.process":"Process","footer.follow":"Follow Us","footer.contact":"Contact","footer.rights":"© 2026 Imajireka. All Rights Reserved.","footer.made":"Made with imagination."
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
