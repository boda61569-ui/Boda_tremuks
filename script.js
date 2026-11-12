/* =====================================================
   TERMUX STORE - JAVASCRIPT
===================================================== */

const navBtns = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");


/* =========================
   التنقل بين الصفحات
========================= */

navBtns.forEach((btn) => {

  btn.addEventListener("click", (e) => {

    e.preventDefault();

    const target = btn.dataset.page;

    if (!target) return;

    pages.forEach((page) => {
      page.classList.remove("active");
    });

    const targetPage =
      document.getElementById("page-" + target);

    if (targetPage) {
      targetPage.classList.add("active");
    }

    document
      .querySelectorAll(".nav-links .nav-btn")
      .forEach((button) => {

        button.classList.toggle(
          "active",
          button.dataset.page === target
        );

      });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* =========================
   البحث والفلاتر
========================= */

const searchInput =
  document.getElementById("search");

const toolCards =
  document.querySelectorAll(".tool-card");

const noResults =
  document.getElementById("noResults");

const filterBtns =
  document.querySelectorAll(".filter-btn");

let currentFilter = "all";


if (searchInput) {

  searchInput.addEventListener("input", () => {
    applyFilter();
  });

}


filterBtns.forEach((btn) => {

  btn.addEventListener("click", () => {

    filterBtns.forEach((button) => {
      button.classList.remove("active");
    });

    btn.classList.add("active");

    currentFilter =
      btn.dataset.filter;

    applyFilter();

  });

});


function applyFilter() {

  const query =
    searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

  let visibleCount = 0;


  toolCards.forEach((card) => {

    const name =
      card.dataset.name
        ? card.dataset.name.toLowerCase()
        : "";

    const category =
      card.dataset.cat || "";

    const matchSearch =
      name.includes(query);

    const matchCategory =
      currentFilter === "all" ||
      category === currentFilter;

    const show =
      matchSearch && matchCategory;


    if (show) {

      card.style.display = "";
      visibleCount++;

    } else {

      card.style.display = "none";

    }

  });


  if (noResults) {

    noResults.style.display =
      visibleCount === 0
        ? "block"
        : "none";

  }

}


/* =========================
   زر نسخ الأمر
========================= */

const copyButtons =
  document.querySelectorAll(".copy-btn");


copyButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const card =
      button.closest(".tool-card");

    if (!card) return;

    const code =
      card.querySelector("code");

    if (!code) return;

    const command =
      code.textContent.trim();


    try {

      await navigator.clipboard.writeText(
        command
      );

    } catch (error) {

      const textArea =
        document.createElement("textarea");

      textArea.value = command;

      document.body.appendChild(
        textArea
      );

      textArea.select();

      document.execCommand("copy");

      textArea.remove();

    }


    button.textContent =
      "✅ اتنسخ!";

    button.classList.add("copied");


    setTimeout(() => {

      button.textContent =
        "📋 نسخ";

      button.classList.remove(
        "copied"
      );

    }, 1500);

  });

});


/* =========================
   بيانات الأدوات
========================= */

const toolsData = {

  python: {
    title: "Python",
    icon: "🐍",
    category: "Python",
    description:
      "لغة برمجة قوية وسهلة ومناسبة للمبتدئين، وتستخدم في تطبيقات الويب والذكاء الاصطناعي والأتمتة وغيرها.",
    install:
      "pkg install python",
    usage:
      "python",
    official:
      "https://www.python.org/"
  },


  pip: {
    title: "Pip",
    icon: "📦",
    category: "Python",
    description:
      "مدير حزم Python ويستخدم لتثبيت مكتبات Python وإدارتها.",
    install:
      "pip install package",
    usage:
      "pip install requests",
    official:
      "https://pip.pypa.io/"
  },


  git: {
    title: "Git",
    icon: "🔧",
    category: "Termux",
    description:
      "أداة للتحكم في إصدارات المشاريع البرمجية وإدارة الأكواد باستخدام المستودعات.",
    install:
      "pkg install git",
    usage:
      "git clone رابط-المشروع",
    official:
      "https://git-scm.com/"
  },


  curl: {
    title: "Curl",
    icon: "🌐",
    category: "Termux",
    description:
      "أداة للتعامل مع الروابط وطلبات الشبكة من خلال سطر الأوامر.",
    install:
      "pkg install curl",
    usage:
      "curl https://example.com",
    official:
      "https://curl.se/"
  },


  wget: {
    title: "Wget",
    icon: "⬇️",
    category: "Termux",
    description:
      "أداة تستخدم لتحميل الملفات من الإنترنت عن طريق الطرفية.",
    install:
      "pkg install wget",
    usage:
      "wget https://example.com/file.zip",
    official:
      "https://www.gnu.org/software/wget/"
  },


  nano: {
    title: "Nano",
    icon: "📝",
    category: "Termux",
    description:
      "محرر نصوص بسيط وسهل الاستخدام من داخل الطرفية.",
    install:
      "pkg install nano",
    usage:
      "nano file.txt",
    official:
      "https://www.nano-editor.org/"
  },


  vim: {
    title: "Vim",
    icon: "⌨️",
    category: "Termux",
    description:
      "محرر نصوص متقدم ومناسب للمستخدمين الذين يعملون كثيراً من خلال الطرفية.",
    install:
      "pkg install vim",
    usage:
      "vim file.txt",
    official:
      "https://www.vim.org/"
  },


  htop: {
    title: "Htop",
    icon: "📊",
    category: "Termux",
    description:
      "أداة لعرض ومراقبة العمليات واستهلاك موارد الجهاز.",
    install:
      "pkg install htop",
    usage:
      "htop",
    official:
      "https://htop.dev/"
  },


  node: {
    title: "Node.js",
    icon: "🟢",
    category: "Termux",
    description:
      "بيئة تشغيل تسمح بتشغيل JavaScript خارج المتصفح.",
    install:
      "pkg install nodejs",
    usage:
      "node app.js",
    official:
      "https://nodejs.org/"
  },


  requests: {
    title: "Requests",
    icon: "🌐",
    category: "Python",
    description:
      "مكتبة Python مشهورة للتعامل مع HTTP requests بطريقة بسيطة.",
    install:
      "pip install requests",
    usage:
      "import requests",
    official:
      "https://requests.readthedocs.io/"
  },


  beautifulsoup: {
    title: "BeautifulSoup",
    icon: "🍲",
    category: "Python",
    description:
      "مكتبة Python لتحليل HTML واستخراج البيانات من صفحات الويب.",
    install:
      "pip install beautifulsoup4",
    usage:
      "from bs4 import BeautifulSoup",
    official:
      "https://www.crummy.com/software/BeautifulSoup/"
  },


  flask: {
    title: "Flask",
    icon: "🧪",
    category: "Python",
    description:
      "إطار عمل خفيف لبناء تطبيقات الويب باستخدام Python.",
    install:
      "pip install flask",
    usage:
      "from flask import Flask",
    official:
      "https://flask.palletsprojects.com/"
  },


  pygame: {
    title: "PyGame",
    icon: "🎮",
    category: "Python",
    description:
      "مكتبة Python تساعدك في إنشاء الألعاب والتطبيقات التفاعلية.",
    install:
      "pip install pygame",
    usage:
      "import pygame",
    official:
      "https://www.pygame.org/"
  },


  django: {
    title: "Django",
    icon: "🚀",
    category: "Python",
    description:
      "إطار عمل قوي لبناء مواقع وتطبيقات ويب باستخدام Python.",
    install:
      "pip install django",
    usage:
      "django-admin startproject mysite",
    official:
      "https://www.djangoproject.com/"
  }

};


/* =========================
   Modal
========================= */

const modal =
  document.getElementById("toolModal");

const closeModal =
  document.getElementById("closeModal");

const modalIcon =
  document.getElementById("modalIcon");

const modalTitle =
  document.getElementById("modalTitle");

const modalCategory =
  document.getElementById("modalCategory");

const modalDescription =
  document.getElementById(
    "modalDescription"
  );

const modalInstall =
  document.getElementById(
    "modalInstall"
  );

const modalUsage =
  document.getElementById(
    "modalUsage"
  );

const modalOfficial =
  document.getElementById(
    "modalOfficial"
  );

const modalCopyInstall =
  document.getElementById(
    "modalCopyInstall"
  );


/* فتح التفاصيل */

const detailButtons =
  document.querySelectorAll(
    ".details-btn"
  );


detailButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const toolName =
      button.dataset.tool;

    const tool =
      toolsData[toolName];

    if (!tool) return;


    modalIcon.textContent =
      tool.icon;

    modalTitle.textContent =
      tool.title;

    modalCategory.textContent =
      tool.category;

    modalDescription.textContent =
      tool.description;

    modalInstall.textContent =
      tool.install;

    modalUsage.textContent =
      tool.usage;

    modalOfficial.href =
      tool.official;


    if (
      tool.category === "Python"
    ) {

      modalCategory.className =
        "badge python";

    } else {

      modalCategory.className =
        "badge termux";

    }


    modal.classList.add("show");

    document.body.style.overflow =
      "hidden";

  });

});


/* غلق النافذة */

function closeToolModal() {

  modal.classList.remove(
    "show"
  );

  document.body.style.overflow =
    "";

}


closeModal.addEventListener(
  "click",
  closeToolModal
);


/* غلق بالضغط خارج النافذة */

modal.addEventListener(
  "click",
  (e) => {

    if (
      e.target === modal
    ) {

      closeToolModal();

    }

  }
);


/* غلق بزر ESC */

document.addEventListener(
  "keydown",
  (e) => {

    if (
      e.key === "Escape"
    ) {

      closeToolModal();

    }

  }
);


/* نسخ أمر التثبيت من التفاصيل */

modalCopyInstall.addEventListener(
  "click",
  async () => {

    const command =
      modalInstall.textContent.trim();


    try {

      await navigator.clipboard.writeText(
        command
      );

    } catch (error) {

      const textArea =
        document.createElement(
          "textarea"
        );

      textArea.value =
        command;

      document.body.appendChild(
        textArea
      );

      textArea.select();

      document.execCommand(
        "copy"
      );

      textArea.remove();

    }


    modalCopyInstall.textContent =
      "✅ اتنسخ!";


    setTimeout(() => {

      modalCopyInstall.textContent =
        "📋 نسخ";

    }, 1500);

  }
);


console.log(
  "⚡ Termux Store يعمل بنجاح!"
);


applyFilter();