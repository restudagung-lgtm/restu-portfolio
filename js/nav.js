// === NAV ===
// Desktop: highlight link aktif sesuai section yang sedang dilihat.
// Mobile: tab bar bawah (4 menu utama) + tombol "More" membuka drawer berisi semua link.

const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() { drawer.classList.add('open'); }
function closeDrawer() { drawer.classList.remove('open'); }

document.addEventListener('click', (e) => { if (e.target.closest('#moreBtn')) openDrawer(); });
drawerClose?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
document.getElementById('drawerLinks')?.addEventListener('click', (e) => { if (e.target.closest('a')) closeDrawer(); });

// highlight link yang sedang aktif (desktop nav + tab bar) sesuai section yang terlihat
const sections = document.querySelectorAll('section[id]');
const deskLinks = () => document.querySelectorAll('#deskLinks a');
const tabLinks = () => document.querySelectorAll('#tabbar a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    [...deskLinks(), ...tabLinks()].forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach((s) => navObserver.observe(s));

// ===== GALLERY LIGHTBOX =====
// Klik thumbnail galeri -> tampil besar; tombol close / klik backdrop / tombol Esc -> kembali kecil.
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption || '';
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

document.getElementById('galWrap')?.addEventListener('click', (e) => {
  const tile = e.target.closest('.gal-tile');
  if (!tile) return;
  openLightbox(tile.dataset.full, tile.dataset.caption);
});
document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
