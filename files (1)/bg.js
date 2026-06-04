// AUX — shared background engine
// initBg('bgCanvasId', 'shardCanvasId', 'amber' | 'blue' | 'violet')
function initBg(bgId, shardId, palette) {
  const palettes = {
    amber: {
      bgBase: '#ddd8d2',
      coreStops: [
        [0,    'rgba(255,255,255,0.85)'],[0.12,'rgba(255,252,240,0.75)'],
        [0.25, 'rgba(255,244,210,0.62)'],[0.42,'rgba(255,225,160,0.45)'],
        [0.62, 'rgba(255,195,90,0.28)'], [0.78,'rgba(220,140,30,0.12)'],
        [0.92, 'rgba(160,80,0,0.04)'],   [1,   'rgba(60,20,0,0)'],
      ],
      lines: [{r:'255,255,255',g:'255,250,230',b:'255,240,200'},{r:'255,195,80',g:'255,175,50',b:'240,140,20'},{r:'210,110,10',g:'200,100,0',b:'184,82,0'}],
      vig: ['rgba(255,235,190,0)','rgba(190,120,30,0.04)','rgba(70,25,0,0.09)','rgba(20,8,0,0.18)'],
      maskRGB: '221,216,210',
    },
    blue: {
      bgBase: '#dce5f2',
      coreStops: [
        [0,    'rgba(255,255,255,0.82)'],[0.14,'rgba(245,248,255,0.70)'],
        [0.28, 'rgba(220,232,255,0.58)'],[0.45,'rgba(180,210,255,0.42)'],
        [0.65, 'rgba(120,170,255,0.25)'],[0.80,'rgba(60,110,240,0.10)'],
        [0.93, 'rgba(20,50,180,0.03)'],  [1,   'rgba(0,0,0,0)'],
      ],
      lines: [{r:'255,255,255',g:'240,245,255',b:'220,235,255'},{r:'150,190,255',g:'120,170,255',b:'90,140,255'},{r:'80,120,240',g:'60,100,220',b:'40,80,200'}],
      vig: ['rgba(200,220,255,0)','rgba(80,130,255,0.03)','rgba(20,50,180,0.08)','rgba(5,15,80,0.16)'],
      maskRGB: '220,229,242',
    },
    violet: {
      bgBase: '#e6f1e8',
      coreStops: [
        [0,    'rgba(255,255,255,0.80)'],[0.13,'rgba(250,255,252,0.68)'],
        [0.26, 'rgba(230,248,235,0.56)'],[0.42,'rgba(195,240,210,0.42)'],
        [0.63, 'rgba(140,220,165,0.26)'],[0.79,'rgba(80,190,120,0.10)'],
        [0.92, 'rgba(30,150,80,0.03)'],  [1,   'rgba(0,0,0,0)'],
      ],
      lines: [{r:'255,255,255',g:'245,255,248',b:'228,248,235'},{r:'180,240,200',g:'155,225,180',b:'130,210,160'},{r:'100,200,140',g:'80,180,120',b:'60,160,100'}],
      vig: ['rgba(210,245,220,0)','rgba(80,190,120,0.03)','rgba(20,150,70,0.08)','rgba(5,60,20,0.16)'],
      maskRGB: '230,241,232',
    },
  };

  const P = palettes[palette] || palettes.amber;

  // ── BG + SPEED LINES ──
  const bg = document.getElementById(bgId);
  const bx = bg.getContext('2d');
  let W, H, cx, cy;

  function resize() {
    W = bg.width  = window.innerWidth;
    H = bg.height = window.innerHeight;
    cx = W / 2; cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

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
  for (let i = 0; i < NUM; i++) { const l = mkLine(); l.r = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.65; lines.push(l); }

  function maxR() { return Math.sqrt(cx*cx + cy*cy) * 1.35; }

  function drawBg() {
    bx.clearRect(0, 0, W, H);
    bx.fillStyle = P.bgBase;
    bx.fillRect(0, 0, W, H);
    const core = bx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W,H) * 0.62);
    P.coreStops.forEach(([t,c]) => core.addColorStop(t, c));
    bx.fillStyle = core; bx.fillRect(0, 0, W, H);

    bx.save(); bx.translate(cx, cy);
    for (const l of lines) {
      l.r += l.speed * (1 + l.r / 110);
      if (l.r > maxR()) Object.assign(l, mkLine());
      const x1 = Math.cos(l.angle)*l.r, y1 = Math.sin(l.angle)*l.r;
      const x2 = Math.cos(l.angle)*(l.r+l.len), y2 = Math.sin(l.angle)*(l.r+l.len);
      const a = l.alpha * Math.min(1, l.r/32) * Math.max(0, 1-(l.r/maxR())*1.15);
      if (a < 0.015) continue;
      const lc = P.lines[l.ci];
      const g = bx.createLinearGradient(x1,y1,x2,y2);
      g.addColorStop(0, `rgba(${lc.r},0)`);
      g.addColorStop(0.35, `rgba(${lc.g},${a*0.5})`);
      g.addColorStop(1, `rgba(${lc.b},${a})`);
      bx.beginPath(); bx.moveTo(x1,y1); bx.lineTo(x2,y2);
      bx.strokeStyle = g; bx.lineWidth = l.w; bx.stroke();
    }
    bx.restore();

    const vig = bx.createRadialGradient(cx,cy,Math.min(W,H)*0.28, cx,cy,Math.max(W,H)*0.76);
    [0, 0.5, 0.8, 1].forEach((t,i) => vig.addColorStop(t, P.vig[i]));
    bx.fillStyle = vig; bx.fillRect(0, 0, W, H);
    requestAnimationFrame(drawBg);
  }
  drawBg();

  // ── GLASS SHARDS ──
  const sc = document.getElementById(shardId);
  const sx = sc.getContext('2d');
  let SW, SH, shards = [], sT = 0;
  const rnd = (a,b) => a + Math.random()*(b-a);

  function buildShards() {
    SW = sc.width = window.innerWidth;
    SH = sc.height = window.innerHeight;
    shards = [];
    const sp = Math.min(SW, SH) * 0.40;
    const clusters = [[0,0,22],[SW,0,22],[0,SH,20],[SW,SH,20],[SW/2,0,10],[SW/2,SH,10],[0,SH/2,8],[SW,SH/2,8]];
    for (const [ax,ay,cnt] of clusters) {
      for (let i = 0; i < cnt; i++) {
        const t = Math.pow(Math.random(), 0.55);
        const a = rnd(0, Math.PI*2), d = rnd(0, sp)*t;
        const px = ax + Math.cos(a)*d, py = ay + Math.sin(a)*d;
        const sides = 3 + Math.floor(rnd(0,3));
        const len = rnd(sp*0.1, sp*0.52), rot = rnd(0, Math.PI*2), sharp = rnd(0.3, 0.8);
        const pts = [];
        for (let s = 0; s < sides; s++) {
          const sa = (s/sides)*Math.PI*2 + rot;
          const r = s%2===0 ? len : len*sharp*rnd(0.1,0.4);
          pts.push([px+Math.cos(sa)*r, py+Math.sin(sa)*r]);
        }
        shards.push({ pts, alpha: rnd(0.06,0.26), type: Math.floor(rnd(0,3)), dA: rnd(0,Math.PI*2), dS: rnd(0.0002,0.0006), dR: rnd(2,8) });
      }
    }
  }
  buildShards();

  function drawShards() {
    SW = sc.width = window.innerWidth; SH = sc.height = window.innerHeight;
    sx.clearRect(0, 0, SW, SH); sT += 0.008;
    for (const sh of shards) {
      if (sh.pts.length < 3) continue;
      const dx = Math.cos(sh.dA + sT*sh.dS*100)*sh.dR;
      const dy = Math.sin(sh.dA + sT*sh.dS*80)*sh.dR*0.7;
      sx.beginPath();
      sx.moveTo(sh.pts[0][0]+dx, sh.pts[0][1]+dy);
      for (let i = 1; i < sh.pts.length; i++) sx.lineTo(sh.pts[i][0]+dx, sh.pts[i][1]+dy);
      sx.closePath();
      if (sh.type===0) { sx.fillStyle=`rgba(30,5,60,${sh.alpha})`; sx.fill(); sx.strokeStyle=`rgba(100,40,180,${sh.alpha*1.7})`; sx.lineWidth=0.7; sx.stroke(); }
      else if (sh.type===1) { sx.fillStyle=`rgba(65,15,120,${sh.alpha*0.75})`; sx.fill(); sx.strokeStyle=`rgba(148,70,240,${sh.alpha*1.9})`; sx.lineWidth=0.5; sx.stroke(); }
      else { sx.fillStyle=`rgba(140,80,230,${sh.alpha*0.3})`; sx.fill(); sx.strokeStyle=`rgba(200,155,255,${sh.alpha*2.6})`; sx.lineWidth=1.1; sx.stroke(); }
    }
    const mask = sx.createRadialGradient(SW/2,SH/2,Math.min(SW,SH)*0.14, SW/2,SH/2,Math.min(SW,SH)*0.56);
    const m = P.maskRGB;
    mask.addColorStop(0,`rgba(${m},1)`); mask.addColorStop(0.42,`rgba(${m},0.88)`);
    mask.addColorStop(0.72,`rgba(${m},0.28)`); mask.addColorStop(1,`rgba(${m},0)`);
    sx.globalCompositeOperation = 'destination-out';
    sx.fillStyle = mask; sx.fillRect(0,0,SW,SH);
    sx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(drawShards);
  }
  drawShards();

  window.addEventListener('resize', () => { resize(); buildShards(); });
}
