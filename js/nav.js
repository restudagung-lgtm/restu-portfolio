// === NAV ===
// Desktop: highlight link aktif sesuai section yang sedang dilihat.
// Mobile: tab bar bawah (4 menu utama) + tombol "More" membuka drawer berisi semua link.

const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() { drawer.classList.add('open'); }
function closeDrawer() { drawer.classList.remove('open'); }

document.getElementById('moreBtn')?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
document.getElementById('drawerLinks')?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

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
