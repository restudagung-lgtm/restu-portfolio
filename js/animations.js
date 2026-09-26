// === ANIMATIONS ===
// Menambahkan animasi fade + slide-up saat tiap section masuk ke layar waktu di-scroll.
// Elemen dengan class "reveal" (lihat index.html) akan otomatis kena animasi ini.

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target); // animasi cukup sekali per section
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));
