// ----- Theme (dark/light) -----
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☀️";
}

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.textContent = isLight ? "☀️" : "🌙";
});

// ----- Mobile nav toggle -----
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav__link").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ----- Active section in nav -----
const sections = document.querySelectorAll("section, header.hero");
const navItems = document.querySelectorAll(".nav__link");

const setActive = (id) => {
  navItems.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute("id");
        if (id) setActive(id);
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
);

sections.forEach((s) => io.observe(s));

// ------- MODAL OPEN/CLOSE -------
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openModalFrom(targetId) {
  const src = document.getElementById(targetId);
  if (!src) return;

  const h3 = src.querySelector("h3");
  modalTitle.textContent = h3 ? h3.textContent : "Détails";

  const clone = src.cloneNode(true);
  clone.removeAttribute("hidden");

  const cloneH3 = clone.querySelector("h3");
  if (cloneH3) cloneH3.remove();

  modalBody.innerHTML = "";
  modalBody.appendChild(clone);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalBody.innerHTML = "";
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".open-modal");
  if (btn) {
    const targetId = btn.getAttribute("data-target");
    openModalFrom(targetId);
  }

  if (e.target && e.target.getAttribute("data-close") === "true") {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});
