const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");

if (year) year.textContent = new Date().getFullYear();

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
    nav.classList.toggle("open", !open);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    }
  });
}

// Parallax suave, reducido en celulares y desactivado si se prefiere menos movimiento.
const heroBg = document.querySelector(".hero-bg");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

function updateParallax() {
  if (!heroBg || reduceMotion.matches) return;
  const amount = window.innerWidth <= 700 ? 0.06 : 0.18;
  heroBg.style.setProperty("--parallax-y", `${Math.min(window.scrollY * amount, 90)}px`);
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", updateParallax);
updateParallax();
