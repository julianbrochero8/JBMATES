
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");

// Actualizar el año automáticamente
if (year) {
  year.textContent = new Date().getFullYear();
}

// Menú para celulares
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Abrir menú" : "Cerrar menú"
    );

    nav.classList.toggle("open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    }
  });
}

// EFECTO PARALLAX
const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let animationPending = false;

function updateParallax() {
  animationPending = false;

  if (!hero || !heroBg || reduceMotion.matches) {
    if (heroBg) {
      heroBg.style.setProperty("--parallax-y", "0px");
    }
    return;
  }

  const rect = hero.getBoundingClientRect();

  // No calcular cuando el encabezado está fuera de pantalla
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    return;
  }

  // Movimiento más visible en computadora y celular
  const speed = window.innerWidth <= 700 ? 0.22 : 0.40;

  // Movimiento relativo a la posición del encabezado
  const offset = Math.max(
    -100,
    Math.min(180, -rect.top * speed)
  );

  heroBg.style.setProperty("--parallax-y", `${offset}px`);
}

function requestParallaxUpdate() {
  if (!animationPending) {
    animationPending = true;
    window.requestAnimationFrame(updateParallax);
  }
}

window.addEventListener("scroll", requestParallaxUpdate, {
  passive: true
});

window.addEventListener("resize", requestParallaxUpdate);

if (reduceMotion.addEventListener) {
  reduceMotion.addEventListener("change", requestParallaxUpdate);
}

updateParallax();
