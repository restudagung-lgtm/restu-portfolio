// === FRONTEND / RENDER ===
// Mengubah data dari data.js menjadi elemen HTML di halaman.

const svgIcon = (p) => `<svg class="icon" viewBox="0 0 24 24">${p}</svg>`;
const ICONS = {
  gamepad: svgIcon('<rect x="2" y="8" width="20" height="9" rx="4"/><path d="M7 11v3M5.5 12.5h3M16 12h.01M18.5 10h.01"/>'),
  code: svgIcon('<path d="M8 6 3 12l5 6M16 6l5 6-5 6"/>'),
  trophy: svgIcon('<path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M4 5h4v2a4 4 0 0 1-4-4Zm16 0h-4v2a4 4 0 0 0 4-4Z"/><path d="M10 15v3h4v-3M9 21h6"/>'),
  image: svgIcon('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m4 18 5-5 4 4 3-3 5 5"/>'),
  mail: svgIcon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  git: svgIcon('<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 8v8M6 8c0 4 6 4 6 4"/>'),
  disc: svgIcon('<rect x="3" y="6" width="18" height="12" rx="5"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/>')
};

document.getElementById('statsGrid').innerHTML = DATA_STATS.map(s =>
  `<div class="stat"><div class="num mono">${s.num}</div><div class="lbl">${s.lbl}</div></div>`
).join('');

document.getElementById('gamesGrid').innerHTML = DATA_GAMES.map(g => `
  <div class="card">${g.fav ? '<span class="badge">FAVORITE</span>' : ''}
    <div class="tag">${ICONS.gamepad} GAME</div>
    <h3>${g.name}</h3>
    <p>${g.tags}</p>
  </div>`).join('');

document.getElementById('gamedevList').innerHTML = DATA_GAMEDEV.map(p => `
  <div class="proj-card">
    <div class="proj-head"><h3>${p.name}</h3><span class="status mono">${p.status}</span></div>
    <p>${p.desc}</p>
    <div class="meta mono" style="margin-top:10px">${p.engine} · ${p.lang}</div>
    <div class="proj-links">
      <a href="${p.demo}" target="_blank" rel="noopener">${ICONS.gamepad} Play</a>
      <a href="${p.repo}" target="_blank" rel="noopener">${ICONS.git} GitHub</a>
    </div>
  </div>`).join('');

document.getElementById('itGrid').innerHTML = DATA_ITPROJECTS.map(p => `
  <a class="card" href="${p.url}" target="_blank" rel="noopener">
    <div class="tag">${ICONS.code} PROJECT</div>
    <h3>${p.name}</h3>
    <p>${p.tags}</p>
  </a>`).join('');

document.getElementById('skillsWrap').innerHTML = Object.entries(DATA_SKILLS).map(([g, list]) => `
  <div class="skill-group"><h3>${g}</h3>
    <div class="skill-list">${list.map(([n, l]) => `<span class="skill-pill lvl-${l}">${n} — ${l}</span>`).join('')}</div>
  </div>`).join('');

document.getElementById('tlWrap').innerHTML = DATA_JOURNEY.map(j => `
  <div class="tl-item"><div class="tl-date mono">${j.d}</div><h3>${j.t}</h3></div>`).join('');

document.getElementById('achWrap').innerHTML = DATA_ACHIEVEMENTS.map(a => `
  <div class="ach"><span>${ICONS.trophy} ${a.t}</span><span class="yr">${a.y}</span></div>`).join('');

document.getElementById('galWrap').innerHTML = DATA_GALLERY.map(g => `
  <div class="gal-tile">${ICONS.image}<br>${g}</div>`).join('');

document.getElementById('logWrap').innerHTML = DATA_DEVLOG.map(l => `
  <a href="#"><h3>${l.t}</h3><span class="d">${l.d}</span></a>`).join('');

document.getElementById('contactWrap').innerHTML = DATA_CONTACT.map(c => `
  <a class="card" href="${c.url}" target="_blank" rel="noopener">
    <div class="tag">${ICONS[c.icon]} ${c.label}</div>
    <h3 style="font-size:15px">${c.val}</h3>
  </a>`).join('');
