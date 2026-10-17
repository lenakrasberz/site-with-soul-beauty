document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // 1. HERO СЕКЦИЯ
  // ==========================================
  const heroTl = gsap.timeline();

  heroTl.fromTo(
    ".hero-content h1",
    { y: 40, opacity: 0, filter: "blur(12px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
      force3D: true,
    },
  );

  // ==========================================
  // 2. СЕКЦИЯ СРАВНЕНИЯ (SHIFT-SECTION)
  // ==========================================
  const compareTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".comparison-grid",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  compareTl
    .fromTo(
      ".card-social",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", force3D: true },
    )
    .fromTo(
      ".card-website",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", force3D: true },
      "<0.2",
    )
    .fromTo(
      ".card-social .compare-list li",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out" },
      "<0.4",
    )
    .fromTo(
      ".card-website .compare-list li",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out" },
      "<0.2",
    );

  // ==========================================
  // 3. ПОРТФОЛИО (КАРТОЧКИ ПРОЕКТОВ)
  // ==========================================
  const projects = document.querySelectorAll(".project-card");

  projects.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      card.querySelector(".project-visual"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
        force3D: true,
        clearProps: "transform",
      },
    ).fromTo(
      card.querySelectorAll(
        ".project-category, .project-title, .project-desc, .project-tags span, .live-demo-btn",
      ),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        force3D: true,
        clearProps: "transform",
      },
      "-=1.1",
    );
  });

  // ==========================================
  // 4. ABOUT US (ЖУРНАЛЬНОЕ РАСКРЫТИЕ ФОТО)
  // ==========================================
  const aboutVisual = document.querySelector(".about-visual");

  if (aboutVisual) {
    const imageWrapper = aboutVisual.querySelector(".founder-image-wrapper");
    const images = imageWrapper ? imageWrapper.querySelectorAll("img") : [];

    if (imageWrapper) {
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutVisual,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      aboutTl
        .fromTo(
          imageWrapper,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.6,
            ease: "power3.inOut",
            clearProps: "clip-path",
          },
        )
        .fromTo(
          images,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power3.inOut",
            clearProps: "transform",
          },
          "<",
        );
    }
  }

  // ==========================================
  // 5. ОПТИМИЗИРОВАННАЯ АНИМАЦИЯ ВСЕХ ТЕКСТОВ
  // ==========================================

  // Конфигурация для каждой группы секций.
  // Все твои значения смещений (x, y) и классов точно сохранены.
  const textAnimationsConfig = [
    {
      // Общие секции
      sections:
        ".shift-section, .portfolio-section, .features-section, .about-section, .process-section, .services-slider-section",
      titleClass: ".section-title",
      subClass: ".section-subtitle",
      titleFrom: { x: 80, opacity: 0, filter: "blur(12px)" },
      titleTo: { x: 0, opacity: 1, duration: 1.2, filter: "blur(0px)" },
      subFrom: { x: -80, opacity: 0, filter: "blur(12px)" },
      subTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
        clearProps: "transform",
      },
    },
    {
      // Секция Pricing
      sections: ".pricing-section",
      titleClass: ".pricing-title",
      subClass: ".pricing-desc",
      titleFrom: { x: 50, opacity: 0, filter: "blur(12px)" },
      titleTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
      subFrom: { x: -50, opacity: 0, filter: "blur(12px)" },
      subTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
    },
    {
      // Секция FAQ
      sections: ".faq-section",
      titleClass: ".faq-title",
      subClass: ".faq-description",
      titleFrom: { x: 80, opacity: 0, filter: "blur(12px)" },
      titleTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
      subFrom: { x: -80, opacity: 0, filter: "blur(12px)" },
      subTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
    },
    {
      // Секция Отзывов (Plugin Reviews)
      sections: ".plugin-reviews-section",
      titleClass: ".testimonials-title",
      subClass: ".testimonials-description",
      titleFrom: { x: 80, opacity: 0, filter: "blur(12px)" },
      titleTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
      subFrom: { x: -80, opacity: 0, filter: "blur(12px)" },
      subTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
    },
    {
      // Финальный призыв к действию
      sections: ".final-cta",
      titleClass: ".cta-title",
      subClass: ".cta-subtitle",
      titleFrom: { x: 50, opacity: 0, filter: "blur(12px)" },
      titleTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
      subFrom: { x: -50, opacity: 0, filter: "blur(12px)" },
      subTo: {
        x: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
    },
    {
      // Секция Блога (только заголовок, сдвиг по Y)
      sections: ".blog-section",
      titleClass: ".blog-title-main",
      subClass: null,
      titleFrom: { y: 50, opacity: 0, filter: "blur(12px)" },
      titleTo: {
        y: 0,
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        force3D: true,
      },
      subFrom: null,
      subTo: null,
    },
  ];

  // Единый цикл, который обрабатывает все текстовые анимации на основе конфигурации выше
  textAnimationsConfig.forEach((config) => {
    const sections = document.querySelectorAll(config.sections);

    sections.forEach((section) => {
      const title = section.querySelector(config.titleClass);
      const subtitle = config.subClass
        ? section.querySelector(config.subClass)
        : null;

      if (title || subtitle) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (title) {
          tl.fromTo(title, config.titleFrom, config.titleTo);
        }

        if (subtitle) {
          tl.fromTo(subtitle, config.subFrom, config.subTo, "<0.2");
        }
      }
    });
  });
});
