// === PUZZLE ===
// Minigame di section About: foto profil dipecah jadi 12 balok (4 kolom x 3 baris).
// Seret (atau tap balok lalu tap kotak) ke posisi yang benar sampai gambar utuh.
// Ganti gambar lewat url(...) di css/style.css (.pz-board::before dan .pz-piece). Gambar harus rasio 4:3.

(() => {
  const root = document.getElementById('puzzleGame');
  if (!root) return;

  const COLS = 4;
  const ROWS = 3;
  const TOTAL = COLS * ROWS;

  const board = root.querySelector('#pzBoard');
  const tray = root.querySelector('#pzTray');
  const msg = root.querySelector('#pzMsg');
  const countEl = root.querySelector('#pzCount');
  const timeEl = root.querySelector('#pzTime');
  const resetBtn = root.querySelector('#pzReset');

  let placed = 0;
  let mistakes = 0;
  let seconds = 0;
  let timer = null;
  let selected = null; // balok yang dipilih lewat tap
  let drag = null;

  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

  function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
      seconds++;
      timeEl.textContent = fmt(seconds);
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function updateCount() {
    countEl.textContent = `${placed}/${TOTAL}`;
    root.style.setProperty('--pz-progress', `${(placed / TOTAL) * 100}%`);
  }

  function setMsg(text) {
    msg.textContent = text;
  }

  // ---------- build / reset ----------
  function build() {
    stopTimer();
    placed = 0;
    mistakes = 0;
    seconds = 0;
    selected = null;
    drag = null;
    timeEl.textContent = '00:00';
    board.classList.remove('done');
    root.classList.remove('is-done');
    board.innerHTML = '';
    tray.innerHTML = '';
    root.querySelectorAll('.pz-confetti').forEach((n) => n.remove());

    for (let i = 0; i < TOTAL; i++) {
      const cell = document.createElement('div');
      cell.className = 'pz-cell';
      cell.dataset.id = i;
      cell.addEventListener('click', () => onCellClick(cell));
      board.appendChild(cell);
    }

    const ids = shuffle([...Array(TOTAL).keys()]);
    ids.forEach((id) => tray.appendChild(makePiece(id)));

    updateCount();
    setMsg('Seret balok ke tempat yang pas untuk menyusun fotoku.');
  }

  function makePiece(id) {
    const col = id % COLS;
    const row = Math.floor(id / COLS);
    const p = document.createElement('button');
    p.type = 'button';
    p.className = 'pz-piece';
    p.dataset.id = id;
    p.setAttribute('aria-label', `Balok ${id + 1}`);
    p.style.backgroundPosition = `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
    p.addEventListener('pointerdown', onDown);
    return p;
  }

  // ---------- menaruh balok ----------
  function cellAt(x, y) {
    const r = board.getBoundingClientRect();
    if (x < r.left || x >= r.right || y < r.top || y >= r.bottom) return null;
    const col = Math.floor(((x - r.left) / r.width) * COLS);
    const row = Math.floor(((y - r.top) / r.height) * ROWS);
    return board.children[row * COLS + col] || null;
  }

  function resetPieceStyle(p) {
    p.classList.remove('dragging', 'selected');
    p.style.position = '';
    p.style.left = '';
    p.style.top = '';
    p.style.width = '';
    p.style.height = '';
  }

  function shake(el) {
    el.classList.remove('shake');
    void el.offsetWidth; // restart animasi
    el.classList.add('shake');
  }

  // true kalau balok cocok dengan kotaknya lalu terpasang
  function tryPlace(piece, cell) {
    if (!cell || cell.classList.contains('filled')) return false;
    if (cell.dataset.id !== piece.dataset.id) return false;
    resetPieceStyle(piece);
    if (piece.parentNode === tray) {
      // tap-to-place: sisakan slot kosong supaya tray tidak menyusut
      const slot = document.createElement('span');
      slot.className = 'pz-slot';
      piece.replaceWith(slot);
    }
    piece.classList.add('placed');
    piece.disabled = true;
    piece.removeEventListener('pointerdown', onDown);
    cell.appendChild(piece);
    cell.classList.add('filled');
    placed++;
    updateCount();
    if (selected === piece) selected = null;
    if (placed === TOTAL) finish();
    else if (placed === 1) setMsg('Bagus! Lanjut susun balok berikutnya.');
    else if (placed === Math.ceil(TOTAL / 2)) setMsg('Setengah jalan, terus!');
    else if (placed === TOTAL - 1) setMsg('Tinggal satu balok lagi!');
    return true;
  }

  function finish() {
    stopTimer();
    board.classList.add('done');
    root.classList.add('is-done');
    setMsg(`Selesai dalam ${fmt(seconds)}, ${mistakes} kali salah taruh. Ta-da, ini Restu!`);
    burst();
  }

  function burst() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#7c6bff', '#3ec6ff', '#ffb648', '#38d98a', '#ff5fa2'];
    for (let i = 0; i < 26; i++) {
      const s = document.createElement('span');
      s.className = 'pz-confetti';
      s.style.left = `${Math.random() * 100}%`;
      s.style.background = colors[i % colors.length];
      s.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
      s.style.setProperty('--dy', `${60 + Math.random() * 120}px`);
      s.style.animationDelay = `${Math.random() * 0.25}s`;
      root.appendChild(s);
      setTimeout(() => s.remove(), 1800);
    }
  }

  // ---------- tap: pilih balok, lalu tap kotak ----------
  function onCellClick(cell) {
    if (!selected) return;
    startTimer();
    if (!tryPlace(selected, cell) && !cell.classList.contains('filled')) {
      mistakes++;
      shake(selected);
      setMsg('Belum pas, coba kotak lain.');
    }
  }

  function toggleSelect(piece) {
    if (selected) selected.classList.remove('selected');
    if (selected === piece) {
      selected = null;
      return;
    }
    selected = piece;
    piece.classList.add('selected');
    setMsg('Sekarang tap kotak tujuannya di papan.');
  }

  // ---------- drag ----------
  function onDown(e) {
    if (drag || (e.pointerType === 'mouse' && e.button !== 0)) return;
    e.preventDefault();
    drag = { p: e.currentTarget, id: e.pointerId, sx: e.clientX, sy: e.clientY, moved: false, ph: null };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  function moveTo(e) {
    const { p } = drag;
    const half = parseFloat(p.style.width) / 2;
    p.style.left = `${e.clientX - half}px`;
    p.style.top = `${e.clientY - half}px`;
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return;
      drag.moved = true;
      startTimer();
      if (selected) selected.classList.remove('selected');
      selected = null;
      const { p } = drag;
      const size = board.getBoundingClientRect().width / COLS;
      // placeholder menjaga posisi balok lain di tray tidak bergeser
      drag.ph = document.createElement('span');
      drag.ph.className = 'pz-slot';
      p.before(drag.ph);
      p.classList.add('dragging');
      p.style.position = 'fixed';
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      document.body.appendChild(p);
    }
    moveTo(e);
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.id) return;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    const { p, ph, moved } = drag;
    drag = null;

    if (!moved) {
      toggleSelect(p);
      return;
    }

    const cell = e.type === 'pointerup' ? cellAt(e.clientX, e.clientY) : null;
    if (tryPlace(p, cell)) return; // placeholder tetap sebagai slot kosong
    // salah / di luar papan: balok kembali ke tray
    resetPieceStyle(p);
    ph.replaceWith(p);
    if (cell && !cell.classList.contains('filled')) {
      mistakes++;
      shake(p);
      setMsg('Belum pas, coba kotak lain.');
    }
  }

  resetBtn.addEventListener('click', build);
  build();
})();
