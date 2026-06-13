// AUX — shared background engine
// initBg('bgCanvasId', 'shardCanvasId', 'amber' | 'blue' | 'violet')
function initBg(bgId, shardId, palette) {
  const palettes = {
    amber: {
      bgBase: '#ddd8d2',
      coreStops: [
        [0,'rgba(255,255,255,0.85)'],[0.12,'rgba(255,252,240,0.75)'],
        [0.25,'rgba(255,244,210,0.62)'],[0.42,'rgba(255,225,160,0.45)'],
        [0.62,'rgba(255,195,90,0.28)'],[0.78,'rgba(220,140,30,0.12)'],
        [0.92,'rgba(160,80,0,0.04)'],[1,'rgba(60,20,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'255,250,230',b:'255,240,200'},{r:'255,195,80',g:'255,175,50',b:'240,140,20'},{r:'210,110,10',g:'200,100,0',b:'184,82,0'}],
      vig:['rgba(255,235,190,0)','rgba(190,120,30,0.04)','rgba(70,25,0,0.09)','rgba(20,8,0,0.18)'],
      shard:[
        {f:[184,82,0],  s:[255,160,60], fw:0.22, sw:0.9, lw:1.2},
        {f:[220,140,30],s:[255,200,90], fw:0.10, sw:1.4, lw:0.7},
        {f:[255,200,110],s:[255,230,150],fw:0.06,sw:2.0, lw:1.8},
      ],
    },
    blue: {
      bgBase: '#dce5f2',
      coreStops:[
        [0,'rgba(255,255,255,0.82)'],[0.14,'rgba(245,248,255,0.70)'],
        [0.28,'rgba(220,232,255,0.58)'],[0.45,'rgba(180,210,255,0.42)'],
        [0.65,'rgba(120,170,255,0.25)'],[0.80,'rgba(60,110,240,0.10)'],
        [0.93,'rgba(20,50,180,0.03)'],[1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'240,245,255',b:'220,235,255'},{r:'150,190,255',g:'120,170,255',b:'90,140,255'},{r:'80,120,240',g:'60,100,220',b:'40,80,200'}],
      vig:['rgba(200,220,255,0)','rgba(80,130,255,0.03)','rgba(20,50,180,0.08)','rgba(5,15,80,0.16)'],
      shard:[
        {f:[29,78,216],  s:[100,160,255], fw:0.22, sw:0.9, lw:1.2},
        {f:[96,165,250], s:[180,220,255], fw:0.10, sw:1.4, lw:0.7},
        {f:[191,219,254],s:[220,240,255], fw:0.06, sw:2.0, lw:1.8},
      ],
    },
    violet: {
      bgBase: '#e6f1e8',
      coreStops:[
        [0,'rgba(255,255,255,0.80)'],[0.13,'rgba(250,255,252,0.68)'],
        [0.26,'rgba(230,248,235,0.56)'],[0.42,'rgba(195,240,210,0.42)'],
        [0.63,'rgba(140,220,165,0.26)'],[0.79,'rgba(80,190,120,0.10)'],
        [0.92,'rgba(30,150,80,0.03)'],[1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'245,255,248',b:'228,248,235'},{r:'180,240,200',g:'155,225,180',b:'130,210,160'},{r:'100,200,140',g:'80,180,120',b:'60,160,100'}],
      vig:['rgba(210,245,220,0)','rgba(80,190,120,0.03)','rgba(20,150,70,0.08)','rgba(5,60,20,0.16)'],
      shard:[
        {f:[22,101,52],  s:[60,200,100],  fw:0.22, sw:0.9, lw:1.2},
        {f:[74,222,128], s:[160,240,190], fw:0.10, sw:1.4, lw:0.7},
        {f:[187,247,208],s:[220,252,230], fw:0.06, sw:2.0, lw:1.8},
      ],
    },
  };

  const P = palettes[palette] || palettes.amber;

  // ── SPEED LINES ───────────────────────────────────────────────────
  const bg = document.getElementById(bgId);
  const bx = bg.getContext('2d');
  let W, H, cx, cy;

  function resizeBg() {
    W = bg.width = window.innerWidth;
    H = bg.height = window.innerHeight;
    cx = W / 2; cy = H / 2;
  }
  resizeBg();

  const NUM = 240;
  const lines = [];
  function mkLine() {
    return {
      angle: Math.random() * Math.PI * 2,
      r:     4 + Math.random() * 28,
      speed: 1.8 + Math.random() * 5.8,
      len:   12 + Math.random() * 52,
      w:     0.22 + Math.random() * 0.9,
      ci:    Math.floor(Math.random() * P.lines.length),
      alpha: 0.22 + Math.random() * 0.6,
    };
  }
  for (let i = 0; i < NUM; i++) {
    const l = mkLine();
    l.r = Math.random() * Math.max(W, H) * 0.65;
    lines.push(l);
  }
  function maxR() { return Math.sqrt(cx * cx + cy * cy) * 1.35; }

  function drawBg() {
    bx.clearRect(0, 0, W, H);
    bx.fillStyle = P.bgBase; bx.fillRect(0, 0, W, H);
    const core = bx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.62);
    P.coreStops.forEach(([t, c]) => core.addColorStop(t, c));
    bx.fillStyle = core; bx.fillRect(0, 0, W, H);

    bx.save(); bx.translate(cx, cy);
    for (const l of lines) {
      l.r += l.speed * (1 + l.r / 110);
      if (l.r > maxR()) Object.assign(l, mkLine());
      const x1 = Math.cos(l.angle) * l.r,         y1 = Math.sin(l.angle) * l.r;
      const x2 = Math.cos(l.angle) * (l.r + l.len), y2 = Math.sin(l.angle) * (l.r + l.len);
      const a = l.alpha * Math.min(1, l.r / 32) * Math.max(0, 1 - (l.r / maxR()) * 1.15);
      if (a < 0.015) continue;
      const lc = P.lines[l.ci];
      const g = bx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `rgba(${lc.r},0)`);
      g.addColorStop(0.35, `rgba(${lc.g},${a * 0.5})`);
      g.addColorStop(1, `rgba(${lc.b},${a})`);
      bx.beginPath(); bx.moveTo(x1, y1); bx.lineTo(x2, y2);
      bx.strokeStyle = g; bx.lineWidth = l.w; bx.stroke();
    }
    bx.restore();

    const vig = bx.createRadialGradient(cx, cy, Math.min(W,H)*0.28, cx, cy, Math.max(W,H)*0.76);
    [0, 0.5, 0.8, 1].forEach((t, i) => vig.addColorStop(t, P.vig[i]));
    bx.fillStyle = vig; bx.fillRect(0, 0, W, H);
    requestAnimationFrame(drawBg);
  }
  drawBg();

  // ── GLASS SHARDS ─────────────────────────────────────────────────
  const sc = document.getElementById(shardId);
  const sx = sc.getContext('2d');
  let SW, SH, shards = [], sT = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);

  // Smoothed mouse parallax
  let mx = 0, my = 0, smx = 0, smy = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  function mkShard(px, py, size) {
    const sides    = 3 + Math.floor(rnd(0, 4));
    const baseRot  = rnd(0, Math.PI * 2);
    const sharp    = rnd(0.20, 0.70);
    const pts      = [];
    for (let s = 0; s < sides; s++) {
      const a = (s / sides) * Math.PI * 2 + baseRot;
      const r = s % 2 === 0 ? size : size * sharp * rnd(0.15, 0.45);
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    return {
      cx: px, cy: py, pts,
      baseAlpha:   rnd(0.22, 0.55),          // visible
      type:        Math.floor(rnd(0, P.shard.length)),
      // Lissajous float — 60–180px amplitude, 5–12s cycle
      dA:          rnd(0, Math.PI * 2),
      floatR:      rnd(60, 180),
      floatSpeed:  rnd(0.45, 1.0),
      floatPhase:  rnd(0, Math.PI * 2),
      // Rotation — 4–12 degrees/second
      rotStart:    rnd(0, Math.PI * 2),
      rotSpeed:    rnd(-0.12, 0.12),
      // Opacity breath
      alphaPhase:  rnd(0, Math.PI * 2),
      alphaSpeed:  rnd(0.4, 1.2),
      // Mouse parallax weight
      pFactor:     rnd(0.15, 0.55),
    };
  }

  function buildShards() {
    SW = sc.width  = window.innerWidth;
    SH = sc.height = window.innerHeight;
    shards = [];
    const sp = Math.min(SW, SH) * 0.46;
    // Clusters: four corners get the most shards
    const clusters = [
      [0,    0,    26], [SW,   0,    26], [0,    SH,   24], [SW,   SH,   24],
      [SW/2, 0,    12], [SW/2, SH,   12], [0,    SH/2, 10], [SW,   SH/2, 10],
    ];
    for (const [ax, ay, cnt] of clusters) {
      for (let i = 0; i < cnt; i++) {
        const t  = Math.pow(Math.random(), 0.5);
        const a  = rnd(0, Math.PI * 2);
        const d  = rnd(0, sp) * t;
        const px = ax + Math.cos(a) * d;
        const py = ay + Math.sin(a) * d;
        const size = rnd(sp * 0.10, sp * 0.60);
        shards.push(mkShard(px, py, size));
      }
    }
  }
  buildShards();

  // Edge-fade: shards near screen center become transparent
  // Avoids destination-out which has inconsistent browser behaviour
  function edgeFade(sh) {
    const dist = Math.hypot(sh.cx - SW / 2, sh.cy - SH / 2);
    const inner = Math.min(SW, SH) * 0.12;
    const outer = Math.min(SW, SH) * 0.48;
    return Math.max(0, Math.min(1, (dist - inner) / (outer - inner)));
  }

  function drawShards() {
    sx.clearRect(0, 0, SW, SH);
    sT += 0.025;

    // Smooth mouse lag
    smx += (mx - smx) * 0.06;
    smy += (my - smy) * 0.06;

    for (const sh of shards) {
      // Lissajous float
      const dx = Math.cos(sh.dA + sT * sh.floatSpeed + sh.floatPhase) * sh.floatR;
      const dy = Math.sin(sh.dA + sT * sh.floatSpeed * 0.73 + sh.floatPhase) * sh.floatR * 0.65;
      // Mouse parallax (nearer-edge shards react more)
      const px = sh.cx + dx + smx * sh.pFactor * 90;
      const py = sh.cy + dy + smy * sh.pFactor * 60;
      // Rotation
      const rot = sh.rotStart + sT * sh.rotSpeed;
      // Combined alpha: base × edge-fade × breathing
      const fade  = edgeFade(sh);
      const alpha = sh.baseAlpha * fade * (0.65 + 0.35 * Math.sin(sT * sh.alphaSpeed + sh.alphaPhase));
      if (alpha < 0.008) continue;

      const c = P.shard[sh.type];
      const [fr, fg, fb] = c.f;
      const [sr, sg, sb] = c.s;

      sx.save();
      sx.translate(px, py);
      sx.rotate(rot);

      sx.beginPath();
      sx.moveTo(sh.pts[0][0], sh.pts[0][1]);
      for (let i = 1; i < sh.pts.length; i++) sx.lineTo(sh.pts[i][0], sh.pts[i][1]);
      sx.closePath();

      if (sh.type === 2) {
        // Gradient fill for the bright outline type
        const gr = sx.createLinearGradient(-sh.pts[0][0], -sh.pts[0][1], sh.pts[0][0], sh.pts[0][1]);
        gr.addColorStop(0, `rgba(${fr},${fg},${fb},${(alpha * c.fw * 0.5).toFixed(3)})`);
        gr.addColorStop(1, `rgba(${sr},${sg},${sb},${(alpha * c.fw).toFixed(3)})`);
        sx.fillStyle = gr;
      } else {
        sx.fillStyle = `rgba(${fr},${fg},${fb},${(alpha * c.fw).toFixed(3)})`;
      }
      sx.fill();
      sx.strokeStyle = `rgba(${sr},${sg},${sb},${(alpha * c.sw).toFixed(3)})`;
      sx.lineWidth = c.lw;
      sx.stroke();

      sx.restore();
    }

    requestAnimationFrame(drawShards);
  }
  drawShards();

  window.addEventListener('resize', () => {
    resizeBg();
    SW = sc.width  = window.innerWidth;
    SH = sc.height = window.innerHeight;
    buildShards();
  });
}
