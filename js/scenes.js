/* Page graphics (vector, miniature-painting style).
   Raja Ravi Varma warmth, Rajasthani-miniature flatness, a riverside ghat at dusk.
   Main scene: a riverside ghat at dusk with a peacock on the landing, boats, swans,
   mixed temple forms, palms and old trees; an ornate bronze dressing table on the terrace
   beside a sandook with a pearl necklace spilling out, and a rabab.
   Everything is inline SVG strings; motion lives in css/style.css. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Scenes = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function n(v) { return Math.round(v * 100) / 100; }
  function seeded(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* shared gradients (prefix p keeps ids unique per svg) */
  /* sheen: a slow travelling light across a gradient (SMIL, so it needs no script; ui.js stops it when off screen or reduced motion) */
  function sheen(dur, amt, begin) {
    return '<animateTransform attributeName="gradientTransform" type="translate" values="-' + amt + ' -' + amt + ';' + amt + ' ' + amt + ';-' + amt + ' -' + amt + '" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="' + dur + 's" begin="' + (begin || 0) + 's" repeatCount="indefinite"/>';
  }
  function common(p, anim) {
    var A = function (d, amt, b) { return anim ? sheen(d, amt, b) : ""; };
    return '' +
      // old gold: bright where the light strikes, a dark oxidised band, a warm return
      '<linearGradient id="' + p + 'brass" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect"><stop offset="0" stop-color="#FFF3BF"/><stop offset=".14" stop-color="#F0CE72"/><stop offset=".32" stop-color="#D0A040"/><stop offset=".46" stop-color="#9C6F24"/><stop offset=".55" stop-color="#6F4A14"/><stop offset=".66" stop-color="#B98C34"/><stop offset=".82" stop-color="#F2D98A"/><stop offset="1" stop-color="#B4812B"/>' + A(9, 0.45, 0) + '</linearGradient>' +
      '<linearGradient id="' + p + 'brassV" x1="0" y1="0" x2="0" y2="1" spreadMethod="reflect"><stop offset="0" stop-color="#FBE7A2"/><stop offset=".22" stop-color="#E0B552"/><stop offset=".5" stop-color="#A97A28"/><stop offset=".68" stop-color="#6E4915"/><stop offset=".86" stop-color="#C79A3E"/><stop offset="1" stop-color="#7C5219"/>' + A(11, 0.4, 1.5) + '</linearGradient>' +
      '<linearGradient id="' + p + 'brassH" x1="0" y1="0" x2="1" y2="0" spreadMethod="reflect"><stop offset="0" stop-color="#6B4515"/><stop offset=".22" stop-color="#F6DD92"/><stop offset=".42" stop-color="#C9953A"/><stop offset=".62" stop-color="#7C5219"/><stop offset=".82" stop-color="#E7C168"/><stop offset="1" stop-color="#5E3C12"/>' + A(13, 0.4, 3) + '</linearGradient>' +
      '<linearGradient id="' + p + 'petal" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF6EA"/><stop offset=".55" stop-color="#F7CBD3"/><stop offset="1" stop-color="#E27A9A"/></linearGradient>' +
      '<linearGradient id="' + p + 'petalD" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F6D7D8"/><stop offset=".6" stop-color="#E58EA6"/><stop offset="1" stop-color="#B8456F"/></linearGradient>' +
      '<radialGradient id="' + p + 'pearl" cx=".34" cy=".3" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".22" stop-color="#FFF9F2"/><stop offset=".5" stop-color="#F4E9EC"/><stop offset=".75" stop-color="#DDE4EE"/><stop offset=".92" stop-color="#C9BCB5"/><stop offset="1" stop-color="#A99B94"/></radialGradient>' +
      '<linearGradient id="' + p + 'pearlIri" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect"><stop offset="0" stop-color="#FFC9D6" stop-opacity=".38"/><stop offset=".35" stop-color="#C4E6FF" stop-opacity=".34"/><stop offset=".65" stop-color="#D2FFDF" stop-opacity=".3"/><stop offset="1" stop-color="#FFE3C4" stop-opacity=".36"/>' + A(7, 0.5, 0) + '</linearGradient>' +
      '<radialGradient id="' + p + 'pearlRim" cx=".62" cy=".66" r=".56"><stop offset=".62" stop-color="#9FD8F0" stop-opacity="0"/><stop offset="1" stop-color="#9FD8F0" stop-opacity=".6"/></radialGradient>' +
      '<radialGradient id="' + p + 'gemR" cx=".34" cy=".3" r=".8"><stop offset="0" stop-color="#FF9AAA"/><stop offset=".45" stop-color="#C41E3C"/><stop offset="1" stop-color="#600A1C"/></radialGradient>' +
      '<radialGradient id="' + p + 'gemG" cx=".34" cy=".3" r=".8"><stop offset="0" stop-color="#86E6BE"/><stop offset=".45" stop-color="#1E8A66"/><stop offset="1" stop-color="#0A3C2C"/></radialGradient>' +
      '<radialGradient id="' + p + 'gemW" cx=".34" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#E4ECF4"/><stop offset="1" stop-color="#8E9AAE"/></radialGradient>' +
      '<linearGradient id="' + p + 'pad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4F8A5E"/><stop offset="1" stop-color="#1D4A3A"/></linearGradient>' +
      '<linearGradient id="' + p + 'bronze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D49A56"/><stop offset=".35" stop-color="#8E5A28"/><stop offset=".7" stop-color="#5A3515"/><stop offset="1" stop-color="#A8723A"/></linearGradient>' +
      '<linearGradient id="' + p + 'bronzeV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98F4E"/><stop offset=".5" stop-color="#7C4D22"/><stop offset="1" stop-color="#3A210D"/></linearGradient>' +
      '<linearGradient id="' + p + 'bronzeH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A210D"/><stop offset=".3" stop-color="#CF9654"/><stop offset=".55" stop-color="#7C4D22"/><stop offset="1" stop-color="#2E1A0A"/></linearGradient>' +
      '<linearGradient id="' + p + 'wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8F4721"/><stop offset="1" stop-color="#5A2A12"/></linearGradient>' +
      '<linearGradient id="' + p + 'glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F8F2"/><stop offset=".5" stop-color="#BFD9D4"/><stop offset="1" stop-color="#7FA9A6"/></linearGradient>';
  }

  /* Catmull-Rom sampling through points */
  function cr(pts, steps) {
    var P = [pts[0]].concat(pts).concat([pts[pts.length - 1]]), out = [];
    for (var i = 1; i < P.length - 2; i++) {
      var p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2];
      for (var s = 0; s < steps; s++) {
        var t = s / steps, t2 = t * t, t3 = t2 * t;
        out.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
        ]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  /* Swan facing right in a 200 x 150 box. Neck is a tapering band along a
     smooth S-curve: forward bulge at the chest, sweep back, head bowed forward. */
  function swan(p, x, y, s, flip, cls) {
    var c = cr([[122, 104], [144, 98], [158, 80], [156, 58], [146, 40], [142, 24], [149, 13]], 14);
    var L = [], R = [];
    for (var i = 0; i < c.length; i++) {
      var a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len, ny = dx / len, t = i / (c.length - 1);
      var w = 3.3 + 6.4 * Math.pow(1 - t, 1.9);
      L.push([c[i][0] + nx * w, c[i][1] + ny * w]);
      R.push([c[i][0] - nx * w, c[i][1] - ny * w]);
    }
    var d = "M" + n(L[0][0]) + " " + n(L[0][1]);
    for (var m = 1; m < L.length; m++) d += "L" + n(L[m][0]) + " " + n(L[m][1]);
    for (var q = R.length - 1; q >= 0; q--) d += "L" + n(R[q][0]) + " " + n(R[q][1]);
    d += "Z";
    var body = "M6 84C20 94 36 88 52 76C70 60 100 54 120 66C132 74 138 88 142 98C154 106 156 118 142 126C122 136 62 138 34 128C18 120 8 104 6 84Z";
    var hx = 153, hy = 13;
    return '<g class="' + (cls || "swan") + '" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + (flip ? -s : s) + ' ' + s + ')"><g class="swan-in">' +
      '<path d="' + d + '" fill="#FBF6EA" stroke="#FBF6EA" stroke-width="1" stroke-linejoin="round"/>' +
      '<path d="' + body + '" fill="#FBF6EA"/>' +
      '<path d="M34 128C60 138 122 136 142 126C150 118 150 108 144 102C124 124 62 124 34 128Z" fill="#E6DAC4" opacity=".7"/>' +
      '<path d="M26 90C46 78 72 72 100 80C84 82 66 90 54 104" fill="none" stroke="#D8C9B0" stroke-width="1.2"/>' +
      '<path d="M42 104C64 90 92 90 116 102C96 100 78 106 64 118" fill="none" stroke="#D8C9B0" stroke-width="1.2"/>' +
      '<path d="M56 118C80 108 104 110 126 120C106 118 88 124 76 132" fill="none" stroke="#E1D4BE" stroke-width="1.1"/>' +
      '<ellipse cx="' + hx + '" cy="' + hy + '" rx="9.4" ry="6.4" transform="rotate(14 ' + hx + ' ' + hy + ')" fill="#FBF6EA"/>' +
      '<path d="M159 10.5L178 18.5L175.5 22L159 19Z" fill="#E2762B"/>' +
      '<path d="M158.5 10L162 9.5L163.5 14L159 19Z" fill="#2B1A12"/>' +
      '<circle cx="155" cy="11.5" r="1.5" fill="#1D1209"/>' +
      '</g></g>';
  }

  /* ---------- lamps, lotus helpers (from earlier version) ---------- */
  function petalPath(len, wid) {
    return "M0 0C" + n(-wid) + " " + n(-len * 0.26) + " " + n(-wid * 0.9) + " " + n(-len * 0.72) + " 0 " + n(-len) +
      "C" + n(wid * 0.9) + " " + n(-len * 0.72) + " " + n(wid) + " " + n(-len * 0.26) + " 0 0Z";
  }

  /* side-view lotus, base at (0,0) */
  function lotus(p, x, y, s, cls) {
    var o = '<g class="' + (cls || "lotus") + '" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')"><g class="lotus-in">';
    [[-74, 0.78, 1], [74, 0.78, 1], [-52, 0.92, 1], [52, 0.92, 1]].forEach(function (a) {
      o += '<path d="' + petalPath(46 * a[1], 13 * a[1]) + '" transform="rotate(' + a[0] + ')" fill="url(#' + p + 'petalD)" stroke="#9E3A60" stroke-width=".5" stroke-opacity=".5"/>';
    });
    [[-30, 0.98], [30, 0.98], [-12, 1.04], [12, 1.04]].forEach(function (a) {
      o += '<path d="' + petalPath(50 * a[1], 12.5 * a[1]) + '" transform="rotate(' + a[0] + ')" fill="url(#' + p + 'petal)" stroke="#B9577E" stroke-width=".45" stroke-opacity=".45"/>';
    });
    o += '<path d="' + petalPath(53, 11) + '" fill="url(#' + p + 'petal)" stroke="#B9577E" stroke-width=".45" stroke-opacity=".5"/>';
    o += '<path d="M0 -6L0 -42" stroke="#C46A8B" stroke-width=".5" opacity=".5"/>';
    o += '<ellipse cx="0" cy="1" rx="13" ry="4" fill="#E9B24A" opacity=".9"/>';
    return o + "</g></g>";
  }

  /* closed bud on a stem */
  function bud(p, x, y, s, lean) {
    return '<g class="lotus" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ') rotate(' + (lean || 0) + ')"><g class="lotus-in">' +
      '<path d="' + petalPath(34, 10) + '" transform="rotate(-18)" fill="url(#' + p + 'petalD)"/>' +
      '<path d="' + petalPath(34, 10) + '" transform="rotate(18)" fill="url(#' + p + 'petalD)"/>' +
      '<path d="' + petalPath(38, 10.5) + '" fill="url(#' + p + 'petal)" stroke="#B9577E" stroke-width=".4" stroke-opacity=".5"/>' +
      "</g></g>";
  }

  function pad(p, x, y, rx, ry) {
    return '<g class="pad"><ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="' + rx + '" ry="' + ry + '" fill="url(#' + p + 'pad)"/>' +
      '<path d="M' + n(x) + ' ' + n(y) + 'L' + n(x + rx * 0.98) + ' ' + n(y - ry * 0.22) + '" stroke="#0F2D24" stroke-width="1.2" opacity=".55"/></g>';
  }

  /* brass oil lamp, 100 x 56 box */
  function diya(p, x, y, s, delay, shadow) {
    return '<g class="diya" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')">' +
      (shadow ? '<ellipse cx="57" cy="56" rx="47" ry="6" fill="rgba(18,5,2,.42)"/>' : '') +
      '<circle cx="14" cy="14" r="26" fill="url(#' + p + 'glow)" class="diya-glow" style="animation-delay:' + (delay || 0) + 's"/>' +
      '<path d="M4 30C12 28 18 30 22 33L80 33C90 33 96 27 99 19C100 38 82 52 58 54C34 56 12 50 4 30Z" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".8"/>' +
      '<path d="M22 33L80 33" stroke="#F8E4A4" stroke-width="1" opacity=".7"/>' +
      '<path d="M26 40C44 46 70 46 88 38" fill="none" stroke="#5E3C12" stroke-width=".8" opacity=".6"/>' +
      '<g class="flame" style="animation-delay:' + (delay || 0) + 's"><path d="M12 2C19 12 19 21 12 28C5 21 5 12 12 2Z" fill="url(#' + p + 'flame)"/>' +
      '<path d="M12 12C15 17 15 22 12 26C9 22 9 17 12 12Z" fill="#FFF4C2" opacity=".9"/></g>' +
      "</g>";
  }
  function diyaDefs(p) {
    return '<radialGradient id="' + p + 'glow"><stop offset="0" stop-color="#FFC66B" stop-opacity=".75"/><stop offset="1" stop-color="#FFC66B" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + p + 'flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#E4531E"/><stop offset=".5" stop-color="#F8A33A"/><stop offset="1" stop-color="#FFE27A"/></linearGradient>';
  }

  function arch(x, y, w, h, fill) {
    return '<path d="M' + n(x) + ' ' + n(y + h) + 'V' + n(y + w / 2) + 'A' + n(w / 2) + ' ' + n(w / 2) + ' 0 0 1 ' + n(x + w) + ' ' + n(y + w / 2) + 'V' + n(y + h) + 'Z" fill="' + fill + '"/>';
  }

  /* ---------- peacock ----------
     Origin at the feet, faces right. A fan of eyed feathers stands behind the body,
     the neck is a tapering S-curve like the swan's. */
  function peacock(p, x, y, s, flip, cls) {
    var C = [-26, -64];
    function fe(th, L, w, eye, vane, rim) {
      var r = th * Math.PI / 180, dx = Math.cos(r), dy = -Math.sin(r), nx = -dy, ny = dx;
      function pt(t, off) { return n(C[0] + dx * L * t + nx * off) + " " + n(C[1] + dy * L * t + ny * off); }
      var tip = pt(1, 0), e = [C[0] + dx * (L - eye * 0.7), C[1] + dy * (L - eye * 0.7)];
      var ang = Math.atan2(-dx, dy) * 180 / Math.PI, bar = "";
      for (var k = 0; k < 5; k++) {
        var t = 0.22 + k * 0.13;
        bar += "M" + pt(t, 0) + "L" + pt(t + 0.1, w * 0.78) + "M" + pt(t, 0) + "L" + pt(t + 0.1, -w * 0.78);
      }
      return '<path d="M' + pt(0.1, 0) + 'Q' + pt(0.62, w * 2.5) + ' ' + tip + 'Q' + pt(0.62, -w * 2.5) + ' ' + pt(0.1, 0) + 'Z" fill="' + rim + '" opacity=".85"/>' +
        '<path d="M' + pt(0.1, 0) + 'Q' + pt(0.62, w * 1.7) + ' ' + tip + 'Q' + pt(0.62, -w * 1.7) + ' ' + pt(0.1, 0) + 'Z" fill="' + vane + '" stroke="#0B3B34" stroke-width=".6"/>' +
        '<path d="' + bar + '" stroke="#9FD8A0" stroke-width=".55" opacity=".55" fill="none"/>' +
        '<path d="M' + pt(0.1, 0) + 'L' + tip + '" stroke="#C9A24A" stroke-width=".9" fill="none"/>' +
        '<g transform="translate(' + n(e[0]) + ' ' + n(e[1]) + ') rotate(' + n(ang) + ')">' +
        '<ellipse rx="' + n(eye * 0.82) + '" ry="' + n(eye * 1.02) + '" fill="#9CC85A" opacity=".75"/>' +
        '<ellipse rx="' + n(eye * 0.64) + '" ry="' + n(eye * 0.84) + '" fill="#D9A23C"/>' +
        '<ellipse rx="' + n(eye * 0.5) + '" ry="' + n(eye * 0.68) + '" fill="#1E9E92"/>' +
        '<ellipse rx="' + n(eye * 0.36) + '" ry="' + n(eye * 0.5) + '" fill="#17419F"/>' +
        '<ellipse rx="' + n(eye * 0.17) + '" ry="' + n(eye * 0.27) + '" fill="#091A4B"/>' +
        '<ellipse cx="' + n(-eye * 0.1) + '" cy="' + n(-eye * 0.14) + '" rx="' + n(eye * 0.07) + '" ry="' + n(eye * 0.1) + '" fill="#BFE3FF"/></g>';
    }
    var o = '<g class="' + (cls || "peacock") + '" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + (flip ? -s : s) + ' ' + s + ')">';
    o += '<ellipse cx="-6" cy="1.5" rx="58" ry="4.2" fill="#1A0A12" opacity=".28"/>';
    // the fan
    o += '<g class="pfan">';
    var i, th;
    for (i = 0, th = -14; th <= 194; th += 11, i++) o += fe(th, 138, 7.4, 13, "#1C7A5C", "#B9A744");
    for (th = -8.5; th <= 188; th += 11) o += fe(th, 104, 6.4, 11, "#146A52", "#A8983E");
    o += '</g>';
    // legs
    o += '<g stroke="#6A4A3A" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M-6 -34L-8 -3M-8 -3L-17 0M-8 -3L1 0M-8 -3L-10 3"/><path d="M14 -34L12 -3M12 -3L3 0M12 -3L21 0M12 -3L10 3"/></g>';
    // body
    var body = "M-40 -50C-38 -80 6 -88 30 -72C46 -62 50 -46 38 -38C20 -26 -16 -28 -40 -50Z";
    o += '<defs><clipPath id="' + p + 'pbc"><path d="' + body + '"/></clipPath>' +
      '<linearGradient id="' + p + 'pbody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A66C8"/><stop offset=".55" stop-color="#14449A"/><stop offset="1" stop-color="#0A2A70"/></linearGradient>' +
      '<linearGradient id="' + p + 'pneck" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1B54B8"/><stop offset=".5" stop-color="#2E80E0"/><stop offset="1" stop-color="#123E9A"/></linearGradient></defs>';
    o += '<path d="' + body + '" fill="url(#' + p + 'pbody)" stroke="#08235E" stroke-width=".9"/>';
    o += '<g clip-path="url(#' + p + 'pbc)" fill="none" stroke-linecap="round">';
    for (var row = 0; row < 4; row++) for (var col = 0; col < 7; col++) {
      var sx = -42 + col * 9 + (row % 2) * 4.5, sy = -78 + row * 10;
      o += '<path d="M' + sx + ' ' + sy + 'a4.5 4.5 0 0 0 9 0" stroke="' + (row % 2 ? "#D9A23C" : "#3FBFA0") + '" stroke-width="1.15" opacity=".85"/>';
    }
    o += '</g>';
    o += '<path d="M-22 -60C-10 -72 12 -72 24 -60C16 -46 -6 -40 -24 -48Z" fill="#2F8A58" stroke="#D9A23C" stroke-width="1"/>';
    o += '<path d="M-14 -58C-4 -64 10 -64 18 -58M-16 -52C-6 -58 8 -58 16 -52" fill="none" stroke="#B9E08A" stroke-width=".9" opacity=".8"/>';
    // neck: tapering S
    var c = cr([[22, -62], [40, -74], [48, -98], [42, -122], [44, -138], [52, -150]], 12), Lh = [], Rh = [], mid = [];
    for (var q = 0; q < c.length; q++) {
      var a = c[Math.max(0, q - 1)], b = c[Math.min(c.length - 1, q + 1)];
      var ddx = b[0] - a[0], ddy = b[1] - a[1], ln = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
      var nx = -ddy / ln, ny = ddx / ln, t = q / (c.length - 1), w = 3.6 + 7.4 * Math.pow(1 - t, 1.5);
      Lh.push([c[q][0] + nx * w, c[q][1] + ny * w]); Rh.push([c[q][0] - nx * w, c[q][1] - ny * w]);
      mid.push([c[q][0] + nx * w * 0.35, c[q][1] + ny * w * 0.35]);
    }
    var d = "M" + n(Lh[0][0]) + " " + n(Lh[0][1]), m;
    for (m = 1; m < Lh.length; m++) d += "L" + n(Lh[m][0]) + " " + n(Lh[m][1]);
    for (m = Rh.length - 1; m >= 0; m--) d += "L" + n(Rh[m][0]) + " " + n(Rh[m][1]);
    var sh = "M" + n(mid[1][0]) + " " + n(mid[1][1]);
    for (m = 2; m < mid.length - 3; m++) sh += "L" + n(mid[m][0]) + " " + n(mid[m][1]);
    o += '<path d="' + d + 'Z" fill="url(#' + p + 'pneck)" stroke="#0C2F7A" stroke-width=".8" stroke-linejoin="round"/>';
    o += '<path d="' + sh + '" fill="none" stroke="#8CC6F4" stroke-width="2" stroke-linecap="round" opacity=".5"/>';
    // head, crest, beak, eye
    o += '<ellipse cx="54" cy="-152" rx="8.4" ry="5.6" transform="rotate(14 54 -152)" fill="#1B54B8" stroke="#0C2F7A" stroke-width=".7"/>';
    o += '<path d="M60 -154L74 -148.5L60.5 -148Z" fill="#C9954A" stroke="#7A5420" stroke-width=".5"/>';
    o += '<path d="M49.5 -156.5C54 -159 59 -158 62 -154.5" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><path d="M50 -148.5C54 -147 59 -148 62 -150" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>';
    o += '<circle cx="56" cy="-152.6" r="1.5" fill="#150B06"/>';
    for (var k = -4; k <= 4; k++) {
      var ca = (-90 + k * 15 - 8) * Math.PI / 180, cx0 = 49, cy0 = -156, L = 15 + (4 - Math.abs(k)) * 1.2;
      o += '<path d="M' + cx0 + ' ' + cy0 + 'L' + n(cx0 + Math.cos(ca) * L) + ' ' + n(cy0 + Math.sin(ca) * L) + '" stroke="#123E9A" stroke-width=".9" fill="none"/>' +
        '<ellipse cx="' + n(cx0 + Math.cos(ca) * (L + 1.5)) + '" cy="' + n(cy0 + Math.sin(ca) * (L + 1.5)) + '" rx="2" ry="3" transform="rotate(' + n(-90 + (ca * 180 / Math.PI + 90)) + ' ' + n(cx0 + Math.cos(ca) * (L + 1.5)) + ' ' + n(cy0 + Math.sin(ca) * (L + 1.5)) + ')" fill="#1E9E92" stroke="#0B3B34" stroke-width=".3"/>';
    }
    return o + '</g>';
  }

  /* ---------- ornate bronze dressing table with a cusped mirror, peacock crest and stool ----------
     origin at floor, bottom centre. About 216 wide, 280 tall. */
  function dresser(p) {
    var ED = "#2E1A0C", B = "url(#" + p + "bronze)", BV = "url(#" + p + "bronzeV)", BH = "url(#" + p + "bronzeH)", GL = "#F2D58A", o = '<g class="dresser">';
    var OUT = "M-68 -104V-188C-68 -216 -46 -232 -24 -246C-15 -252 -6 -258 0 -270C6 -258 15 -252 24 -246C46 -232 68 -216 68 -188V-104Z";
    var INN = "M-55 -108V-187C-55 -210 -37 -224 -19 -236C-10 -242 -5 -246 0 -254C5 -246 10 -242 19 -236C37 -224 55 -210 55 -187V-108Z";
    var MID = "M-61.5 -106V-188C-61.5 -213 -42 -228 -21 -241C-12 -247 -5.5 -252 0 -262C5.5 -252 12 -247 21 -241C42 -228 61.5 -213 61.5 -188V-106Z";
    o += '<defs><clipPath id="' + p + 'dg"><path d="' + INN + '"/></clipPath>' +
      '<pattern id="' + p + 'lat" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M7 1L13 7L7 13L1 7Z" fill="none" stroke="' + GL + '" stroke-width=".9" opacity=".75"/><circle cx="7" cy="7" r="1.3" fill="' + GL + '" opacity=".8"/></pattern>' +
      '<linearGradient id="' + p + 'mir" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6EDE0"/><stop offset=".45" stop-color="#E4C9C0"/><stop offset="1" stop-color="#A9B9C8"/></linearGradient></defs>';
    o += '<ellipse cx="0" cy="2" rx="124" ry="7" fill="#12060A" opacity=".3"/>';
    // side pillars with lotus-bud capitals and brackets
    [-1, 1].forEach(function (sd) {
      var X = sd * 86;
      o += '<rect x="' + (X - 5) + '" y="-214" width="10" height="116" fill="' + BH + '" stroke="' + ED + '" stroke-width=".8"/>';
      [-186, -158, -130].forEach(function (yy) { o += '<ellipse cx="' + X + '" cy="' + yy + '" rx="7.4" ry="3.4" fill="' + B + '" stroke="' + ED + '" stroke-width=".7"/>'; });
      o += '<path d="M' + X + ' -214C' + (X - 9) + ' -222 ' + (X - 6) + ' -234 ' + X + ' -246C' + (X + 6) + ' -234 ' + (X + 9) + ' -222 ' + X + ' -214Z" fill="' + BV + '" stroke="' + ED + '" stroke-width=".8"/>';
      o += '<circle cx="' + X + '" cy="-250" r="3.2" fill="' + B + '" stroke="' + ED + '" stroke-width=".6"/>';
      o += '<path d="M' + (X - sd * 5) + ' -196C' + (X - sd * 14) + ' -196 ' + (X - sd * 14) + ' -178 ' + (sd * 69) + ' -176" fill="none" stroke="' + BV + '" stroke-width="5" stroke-linecap="round"/>';
      o += '<path d="M' + (X - sd * 5) + ' -196C' + (X - sd * 14) + ' -196 ' + (X - sd * 14) + ' -178 ' + (sd * 69) + ' -176" fill="none" stroke="' + GL + '" stroke-width="1" opacity=".7"/>';
      o += '<path d="M' + (X - sd * 5) + ' -128C' + (X - sd * 18) + ' -128 ' + (X - sd * 18) + ' -118 ' + (sd * 69) + ' -118" fill="none" stroke="' + BV + '" stroke-width="4" stroke-linecap="round"/>';
    });
    // frame
    o += '<path d="' + OUT + '" fill="' + BV + '" stroke="' + ED + '" stroke-width="1.4"/>';
    o += '<path d="' + MID + '" fill="none" stroke="' + GL + '" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="0.1 8.2"/>';
    o += '<path d="' + OUT + '" fill="none" stroke="' + GL + '" stroke-width=".9" opacity=".6" transform="translate(0 -1.5)"/>';
    // glass
    o += '<path d="' + INN + '" fill="url(#' + p + 'mir)" stroke="' + ED + '" stroke-width="1.2"/>';
    o += '<g clip-path="url(#' + p + 'dg)"><path d="M-55 -150C-30 -170 20 -160 55 -190V-108H-55Z" fill="#E7A27A" opacity=".24"/>' +
      '<path class="mirror-glint" d="M-36 -236L-20 -236L-54 -128L-54 -154Z" fill="#fff" opacity=".6"/>' +
      '<path d="M30 -226L36 -226L10 -140L4 -140Z" fill="#fff" opacity=".28"/></g>';
    o += '<path d="' + INN + '" fill="none" stroke="#6B4515" stroke-width=".8" opacity=".6"/>';
    // peacock crest above the arch
    for (var i = 0; i < 9; i++) {
      var a = (18 + i * 18.5) * Math.PI / 180, dx = Math.cos(a), dy = -Math.sin(a), L = i % 2 ? 36 : 44;
      var ex = dx * (L - 8), ey = -268 + dy * (L - 8), ang = Math.atan2(-dx, dy) * 180 / Math.PI;
      o += '<path d="M0 -268L' + n(dx * L) + ' ' + n(-268 + dy * L) + '" stroke="' + ED + '" stroke-width="2.2" stroke-linecap="round"/>' +
        '<g transform="translate(' + n(dx * (L - 4)) + ' ' + n(-268 + dy * (L - 4)) + ') rotate(' + n(ang) + ')"><ellipse rx="5" ry="9.4" fill="' + BV + '" stroke="' + ED + '" stroke-width=".7"/><ellipse rx="2.6" ry="4.6" fill="#1E9E92" stroke="' + ED + '" stroke-width=".4"/><ellipse rx="1.1" ry="2" fill="#0E2E74"/></g>';
    }
    o += '<path d="M-9 -262C-9 -274 9 -274 9 -262Z" fill="' + BV + '" stroke="' + ED + '" stroke-width=".8"/><circle cx="0" cy="-262" r="4.6" fill="' + B + '" stroke="' + ED + '" stroke-width=".7"/>';
    // table top
    o += '<path d="M-110 -90C-114 -99 -106 -102 -96 -102H96C106 -102 114 -99 110 -90Z" fill="' + BV + '" stroke="' + ED + '" stroke-width="1.1"/>';
    o += '<path d="M-100 -99H100" stroke="' + GL + '" stroke-width="1.1" opacity=".8"/>';
    o += '<rect x="-108" y="-90" width="216" height="7" rx="2" fill="' + BH + '" stroke="' + ED + '" stroke-width=".9"/>';
    [-96, -72, -48, -24, 0, 24, 48, 72, 96].forEach(function (x) { o += '<circle cx="' + x + '" cy="-86.5" r="1.6" fill="' + GL + '"/>'; });
    // apron with three carved drawers
    o += '<rect x="-100" y="-83" width="200" height="31" fill="' + BV + '" stroke="' + ED + '" stroke-width="1"/>';
    [[-96, 60], [-32, 64], [36, 60]].forEach(function (b, i) {
      var cx = b[0] + b[1] / 2;
      o += '<rect x="' + b[0] + '" y="-79" width="' + b[1] + '" height="23" rx="2" fill="url(#' + p + 'lat)" stroke="' + GL + '" stroke-width=".9"/>';
      o += '<circle cx="' + cx + '" cy="-67.5" r="' + (i === 1 ? 4.4 : 3.6) + '" fill="' + B + '" stroke="' + ED + '" stroke-width=".8"/><circle cx="' + (cx - 1) + '" cy="-68.6" r="1.1" fill="#FFF3C8"/>';
    });
    // scrolled skirt under the apron
    o += '<path d="M-96 -52C-80 -42 -60 -42 -44 -52C-30 -44 -14 -44 0 -52C14 -44 30 -44 44 -52C60 -42 80 -42 96 -52Z" fill="' + B + '" stroke="' + ED + '" stroke-width=".9"/>';
    // cabriole legs with paw feet
    [-1, 1].forEach(function (sd) {
      var l = "M" + sd * 98 + " -52C" + sd * 108 + " -38 " + sd * 90 + " -28 " + sd * 93 + " -14C" + sd * 94 + " -8 " + sd * 102 + " -6 " + sd * 104 + " 0L" + sd * 84 + " 0C" + sd * 84 + " -6 " + sd * 83 + " -10 " + sd * 82 + " -16C" + sd * 81 + " -30 " + sd * 92 + " -40 " + sd * 84 + " -52Z";
      o += '<path d="' + l + '" fill="' + BH + '" stroke="' + ED + '" stroke-width="1"/>';
      o += '<path d="M' + sd * 96 + ' -50C' + sd * 104 + ' -38 ' + sd * 88 + ' -28 ' + sd * 90 + ' -14" fill="none" stroke="' + GL + '" stroke-width=".9" opacity=".6"/>';
      o += '<circle cx="' + sd * 93 + '" cy="-46" r="4" fill="' + B + '" stroke="' + ED + '" stroke-width=".7"/>';
    });
    // stool: bolster seat, turned bronze legs
    o += '<g class="stool">';
    [-1, 1].forEach(function (sd) {
      var X = sd * 34;
      o += '<path d="M' + (X - 3) + ' -46L' + (X - 3) + ' -34C' + (X - 7) + ' -30 ' + (X - 7) + ' -24 ' + (X - 3) + ' -20L' + (X - 3) + ' -8L' + (X - 7) + ' 0L' + (X + 7) + ' 0L' + (X + 3) + ' -8L' + (X + 3) + ' -20C' + (X + 7) + ' -24 ' + (X + 7) + ' -30 ' + (X + 3) + ' -34L' + (X + 3) + ' -46Z" fill="' + BH + '" stroke="' + ED + '" stroke-width=".8"/>';
    });
    o += '<path d="M-31 -22H31" stroke="' + BV + '" stroke-width="3.4"/>';
    o += '<rect x="-46" y="-64" width="92" height="19" rx="9.5" fill="#8A1A33" stroke="#4A0A18" stroke-width="1"/>';
    o += '<path d="M-38 -62C-14 -67 14 -67 38 -62" fill="none" stroke="#E0486A" stroke-width="1.6" opacity=".5"/>';
    o += '<path d="M-40 -45.5C-14 -42 14 -42 40 -45.5" fill="none" stroke="' + GL + '" stroke-width="1.5"/>';
    [-34, -17, 0, 17, 34].forEach(function (x) { o += '<circle cx="' + x + '" cy="-54.5" r="1.7" fill="' + GL + '"/>'; });
    o += '<path d="M44 -56C54 -52 54 -46 52 -38" fill="none" stroke="' + GL + '" stroke-width="1.6"/><path d="M52 -40L49 -30M52 -40L52 -29M52 -40L55 -30" stroke="#C9953A" stroke-width="1.5" stroke-linecap="round"/>';
    return o + '</g></g>';
  }

  /* ---------- boat: carved wooden nauka with an awning, a boatman and an oar ----------
     origin at the waterline, bow to the right. */
  function boat(p, x, y, s, flip, cls, awning) {
    var o = '<g class="' + (cls || "boat") + '" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + (flip ? -s : s) + ' ' + s + ')"><g class="boat-in">';
    // boatman and oar
    o += '<path d="M-52 -14L-56 -36" stroke="#2A1528" stroke-width="3.2" stroke-linecap="round"/><circle cx="-56" cy="-42" r="5" fill="#2A1528"/><path d="M-60 -34L-48 -34L-50 -14L-58 -14Z" fill="#B3203A"/><path d="M-50 -30L-30 -14L-6 8" stroke="#6B3A1F" stroke-width="2.2" stroke-linecap="round" fill="none"/><path d="M-6 8L-1 13L-9 12Z" fill="#6B3A1F"/>';
    // hull
    o += '<path d="M-70 -12C-44 -4 44 -4 70 -9C78 -13 82 -22 87 -34C86 -14 78 0 60 6C32 10 -32 10 -58 6C-67 2 -71 -5 -70 -12Z" fill="#5F2E17" stroke="#2A1208" stroke-width="1"/>';
    o += '<path d="M-70 -12C-44 -4 44 -4 70 -9C78 -13 82 -22 87 -34L84 -32C78 -20 74 -14 68 -5C42 -1 -44 -1 -67 -6Z" fill="#B3203A"/>';
    o += '<path d="M-66 -3C-40 3 40 3 66 -2" fill="none" stroke="#E3B04B" stroke-width="1.2"/>';
    o += '<path d="M87 -34C92 -38 94 -44 92 -48C88 -44 86 -40 87 -34Z" fill="#E3B04B" stroke="#6B4515" stroke-width=".6"/>';
    if (awning !== false) {
      o += '<path d="M-22 -12L-22 -34M22 -12L22 -34" stroke="#3A1809" stroke-width="2"/>';
      o += '<path d="M-34 -32C-30 -50 30 -50 34 -32Z" fill="#E8892A" stroke="#6B2A10" stroke-width=".8"/>';
      o += '<path d="M-22 -48V-33M-11 -50V-33M0 -50.5V-33M11 -50V-33M22 -48V-33" stroke="#B3203A" stroke-width="3.2"/>';
      o += '<path d="M-34 -32C-20 -28 20 -28 34 -32" fill="none" stroke="#E3B04B" stroke-width="1.4"/>';
      for (var k = -30; k <= 30; k += 7.5) o += '<path d="M' + k + ' -30L' + k + ' -26" stroke="#E3B04B" stroke-width="1.1"/>';
    }
    o += '<circle class="gl" cx="76" cy="-22" r="2.4" fill="#FFC66B"/>';
    return o + '</g></g>';
  }
  function boatBlock(p, x, y, s, flip, awning, delay, dur, wl) {
    return '<g class="drift" style="animation-delay:' + delay + 's;animation-duration:' + dur + 's"><g opacity=".22" transform="translate(0 ' + n(2 * wl) + ') scale(1 -1)">' + boat(p, x, y, s, flip, "boat-refl", awning) + '</g>' + boat(p, x, y, s, flip, "boat", awning) + '</g>';
  }


  /* ---------- pearl strands ---------- */
  function strand(path, w) {
    var gap = n(w * 1.3);
    return '<g class="pearls">' +
      '<path d="' + path + '" fill="none" stroke="rgba(40,16,6,.4)" stroke-width="' + (w + 0.6) + '" stroke-linecap="round" stroke-dasharray="0.1 ' + gap + '" transform="translate(.8 1.5)"/>' +
      '<path d="' + path + '" fill="none" stroke="#F6EEDD" stroke-width="' + w + '" stroke-linecap="round" stroke-dasharray="0.1 ' + gap + '"/>' +
      '<path class="pearl-shine" d="' + path + '" fill="none" stroke="#FFFFFF" stroke-width="' + n(w * 0.36) + '" stroke-linecap="round" stroke-dasharray="0.1 ' + gap + '" transform="translate(' + n(-w * 0.17) + ' ' + n(-w * 0.2) + ')"/></g>';
  }


  /* ---------- the pearl spill ----------
     The positions below come from tools/spill-sim.js: a necklace and about 90 loose pearls simulated under gravity
     (position-based dynamics, with the chest, the floor and pearl-on-pearl contact) and left to settle.
     Each entry is [x, height, depth, strand index or -1]. The art only projects them. */
  var SPILL = [[-56,63.3,-62,0,3.3,0],[-56,63.3,-53.9,0,3.3,0],[-56,63.3,-45.8,0,3.3,0],[-56,63.3,-37.7,0,3.3,0],[-56.3,63.3,-29.6,0,3.3,0],[-56.6,63.3,-21.5,0,3.3,0],[-56,63.4,-13.4,0,3.3,0],[-54.9,70,-8.9,0,3.3,0],[-55.9,71.3,-0.8,0,3.3,0],[-56.2,63.6,3.7,0,3.3,0],[-55.4,55.3,3.4,0,3.3,0],[-54.6,47,3.7,0,3.3,0],[-53.7,38.8,3.9,0,3.3,0],[-52.6,30.7,4.3,0,3.3,0],[-51.2,22.6,4.7,0,3.3,0],[-49.2,14.7,5.3,0,3.3,0],[-46,7.3,6.2,0,3.3,0],[-39.2,3.3,8.2,0,3.3,0],[-37.6,3.3,16.3,0,3.3,0],[-29.8,3.3,18.8,0,3.3,0],[-21.8,3.3,19.3,0,3.3,0],[-13.7,3.3,18.7,0,3.3,1],[-11.6,3.3,11.1,0,3.3,0],[-10.8,4.3,3.5,0,3.3,0],[-7,11.5,3.5,0,3.3,0],[-0.3,16.4,3.3,0,3.3,0],[2.5,24.1,3.3,0,3.3,0],[4.3,32.1,3.3,0,3.3,0],[5.5,40.3,3.3,0,3.3,0],[6.5,48.5,3.3,0,3.3,0],[7.3,56.8,3.3,0,3.3,0],[8,65.1,3.3,0,3.3,0],[8.1,71.3,-2.9,0,3.3,0],[8.9,65.8,-9.5,0,3.3,0],[9.8,64,-17.3,0,3.3,0],[10.7,63.3,-25.4,0,3.3,0],[11.7,63.3,-33.9,0,3.3,0],[13.4,63.3,-41.8,0,3.3,0],[15.4,63.3,-49.6,0,3.3,0],[17.4,63.3,-57.5,0,3.3,0],[23.5,63.3,-60.5,0,3.3,0],[31.5,63.3,-61.4,0,3.3,0],[-55.7,69.6,-61.9,1,3.3,0],[-50.7,64.1,-57.8,1,3.3,0],[-46.1,63.3,-51.9,1,3.3,0],[-44,63.3,-44,1,3.3,0],[-43.1,63.4,-34.8,1,3.3,0],[-41.8,63.8,-26.6,1,3.3,0],[-40.6,65.4,-18.5,1,3.3,0],[-39.4,67.9,-10.5,1,3.3,0],[-38.2,71.3,-3.4,1,3.3,0],[-38,64.9,2.8,1,3.3,0],[-35.9,56.7,3.3,1,3.3,0],[-33.5,48.7,3.3,1,3.3,0],[-30.8,40.8,3.4,1,3.3,0],[-27.7,33.1,3.4,1,3.3,0],[-24.1,25.7,3.6,1,3.3,0],[-19.6,18.9,5,1,3.3,0],[-14.3,12.8,6.7,1,3.3,0],[-8.1,8.1,8.6,1,3.3,0],[0.1,6.9,8,1,3.3,1],[8.1,8.6,7.4,1,3.3,0],[15.2,12.8,6.8,1,3.3,0],[21.2,18.5,6.3,1,3.3,0],[26.2,25.1,5.9,1,3.3,0],[30.5,32.2,6,1,3.3,0],[33.8,39.9,5.2,1,3.3,0],[36.7,47.7,4.6,1,3.3,0],[39.2,55.7,4,1,3.3,0],[41.7,63.8,3.9,1,3.3,0],[42,71.3,-0.5,1,3.3,0],[42.8,69.8,-8.9,1,3.3,0],[43.5,65.1,-15.4,1,3.3,0],[44.5,63.4,-23.4,1,3.3,0],[45.2,63.3,-31.5,1,3.3,0],[46.5,63.3,-39.5,1,3.3,0],[48.8,63.3,-47.3,1,3.3,0],[49.9,63.3,-55.3,1,3.3,0],[54.6,63.3,-61.8,1,3.3,0],[-10.2,63.3,-62,2,3.3,0],[-2.2,63.3,-60.7,2,3.3,0],[5.7,63.3,-58.7,2,3.3,0],[12.3,64.7,-55,2,3.3,0],[13.1,69.1,-47.3,2,3.3,0],[15.1,69.3,-40.4,2,3.3,0],[16.8,66.1,-32.6,2,3.3,0],[18,63.3,-24.7,2,3.3,0],[19,64.1,-16.7,2,3.3,0],[19.8,67.8,-9.1,2,3.3,0],[20.1,71.3,-1.2,2,3.3,0],[20.1,64.1,3.8,2,3.3,0],[21.3,56,4.7,2,3.3,0],[22.6,48,6.4,2,3.3,0],[24.2,40.1,8.4,2,3.3,0],[26.3,32.7,11.1,2,3.3,0],[29.7,25.3,11.5,2,3.3,1],[34.7,19.1,10,2,3.3,0],[42.5,19,7.7,2,3.3,0],[47.7,25.2,6.2,2,3.3,0],[50.8,32.7,5.2,2,3.3,0],[53,40.6,4.6,2,3.3,0],[54.7,48.7,4.1,2,3.3,0],[56,56.9,3.7,2,3.3,0],[57.2,65.2,3.6,2,3.3,0],[57.1,71.3,-2.6,2,3.3,0],[56.9,67.6,-10.4,2,3.3,0],[56.6,65.1,-18.3,2,3.3,0],[56.4,63.7,-26.4,2,3.3,0],[56.2,63.3,-35.4,2,3.3,0],[55.9,63.3,-43.5,2,3.3,0],[56,63.3,-51.3,2,3.3,0],[59.6,67.6,-56.3,2,3.3,0],[-56.4,76.2,-62,3,3.3,0],[-48.7,71.3,-61.4,3,3.3,0],[-43.7,65.7,-59.1,3,3.3,0],[-36.3,63.4,-56,3,3.3,0],[-33.8,63.3,-48.3,3,3.3,0],[-31.9,63.3,-40.5,3,3.3,0],[-30.4,63.3,-32.5,3,3.3,0],[-29.5,63.3,-24.5,3,3.3,0],[-28.5,63.3,-16.3,3,3.3,0],[-27.4,67.1,-9.3,3,3.3,0],[-27,71.3,-3,3,3.3,0],[-27,64.8,3.3,3,3.3,0],[-26,56.6,3.3,3,3.3,0],[-24.9,48.5,3.5,3,3.3,0],[-23.4,40.5,3.8,3,3.3,0],[-21.2,32.7,4.2,3,3.3,0],[-18.3,25.5,6.9,3,3.3,0],[-10.4,26.2,4.9,3,3.3,0],[-7.5,33.8,4.2,3,3.3,0],[-5.9,41.8,3.8,3,3.3,0],[-4.8,50,3.5,3,3.3,0],[-4,58.3,3.3,3,3.3,0],[-3,66.5,2,3,3.3,0],[-2.8,71.3,-4.7,3,3.3,0],[-2.2,66.3,-11.1,3,3.3,0],[-1.2,63.4,-18.9,3,3.3,0],[-0.1,63.3,-27.1,3,3.3,0],[0.9,63.3,-35.5,3,3.3,0],[2.9,63.5,-43.5,3,3.3,0],[5.6,65.3,-50.7,3,3.3,0],[8.2,69.1,-57.8,3,3.3,0],[15,67.7,-61.6,3,3.3,0],[23.2,69.7,-61.6,3,3.3,0],[34.4,62.9,-14.5,-1,2.86,0],[11.5,2.9,18.1,-1,2.94,0],[14.1,70.7,-0.5,-1,2.67,0],[2.6,70.6,-4,-1,2.57,0],[4.3,63.1,-14,-1,3.09,0],[46.9,2.6,84.5,-1,2.58,0],[-8.4,2.7,102.6,-1,2.7,0],[33.3,63,-9,-1,2.96,0],[3.5,68.8,-12.4,-1,3.06,0],[27.4,2.6,85.1,-1,2.57,0],[25,62.9,-16.7,-1,2.89,0],[43.8,2.6,53.3,-1,2.57,0],[43.2,2.6,37.7,-1,2.56,0],[14.3,62.7,-20.6,-1,2.72,0],[16.3,62.5,-8.5,-1,2.52,0],[27.8,44.2,10.1,-1,2.67,0],[-10.5,62.8,-8.8,-1,2.77,0],[31.8,62.7,-19.3,-1,2.68,0],[24.3,70.7,-6.7,-1,2.76,0],[13.6,62.7,-13.3,-1,2.73,0],[13.3,74,-4.6,-1,2.54,0],[-1.1,69,-16.3,-1,2.87,0],[9.3,69.4,-14.4,-1,2.91,0],[-0.6,72.2,-9.5,-1,2.94,0],[6.6,3,20.9,-1,3.02,0],[27.2,62.9,-9.1,-1,2.89,0],[11.9,70.2,-7.2,-1,2.51,0],[6,70.6,-8.2,-1,2.54,0],[24.8,66.8,-12.5,-1,2.83,0],[4.2,62.9,-21.6,-1,2.92,0],[14.9,68.3,-13.2,-1,2.94,0],[4.6,74.4,-11.4,-1,2.75,0],[24.4,62.9,-27.1,-1,2.88,0],[6.6,76.2,-4.9,-1,2.88,0],[-1.1,74.5,-15.1,-1,2.8,0],[-8.4,2.9,53.2,-1,2.89,0],[17.5,73.7,-8.9,-1,3.05,0],[-23.8,2.8,91.4,-1,2.79,0],[0.7,75.8,-4.6,-1,3.03,0],[13.9,68.2,-24.2,-1,2.8,0],[33.5,3,44.7,-1,3,0],[32.4,68.4,-10.1,-1,2.74,0],[5.3,66.5,-26,-1,3.04,0],[3.4,79.4,-8.8,-1,3.09,0],[38.1,67,-15,-1,2.65,0],[23.1,66.7,-20.2,-1,2.83,0],[32.6,2.8,38.8,-1,2.78,0],[12.2,78.2,-7.1,-1,2.84,0],[3.4,77.8,-14.9,-1,2.53,0],[34.5,2.9,97.1,-1,2.87,0],[31.8,70.5,-5,-1,2.53,0],[29.9,65.4,-15.8,-1,2.54,0],[-25.5,62.7,-29.2,-1,2.71,0],[21.5,68.5,-25,-1,2.72,0],[-0.3,72.6,-20.6,-1,2.97,0]];
  var SK = 0.38;
  var SPARK = false, spk = 0, gc = 0, rc = 0, pc = 0; // sparkles are only made while the craft scene is being built
  function sparkle(x, y, sz) { // a tiny star that flashes on its own clock, sitting on a pearl, a stone, a coin or a bangle
    if (!SPARK) return '';
    spk++;
    var d = ((spk * 0.619) % 5.7).toFixed(2), t = (1.8 + (spk * 0.37) % 2.3).toFixed(1);
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + sz + ')"><g class="glit" style="--d:' + d + 's;--t:' + t + 's"><path d="M0 -4C.3 -1.1 1.1 -.3 4 0C1.1 .3 .3 1.1 0 4C-.3 1.1 -1.1 .3 -4 0C-1.1 -.3 -.3 -1.1 0 -4Z" fill="#fff"/></g></g>';
  }
  var SDX = 1.3, SDY = 2.0, SHC = 'rgba(18,5,2,.34)'; // one light, top left: every shape throws its shadow right and down by the same amount
  function sy(b) { return -b[1] + SK * b[2]; }
  function pearlDot(p, b) {
    var x = n(b[0]), y = n(sy(b)), r = b[4];
    if (b[5]) // a pendant at the middle of the loop: brass cap, red enamel drop
      return '<path d="M' + x + ' ' + n(y + r * 0.6) + 'C' + n(b[0] - 4.4) + ' ' + n(y + r + 3.5) + ' ' + n(b[0] - 4) + ' ' + n(y + r + 9) + ' ' + x + ' ' + n(y + r + 11) + 'C' + n(b[0] + 4) + ' ' + n(y + r + 9) + ' ' + n(b[0] + 4.4) + ' ' + n(y + r + 3.5) + ' ' + x + ' ' + n(y + r * 0.6) + 'Z" fill="#B3203A" stroke="#5E1020" stroke-width=".5"/>' +
        '<circle cx="' + x + '" cy="' + y + '" r="' + n(r + 0.8) + '" fill="url(#' + p + 'brass)" stroke="#6B4515" stroke-width=".6"/><circle cx="' + x + '" cy="' + n(y - 0.2) + '" r="' + n(r * 0.5) + '" fill="#B3203A"/>';
    return '<use href="#' + p + 'pG" transform="translate(' + x + ' ' + y + ') scale(' + r + ')"/>';
  }
  /* extra defs for the craft scene: the pearl (unit radius: pearl, drifting iridescence, rim light, highlight), the shared drop shadow */
  function jewelDefs(p) {
    return '<g id="' + p + 'pG"><circle r="1" fill="url(#' + p + 'pearl)"/><circle r="1" fill="url(#' + p + 'pearlIri)"/><circle r="1" fill="url(#' + p + 'pearlRim)"/>' +
      '<ellipse cx="-.36" cy="-.42" rx=".3" ry=".17" transform="rotate(-38 -.36 -.42)" fill="#fff" opacity=".95"/><circle cx="-.52" cy="-.52" r=".07" fill="#fff"/>' +
      '<path d="M.55 .62A.84 .84 0 0 1 -.1 .86" fill="none" stroke="#fff" stroke-width=".07" opacity=".45" stroke-linecap="round"/>' +
      '<circle r="1" fill="none" stroke="#B3A68E" stroke-width=".08" opacity=".7"/></g>' +
      '<filter id="' + p + 'ds" x="-25%" y="-25%" width="160%" height="160%"><feDropShadow dx="' + SDX + '" dy="' + SDY + '" stdDeviation=".75" flood-color="#120502" flood-opacity=".42"/></filter>' +
      '<filter id="' + p + 'blur" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>' +
      '<radialGradient id="' + p + 'lpool"><stop offset="0" stop-color="#FFB85C" stop-opacity=".55"/><stop offset=".5" stop-color="#FF9A3C" stop-opacity=".2"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>';
  }
  function shadowed(p, inner) { return '<g filter="url(#' + p + 'ds)">' + inner + '</g>'; }
  function glint(x, y, sz, i) { // a four-point star that flashes now and then, each on its own clock
    var d = ((i * 0.61) % 5.3).toFixed(2), t = (3.9 + (i % 4) * 0.8).toFixed(1);
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + sz + ')"><g class="glint" style="--d:' + d + 's;--t:' + t + 's"><circle r="4.4" fill="rgba(255,244,200,.32)"/><path d="M0 -8C.7 -2.2 2.2 -.7 8 0C2.2 .7 .7 2.2 0 8C-.7 2.2 -2.2 .7 -8 0C-2.2 -.7 -.7 -2.2 0 -8Z" fill="#fff"/><circle r="1.1" fill="#fff"/></g></g>';
  }
  /* a bangle seen from above: a tilted ring with a dark under-edge, a bright face and a highlight */
  function ring(cx, cy, rx, ry, rot, col, w, shadow) {
    var t = rot ? ' transform="rotate(' + rot + ' ' + n(cx) + ' ' + n(cy) + ')"' : '', glass = col !== GD;
    var o = '<g' + t + '>' + '<ellipse cx="' + n(cx + SDX * 0.8) + '" cy="' + n(cy + SDY * 0.9) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + SHC + '" stroke-width="' + w + '"/>' +
      '<ellipse cx="' + n(cx) + '" cy="' + n(cy + 0.9) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="#5E3C12" stroke-width="' + n(w + 0.9) + '"/>' +
      '<ellipse cx="' + n(cx) + '" cy="' + n(cy) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"/>';
    if (glass) // a glass bangle: a deeper inner band, a long glossy streak and a thin hard glint
      o += '<ellipse cx="' + n(cx) + '" cy="' + n(cy + w * 0.18) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="' + n(w * 0.4) + '"/>' +
        '<ellipse cx="' + n(cx) + '" cy="' + n(cy - w * 0.2) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="rgba(255,255,255,.62)" stroke-width="' + n(w * 0.32) + '" stroke-linecap="round" stroke-dasharray="' + n(rx * 1.9) + ' ' + n(rx * 4.4) + '" stroke-dashoffset="' + n(-rx * 3.7) + '"/>' +
        '<ellipse cx="' + n(cx) + '" cy="' + n(cy - w * 0.3) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="#fff" stroke-width="' + n(w * 0.1) + '" stroke-linecap="round" stroke-dasharray="' + n(rx * 0.5) + ' ' + n(rx * 5.8) + '" stroke-dashoffset="' + n(-rx * 4.2) + '"/>';
    o += '<ellipse cx="' + n(cx) + '" cy="' + n(cy - 0.5) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="rgba(255,244,200,.55)" stroke-width="' + n(w * 0.28) + '" stroke-dasharray="' + n(rx * 1.3) + ' ' + n(rx * 4.6) + '"/>';
    if (SPARK && (glass || rc % 3 === 0) && (rc++ % 2 === 0)) o += sparkle(cx - rx * 0.6, cy - ry * 0.8, 0.75);
    return o + '</g>';
  }
  function chainPath(d, w, col) { // a chain of small round links
    return '<path d="' + d + '" fill="none" stroke="rgba(18,5,2,.4)" stroke-width="' + (w + 1) + '" stroke-linecap="round" stroke-dasharray="0.1 ' + n(w * 1.15) + '" transform="translate(' + SDX * 0.9 + ' ' + SDY * 0.9 + ')"/>' +
      '<path d="' + d + '" fill="none" stroke="#6B4515" stroke-width="' + (w + 0.7) + '" stroke-linecap="round" stroke-dasharray="0.1 ' + n(w * 1.15) + '"/>' +
      '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round" stroke-dasharray="0.1 ' + n(w * 1.15) + '"/>';
  }
  /* ---------- ornate pieces ---------- */
  var GD = "#E3B04B", GE = "#5E3C12", RED = "#B3203A", GRN = "#1E7A5E";
  function gemFill(p, col) { return col === RED ? 'url(#' + p + 'gemR)' : col === GRN ? 'url(#' + p + 'gemG)' : col === "#F6EEDD" ? 'url(#' + p + 'gemW)' : col; }
  /* stones are cut like crystal: a girdle, eight crown facets lit from the top left, a table, hard edges, a glaze rim and a bright
     point. In the craft scene two facets flash on their own clocks and a star sits on the stone. */
  var GP = {};
  GP[RED] = { l: '#FFB8C2', m: '#DA2745', d: '#8A1129', x: '#42051A' };
  GP[GRN] = { l: '#B4FADD', m: '#22A877', d: '#0E6446', x: '#04301F' };
  GP["#F6EEDD"] = { l: '#FFFFFF', m: '#DDE7F3', d: '#93A0B6', x: '#586480' };
  function hx(c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; }
  function mix(a, b, f) { var A = hx(a), B = hx(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(A[i] + (B[i] - A[i]) * f); }).join(',') + ')'; }
  function tone(P, t) { return t < 0.34 ? mix(P.x, P.d, t / 0.34) : t < 0.67 ? mix(P.d, P.m, (t - 0.34) / 0.33) : mix(P.m, P.l, Math.min(1, (t - 0.67) / 0.33)); }
  function gem(p, x, y, r, col) {
    var P = GP[col], X = n(x), Y = n(y);
    var o = '<circle cx="' + n(x + SDX * 0.35) + '" cy="' + n(y + SDY * 0.35) + '" r="' + r + '" fill="' + SHC + '"/>';
    if (!P) return o + '<circle cx="' + X + '" cy="' + Y + '" r="' + r + '" fill="' + col + '" stroke="' + GE + '" stroke-width=".45"/>';
    var gloss = '<ellipse cx="' + n(x - r * 0.34) + '" cy="' + n(y - r * 0.38) + '" rx="' + n(r * 0.3) + '" ry="' + n(r * 0.16) + '" transform="rotate(-38 ' + n(x - r * 0.34) + ' ' + n(y - r * 0.38) + ')" fill="#fff" opacity=".92"/>';
    if (r < 2.2) {
      o += '<circle cx="' + X + '" cy="' + Y + '" r="' + r + '" fill="' + gemFill(p, col) + '" stroke="' + GE + '" stroke-width=".4"/>' + gloss;
      return o + '<circle cx="' + n(x + r * 0.4) + '" cy="' + n(y + r * 0.4) + '" r="' + n(r * 0.1) + '" fill="#fff" opacity=".6"/>';
    }
    var k, A = [], T = [], tr = r * 0.5, sw = n(Math.max(0.1, r * 0.045));
    for (k = 0; k < 8; k++) {
      var an = (k * 45 - 22.5) * Math.PI / 180;
      A.push([x + Math.cos(an) * r * 1.02, y + Math.sin(an) * r * 1.02]);
      T.push([x + Math.cos(an) * tr, y + Math.sin(an) * tr]);
    }
    function pt(q) { return n(q[0]) + ',' + n(q[1]); }
    o += '<circle cx="' + X + '" cy="' + Y + '" r="' + n(r * 1.04) + '" fill="' + tone(P, 0.12) + '" stroke="' + GE + '" stroke-width=".45"/>';
    var facets = [];
    for (k = 0; k < 8; k++) {
      var mid = k * 45 * Math.PI / 180, L = -135 * Math.PI / 180;
      var t = (Math.cos(mid - L) + 1) / 2 + (k % 2 ? 0.1 : -0.08);
      t = Math.max(0.02, Math.min(1, t));
      var poly = pt(A[k]) + ' ' + pt(A[(k + 1) % 8]) + ' ' + pt(T[(k + 1) % 8]) + ' ' + pt(T[k]);
      facets.push(poly);
      o += '<polygon points="' + poly + '" fill="' + tone(P, t) + '"/>';
    }
    o += '<polygon points="' + T.map(pt).join(' ') + '" fill="' + tone(P, 0.6) + '"/>';
    o += '<polygon points="' + pt(T[4]) + ' ' + pt(T[5]) + ' ' + pt(T[6]) + ' ' + pt(T[7]) + ' ' + X + ',' + Y + '" fill="' + P.l + '" opacity=".5"/>';
    var edges = 'M' + T.map(pt).join('L') + 'Z';
    for (k = 0; k < 8; k++) edges += 'M' + pt(T[k]) + 'L' + pt(A[k]);
    o += '<path d="' + edges.replace(/,/g, ' ') + '" fill="none" stroke="#fff" stroke-opacity=".42" stroke-width="' + sw + '" stroke-linejoin="round"/>';
    if (SPARK) { // two facets catch the light and flash
      gc++;
      [1, 5].forEach(function (f, j) {
        o += '<polygon class="gfx" style="--d:' + (((gc * 0.73 + j * 1.9) % 4.6).toFixed(2)) + 's;--t:' + (2.6 + ((gc + j) % 3) * 0.7).toFixed(1) + 's" points="' + facets[f] + '" fill="#fff"/>';
      });
    }
    o += '<path d="M' + n(x + Math.cos(-2.9) * r * 0.86) + ' ' + n(y + Math.sin(-2.9) * r * 0.86) + 'A' + n(r * 0.86) + ' ' + n(r * 0.86) + ' 0 0 1 ' + n(x + Math.cos(-1.75) * r * 0.86) + ' ' + n(y + Math.sin(-1.75) * r * 0.86) + '" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="' + n(Math.max(0.2, r * 0.08)) + '" stroke-linecap="round"/>';
    o += gloss + '<circle cx="' + n(x + r * 0.4) + '" cy="' + n(y + r * 0.42) + '" r="' + n(Math.max(0.2, r * 0.09)) + '" fill="#fff" opacity=".6"/>';
    if (SPARK && gc % 2 === 0) o += sparkle(x - r * 0.3, y - r * 0.34, Math.max(0.6, Math.min(1.1, r * 0.28)));
    return o;
  }
  function setGem(p, x, y, r, col) { // a stone in a little brass bezel
    return '<circle cx="' + n(x + SDX * 0.35) + '" cy="' + n(y + SDY * 0.35) + '" r="' + n(r + 1) + '" fill="' + SHC + '"/><circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r + 0.95) + '" fill="url(#' + p + 'brass)" stroke="' + GE + '" stroke-width=".45"/>' + gem(p, x, y, r, col);
  }
  function along(d, gap, off) { // points spaced evenly along a run of cubic curves
    var v = d.match(/-?\d+(?:\.\d+)?/g).map(Number), cur = [v[0], v[1]], pts = [cur], i, j;
    for (i = 2; i + 5 < v.length; i += 6) {
      var p0 = cur, p1 = [v[i], v[i + 1]], p2 = [v[i + 2], v[i + 3]], p3 = [v[i + 4], v[i + 5]];
      for (j = 1; j <= 30; j++) {
        var t = j / 30, u = 1 - t;
        pts.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
      }
      cur = p3;
    }
    var out = [], acc = 0, next = off || 0;
    for (i = 1; i < pts.length; i++) {
      var seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      while (acc + seg >= next) { var f = (next - acc) / seg; out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]); next += gap; }
      acc += seg;
    }
    return out;
  }
  function stonesAlong(p, d, gap, r) { // red and green stones set along a chain
    var o = '';
    along(d, gap, gap * 0.5).forEach(function (q, i) { o += setGem(p, q[0], q[1], r, i % 2 ? GRN : RED); });
    return o;
  }
  function chokerStones(p) { // the choker's ring of stones, set round the ellipse
    var o = '', c = Math.cos(-8 * Math.PI / 180), sn = Math.sin(-8 * Math.PI / 180);
    for (var k = 0; k < 12; k++) {
      var a = k * Math.PI / 6 + 0.2, dx = 24 * Math.cos(a), dy = 9 * Math.sin(a);
      o += setGem(p, -14 + dx * c - dy * sn, -99 + dx * sn + dy * c, 2.4, k % 2 ? GRN : RED);
    }
    return o;
  }
  function kundan(p, x, y, r, col) { // a gold bezel set with a stone and a ring of pearls
    var o = '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r + 0.8) + '" fill="url(#' + p + 'brass)" stroke="' + GE + '" stroke-width=".6"/>';
    for (var k = 0; k < 9; k++) o += '<circle cx="' + n(x + Math.cos(k * 0.698) * r * 0.78) + '" cy="' + n(y + Math.sin(k * 0.698) * r * 0.78) + '" r="' + n(r * 0.16) + '" fill="url(#' + p + 'pearl)"/>';
    o += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r * 0.6) + '" fill="none" stroke="' + GE + '" stroke-width=".4" stroke-dasharray=".6 1.1" opacity=".75"/>';
    return o + gem(p, x, y, r * 0.46, col);
  }
  function strings(p, x, y, xs, len) { // short pearl strings ending in a bead
    var o = '';
    xs.forEach(function (dx, i) {
      var l = len + (i % 2) * 4;
      o += '<path d="M' + n(x + dx) + ' ' + y + 'V' + n(y + l) + '" stroke="#C9953A" stroke-width=".7"/><path d="M' + n(x + dx) + ' ' + y + 'V' + n(y + l) + '" stroke="#F6EEDD" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0.1 3"/><circle cx="' + n(x + dx) + '" cy="' + n(y + l + 1.6) + '" r="2" fill="url(#' + p + 'pearl)" stroke="#B3A68E" stroke-width=".3"/>';
    });
    return o;
  }
  /* the rani haar's pendant: a gold shield, kundan centre, green stones, a pearl edge and a fringe. Origin at the top ring. */
  function rani(p, x, y, s) {
    var sh = 'M-15 4C-20 16-16 32 0 44C16 32 20 16 15 4C8 8-8 8-15 4Z';
    var o = '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')">';
    o += '<circle r="3.4" fill="none" stroke="' + GE + '" stroke-width="2.4"/><circle r="3.4" fill="none" stroke="' + GD + '" stroke-width="1.5"/>';
    o += '<path d="' + sh + '" fill="url(#' + p + 'brass)" stroke="' + GE + '" stroke-width=".9"/>';
    o += '<path d="M-11 7C-14 17-11 29 0 38C11 29 14 17 11 7" fill="none" stroke="#FFF1BD" stroke-width=".6" opacity=".8"/>';
    o += '<path d="' + sh + '" fill="none" stroke="#F6EEDD" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="0.1 3.2"/>';
    o += '<path d="' + sh + '" transform="translate(0 .8) scale(.84 .86)" fill="none" stroke="' + GE + '" stroke-width=".6" stroke-dasharray="1.2 1.6" opacity=".6"/>';
    o += kundan(p, 0, 15, 7, RED) + gem(p, -8, 27, 2.6, GRN) + gem(p, 8, 27, 2.6, GRN) + gem(p, 0, 31, 3, GRN) + gem(p, -5, 21, 1.7, "#F6EEDD") + gem(p, 5, 21, 1.7, "#F6EEDD");
    o += strings(p, 0, 44, [-10, -5, 0, 5, 10], 6);
    return o + '</g>';
  }
  function lotusPend(p, x, y, s) { // a flat lotus medallion
    var o = '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')">';
    for (var k = 0; k < 8; k++) o += '<ellipse cx="0" cy="-9" rx="4.6" ry="8" transform="rotate(' + k * 45 + ')" fill="url(#' + p + 'brassV)" stroke="' + GE + '" stroke-width=".6"/>';
    return o + kundan(p, 0, 0, 7, GRN) + '</g>';
  }
  function payal(p, cx, cy, rx, ry, rot) { // an anklet: a ring of gold with little bells
    var t = rot ? ' transform="rotate(' + rot + ' ' + n(cx) + ' ' + n(cy) + ')"' : '', o = '<g' + t + '>';
    o += '<ellipse cx="' + n(cx + SDX * 0.8) + '" cy="' + n(cy + SDY * 0.9) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + SHC + '" stroke-width="2"/>';
    o += '<ellipse cx="' + n(cx) + '" cy="' + n(cy) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="#C9953A" stroke-width="2"/>';
    for (var k = 0; k < 14; k++) { var an = k * 0.449, bx = cx + Math.cos(an) * rx, by = cy + Math.sin(an) * ry + 2.2; o += '<circle cx="' + n(bx) + '" cy="' + n(by) + '" r="1.9" fill="url(#' + p + 'brass)" stroke="' + GE + '" stroke-width=".4"/><path d="M' + n(bx - 1) + ' ' + n(by + 0.4) + 'H' + n(bx + 1) + '" stroke="' + GE + '" stroke-width=".4"/>'; if (SPARK && k % 5 === 2) o += sparkle(bx - 0.6, by - 0.7, 0.6); }
    return o + '</g>';
  }
  function bangleStack(cols, cx, cy, rx, ry, rot, step) {
    var o = '';
    cols.forEach(function (c, i) { o += ring(cx, cy - i * step, rx, ry, rot, c, 2.8, i === 0); });
    return o;
  }
  function coin(x, y) {
    return '<ellipse cx="' + n(x + SDX * 0.8) + '" cy="' + n(y + SDY * 0.9) + '" rx="5.4" ry="2.6" fill="' + SHC + '"/><ellipse cx="' + n(x) + '" cy="' + n(y + 1) + '" rx="5.4" ry="2.6" fill="#8A5A12"/><ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="5.4" ry="2.6" fill="' + GD + '" stroke="#8A5A12" stroke-width=".5"/><ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="3" ry="1.3" fill="none" stroke="#8A5A12" stroke-width=".5"/>' + (SPARK && (rc++ % 2 === 1) ? sparkle(x - 2.4, y - 0.7, 0.65) : '');
  }
  function lyingJhumka(p, x, y, s, rot) {
    return shadowed(p, '<g transform="rotate(' + rot + ' ' + n(x) + ' ' + n(y) + ')">' + jhumka(p, x, y, s, 0).replace('class="keyswing"', 'class="lying"') + '</g>');
  }
  var PEARL_THREAD = function (d, dash) { return '<path d="' + d + '" fill="none" stroke="rgba(18,5,2,.3)" stroke-width="4.4" stroke-linecap="round" stroke-dasharray="0.1 ' + dash + '" transform="translate(' + SDX * 0.9 + ' ' + SDY * 0.9 + ')"/><path d="' + d + '" fill="none" stroke="#F6EEDD" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 ' + dash + '"/><path d="' + d + '" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="0.1 ' + dash + '" transform="translate(-.7 -.8)"/>'; };

  /* what lies in the chest, heaped above the rim and laid over one another: silks, a choker and haar, bangles, jhumkas,
     a kada, anklets, a tikka, rings and coins */
  function heap(p) {
    var o = '';
    // silks: a marigold one behind, a magenta one on the left, a teal one on the right
    o += '<path d="M-63 -66C-63 -92 -52 -104 -36 -102C-22 -112 -2 -106 12 -110C28 -114 46 -104 56 -98C63 -94 64 -80 64 -66Z" fill="#D98A2B" stroke="#8A4E10" stroke-width=".8"/>';
    o += '<path d="M-52 -98C-44 -90 -48 -78 -42 -68M-24 -104C-18 -94 -24 -80 -18 -68M6 -108C12 -96 6 -82 12 -68M34 -106C40 -96 34 -80 42 -68" fill="none" stroke="#A9640F" stroke-width="2.4" opacity=".55"/>';
    o += '<path d="M-64 -66C-64 -84 -54 -94 -38 -92C-26 -90 -18 -80 -10 -66Z" fill="#9C2A5A" stroke="#5E1038" stroke-width=".8"/><path d="M-52 -90C-48 -82 -52 -74 -46 -68M-36 -91C-32 -82 -34 -74 -28 -68" fill="none" stroke="#5E1038" stroke-width="2" opacity=".5"/>';
    o += '<path d="M24 -66C26 -86 38 -96 52 -92C60 -90 64 -80 64 -66Z" fill="#14585B" stroke="#0A3436" stroke-width=".8"/><path d="M36 -92C40 -84 36 -76 40 -68M50 -92C54 -84 50 -76 56 -68" fill="none" stroke="#0A3436" stroke-width="2" opacity=".5"/>';
    o += '<path d="M-60 -74C-40 -80 -20 -72 0 -77C20 -82 40 -74 60 -79" fill="none" stroke="#F4D98C" stroke-width="1.6" stroke-dasharray="1.2 3.4" stroke-linecap="round"/>';
    // a choker standing against the back, with a pearl fringe, and a kundan plate
    o += '<g filter="url(#' + p + 'ds)"><ellipse cx="-14" cy="-99" rx="24" ry="9" fill="none" stroke="#5E3C12" stroke-width="7.4" transform="rotate(-8 -14 -99)"/><ellipse cx="-14" cy="-99" rx="24" ry="9" fill="none" stroke="url(#' + p + 'brass)" stroke-width="6.2" transform="rotate(-8 -14 -99)"/>';
    o += chokerStones(p) + '</g>';
    o += shadowed(p, kundan(p, 17, -95, 7.5, RED)) + shadowed(p, lotusPend(p, -46, -92, 0.5));
    // the rani haar, in loose loops with a pearl rope alongside
    var haar = "M-60 -86C-42 -106 -22 -70 -2 -84C16 -96 34 -68 60 -88";
    o += PEARL_THREAD("M-60 -80C-40 -98 -20 -64 0 -77C18 -90 36 -62 60 -82", 5.2);
    o += chainPath(haar, 3.4, GD);
    o += stonesAlong(p, haar, 8.6, 2.3);
    // bangle stacks and a leaning stack
    o += bangleStack(["#E3B04B", RED, "#E3B04B", GRN, "#E3B04B", RED, "#E3B04B", GRN], -47, -72, 14, 5.2, -4, 2.7);
    o += bangleStack(["#E3B04B", GRN, "#E3B04B", RED, "#E3B04B", GRN, RED], 45, -71, 13.5, 5, 6, 2.8);
    o += bangleStack([RED, "#E3B04B", GRN, "#E3B04B"], -16, -73, 10.5, 4.2, 10, 2.6);
    // anklets, kadas
    o += payal(p, 22, -76, 15, 5.4, -6);
    o += ring(-10, -92, 16, 7.4, -22, GD, 3.4, true);
    o += ring(28, -91, 14, 6.4, 20, GD, 3.2, true);
    // jhumkas lying on their sides, one over the other
    o += lyingJhumka(p, -6, -86, 0.2, 80);
    o += lyingJhumka(p, 8, -88, 0.2, -98);
    o += lyingJhumka(p, -34, -84, 0.2, 100);
    o += lyingJhumka(p, 44, -86, 0.2, -80);
    // maang tikka
    o += chainPath("M-26 -100C-22 -94 -14 -92 -8 -90", 2.4, GD);
    o += '<path d="M-6 -90C-12 -86 -12 -80 -6 -77C0 -80 0 -86 -6 -90Z" fill="url(#' + p + 'gemR)" stroke="' + GE + '" stroke-width=".7"/><ellipse cx="-8" cy="-85" rx="1.1" ry="2.6" transform="rotate(14 -8 -85)" fill="#fff" opacity=".8"/><circle cx="-6" cy="-74.5" r="2.6" fill="url(#' + p + 'pearl)" stroke="#B3A68E" stroke-width=".4"/><circle cx="-6" cy="-91" r="3" fill="url(#' + p + 'brass)" stroke="' + GE + '" stroke-width=".5"/>';
    // a pendant of the haar on top, rings and coins
    o += shadowed(p, lotusPend(p, 2, -79, 0.56));
    [[-23, -80, RED], [-22, -75, GRN], [16, -83, GRN], [33, -76, RED]].forEach(function (r) { o += '<circle cx="' + r[0] + '" cy="' + r[1] + '" r="3.2" fill="none" stroke="' + GE + '" stroke-width="2.2"/><circle cx="' + r[0] + '" cy="' + r[1] + '" r="2.8" fill="none" stroke="' + GD + '" stroke-width="1.4"/>' + gem(p, r[0], r[1] - 2.8, 2.4, r[2]); });
    [[-60, -80], [-55, -76.5], [58, -79], [54, -75.5], [60, -74], [-1, -72], [5, -70.5], [35, -72], [-30, -71]].forEach(function (c) { o += coin(c[0], c[1]); });
    return o;
  }
  /* jewellery that has slid over the lip and onto the carpet */
  function floorJewels(p) {
    var o = '';
    o += bangleStack([GD, RED, GD], -86, 12, 13, 4.8, -3, 2.6) + ring(-96, 24, 12, 4.4, 8, GRN, 2.6, true) + coin(-74, 20) + coin(-70, 25) + coin(-80, 30);
    o += payal(p, 90, 9, 16, 5.6, 4) + ring(92, 20, 12, 4.4, -6, RED, 2.6, true) + coin(76, 14) + coin(106, 17) + coin(101, 22);
    return o;
  }
  function spillOver(p) {
    var o = '';
    // the rani haar, over the lip on the right with its pendant hanging down the front
    var ch = "M-2 -78C-2 -74 -2 -72 0 -70C4 -52 12 -41 28 -39C46 -41 54 -52 58 -70C60 -72 60 -74 60 -78";
    o += '<path d="' + ch + '" fill="none" stroke="rgba(18,5,2,.3)" stroke-width="5" transform="translate(1 2)"/>';
    o += PEARL_THREAD("M6 -74C8 -66 12 -52 28 -50C44 -52 50 -66 54 -74", 5.2);
    o += chainPath(ch, 3.6, GD);
    o += stonesAlong(p, ch, 9.6, 2.4);
    o += shadowed(p, rani(p, 28, -40, 0.95));
    // a jhumka hanging by its hook over the lip, on the left
    o += shadowed(p, jhumka(p, -50, -73, 0.3, 0.4));
    // bangles slid off the corner: two on the lip, one tipping over
    o += ring(60, -77, 13, 5, 18, GD, 3, true) + ring(56, -81, 12.5, 4.8, -14, RED, 2.8, true);
    o += '<g transform="rotate(64 66 -58)">' + ring(66, -58, 12, 5.2, 0, GD, 3, true) + '</g>';
    return o;
  }
  function spillSet(p, front) {
    // pearls inside the chest are mostly hidden by the jewellery: only the last stretch of each strand and a few loose ones remain
    var keep = SPILL.map(function (b, i) {
      if (b[3] >= 0) return b[2] >= -4.5;
      return b[2] >= 0 || (b[2] > -30 && i % 3 === 0 && b[1] > 66);
    });
    var items = [];
    SPILL.forEach(function (b, i) {
      if (!keep[i] || (b[2] >= -4.5) !== front) return;
      items.push({ d: b[2] + SK * b[1], b: b });
    });
    for (var i = 0; i < SPILL.length - 1; i++) { // the thread between neighbouring pearls
      var a = SPILL[i], c = SPILL[i + 1];
      if (a[3] < 0 || a[3] !== c[3] || !keep[i] || !keep[i + 1]) continue;
      if (((a[2] + c[2]) / 2 >= -4.5) !== front) continue;
      items.push({ d: Math.min(a[2] + SK * a[1], c[2] + SK * c[1]) - 0.01, seg: [a, c] });
    }
    items.sort(function (u, v) { return u.d - v.d; });
    var o = "";
    items.forEach(function (it) { // shadows first: a flat oval where a pearl touches the floor, a small offset one elsewhere
      var b = it.b; if (!b) return;
      if (b[1] < b[4] + 0.6) o += '<ellipse cx="' + n(b[0] + SDX * 0.9) + '" cy="' + n(SK * b[2] + SDY * 0.45) + '" rx="' + n(b[4] + 1) + '" ry="' + n(b[4] * 0.6) + '" fill="' + SHC + '"/>';
    });
    items.forEach(function (it) {
      if (it.seg) {
        var a = it.seg[0], c = it.seg[1], x1 = n(a[0]), y1 = n(sy(a)), x2 = n(c[0]), y2 = n(sy(c));
        o += '<path d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '" stroke="#3A1809" stroke-opacity=".55" stroke-width="1.9" stroke-linecap="round"/><path d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '" stroke="#E3B04B" stroke-width="1" stroke-linecap="round"/>';
        return;
      }
      var b = it.b;
      if (b[1] >= b[4] + 0.6) {
        o += '<circle cx="' + n(b[0] + SDX) + '" cy="' + n(sy(b) + SDY) + '" r="' + b[4] + '" fill="' + SHC + '"/>';
      }
      o += pearlDot(p, b);
      if (SPARK && (pc++ % 3 === 0)) o += sparkle(b[0] - b[4] * 0.38, sy(b) - b[4] * 0.42, 0.2 + b[4] * 0.12);
    });
    return o;
  }
  // the open mouth of the chest, seen from above: rim, dark lining, floor of the tray, and what lies in it
  function cavity(p) {
    var o = '<clipPath id="' + p + 'spclip"><rect x="-70" y="-150" width="140" height="80.2"/></clipPath>';
    o += '<g clip-path="url(#' + p + 'spclip)">';
    o += '<rect x="-70" y="-98.6" width="140" height="30" fill="#8A4A24"/>';
    o += '<rect x="-63" y="-96.2" width="126" height="26" fill="#3F0A18"/>';
    o += '<rect x="-63" y="-88.2" width="126" height="18" fill="#7A1230"/>';
    o += '<path d="M-63 -88.2H63" stroke="#2A0610" stroke-width="1.2" opacity=".6"/>';
    o += heap(p);
    o += spillSet(p, false);
    o += '</g>';
    return o;
  }
  function spillFront(p) { return floorJewels(p) + spillSet(p, true) + spillOver(p); }

  /* ---------- sandook: carved wooden chest with brass fittings ----------
     origin at bottom centre. open = lid raised, pearl necklace spilling out and onto the floor. */
  function sandook(p, open) {
    var GOLD = "#E3B04B", o = '<g class="sandook">';
    if (open) {
      o += '<g transform="translate(0 -24)">';
      o += '<path d="M-64 -72L-58 -126C-30 -136 30 -136 58 -126L64 -72Z" fill="#6B2F16" stroke="#3A1809" stroke-width="1.2"/>';
      o += '<path d="M-54 -78L-50 -119C-26 -127 26 -127 50 -119L54 -78Z" fill="#8A1A33"/>';
      o += '<path d="M-47 -83L-44.5 -113C-24 -120 24 -120 44.5 -113L47 -83Z" fill="none" stroke="' + GOLD + '" stroke-width="1.2"/>';
      [-24, 0, 24].forEach(function (x, i) {
        var y = -100 - (i === 1 ? 3 : 0);
        o += '<path d="M' + x + ' ' + (y - 8) + 'L' + (x + 6) + ' ' + y + 'L' + x + ' ' + (y + 8) + 'L' + (x - 6) + ' ' + y + 'Z" fill="none" stroke="' + GOLD + '" stroke-width="1"/><circle cx="' + x + '" cy="' + y + '" r="1.8" fill="' + GOLD + '"/>';
      });
      o += '<path d="M-58 -126C-30 -136 30 -136 58 -126" fill="none" stroke="url(#' + p + 'brass)" stroke-width="3.2"/></g>';
    }
    // body
    o += '<rect x="-70" y="-68" width="140" height="68" rx="3" fill="url(#' + p + 'wood)" stroke="#3A1809" stroke-width="1.2"/>';
    o += '<path d="M-70 -34H70" stroke="#3A1809" stroke-width="1" opacity=".55"/>';
    if (open) o += cavity(p);
    // brass bands, straps, corner pieces, lock plate
    o += '<rect x="-70" y="-70" width="140" height="6" fill="url(#' + p + 'brassV)" stroke="#6B4515" stroke-width=".6"/>';
    o += '<rect x="-70" y="-5" width="140" height="5" fill="url(#' + p + 'brassV)" stroke="#6B4515" stroke-width=".6"/>';
    [-46, 46].forEach(function (x) {
      o += '<rect x="' + (x - 4) + '" y="-64" width="8" height="59" fill="url(#' + p + 'brassH)" stroke="#6B4515" stroke-width=".5"/>';
      for (var y = -56; y < -8; y += 14) o += '<circle cx="' + x + '" cy="' + y + '" r="1.5" fill="#FFF1BD"/>';
    });
    [-70, 70].forEach(function (x) {
      o += '<path d="M' + x + ' -70L' + (x + (x < 0 ? 12 : -12)) + ' -70L' + x + ' -52Z" fill="url(#' + p + 'brass)" stroke="#6B4515" stroke-width=".5"/>';
    });
    o += '<rect x="-12" y="-62" width="24" height="30" rx="3" fill="url(#' + p + 'brassV)" stroke="#6B4515" stroke-width=".8"/>';
    o += '<circle cx="0" cy="-50" r="3.2" fill="#2A1209"/><path d="M0 -50L0 -42" stroke="#2A1209" stroke-width="2.2" stroke-linecap="round"/>';
    if (!open) {
      o += '<path d="M-72 -68C-72 -110 72 -110 72 -68Z" fill="url(#' + p + 'wood)" stroke="#3A1809" stroke-width="1.2"/>';
      [-46, 46].forEach(function (x) { o += '<path d="M' + (x - 4) + ' -68C' + (x - 4) + ' -90 ' + (x - 3) + ' -98 ' + (x - 2) + ' -100L' + (x + 2) + ' -100C' + (x + 3) + ' -98 ' + (x + 4) + ' -90 ' + (x + 4) + ' -68Z" fill="url(#' + p + 'brassH)" stroke="#6B4515" stroke-width=".5"/>'; });
      o += '<path d="M-72 -70H72" stroke="url(#' + p + 'brass)" stroke-width="3"/>';
    }
    if (open) o += spillFront(p);
    return o + "</g>";
  }

  /* ---------- rabab leaning against the parapet (origin top-left of a 220 x 500 box) ---------- */
  function rabab(p) {
    var o = '<g class="rabab">';
    o += '<defs><linearGradient id="' + p + 'rwood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A1A0C"/><stop offset=".35" stop-color="#8A4623"/><stop offset=".6" stop-color="#6A3318"/><stop offset="1" stop-color="#2E1409"/></linearGradient>' +
      '<radialGradient id="' + p + 'skin" cx=".45" cy=".4" r=".75"><stop offset="0" stop-color="#F3DDB4"/><stop offset=".7" stop-color="#DDBA83"/><stop offset="1" stop-color="#B98F57"/></radialGradient></defs>';
    o += '<path d="M96 60C78 54 70 36 82 24C94 14 112 20 108 36C106 44 98 46 94 40" fill="none" stroke="url(#' + p + 'rwood)" stroke-width="10" stroke-linecap="round"/>';
    o += '<rect x="92" y="44" width="36" height="86" rx="10" fill="url(#' + p + 'rwood)" stroke="#1E0D05" stroke-width=".8"/>';
    [[88, 62], [88, 84], [88, 106], [132, 72], [132, 94], [132, 116]].forEach(function (q) {
      o += '<rect x="' + (q[0] - 8) + '" y="' + (q[1] - 3.2) + '" width="16" height="6.4" rx="3.2" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".5"/>';
    });
    o += '<rect x="98" y="128" width="24" height="132" fill="url(#' + p + 'rwood)" stroke="#1E0D05" stroke-width=".8"/>';
    o += '<path d="M110 232C60 232 40 262 46 296C28 316 18 350 26 392C36 446 76 474 110 474C144 474 184 446 194 392C202 350 192 316 174 296C180 262 160 232 110 232Z" fill="url(#' + p + 'rwood)" stroke="#1E0D05" stroke-width="1"/>';
    o += '<path d="M110 242C68 242 54 266 58 292C42 312 36 346 42 386C50 432 80 458 110 458C140 458 170 432 178 386C184 346 178 312 162 292C166 266 152 242 110 242Z" fill="url(#' + p + 'skin)" stroke="#8C6532" stroke-width="1.2"/>';
    o += '<path d="M72 330C64 338 66 352 76 356" fill="none" stroke="#3A1A0C" stroke-width="3.6" stroke-linecap="round"/><path d="M148 330C156 338 154 352 144 356" fill="none" stroke="#3A1A0C" stroke-width="3.6" stroke-linecap="round"/>';
    o += '<rect x="80" y="410" width="60" height="9" rx="3" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".7"/><path d="M96 419L124 419L120 438L100 438Z" fill="#3A1A0C"/>';
    o += '<g class="strings" stroke="#F1E2BE" stroke-width="1.4" stroke-linecap="round">';
    [-9, -4.5, 0, 4.5, 9].forEach(function (dx, i) {
      o += '<path class="str" style="animation-delay:' + (i * 0.18) + 's" d="M' + (110 + dx * 0.55) + ' 52L' + (110 + dx * 0.55) + ' 130L' + (110 + dx * 0.5) + ' 262L' + (110 + dx * 1.35) + ' 414"/>';
    });
    return o + "</g></g>";
  }
  /* ---------- the ghat: mixed temple forms, arcaded palace wall, palms, peepal and banyan, steps ----------
     local box 1000 x 230, base at y 230. */
  function ghat(p, c) {
    c = c || {};
    var T = c.temple || "#2F1A3B", TR = c.tree || "#211A31", W = c.wall || "#44233F", S1 = c.s1 || "#7F4654", S2 = c.s2 || "#A8625A", GL = "#FFC66B", r = seeded(11);
    var o = '<g class="ghat">';
    o += '<rect x="0" y="146" width="1000" height="60" fill="' + W + '"/>';
    for (var x = 14; x < 990; x += 34) o += arch(x, 160, 14, 30, GL).replace('fill="' + GL + '"', 'fill="' + GL + '" class="wn" style="animation-delay:' + n(r() * 5) + 's"');
    // trees and palms stand behind the shrines
    o += '<g fill="' + TR + '" color="' + TR + '">' +
      palm(22, 198, 150, -8, 1) + palm(54, 198, 116, 10, 2) +
      tree(300, 200, 46, 0, 4) +
      palm(520, 198, 142, 12, 4) + palm(543, 198, 104, -9, 5) +
      tree(868, 202, 56, 1, 6) +
      palm(940, 198, 100, -10, 8) + palm(968, 198, 140, 9, 7) + '</g>';
    o += '<g fill="' + T + '" color="' + T + '">' +
      chhatri(100, 150, 40, 54) +
      temple(186, 192, 0.62) +
      pidha(372, 192, 90, 84) +
      leaning(458, 198, 58, 126, -4) +
      gopuram(600, 192, 76, 116) +
      chhatri(692, 150, 48, 64) +
      pancharatha(776, 192, 62, 150) +
      pidha(962, 192, 50, 48) + '</g>';
    var y = 186, i = 0;
    while (y < 230) {
      o += '<rect x="0" y="' + y + '" width="1000" height="8" fill="' + (i % 2 ? S1 : S2) + '"/><rect x="0" y="' + y + '" width="1000" height="1.4" fill="#F2B87A" opacity=".45"/>';
      y += 8; i++;
    }
    for (var row = 0; row < 3; row++) {
      for (var xx = 10 + row * 7; xx < 990; xx += 22 + r() * 8) {
        o += '<circle class="gl" style="animation-delay:' + n(r() * 4) + 's" cx="' + n(xx) + '" cy="' + (192 + row * 14) + '" r="1.9" fill="' + GL + '"/>';
      }
    }
    o += egret(312, 216, 0.55) + egret(650, 224, 0.5) + egret(903, 212, 0.6);
    return o + "</g>";
  }


  /* ---------- Khajuraho-style temple skyline (single colour via currentColor) ---------- */
  function shikhara(cx, base, w, h, tiers) {
    var N = tiers || 16, top = base - h * 0.88, stepH = (h * 0.88) / N, notch = Math.max(1.2, w * 0.018);
    function hw(t) { return (w / 2) * (0.1 + 0.9 * Math.pow(1 - Math.pow(t, 1.75), 0.85)); }
    var R = [], L = [];
    for (var i = 0; i < N; i++) {
      var yb = base - i * stepH, yt = base - (i + 1) * stepH, a = hw(i / N), b = hw((i + 1) / N);
      R.push([cx + a + notch, yb], [cx + a + notch, yb - stepH * 0.3], [cx + b, yt]);
      L.push([cx - a - notch, yb], [cx - a - notch, yb - stepH * 0.3], [cx - b, yt]);
    }
    var d = "M" + n(L[0][0]) + " " + n(base);
    L.forEach(function (q) { d += "L" + n(q[0]) + " " + n(q[1]); });
    for (var k = R.length - 1; k >= 0; k--) d += "L" + n(R[k][0]) + " " + n(R[k][1]);
    d += "L" + n(R[0][0]) + " " + n(base) + "Z";
    var aw = w * 0.2;
    return '<path d="' + d + '"/>' +
      '<rect x="' + n(cx - aw * 0.6) + '" y="' + n(top - h * 0.02) + '" width="' + n(aw * 1.2) + '" height="' + n(h * 0.035) + '"/>' +
      '<ellipse cx="' + n(cx) + '" cy="' + n(top - h * 0.045) + '" rx="' + n(aw) + '" ry="' + n(h * 0.032) + '"/>' +
      '<ellipse cx="' + n(cx) + '" cy="' + n(top - h * 0.085) + '" rx="' + n(aw * 0.7) + '" ry="' + n(h * 0.026) + '"/>' +
      '<path d="M' + n(cx - aw * 0.32) + ' ' + n(top - h * 0.1) + 'C' + n(cx - aw * 0.5) + ' ' + n(top - h * 0.15) + ' ' + n(cx - aw * 0.2) + ' ' + n(top - h * 0.18) + ' ' + n(cx) + ' ' + n(top - h * 0.19) + 'C' + n(cx + aw * 0.2) + ' ' + n(top - h * 0.18) + ' ' + n(cx + aw * 0.5) + ' ' + n(top - h * 0.15) + ' ' + n(cx + aw * 0.32) + ' ' + n(top - h * 0.1) + 'Z"/>' +
      '<rect x="' + n(cx - 0.9) + '" y="' + n(top - h * 0.27) + '" width="1.8" height="' + n(h * 0.09) + '"/>' +
      '<path d="M' + n(cx + 1) + ' ' + n(top - h * 0.26) + 'l' + n(w * 0.1) + ' ' + n(h * 0.018) + 'l' + n(-w * 0.1) + ' ' + n(h * 0.018) + 'z"/>';
  }
  function pyramid(cx, base, w, h, tiers) {
    var N = tiers || 5, th = h / N, o = "";
    for (var i = 0; i < N; i++) {
      var wb = w * (1 - i * 0.17), wt = wb - w * 0.09;
      o += '<path d="M' + n(cx - wb / 2) + ' ' + n(base - i * th) + 'L' + n(cx - wt / 2) + ' ' + n(base - (i + 1) * th + th * 0.1) + 'L' + n(cx + wt / 2) + ' ' + n(base - (i + 1) * th + th * 0.1) + 'L' + n(cx + wb / 2) + ' ' + n(base - i * th) + 'Z"/>';
    }
    var tw = w * (1 - N * 0.17);
    return o + '<ellipse cx="' + n(cx) + '" cy="' + n(base - h - 2) + '" rx="' + n(Math.max(tw * 0.5, 3)) + '" ry="3"/><rect x="' + n(cx - 1) + '" y="' + n(base - h - 12) + '" width="2" height="10"/>';
  }
  function temple(x, base, s) {
    var o = '<g>';
    o += '<rect x="' + n(x - 128 * s) + '" y="' + n(base - 18 * s) + '" width="' + n(256 * s) + '" height="' + n(18 * s) + '"/>';
    o += '<rect x="' + n(x - 118 * s) + '" y="' + n(base - 28 * s) + '" width="' + n(236 * s) + '" height="' + n(12 * s) + '"/>';
    var b = base - 26 * s;
    o += shikhara(x + 34 * s, b, 108 * s, 196 * s, 16);
    o += shikhara(x - 14 * s, b, 46 * s, 96 * s, 9) + shikhara(x + 82 * s, b, 46 * s, 96 * s, 9);
    o += pyramid(x - 56 * s, b, 76 * s, 62 * s, 5);
    o += pyramid(x - 108 * s, b, 48 * s, 36 * s, 4);
    return o + "</g>";
  }
  /* ---------- silhouettes for the ghat and the footer skyline ----------
     All take fill from the parent group; trunks and fronds use currentColor strokes. */
  function plinth(cx, base, w) {
    return '<rect x="' + n(cx - w * 0.62) + '" y="' + n(base - 7) + '" width="' + n(w * 1.24) + '" height="7"/>' +
      '<rect x="' + n(cx - w * 0.54) + '" y="' + n(base - 12) + '" width="' + n(w * 1.08) + '" height="6"/>';
  }
  /* single curvilinear (latina) shikhara on a plinth, with a small porch roof */
  function latina(cx, base, w, h) {
    return plinth(cx, base, w) + pyramid(cx - w * 0.66, base - 12, w * 0.46, h * 0.16, 3) + shikhara(cx, base - 12, w, h, 14);
  }
  /* five-peaked cluster: tall central tower, two flanking spires and a stepped porch */
  function pancharatha(cx, base, w, h) {
    return plinth(cx, base, w * 1.5) +
      shikhara(cx - w * 0.62, base - 12, w * 0.42, h * 0.5, 8) + shikhara(cx + w * 0.62, base - 12, w * 0.42, h * 0.5, 8) +
      shikhara(cx - w * 0.3, base - 12, w * 0.5, h * 0.72, 11) + shikhara(cx + w * 0.3, base - 12, w * 0.5, h * 0.72, 11) +
      shikhara(cx, base - 12, w * 0.7, h, 15) +
      pyramid(cx - w * 1.0, base - 12, w * 0.46, h * 0.2, 4);
  }
  /* pillared hall under a stepped pyramidal roof (pidha) */
  function pidha(cx, base, w, h) {
    var o = plinth(cx, base, w), nP = 6, pw = w * 0.07, top = base - 12 - h * 0.22, i;
    for (i = 0; i < nP; i++) o += '<rect x="' + n(cx - w / 2 + i * ((w - pw) / (nP - 1))) + '" y="' + n(top) + '" width="' + n(pw) + '" height="' + n(h * 0.22) + '"/>';
    o += '<rect x="' + n(cx - w * 0.54) + '" y="' + n(top - 5) + '" width="' + n(w * 1.08) + '" height="6"/>';
    return o + pyramid(cx, top - 5, w * 1.04, h * 0.78, 6);
  }
  /* four-pillared domed kiosk */
  function chhatri(cx, base, w, h) {
    var o = '', i, pw = w * 0.085, ph = h * 0.42, top = base - ph;
    for (i = 0; i < 4; i++) o += '<rect x="' + n(cx - w / 2 + i * ((w - pw) / 3)) + '" y="' + n(top) + '" width="' + n(pw) + '" height="' + n(ph) + '"/>';
    o += '<path d="M' + n(cx - w * 0.62) + ' ' + n(top + 1) + 'Q' + n(cx) + ' ' + n(top - h * 0.14) + ' ' + n(cx + w * 0.62) + ' ' + n(top + 1) + 'L' + n(cx + w * 0.55) + ' ' + n(top - h * 0.06) + 'L' + n(cx - w * 0.55) + ' ' + n(top - h * 0.06) + 'Z"/>';
    var dy = top - h * 0.06;
    o += '<path d="M' + n(cx - w * 0.44) + ' ' + n(dy) + 'C' + n(cx - w * 0.5) + ' ' + n(dy - h * 0.34) + ' ' + n(cx - w * 0.12) + ' ' + n(dy - h * 0.46) + ' ' + n(cx) + ' ' + n(dy - h * 0.5) + 'C' + n(cx + w * 0.12) + ' ' + n(dy - h * 0.46) + ' ' + n(cx + w * 0.5) + ' ' + n(dy - h * 0.34) + ' ' + n(cx + w * 0.44) + ' ' + n(dy) + 'Z"/>';
    o += '<rect x="' + n(cx - 0.9) + '" y="' + n(dy - h * 0.72) + '" width="1.8" height="' + n(h * 0.24) + '"/><circle cx="' + n(cx) + '" cy="' + n(dy - h * 0.72) + '" r="2"/>';
    return o;
  }
  /* southern gateway-tower style: narrowing tiers and a barrel-vault crown with kalashas */
  function gopuram(cx, base, w, h) {
    var N = 5, th = h * 0.15, o = plinth(cx, base, w * 0.9), y = base - 12, i, ww;
    for (i = 0; i < N; i++) {
      ww = w * (1 - i * 0.15);
      o += '<rect x="' + n(cx - ww / 2) + '" y="' + n(y - th) + '" width="' + n(ww) + '" height="' + n(th - 1.5) + '"/>';
      for (var k = 0; k < 5; k++) o += '<rect x="' + n(cx - ww / 2 + 2 + k * (ww - 8) / 4) + '" y="' + n(y - th - 2.4) + '" width="4" height="2.6"/>';
      y -= th;
    }
    var wt = w * (1 - N * 0.15) + 8;
    o += '<path d="M' + n(cx - wt / 2) + ' ' + n(y) + 'C' + n(cx - wt / 2) + ' ' + n(y - h * 0.2) + ' ' + n(cx + wt / 2) + ' ' + n(y - h * 0.2) + ' ' + n(cx + wt / 2) + ' ' + n(y) + 'Z"/>';
    [-0.34, 0, 0.34].forEach(function (f) { o += '<rect x="' + n(cx + f * wt - 0.9) + '" y="' + n(y - h * 0.2 - 8) + '" width="1.8" height="8"/><ellipse cx="' + n(cx + f * wt) + '" cy="' + n(y - h * 0.2 - 9) + '" rx="2.4" ry="3"/>'; });
    return o;
  }
  /* an old temple sunk and tilted at the water's edge, in the manner of Ratneshwar */
  function leaning(cx, base, w, h, tilt) {
    return '<g transform="rotate(' + tilt + ' ' + n(cx) + ' ' + n(base) + ')">' + latina(cx, base, w, h) + '</g>';
  }
  function palm(x, base, h, lean, sd) {
    var r = seeded(sd || 3), tx = x + lean, ty = base - h, o = '';
    o += '<path d="M' + n(x - 2.8) + ' ' + n(base) + 'Q' + n(x + lean * 0.12 - 1.8) + ' ' + n(base - h * 0.55) + ' ' + n(tx - 1.4) + ' ' + n(ty) + 'L' + n(tx + 1.4) + ' ' + n(ty) + 'Q' + n(x + lean * 0.12 + 2.6) + ' ' + n(base - h * 0.55) + ' ' + n(x + 2.8) + ' ' + n(base) + 'Z"/>';
    var angs = [-172, -146, -120, -96, -72, -46, -20, 6], len = h * 0.3;
    angs.forEach(function (a, i) {
      var ar = a * Math.PI / 180, L = len * (0.85 + r() * 0.3);
      var c = [tx + Math.cos(ar) * L * 0.58, ty + Math.sin(ar) * L * 0.58 - L * 0.26];
      var t = [tx + Math.cos(ar) * L, ty + Math.sin(ar) * L * 0.36 + L * 0.4];
      o += '<path d="M' + n(tx) + ' ' + n(ty) + 'Q' + n(c[0]) + ' ' + n(c[1] - 2.4) + ' ' + n(t[0]) + ' ' + n(t[1]) + 'Q' + n(c[0]) + ' ' + n(c[1] + 2.4) + ' ' + n(tx) + ' ' + n(ty) + 'Z"/>';
      var d = "";
      for (var k = 1; k <= 7; k++) {
        var u = 0.25 + k * 0.1, px = (1 - u) * (1 - u) * tx + 2 * u * (1 - u) * c[0] + u * u * t[0], py = (1 - u) * (1 - u) * ty + 2 * u * (1 - u) * c[1] + u * u * t[1];
        var tx2 = 2 * (1 - u) * (c[0] - tx) + 2 * u * (t[0] - c[0]), ty2 = 2 * (1 - u) * (c[1] - ty) + 2 * u * (t[1] - c[1]), ln = Math.sqrt(tx2 * tx2 + ty2 * ty2) || 1;
        var nx = -ty2 / ln, ny = tx2 / ln, ll = 7 * (1 - u * 0.5);
        d += "M" + n(px) + " " + n(py) + "L" + n(px + nx * ll + tx2 / ln * 2) + " " + n(py + ny * ll + ty2 / ln * 2) + "M" + n(px) + " " + n(py) + "L" + n(px - nx * ll + tx2 / ln * 2) + " " + n(py - ny * ll + ty2 / ln * 2);
      }
      o += '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>';
    });
    o += '<circle cx="' + n(tx - 3) + '" cy="' + n(ty + 3) + '" r="2.6"/><circle cx="' + n(tx + 3) + '" cy="' + n(ty + 3.4) + '" r="2.6"/><circle cx="' + n(tx) + '" cy="' + n(ty + 6) + '" r="2.6"/>';
    return o;
  }
  /* peepal (kind 0) or banyan with hanging roots (kind 1) */
  function tree(x, base, rad, kind, sd) {
    var r = seeded(sd || 9), o = '', h = rad * (kind ? 1.0 : 1.25);
    o += '<path d="M' + n(x - rad * 0.12) + ' ' + n(base) + 'C' + n(x - rad * 0.1) + ' ' + n(base - h * 0.5) + ' ' + n(x - rad * 0.06) + ' ' + n(base - h * 0.7) + ' ' + n(x - rad * 0.2) + ' ' + n(base - h * 1.0) + 'L' + n(x + rad * 0.2) + ' ' + n(base - h * 1.0) + 'C' + n(x + rad * 0.06) + ' ' + n(base - h * 0.7) + ' ' + n(x + rad * 0.1) + ' ' + n(base - h * 0.5) + ' ' + n(x + rad * 0.12) + ' ' + n(base) + 'Z"/>';
    var cy = base - h * 1.1, nb = kind ? 11 : 9, i;
    for (i = 0; i < nb; i++) {
      var a = i / nb * Math.PI * 2, rr = rad * (0.5 + r() * 0.18), bx = x + Math.cos(a) * rad * (kind ? 0.82 : 0.58), by = cy + Math.sin(a) * rad * (kind ? 0.34 : 0.5);
      o += '<ellipse cx="' + n(bx) + '" cy="' + n(by) + '" rx="' + n(rr * (kind ? 0.72 : 0.62)) + '" ry="' + n(rr * 0.56) + '"/>';
    }
    o += '<ellipse cx="' + n(x) + '" cy="' + n(cy - rad * 0.08) + '" rx="' + n(rad * (kind ? 0.9 : 0.66)) + '" ry="' + n(rad * 0.6) + '"/>';
    if (kind) {
      for (i = 0; i < 7; i++) {
        var rx0 = x - rad * 0.9 + i * rad * 0.3 + r() * 6, len = (base - cy) * (0.5 + r() * 0.42);
        o += '<path d="M' + n(rx0) + ' ' + n(cy + rad * 0.25) + 'L' + n(rx0 + (r() - 0.5) * 4) + ' ' + n(cy + rad * 0.25 + len) + '" stroke="currentColor" stroke-width="1.4" fill="none"/>';
      }
    }
    return o;
  }
  /* egret on a step (fills itself, pale) */
  function egret(x, y, s) {
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')"><g class="egret">' +
      '<path d="M-3 -16L-3 0M3 -16L3 0" stroke="#4A3A38" stroke-width="1.4"/>' +
      '<path d="M-14 -22C-10 -34 8 -34 12 -24C8 -16 -8 -14 -14 -22Z" fill="#F7EEDC"/>' +
      '<path d="M8 -28C14 -34 12 -44 12 -50" stroke="#F7EEDC" stroke-width="3.2" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="13" cy="-52" rx="3.2" ry="2.4" fill="#F7EEDC"/><path d="M15.5 -52.2L24 -50L15.5 -50.6Z" fill="#E0A53A"/><circle cx="13.6" cy="-52.4" r=".7" fill="#201010"/></g></g>';
  }
  /* small V-shaped birds */
  function flock(pts, col) {
    var o = '<g class="birds">';
    pts.forEach(function (b, k) {
      o += '<path class="bird" style="animation-delay:' + n(k * 0.3) + 's" d="M' + b[0] + ' ' + b[1] + 'q' + n(5 * b[2]) + ' ' + n(-6 * b[2]) + ' ' + n(10 * b[2]) + ' 0q' + n(5 * b[2]) + ' ' + n(-6 * b[2]) + ' ' + n(10 * b[2]) + ' 0" fill="none" stroke="' + col + '" stroke-width="1.5" stroke-linecap="round"/>';
    });
    return o + '</g>';
  }

  function skyline(opts) {
    opts = opts || {};
    var o = '<svg class="skyline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 290" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><g fill="currentColor" color="currentColor">';
    o += palm(40, 288, 190, -12, 11) + palm(84, 288, 150, 14, 12);
    o += temple(250, 288, 0.9);
    o += tree(410, 288, 58, 0, 13);
    o += pidha(520, 288, 122, 118);
    o += chhatri(618, 288, 46, 64) + palm(660, 288, 168, 10, 14);
    o += gopuram(740, 288, 104, 168);
    o += pancharatha(880, 288, 84, 224);
    o += palm(986, 288, 178, 10, 15) + palm(1022, 288, 128, -12, 16);
    o += tree(1100, 288, 68, 1, 17);
    o += '<g transform="translate(2420 0) scale(-1 1)">' + temple(1210, 288, 0.8) + '</g>';
    o += pidha(1340, 288, 104, 100) + chhatri(1404, 288, 42, 58);
    o += leaning(1452, 288, 74, 150, 4);
    o += palm(1520, 288, 168, -10, 18) + tree(1556, 288, 40, 0, 19) + palm(1584, 288, 124, 8, 20);
    o += '<rect x="0" y="270" width="1600" height="20"/></g>';
    o += flock([[300, 70, 1.1], [326, 56, .9], [348, 78, .8], [1180, 54, 1], [1208, 70, .8]], "currentColor");
    o += '<g fill="none" stroke="' + (opts.line || "rgba(255,255,255,.13)") + '" stroke-width="1">';
    for (var y = 276; y > 262; y -= 5) o += '<path d="M0 ' + y + 'H1600"/>';
    o += "</g></svg>";
    return o;
  }

  /* ---------- shared bits for the scenes below ---------- */
  function swanBlock(p, x, y, s, flip, cls, delay) {
    var wl = y + 134 * s;
    return '<g class="swim ' + cls + '" style="animation-delay:' + delay + 's"><g opacity=".3" transform="translate(0 ' + n(2 * wl) + ') scale(1 -1)">' + swan(p, x, y, s, flip, "swan-refl") + '</g>' + swan(p, x, y, s, flip, "swan") + "</g>";
  }
  function stars(r, count, y0, y1, w) {
    var o = '';
    for (var i = 0; i < count; i++) o += '<circle class="star" cx="' + n(8 + r() * (w - 16)) + '" cy="' + n(y0 + r() * (y1 - y0)) + '" r="' + n(0.6 + r() * 1.2) + '" fill="#FFF6DD" style="animation-delay:' + n(r() * 4) + 's"/>';
    return o;
  }
  /* cusped arch opening (used for windows and alcoves) */
  function cuspArch(x0, x1, top, bottom) {
    var xc = (x0 + x1) / 2, w = x1 - x0;
    return "M" + x0 + " " + bottom + "V" + (top + w * 0.5) + "C" + x0 + " " + (top + w * 0.2) + " " + (xc - w * 0.2) + " " + (top + w * 0.14) + " " + xc + " " + top + "C" + (xc + w * 0.2) + " " + (top + w * 0.14) + " " + x1 + " " + (top + w * 0.2) + " " + x1 + " " + (top + w * 0.5) + "V" + bottom + "Z";
  }
  /* ---------- hero: Kashi at dusk from a balcony. Ghat silhouette, river, swans and their reflections ---------- */
  var ARCH = "M0 660V300C0 190 90 120 180 70C215 52 235 30 250 0C265 30 285 52 320 70C410 120 500 190 500 300V660Z";

  function hero() {
    var p = "h_", r = seeded(7), o = "", WL = 392;
    o += '<svg class="hero-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-26 -24 552 728" role="img" aria-label="A riverside town at dusk seen from a marble balcony: temples, palms and trees, the river with swans and their reflections, a boat, and the setting sun" preserveAspectRatio="xMidYMid meet">';
    o += "<defs>" + common(p) + diyaDefs(p) +
      '<clipPath id="' + p + 'clip"><path d="' + ARCH + '"/></clipPath>' +
      '<clipPath id="' + p + 'rv"><rect x="0" y="' + WL + '" width="500" height="150"/></clipPath>' +
      '<linearGradient id="' + p + 'sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#171B47"/><stop offset=".34" stop-color="#3A2A63"/><stop offset=".6" stop-color="#9A3A5C"/><stop offset=".82" stop-color="#E4703F"/><stop offset="1" stop-color="#F7B65E"/></linearGradient>' +
      '<linearGradient id="' + p + 'water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4624F"/><stop offset=".22" stop-color="#7A3F62"/><stop offset="1" stop-color="#1B2C48"/></linearGradient>' +
      '<radialGradient id="' + p + 'sunh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFC66B" stop-opacity=".75"/><stop offset="1" stop-color="#FFC66B" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + p + 'marb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF1DC"/><stop offset="1" stop-color="#E3CFA6"/></linearGradient>' +
      '<linearGradient id="' + p + 'vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A0A12" stop-opacity="0"/><stop offset="1" stop-color="#2A0A12" stop-opacity=".35"/></linearGradient>' +
      "</defs>";
    o += '<rect x="-18" y="662" width="536" height="14" rx="2" fill="url(#' + p + 'brassV)"/><rect x="-26" y="676" width="552" height="16" rx="2" fill="url(#' + p + 'brassH)"/>';
    o += '<g clip-path="url(#' + p + 'clip)">';
    o += '<rect width="500" height="420" fill="url(#' + p + 'sky)"/>' + stars(r, 36, 10, 200, 500);
    o += '<g class="sun"><circle cx="300" cy="352" r="130" fill="url(#' + p + 'sunh)"/></g><circle cx="300" cy="352" r="46" fill="#FFD98A"/><circle cx="300" cy="352" r="52" fill="none" stroke="#FFD98A" stroke-width="1.2" opacity=".6"/>';
    o += '<g transform="translate(108 164)"><circle r="17" fill="#F4E8C8"/><circle cx="7" cy="-3" r="15" fill="#2C2358"/></g>';
    o += flock([[70, 246, 1], [96, 232, .8], [118, 254, .7], [396, 220, .9], [420, 240, .7], [440, 226, .8]], "#150C20");
    // Kashi: the ghat, large
    o += '<g transform="translate(-118 ' + (WL - 230 * 0.88) + ') scale(.88)">' + ghat(p) + "</g>";
    // river with the ghat reflected and rippled
    o += '<rect x="0" y="' + WL + '" width="500" height="160" fill="url(#' + p + 'water)"/>';
    o += '<g clip-path="url(#' + p + 'rv)"><g opacity=".2" transform="translate(0 ' + 2 * WL + ') scale(1 -1)"><g transform="translate(-118 ' + (WL - 230 * 0.88) + ') scale(.88)">' + ghat(p + "r") + '</g></g></g>';
    o += waves(r, 0, 500, WL + 4, 540, 26);
    o += '<g class="glints">';
    for (var g = 0; g < 9; g++) o += '<rect class="glint" style="animation-delay:' + n(r() * 3) + 's" x="' + n(300 - (56 - g * 5) / 2 + (r() - .5) * 8) + '" y="' + (WL + 6 + g * 12) + '" width="' + n(56 - g * 5) + '" height="1.8" rx=".9" fill="#FFE9B0"/>';
    o += "</g>";
    // swans and a boat
    o += swanBlock(p, 70, 432, 0.62, false, "sw1", 0);
    o += swanBlock(p, 396, 452, 0.5, true, "sw2", -2.4);
    o += swanBlock(p, 226, 494, 0.3, false, "sw1", -5);
    o += boatBlock(p, 392, 412, 0.22, true, true, -4, 21, 412);
    o += pad(p, 262, 526, 26, 4.5) + lotus(p, 262, 524, 0.4, "lotus l1") + pad(p, 458, 530, 22, 4) + lotus(p, 458, 528, 0.34, "lotus l2");
    // balcony: balustrade of cusped arches, lotus-capped corner posts, marble floor, lamps
    o += '<rect x="-10" y="544" width="520" height="8" fill="#F4E6C8"/><rect x="-10" y="552" width="520" height="56" fill="url(#' + p + 'marb)"/>';
    for (var a = 16; a < 490; a += 54) {
      o += '<path d="' + cuspArch(a, a + 40, 560, 606) + '" fill="#2E2A52"/><path d="' + cuspArch(a, a + 40, 560, 606) + '" fill="none" stroke="#C9953A" stroke-width="1.4"/>';
    }
    o += '<rect x="-10" y="606" width="520" height="10" fill="url(#' + p + 'brassV)"/><rect x="-10" y="616" width="520" height="50" fill="#EADFC6"/>';
    o += '<path d="M-10 640H510" stroke="#CDB98C" stroke-width="1"/><path d="M60 616V666M180 616V666M300 616V666M420 616V666" stroke="#CDB98C" stroke-width="1"/>';
    [10, 490].forEach(function (x) {
      o += '<rect x="' + (x - 14) + '" y="430" width="28" height="186" fill="url(#' + p + 'marb)" stroke="#C9B58A" stroke-width=".8"/>';
      [452, 540].forEach(function (yy) { o += '<rect x="' + (x - 17) + '" y="' + yy + '" width="34" height="7" fill="url(#' + p + 'brassV)"/>'; });
      o += '<path d="M' + x + ' 428C' + (x - 16) + ' 418 ' + (x - 12) + ' 398 ' + x + ' 384C' + (x + 12) + ' 398 ' + (x + 16) + ' 418 ' + x + ' 428Z" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width=".7"/>';
    });
    o += diya(p, 118, 530, 0.4, 0.4) + diya(p, 366, 530, 0.4, 1.3);
    o += '<rect x="0" y="560" width="500" height="100" fill="url(#' + p + 'vig)"/>';
    o += "</g>";
    o += '<path d="' + ARCH + '" fill="none" stroke="url(#' + p + 'brass)" stroke-width="15"/>';
    o += '<g transform="translate(250 330) scale(.962 .962) translate(-250 -330)"><path d="' + ARCH + '" fill="none" stroke="#7A1A2C" stroke-width="2.4"/></g>';
    o += '<g transform="translate(250 330) scale(1.04 1.034) translate(-250 -330)"><path d="' + ARCH + '" fill="none" stroke="url(#' + p + 'brass)" stroke-width="2.4"/></g>';
    o += '<g transform="translate(250 -4)"><circle cx="0" cy="-8" r="5.5" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width=".6"/><path d="M0 -14L0 -22" stroke="url(#' + p + 'brass)" stroke-width="2"/><circle cx="0" cy="-23" r="2.4" fill="url(#' + p + 'brass)"/></g>';
    return o + "</svg>";
  }

  /* ---------- frameless illustrations: they sit on the page itself, beside the text ---------- */
  function peacockCut() {
    var p = "pk_";
    return '<svg class="cut-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-178 -216 310 232" role="img" aria-label="A peacock with its tail fanned" preserveAspectRatio="xMidYMax meet">' + peacock(p, 0, 0, 1, false, "peacock") + '</svg>';
  }
  function dresserCut() {
    var p = "dc_";
    return '<svg class="cut-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-132 -292 264 302" role="img" aria-label="An ornate bronze dressing table with a cusped mirror and a stool" preserveAspectRatio="xMidYMax meet"><defs>' + common(p) + '</defs>' + dresser(p) + '</svg>';
  }
  function rababCut() {
    var p = "rc_";
    return '<svg class="cut-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-30 -6 280 500" role="img" aria-label="A rabab, the lute, resting upright" preserveAspectRatio="xMidYMax meet"><defs>' + common(p) + '</defs>' +
      '<ellipse cx="116" cy="480" rx="84" ry="7" fill="#1A0A12" opacity=".25"/><g transform="rotate(5 110 474)">' + rabab(p) + '</g></svg>';
  }

  /* ---------- ghat strip used as a section divider: ghat, river, boats ---------- */
  function ghatStrip() {
    var p = "gs_", r = seeded(21), o;
    o = '<svg class="ghat-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 1000 314" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false"><defs>' + common(p) +
      '<linearGradient id="' + p + 'water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4624F"/><stop offset=".35" stop-color="#7A3F62"/><stop offset="1" stop-color="#2A2A52"/></linearGradient></defs>';
    o += ghat(p);
    o += flock([[150, 40, 1.2], [182, 28, 1], [210, 48, .9], [640, 20, 1.1], [672, 34, .9], [700, 18, .8]], "#2A1A3A");
    o += '<rect x="0" y="230" width="1000" height="76" fill="url(#' + p + 'water)"/>';
    o += waves(r, 0, 1000, 236, 300, 34);
    for (var g = 0; g < 14; g++) o += '<rect class="glint" style="animation-delay:' + n(r() * 3) + 's" x="' + n(20 + r() * 960) + '" y="' + n(234 + r() * 60) + '" width="' + n(14 + r() * 26) + '" height="1.6" rx=".8" fill="#FFD98A"/>';
    o += boatBlock(p, 214, 270, 0.62, false, true, 0, 18, 270);
    o += boatBlock(p, 470, 252, 0.3, true, true, -5, 24, 252);
    o += boatBlock(p, 640, 280, 0.5, true, false, -2, 20, 280);
    o += boatBlock(p, 880, 262, 0.42, false, true, -7, 22, 262);
    return o + '</svg>';
  }

  /* ---------- collection tiles: painted panels ---------- */
  var NICHE = "M56 470V226C56 130 124 78 200 34C276 78 344 130 344 226V470Z";

  /* ---------- a jhumka: lotus stud, enamelled bell, pearl drops. Origin at the ear hook. ---------- */
  function jhumka(p, x, y, s, delay) {
    var G = "url(#" + p + "brass)", GV = "url(#" + p + "brassV)", ED = "#5E3C12", o = '';
    o += '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')"><g class="keyswing" style="animation-delay:' + delay + 's">';
    o += '<path d="M0 6C0 -12 22 -20 26 -6C28 2 20 6 14 2" fill="none" stroke="' + GV + '" stroke-width="3.4" stroke-linecap="round"/><circle cx="14" cy="2" r="2.6" fill="' + G + '"/>';
    // lotus stud
    for (var i = 0; i < 10; i++) o += '<ellipse cx="0" cy="' + n(34 - 19) + '" rx="8" ry="14" transform="rotate(' + i * 36 + ' 0 34)" fill="' + GV + '" stroke="' + ED + '" stroke-width=".8"/>';
    o += '<circle cx="0" cy="34" r="16" fill="' + G + '" stroke="' + ED + '" stroke-width=".8"/>';
    for (var k = 0; k < 10; k++) o += '<circle cx="' + n(Math.cos(k * 0.628) * 12) + '" cy="' + n(34 + Math.sin(k * 0.628) * 12) + '" r="2.3" fill="url(#' + p + 'pearl)" stroke="#B3A68E" stroke-width=".3"/>';
    o += gem(p, 0, 34, 6.6, RED);
    o += '<circle cx="0" cy="62" r="6" fill="' + G + '" stroke="' + ED + '" stroke-width=".7"/>';
    // bell
    var bell = "M-9 66C-9 60 9 60 9 66C16 72 46 90 52 150H-52C-46 90 -16 72 -9 66Z";
    o += '<defs><clipPath id="' + p + 'bell' + n(x) + '"><path d="' + bell + '"/></clipPath></defs>';
    o += '<path d="' + bell + '" fill="' + GV + '" stroke="' + ED + '" stroke-width="1"/>';
    o += '<g clip-path="url(#' + p + 'bell' + n(x) + ')">';
    [-34, -17, 0, 17, 34].forEach(function (cx, i) {
      var yy = 116 + Math.abs(cx) * 0.18;
      o += '<path d="M' + cx + ' ' + (yy - 22) + 'C' + (cx - 9) + ' ' + (yy - 8) + ' ' + (cx - 9) + ' ' + (yy + 14) + ' ' + cx + ' ' + (yy + 22) + 'C' + (cx + 9) + ' ' + (yy + 14) + ' ' + (cx + 9) + ' ' + (yy - 8) + ' ' + cx + ' ' + (yy - 22) + 'Z" fill="' + (i % 2 ? "#14585B" : "#B3203A") + '" stroke="#F4D98C" stroke-width="1.2"/><path d="M' + (cx - 3.4) + ' ' + (yy - 12) + 'C' + (cx - 6.2) + ' ' + (yy - 4) + ' ' + (cx - 6) + ' ' + (yy + 6) + ' ' + (cx - 3.6) + ' ' + (yy + 12) + '" fill="none" stroke="#fff" stroke-opacity=".42" stroke-width="1.8" stroke-linecap="round"/>';
      o += '<circle cx="' + cx + '" cy="' + yy + '" r="2.6" fill="#F4D98C"/>';
    });
    [92, 138].forEach(function (yy) { o += '<path d="M-60 ' + yy + 'H60" stroke="#F4D98C" stroke-width="2.2" stroke-dasharray="0.1 5" stroke-linecap="round"/>'; });
    o += '<path d="M-9 66C-6 100 -30 130 -50 150" fill="none" stroke="#fff" stroke-width="3" opacity=".25"/></g>';
    o += '<rect x="-54" y="146" width="108" height="8" rx="3" fill="' + GV + '" stroke="' + ED + '" stroke-width=".8"/>';
    for (var b = -48; b <= 48; b += 12) {
      o += '<circle cx="' + b + '" cy="158" r="4.6" fill="' + G + '" stroke="' + ED + '" stroke-width=".6"/><path d="M' + b + ' 162V170" stroke="#C9953A" stroke-width="1"/><circle cx="' + b + '" cy="175" r="4.6" fill="url(#' + p + 'pearl)" stroke="#B3A68E" stroke-width=".4"/>';
    }
    o += '<path d="M0 164C-8 176 -8 192 0 197C8 192 8 176 0 164Z" fill="url(#' + p + 'pearl)" stroke="#B3A68E" stroke-width=".5"/>' + gem(p, 0, 164, 3.6, RED);
    return o + '</g></g>';
  }

  /* ---------- keychain: ring, swivel, chain, lotus medallion and a silk tassel. Origin at the ring centre. ---------- */
  function keychain(p, x, y, s) {
    var G = "url(#" + p + "brass)", GV = "url(#" + p + "brassV)", ED = "#5E3C12", o = '';
    o += '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')"><g class="keyswing">';
    o += '<circle r="32" fill="none" stroke="' + ED + '" stroke-width="8.6"/><circle r="32" fill="none" stroke="' + G + '" stroke-width="6"/><circle r="30.4" fill="none" stroke="#FFF1BD" stroke-width="1" opacity=".7"/>';
    o += '<rect x="-8" y="30" width="16" height="30" rx="8" fill="none" stroke="' + ED + '" stroke-width="5.6"/><rect x="-8" y="30" width="16" height="30" rx="8" fill="none" stroke="' + G + '" stroke-width="3.4"/>';
    for (var i = 0; i < 4; i++) {
      var cy = 66 + i * 17;
      if (i % 2 === 0) o += '<ellipse cx="0" cy="' + (cy + 8) + '" rx="5.4" ry="10.5" fill="none" stroke="' + ED + '" stroke-width="4.4"/><ellipse cx="0" cy="' + (cy + 8) + '" rx="5.4" ry="10.5" fill="none" stroke="' + G + '" stroke-width="2.6"/>';
      else o += '<ellipse cx="0" cy="' + (cy + 8) + '" rx="2.2" ry="10.5" fill="' + GV + '" stroke="' + ED + '" stroke-width=".8"/>';
    }
    // medallion
    o += '<g transform="translate(0 200)">';
    o += '<circle cx="0" cy="-60" r="6" fill="none" stroke="' + ED + '" stroke-width="4.4"/><circle cx="0" cy="-60" r="6" fill="none" stroke="' + G + '" stroke-width="2.6"/>';
    for (var k = 0; k < 12; k++) o += '<ellipse cx="0" cy="-38" rx="10.5" ry="21" transform="rotate(' + k * 30 + ')" fill="' + GV + '" stroke="' + ED + '" stroke-width=".9"/>';
    o += '<circle r="35" fill="' + G + '" stroke="' + ED + '" stroke-width="1"/><circle r="31" fill="none" stroke="#F4D98C" stroke-width="1.6" stroke-dasharray="0.1 4.6" stroke-linecap="round"/>';
    o += '<circle r="25" fill="#14585B" stroke="#F4D98C" stroke-width="1.4"/>';
    [[-50, 1], [50, 1], [-24, 1.1], [24, 1.1], [0, 1.2]].forEach(function (a) { o += '<path d="' + petalPath(19 * a[1], 6.4 * a[1]) + '" transform="translate(0 9) rotate(' + a[0] + ')" fill="url(#' + p + 'petal)" stroke="#B9577E" stroke-width=".4"/>'; });
    o += '<circle cy="9" r="3.4" fill="#E9B24A"/>';
    // pearl drops and tassel
    o += '<path d="M0 54V70" stroke="' + G + '" stroke-width="2.4"/>';
    [64, 74, 84].forEach(function (cy) { o += '<circle cy="' + cy + '" r="5" fill="url(#' + p + 'pearl)" stroke="#B3A68E" stroke-width=".4"/>'; });
    o += '<rect x="-7" y="90" width="14" height="10" rx="2" fill="' + GV + '" stroke="' + ED + '" stroke-width=".7"/>';
    o += '<path d="M-9 100C-14 118 -16 140 -13 158H13C16 140 14 118 9 100Z" fill="#B3203A" stroke="#7A1230" stroke-width=".8"/>';
    for (var t = -10; t <= 10; t += 3.3) o += '<path d="M' + t * 0.7 + ' 102L' + t + ' 160" stroke="#7A1230" stroke-width=".6" opacity=".7"/>';
    o += '<rect x="-11" y="112" width="22" height="5" rx="2" fill="' + GV + '" stroke="' + ED + '" stroke-width=".6"/></g>';
    return o + '</g></g>';
  }

  function tileEarrings() {
    var p = "te_";
    return '<svg class="tile-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + common(p) +
      '<clipPath id="' + p + 'c"><path d="' + NICHE + '"/></clipPath>' +
      '<linearGradient id="' + p + 'bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8EBCB"/><stop offset="1" stop-color="#EDC98B"/></linearGradient>' +
      '<pattern id="' + p + 'jl" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 3C25 11 31 14 37 20C31 26 25 29 20 37C15 29 9 26 3 20C9 14 15 11 20 3Z" fill="none" stroke="#E3B04B" stroke-width="1" opacity=".55"/></pattern></defs>' +
      '<rect width="400" height="480" fill="#8C1A2F"/><rect width="400" height="480" fill="url(#' + p + 'jl)"/>' +
      '<path d="' + NICHE + '" fill="url(#' + p + 'bg)"/>' +
      '<g clip-path="url(#' + p + 'c)"><circle cx="200" cy="236" r="118" fill="#F6E2B0"/><circle cx="200" cy="236" r="118" fill="none" stroke="#E3B04B" stroke-width="2"/><circle cx="200" cy="236" r="105" fill="none" stroke="#C9953A" stroke-width=".8" stroke-dasharray="2 4"/>' +
      jhumka(p, 134, 100, 0.95, 0) + jhumka(p, 266, 100, 0.95, -1.4) + '</g>' +
      '<path d="' + NICHE + '" fill="none" stroke="url(#' + p + 'brass)" stroke-width="6"/></svg>';
  }
  /* ---------- jali lattice tile (data-uri for CSS backgrounds) ---------- */
  function jaliURI(color, opacity) {
    var c = color || "#B8862F", op = opacity == null ? 0.22 : opacity;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><g fill="none" stroke="' + c + '" stroke-opacity="' + op + '" stroke-width="1">' +
      '<path d="M28 2C34 12 44 14 54 28C44 42 34 44 28 54C22 44 12 42 2 28C12 14 22 12 28 2Z"/>' +
      '<circle cx="28" cy="28" r="6.5"/><path d="M28 21.5V34.5M21.5 28H34.5"/>' +
      '<path d="M0 0L5 5M56 0L51 5M0 56L5 51M56 56L51 51"/></g></svg>';
    return "url(\"data:image/svg+xml;utf8," + encodeURIComponent(svg).replace(/%20/g, " ") + "\")";
  }

  function waves(r, x0, x1, y0, y1, count) {
    var o = '<g class="lines" opacity=".38">';
    for (var i = 0; i < count; i++) {
      var y = y0 + (y1 - y0) * (i / count) + r() * 5, x = x0 + r() * (x1 - x0 - 60), w = 24 + r() * 36;
      o += '<path class="wave" style="animation-delay:' + n(r() * 6) + 's" d="M' + n(x) + ' ' + n(y) + 'q' + n(w / 4) + ' -3.2 ' + n(w / 2) + ' 0q' + n(w / 4) + ' 3.2 ' + n(w / 2) + ' 0" fill="none" stroke="#FFEBC8" stroke-width="1.1" stroke-linecap="round"/>';
    }
    return o + "</g>";
  }
  function tileKeychains() {
    var p = "tk_";
    return '<svg class="tile-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + common(p) +
      '<clipPath id="' + p + 'c"><path d="' + NICHE + '"/></clipPath>' +
      '<radialGradient id="' + p + 'glow" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#F7C96A" stop-opacity=".6"/><stop offset="1" stop-color="#F7C96A" stop-opacity="0"/></radialGradient>' +
      '<pattern id="' + p + 'jl" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 3C25 11 31 14 37 20C31 26 25 29 20 37C15 29 9 26 3 20C9 14 15 11 20 3Z" fill="none" stroke="#E3B04B" stroke-width="1" opacity=".5"/></pattern></defs>' +
      '<rect width="400" height="480" fill="#12373A"/><rect width="400" height="480" fill="url(#' + p + 'jl)"/>' +
      '<path d="' + NICHE + '" fill="#0C2527"/>' +
      '<g clip-path="url(#' + p + 'c)"><circle cx="200" cy="250" r="170" fill="url(#' + p + 'glow)"/>' +
      keychain(p, 200, 92, 0.9) + '</g>' +
      '<path d="' + NICHE + '" fill="none" stroke="url(#' + p + 'brass)" stroke-width="6"/></svg>';
  }

  /* ---------- a jaali window with a dome above it; a lotus in a brass bowl at the lower right ---------- */
  function jaaliCut() {
    var p = "jw_", o = '', ED = "#6B3A2E";
    var open = "M74 372V222A86 86 0 0 1 246 222V372Z";
    o += '<svg class="cut-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 440" role="img" aria-label="A carved stone jaali window under a dome, with a lotus in a brass bowl at the lower right" preserveAspectRatio="xMidYMax meet"><defs>' + common(p) +
      '<linearGradient id="' + p + 'stone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6B48C"/><stop offset=".6" stop-color="#C98B67"/><stop offset="1" stop-color="#A8624F"/></linearGradient>' +
      '<linearGradient id="' + p + 'sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D2050"/><stop offset=".55" stop-color="#7A3A62"/><stop offset="1" stop-color="#F0914F"/></linearGradient>' +
      '<radialGradient id="' + p + 'warm" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#FFD98A" stop-opacity=".85"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="' + p + 'o"><path d="' + open + '"/></clipPath>' +
      '<pattern id="' + p + 'lat" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="translate(-6 0)"><path d="M17 0L34 17L17 34L0 17Z" fill="none" stroke="url(#' + p + 'stone)" stroke-width="5"/><path d="M17 0L34 17L17 34L0 17Z" fill="none" stroke="' + ED + '" stroke-width=".7" opacity=".6"/><path d="M17 8C20 13 22 15 26 17C22 19 20 21 17 26C14 21 12 19 8 17C12 15 14 13 17 8Z" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width=".6"/><circle cx="0" cy="0" r="3" fill="#C98B67"/><circle cx="34" cy="0" r="3" fill="#C98B67"/><circle cx="0" cy="34" r="3" fill="#C98B67"/><circle cx="34" cy="34" r="3" fill="#C98B67"/></pattern>' +
      '</defs>';
    // dome and finial
    o += '<path d="M160 4V24" stroke="url(#' + p + 'brass)" stroke-width="2.4"/><circle cx="160" cy="6" r="4" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width=".6"/>';
    o += '<path d="M82 100C80 54 120 34 160 24C200 34 240 54 238 100Z" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width="1.2"/>';
    [-44, -22, 0, 22, 44].forEach(function (dx) { o += '<path d="M' + (160 + dx * 0.15) + ' 30C' + (160 + dx * 0.9) + ' 50 ' + (160 + dx * 1.7) + ' 76 ' + (160 + dx * 1.78) + ' 98" fill="none" stroke="' + ED + '" stroke-width=".8" opacity=".55"/>'; });
    for (var i = 0; i < 9; i++) o += '<path d="' + petalPath(18, 6.5) + '" transform="translate(' + (90 + i * 17.5) + ' 104)" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width=".7"/>';
    o += '<rect x="60" y="102" width="200" height="14" rx="2" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width="1"/><path d="M62 108H258" stroke="#F4D3B0" stroke-width="1" opacity=".7"/>';
    // window: frame, lit opening, lattice
    o += '<path d="M50 384V222A110 110 0 0 1 270 222V384Z" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width="1.4"/>';
    o += '<path d="M60 384V222A100 100 0 0 1 260 222V384Z" fill="none" stroke="#F4D3B0" stroke-width="1" opacity=".6"/>';
    o += '<g clip-path="url(#' + p + 'o)"><rect x="70" y="130" width="180" height="250" fill="url(#' + p + 'sky)"/><ellipse class="halo" cx="160" cy="330" rx="110" ry="90" fill="url(#' + p + 'warm)"/><g transform="translate(190 190)"><circle r="14" fill="#F4E8C8"/><circle cx="6" cy="-2" r="12.5" fill="#33285F"/></g>' +
      '<rect x="70" y="130" width="180" height="250" fill="url(#' + p + 'lat)"/></g>';
    o += '<path d="' + open + '" fill="none" stroke="' + ED + '" stroke-width="2"/>';
    // keystone and bracketed sill
    o += '<path d="M150 112H170L166 134H154Z" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width=".7"/>';
    o += '<rect x="34" y="384" width="252" height="16" rx="2" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width="1"/><rect x="22" y="400" width="276" height="14" rx="2" fill="url(#' + p + 'stone)" stroke="' + ED + '" stroke-width="1"/>';
    for (var b = 50; b < 280; b += 22) o += '<path d="M' + b + ' 384V400" stroke="' + ED + '" stroke-width=".8" opacity=".6"/>';
    // lotus in a brass bowl, lower right corner
    o += '<g transform="translate(262 384)"><ellipse cx="0" cy="2" rx="48" ry="6" fill="#1A0A12" opacity=".25"/>' +
      '<path d="M-44 -22C-40 4 40 4 44 -22Z" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width="1"/><ellipse cx="0" cy="-22" rx="44" ry="7" fill="#2A5F62" stroke="#5E3C12" stroke-width="1"/>' +
      '<path d="M-40 -18C-20 -12 20 -12 40 -18" fill="none" stroke="#F4D98C" stroke-width="1.2" opacity=".7"/>' +
      '<ellipse cx="-26" cy="-23" rx="15" ry="3.6" fill="url(#' + p + 'pad)"/><ellipse cx="28" cy="-24" rx="12" ry="3.2" fill="url(#' + p + 'pad)"/></g>';
    o += bud(p, 280, 362, 0.9, 10) + lotus(p, 258, 362, 0.9, "lotus l1") + lotus(p, 232, 366, 0.5, "lotus l2");
    return o + '</svg>';
  }

  /* ---------- a pond for the foot of the page: big lotus leaves, blooms, buds, petals and floating lamps ---------- */
  function leaf(p, cx, cy, R, r, tilt, hue) {
    var ry = R * 0.34, pts = [], N = 44, th0 = tilt * Math.PI / 180, notch = 0.2, i;
    pts.push([cx, cy]);
    for (i = 0; i <= N; i++) {
      var th = th0 + notch + (Math.PI * 2 - 2 * notch) * i / N, w = 1 + 0.035 * Math.sin(th * 7 + R) + 0.02 * Math.sin(th * 13);
      pts.push([cx + Math.cos(th) * R * w, cy + Math.sin(th) * ry * w]);
    }
    var d = "M" + pts.map(function (q) { return n(q[0]) + " " + n(q[1]); }).join("L") + "Z";
    var veins = "";
    for (i = 0; i < 17; i++) {
      var a = th0 + notch + (Math.PI * 2 - 2 * notch) * (i + 0.5) / 17;
      veins += "M" + n(cx) + " " + n(cy) + "Q" + n(cx + Math.cos(a) * R * 0.5) + " " + n(cy + Math.sin(a) * ry * 0.52 - 1) + " " + n(cx + Math.cos(a) * R * 0.97) + " " + n(cy + Math.sin(a) * ry * 0.97);
    }
    var c1 = hue ? "#3F7F5B" : "#4C8A5A", c2 = hue ? "#1E4D3C" : "#235A3E";
    return '<g class="leaf" data-sway="' + n((r() - 0.5) * 3) + '"><g class="leaf-in" style="--d:' + n(12 + r() * 14) + 's;animation-delay:-' + n(r() * 12) + 's">' +
      '<ellipse cx="' + n(cx) + '" cy="' + n(cy + ry * 0.2 + 4) + '" rx="' + n(R * 1.02) + '" ry="' + n(ry * 1.05) + '" fill="#04141A" opacity=".4"/>' +
      '<path d="' + d + '" fill="' + c2 + '" stroke="#0E2E22" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<ellipse cx="' + n(cx - R * 0.08) + '" cy="' + n(cy - ry * 0.1) + '" rx="' + n(R * 0.86) + '" ry="' + n(ry * 0.8) + '" fill="' + c1 + '" opacity=".75"/>' +
      '<path d="' + veins + '" fill="none" stroke="#B8E2B5" stroke-width="1" opacity=".38"/>' +
      '<ellipse cx="' + n(cx) + '" cy="' + n(cy) + '" rx="' + n(R * 0.08) + '" ry="' + n(ry * 0.1) + '" fill="#C9E7B2" opacity=".6"/>' +
      '<path d="M' + n(cx - R * 0.7) + ' ' + n(cy - ry * 0.55) + 'Q' + n(cx - R * 0.1) + ' ' + n(cy - ry * 0.95) + ' ' + n(cx + R * 0.5) + ' ' + n(cy - ry * 0.78) + '" fill="none" stroke="#E6F4C8" stroke-width="2" stroke-linecap="round" opacity=".3"/>' +
      (r() > 0.55 ? '<ellipse cx="' + n(cx + R * (r() * 0.5)) + '" cy="' + n(cy + ry * 0.2) + '" rx="3.2" ry="1.7" fill="#F4FFF8" opacity=".75"/>' : '') +
      '</g></g>';
  }

  function pond() {
    var p = "pd_", r = seeded(88), items = [], W = 1600, H = 400, o = '', i;
    o += '<svg class="pond-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><defs>' + common(p) + diyaDefs(p) +
      '<linearGradient id="' + p + 'wat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B5A57"/><stop offset=".45" stop-color="#11403F"/><stop offset="1" stop-color="#0B2326"/></linearGradient>' +
      '<radialGradient id="' + p + 'refl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F7B6C8" stop-opacity=".5"/><stop offset="1" stop-color="#F7B6C8" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + p + 'dgl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB45A" stop-opacity=".7"/><stop offset="1" stop-color="#FFB45A" stop-opacity="0"/></radialGradient></defs>';
    var edge = "M0 34";
    for (i = 0; i < 16; i++) edge += "Q" + (50 + i * 100) + " " + (i % 2 ? 24 : 44) + " " + (100 + i * 100) + " 34";
    o += '<path d="' + edge + 'V' + H + 'H0Z" fill="url(#' + p + 'wat)"/><path d="' + edge + '" fill="none" stroke="#7FC3B4" stroke-width="1.6" opacity=".5"/>';
    // surface lines
    for (i = 0; i < 34; i++) {
      var yy = 60 + r() * 330, xx = r() * W;
      o += '<path d="M' + n(xx) + ' ' + n(yy) + 'h' + n(30 + r() * 80) + '" stroke="#A9E6D8" stroke-width="1.2" stroke-linecap="round" opacity="' + n(0.1 + r() * 0.18) + '"/>';
    }
    // leaves: far, middle and near rows
    var rows = [[76, 56, 14, 4], [130, 86, 11, 5], [200, 120, 9, 6], [290, 156, 8, 7], [372, 190, 7, 8]];
    rows.forEach(function (row, ri) {
      var cnt = row[2], k;
      for (k = 0; k < cnt; k++) {
        var cx = (k + 0.2 + r() * 0.6) / cnt * (W + 160) - 80, R = row[1] * (0.7 + r() * 0.6);
        items.push({ y: row[0] + r() * 18, t: 0, s: leaf(p, cx, row[0] + r() * 18, R, r, r() * 360, ri % 2) });
      }
    });
    // lotus blooms and buds
    var blooms = [[150, 232, 2.1], [470, 176, 1.7], [790, 262, 2.6], [1120, 196, 1.9], [1430, 246, 2.3], [640, 120, 1.3], [1280, 112, 1.2], [30, 140, 1.4]];
    blooms.forEach(function (b, bi) {
      var sx = b[0], sy = b[1], sc = b[2];
      var s = '<ellipse cx="' + sx + '" cy="' + (sy + 6) + '" rx="' + n(70 * sc) + '" ry="' + n(11 * sc) + '" fill="url(#' + p + 'refl)"/>' +
        '<ellipse class="ripple" style="animation-delay:-' + n(r() * 6) + 's" cx="' + sx + '" cy="' + (sy + 6) + '" rx="' + n(44 * sc) + '" ry="' + n(7 * sc) + '" fill="none" stroke="#C6F2E6" stroke-width="1.4"/>' +
        '<g class="pond-lotus" data-sway="' + n((r() - 0.5) * 2.4) + '">' + lotus(p, sx, sy, sc, "lotus l" + (1 + bi % 4)) + '</g>';
      items.push({ y: sy + 4, s: s });
    });
    [[330, 150, 1.5, 8], [700, 214, 1.7, -6], [980, 134, 1.4, 10], [1560, 168, 1.6, -8], [300, 300, 1.9, 6]].forEach(function (b) {
      items.push({ y: b[1] + 3, s: '<g class="pond-lotus" data-sway="' + n((r() - 0.5) * 2.4) + '">' + '<path d="M' + b[0] + ' ' + b[1] + 'q' + (b[3] > 0 ? 6 : -6) + ' 22 0 52" fill="none" stroke="#3E7A58" stroke-width="2.6" stroke-linecap="round"/>' + bud(p, b[0], b[1], b[2], b[3]) + '</g>' });
    });
    // floating lamps
    [[236, 318, 0.62], [590, 240, 0.5], [960, 330, 0.66], [1340, 308, 0.56]].forEach(function (d, di) {
      items.push({ y: d[1] + 20, s: '<g class="leaf" data-sway="' + n(di % 2 ? 1.6 : -1.6) + '"><g class="leaf-in" style="--d:' + (16 + di * 3) + 's;animation-delay:-' + di * 3 + 's"><ellipse cx="' + (d[0] + 40 * d[2]) + '" cy="' + (d[1] + 46 * d[2]) + '" rx="' + n(76 * d[2]) + '" ry="' + n(16 * d[2]) + '" fill="url(#' + p + 'dgl)"/>' + diya(p, d[0], d[1], d[2], di * 0.7) + '</g></g>' });
    });
    items.sort(function (a, b) { return a.y - b.y; });
    items.forEach(function (it) { o += it.s; });
    // drifting petals
    for (i = 0; i < 26; i++) {
      o += '<g class="leaf" data-sway="' + n((r() - 0.5) * 3.5) + '"><g class="leaf-in" style="--d:' + n(9 + r() * 12) + 's;animation-delay:-' + n(r() * 9) + 's"><ellipse cx="' + n(r() * W) + '" cy="' + n(70 + r() * 320) + '" rx="' + n(6 + r() * 5) + '" ry="' + n(2.6 + r() * 2) + '" transform="rotate(' + n(r() * 180) + ')" fill="#F4B6C8" opacity=".85"/></g></g>';
    }
    return o + '</svg>';
  }

  /* ---------- a cluster of lotus on stems; the page sways it a little as you scroll ---------- */
  function lotusSway() {
    var p = "ls_", o = '<svg class="lotus-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 300" aria-hidden="true" focusable="false"><defs>' + common(p) + '</defs>';
    var G = "#3E7A58";
    o += '<g fill="none" stroke="' + G + '" stroke-width="3" stroke-linecap="round">' +
      '<path d="M84 296C84 240 80 190 84 110"/><path d="M52 296C50 250 40 210 34 168"/><path d="M118 296C120 250 130 200 128 150"/><path d="M96 296C100 270 112 250 122 236"/></g>';
    o += '<ellipse cx="46" cy="284" rx="40" ry="8" fill="url(#' + p + 'pad)"/><ellipse cx="128" cy="288" rx="38" ry="7.5" fill="url(#' + p + 'pad)"/><path d="M46 284L84 280M128 288L100 284" stroke="#0F2D24" stroke-width="1" opacity=".5"/>';
    o += lotus(p, 84, 112, 0.92, "lotus") + lotus(p, 34, 170, 0.58, "lotus l2") + bud(p, 128, 152, 0.9, 8) + bud(p, 122, 238, 0.6, -10);
    return o + '</svg>';
  }

  /* ---------- craft panel: lamp-lit sandook with the necklace spilling out ---------- */
  function craftScene() {
    SPARK = true; spk = 0; gc = 0; rc = 0; pc = 0;
    var out = craftBuild();
    SPARK = false;
    return out;
  }
  function craftBuild() {
    var p = "cs_";
    return '<svg class="craft-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 440" role="img" aria-label="A carved sandook with a pearl necklace spilling out, lit by two brass lamps" preserveAspectRatio="xMidYMid meet"><defs>' + common(p, true) + jewelDefs(p) + diyaDefs(p) +
      '<radialGradient id="' + p + 'glow" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#F7C96A" stop-opacity=".5"/><stop offset="1" stop-color="#F7C96A" stop-opacity="0"/></radialGradient>' +
      '<pattern id="' + p + 'carp" width="26" height="16" patternUnits="userSpaceOnUse"><path d="M13 1L24 8L13 15L2 8Z" fill="none" stroke="#E3B04B" stroke-width="1" opacity=".5"/></pattern></defs>' +
      '<rect width="460" height="440" fill="#0E2A2D"/><ellipse class="halo" cx="230" cy="250" rx="230" ry="200" fill="url(#' + p + 'glow)"/>' +
      '<path d="M0 296L460 296V440H0Z" fill="#7A1230"/><path d="M0 296L460 296V440H0Z" fill="url(#' + p + 'carp)"/><path d="M0 302H460" stroke="#E3B04B" stroke-width="2"/>' +
      '<ellipse class="lpool" cx="72" cy="412" rx="128" ry="36" fill="url(#' + p + 'lpool)"/><ellipse class="lpool" style="animation-delay:-1.3s" cx="398" cy="412" rx="128" ry="36" fill="url(#' + p + 'lpool)"/>' +
      '<ellipse cx="242" cy="332" rx="168" ry="15" fill="rgba(6,1,1,.55)" filter="url(#' + p + 'blur)"/>' +
      '<g transform="translate(224 326) scale(1.72)">' + sandook(p, true) + '</g>' +
      diya(p, 40, 382, 0.62, 0.3, true) + diya(p, 366, 382, 0.62, 1.2, true) + '</svg>';
  }

  /* ---------- small marks ---------- */
  function divider(p, color) {
    p = p || "dv_"; var c = color || "#B8862F";
    return '<svg class="divider-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 40" aria-hidden="true" focusable="false"><defs>' + common(p) + '</defs>' +
      '<path d="M4 20H146" stroke="' + c + '" stroke-width="1" opacity=".7"/><path d="M214 20H356" stroke="' + c + '" stroke-width="1" opacity=".7"/>' +
      '<g transform="translate(180 34) scale(.52)">' + lotus(p, 0, 0, 1, "lotus") + '</g>' +
      '<path d="M4 20l5 -4l5 4l-5 4Z" fill="' + c + '"/><path d="M356 20l-5 -4l-5 4l5 4Z" fill="' + c + '"/></svg>';
  }
  function mark(p) {
    p = p || "mk_";
    return '<svg class="mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -64 80 76" aria-hidden="true" focusable="false"><defs>' + common(p) + '</defs>' + lotus(p, 0, 8, 0.95, "lotus") + "</svg>";
  }
  function diyaRow(p) {
    p = p || "dr_";
    return '<svg class="diyarow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64" aria-hidden="true" focusable="false"><defs>' + common(p) + diyaDefs(p) + '</defs>' +
      diya(p, 6, 6, 0.62, 0) + diya(p, 106, 6, 0.62, 0.7) + diya(p, 206, 6, 0.62, 1.4) + '</svg>';
  }

  /* ---------- an urli: a shallow antique brass bowl of water with a lily and small floating lamps ---------- */
  function waterLily(p, x, y, s) { // a lily seen from a little above, resting on its pad. base at the water line.
    var o = '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')">';
    o += '<g class="pad"><ellipse cx="0" cy="5" rx="52" ry="13" fill="url(#' + p + 'pad)"/><path d="M0 5L46 -1" stroke="#0F2D24" stroke-width="1.1" opacity=".5"/><path d="M0 5L-34 -4" stroke="#0F2D24" stroke-width=".8" opacity=".4"/></g>';
    var pet = function (len, wid, fill) { return '<path d="M0 0C' + n(-wid) + ' ' + n(-len * 0.3) + ' ' + n(-wid * 0.9) + ' ' + n(-len * 0.78) + ' 0 ' + n(-len) + 'C' + n(wid * 0.9) + ' ' + n(-len * 0.78) + ' ' + n(wid) + ' ' + n(-len * 0.3) + ' 0 0Z" fill="' + fill + '" stroke="#B9577E" stroke-width=".5" stroke-opacity=".55"/><path d="M0 -3L0 ' + n(-len * 0.8) + '" stroke="#D77F9F" stroke-width=".4" opacity=".45"/>'; };
    var k, a, ring = function (cnt, off, len, wid, sq, lift, fill) {
      var list = [];
      for (k = 0; k < cnt; k++) { a = off + k * 360 / cnt; list.push({ a: a, d: Math.sin(a * Math.PI / 180) }); }
      list.sort(function (u, v) { return u.d - v.d; });
      list.forEach(function (q) { o += '<g transform="translate(0 ' + lift + ') scale(1 ' + sq + ') rotate(' + q.a + ')">' + pet(len, wid, fill) + '</g>'; });
    };
    // the back petals and the flat outer ring first, then a raised ring, then an upright cup
    ring(10, 0, 40, 9.5, 0.34, 0, 'url(#' + p + 'petalD)');
    ring(8, 22, 33, 9.5, 0.62, -3, 'url(#' + p + 'petal)');
    o += '<ellipse cx="0" cy="-4" rx="9" ry="4" fill="#E9B24A"/>';
    [[-50, 26], [-26, 31], [0, 34], [26, 31], [50, 26]].forEach(function (q) {
      o += '<g transform="translate(0 -5) rotate(' + q[0] + ')">' + pet(q[1], 8.5, 'url(#' + p + 'petal)') + '</g>';
    });
    for (k = 0; k < 9; k++) o += '<circle cx="' + n(Math.sin(k * 0.9) * 4.5) + '" cy="' + n(-6 - (k % 3) * 1.6) + '" r=".9" fill="#F4C75A"/>';
    return o + '</g>';
  }
  function urli() {
    var p = 'ur_', r = seeded(41), o = '', i, CX = 210;
    function hw(y) { // half-width of the bowl at height y (the curve of its side)
      var best = 188, bd = 1e9;
      for (var t = 0; t <= 1; t += 0.01) {
        var u = 1 - t, yy = u * u * u * 102 + 3 * u * u * t * 160 + 3 * u * t * t * 196 + t * t * t * 202, xx = u * u * u * 22 + 3 * u * u * t * 26 + 3 * u * t * t * 76 + t * t * t * 146;
        if (Math.abs(yy - y) < bd) { bd = Math.abs(yy - y); best = CX - xx; }
      }
      return best;
    }
    function bandArc(y, wd) { var h = hw(y) * (wd || 1); return 'M' + n(CX - h) + ' ' + y + 'A' + n(h) + ' ' + n(h * 38 / 188) + ' 0 0 0 ' + n(CX + h) + ' ' + y; }
    var body = 'M22 100C26 160 76 196 146 202L274 202C344 196 394 160 398 100A188 38 0 0 1 22 100Z';
    function ellPath(rx, ry) { return 'M' + n(CX - rx) + ' 100A' + rx + ' ' + ry + ' 0 1 1 ' + n(CX + rx) + ' 100A' + rx + ' ' + ry + ' 0 1 1 ' + n(CX - rx) + ' 100Z'; }
    /* raised metal: a dark edge falling to the lower right, a bright edge on the upper left, and a face that shades from light to dark.
       tf is applied first, so the shadow always falls the same way however the shape is turned. */
    function emb(geom, tf, tag) {
      tag = tag || 'path'; tf = tf || '';
      return '<' + tag + ' ' + geom + ' transform="translate(1 1.3) ' + tf + '" fill="rgba(24,9,0,.42)"/><' + tag + ' ' + geom + ' transform="translate(-.7 -.8) ' + tf + '" fill="#FFF1BD" opacity=".75"/><' + tag + ' ' + geom + (tf ? ' transform="' + tf + '"' : '') + ' fill="url(#' + p + 'rel)"/>';
    }
    function ridge(d, w) { // a raised moulding
      return '<path d="' + d + '" transform="translate(0 1.3)" fill="none" stroke="rgba(24,9,0,.5)" stroke-width="' + w + '" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#C9953A" stroke-width="' + w + '" stroke-linecap="round"/><path d="' + d + '" transform="translate(0 -.6)" fill="none" stroke="#FFF1BD" stroke-width="' + n(w * 0.38) + '" stroke-linecap="round" opacity=".8"/>';
    }
    function beadRow(d, w, gap) { // a row of raised beads
      var da = ' stroke-linecap="round" stroke-dasharray="0.1 ' + gap + '"';
      return '<path d="' + d + '" transform="translate(.8 1.1)" fill="none" stroke="rgba(24,9,0,.5)" stroke-width="' + w + '"' + da + '/><path d="' + d + '" fill="none" stroke="#D5A246" stroke-width="' + w + '"' + da + '/><path d="' + d + '" transform="translate(-.5 -.6)" fill="none" stroke="#FFF6CF" stroke-width="' + n(w * 0.42) + '"' + da + '/>';
    }
    function lp(L, W) { // a lotus petal: full shoulders narrowing to a soft, pointed tip
      return 'M' + n(-W) + ' 0C' + n(-W * 1.0) + ' ' + n(-L * 0.46) + ' ' + n(-W * 0.62) + ' ' + n(-L * 0.78) + ' ' + n(-W * 0.07) + ' ' + n(-L * 0.99) + 'Q0 ' + n(-L * 1.2) + ' ' + n(W * 0.07) + ' ' + n(-L * 0.99) + 'C' + n(W * 0.62) + ' ' + n(-L * 0.78) + ' ' + n(W * 1.0) + ' ' + n(-L * 0.46) + ' ' + n(W) + ' 0Z';
    }
    o += '<svg class="urli-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 262" role="img" aria-label="An antique brass urli holding a water lily and small floating lamps" focusable="false"><defs>' + common(p) + diyaDefs(p) +
      '<clipPath id="' + p + 'body"><path d="' + body + '"/></clipPath>' +
      '<clipPath id="' + p + 'wclip"><ellipse cx="' + CX + '" cy="106" rx="166" ry="26"/></clipPath>' +
      '<linearGradient id="' + p + 'wat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A7570"/><stop offset=".5" stop-color="#155250"/><stop offset="1" stop-color="#0B2B2D"/></linearGradient>' +
      '<linearGradient id="' + p + 'wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E1A08"/><stop offset=".6" stop-color="#6B4515"/><stop offset="1" stop-color="#A97A28"/></linearGradient>' +
      '<linearGradient id="' + p + 'edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1E0F03" stop-opacity=".62"/><stop offset=".2" stop-color="#1E0F03" stop-opacity=".08"/><stop offset=".62" stop-color="#1E0F03" stop-opacity="0"/><stop offset="1" stop-color="#1E0F03" stop-opacity=".66"/></linearGradient>' +
      '<linearGradient id="' + p + 'pat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1606" stop-opacity="0"/><stop offset=".55" stop-color="#2A1606" stop-opacity=".12"/><stop offset="1" stop-color="#2A1606" stop-opacity=".58"/></linearGradient>' +
      '<linearGradient id="' + p + 'rel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6D983"/><stop offset=".4" stop-color="#D2A03C"/><stop offset=".75" stop-color="#9C6C22"/><stop offset="1" stop-color="#6E4512"/></linearGradient>' +
      '<filter id="' + p + 'grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 .1  0 0 0 0 .05  0 0 0 0 0  0 0 0 1.7 -.66"/></filter>' +
      '<filter id="' + p + 'mott" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".02 .045" numOctaves="3" seed="3"/><feColorMatrix type="matrix" values="0 0 0 0 .16  0 0 0 0 .09  0 0 0 0 .02  0 0 0 1.8 -.7"/></filter>' +
      '<filter id="' + p + 'verd" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".03 .07" numOctaves="3" seed="11"/><feColorMatrix type="matrix" values="0 0 0 0 .3  0 0 0 0 .56  0 0 0 0 .44  0 0 0 2 -.98"/></filter>' +
      '<linearGradient id="' + p + 'pet" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".1"/><stop offset="1" stop-color="#FFF1BD" stop-opacity=".9"/></linearGradient>' +
      '<radialGradient id="' + p + 'sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#28100A" stop-opacity=".42"/><stop offset=".6" stop-color="#28100A" stop-opacity=".16"/><stop offset="1" stop-color="#28100A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + p + 'dgl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB45A" stop-opacity=".75"/><stop offset="1" stop-color="#FFB45A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + p + 'refl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F7B6C8" stop-opacity=".45"/><stop offset="1" stop-color="#F7B6C8" stop-opacity="0"/></radialGradient>' +
      '</defs>';
    o += '<ellipse cx="' + (CX + 6) + '" cy="232" rx="190" ry="16" fill="url(#' + p + 'sh)"/>';
    // foot: a stepped pedestal. Seen from above only its front lip shows, so the base is a shallow curve, not an oval.
    var foot = 'M154 200C152 210 142 219 128 227Q210 238 292 227C278 219 268 210 266 200Z';
    o += '<path d="' + foot + '" fill="url(#' + p + 'brassH)" stroke="#5E3C12" stroke-width="1"/>';
    o += '<clipPath id="' + p + 'foot"><path d="' + foot + '"/></clipPath><g clip-path="url(#' + p + 'foot)">';
    // a knop with beads, then a flare of small petals pointing down
    o += '<path d="M156 207Q210 217 264 207" fill="none" stroke="#3A2208" stroke-width="5.4" stroke-linecap="round"/><path d="M156 207Q210 217 264 207" fill="none" stroke="url(#' + p + 'brass)" stroke-width="4"/><path d="M156 206Q210 216 264 206" fill="none" stroke="#FFF1BD" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="0.1 4.6" opacity=".9"/>';
    for (i = 0; i < 9; i++) {
      var fx = CX + (i - 4) * 15.5, u = (fx - CX) / 70, fy = 215.5 + 4.4 * (1 - u * u);
      o += emb('d="M-7.2 0C-7.6 6.4 -2.6 11.2 0 12.8C2.6 11.2 7.6 6.4 7.2 0Z"', 'translate(' + n(fx) + ' ' + n(fy) + ')');
    }
    o += '<rect x="120" y="196" width="180" height="44" fill="url(#' + p + 'pat)" opacity=".8"/><rect x="120" y="196" width="180" height="44" fill="url(#' + p + 'edge)" opacity=".7"/>';
    o += '<path d="M128 227Q210 238 292 227" fill="none" stroke="#3A2208" stroke-width="3"/><path d="M130 225.2Q210 236 290 225.2" fill="none" stroke="#FFF1BD" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="0.1 4.4" opacity=".85"/>';
    o += '</g>';
    // the bowl
    o += '<path d="' + body + '" fill="url(#' + p + 'brassH)" stroke="#5E3C12" stroke-width="1.1"/>';
    o += '<g clip-path="url(#' + p + 'body)">';
    o += '<rect x="0" y="90" width="420" height="130" fill="url(#' + p + 'brassV)" opacity=".34"/>';
    // chased and raised work, lit from the upper left
    function petalRow(y, cnt, L, W, off) {
      var h = hw(y), ry = h * 38 / 188, list = [], j;
      for (j = 0; j < cnt; j++) { var th = (j + 0.5 + off) / cnt * Math.PI; list.push({ th: th, d: Math.abs(Math.cos(th)) }); }
      list.sort(function (u, v) { return v.d - u.d; }); // the side petals first, the front ones over them
      list.forEach(function (q) {
        var px = CX - Math.cos(q.th) * h, py = y + Math.sin(q.th) * ry, sx = Math.max(0.3, Math.sin(q.th)) * (h / 188 + 0.1);
        var tf = 'translate(' + n(px) + ' ' + n(py) + ') rotate(' + n(-Math.cos(q.th) * 17) + ') scale(' + n(sx) + ' 1)';
        o += emb('d="' + lp(L, W) + '"', tf);
        o += emb('d="' + lp(L * 0.66, W * 0.56) + '"', tf + ' translate(0 -3)');
        o += '<path d="M0 ' + n(-L * 0.08) + 'L0 ' + n(-L * 0.52) + '" transform="' + tf + '" stroke="rgba(24,9,0,.55)" stroke-width="1.1" stroke-linecap="round" fill="none"/><path d="M0 ' + n(-L * 0.08) + 'L0 ' + n(-L * 0.52) + '" transform="translate(-.5 -.5) ' + tf + '" stroke="#FFF1BD" stroke-width=".6" stroke-linecap="round" fill="none" opacity=".7"/>';
      });
    }
    // the lip: a moulding, a row of beads, a moulding
    o += ridge(bandArc(112), 2) + beadRow(bandArc(117), 3, 6.2) + ridge(bandArc(122), 2);
    // a vine of rosettes and leaves
    (function () {
      var h = hw(130), ry = h * 38 / 188, cnt = 13, j, vine = 'M' + n(CX - h) + ' 130';
      for (j = 0; j <= 80; j++) { var t2 = Math.PI * (1 - j / 80); vine += 'L' + n(CX + Math.cos(t2) * h) + ' ' + n(130 + Math.sin(t2) * ry + Math.sin(j * 0.64) * 2.6); }
      o += ridge(vine, 1.6);
      for (j = 0; j < cnt; j++) {
        var th = (j + 0.5) / cnt * Math.PI, sx = Math.max(0.3, Math.sin(th)), px = CX - Math.cos(th) * h, py = 130 + Math.sin(th) * ry, tf = 'translate(' + n(px) + ' ' + n(py) + ') scale(' + n(sx) + ' 1)';
        o += emb('d="M0 0C-9 -2 -13 4 -15 8C-8 8 -3 5 0 0Z"', tf) + emb('d="M0 0C9 -2 13 4 15 8C8 8 3 5 0 0Z"', tf);
        for (var q = 0; q < 8; q++) o += emb('cx="0" cy="-3.6" rx="1.9" ry="3.4"', tf + ' rotate(' + q * 45 + ')', 'ellipse');
        o += emb('cx="0" cy="0" r="1.9"', tf, 'circle');
      }
    })();
    o += ridge(bandArc(139), 2.2);
    // the belly: a row of lotus petals over a lower row that shows between them
    petalRow(195, 11, 22, 16, 0.5);
    petalRow(172, 11, 28, 21, 0);
    o += ridge(bandArc(200), 2.2);
    // antique finish: shaded edges and foot, blotchy tarnish, a faint green bloom, fine pitted grain
    o += '<rect x="0" y="90" width="420" height="130" fill="url(#' + p + 'edge)"/><rect x="0" y="90" width="420" height="130" fill="url(#' + p + 'pat)"/>';
    o += '<rect x="0" y="90" width="420" height="130" filter="url(#' + p + 'mott)" opacity=".34"/><rect x="0" y="90" width="420" height="130" filter="url(#' + p + 'verd)" opacity=".3"/><rect x="0" y="90" width="420" height="130" filter="url(#' + p + 'grain)" opacity=".26"/>';
    o += '<path d="M54 128C60 160 80 186 118 198" fill="none" stroke="#FFF3BF" stroke-width="2.6" stroke-linecap="round" opacity=".16"/>';
    o += '</g>';
    // the rim: a broad flat lip with a bead edge, the dark inside wall, then the water
    o += '<ellipse cx="' + CX + '" cy="100" rx="190" ry="39" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width="1.2"/>';
    o += beadRow(ellPath(181, 35), 2.8, 7.4) + ridge(ellPath(188, 38), 1.4);
    o += '<ellipse cx="' + CX + '" cy="100" rx="173" ry="31.5" fill="url(#' + p + 'wall)" stroke="#3A2208" stroke-width="1"/>';
    o += '<ellipse cx="' + CX + '" cy="106" rx="166" ry="26" fill="url(#' + p + 'wat)"/>';
    o += '<g clip-path="url(#' + p + 'wclip)">';
    for (i = 0; i < 18; i++) o += '<path d="M' + n(CX - 150 + r() * 300) + ' ' + n(94 + r() * 24) + 'h' + n(10 + r() * 26) + '" stroke="#A9E6D8" stroke-width=".9" stroke-linecap="round" opacity="' + n(0.12 + r() * 0.2) + '"/>';
    o += '<ellipse cx="' + (CX - 20) + '" cy="92" rx="110" ry="8" fill="#fff" opacity=".07"/>';
    o += '</g>';
    // everything afloat is drawn unclipped, so lily petals and flames can rise over the far edge of the bowl
    var items = [];
    [[96, 112, .6], [330, 112, .55], [214, 100, .5]].forEach(function (q) { items.push({ y: q[1] - 2, f: { d: 10, dx: 3, dy: 1, r: 1 }, s: '<g class="pad" style="animation-duration:' + n(4 + r() * 2) + 's"><ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="' + n(30 * q[2] + 8) + '" ry="' + n(8 * q[2] + 2) + '" fill="url(#' + p + 'pad)"/><path d="M' + q[0] + ' ' + q[1] + 'L' + (q[0] + 22) + ' ' + (q[1] - 2) + '" stroke="#0F2D24" stroke-width=".9" opacity=".5"/></g>' }); });
    [[92, 107, .62], [146, 99, .8], [200, 112, .46], [238, 103, .56], [290, 99, .68], [334, 108, .5], [118, 115, .42]].forEach(function (q, li) {
      items.push({ y: q[1], f: { d: 8.5, dx: 3.2, dy: 1.1, r: 1.3 }, s: '<ellipse cx="' + q[0] + '" cy="' + (q[1] + 3) + '" rx="' + n(56 * q[2] + 10) + '" ry="' + n(8 * q[2] + 2) + '" fill="url(#' + p + 'refl)"/><ellipse class="ripple" style="animation-delay:-' + n(li * 1.3) + 's" cx="' + q[0] + '" cy="' + (q[1] + 3) + '" rx="' + n(36 * q[2] + 8) + '" ry="' + n(6 * q[2] + 1.5) + '" fill="none" stroke="#C6F2E6" stroke-width=".7" opacity=".55"/>' + waterLily(p, q[0], q[1], q[2]) });
    });
    [[58, 107, .27, 0.2], [114, 113, .31, 1.1], [172, 109, .26, 1.8], [196, 119, .34, .7], [232, 114, .28, 2.3], [268, 113, .34, .4], [304, 107, .27, 1.5], [338, 112, .26, 2.0], [250, 97, .24, 1.3], [312, 119, .3, .9], [146, 119, .26, 2.6]].forEach(function (d, di) {
      var dx = d[0], dy = d[1], sc = d[2];
      items.push({ y: dy + 6, f: { d: 6.5, dx: 5.5, dy: 1.5, r: 2.8 }, s: '<ellipse cx="' + n(dx + 28 * sc) + '" cy="' + (dy + 4) + '" rx="' + n(60 * sc) + '" ry="' + n(10 * sc) + '" fill="url(#' + p + 'dgl)"/><ellipse class="ripple" style="animation-delay:-' + n(di * 1.1) + 's" cx="' + n(dx + 28 * sc) + '" cy="' + (dy + 6) + '" rx="' + n(52 * sc) + '" ry="' + n(8 * sc) + '" fill="none" stroke="#C6F2E6" stroke-width=".7" opacity=".6"/>' + diya(p, dx, dy - 16 * sc * 2.1, sc, d[3]) });
    });
    for (i = 0; i < 9; i++) { var px = CX - 140 + r() * 280, py = 96 + r() * 22; items.push({ y: py, f: { d: 9, dx: 6, dy: 1.6, r: 14 }, s: '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="' + n(3 + r() * 2) + '" ry="1.6" transform="rotate(' + n(r() * 40 - 20) + ' ' + n(px) + ' ' + n(py) + ')" fill="' + (i % 2 ? '#E9892B' : '#F4B24A') + '"/>' }); }
    items.sort(function (a, b) { return a.y - b.y; });
    items.forEach(function (it, ii) {
      if (!it.f) { o += it.s; return; }
      var f = it.f; // lilies and lamps drift on their own slow clocks
      o += '<g class="flt" style="--d:' + n(f.d + (ii % 4) * 1.3) + 's;--dx:' + f.dx + 'px;--dy:' + f.dy + 'px;--r:' + f.r + 'deg;animation-delay:-' + n((ii * 2.37) % 9) + 's">' + it.s + '</g>';
    });
    // the near lip covers the water's front edge and catches the light
    o += '<path d="M44 114A173 31.5 0 0 0 376 114" fill="none" stroke="#FFF3BF" stroke-width="1.4" opacity=".55" stroke-linecap="round" transform="translate(0 -4)"/>';
    return o + '</svg>';
  }

  /* ---------- a hand holding a lotus bud, drawn to sit behind the welcome.
     After the sketch: a fist closed round the stem, the thumb across the top, four curled fingers in front of the stem,
     the forearm falling away to the lower left. Alta is on the fingertips only. ---------- */
  /* ---------- ornamental border for text panels (CSS border-image), miniature-folio style ---------- */
  function folioURI() {
    function flower(cx, cy, r, col, ctr) {
      var o = "";
      for (var i = 0; i < 8; i++) o += '<ellipse cx="' + cx + '" cy="' + (cy - r * 0.62) + '" rx="' + n(r * 0.26) + '" ry="' + n(r * 0.42) + '" transform="rotate(' + i * 45 + ' ' + cx + ' ' + cy + ')" fill="' + col + '"/>';
      return o + '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(r * 0.28) + '" fill="' + ctr + '"/>';
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90">' +
      '<path fill-rule="evenodd" fill="#7E1426" d="M0 0H90V90H0Z M30 30V60H60V30Z"/>' +
      '<path fill-rule="evenodd" fill="none" stroke="#E3B04B" stroke-width="1.6" d="M3 3H87V87H3Z M27 27V63H63V27Z"/>';
    [[45, 15], [45, 75], [15, 45], [75, 45]].forEach(function (c) {
      svg += flower(c[0], c[1], 9, "#F2D78E", "#B3203A");
      var h = c[0] === 45;
      svg += '<path d="M' + (h ? c[0] - 14 : c[0]) + ' ' + (h ? c[1] : c[1] - 14) + 'q' + (h ? "-5 -3 -8 0" : "0 -5 0 -8") + '" fill="none" stroke="#5E9A62" stroke-width="1.4"/><path d="M' + (h ? c[0] + 14 : c[0]) + ' ' + (h ? c[1] : c[1] + 14) + 'q' + (h ? "5 3 8 0" : "0 5 0 8") + '" fill="none" stroke="#5E9A62" stroke-width="1.4"/>';
    });
    [[15, 15], [75, 15], [15, 75], [75, 75]].forEach(function (c) { svg += flower(c[0], c[1], 12, "#F2D78E", "#E3B04B"); });
    svg += "</svg>";
    return "url(\"data:image/svg+xml;utf8," + encodeURIComponent(svg).replace(/%20/g, " ") + "\")";
  }

  return {
    hero: hero, peacockCut: peacockCut, jaaliCut: jaaliCut, lotusSway: lotusSway, pond: pond, dresserCut: dresserCut, rababCut: rababCut, ghatStrip: ghatStrip, skyline: skyline, tileEarrings: tileEarrings, tileKeychains: tileKeychains,
    craftScene: craftScene, divider: divider, mark: mark, diyaRow: diyaRow, urli: urli, jaliURI: jaliURI, folioURI: folioURI,
    common: common, lotus: lotus, swan: swan, peacock: peacock, dresser: dresser, boat: boat, sandook: sandook, rabab: rabab, diya: diya, ARCH: ARCH
  };
});
