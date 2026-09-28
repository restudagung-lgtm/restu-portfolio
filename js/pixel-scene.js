// === PIXEL SCENE (animasi mini game, auto-play) ===
// Karakter pixel berlari di atas gambar pixel art, melompati rintangan, dan mengambil koin.
// Murni animasi (tidak ada kontrol pemain). Berhenti otomatis saat kartu tidak terlihat.

(() => {
  const canvas = document.getElementById('pixelScene');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- dunia (koordinat mengikuti gambar images/pixel-scene.jpg, 640x414) ----
  const W = 640, H = 414, FLOOR = 341;
  const PX = 4;                 // ukuran 1 pixel sprite di dunia
  const SPEED = 85;             // kecepatan lari (px dunia / detik)
  const JUMP_T = 0.8, JUMP_H = 54;

  const img = new Image();
  let imgReady = false;
  img.onload = () => { imgReady = true; draw(0); };
  img.src = 'images/pixel-scene.jpg';

  // ---- sprite karakter (10 x 14). X=badan, r=syal, d=wajah gelap, e=mata ----
  const HEAD = [
    '...XXXX...',
    '..XXXXXX..',
    '.XXXXXXXX.',
    '.XXXddddX.',
    '.XXXdeddX.',
    '..XXddddX.',
    '...XXXXX..',
    '..rrrrrr..',
    'rXXXXXXXX.',
    '.XXXXXXXX.',
    '.XXXXXXXX.'
  ];
  const LEGS = {
    a: ['..XX..XX..', '..XX..XX..', '.XXX..XXX.'],
    b: ['...XXXX...', '...XXXX...', '...XXXXX..'],
    jump: ['..XX...XX.', '.XX.....XX', '.X.......X']
  };
  const COLORS = { X: '#e8e0ff', r: '#ff5fa2', d: '#14141c', e: '#ffffff' };

  // ---- state ----
  let cw = 1, ch = 1, dpr = 1;
  let view = { sx: 0, sy: 0, sw: W, sh: H, k: 1 };
  let running = false, last = 0, time = 0;
  let hero, obstacles, orbs, bursts, floaters, dust, score = 0;

  dust = Array.from({ length: 30 }, () => ({
    x: Math.random() * W, y: Math.random() * FLOOR,
    vy: 4 + Math.random() * 8, ph: Math.random() * 6, r: 0.8 + Math.random() * 1.2, a: 0.25 + Math.random() * 0.5
  }));

  function spawnLevel() {
    const { sx, sw } = view;
    hero = { x: sx - 30, lift: 0, jumpT: -1, frameT: 0 };
    obstacles = []; orbs = []; bursts = []; floaters = [];
    [0.30, 0.66].forEach((f) => {
      const x = sx + sw * f + (Math.random() - 0.5) * sw * 0.08;
      obstacles.push({ x, w: 16, h: 12, type: Math.random() < 0.5 ? 0 : 1 });
      orbs.push({ x, y: FLOOR - 80, got: false, ph: Math.random() * 6 });
    });
    [0.14, 0.48, 0.82].forEach((f) => {
      orbs.push({ x: sx + sw * f, y: FLOOR - 28, got: false, ph: Math.random() * 6 });
    });
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = Math.max(1, Math.round(r.width * dpr));
    ch = Math.max(1, Math.round(r.height * dpr));
    canvas.width = cw; canvas.height = ch;
    const ar = cw / ch;
    let sw, sh, sx, sy;
    if (ar < W / H) { sh = H; sw = H * ar; sx = (W - sw) / 2; sy = 0; }
    else { sw = W; sh = W / ar; sx = 0; sy = Math.min(H - sh, Math.max(0, 250 - sh / 2)); }
    view = { sx, sy, sw, sh, k: cw / sw };
    spawnLevel();
    if (reduce) { hero.x = sx + sw * 0.4; }
    draw(time);
  }

  // ---- update ----
  function update(dt) {
    time += dt;
    hero.x += SPEED * dt;
    hero.frameT += dt;

    if (hero.jumpT < 0) {
      for (const o of obstacles) {
        const d = o.x - hero.x;
        if (d > 0 && d <= 40) { hero.jumpT = 0; break; }
      }
    } else {
      hero.jumpT += dt / JUMP_T;
      if (hero.jumpT >= 1) hero.jumpT = -1;
    }
    hero.lift = hero.jumpT >= 0 ? 4 * JUMP_H * hero.jumpT * (1 - hero.jumpT) : 0;

    const cx = hero.x, cy = FLOOR - hero.lift - 28;
    for (const o of orbs) {
      if (!o.got && Math.abs(o.x - cx) < 13 && Math.abs(o.y - cy) < 24) {
        o.got = true; score = (score + 1) % 1000;
        for (let i = 0; i < 10; i++) {
          const a = (i / 10) * Math.PI * 2;
          bursts.push({ x: o.x, y: o.y, vx: Math.cos(a) * 50, vy: Math.sin(a) * 50, life: 0.5 });
        }
        floaters.push({ x: o.x, y: o.y - 8, life: 0.8 });
      }
    }
    bursts.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; });
    bursts = bursts.filter((p) => p.life > 0);
    floaters.forEach((f) => { f.y -= 22 * dt; f.life -= dt; });
    floaters = floaters.filter((f) => f.life > 0);

    dust.forEach((d) => {
      d.y -= d.vy * dt; d.x += Math.sin(time + d.ph) * 6 * dt;
      if (d.y < 0) { d.y = FLOOR; d.x = Math.random() * W; }
    });

    if (hero.x > view.sx + view.sw + 40) spawnLevel();
  }

  // ---- draw helpers ----
  function glow(x, y, r, rgb, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${rgb},${a})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  function drawSprite(rows, ox, oy) {
    // garis tepi gelap dulu supaya karakter tetap terlihat di area terang
    ctx.fillStyle = '#0a0a12';
    rows.forEach((row, ry) => [...row].forEach((c, cx) => {
      if (c !== '.') ctx.fillRect(ox + cx * PX - 1, oy + ry * PX - 1, PX + 2, PX + 2);
    }));
    rows.forEach((row, ry) => [...row].forEach((c, cx) => {
      if (c === '.') return;
      ctx.fillStyle = COLORS[c];
      ctx.fillRect(ox + cx * PX, oy + ry * PX, PX + 0.7, PX + 0.7);   // +0.7 menutup celah antar-pixel
    }));
  }

  function drawObstacle(o) {
    const top = FLOOR - o.h;
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(o.x - o.w / 2 - 1, top - 1, o.w + 2, o.h + 2);
    ctx.fillStyle = o.type ? '#ff5fa2' : '#e0507a';
    const n = 3, sw = o.w / n;
    for (let i = 0; i < n; i++) {
      const x0 = o.x - o.w / 2 + i * sw;
      ctx.beginPath();
      ctx.moveTo(x0, FLOOR); ctx.lineTo(x0 + sw / 2, top); ctx.lineTo(x0 + sw, FLOOR);
      ctx.closePath(); ctx.fill();
    }
  }

  function drawOrb(o) {
    const y = o.y + Math.sin(time * 3 + o.ph) * 2.5;
    glow(o.x, y, 16, '255,211,110', 0.35);
    const s = 3;
    ctx.fillStyle = '#ffd36e';
    [[0, -2], [-1, -1], [0, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]
      .forEach(([dx, dy]) => ctx.fillRect(o.x + dx * s - s / 2, y + dy * s - s / 2, s, s));
    ctx.fillStyle = '#fff6d6';
    ctx.fillRect(o.x - s / 2, y - s / 2, s, s);
  }

  function draw(ts) {
    const { sx, sy, k } = view;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, cw, ch);
    if (!imgReady || !hero) return;

    ctx.setTransform(k, 0, 0, k, -sx * k, -sy * k);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, W, H);

    // cahaya: lengkungan pintu + dua obor (berkedip)
    ctx.globalCompositeOperation = 'lighter';
    glow(340, 270, 170, '255,240,210', 0.10 + 0.04 * Math.sin(ts * 1.6));
    [172, 505].forEach((x, i) => {
      const f = 0.22 + 0.10 * Math.sin(ts * 9 + i * 2) + 0.05 * Math.sin(ts * 23 + i);
      glow(x, 272, 70, '255,200,140', Math.max(0.08, f));
    });
    ctx.globalCompositeOperation = 'source-over';

    // debu melayang
    dust.forEach((d) => {
      ctx.fillStyle = `rgba(255,240,210,${d.a * (0.6 + 0.4 * Math.sin(ts * 2 + d.ph))})`;
      ctx.fillRect(d.x, d.y, d.r * 1.6, d.r * 1.6);
    });

    obstacles.forEach(drawObstacle);
    orbs.forEach((o) => { if (!o.got) drawOrb(o); });

    // bayangan
    ctx.fillStyle = `rgba(0,0,0,${0.45 - hero.lift * 0.005})`;
    ctx.beginPath();
    ctx.ellipse(hero.x, FLOOR + 1, 16 - hero.lift * 0.12, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // karakter
    const legs = hero.jumpT >= 0 ? LEGS.jump
      : (reduce ? LEGS.b : (Math.floor(hero.frameT / 0.12) % 2 ? LEGS.a : LEGS.b));
    drawSprite(HEAD.concat(legs), hero.x - 5 * PX, FLOOR - hero.lift - 14 * PX);

    // efek ambil koin
    ctx.fillStyle = '#ffd36e';
    bursts.forEach((p) => { ctx.globalAlpha = Math.max(0, p.life / 0.5); ctx.fillRect(p.x, p.y, 2.5, 2.5); });
    ctx.globalAlpha = 1;
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    floaters.forEach((f) => {
      ctx.globalAlpha = Math.max(0, f.life / 0.8);
      ctx.fillStyle = '#fff6d6';
      ctx.fillText('+1', f.x, f.y);
    });
    ctx.globalAlpha = 1;

    // HUD (koordinat layar)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cssW = cw / dpr;
    ctx.textAlign = 'right';
    ctx.font = "700 14px 'JetBrains Mono', monospace";
    ctx.fillStyle = '#ffd36e';
    const hx = cssW - 18, hy = 30;
    ctx.fillText(String(score).padStart(3, '0'), hx, hy);
    ctx.fillRect(hx - 44, hy - 10, 9, 9);           // ikon koin kecil
    ctx.fillStyle = '#fff6d6';
    ctx.fillRect(hx - 41.5, hy - 7.5, 4, 4);
  }

  // ---- loop ----
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    draw(time);
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduce) return;
    running = true; last = performance.now();
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  resize();
  window.addEventListener('resize', resize);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);

  let inView = !('IntersectionObserver' in window);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => { inView = e.isIntersecting; inView ? start() : stop(); });
    }, { threshold: 0.1 }).observe(canvas);
  } else { start(); }
  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : (inView && start()); });
})();
