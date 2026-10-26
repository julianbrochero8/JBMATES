document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto Parallax fluido en la sección Hero
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      // Multiplicar por 0.35 le da velocidad retrasada creando el efecto 3D
      heroBg.style.transform = `translate3d(0, ${scrollPosition * 0.35}px, 0)`;
    });
  }

  // 2. Colocar año actual dinámicamente en el footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
