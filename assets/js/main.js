document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. УНИВЕРСАЛЬНОЕ МОБИЛЬНОЕ МЕНЮ
  // ==========================================
  const burgerBtn =
    document.getElementById("burger") ||
    document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay =
    document.getElementById("menuOverlay") ||
    document.getElementById("mobileNavOverlay");
  const closeMenuBtn = document.getElementById("closeMenu");
  const dropdownBtn = document.getElementById("mobileDropdownBtn");
  const dropdownMenu = document.getElementById("mobileDropdownMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Функция открытия/закрытия главного меню
  const toggleMobileMenu = () => {
    if (mobileMenu) mobileMenu.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
    if (burgerBtn) burgerBtn.classList.toggle("active");

    // Сбрасываем скролл страницы
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Если закрываем главное меню, сворачиваем и подменю услуг
    if (
      mobileMenu &&
      !mobileMenu.classList.contains("active") &&
      dropdownMenu
    ) {
      dropdownMenu.classList.remove("active");
      const svg = dropdownBtn ? dropdownBtn.querySelector("svg") : null;
      if (svg) svg.style.transform = "rotate(0deg)";
    }
  };

  if (burgerBtn) burgerBtn.addEventListener("click", toggleMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMobileMenu);
  if (overlay) overlay.addEventListener("click", toggleMobileMenu);

  // Раскрытие списка Services (Гармошка)
  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle("active");
      const svg = dropdownBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = dropdownMenu.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0deg)";
      }
    });
  }

  // Закрытие меню при клике на обычную ссылку
  if (mobileLinks.length > 0) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", toggleMobileMenu);
    });
  }

  // ==========================================
  // 2. МОДАЛЬНОЕ ОКНО (Start Project)
  // ==========================================
  const modal = document.getElementById("userNameModal");
  const openModalBtns = [
    document.getElementById("openModal"),
    document.getElementById("mobileStartProject"),
  ];
  const closeModalBtn = document.getElementById("closeModal");

  const openModalWindow = (e) => {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      // Если модалка открывается из моб. меню, закрываем само меню
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    }
  };

  const closeModalWindow = () => {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  // Вешаем клик на все кнопки открытия модалки
  openModalBtns.forEach((btn) => {
    if (btn) btn.addEventListener("click", openModalWindow);
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModalWindow);

  // Закрытие по клику вне окна
  if (modal) {
    window.addEventListener("click", (e) => {
      if (e.target === modal) closeModalWindow();
    });
  }

  // ==========================================
  // 3. ПОРТФОЛИО (See More / See Less)
  // ==========================================
  const loadMorePortfolioBtn = document.getElementById("loadMoreBtn");
  const portfolioBtnText = document.getElementById("btnText");
  const hiddenProjects = document.querySelectorAll(".hidden-project");
  let isPortfolioExpanded = false;

  if (loadMorePortfolioBtn && hiddenProjects.length > 0) {
    loadMorePortfolioBtn.addEventListener("click", () => {
      isPortfolioExpanded = !isPortfolioExpanded;

      if (isPortfolioExpanded) {
        hiddenProjects.forEach((project) =>
          project.classList.add("show-project"),
        );
        if (portfolioBtnText)
          portfolioBtnText.textContent = "See Less Projects";
        loadMorePortfolioBtn.classList.add("less");
      } else {
        hiddenProjects.forEach((project) =>
          project.classList.remove("show-project"),
        );
        if (portfolioBtnText)
          portfolioBtnText.textContent = "See More Projects";
        loadMorePortfolioBtn.classList.remove("less");

        // Скролл наверх секции
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
          setTimeout(() => {
            portfolioSection.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    });
  }

  // ==========================================
  // 4. СЛАЙДЕР УСЛУГ (SERVICES CAROUSEL)
  // ==========================================
  const sliderContainer = document.getElementById("servicesSlider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (sliderContainer && prevBtn && nextBtn) {
    const scrollSlider = (direction) => {
      const card = sliderContainer.querySelector(".service-card");
      const gap =
        parseInt(
          window
            .getComputedStyle(sliderContainer.querySelector(".slider-track"))
            .getPropertyValue("gap"),
        ) || 0;
      const scrollAmount = card.offsetWidth + gap;

      if (direction === "next") {
        sliderContainer.scrollLeft += scrollAmount;
      } else {
        sliderContainer.scrollLeft -= scrollAmount;
      }
    };

    nextBtn.addEventListener("click", () => scrollSlider("next"));
    prevBtn.addEventListener("click", () => scrollSlider("prev"));
  }

  // ==========================================
  // 5. БЛОГ (Load More / Show Less)
  // ==========================================
  const loadMoreBlogBtn = document.querySelector(".btn-load-more");
  const hiddenBlogCards = document.querySelectorAll(".blog-card.is-hidden");
  let isBlogExpanded = false;

  if (loadMoreBlogBtn && hiddenBlogCards.length > 0) {
    loadMoreBlogBtn.addEventListener("click", () => {
      if (!isBlogExpanded) {
        // Открываем статьи
        loadMoreBlogBtn.innerText = "Loading...";
        loadMoreBlogBtn.style.opacity = "0.7";
        loadMoreBlogBtn.style.cursor = "wait";

        setTimeout(() => {
          hiddenBlogCards.forEach((card) => {
            card.classList.remove("is-hidden");
            card.classList.add("fade-in");
          });
          loadMoreBlogBtn.innerText = "Show Less";
          loadMoreBlogBtn.style.opacity = "1";
          loadMoreBlogBtn.style.cursor = "pointer";
          isBlogExpanded = true;
        }, 800);
      } else {
        // Прячем статьи
        hiddenBlogCards.forEach((card) => {
          card.classList.add("is-hidden");
          card.classList.remove("fade-in");
        });
        loadMoreBlogBtn.innerText = "Load More";
        isBlogExpanded = false;

        // Скролл наверх секции блога
        const blogGrid = document.querySelector(".blog-grid");
        if (blogGrid) {
          const offset =
            blogGrid.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }
    });
  }
  // ==========================================
  // 6. АККОРДЕОН FAQ (ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ)
  // ==========================================
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector(".faq-question");

      if (questionBtn) {
        questionBtn.addEventListener("click", () => {
          // Необязательно, но красиво: закрываем другие открытые вопросы
          const currentlyActive = document.querySelector(".faq-item.active");
          if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove("active");
            currentlyActive.querySelector(".faq-answer").style.maxHeight = null;
          }

          // Переключаем кликнутый вопрос
          item.classList.toggle("active");
          const answer = item.querySelector(".faq-answer");

          if (item.classList.contains("active")) {
            // Рассчитываем точную высоту ответа для плавной анимации
            answer.style.maxHeight = answer.scrollHeight + "px";
          } else {
            // Скрываем ответ
            answer.style.maxHeight = null;
          }
        });
      }
    });
  }
  // ==========================================
  // 7. АВТОМАТИЧЕСКИЙ ГОД В ФУТЕРЕ
  // ==========================================
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  // ==========================================
  // 8. КНОПКИ ПОДЕЛИТЬСЯ (SHARE BUTTONS) В БЛОГЕ
  // ==========================================
  // Получаем адрес текущей страницы и кодируем его для соцсетей
  const currentUrl = encodeURIComponent(window.location.href);
  // Получаем заголовок статьи
  const currentTitle = encodeURIComponent(document.title);

  const fbShare = document.getElementById("share-fb");
  const liShare = document.getElementById("share-li");
  const tgShare = document.getElementById("share-tg");

  // Подставляем специальные ссылки-шлюзы для шеринга
  if (fbShare) {
    fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  }

  if (liShare) {
    liShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  }

  if (tgShare) {
    tgShare.href = `https://t.me/share/url?url=${currentUrl}&text=${currentTitle}`;
  }
  // ==========================================
  // ПЛАВНЫЙ СКРОЛЛ НАВЕРХ (ФУТЕР)
  // ==========================================
  const scrollTopBtn = document.querySelector(".scroll-to-top");

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Нативная плавная прокрутка браузера
      });
    });
  }
  // ==========================================
  // ЛОГИКА МОДАЛЬНОГО ОКНА (ЛИД-МАГНИТ)
  // ==========================================
  const openLidModalBtns = document.querySelectorAll(".open-lead-modal");
  const leadModal = document.getElementById("leadModal");
  const closeLidModalBtn = document.querySelector(".close-modal-lead");

  if (leadModal) {
    // Открытие модалки
    openLidModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        leadModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Блокируем скролл страницы
      });
    });

    // Закрытие по крестику
    closeLidModalBtn.addEventListener("click", () => {
      leadModal.classList.remove("active");
      document.body.style.overflow = ""; // Возвращаем скролл
    });

    // Закрытие по клику на темный фон (оверлей)
    leadModal.addEventListener("click", (e) => {
      if (e.target === leadModal) {
        leadModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Закрытие по клавише Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && leadModal.classList.contains("active")) {
        leadModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
  /*form lead magnit*/

  const leadForm = document.getElementById("lead-form");

  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = leadForm.querySelector("button");
      const originalText = btn.innerText;

      // Отправляем форму через EmailJS
      // ВСТАВЬ СЮДА СВОИ НОВЫЕ РАБОЧИЕ КЛЮЧИ!
      emailjs.sendForm("service_zj8yxnx", "template_4r7ayes", this).then(
        () => {
          // Если письмо успешно ушло
          btn.innerText = "Check your email!";
          btn.style.backgroundColor = "#5a6e5b"; // Темно-зеленый цвет успеха
          btn.style.color = "#fff";
          btn.style.opacity = "1";

          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.style.color = "";
            btn.disabled = false;
            leadForm.reset();
          }, 4000);
        },
        (error) => {
          // Если произошла ошибка
          console.error("Ошибка отправки:", error);
          btn.innerText = "Error. Try again.";
          btn.style.backgroundColor = "#e74c3c"; // Красный цвет ошибки

          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.disabled = false;
          }, 3000);
        },
      );
    });
  }
});
// Конец document.addEventListener
