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
        {f:[72,22,140],  s:[196,181,253], fw:0.09, sw:1.8, lw:1.3},
        {f:[109,40,217], s:[240,220,255], fw:0.05, sw:2.2, lw:0.8},
        {f:[167,139,250],s:[255,255,255], fw:0.04, sw:2.6, lw:1.5},
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
    rose: {
      bgBase: '#e4d0d6',
      coreStops:[
        [0,'rgba(255,255,255,0.82)'],[0.13,'rgba(255,248,250,0.70)'],
        [0.26,'rgba(255,228,235,0.58)'],[0.42,'rgba(255,200,215,0.42)'],
        [0.63,'rgba(240,150,175,0.25)'],[0.79,'rgba(190,80,110,0.10)'],
        [0.92,'rgba(130,20,50,0.03)'],[1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'255,245,248',b:'255,225,235'},{r:'255,150,175',g:'240,120,150',b:'220,90,120'},{r:'190,80,110',g:'160,40,75',b:'140,15,50'}],
      vig:['rgba(255,220,230,0)','rgba(210,70,105,0.03)','rgba(150,15,50,0.08)','rgba(70,0,20,0.17)'],
      shard:[
        {f:[159,18,57],  s:[250,100,130], fw:0.18, sw:1.0, lw:1.2},
        {f:[225,29,72],  s:[255,175,195], fw:0.10, sw:1.5, lw:0.8},
        {f:[253,164,175],s:[255,230,238], fw:0.06, sw:2.1, lw:1.6},
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
    // Elongated irregular polygon — actual broken glass shape
    const sides  = 3 + Math.floor(rnd(0, 3));
    const baseRot = rnd(0, Math.PI * 2);
    const scaleX = rnd(0.32, 1.0);
    const scaleY = rnd(0.32, 1.0);
    const pts    = [];
    for (let s = 0; s < sides; s++) {
      const a = (s / sides) * Math.PI * 2 + baseRot + rnd(-0.32, 0.32);
      const r = size * rnd(0.5, 1.0);
      pts.push([Math.cos(a) * r * scaleX, Math.sin(a) * r * scaleY]);
    }
    // Compute orbit from the shard's initial position relative to screen center
    const dxC = px - SW / 2;
    const dyC = py - SH / 2;
    // Enforce minimum orbit radius so shards never cross into the interior
    const minOrbit = Math.min(SW, SH) * 0.44;
    return {
      cx: px, cy: py, pts,
      baseAlpha:    rnd(0.55, 0.90),
      type:         Math.floor(rnd(0, P.shard.length)),
      orbitR:       Math.max(Math.hypot(dxC, dyC), minOrbit),
      orbitAngle0:  Math.atan2(dyC, dxC),
      orbitSpeed:   rnd(0.06, 0.20) * (Math.random() > 0.5 ? 1 : -1),
      rotOffset:    rnd(-0.45, 0.45),  // slight tilt from perfect center-pointing
      alphaPhase:   rnd(0, Math.PI * 2),
      alphaSpeed:   rnd(0.18, 0.45),
      pFactor:      rnd(0.08, 0.28),
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

  // Edge-fade based on current drawn position — keeps center clear
  function edgeFade(curX, curY) {
    const dist = Math.hypot(curX - SW / 2, curY - SH / 2);
    const inner = Math.min(SW, SH) * 0.36;  // fully invisible inside this radius
    const outer = Math.min(SW, SH) * 0.50;  // fully visible outside this radius
    return Math.max(0, Math.min(1, (dist - inner) / (outer - inner)));
  }

  function drawShards() {
    sx.clearRect(0, 0, SW, SH);
    sT += 0.011;

    // Smooth mouse lag
    smx += (mx - smx) * 0.06;
    smy += (my - smy) * 0.06;

    for (const sh of shards) {
      // Orbital motion around screen center
      const orbitAngle = sh.orbitAngle0 + sT * sh.orbitSpeed;
      const px = SW / 2 + Math.cos(orbitAngle) * sh.orbitR + smx * sh.pFactor * 40;
      const py = SH / 2 + Math.sin(orbitAngle) * sh.orbitR + smy * sh.pFactor * 30;
      // Rotation: point toward center (orbitAngle + π), with small personal offset
      const rot = orbitAngle + Math.PI + sh.rotOffset;
      // Combined alpha: base × edge-fade (based on current position) × breathing
      const fade  = edgeFade(px, py);
      const alpha = sh.baseAlpha * fade * (0.65 + 0.35 * Math.sin(sT * sh.alphaSpeed + sh.alphaPhase));
      if (alpha < 0.008) continue;

      const c = P.shard[sh.type];
      const [fr, fg, fb] = c.f;
      const [sr, sg, sb] = c.s;
      const n = sh.pts.length;

      sx.save();
      sx.translate(px, py);
      sx.rotate(rot);

      // Build path once, reuse for all layers
      sx.beginPath();
      sx.moveTo(sh.pts[0][0], sh.pts[0][1]);
      for (let i = 1; i < n; i++) sx.lineTo(sh.pts[i][0], sh.pts[i][1]);
      sx.closePath();

      // Layer 1 — glass body: clearly visible gradient tint
      const gp1 = sh.pts[0], gp2 = sh.pts[Math.floor(n / 2)];
      const bodyGrad = sx.createLinearGradient(gp1[0], gp1[1], gp2[0], gp2[1]);
      bodyGrad.addColorStop(0,   `rgba(${fr},${fg},${fb},${(alpha * 0.42).toFixed(3)})`);
      bodyGrad.addColorStop(0.45,`rgba(${sr},${sg},${sb},${(alpha * 0.18).toFixed(3)})`);
      bodyGrad.addColorStop(1,   `rgba(${fr},${fg},${fb},${(alpha * 0.50).toFixed(3)})`);
      sx.fillStyle = bodyGrad;
      sx.fill();

      // Layer 2 — fracture edge: dark crack, the broken glass line
      sx.strokeStyle = `rgba(10,0,25,${(alpha * 0.82).toFixed(3)})`;
      sx.lineWidth = 2.4;
      sx.stroke();

      // Layer 3 — specular rim: bright lavender catching the edge
      sx.strokeStyle = `rgba(215,195,255,${(alpha * 0.95).toFixed(3)})`;
      sx.lineWidth = 0.8;
      sx.stroke();

      // Layer 4 — brightest highlight edge (one face catches full light)
      const h0 = sh.pts[0], h1 = sh.pts[1 % n];
      sx.beginPath();
      sx.moveTo(h0[0], h0[1]);
      sx.lineTo(h1[0], h1[1]);
      sx.strokeStyle = `rgba(255,252,255,${(alpha * 0.98).toFixed(3)})`;
      sx.lineWidth = 2.2;
      sx.stroke();

      // Layer 5 — face glint: diagonal reflection across the glass face
      const f0 = sh.pts[Math.floor(n * 0.2) % n];
      const f1 = sh.pts[Math.floor(n * 0.7) % n];
      sx.beginPath();
      sx.moveTo(f0[0] * 0.5, f0[1] * 0.5);
      sx.lineTo(f1[0] * 0.5, f1[1] * 0.5);
      sx.strokeStyle = `rgba(240,225,255,${(alpha * 0.55).toFixed(3)})`;
      sx.lineWidth = 1.1;
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
