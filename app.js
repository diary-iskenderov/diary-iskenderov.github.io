// ===== Burger (mobile) =====
const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
burger?.addEventListener("click", () => sidebar.classList.toggle("open"));

// ===== Active link highlight + close sidebar on mobile =====
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
    link.classList.add("active");
    sidebar.classList.remove("open");
  });
});

// ===== Search (filter sections) =====
const search = document.getElementById("search");
const content = document.getElementById("content");

search?.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  const sections = content.querySelectorAll("section.card");

  sections.forEach(sec => {
    const text = sec.innerText.toLowerCase();
    sec.style.display = q === "" || text.includes(q) ? "" : "none";
  });
});

// ===== Ctrl+K focus search =====
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    search?.focus();
  }
});

// ===== Theme toggle (light/dark) =====
const themeToggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved) document.documentElement.setAttribute("data-theme", saved);

function syncThemeIcon() {
  const t = document.documentElement.getAttribute("data-theme");
  themeToggle.textContent = t === "light" ? "☀️" : "🌙";
}
syncThemeIcon();

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light"; // "" = dark (default)
  if (next) document.documentElement.setAttribute("data-theme", next);
  else document.documentElement.removeAttribute("data-theme");

  const stored = next ? "light" : "";
  localStorage.setItem("theme", stored);
  syncThemeIcon();
});

// ===== Login modal (demo) =====
const loginBtn = document.getElementById("loginBtn");
const userChip = document.getElementById("userChip");
const userNameEl = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginName = document.getElementById("loginName");
const loginPass = document.getElementById("loginPass");

function openModal() {
  loginModal.classList.add("open");
  loginModal.setAttribute("aria-hidden", "false");
  setTimeout(() => loginName?.focus(), 0);
}
function closeModal() {
  loginModal.classList.remove("open");
  loginModal.setAttribute("aria-hidden", "true");
  loginForm?.reset();
}

function renderAuth() {
  const name = localStorage.getItem("docs_user");
  if (name) {
    loginBtn.hidden = true;
    userChip.hidden = false;
    userNameEl.textContent = name;
  } else {
    loginBtn.hidden = false;
    userChip.hidden = true;
    userNameEl.textContent = "";
  }
}
renderAuth();

loginBtn?.addEventListener("click", openModal);

loginModal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close !== undefined) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && loginModal.classList.contains("open")) closeModal();
});

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Демо: просто сохраняем имя (пароль не проверяем)
  const name = loginName.value.trim();
  if (!name) return;

  localStorage.setItem("docs_user", name);
  closeModal();
  renderAuth();
});

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("docs_user");
  renderAuth();
});

