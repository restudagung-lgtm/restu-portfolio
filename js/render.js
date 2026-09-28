// Helper link: kalau url masih '#'/kosong -> klik tidak melakukan apa-apa (tidak buka tab kosong).
// Kalau sudah diisi http(s)://... -> otomatis buka di tab baru.
const L = (u) => /^https?:\/\//i.test(u || '') ? `href="${u}" target="_blank" rel="noopener"`
  : /^mailto:/i.test(u || '') ? `href="${u}"`
  : `href="#" onclick="return false" title="Link belum diisi"`;

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
  `<a ${L(s.url)} aria-label="${s.label}">${s.img ? `<img src="${s.img}" alt="${s.label}">` : icon(s.icon)}</a>`
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
  <a class="card" ${L(g.url || '#')}>${g.fav ? '<span class="badge">FAVORITE</span>' : ''}
    <div class="thumb" style="background:linear-gradient(135deg,${g.color}33,${g.color}0d); color:${g.color}">${g.img ? `<img src="${g.img}" alt="${g.name}">` : icon(g.icon)}</div>
    <div class="body"><h3>${g.name}</h3><p>${g.tags}</p></div>
  </a>`).join('');

// --- Game dev projects ---
document.getElementById('gamedevList').innerHTML = DATA_GAMEDEV.map(p => `
  <div class="proj-card">
    <a class="proj-thumb" ${L(p.demo)} aria-label="Buka ${p.name}">${p.img ? `<img src="${p.img}" alt="${p.name}">` : ''}</a>
    <div>
      <div class="proj-head"><h3>${p.name}</h3><span class="status ${p.status === 'Completed' ? 'done' : 'dev'} mono">${p.status}</span></div>
      <p>${p.desc}</p>
      <div class="pill-row"><span class="pill">${p.engine}</span><span class="pill">${p.lang}</span></div>
      <div class="proj-links">
        <a class="btn btn-primary" ${L(p.demo)}>Play Demo</a>
        <a class="btn btn-ghost" ${L(p.repo)}>GitHub</a>
      </div>
    </div>
  </div>`).join('');

// --- IT projects ---
document.getElementById('itGrid').innerHTML = DATA_ITPROJECTS.map(p => `
  <a class="it-card" ${L(p.url)}>
    <span class="badge-ico" style="background:color-mix(in srgb, ${p.color} 20%, transparent); color:${p.color}">${p.img ? `<img src="${p.img}" alt="${p.name}">` : icon(p.icon)}</span>
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
document.getElementById('galWrap').innerHTML = DATA_GALLERY.map(g => `
  <button type="button" class="gal-tile" data-full="${g.img}" data-caption="${g.caption}">${g.img ? `<img src="${g.img}" alt="${g.caption}"><span class="gal-cap">${g.caption}</span>` : `${icon('image')}<br>${g.caption || g}`}</button>`).join('');

// --- Devlog ---
document.getElementById('logWrap').innerHTML = DATA_DEVLOG.map(l => `
  <a href="#"><h3>${l.t}</h3><span class="d">${l.d}</span></a>`).join('');

// --- Contact list ---
document.getElementById('contactWrap').innerHTML = DATA_CONTACT.map(c => `
  <a ${L(c.url)}>
    <span class="badge-ico">${c.img ? `<img src="${c.img}" alt="${c.label}">` : icon(c.icon)}</span>
    <div><h3 style="font-size:13.5px">${c.label}</h3><p style="font-size:12px">${c.val}</p></div>
  </a>`).join('');
