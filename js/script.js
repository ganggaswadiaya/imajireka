/* =========================================================
   STICKY / GLASS NAVBAR
   Navbar tetap di atas halaman dan berubah menjadi glass blur
   ketika user mulai melakukan scroll.
========================================================= */

const initNavbar = () => {

    const header = document.querySelector("header");

    if (!header) return;

    const updateNavbar = () => {
        header.classList.toggle("navbar-scrolled", window.scrollY > 20);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavbar);
} else {
    initNavbar();
}

/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        /* Tutup semua FAQ */

        faqItems.forEach((faq) => {

            faq.classList.remove("active");

            faq.querySelector(".faq-icon").textContent = "+";

        });


        /* Buka FAQ yang dipilih */

        if (!isActive) {

            item.classList.add("active");

            icon.textContent = "−";

        }

    });

});

/* =========================================================
   SCROLL REVEAL
   Konten akan muncul saat masuk ke viewport.
========================================================= */

const initScrollReveal = () => {

    const revealGroups = [
        /* Hero & About */
        ["#hero .left-bar > *", "#hero .right-bar"],
        ["#about .about-images", "#about .about-content > *"],

        /* Services */
        ["#services .services-header > *", "#services .service-card"],

        /* Portfolio */
        ["#portfolio .portfolio-header > *", "#portfolio .portfolio-filter > *", "#portfolio .portfolio-item", "#portfolio .portfolio-button-wrapper"],

        /* Why Choose Us */
        ["#why .why-heading > *", "#why .solar-system", "#why .why-card"],

        /* Creative Process */
        ["#process .process-header > *", "#process .process-step"],

        /* Testimonial */
        ["#testimonial .testimonial-header > *", "#testimonial .testimonial-card"],

        /* FAQ */
        ["#faq .faq-header > *", "#faq .faq-list .faq-item", "#faq .faq-visual"],

        /* Contact */
        ["#contact .contact-info > *", "#contact .contact-form > *", "#contact .contact-map"]
    ];

    const elements = new Set();

    revealGroups.forEach((selectors) => {
        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                elements.add(element);
            });
        });
    });

    elements.forEach((element) => {
        element.classList.add("scroll-reveal");
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    });

    elements.forEach((element) => observer.observe(element));
};


/* Jalankan setelah seluruh HTML selesai dimuat */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveal);
} else {
    initScrollReveal();
}


/* =========================================================
   WHY CHOOSE US SLIDER
   Kartu digeser dengan swipe (touch), tombol prev/next,
   atau dot indicator. Tombol & dot otomatis disembunyikan
   kalau semua kartu sudah muat tanpa perlu digeser
   (misalnya di layar desktop yang lebar).
========================================================= */

const initWhySlider = () => {

    const slider = document.getElementById("whySlider");
    const prevBtn = document.getElementById("whySliderPrev");
    const nextBtn = document.getElementById("whySliderNext");
    const dotsContainer = document.getElementById("whySliderDots");

    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = Array.from(slider.querySelectorAll(".why-card"));

    if (!cards.length) return;

    /* Buat dot sejumlah kartu */
    dotsContainer.innerHTML = "";

    const dots = cards.map((_, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "why-slider-dot";
        dot.setAttribute("aria-label", `Ke kartu ${index + 1}`);

        dot.addEventListener("click", () => {
            cards[index].scrollIntoView({
                behavior: "smooth",
                inline: "start",
                block: "nearest",
            });
        });

        dotsContainer.appendChild(dot);

        return dot;
    });

    /* Cari index kartu yang paling dekat dengan posisi scroll saat ini */
    const getActiveIndex = () => {
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const distance = Math.abs(card.offsetLeft - slider.scrollLeft);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    };

    const updateSlider = () => {
        const hasOverflow = slider.scrollWidth - slider.clientWidth > 4;

        prevBtn.classList.toggle("is-hidden", !hasOverflow);
        nextBtn.classList.toggle("is-hidden", !hasOverflow);
        dotsContainer.classList.toggle("is-hidden", !hasOverflow);

        if (!hasOverflow) return;

        const maxScroll = slider.scrollWidth - slider.clientWidth;

        prevBtn.disabled = slider.scrollLeft <= 4;
        nextBtn.disabled = slider.scrollLeft >= maxScroll - 4;

        const activeIndex = getActiveIndex();

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    };

    const goToStep = (direction) => {
        const nextIndex = getActiveIndex() + direction;
        const target = cards[Math.min(cards.length - 1, Math.max(0, nextIndex))];

        target.scrollIntoView({
            behavior: "smooth",
            inline: "start",
            block: "nearest",
        });
    };

    prevBtn.addEventListener("click", () => goToStep(-1));
    nextBtn.addEventListener("click", () => goToStep(1));

    let scrollTimeout;

    slider.addEventListener(
        "scroll",
        () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateSlider, 80);
        },
        { passive: true }
    );

    window.addEventListener("resize", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateSlider, 80);
    });

    updateSlider();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhySlider);
} else {
    initWhySlider();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const initMobileNavigation = () => {

    const header = document.querySelector("header");
    const toggle = document.querySelector(".nav-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");

    if (!header || !toggle || !mobileMenu) return;

    const closeMenu = () => {
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
    };

    toggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("menu-open");

        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!header.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNavigation);
} else {
    initMobileNavigation();
}


/* =========================================================
   BILINGUAL LANGUAGE SWITCHER
   Default language: Bahasa Indonesia
   The selected language is saved in localStorage.
========================================================= */

const initLanguageSwitcher = () => {
    const dropdowns = document.querySelectorAll(".language-dropdown");
    const options = document.querySelectorAll(".language-option");
    const currentButtons = document.querySelectorAll(".language-current");
    if (!dropdowns.length || !options.length) return;

    const translations = {
        id: {
            nav: ["Beranda", "Tentang", "Layanan", "Portofolio", "Testimoni", "Kontak"],
            letsTalk: "Mari Bicara",
            heroTag: "✨ Ekosistem Kreatif dari Bali",
            heroTitle: "Ciptakan. Pelajari.<br>Bangun <span>Masa Depan Kreatifmu</span>",
            heroText: "Imajireka adalah ekosistem kreatif yang menghubungkan pendidikan ilustrasi, branding profesional, dan merchandise kreatif dalam satu tempat.",
            heroBtn1: "Jelajahi Ekosistem Kami",
            heroBtn2: "Mari Berkolaborasi",

            aboutTag: "Tentang Kami",
            aboutTitle: "Lebih dari Sekadar <span>Kreatif</span><br><span>Company.</span>",
            aboutText: "Imajireka adalah ekosistem kreatif yang menghubungkan pendidikan ilustrasi, branding profesional, dan merchandise kreatif dalam satu tempat.",
            aboutBtn: "Jelajahi Ekosistem Kami",

            ecosystemTag: "Ekosistem Kami",
            ecosystemTitle: "Tiga Layanan. Satu<br><span>Perjalanan Kreatif.</span>",
            ecosystemText: "Kami membangun ekosistem kreatif yang menghubungkan belajar, berkarya, dan berkembang.",
            serviceText: "Kami membangun ekosistem kreatif yang menghubungkan belajar, berkarya, dan berkembang.",
            serviceBtns: ["Jelajahi Academy →", "Jelajahi Studio →", "Jelajahi Merchandise →"],

            portfolioTag: "Karya Unggulan Kami",
            portfolioTitle: "Kreativitas yang Bisa<br><span>Kamu Lihat.</span>",
            portfolioText: "Kami percaya karya adalah bukti terbaik dari kualitas.",
            portfolioFilters: ["Semua", "Academy", "Studio", "Merchandise"],
            portfolioOverlays: [
                ["Academy", "Ilustrasi<br>Dibuat oleh Mentor"],
                ["Studio", "Ilustrasi<br>Proyek Kreatif"],
                ["Merchandise", "Branding<br>Produk Kreatif"],
                ["Merchandise", "Desain Produk<br>Proyek Kreatif"],
                ["Studio", "Ilustrasi<br>Proyek Kreatif"],
                ["Merchandise", "Desain Produk<br>Proyek Kreatif"]
            ],
            portfolioBtn: "Lihat Semua Karya Unggulan →",

            whyTag: "Mengapa Memilih Kami",
            whyTitle: "Lebih dari Sekadar Belajar,<br><span>Kami Membangun Talenta Kreatif.</span>",
            whyText: "Kami percaya kreativitas berkembang melalui pengalaman, kolaborasi, dan bimbingan dari mentor profesional.",
            /* Urutan & jumlah data di bawah harus sama persis dengan
               jumlah elemen .why-card yang AKTIF (tidak di-comment)
               di index.html, karena teks diterapkan berdasarkan urutan. */
            whyCards: [
                ["Mentor Profesional", "Belajar langsung dari mentor yang aktif berkarya di industri kreatif.", "10+ Mentor Profesional"],
                ["Learning by Doing", "Praktik langsung melalui proyek dan studi kasus nyata.", "80% Sesi Berbasis Praktik"],
                ["Pertumbuhan Berkelanjutan", "Terus berkembang melalui pengalaman, feedback, dan eksplorasi kreatif.", "Terus Berkarya"]
            ],

            processTag: "Proses Kreatif Kami",
            processTitle: "Dari Ide menjadi <span>Dampak</span>",
            processText: "Kami percaya bahwa setiap karya hebat dimulai dari proses yang terarah, kolaboratif, dan menyenangkan.",
            processSteps: [
                ["Discover", "Kami memulai dengan memahami tujuan, kebutuhan, dan ide yang ingin diwujudkan."],
                ["Create", "Ide dikembangkan menjadi konsep kreatif melalui eksplorasi, ilustrasi, dan desain."],
                ["Refine", "Setiap hasil melalui proses revisi dan penyempurnaan agar sesuai dengan standar kualitas."],
                ["Deliver", "Karya akhir dipublikasikan, dipresentasikan, atau digunakan sesuai kebutuhan pengguna maupun klien."]
            ],

            testimonialTag: "PERJALANAN KREATIF KAMI",
            testimonialTitle: "Cerita dari Perjalanan<br><span>Kreatif Kami</span>",
            testimonialText: "Kami bangga menjadi bagian dari perjalanan kreatif para siswa, partner, dan klien kami.",
            testimonialRoles: "Siswa",
            testimonialQuotes: [
                "\"Belajar di Imajireka membuat saya lebih percaya diri dalam membuat ilustrasi digital.\"",
                "\"Mentornya sangat membantu dan cara belajarnya membuat saya lebih berani mengeksplorasi ide.\"",
                "\"Saya mendapatkan pengalaman baru dan portofolio yang jauh lebih siap untuk dunia kerja.\"",
                "\"Proses pembelajarannya menyenangkan dan sangat membantu saya mengembangkan skill.\"",
                "\"Bukan hanya belajar teknik, tetapi juga belajar bagaimana mengembangkan ide menjadi karya.\""
            ],

            faqTag: "FAQ",
            faqTitle: "PERTANYAAN YANG SERING DIAJUKAN",
            faqText: "Temukan jawaban dari pertanyaan yang paling sering diajukan mengenai kelas, studio kreatif, maupun merchandise Imajireka.",
            faqQuestions: [
                "Apakah kelas di Imajireka cocok untuk pemula?",
                "Apakah tersedia kelas online?",
                "Apakah saya akan mendapatkan sertifikat?",
                "Bagaimana cara membeli merchandise?",
                "Bagaimana cara menghubungi tim Imajireka?"
            ],
            faqAnswers: [
                "Tentu. Seluruh program dirancang agar dapat diikuti oleh pemula maupun peserta yang ingin meningkatkan kemampuan ilustrasi dan desain.",
                "Untuk informasi mengenai kelas online yang sedang tersedia, silakan hubungi tim Imajireka melalui kontak yang tersedia.",
                "Peserta dapat memperoleh sertifikat sesuai dengan program kelas yang diikuti.",
                "Merchandise Imajireka dapat dibeli melalui kanal resmi Imajireka.",
                "Kamu dapat menghubungi tim Imajireka melalui WhatsApp, Instagram, atau kontak yang tersedia."
            ],

            contactTag: "FAQ",
            contactTitle: "GET IN TOUCH<br><span>WITH US</span>",
            contactText: "Temukan jawaban dari pertanyaan yang paling sering diajukan mengenai kelas, studio kreatif, maupun merchandise Imajireka.",
            contactButton: "Message Us On WhatsApp",

            footerTitle: "Ready to Create Something<br>Amazing?",
            footerText: "Mari wujudkan ide kreatifmu bersama Imajireka. Belajar, berkarya, dan berkembang dalam satu ekosistem.",
            footerBtn: "Let's Talk",
            footerCompanyTitle: "Company",
            footerServicesTitle: "Services",
            footerContactTitle: "Contact",
            footerFollowTitle: "Follow Us",
            footerFindTitle: "Find Us",
            footerCompany: ["About", "Portfolio", "Testimonial", "FAQ"],
            footerServices: ["Academy", "Studio", "Merch"],
            footerContact: ["Email", "WhatsApp", "Address"],
            footerSocial: ["Instagram", "Behance", "LinkedIn"]
        },

        en: {
            nav: ["Home", "About", "Service", "Portfolio", "Testimonial", "Contact"],
            letsTalk: "Let's Talk",
            heroTag: "✨ Creative Ecosystem from Bali",
            heroTitle: "Create. Learn.<br>Build Your <span>Creative Future</span>",
            heroText: "Imajireka is a creative ecosystem connecting illustration education, professional branding, and creative merchandise in one place.",
            heroBtn1: "Explore Our Ecosystem",
            heroBtn2: "Let's Collaborate",

            aboutTag: "About Us",
            aboutTitle: "More Than a <span>Creative</span><br><span>Company.</span>",
            aboutText: "Imajireka is a creative ecosystem connecting illustration education, professional branding, and creative merchandise in one place.",
            aboutBtn: "Explore Our Ecosystem",

            ecosystemTag: "Our Ecosystem",
            ecosystemTitle: "Three Services. One<br><span>Creative Journey.</span>",
            ecosystemText: "We build a creative ecosystem that connects learning, creating, and growing.",
            serviceText: "We build a creative ecosystem that connects learning, creating, and growing.",
            serviceBtns: ["Explore Academy →", "Explore Studio →", "Explore Merchandise →"],

            portfolioTag: "Our Featured Work",
            portfolioTitle: "Creativity You Can<br><span>See.</span>",
            portfolioText: "We believe great work is the best proof of quality.",
            portfolioFilters: ["All", "Academy", "Studio", "Merchandise"],
            portfolioOverlays: [
                ["Academy", "Illustration<br>Created by Mentor"],
                ["Studio", "Illustration<br>Creative Project"],
                ["Merchandise", "Branding<br>Creative Product"],
                ["Merchandise", "Product Design<br>Creative Project"],
                ["Studio", "Illustration<br>Creative Project"],
                ["Merchandise", "Product Design<br>Creative Project"]
            ],
            portfolioBtn: "View All Featured Work →",

            whyTag: "Why Choose Us",
            whyTitle: "More Than Learning,<br><span>We Build Creative People.</span>",
            whyText: "We believe creativity grows through experience, collaboration, and guidance from professional mentors.",
            /* Jumlah & urutan harus sama dengan kartu id (Bahasa Indonesia)
               di atas dan dengan elemen .why-card aktif di index.html. */
            whyCards: [
                ["Professional Mentor", "Learn directly from mentors who actively work in the creative industry.", "10+ Professional Mentors"],
                ["Learning by Doing", "Practice through real projects and case studies.", "80% Practice-Based Sessions"],
                ["Continuous Growth", "Keep growing through experience, feedback, and creative exploration.", "Keep Creating"]
            ],

            processTag: "Our Creative Process",
            processTitle: "From Idea to <span>Impact</span>",
            processText: "We believe every great work starts with a process that is structured, collaborative, and enjoyable.",
            processSteps: [
                ["Discover", "We start by understanding the goals, needs, and ideas you want to bring to life."],
                ["Create", "Ideas are developed into creative concepts through exploration, illustration, and design."],
                ["Refine", "Every result goes through revision and refinement to meet our quality standards."],
                ["Deliver", "The final work is published, presented, or used according to the needs of users or clients."]
            ],

            testimonialTag: "OUR CREATIVE JOURNEY",
            testimonialTitle: "Stories from Our<br><span>Creative Journey</span>",
            testimonialText: "We are proud to be part of the creative journey of our students, partners, and clients.",
            testimonialRoles: "Student",
            testimonialQuotes: [
                "\"Learning at Imajireka made me more confident in creating digital illustrations.\"",
                "\"The mentor was very helpful, and the learning process encouraged me to explore ideas more boldly.\"",
                "\"I gained new experience and a portfolio that is much more ready for the professional world.\"",
                "\"The learning process was enjoyable and really helped me develop my skills.\"",
                "\"It was not only about learning techniques, but also about turning ideas into meaningful work.\""
            ],

            faqTag: "FAQ",
            faqTitle: "FREQUENTLY ASKED QUESTIONS",
            faqText: "Find answers to the most common questions about Imajireka classes, creative studio, and merchandise.",
            faqQuestions: [
                "Are Imajireka classes suitable for beginners?",
                "Are online classes available?",
                "Will I receive a certificate?",
                "How can I buy the merchandise?",
                "How can I contact the Imajireka team?"
            ],
            faqAnswers: [
                "Absolutely. All programs are designed for beginners as well as participants who want to improve their illustration and design skills.",
                "For information about currently available online classes, please contact the Imajireka team through the available contact channels.",
                "Participants may receive a certificate depending on the class program they join.",
                "Imajireka merchandise can be purchased through official Imajireka channels.",
                "You can contact the Imajireka team through WhatsApp, Instagram, or the available contact channels."
            ],

            contactTag: "FAQ",
            contactTitle: "GET IN TOUCH<br><span>WITH US</span>",
            contactText: "Find answers to the most common questions about Imajireka classes, creative studio, and merchandise.",
            contactButton: "Message Us On WhatsApp",

            footerTitle: "Ready to Create Something<br>Amazing?",
            footerText: "Bring your creative ideas to life with Imajireka. Learn, create, and grow in one ecosystem.",
            footerBtn: "Let's Talk",
            footerCompanyTitle: "Company",
            footerServicesTitle: "Services",
            footerContactTitle: "Contact",
            footerFollowTitle: "Follow Us",
            footerFindTitle: "Find Us",
            footerCompany: ["About", "Portfolio", "Testimonial", "FAQ"],
            footerServices: ["Academy", "Studio", "Merch"],
            footerContact: ["Email", "WhatsApp", "Address"],
            footerSocial: ["Instagram", "Behance", "LinkedIn"]
        }
    };

    const setHTML = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = value;
    };

    const setText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    };

    const setManyText = (selector, values) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            if (values[index] !== undefined) el.textContent = values[index];
        });
    };

    const applyLanguage = (lang) => {
        const t = translations[lang];

        document.documentElement.lang = lang;
        document.title = lang === "id"
            ? "Imajireka - Ekosistem Kreatif dari Bali"
            : "Imajireka - Creative Ecosystem from Bali";

        setManyText(".navbar-link ul li a", t.nav);
        setManyText(".mobile-menu nav li a", t.nav);
        setManyText(".desktop-nav-button a, .mobile-nav-button a", [t.letsTalk, t.letsTalk]);

        setHTML("#hero .btnTitle h3", t.heroTag);
        setHTML("#hero .title h1", t.heroTitle);
        setText("#hero .paragraf p", t.heroText);
        setText("#hero .btnOrange a", t.heroBtn1);
        setText("#hero .btnBorder a", t.heroBtn2);

        setText("#about .btnTitle h3", t.aboutTag);
        setHTML("#about .title h2", t.aboutTitle);
        setText("#about .paragraf p", t.aboutText);
        setText("#about .btnAbout a", t.aboutBtn);

        setText("#services .btnTitle h3", t.ecosystemTag);
        setHTML("#services .title h2", t.ecosystemTitle);
        setText("#services .services-header .paragraf p", t.ecosystemText);
        setManyText("#services .service-card p", [t.serviceText, t.serviceText, t.serviceText]);
        setManyText("#services .service-button", t.serviceBtns);

        setText("#portfolio .portfolio-header .btnTitle h3", t.portfolioTag);
        setHTML("#portfolio .portfolio-header h2", t.portfolioTitle);
        setText("#portfolio .portfolio-header p", t.portfolioText);
        setManyText("#portfolio .portfolio-filter button", t.portfolioFilters);
        document.querySelectorAll("#portfolio .portfolio-overlay").forEach((el, i) => {
            if (t.portfolioOverlays[i]) {
                const h3 = el.querySelector("h3");
                const p = el.querySelector("p");
                if (h3) h3.textContent = t.portfolioOverlays[i][0];
                if (p) p.innerHTML = t.portfolioOverlays[i][1];
            }
        });
        setText("#portfolio .portfolio-button", t.portfolioBtn);

        setText("#why .section-tag", t.whyTag);
        setHTML("#why .why-heading h2", t.whyTitle);
        setText("#why .why-heading p", t.whyText);
        document.querySelectorAll("#why .why-card").forEach((card, i) => {
            const data = t.whyCards[i];
            if (!data) return;
            const h3 = card.querySelector("h3");
            const p = card.querySelector("p");
            const stat = card.querySelector(".why-stat");
            if (h3) h3.textContent = data[0];
            if (p) p.textContent = data[1];
            if (stat) stat.textContent = data[2];
        });

        setText("#process .process-tag", t.processTag);
        setHTML("#process .process-header h2", t.processTitle);
        setText("#process .process-header p", t.processText);
        document.querySelectorAll("#process .process-step").forEach((step, i) => {
            const data = t.processSteps[i];
            if (!data) return;
            const h3 = step.querySelector("h3");
            const p = step.querySelector("p");
            if (h3) h3.textContent = data[0];
            if (p) p.textContent = data[1];
        });

        setText("#testimonial .testimonial-tag", t.testimonialTag);
        setHTML("#testimonial .testimonial-header h2", t.testimonialTitle);
        setText("#testimonial .testimonial-header p", t.testimonialText);
        setManyText("#testimonial .testimonial-user span", [
            t.testimonialRoles, t.testimonialRoles, t.testimonialRoles, t.testimonialRoles, t.testimonialRoles,
            t.testimonialRoles, t.testimonialRoles, t.testimonialRoles, t.testimonialRoles, t.testimonialRoles
        ]);
        document.querySelectorAll("#testimonial .testimonial-card p").forEach((p, i) => {
            p.textContent = t.testimonialQuotes[i % t.testimonialQuotes.length];
        });

        setText("#faq .faq-tag", t.faqTag);
        setText("#faq .faq-header h2", t.faqTitle);
        setText("#faq .faq-header p", t.faqText);
        document.querySelectorAll("#faq .faq-question span:first-child").forEach((el, i) => {
            if (t.faqQuestions[i]) el.textContent = t.faqQuestions[i];
        });
        document.querySelectorAll("#faq .faq-answer p").forEach((el, i) => {
            if (t.faqAnswers[i]) el.textContent = t.faqAnswers[i];
        });

        setText("#contact .contact-tag", t.contactTag);
        setHTML("#contact .contact-title", t.contactTitle);
        setText("#contact .contact-description", t.contactText);
        setText("#contact .contact-whatsapp span", t.contactButton);

        setHTML(".footer-cta h3", t.footerTitle);
        setText(".footer-cta p", t.footerText);
        setText(".footer-button", t.footerBtn);
        setText(".footer-company > h4", t.footerCompanyTitle);
        setText(".footer-services > h4", t.footerServicesTitle);
        setText(".footer-contact > h4", t.footerContactTitle);
        setText(".footer-company .footer-subcolumn h4", t.footerFollowTitle);
        setText(".footer-services .footer-find-us h4", t.footerFindTitle);
        setManyText(".footer-company > ul a", t.footerCompany);
        setManyText(".footer-services > ul a", t.footerServices);
        setManyText(".footer-contact > ul a", t.footerContact);
        setManyText(".footer-company .footer-subcolumn a", t.footerSocial);

        // Update the selected language inside every dropdown.
        options.forEach((option) => {
            const active = option.dataset.lang === lang;
            option.classList.toggle("active", active);
            option.setAttribute("aria-selected", String(active));
        });

        const flagPath = lang === "en"
            ? "assets/flags/england.svg"
            : "assets/flags/indonesia.svg";
        const flagAlt = lang === "en" ? "English" : "Bahasa Indonesia";

        currentButtons.forEach((button) => {
            const img = button.querySelector("img");
            if (img) {
                img.src = flagPath;
                img.alt = flagAlt;
            }
            button.setAttribute("aria-label", `Bahasa aktif: ${flagAlt}. Klik untuk memilih bahasa.`);
        });

        // Keep the dropdown open/closed state independent from language changes.
        localStorage.setItem("imajireka-language", lang);
    };

    // Toggle each language dropdown.
    currentButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();

            const dropdown = button.closest(".language-dropdown");
            if (!dropdown) return;

            const willOpen = !dropdown.classList.contains("open");

            dropdowns.forEach((item) => {
                item.classList.remove("open");
                const trigger = item.querySelector(".language-current");
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            });

            if (willOpen) {
                dropdown.classList.add("open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    // Select a language from the dropdown.
    options.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.stopPropagation();
            applyLanguage(option.dataset.lang);

            const dropdown = option.closest(".language-dropdown");
            if (dropdown) {
                dropdown.classList.remove("open");
                const trigger = dropdown.querySelector(".language-current");
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Close the dropdown when clicking outside or pressing Escape.
    document.addEventListener("click", () => {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
            const trigger = dropdown.querySelector(".language-current");
            if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
            const trigger = dropdown.querySelector(".language-current");
            if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
    });

    const savedLanguage = localStorage.getItem("imajireka-language");
    applyLanguage(savedLanguage === "en" ? "en" : "id");
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}
