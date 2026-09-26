// === FRONTEND / RENDER ===
// Mengubah data dari data.js menjadi elemen HTML di halaman.

// Mengembalikan markup SVG <use> yang menunjuk ke simbol ikon di sprite (lihat index.html).
// name = id ikon tanpa awalan "i-", contoh: icon('gamepad') -> pakai simbol id="i-gamepad"
function icon(name) {
  return `<svg class="icon"><use href="#i-${name}"></use></svg>`;
}

// --- Nav desktop ---
document.getElementById('deskLinks').innerHTML = NAV_LINKS.map((l, i) =>
  `<a href="${l.href}"${i === 0 ? ' class="active"' : ''}>${l.label}</a>`
).join('');

// --- Tab bar mobile (4 tab + tombol Menu) ---
document.getElementById('tabbar').innerHTML =
  TAB_LINKS.map((l, i) => `<a href="${l.href}"${i === 0 ? ' class="active"' : ''}><span>${icon(l.icon)}</span>${l.label}</a>`).join('') +
  `<button id="moreBtn"><span>${icon('menu')}</span>Menu</button>`;

// --- Social row (footer contact) ---
document.getElementById('socialRow').innerHTML = SOCIAL_LINKS.map(s =>
  `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon)}</a>`
).join('');

// --- Drawer (semua link + tagline) ---
document.getElementById('drawerLinks').innerHTML =
  NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('');

// --- Stats ---
document.getElementById('statsGrid').innerHTML = DATA_STATS.map(s => `
  <div class="stat"><span class="badge-ico">${icon('gamepad')}</span>
    <div><div class="num mono">${s.num}</div><div class="lbl">${s.lbl}</div></div>
  </div>`).join('');

// --- Games ---
document.getElementById('gamesGrid').innerHTML = DATA_GAMES.map(g => `
  <div class="card">${g.fav ? '<span class="badge">FAVORITE</span>' : ''}
    <div class="thumb" style="background:linear-gradient(135deg,${g.color}33,${g.color}0d); color:${g.color}">${icon(g.icon)}</div>
    <div class="body"><h3>${g.name}</h3><p>${g.tags}</p></div>
  </div>`).join('');

// --- Game dev projects ---
document.getElementById('gamedevList').innerHTML = DATA_GAMEDEV.map(p => `
  <div class="proj-card">
    <div class="proj-thumb"></div>
    <div>
      <div class="proj-head"><h3>${p.name}</h3><span class="status ${p.status === 'Completed' ? 'done' : 'dev'} mono">${p.status}</span></div>
      <p>${p.desc}</p>
      <div class="pill-row"><span class="pill">${p.engine}</span><span class="pill">${p.lang}</span></div>
      <div class="proj-links">
        <a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">Play Demo</a>
        <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </div>`).join('');

// --- IT projects ---
document.getElementById('itGrid').innerHTML = DATA_ITPROJECTS.map(p => `
  <a class="it-card" href="${p.url}" target="_blank" rel="noopener">
    <span class="badge-ico" style="background:color-mix(in srgb, ${p.color} 20%, transparent); color:${p.color}">${icon(p.icon)}</span>
    <div><h3>${p.name}</h3><p>${p.desc}</p><div class="pill-row">${p.tags.map(t => `<span class="pill">${t}</span>`).join('')}</div></div>
    <span class="go">View Project ${icon('chevron-right')}</span>
  </a>`).join('');

// --- Skills (progress bar) ---
document.getElementById('skillsWrap').innerHTML = Object.entries(DATA_SKILLS).map(([g, list]) => `
  <div class="skill-col"><h3>${g}</h3>
    ${list.map(([n, l]) => {
      const lv = LEVEL_MAP[l];
      return `<div class="skill-row">
        <div class="lbl"><span>${n}</span><span class="lvl">${l}</span></div>
        <div class="bar"><span style="width:${lv.pct}%;background:${lv.color}"></span></div>
      </div>`;
    }).join('')}
  </div>`).join('');

// --- Learning journey ---
document.getElementById('tlWrap').innerHTML = DATA_JOURNEY.map(j => `
  <div class="tl-item"><div class="tl-date mono">${j.d}</div><h3>${j.t}</h3></div>`).join('');

// --- Achievements ---
document.getElementById('achWrap').innerHTML = DATA_ACHIEVEMENTS.map(a => `
  <div class="ach"><span class="badge-ico">${icon('trophy')}</span><span>${a.t}</span><span class="yr">${a.y}</span></div>`).join('');

// --- Gallery ---
// Catatan: ini masih placeholder ikon + label teks, BELUM ada file foto asli.
// Kalau ingin galeri menampilkan foto sungguhan, ganti isi div ini dengan <img src="...">.
document.getElementById('galWrap').innerHTML = DATA_GALLERY.map(g => `
  <div class="gal-tile">${icon('image')}<br>${g}</div>`).join('');

// --- Devlog ---
document.getElementById('logWrap').innerHTML = DATA_DEVLOG.map(l => `
  <a href="#"><h3>${l.t}</h3><span class="d">${l.d}</span></a>`).join('');

// --- Contact list ---
document.getElementById('contactWrap').innerHTML = DATA_CONTACT.map(c => `
  <a href="${c.url}" target="_blank" rel="noopener">
    <span class="badge-ico">${icon(c.icon)}</span>
    <div><h3 style="font-size:13.5px">${c.label}</h3><p style="font-size:12px">${c.val}</p></div>
  </a>`).join('');
