// === PUZZLE (animasi) ===
// Foto tersusun sendiri dari 12 balok, ditahan sebentar, lalu buyar dan mengulang.
// Gambar diambil dari window.PUZZLE_IMG (diatur lewat mode admin / default images/avatar.jpg).
(() => {
  const board = document.getElementById('pzBoard');
  if (!board) return;
  const C = 4, R = 3, N = C * R;
  let timers = [];
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  const rnd = (a) => (Math.random() - 0.5) * a;

  function fly(t, smooth) {
    t.style.transition = smooth ? 'transform .8s ease-in, opacity .7s' : 'none';
    t.style.opacity = 0;
    t.style.transform = `translate(${rnd(220)}px,${-40 - Math.random() * 120}px) rotate(${rnd(90)}deg) scale(.6)`;
  }

  function build() {
    timers.forEach(clearTimeout);
    timers = [];
    board.classList.remove('done');
    board.innerHTML = '';
    const img = `url("${window.PUZZLE_IMG || 'images/avatar.jpg'}")`;
    const tiles = [...Array(N)].map((_, i) => {
      const cell = document.createElement('div');
      cell.className = 'pz-cell';
      const t = document.createElement('div');
      t.className = 'pz-tile';
      t.style.backgroundImage = img;
      t.style.backgroundSize = `${C * 100}% ${R * 100}%`;
      t.style.backgroundPosition = `${((i % C) / (C - 1)) * 100}% ${(Math.floor(i / C) / (R - 1)) * 100}%`;
      cell.append(t);
      board.append(cell);
      return t;
    });

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      board.classList.add('done');
      return;
    }

    tiles.forEach((t) => fly(t, false));
    void board.offsetWidth;
    const order = [...Array(N).keys()].sort(() => Math.random() - 0.5);
    order.forEach((i, k) => later(() => {
      const t = tiles[i];
      t.style.transition = '';
      t.style.opacity = 1;
      t.style.transform = 'none';
    }, 500 + k * 450));
    const end = 500 + N * 450;
    later(() => board.classList.add('done'), end + 700);
    later(() => { board.classList.remove('done'); tiles.forEach((t) => fly(t, true)); }, end + 3800);
    later(build, end + 5000);
  }

  window.puzzleRebuild = build;
  build();
})();
