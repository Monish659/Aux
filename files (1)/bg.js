// AUX shared background engine
// Usage: initBg('bgCanvasId', 'shardCanvasId', 'amber' | 'blue' | 'violet')
function initBg(bgId, shardId, palette) {
  // ── PALETTE DEFINITIONS ──
  const palettes = {
    amber: {
      // warm white-orange: softer, more spread center light
      bgBase: '#ddd8d2',
      coreStops: [
        [0,    'rgba(255,255,255,0.85)'],
        [0.12, 'rgba(255,252,240,0.75)'],
        [0.25, 'rgba(255,244,210,0.62)'],
        [0.42, 'rgba(255,225,160,0.45)'],
        [0.62, 'rgba(255,195,90,0.28)'],
        [0.78, 'rgba(220,140,30,0.12)'],
        [0.92, 'rgba(160,80,0,0.04)'],
        [1,    'rgba(60,20,0,0)'],
      ],
      lineColors: [
        {r:'255,255,255', g:'255,250,230', b:'255,240,200', warm:0},   // white
        {r:'255,195,80',  g:'255,175,50',  b:'240,140,20',  warm:1},   // amber
        {r:'210,110,10',  g:'200,100,0',   b:'184,82,0',    warm:2},   // orange
      ],
      vigStop1: 'rgba(255,235,190,0)',
      vigStop2: 'rgba(190,120,30,0.04)',
      vigStop3: 'rgba(70,25,0,0.09)',
      vigStop4: 'rgba(20,8,0,0.18)',
      shardPurple: true,
    },
    blue: {
      bgBase: '#dce5f2',
      coreStops: [
        [0,    'rgba(255,255,255,0.82)'],
        [0.14, 'rgba(245,248,255,0.70)'],
        [0.28, 'rgba(220,232,255,0.58)'],
        [0.45, 'rgba(180,210,255,0.42)'],
        [0.65, 'rgba(120,170,255,0.25)'],
        [0.80, 'rgba(60,110,240,0.10)'],
        [0.93, 'rgba(20,50,180,0.03)'],
        [1,    'rgba(0,0,0,0)'],
      ],
      lineColors: [
        {r:'255,255,255', g:'240,245,255', b:'220,235,255', warm:0},
        {r:'150,190,255', g:'120,170,255', b:'90,140,255',  warm:1},
        {r:'80,120,240',  g:'60,100,220',  b:'40,80,200',   warm:2},
      ],
      vigStop1: 'rgba(200,220,255,0)',
      vigStop2: 'rgba(80,130,255,0.03)',
      vigStop3: 'rgba(20,50,180,0.08)',
      vigStop4: 'rgba(5,15,80,0.16)',
      shardPurple: true,
    },
    violet: {
      bgBase: '#e8e5f2',
      coreStops: [
        [0,    'rgba(255,255,255,0.80)'],
        [0.13, 'rgba(250,248,255,0.68)'],
        [0.26, 'rgba(238,230,255,0.56)'],
        [0.42, 'rgba(210,195,255,0.42)'],
        [0.63, 'rgba(170,140,255,0.26)'],
        [0.79, 'rgba(120,80,240,0.10)'],
        [0.92, 'rgba(70,30,180,0.03)'],
        [1,    'rgba(0,0,0,0)'],
      ],
      lineColors: [
        {r:'255,255,255', g:'248,244,255', b:'235,228,255', warm:0},
        {r:'200,180,255', g:'180,155,255', b:'160,130,255', warm:1},
        {r:'140,100,255', g:'120,80,240',  b:'100,60,220',  warm:2},
      ],
      vigStop1: 'rgba(220,210,255,0)',
      vigStop2: 'rgba(120,80,240,0.03)',
      vigStop3: 'rgba(60,20,180,0.08)',
      vigStop4: 'rgba(15,5,60,0.16)',
      shardPurple: true,
    },
  };

  const P = palettes[palette] || palettes.amber;

  // ── BG CANVAS ──
  const bgCanvas = document.getElementById(bgId);
  const bgCtx = bgCanvas.getContext('2d');
  let W, H, cx, cy;

  function resize() {
    W = bgCanvas.width  = window.innerWidth;
    H = bgCanvas.height = window.innerHeight;
    cx = W / 2; cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  const NUM_LINES = 240;
  const lines = [];

  function makeLine() {
    const ci = Math.floor(Math.random() * P.lineColors.length);
    return {
      angle: Math.random() * Math.PI * 2,
      r:     4 + Math.random() * 28,
      speed: 1.8 + Math.random() * 5.8,
      len:   12 + Math.random() * 52,
      width: 0.22 + Math.random() * 0.9,
      ci,
      alpha: 0.22 + Math.random() * 0.6,
    };
  }

  for (let i = 0; i < NUM_LINES; i++) {
    const l = makeLine();
    l.r = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.65;
    lines.push(l);
  }

  function maxR() { return Math.sqrt(cx * cx + cy * cy) * 1.35; }

  function drawBg() {
    bgCtx.clearRect(0, 0, W, H);
    bgCtx.fillStyle = P.bgBase;
    bgCtx.fillRect(0, 0, W, H);

    // radial glow core
    const core = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.62);
    P.coreStops.forEach(([t, c]) => core.addColorStop(t, c));
    bgCtx.fillStyle = core;
    bgCtx.fillRect(0, 0, W, H);

    // speed lines
    bgCtx.save();
    bgCtx.translate(cx, cy);
    for (const l of lines) {
      l.r += l.speed * (1 + l.r / 110);
      if (l.r > maxR()) Object.assign(l, makeLine());

      const x1 = Math.cos(l.angle) * l.r;
      const y1 = Math.sin(l.angle) * l.r;
      const x2 = Math.cos(l.angle) * (l.r + l.len);
      const y2 = Math.sin(l.angle) * (l.r + l.len);

      const nearFade = Math.min(1, l.r / 32);
      const edgeFade = Math.max(0, 1 - (l.r / maxR()) * 1.15);
      const a = l.alpha * nearFade * edgeFade;
      if (a < 0.015) continue;

      const lc = P.lineColors[l.ci];
      const grad = bgCtx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0,    `rgba(${lc.r},0)`);
      grad.addColorStop(0.35, `rgba(${lc.g},${a * 0.5})`);
      grad.addColorStop(1,    `rgba(${lc.b},${a})`);
      bgCtx.beginPath();
      bgCtx.moveTo(x1, y1);
      bgCtx.lineTo(x2, y2);
      bgCtx.strokeStyle = grad;
      bgCtx.lineWidth = l.width;
      bgCtx.stroke();
    }
    bgCtx.restore();

    // soft vignette
    const vig = bgCtx.createRadialGradient(cx, cy, Math.min(W,H)*0.28, cx, cy, Math.max(W,H)*0.76);
    vig.addColorStop(0,   P.vigStop1);
    vig.addColorStop(0.5, P.vigStop2);
    vig.addColorStop(0.8, P.vigStop3);
    vig.addColorStop(1,   P.vigStop4);
    bgCtx.fillStyle = vig;
    bgCtx.fillRect(0, 0, W, H);

    requestAnimationFrame(drawBg);
  }
  drawBg();

  // ── SHARD CANVAS ──
  const sc = document.getElementById(shardId);
  const sCtx = sc.getContext('2d');
  let SW, SH;
  let shardData = [];
  let shardT = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function buildShards() {
    SW = sc.width  = window.innerWidth;
    SH = sc.height = window.innerHeight;
    shardData = [];
    const spread = Math.min(SW, SH) * 0.40;

    const clusters = [
      [0, 0, 22], [SW, 0, 22], [0, SH, 20], [SW, SH, 20],
      [SW/2, 0, 10], [SW/2, SH, 10],
      [0, SH/2, 8], [SW, SH/2, 8],
    ];

    for (const [ax, ay, cnt] of clusters) {
      for (let i = 0; i < cnt; i++) {
        const t = Math.pow(Math.random(), 0.55);
        const a = rand(0, Math.PI * 2);
        const d = rand(0, spread) * t;
        const px = ax + Math.cos(a) * d;
        const py = ay + Math.sin(a) * d;
        const sides = 3 + Math.floor(rand(0, 3));
        const len = rand(spread * 0.1, spread * 0.52);
        const rot = rand(0, Math.PI * 2);
        const sharp = rand(0.3, 0.8);
        const pts = [];
        for (let s = 0; s < sides; s++) {
          const sa = (s / sides) * Math.PI * 2 + rot;
          const r = s % 2 === 0 ? len : len * sharp * rand(0.1, 0.4);
          pts.push([px + Math.cos(sa) * r, py + Math.sin(sa) * r]);
        }
        shardData.push({
          pts,
          alpha: rand(0.06, 0.26),
          type: Math.floor(rand(0, 3)),
          // subtle drift
          driftAngle: rand(0, Math.PI * 2),
          driftSpeed: rand(0.0002, 0.0006),
          driftR: rand(2, 8),
          ox: px, oy: py,
        });
      }
    }
  }
  buildShards();

  function drawShards() {
    SW = sc.width  = window.innerWidth;
    SH = sc.height = window.innerHeight;
    sCtx.clearRect(0, 0, SW, SH);
    shardT += 0.008;

    for (const sh of shardData) {
      if (sh.pts.length < 3) continue;
      // tiny drift
      const driftX = Math.cos(sh.driftAngle + shardT * sh.driftSpeed * 100) * sh.driftR;
      const driftY = Math.sin(sh.driftAngle + shardT * sh.driftSpeed * 80) * sh.driftR * 0.7;

      sCtx.beginPath();
      sCtx.moveTo(sh.pts[0][0] + driftX, sh.pts[0][1] + driftY);
      for (let i = 1; i < sh.pts.length; i++) sCtx.lineTo(sh.pts[i][0] + driftX, sh.pts[i][1] + driftY);
      sCtx.closePath();

      if (sh.type === 0) {
        sCtx.fillStyle = `rgba(30,5,60,${sh.alpha})`;
        sCtx.fill();
        sCtx.strokeStyle = `rgba(100,40,180,${sh.alpha * 1.7})`;
        sCtx.lineWidth = 0.7;
        sCtx.stroke();
      } else if (sh.type === 1) {
        sCtx.fillStyle = `rgba(65,15,120,${sh.alpha * 0.75})`;
        sCtx.fill();
        sCtx.strokeStyle = `rgba(148,70,240,${sh.alpha * 1.9})`;
        sCtx.lineWidth = 0.5;
        sCtx.stroke();
      } else {
        sCtx.fillStyle = `rgba(140,80,230,${sh.alpha * 0.3})`;
        sCtx.fill();
        sCtx.strokeStyle = `rgba(200,155,255,${sh.alpha * 2.6})`;
        sCtx.lineWidth = 1.1;
        sCtx.stroke();
      }
    }

    // erase center — shards only at edges
    const bgRGB = palette === 'amber' ? '253,245,230' : palette === 'blue' ? '240,244,255' : '245,240,255';
    const mask = sCtx.createRadialGradient(SW/2, SH/2, Math.min(SW,SH)*0.14, SW/2, SH/2, Math.min(SW,SH)*0.56);
    mask.addColorStop(0,    `rgba(${bgRGB},1)`);
    mask.addColorStop(0.42, `rgba(${bgRGB},0.88)`);
    mask.addColorStop(0.72, `rgba(${bgRGB},0.28)`);
    mask.addColorStop(1,    `rgba(${bgRGB},0)`);
    sCtx.globalCompositeOperation = 'destination-out';
    sCtx.fillStyle = mask;
    sCtx.fillRect(0, 0, SW, SH);
    sCtx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(drawShards);
  }
  drawShards();

  window.addEventListener('resize', () => { resize(); buildShards(); });
}
