// === FRONTEND / RENDER ===
// Mengubah data dari data.js menjadi elemen HTML di halaman.

const ICONS = {
  gamepad: '🎮', code: '</>', trophy: '🏆', image: '🖼️', mail: '✉️', git: '🐙', disc: '💬'
};

// --- Nav desktop ---
document.getElementById('deskLinks').innerHTML = NAV_LINKS.map((l, i) =>
  `<a href="${l.href}"${i === 0 ? ' class="active"' : ''}>${l.label}</a>`
).join('');

// --- Tab bar mobile (4 tab + tombol More) ---
document.getElementById('tabbar').innerHTML =
  TAB_LINKS.map((l, i) => `<a href="${l.href}"${i === 0 ? ' class="active"' : ''}><span>${l.icon}</span>${l.label}</a>`).join('') +
  `<button id="moreBtn"><span>☰</span>More</button>`;

// --- Drawer (semua link + tagline) ---
document.getElementById('drawerLinks').innerHTML =
  NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('');

// --- Stats ---
document.getElementById('statsGrid').innerHTML = DATA_STATS.map(s => `
  <div class="stat"><span class="badge-ico">${ICONS.gamepad}</span>
    <div><div class="num mono">${s.num}</div><div class="lbl">${s.lbl}</div></div>
  </div>`).join('');

// --- Games ---
document.getElementById('gamesGrid').innerHTML = DATA_GAMES.map(g => `
  <div class="card">${g.fav ? '<span class="badge">FAVORITE</span>' : ''}
    <div class="thumb">${ICONS.gamepad}</div>
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
    <span class="badge-ico">${ICONS.code}</span>
    <div><h3>${p.name}</h3><p>${p.tags}</p></div>
    <span class="go">View Project →</span>
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
  <div class="ach"><span class="badge-ico">${ICONS.trophy}</span><span>${a.t}</span><span class="yr">${a.y}</span></div>`).join('');

// --- Gallery ---
document.getElementById('galWrap').innerHTML = DATA_GALLERY.map(g => `
  <div class="gal-tile">${ICONS.image}<br>${g}</div>`).join('');

// --- Devlog ---
document.getElementById('logWrap').innerHTML = DATA_DEVLOG.map(l => `
  <a href="#"><h3>${l.t}</h3><span class="d">${l.d}</span></a>`).join('');

// --- Contact list ---
document.getElementById('contactWrap').innerHTML = DATA_CONTACT.map(c => `
  <a href="${c.url}" target="_blank" rel="noopener">
    <span class="badge-ico">${ICONS[c.icon]}</span>
    <div><h3 style="font-size:13.5px">${c.label}</h3><p style="font-size:12px">${c.val}</p></div>
  </a>`).join('');
