
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");

// Año del pie de página
if (year) {
  year.textContent = new Date().getFullYear();
}

// Menú para celulares
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
}

// PARALLAX DEL FONDO PRINCIPAL
const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");

let frameRequested = false;

function parallax() {
  frameRequested = false;

  if (!hero || !heroBg) return;

  // Respeta la preferencia de movimiento reducido
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroBg.style.setProperty("--parallax-y", "0px");
    return;
  }

  const rect = hero.getBoundingClientRect();

  // Mueve el fondo según el desplazamiento de la página
  const speed = window.innerWidth <= 700 ? 0.32 : 0.55;
  const movement = Math.max(-100, Math.min(220, -rect.top * speed));

  heroBg.style.setProperty("--parallax-y", movement + "px");
}

function requestParallax() {
  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(parallax);
  }
}

window.addEventListener("scroll", requestParallax, { passive: true });
window.addEventListener("resize", requestParallax);

parallax();
