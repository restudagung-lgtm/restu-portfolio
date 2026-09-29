// === ADMIN MODE ===
// Edit isi portfolio langsung dari situs. Hasil disimpan di Firestore (doc: site/content),
// dibaca semua pengunjung; hanya akun admin yang bisa menulis (atur di Firestore Rules, lihat README).
// Buka panel: tambah #admin di URL, tekan Ctrl+Shift+A, atau tap logo 5x.
(() => {
  const LISTS = {nav:NAV_LINKS, social:SOCIAL_LINKS, stats:DATA_STATS, games:DATA_GAMES, gamedev:DATA_GAMEDEV, it:DATA_ITPROJECTS,
    journey:DATA_JOURNEY, ach:DATA_ACHIEVEMENTS, gallery:DATA_GALLERY, devlog:DATA_DEVLOG, contact:DATA_CONTACT};
  const NAMES = {nav:'Menu navigasi', social:'Ikon sosial', stats:'Statistik', games:'Game favorit', gamedev:'Proyek game', it:'Proyek IT',
    journey:'Learning journey', ach:'Achievements', gallery:'Galeri', devlog:'Devlog', contact:'Kontak'};
  // tipe field: (kosong)=teks, a=textarea, i=gambar (URL/upload), c=warna, b=centang, csv=daftar dipisah koma
  const F = {nav:[['label'],['href']], social:[['label'],['url'],['img','i']], stats:[['num'],['lbl']],
    games:[['name'],['tags'],['url'],['img','i'],['color','c'],['fav','b']],
    gamedev:[['name'],['desc','a'],['engine'],['lang'],['status'],['demo'],['repo'],['img','i']],
    it:[['name'],['desc','a'],['tags','csv'],['url'],['img','i']], journey:[['d'],['t']], ach:[['y'],['t']],
    gallery:[['img','i'],['caption']], devlog:[['t'],['d']], contact:[['label'],['val'],['url'],['img','i']]};
  const EXTRA = {games:{icon:'cube', color:'#7c6bff'}, it:{icon:'globe', color:'var(--cyan)'}, social:{icon:'globe'}, contact:{icon:'mail'}};
  const THEME = ['--primary','--primary2','--cyan','--amber','--green','--pink','--bg'];
  const IMGS = {puzzleImg:'images/avatar.jpg', heroBg:'images/hero-bg.jpg'};
  const IMGN = {puzzleImg:'Gambar puzzle (About)', heroBg:'Background hero'};

  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const el = (t, a = {}, ...c) => { const e = document.createElement(t); Object.assign(e, a); e.append(...c); return e; };
  const btn = (t, f) => el('button', {type:'button', textContent:t, onclick:f});

  // ---- teks statis di HTML (didaftarkan otomatis) ----
  const T = {};
  const tn = (e) => [...e.childNodes].find((n) => n.nodeType === 3 && n.nodeValue.trim());
  const get = (x) => x.m === 'h' ? x.e.innerHTML.trim() : (tn(x.e)?.nodeValue || '').trim();
  const set = (x, v) => { if (x.m === 'h') x.e.innerHTML = v; else { const n = tn(x.e); if (n) n.nodeValue = ' ' + v + ' '; } };
  const reg = (k, l, e, m) => { if (!e) return; const x = {e, m, l}; x.def = get(x); T[k] = x; };
  [['brand','Logo','.brand','t'], ['hero.h1','Judul hero','.hero-copy h1','t'], ['hero.tagline','Tagline hero','.hero-copy .tagline','h'],
   ['hero.desc','Deskripsi hero','.hero-copy > p','h'], ['hero.dream','Teks di foto hero','.dream-text','h'], ['about.text','Teks About','.about-text p','h'],
   ['about.quote','Kutipan About','.quote-card','h'], ['journey.quote','Kutipan Journey','.journey-quote','h'], ['footer','Footer','footer','t']
  ].forEach(([k, l, s, m]) => reg(k, l, $(s), m));
  $$('section[id]').forEach((s) => {
    reg(`sec.${s.id}.title`, `Judul: ${s.id}`, $('.sec-head h2', s), 'h');
    reg(`sec.${s.id}.sub`, `Subjudul: ${s.id}`, $('.sub', s), 'h');
  });

  // ---- state ----
  const root = document.documentElement;
  const DT = Object.fromEntries(THEME.map((k) => [k, getComputedStyle(root).getPropertyValue(k).trim()]));
  const D = {lists:clone(LISTS), skills:clone(DATA_SKILLS), texts:{}, theme:{}, hidden:[], imgs:{...IMGS}};
  let S = clone(D), editing = false;

  function apply() {
    for (const k in LISTS) LISTS[k].splice(0, LISTS[k].length, ...S.lists[k]);
    Object.keys(DATA_SKILLS).forEach((k) => delete DATA_SKILLS[k]);
    Object.assign(DATA_SKILLS, S.skills);
    for (const k in T) set(T[k], S.texts[k] ?? T[k].def);
    THEME.forEach((k) => S.theme[k] ? root.style.setProperty(k, S.theme[k]) : root.style.removeProperty(k));
    $$('section[id]').forEach((s) => { s.style.display = S.hidden.includes(s.id) ? 'none' : ''; });
    const h = $('.hero-photo-img');
    if (h) h.style.backgroundImage = `url("${S.imgs.heroBg}")`;
    if (window.PUZZLE_IMG !== S.imgs.puzzleImg) { window.PUZZLE_IMG = S.imgs.puzzleImg; window.puzzleRebuild?.(); }
    window.renderAll?.();
  }
  function load(p) {
    S = clone(D);
    if (p) {
      for (const k in LISTS) if (p.lists?.[k]) S.lists[k] = p.lists[k];
      if (p.skills) S.skills = p.skills;
      if (p.hidden) S.hidden = p.hidden;
      Object.assign(S.texts, p.texts); Object.assign(S.theme, p.theme); Object.assign(S.imgs, p.imgs);
    }
    apply();
  }

  // ---- muat: cache lokal dulu (cepat), lalu versi terbaru dari Firestore ----
  try { load(JSON.parse(localStorage.siteCache || 'null')); } catch { load(null); }
  try {
    db?.collection('site').doc('content').get().then((d) => {
      if (d.exists && !editing) { try { localStorage.siteCache = d.data().json; } catch {} load(JSON.parse(d.data().json)); }
    }).catch(() => {});
  } catch {}

  // ---- UI panel ----
  const CSS = `#adminPanel{position:fixed;top:0;right:0;bottom:0;width:min(420px,100vw);z-index:2000;background:#120d20;color:#eaedf5;border-left:1px solid #3a2c5e;padding:14px;overflow:auto;font:13px 'Space Grotesk',sans-serif;display:flex;flex-direction:column;gap:10px}
#adminPanel[hidden]{display:none}
#adminPanel input,#adminPanel textarea,#adminPanel select{width:100%;background:#0b0812;color:inherit;border:1px solid #3a2c5e;border-radius:8px;padding:8px;font:inherit}
#adminPanel input[type=checkbox]{width:auto}#adminPanel input[type=color]{height:36px;padding:2px}
#adminPanel button{background:#5b5bf0;color:#fff;border:0;border-radius:8px;padding:8px 12px;cursor:pointer;font:inherit}
#adminPanel .af{display:flex;flex-direction:column;gap:4px}#adminPanel .af.row{flex-direction:row;align-items:center;gap:8px}
#adminPanel .ac{border:1px solid #3a2c5e;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px}
#adminPanel .ar{display:flex;gap:6px;flex-wrap:wrap}#adminPanel .at{position:sticky;bottom:-14px;background:#120d20;padding:8px 0}
#adminPanel .am{margin:0;color:#8891ab}#adminPanel .ah{display:flex;justify-content:space-between;align-items:center}`;
  let panel, body, msg, cur = 'texts';
  const VIEWS = [['texts','Teks halaman'], ['look','Tema & gambar'], ['show','Tampil / sembunyi section'], ...Object.entries(NAMES), ['skills','Skills']];

  function pick(cb) { // upload gambar -> dikecilkan (maks 900px) -> data URL
    const f = el('input', {type:'file', accept:'image/*'});
    f.onchange = () => {
      const r = new FileReader();
      r.onload = () => {
        const im = new Image();
        im.onload = () => {
          const k = Math.min(1, 900 / Math.max(im.width, im.height));
          const c = el('canvas', {width:im.width * k | 0, height:im.height * k | 0});
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          cb(c.toDataURL('image/jpeg', 0.82));
        };
        im.src = r.result;
      };
      r.readAsDataURL(f.files[0]);
    };
    f.click();
  }
  function field(label, val, on, type) {
    const w = el('label', {className:'af'}, el('span', {textContent:label}));
    const up = (v) => { on(v); apply(); };
    if (type === 'b') { const i = el('input', {type:'checkbox', checked:!!val, onchange:() => up(i.checked)}); w.className += ' row'; w.prepend(i); return w; }
    const i = el(type === 'a' ? 'textarea' : 'input', {value:val ?? '', rows:3, type:type === 'c' ? 'color' : 'text', oninput:() => up(i.value)});
    w.append(i);
    if (type === 'i') w.append(btn('Upload gambar', () => pick((v) => { i.value = v; up(v); })));
    return w;
  }
  function list(k) {
    const a = S.lists[k];
    a.forEach((it, i) => {
      const card = el('div', {className:'ac'});
      F[k].forEach(([f, t]) => {
        const csv = t === 'csv';
        card.append(field(f, csv ? (it[f] || []).join(', ') : it[f], (v) => { it[f] = csv ? v.split(',').map((s) => s.trim()).filter(Boolean) : v; }, csv ? '' : t));
      });
      const mv = (d) => () => { const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; apply(); view(); };
      card.append(el('div', {className:'ar'}, btn('↑', mv(-1)), btn('↓', mv(1)),
        btn('Hapus', () => { if (confirm('Hapus item ini?')) { a.splice(i, 1); apply(); view(); } })));
      body.append(card);
    });
    body.append(btn('+ Tambah', () => {
      a.push({...Object.fromEntries(F[k].map(([f, t]) => [f, t === 'csv' ? [] : t === 'b' ? false : ''])), ...clone(EXTRA[k] || {})});
      apply(); view();
    }));
  }
  function skills() {
    const g = Object.entries(S.skills).map(([n, l]) => [n, l.map((x) => x.join(' | ')).join('\n')]);
    const sync = () => {
      S.skills = {};
      g.forEach(([n, t]) => { S.skills[n || 'Grup'] = t.split('\n').filter((x) => x.trim()).map((l) => { const [a, b] = l.split('|').map((s) => s.trim()); return [a, LEVEL_MAP[b] ? b : 'Learning']; }); });
      apply();
    };
    g.forEach((row, i) => body.append(el('div', {className:'ac'},
      field('Nama grup', row[0], (v) => { row[0] = v; sync(); }),
      field('Skill (satu per baris: Nama | Level)', row[1], (v) => { row[1] = v; sync(); }, 'a'),
      el('p', {className:'am', textContent:'Level: ' + Object.keys(LEVEL_MAP).join(', ')}),
      btn('Hapus grup', () => { g.splice(i, 1); sync(); view(); }))));
    body.append(btn('+ Grup', () => { g.push(['Grup baru', '']); sync(); view(); }));
  }
  function view() {
    body.replaceChildren();
    if (cur === 'texts') Object.entries(T).forEach(([k, x]) => body.append(field(x.l, S.texts[k] ?? x.def, (v) => { S.texts[k] = v; }, 'a')));
    else if (cur === 'look') {
      THEME.forEach((k) => body.append(field('Warna ' + k, S.theme[k] || DT[k], (v) => { S.theme[k] = v; }, 'c')));
      Object.entries(IMGN).forEach(([k, l]) => body.append(field(l, S.imgs[k], (v) => { S.imgs[k] = v; }, 'i')));
    } else if (cur === 'show') $$('section[id]').forEach((s) => body.append(field(s.id, !S.hidden.includes(s.id), (v) => { S.hidden = S.hidden.filter((x) => x !== s.id); if (!v) S.hidden.push(s.id); }, 'b')));
    else if (cur === 'skills') skills();
    else list(cur);
  }
  async function save() {
    const j = JSON.stringify(S);
    if (j.length > 9e5) { msg.textContent = `Data terlalu besar (${j.length / 1024 | 0} KB, batas ±900 KB). Pakai URL gambar, jangan upload.`; return; }
    try {
      await db.collection('site').doc('content').set({json:j, updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
      try { localStorage.siteCache = j; } catch {}
      msg.textContent = 'Tersimpan ✓';
    } catch (e) { msg.textContent = 'Gagal simpan: ' + (e.code || e.message); }
  }
  const head = (t) => el('div', {className:'ah'}, el('b', {textContent:t}), btn('✕', () => { panel.hidden = true; }));
  function login(err) {
    const em = el('input', {type:'email', placeholder:'Email admin'}), pw = el('input', {type:'password', placeholder:'Password'}), m = el('p', {className:'am', textContent:err || ''});
    panel.replaceChildren(head('Login admin'), em, pw,
      btn('Masuk', () => { if (!window.firebase?.auth) { m.textContent = 'Firebase Auth belum termuat.'; return; } firebase.auth().signInWithEmailAndPassword(em.value, pw.value).catch((e) => { m.textContent = e.code; }); }), m);
  }
  function editor() {
    const sel = el('select', {onchange:() => { cur = sel.value; view(); }}, ...VIEWS.map(([k, l]) => el('option', {value:k, textContent:l})));
    sel.value = cur; body = el('div', {className:'ac'}); msg = el('p', {className:'am'});
    panel.replaceChildren(head('Mode admin'), sel, body, msg, el('div', {className:'ar at'},
      btn('Simpan', save), btn('Reset', () => { S = clone(D); apply(); view(); }),
      btn('Ekspor', () => el('a', {href:URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], {type:'application/json'})), download:'portfolio-content.json'}).click()),
      btn('Impor', () => { const f = el('input', {type:'file', accept:'.json'}); f.onchange = async () => { try { load(JSON.parse(await f.files[0].text())); view(); } catch { msg.textContent = 'File tidak valid'; } }; f.click(); }),
      btn('Keluar', () => firebase.auth().signOut())));
    view();
  }
  function open() {
    editing = true;
    if (!panel) {
      document.head.append(el('style', {textContent:CSS}));
      panel = el('aside', {id:'adminPanel'});
      document.body.append(panel);
      if (window.firebase?.auth) firebase.auth().onAuthStateChanged((u) => u ? editor() : login());
      else login('Firebase Auth belum termuat (cek script di index.html).');
    }
    panel.hidden = false;
  }

  // ---- cara membuka ----
  const fromHash = () => { if (location.hash === '#admin') { open(); try { history.replaceState(null, '', location.pathname + location.search); } catch {} } };
  addEventListener('hashchange', fromHash);
  addEventListener('keydown', (e) => { if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') { e.preventDefault(); open(); } });
  let taps = 0, tt;
  $('.brand')?.addEventListener('click', () => { clearTimeout(tt); if (++taps >= 5) { taps = 0; open(); } tt = setTimeout(() => { taps = 0; }, 2000); });
  fromHash();
})();
