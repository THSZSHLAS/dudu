// ---- 通用工具 ----
function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// 随机选一只小猫 + 点击进入彩蛋
function initCornerCat() {
  const catEl = document.getElementById("corner-cat");
  if (!catEl) return;

  const catImages = [
    "img/cat1.png",
    "img/cat2.png",
    "img/cat3.png",
    "img/cat4.png"
  ];

  const randomSrc = getRandomItem(catImages);
  if (randomSrc) {
    catEl.src = randomSrc;
  }

  catEl.style.cursor = "pointer";
  catEl.addEventListener("click", () => {
    // 点击小猫，跳转到第一关彩蛋页面
    window.location.href = "egg1.html";
  });
}

/* ---------- 名言页面 quotes.html ---------- */

function initQuotePage() {
  const textEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");
  const btn = document.getElementById("btn-change-quote");

  if (!textEl || !authorEl || !btn || typeof quotes === "undefined") return;
  if (!Array.isArray(quotes)) return;

  function renderRandomQuote() {
    const q = getRandomItem(quotes);
    if (!q) return;
    textEl.textContent = q.text;
    authorEl.textContent = q.author ? `—— ${q.author}` : "";
  }

  let clickCount = 0;

  btn.addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 3) {
      alert("记得住吗你就换？");
      clickCount = 0;
    }
    renderRandomQuote();
  });

  // 初次加载显示一句
  renderRandomQuote();
}

/* ---------- 每日定理页面 theorems.html ---------- */

function initTheoremPage() {
  const nameEl = document.getElementById("theorem-name");
  const categoryEl = document.getElementById("theorem-category");
  const descEl = document.getElementById("theorem-desc");
  const btn = document.getElementById("btn-change-theorem");

  if (
    !nameEl ||
    !categoryEl ||
    !descEl ||
    !btn ||
    typeof theorems === "undefined"
  )
    return;
  if (!Array.isArray(theorems)) return;

  function renderRandomTheorem() {
    const t = getRandomItem(theorems);
    if (!t) return;
    nameEl.textContent = `「${t.name}」`;
    categoryEl.textContent = t.category ? `分类：${t.category}` : "";
    descEl.textContent = t.description || "";
  }

  let clickCount = 0;

  btn.addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 3) {
      alert("记得住吗你就换？");
      clickCount = 0;
    }
    renderRandomTheorem();
  });

  // 初次加载显示一个
  renderRandomTheorem();
}

/* ---------- 某季节页面 season.html ---------- */

const seasonNameMap = {
  spring: "春天",
  summer: "夏天",
  autumn: "秋天",
  winter: "冬天"
};

function initSeasonDetailPage() {
  const poemTextEl = document.getElementById("poem-text");
  const poemAuthorEl = document.getElementById("poem-author");
  const btn = document.getElementById("btn-change-poem");
  const titleEl = document.getElementById("season-title");
  const subTitleEl = document.getElementById("season-subtitle");

  if (!poemTextEl || !poemAuthorEl || !btn || !titleEl || !subTitleEl) return;

  const params = new URLSearchParams(window.location.search);
  const seasonParam = params.get("season") || "spring";

  const seasonKey = ["spring", "summer", "autumn", "winter"].includes(
    seasonParam
  )
    ? seasonParam
    : "spring";

  const cnName = seasonNameMap[seasonKey] || "季节";

  titleEl.textContent = `${cnName} · 诗句`;
  subTitleEl.textContent = `${cnName}的随机诗句`;

  if (typeof poems === "undefined" || !Array.isArray(poems[seasonKey])) {
    poemTextEl.textContent = "这个季节暂时还没有诗句数据～";
    poemAuthorEl.textContent = "";
    btn.disabled = true;
    return;
  }

  function renderRandomPoem() {
    const p = getRandomItem(poems[seasonKey]);
    if (!p) return;
    poemTextEl.textContent = p.text;
    poemAuthorEl.textContent = p.author || "";
  }

  let clickCount = 0;

  btn.addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 3) {
      alert("记得住吗你就换？");
      clickCount = 0;
    }
    renderRandomPoem();
  });

  // 初次加载
  renderRandomPoem();
}

/* ---------- 彩蛋页面一：egg1.html ---------- */

/* ---------- 彩蛋页面一：egg1.html ---------- */

function initEgg1Page() {
  const input = document.getElementById("egg1-answer");
  const btn = document.getElementById("egg1-submit");
  const feedback = document.getElementById("egg1-feedback");

  if (!input || !btn || !feedback) return; // 不是这个页面

  btn.addEventListener("click", () => {
    const val = input.value.trim();

    if (!val) {
      feedback.style.color = "#d32f2f";
      feedback.textContent = "先写点什么吧～";
      return;
    }

    if (val === "蓝" || val === "蓝色") {
      feedback.style.color = "green";
      feedback.textContent = "答对啦，小猫带你进入下一关……";
      setTimeout(() => {
        window.location.href = "egg2.html";
      }, 800);
    } else {
      feedback.style.color = "#d32f2f";
      feedback.textContent = "不对哦，再想想～";
    }
  });
}

/* ---------- 彩蛋页面二：egg2.html ---------- */

function initEgg2Page() {
  const input = document.getElementById("egg2-answer");
  const btn = document.getElementById("egg2-submit");
  const feedback = document.getElementById("egg2-feedback");

  if (!input || !btn || !feedback) return; // 不是这个页面

  btn.addEventListener("click", () => {
    const val = input.value.trim().toLowerCase();

    if (!val) {
      feedback.style.color = "#d32f2f";
      feedback.textContent = "先随便试试猜一个也行～";
      return;
    }

    if (val === "dudu") {
      feedback.style.color = "green";
      feedback.innerHTML = "🎉 恭喜！请找开发者领取 <strong>66 元红包</strong>！";
    } else {
      feedback.style.color = "#d32f2f";
      feedback.textContent = "不对哦，再想想，提示：和某位的昵称很有关哦～";
    }
  });
}

/* ---------- DOM Ready ---------- */

window.addEventListener("DOMContentLoaded", () => {
  // 所有页面都可以执行的（如果有 corner-cat 就随机一只 + 加点击）
  initCornerCat();

  // 各自页面按需初始化
  initQuotePage();
  initTheoremPage();
  initSeasonDetailPage();
  initEgg1Page();
  initEgg2Page();
});

