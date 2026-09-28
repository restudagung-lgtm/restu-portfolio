// === BACKGROUND PARALLAX ===
// Layer background (mawar) ikut bergerak saat halaman di-scroll, tapi lebih pelan dari konten (efek kedalaman).
(() => {
  const bg = document.getElementById('bgParallax');
  if (!bg) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const F = reduce ? 0 : 0.28;          // 0 = diam, makin besar makin cepat bergeser
  let ticking = false;

  function size() {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    bg.style.height = (window.innerHeight + max * F + 40) + 'px';
  }
  function update() {
    ticking = false;
    bg.style.transform = `translate3d(0, ${-window.scrollY * F}px, 0)`;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  size(); update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { size(); update(); });
  window.addEventListener('load', () => { size(); update(); });
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(document.body);
})();
