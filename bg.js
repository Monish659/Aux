// AUX — shared background engine
// initBg('bgCanvasId', 'shardCanvasId', 'amber' | 'blue' | 'violet' | 'rose' | 'teal' | 'purple' | 'indigo' | 'midnight' | 'midnight-silver' | 'midnight-bronze' | 'midnight-steel' | 'midnight-emerald')
// Optional 4th arg: opts = { stars: true, blackhole: true, starId: 'starCanvas' }
// Omitted entirely by every page except index.html, so their rendering is unchanged.
function initBg(bgId, shardId, palette, opts) {
  opts = opts || {};
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
    teal: {
      bgBase: '#d0e8e5',
      coreStops:[
        [0,'rgba(255,255,255,0.85)'],[0.13,'rgba(240,255,252,0.73)'],
        [0.27,'rgba(210,248,244,0.60)'],[0.43,'rgba(165,235,228,0.44)'],
        [0.64,'rgba(90,200,190,0.27)'],[0.79,'rgba(20,160,148,0.11)'],
        [0.93,'rgba(5,100,90,0.03)'],[1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'240,255,252',b:'210,248,244'},{r:'140,228,218',g:'110,213,200',b:'80,195,180'},{r:'20,184,166',g:'13,148,136',b:'15,118,110'}],
      vig:['rgba(200,245,240,0)','rgba(20,160,148,0.03)','rgba(5,100,90,0.08)','rgba(0,40,35,0.17)'],
      shard:[
        {f:[15,118,110], s:[45,212,191],  fw:0.18, sw:1.0, lw:1.2},
        {f:[20,184,166], s:[153,246,228], fw:0.10, sw:1.5, lw:0.8},
        {f:[153,246,228],s:[240,253,250], fw:0.06, sw:2.1, lw:1.6},
      ],
    },
    purple: {
      bgBase: '#e2d4ee',
      coreStops:[
        [0,'rgba(255,255,255,0.85)'],[0.13,'rgba(252,246,255,0.73)'],
        [0.27,'rgba(244,228,255,0.60)'],[0.43,'rgba(228,196,254,0.44)'],
        [0.64,'rgba(192,120,250,0.27)'],[0.79,'rgba(147,51,234,0.11)'],
        [0.93,'rgba(107,33,168,0.03)'],[1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'252,246,255',b:'244,228,255'},{r:'216,164,254',g:'192,120,250',b:'168,80,247'},{r:'126,34,206',g:'107,33,168',b:'88,28,135'}],
      vig:['rgba(238,216,255,0)','rgba(147,51,234,0.03)','rgba(107,33,168,0.08)','rgba(50,10,80,0.17)'],
      shard:[
        {f:[107,33,168], s:[216,164,254], fw:0.18, sw:1.0, lw:1.2},
        {f:[168,80,247], s:[232,202,255], fw:0.10, sw:1.5, lw:0.8},
        {f:[232,202,255],s:[249,240,255], fw:0.06, sw:2.1, lw:1.6},
      ],
    },
    indigo: {
      bgBase: '#d8d5ee',
      coreStops:[
        [0,'rgba(255,255,255,0.85)'],[0.13,'rgba(246,244,255,0.73)'],
        [0.27,'rgba(230,222,255,0.60)'],[0.43,'rgba(200,183,252,0.44)'],
        [0.64,'rgba(140,100,246,0.27)'],[0.79,'rgba(79,70,229,0.11)'],
        [0.93,'rgba(55,48,163,0.03)'],[1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,255,255',g:'246,244,255',b:'230,222,255'},{r:'196,171,252',g:'167,138,250',b:'138,105,248'},{r:'79,70,229',g:'67,56,202',b:'55,48,163'}],
      vig:['rgba(218,212,252,0)','rgba(79,70,229,0.03)','rgba(55,48,163,0.08)','rgba(20,10,80,0.17)'],
      shard:[
        {f:[55,48,163], s:[138,105,248],  fw:0.18, sw:1.0, lw:1.2},
        {f:[99,102,241],s:[200,183,252],  fw:0.10, sw:1.5, lw:0.8},
        {f:[200,183,252],s:[237,233,254], fw:0.06, sw:2.1, lw:1.6},
      ],
    },
    midnight: {
      bgBase: '#100e0c',
      coreStops:[
        [0,'rgba(255,200,80,0.09)'],[0.14,'rgba(220,160,50,0.06)'],
        [0.30,'rgba(180,120,20,0.04)'],[0.50,'rgba(120,75,10,0.02)'],
        [0.72,'rgba(60,35,5,0.01)'],[0.90,'rgba(20,10,0,0)'],
        [1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,248,230',g:'255,215,120',b:'212,160,60'},{r:'210,210,205',g:'180,120,30',b:'110,65,5'},{r:'150,148,144',g:'70,40,5',b:'30,16,0'}],
      vig:['rgba(255,200,80,0)','rgba(80,45,5,0.06)','rgba(15,8,0,0.45)','rgba(4,2,0,0.80)'],
      shard:[
        {f:[222,172,68],  s:[255,225,135], fw:0.18, sw:1.0, lw:1.2},
        {f:[202,200,196], s:[242,240,236], fw:0.14, sw:1.3, lw:1.0},
        {f:[175,125,30],  s:[228,188,82],  fw:0.10, sw:1.5, lw:0.8},
        {f:[212,210,206], s:[255,252,248], fw:0.07, sw:2.0, lw:1.4},
        {f:[255,205,92],  s:[255,245,200], fw:0.06, sw:2.2, lw:1.6},
      ],
    },
    'midnight-silver': {
      bgBase: '#0b0c10',
      coreStops:[
        [0,'rgba(200,215,242,0.22)'],[0.14,'rgba(165,180,212,0.14)'],
        [0.30,'rgba(128,145,178,0.08)'],[0.50,'rgba(82,98,130,0.04)'],
        [0.72,'rgba(36,48,68,0.015)'],[0.90,'rgba(10,14,22,0)'],
        [1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'235,240,252',g:'198,208,228',b:'158,172,198'},{r:'185,195,218',g:'142,155,178',b:'95,108,132'},{r:'112,125,152',g:'62,75,98',b:'28,38,58'}],
      vig:['rgba(190,205,235,0)','rgba(52,68,98,0.14)','rgba(6,9,18,0.54)','rgba(1,2,6,0.86)'],
      shard:[
        {f:[175,188,215], s:[232,238,255], fw:0.22, sw:1.0, lw:1.4},
        {f:[138,152,182], s:[200,210,235], fw:0.16, sw:1.4, lw:1.1},
        {f:[208,215,232], s:[248,250,255], fw:0.12, sw:1.6, lw:0.9},
        {f:[118,132,162], s:[172,182,208], fw:0.09, sw:2.1, lw:1.5},
        {f:[242,245,255], s:[255,255,255], fw:0.07, sw:2.4, lw:1.8},
      ],
    },
    'midnight-bronze': {
      bgBase: '#0f0b08',
      coreStops:[
        [0,'rgba(222,138,48,0.22)'],[0.14,'rgba(185,98,28,0.14)'],
        [0.30,'rgba(145,65,15,0.08)'],[0.50,'rgba(92,40,6,0.035)'],
        [0.72,'rgba(45,16,1,0.015)'],[0.90,'rgba(15,4,0,0)'],
        [1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'255,228,178',g:'235,162,82',b:'195,112,35'},{r:'198,138,75',g:'158,92,30',b:'105,55,8'},{r:'135,82,25',g:'82,42,5',b:'42,18,0'}],
      vig:['rgba(222,128,42,0)','rgba(72,28,2,0.15)','rgba(14,5,0,0.54)','rgba(2,1,0,0.86)'],
      shard:[
        {f:[195,108,38],  s:[248,178,95],  fw:0.22, sw:1.0, lw:1.4},
        {f:[212,188,162], s:[248,235,218], fw:0.16, sw:1.4, lw:1.1},
        {f:[162,82,28],   s:[222,152,72],  fw:0.12, sw:1.6, lw:0.9},
        {f:[232,208,178], s:[255,242,225], fw:0.09, sw:2.1, lw:1.5},
        {f:[252,198,118], s:[255,235,182], fw:0.07, sw:2.4, lw:1.8},
      ],
    },
    'midnight-steel': {
      bgBase: '#080b12',
      coreStops:[
        [0,'rgba(68,142,238,0.22)'],[0.14,'rgba(45,98,192,0.14)'],
        [0.30,'rgba(28,62,152,0.08)'],[0.50,'rgba(12,32,98,0.035)'],
        [0.72,'rgba(4,12,48,0.015)'],[0.90,'rgba(1,3,20,0)'],
        [1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'198,222,255',g:'148,192,248',b:'92,145,222'},{r:'168,202,248',g:'112,158,228',b:'55,108,198'},{r:'118,158,222',g:'62,105,188',b:'25,58,145'}],
      vig:['rgba(52,122,225,0)','rgba(10,30,85,0.15)','rgba(2,6,25,0.54)','rgba(0,1,10,0.86)'],
      shard:[
        {f:[38,95,188],   s:[105,168,255], fw:0.22, sw:1.0, lw:1.4},
        {f:[178,202,235], s:[220,235,255], fw:0.16, sw:1.4, lw:1.1},
        {f:[62,132,228],  s:[148,202,255], fw:0.12, sw:1.6, lw:0.9},
        {f:[198,215,240], s:[238,245,255], fw:0.09, sw:2.1, lw:1.5},
        {f:[122,178,248], s:[188,225,255], fw:0.07, sw:2.4, lw:1.8},
      ],
    },
    'midnight-emerald': {
      bgBase: '#080f0a',
      coreStops:[
        [0,'rgba(48,188,98,0.22)'],[0.14,'rgba(28,148,68,0.14)'],
        [0.30,'rgba(14,105,42,0.08)'],[0.50,'rgba(5,55,20,0.035)'],
        [0.72,'rgba(1,22,6,0.015)'],[0.90,'rgba(0,6,1,0)'],
        [1,'rgba(0,0,0,0)'],
      ],
      lines:[{r:'185,245,212',g:'122,215,158',b:'62,178,102'},{r:'155,215,178',g:'85,172,118',b:'35,132,68'},{r:'92,162,118',g:'35,118,62',b:'10,65,28'}],
      vig:['rgba(35,168,85,0)','rgba(5,40,15,0.15)','rgba(0,10,2,0.54)','rgba(0,2,0,0.86)'],
      shard:[
        {f:[18,108,55],   s:[65,198,122],  fw:0.22, sw:1.0, lw:1.4},
        {f:[162,215,188], s:[208,242,222], fw:0.16, sw:1.4, lw:1.1},
        {f:[40,152,85],   s:[98,218,152],  fw:0.12, sw:1.6, lw:0.9},
        {f:[192,225,205], s:[228,248,235], fw:0.09, sw:2.1, lw:1.5},
        {f:[82,198,132],  s:[145,232,178], fw:0.07, sw:2.4, lw:1.8},
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

  // ── STARFIELD + GARGANTUA (opt-in; index.html only) ───────────────
  // TO REMOVE COMPLETELY: delete the 4th argument from index.html's initBg
  // call — `,{stars:true,blackhole:true}` — and this entire block goes
  // dormant. One edit, no other file touched. At runtime, ?stars=off does
  // the same thing without editing anything.
  //
  // Lives on its own DPR-scaled canvas so #bgCanvas keeps rendering at 1x
  // exactly as before — fine stars need real pixels, the speed lines don't.
  let starResize = null;
  if (opts.stars) {
    const stc = document.getElementById(opts.starId || 'starCanvas');
    if (stc) {
      const stx  = stc.getContext('2d');
      const q    = new URLSearchParams(location.search);
      const off  = q.get('stars') === 'off';
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const num  = (k, d) => { const v = parseFloat(q.get(k)); return isNaN(v) ? d : v; };

      const COUNT = Math.max(0, Math.round(num('stars', 420)));
      const BH_ON = (opts.blackhole || q.get('bh') === 'on') && q.get('bh') !== 'off';
      const BH_SC = num('bh',   1);
      const BH_X  = num('bhx',  0.5);
      const BH_Y  = num('bhy',  0.5);
      const TILT   = num('tilt',  0.14); // 0 = perfectly edge-on, 1 = face-on
      const SPIN   = num('spin',  1);
      const ANG    = num('ang',  -0.32); // diagonal tilt of the whole assembly

      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      const TAU = Math.PI * 2;
      // cream · gold · pale blue · warm white
      const HUES = [[240,235,226], [212,160,74], [168,196,232], [255,246,230]];

      let TW, TH, stars = [], dots = [], spikes = [];
      let bands = [], dust = null, wing = null, motes = [], gas = [];
      let RS = 0, DO = 0, DI = 0, tt = 0;
      let smx = 0, smy = 0, tmx = 0, tmy = 0;

      // ── star sprites: soft point, and a bright one with diffraction spikes
      function mkGlow(rgb, S) {
        const c = document.createElement('canvas');
        c.width = c.height = S;
        const x = c.getContext('2d'), h = S / 2;
        const g = x.createRadialGradient(h, h, 0, h, h, h);
        g.addColorStop(0,    `rgba(${rgb},1)`);
        g.addColorStop(0.16, `rgba(${rgb},0.85)`);
        g.addColorStop(0.40, `rgba(${rgb},0.22)`);
        g.addColorStop(1,    `rgba(${rgb},0)`);
        x.fillStyle = g; x.fillRect(0, 0, S, S);
        return c;
      }
      function mkSpike(rgb, S) {
        const c = document.createElement('canvas');
        c.width = c.height = S;
        const x = c.getContext('2d'), h = S / 2, w = Math.max(1, 1.1 * DPR);
        const g = x.createRadialGradient(h, h, 0, h, h, h * 0.4);
        g.addColorStop(0,   `rgba(${rgb},1)`);
        g.addColorStop(0.3, `rgba(${rgb},0.55)`);
        g.addColorStop(1,   `rgba(${rgb},0)`);
        x.fillStyle = g; x.fillRect(0, 0, S, S);
        for (let i = 0; i < 2; i++) {
          const lg = i ? x.createLinearGradient(0, h, S, h)
                       : x.createLinearGradient(h, 0, h, S);
          lg.addColorStop(0,    `rgba(${rgb},0)`);
          lg.addColorStop(0.5,  `rgba(${rgb},0.7)`);
          lg.addColorStop(1,    `rgba(${rgb},0)`);
          x.fillStyle = lg;
          if (i) x.fillRect(0, h - w / 2, S, w);
          else   x.fillRect(h - w / 2, 0, w, S);
        }
        return c;
      }
      function buildSprites() {
        dots   = HUES.map(h => mkGlow(h.join(','),  Math.ceil(18 * DPR)));
        spikes = HUES.map(h => mkSpike(h.join(','), Math.ceil(46 * DPR)));
      }

      function seed() {
        stars = [];
        const hx = TW / 2, hy = TH / 2, maxD = Math.hypot(hx, hy) || 1;
        for (let i = 0; i < COUNT; i++) {
          const x = Math.random() * TW, y = Math.random() * TH;
          const d = Math.hypot(x - hx, y - hy) / maxD;
          const roll = Math.random();
          const spiked = roll > 0.966;           // ~3% headline stars
          const big    = !spiked && roll > 0.86;
          stars.push({
            x, y, spiked,
            r: spiked ? 3.0 + Math.random() * 2.2
             : big    ? 1.4 + Math.random() * 1.1
             :          0.45 + Math.random() * 0.85,
            a: (spiked ? 0.55 + Math.random() * 0.40
                       : 0.26 + Math.random() * 0.50) * (1 - Math.pow(d, 2.2) * 0.55),
            ph: Math.random() * TAU,
            sp: 0.4 + Math.random() * 1.7,
            hue: Math.random() < 0.60 ? 0 : Math.random() < 0.55 ? 1
               : Math.random() < 0.50 ? 2 : 3,
            depth: 0.25 + Math.random() * 0.75,
          });
        }
      }

      // ── Gargantua ─────────────────────────────────────────────────
      // The look comes from lensing, not from a flat ring: the FAR side of
      // the accretion disk is bent up and over the event horizon (the big
      // arc), the NEAR side crosses flat in front of it, and a third lensed
      // image wraps underneath. The whole assembly is tilted diagonally.
      // Dust orbits and spirals inward on Keplerian-ish paths.
      function buildBH() {
        RS = Math.min(TW, TH) * 0.455 * BH_SC;    // event horizon — dominates the frame
        DO = RS * 2.20;                          // wide enough for a FLAT arc to clear it
        DI = RS * 1.05;                          // disk inner edge, hugging the horizon
        // Soft art: render the textures below device resolution and let the
        // GPU scale them up. Keeps them off the multi-megapixel-per-frame path.
        const TEX = Math.min(DPR, 1.1, 1000 / (DO * 2));
        const S = Math.ceil(DO * 2 * TEX);

        // Four bands of fine filaments; each spins at its own rate so the
        // inner disk shears past the outer one.
        const spans = [[DI, DI + (DO - DI) * 0.40],
                       [DI + (DO - DI) * 0.30, DI + (DO - DI) * 0.72],
                       [DI + (DO - DI) * 0.60, DO]];

        bands = spans.map(([r0, r1], bi) => {
          const c = document.createElement('canvas');
          c.width = c.height = S;
          const x = c.getContext('2d');
          x.scale(TEX, TEX); x.translate(DO, DO);
          const heat = 1 - bi / spans.length;      // inner = whiter/hotter

          const g = x.createRadialGradient(0, 0, r0, 0, 0, r1);
          g.addColorStop(0,    `rgba(255,${240 - bi * 14},${205 - bi * 40},${0.34 + heat * 0.3})`);
          g.addColorStop(0.35, `rgba(255,${206 - bi * 18},${120 - bi * 30},${0.24 + heat * 0.2})`);
          g.addColorStop(0.75, `rgba(${238 - bi * 16},${140 - bi * 22},${48},0.14)`);
          g.addColorStop(1,    'rgba(170,80,20,0)');
          x.beginPath(); x.arc(0, 0, r1, 0, TAU); x.arc(0, 0, r0, 0, TAU, true);
          x.fillStyle = g; x.fill();

          // combed filaments — long, thin, slightly offset radii
          for (let i = 0; i < 240; i++) {
            const a0 = Math.random() * TAU;
            const w  = 0.5 + Math.random() * 2.6;                 // long sweeps
            const rr = r0 + Math.random() * (r1 - r0);
            const th = (r1 - r0) * (0.008 + Math.random() * 0.05);
            const al = (0.05 + Math.random() * 0.22) * (0.5 + heat * 0.7);
            x.beginPath();
            x.arc(0, 0, rr, a0, a0 + w);
            x.strokeStyle = `rgba(255,${228 - Math.random() * 60},${170 - Math.random() * 90},${al})`;
            x.lineWidth = th;
            x.stroke();
          }
          return c;
        });

        // soft warm bloom that sits under everything
        // Diagonal wing: bright at the two edge-on tips, falling off softly
        // in every direction. Built as a texture because a filled rect leaves
        // hard edges slicing across the sphere.
        const WW = Math.ceil(DO * 2 * TEX), WH = Math.ceil(DO * 0.62 * TEX);
        wing = document.createElement('canvas');
        wing.width = WW; wing.height = WH;
        const wx = wing.getContext('2d');
        const wg = wx.createLinearGradient(0, 0, WW, 0);
        wg.addColorStop(0,    'rgba(255,236,190,0)');
        wg.addColorStop(0.08, 'rgba(255,250,232,0.95)');
        wg.addColorStop(0.24, 'rgba(255,206,130,0.20)');
        wg.addColorStop(0.5,  'rgba(255,190,100,0.04)');
        wg.addColorStop(0.76, 'rgba(255,206,130,0.20)');
        wg.addColorStop(0.92, 'rgba(255,250,232,0.95)');
        wg.addColorStop(1,    'rgba(255,236,190,0)');
        wx.fillStyle = wg; wx.fillRect(0, 0, WW, WH);
        wx.globalCompositeOperation = 'destination-in';
        const wv = wx.createLinearGradient(0, 0, 0, WH);
        wv.addColorStop(0,    'rgba(0,0,0,0)');
        wv.addColorStop(0.5,  'rgba(0,0,0,1)');
        wv.addColorStop(1,    'rgba(0,0,0,0)');
        wx.fillStyle = wv; wx.fillRect(0, 0, WW, WH);

        // a single soft dot reused for dust and gas
        const PS = Math.ceil(28 * DPR);
        dust = document.createElement('canvas');
        dust.width = dust.height = PS;
        const px = dust.getContext('2d'); const ph = PS / 2;
        const pg = px.createRadialGradient(ph, ph, 0, ph, ph, ph);
        pg.addColorStop(0,   'rgba(255,246,220,1)');
        pg.addColorStop(0.3, 'rgba(255,206,130,0.5)');
        pg.addColorStop(1,   'rgba(255,170,70,0)');
        px.fillStyle = pg; px.fillRect(0, 0, PS, PS);

        seedDust();
      }

      // Dust + gas: orbit, and spiral inward. Angular speed rises as radius
      // falls, so material visibly winds up as it falls toward the horizon.
      function seedDust() {
        motes = [];
        const N = Math.round(190 * (calm ? 0.4 : 1));
        for (let i = 0; i < N; i++) motes.push(mkMote(true));
        gas = [];
        for (let i = 0; i < 14; i++) {
          gas.push({
            a: Math.random() * TAU,
            r: DI + Math.random() * (DO - DI),
            s: (0.10 + Math.random() * 0.16) * (Math.random() < 0.5 ? 1 : 1),
            sz: RS * (0.55 + Math.random() * 1.5),
            al: 0.05 + Math.random() * 0.11,
            lift: (Math.random() - 0.5) * 0.5,
          });
        }
      }
      function mkMote(spread) {
        const r = spread ? DI + Math.random() * (DO - DI) * 1.15
                         : DO * (0.92 + Math.random() * 0.25);
        return {
          a: Math.random() * TAU,
          r,
          sz: 0.7 + Math.random() * 2.4,
          al: 0.25 + Math.random() * 0.6,
          lift: (Math.random() - 0.5) * 0.34,   // out-of-plane wobble
          w: 0.6 + Math.random() * 0.9,
        };
      }
      function stepDust(dt) {
        for (const p of motes) {
          p.a += dt * p.w * 2.6 * Math.pow(RS / Math.max(p.r, RS * 0.6), 1.5);
          p.r -= dt * 5.2 * Math.pow(RS / Math.max(p.r, RS * 0.6), 0.55);
          if (p.r <= RS * 1.06) Object.assign(p, mkMote(false));
        }
        for (const g2 of gas) {
          g2.a += dt * g2.s * Math.pow(RS / Math.max(g2.r, RS), 1.2);
          g2.r -= dt * 0.9;
          if (g2.r <= DI * 0.9) { g2.r = DO * (0.9 + Math.random() * 0.3); g2.a = Math.random() * TAU; }
        }
      }

      // Draw the ring bands into whatever squash the caller has set up.
      function ringBands(spin, limit) {
        const rates = [1, 0.6, 0.38];
        const n = Math.min(limit || bands.length, bands.length);
        for (let i = 0; i < n; i++) {
          stx.save(); stx.rotate(spin * rates[i]);
          stx.drawImage(bands[i], -DO, -DO, DO * 2, DO * 2);
          stx.restore();
        }
      }
      // Seen edge-on, the disk is far brighter at its two diagonal tips than
      // it is face-on — that concentration is what keeps it from reading as a
      // uniform blob of glow.
      function wings() {
        stx.drawImage(wing, -DO, -DO * 0.31, DO * 2, DO * 0.62);
      }
      function halfClip(top) {
        stx.beginPath();
        stx.rect(-DO * 1.6, top ? -DO * 1.6 : 0, DO * 3.2, DO * 1.6);
        stx.clip();
      }
      function motesHalf(front) {
        stx.save(); stx.scale(1, TILT);
        for (const p of motes) {
          const sy = Math.sin(p.a);
          if ((sy > 0) !== front) continue;       // near half vs far half
          const d = p.sz * 5.5;
          stx.globalAlpha = p.al * Math.min(1, (p.r - RS) / (RS * 0.9));
          stx.drawImage(dust,
            Math.cos(p.a) * p.r - d / 2,
            sy * p.r + p.lift * RS - d / 2, d, d);
        }
        stx.globalAlpha = 1; stx.restore();
      }
      function gasHalf(front) {
        stx.save(); stx.scale(1, TILT * 2.6);
        for (const g2 of gas) {
          const sy = Math.sin(g2.a);
          if ((sy > 0) !== front) continue;
          const d = g2.sz * 2;
          stx.globalAlpha = g2.al;
          stx.drawImage(dust,
            Math.cos(g2.a) * g2.r - d / 2,
            sy * g2.r + g2.lift * RS - d / 2, d, d);
        }
        stx.globalAlpha = 1; stx.restore();
      }

      function drawBH() {
        const spin = calm ? 0.6 : tt * 0.075 * SPIN;
        stx.save();
        stx.translate(TW * BH_X, TH * BH_Y);
        stx.rotate(ANG);
        stx.globalCompositeOperation = 'lighter';

        gasHalf(false);
        // Far half of the disk: flat, running straight behind the horizon.
        stx.save(); stx.scale(1, TILT); ringBands(spin); stx.restore();
        motesHalf(false);

        // event horizon — not pure black; light bends around it
        stx.globalCompositeOperation = 'source-over';
        const sh = stx.createRadialGradient(0, 0, RS * 0.1, 0, 0, RS);
        sh.addColorStop(0,    '#0b0907');
        sh.addColorStop(0.55, '#050403');
        sh.addColorStop(0.88, '#010101');
        sh.addColorStop(1,    '#000000');
        stx.beginPath(); stx.arc(0, 0, RS, 0, TAU);
        stx.fillStyle = sh; stx.fill();

        stx.globalCompositeOperation = 'lighter';
        // NEAR side crossing flat in front
        stx.save(); halfClip(false); stx.scale(1, TILT); ringBands(spin); stx.restore();
        wings();
        motesHalf(true);
        gasHalf(true);

        stx.restore();
        stx.globalCompositeOperation = 'source-over';
      }

      function sizeStars() {
        TW = window.innerWidth; TH = window.innerHeight;
        stc.width  = Math.round(TW * DPR);
        stc.height = Math.round(TH * DPR);
        stx.setTransform(DPR, 0, 0, DPR, 0, 0);   // draw in CSS px, render at DPR
      }

      if (!calm) {
        window.addEventListener('mousemove', e => {
          tmx = (e.clientX / window.innerWidth  - 0.5) * 2;
          tmy = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });
      }

      function paint() {
        stx.setTransform(DPR, 0, 0, DPR, 0, 0);
        stx.clearRect(0, 0, TW, TH);
        smx += (tmx - smx) * 0.06;
        smy += (tmy - smy) * 0.06;

        // Gravitational lensing of the background field. Light passing close
        // to the horizon is bent outward, so the star field opens into a void
        // around the sphere and the deflected stars pile up into a bright ring
        // just outside it, smeared tangentially into arcs. This is the part
        // that actually reads as spacetime curving.
        const lx = TW * BH_X, ly = TH * BH_Y;
        const K = BH_ON ? Math.pow(RS * 1.42, 2) : 0;
        const REACH2 = Math.pow(RS * 6, 2);

        stx.globalCompositeOperation = 'lighter';
        for (const s of stars) {
          const a = s.a * (0.55 + 0.45 * Math.sin((calm ? 0 : tt * s.sp) + s.ph));
          if (a < 0.012) continue;
          let x = s.x + smx * 12 * s.depth;
          let y = s.y + smy * 12 * s.depth;
          let stretch = 1, rot = 0;
          if (K) {
            const dx = x - lx, dy = y - ly, d2 = dx * dx + dy * dy;
            if (d2 < REACH2) {
              const d = Math.sqrt(d2) || 0.001;
              const k = Math.sqrt(d2 + K) / d;
              x = lx + dx * k; y = ly + dy * k;
              stretch = 1 + (k - 1) * 2.2;
              rot = Math.atan2(dy, dx) + Math.PI / 2;
            }
          }
          const d0 = s.spiked ? s.r * 9 : s.r * 6;
          const spr = s.spiked ? spikes[s.hue] : dots[s.hue];
          stx.globalAlpha = a;
          if (stretch > 1.03) {
            stx.save();
            stx.translate(x, y); stx.rotate(rot);
            stx.scale(Math.min(stretch, 4.5), 1);
            stx.drawImage(spr, -d0 / 2, -d0 / 2, d0, d0);
            stx.restore();
          } else {
            stx.drawImage(spr, x - d0 / 2, y - d0 / 2, d0, d0);
          }
        }
        stx.globalAlpha = 1;
        stx.globalCompositeOperation = 'source-over';
        if (BH_ON) drawBH();
      }

      function loop() {
        tt += 0.016;
        if (BH_ON) stepDust(0.016);
        paint();
        requestAnimationFrame(loop);
      }

      if (!off) {
        buildSprites(); sizeStars(); seed(); if (BH_ON) buildBH(); paint();
        if (!calm) loop();                        // reduced motion: one static frame
        starResize = () => { sizeStars(); seed(); if (BH_ON) buildBH(); paint(); };
      }
    }
  }

  window.addEventListener('resize', () => {
    resizeBg();
    SW = sc.width  = window.innerWidth;
    SH = sc.height = window.innerHeight;
    buildShards();
    if (starResize) starResize();
  });
}
