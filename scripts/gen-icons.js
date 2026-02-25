const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(w, h, drawFn) {
  const px = Buffer.alloc(w * h * 4, 0);
  drawFn(px, w, h);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihd = Buffer.alloc(13);
  ihd.writeUInt32BE(w, 0);
  ihd.writeUInt32BE(h, 4);
  ihd[8] = 8;
  ihd[9] = 6;
  const raw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 4)] = 0;
    px.copy(raw, y * (1 + w * 4) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const comp = zlib.deflateSync(raw, { level: 9 });
  function chunk(t, d) {
    const l = Buffer.alloc(4);
    l.writeUInt32BE(d.length);
    const tb = Buffer.from(t);
    const ci = Buffer.concat([tb, d]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc32(ci));
    return Buffer.concat([l, tb, d, c]);
  }
  return Buffer.concat([sig, chunk('IHDR', ihd), chunk('IDAT', comp), chunk('IEND', Buffer.alloc(0))]);
}

function crc32(b) {
  let t = crc32.t;
  if (!t) {
    t = crc32.t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[i] = c;
    }
  }
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function sp(p, w, x, y, r, g, b, a) {
  if (x < 0 || x >= w || y < 0) return;
  const i = (y * w + x) * 4;
  if (i + 3 >= p.length) return;
  const sa = a / 255;
  const da = p[i + 3] / 255;
  const oa = sa + da * (1 - sa);
  if (oa > 0) {
    p[i] = Math.round((r * sa + p[i] * da * (1 - sa)) / oa);
    p[i + 1] = Math.round((g * sa + p[i + 1] * da * (1 - sa)) / oa);
    p[i + 2] = Math.round((b * sa + p[i + 2] * da * (1 - sa)) / oa);
    p[i + 3] = Math.round(oa * 255);
  }
}

function draw(p, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const R = w / 2;
  // Circle background - navy/teal
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const d = Math.sqrt((x - cx + 0.5) ** 2 + (y - cy + 0.5) ** 2);
      if (d <= R - 1) {
        const t = d / R;
        sp(p, w, x, y, Math.round(30 - 20 * t * t), Math.round(58 + 34 * t * t), Math.round(95 - 10 * t * t), 255);
      } else if (d <= R) {
        sp(p, w, x, y, 10, 92, 85, Math.max(0, Math.round((R - d) * 255)));
      }
    }
  // Q ring
  const qR = R * 0.34;
  const qT = R * 0.1;
  const qI = qR - qT;
  const qX = cx;
  const qY = cy - R * 0.03;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const d = Math.sqrt((x - qX + 0.5) ** 2 + (y - qY + 0.5) ** 2);
      if (d >= qI - 1 && d <= qR + 1) {
        let a = 255;
        if (d > qR - 1) a = Math.min(a, Math.round((qR - d + 1) * 255));
        if (d < qI + 1) a = Math.min(a, Math.round((d - qI + 1) * 255));
        a = Math.max(0, Math.min(255, a));
        if (a > 0) sp(p, w, x, y, 255, 255, 255, a);
      }
    }
  // Q tail
  const sx = qX + qR * 0.3;
  const sy = qY + qR * 0.5;
  const ex = qX + qR * 0.9;
  const ey = qY + qR * 1.2;
  const dx = ex - sx;
  const dy = ey - sy;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ht = qT * 0.6;
  for (let y = Math.max(0, Math.floor(Math.min(sy, ey) - ht - 2)); y <= Math.min(h - 1, Math.ceil(Math.max(sy, ey) + ht + 2)); y++)
    for (let x = Math.max(0, Math.floor(Math.min(sx, ex) - ht - 2)); x <= Math.min(w - 1, Math.ceil(Math.max(sx, ex) + ht + 2)); x++) {
      const t = Math.max(0, Math.min(1, ((x + 0.5 - sx) * dx + (y + 0.5 - sy) * dy) / (len * len)));
      const d = Math.sqrt((x + 0.5 - sx - t * dx) ** 2 + (y + 0.5 - sy - t * dy) ** 2);
      if (d <= ht + 1) {
        let a = 255;
        if (d > ht - 1) a = Math.round((ht + 1 - d) * 127);
        a = Math.max(0, Math.min(255, a));
        if (a > 0) sp(p, w, x, y, 255, 255, 255, a);
      }
    }
}

const dir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(dir, { recursive: true });
[[192, 'icon-192x192.png'], [512, 'icon-512x512.png'], [180, 'apple-touch-icon.png']].forEach(([s, n]) => {
  const buf = createPNG(s, s, draw);
  fs.writeFileSync(path.join(dir, n), buf);
  console.log(n + ': ' + buf.length + ' bytes');
});
console.log('Done!');
