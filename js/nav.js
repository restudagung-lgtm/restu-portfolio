// === NAV (mobile menu toggle) ===
// Desktop: link nav tampil horizontal seperti biasa, tombol ini disembunyikan lewat CSS.
// Mobile: tombol ini membuka menu full-screen (lihat style.css bagian @media max-width:768px).

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  menuBtn.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.classList.toggle('is-open', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', toggleMenu);
  navLinks.querySelectorAll('a.link').forEach((a) => a.addEventListener('click', closeMenu));
}
