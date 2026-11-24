/* Page graphics (vector): palace-and-lotus-lake hero, Khajuraho-style temple skyline,
   swans, lotus, brass hand mirror, rabab, diya, pearl garland, vine frieze.
   Everything is generated as inline SVG strings; motion is done in css/style.css. */
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

  /* ---------- shared gradients (prefix keeps ids unique per svg) ---------- */
  function common(p) {
    return '' +
      '<linearGradient id="' + p + 'brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6DD92"/><stop offset=".4" stop-color="#C9953A"/><stop offset=".75" stop-color="#9A6A22"/><stop offset="1" stop-color="#E2B964"/></linearGradient>' +
      '<linearGradient id="' + p + 'brassV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4D98C"/><stop offset=".5" stop-color="#C9953A"/><stop offset="1" stop-color="#7C5219"/></linearGradient>' +
      '<linearGradient id="' + p + 'brassH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7C5219"/><stop offset=".3" stop-color="#F4D98C"/><stop offset=".55" stop-color="#C9953A"/><stop offset="1" stop-color="#6B4515"/></linearGradient>' +
      '<linearGradient id="' + p + 'petal" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF6EA"/><stop offset=".55" stop-color="#F7CBD3"/><stop offset="1" stop-color="#E27A9A"/></linearGradient>' +
      '<linearGradient id="' + p + 'petalD" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F6D7D8"/><stop offset=".6" stop-color="#E58EA6"/><stop offset="1" stop-color="#B8456F"/></linearGradient>' +
      '<linearGradient id="' + p + 'swan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F2E9DA"/><stop offset="1" stop-color="#C9B9A4"/></linearGradient>' +
      '<radialGradient id="' + p + 'pearl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#F2EADB"/><stop offset="1" stop-color="#C5B79F"/></radialGradient>' +
      '<linearGradient id="' + p + 'pad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4F8A5E"/><stop offset="1" stop-color="#1D4A3A"/></linearGradient>';
  }

  /* ---------- elements ---------- */
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

  /* swan facing right, drawn in a 200 x 150 box; fill via gradient */
  function swan(p, x, y, s, flip, cls) {
    // tapered neck from a centre line
    var P0 = [150, 100], P1 = [176, 74], P2 = [140, 56], P3 = [156, 36];
    var Q0 = P3, Q1 = [166, 22], Q2 = [150, 14], Q3 = [168, 12];
    function bz(a, b, c, d, t) {
      var m = 1 - t;
      return [m * m * m * a[0] + 3 * m * m * t * b[0] + 3 * m * t * t * c[0] + t * t * t * d[0],
        m * m * m * a[1] + 3 * m * m * t * b[1] + 3 * m * t * t * c[1] + t * t * t * d[1]];
    }
    var pts = [], steps = 22;
    for (var i = 0; i <= steps; i++) pts.push(bz(P0, P1, P2, P3, i / steps));
    for (var j = 1; j <= 12; j++) pts.push(bz(Q0, Q1, Q2, Q3, j / 12));
    var L = [], R = [];
    for (var k = 0; k < pts.length; k++) {
      var a = pts[Math.max(0, k - 1)], b = pts[Math.min(pts.length - 1, k + 1)];
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len, ny = dx / len, t = k / (pts.length - 1);
      var w = 10.5 - 6.2 * Math.pow(t, 0.75) + (t < 0.12 ? (0.12 - t) * 40 : 0);
      L.push([pts[k][0] + nx * w, pts[k][1] + ny * w]);
      R.push([pts[k][0] - nx * w, pts[k][1] - ny * w]);
    }
    var d = "M" + n(L[0][0]) + " " + n(L[0][1]);
    for (var m = 1; m < L.length; m++) d += "L" + n(L[m][0]) + " " + n(L[m][1]);
    for (var q = R.length - 1; q >= 0; q--) d += "L" + n(R[q][0]) + " " + n(R[q][1]);
    d += "Z";
    var body = "M10 92C26 84 40 62 78 58C104 56 128 70 148 92C168 108 164 128 142 134C112 142 62 140 38 126C24 118 16 104 10 92Z";
    var head = bz(Q0, Q1, Q2, Q3, 1);
    var o = '<g class="' + (cls || "swan") + '" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + (flip ? -s : s) + ' ' + s + ')">' +
      '<g class="swan-in">' +
      '<path d="' + body + '" fill="url(#' + p + 'swan)" stroke="#BBA98F" stroke-width=".8"/>' +
      '<path d="' + d + '" fill="url(#' + p + 'swan)" stroke="#BBA98F" stroke-width=".8" stroke-linejoin="round"/>' +
      // wing feathers
      '<path d="M26 92C46 78 70 72 96 80C80 82 62 90 50 104" fill="none" stroke="#CDBCA4" stroke-width="1.1"/>' +
      '<path d="M40 104C62 90 88 90 112 102C92 100 74 106 60 118" fill="none" stroke="#CDBCA4" stroke-width="1.1"/>' +
      '<path d="M52 118C76 108 100 110 122 120C102 118 84 124 72 132" fill="none" stroke="#D9CBB6" stroke-width="1"/>' +
      '<ellipse cx="' + n(head[0]) + '" cy="' + n(head[1]) + '" rx="10" ry="7.2" transform="rotate(8 ' + n(head[0]) + ' ' + n(head[1]) + ')" fill="url(#' + p + 'swan)" stroke="#BBA98F" stroke-width=".7"/>' +
      // beak
      '<path d="M' + n(head[0] + 7) + ' ' + n(head[1] - 3) + 'C' + n(head[0] + 14) + ' ' + n(head[1] - 2) + ' ' + n(head[0] + 22) + ' ' + n(head[1] + 1) + ' ' + n(head[0] + 24) + ' ' + n(head[1] + 4) + 'C' + n(head[0] + 17) + ' ' + n(head[1] + 6) + ' ' + n(head[0] + 11) + ' ' + n(head[1] + 5) + ' ' + n(head[0] + 6) + ' ' + n(head[1] + 3) + 'Z" fill="#E08A2E"/>' +
      '<path d="M' + n(head[0] + 6) + ' ' + n(head[1] - 3) + 'C' + n(head[0] + 4) + ' ' + n(head[1]) + ' ' + n(head[0] + 4) + ' ' + n(head[1] + 2) + ' ' + n(head[0] + 6) + ' ' + n(head[1] + 3) + '" stroke="#2A1810" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="' + n(head[0] + 2) + '" cy="' + n(head[1] - 1.5) + '" r="1.5" fill="#1D1209"/>' +
      '</g></g>';
    return o;
  }

  /* brass oil lamp, 100 x 56 box */
  function diya(p, x, y, s, delay) {
    return '<g class="diya" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')">' +
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

  /* ---------- palace ---------- */
  function dome(cx, base, w, h, fill) {
    var hw = w / 2;
    return '<path d="M' + n(cx - hw) + ' ' + n(base) + 'C' + n(cx - hw * 1.08) + ' ' + n(base - h * 0.42) + ' ' + n(cx - hw * 0.36) + ' ' + n(base - h * 0.7) + ' ' + n(cx) + ' ' + n(base - h) +
      'C' + n(cx + hw * 0.36) + ' ' + n(base - h * 0.7) + ' ' + n(cx + hw * 1.08) + ' ' + n(base - h * 0.42) + ' ' + n(cx + hw) + ' ' + n(base) + 'Z" fill="' + fill + '"/>' +
      '<rect x="' + n(cx - 0.9) + '" y="' + n(base - h - 12) + '" width="1.8" height="14" fill="' + fill + '"/>' +
      '<circle cx="' + n(cx) + '" cy="' + n(base - h - 13) + '" r="2.4" fill="' + fill + '"/>';
  }
  function chhatri(x, floor, s, fill) {
    return '<g fill="' + fill + '">' +
      '<rect x="' + n(x - 9 * s) + '" y="' + n(floor - 2 * s) + '" width="' + n(18 * s) + '" height="' + n(2 * s) + '"/>' +
      '<rect x="' + n(x - 8 * s) + '" y="' + n(floor - 16 * s) + '" width="' + n(1.8 * s) + '" height="' + n(14 * s) + '"/>' +
      '<rect x="' + n(x - 2.9 * s) + '" y="' + n(floor - 16 * s) + '" width="' + n(1.8 * s) + '" height="' + n(14 * s) + '"/>' +
      '<rect x="' + n(x + 1.1 * s) + '" y="' + n(floor - 16 * s) + '" width="' + n(1.8 * s) + '" height="' + n(14 * s) + '"/>' +
      '<rect x="' + n(x + 6.2 * s) + '" y="' + n(floor - 16 * s) + '" width="' + n(1.8 * s) + '" height="' + n(14 * s) + '"/>' +
      '<rect x="' + n(x - 10 * s) + '" y="' + n(floor - 19 * s) + '" width="' + n(20 * s) + '" height="' + n(3 * s) + '"/>' +
      dome(x, floor - 19 * s, 17 * s, 15 * s, fill) + "</g>";
  }
  function arch(x, y, w, h, fill) {
    return '<path d="M' + n(x) + ' ' + n(y + h) + 'V' + n(y + w / 2) + 'A' + n(w / 2) + ' ' + n(w / 2) + ' 0 0 1 ' + n(x + w) + ' ' + n(y + w / 2) + 'V' + n(y + h) + 'Z" fill="' + fill + '"/>';
  }
  function merlons(x0, x1, y, s, fill) {
    var o = "";
    for (var x = x0; x < x1; x += 11 * s) o += '<path d="M' + n(x) + ' ' + y + 'V' + n(y - 4 * s) + 'Q' + n(x + 2.5 * s) + ' ' + n(y - 8 * s) + ' ' + n(x + 5 * s) + ' ' + n(y - 4 * s) + 'V' + y + 'Z" fill="' + fill + '"/>';
    return o;
  }
  /* returns palace silhouette group with base at y=base, centred on cx */
  function palace(cx, base, s, fill, glow, winClass) {
    var o = '<g transform="translate(' + n(cx) + ' ' + n(base) + ') scale(' + s + ')">';
    // everything drawn with base at y=0, centre x=0
    o += '<g fill="' + fill + '">' +
      '<rect x="-205" y="-12" width="410" height="12"/>' +
      '<rect x="-60" y="-84" width="120" height="76"/>' +
      '<rect x="-34" y="-110" width="68" height="28"/>' +
      '<rect x="-148" y="-52" width="88" height="44"/>' +
      '<rect x="60" y="-52" width="88" height="44"/>' +
      '<rect x="-190" y="-40" width="44" height="30"/>' +
      '<rect x="146" y="-40" width="44" height="30"/>' +
      // minarets
      '<rect x="-186" y="-112" width="14" height="76"/>' +
      '<rect x="172" y="-112" width="14" height="76"/>' +
      '<rect x="-124" y="-92" width="9" height="44"/>' +
      '<rect x="115" y="-92" width="9" height="44"/>' +
      '</g>';
    o += dome(0, -110, 70, 70, fill);
    o += dome(-179, -112, 20, 26, fill) + dome(179, -112, 20, 26, fill);
    o += dome(-119.5, -92, 14, 18, fill) + dome(119.5, -92, 14, 18, fill);
    o += chhatri(-48, -84, 1, fill) + chhatri(48, -84, 1, fill);
    o += chhatri(-100, -52, 0.92, fill) + chhatri(100, -52, 0.92, fill);
    o += merlons(-148, -60, -52, 1, fill) + merlons(60, 148, -52, 1, fill) + merlons(-60, 60, -84, 1, fill);
    // windows (glow)
    var w = '<g fill="' + glow + '" class="' + (winClass || "wins") + '">';
    [-136, -118, -100, -82, 82, 100, 118, 136].forEach(function (x) { w += arch(x - 3.5, -42, 7, 20, glow).replace('fill="' + glow + '"', 'fill="' + glow + '"'); });
    [-48, -30, 30, 48].forEach(function (x) { w += arch(x - 4, -76, 8, 22, glow); });
    w += arch(-11, -62, 22, 54, glow);
    [-176, 176].forEach(function (x) { w += arch(x - 3, -80, 6, 18, glow); });
    [-22, 0, 22].forEach(function (x) { w += arch(x - 3.5, -102, 7, 16, glow); });
    w += "</g>";
    o += w + "</g>";
    return o;
  }

  /* ---------- hero scene inside an ogee arch ---------- */
  var ARCH = "M0 660V300C0 190 90 120 180 70C215 52 235 30 250 0C265 30 285 52 320 70C410 120 500 190 500 300V660Z";

  function pearlStrand(path, w, id) {
    return '<g class="pearls">' +
      '<path d="' + path + '" fill="none" stroke="rgba(50,24,8,.35)" stroke-width="' + (w + 0.4) + '" stroke-linecap="round" stroke-dasharray="0.1 ' + n(w * 1.34) + '" transform="translate(.9 1.6)"/>' +
      '<path d="' + path + '" fill="none" stroke="#F6EEDD" stroke-width="' + w + '" stroke-linecap="round" stroke-dasharray="0.1 ' + n(w * 1.34) + '"/>' +
      '<path d="' + path + '" fill="none" stroke="#FFFFFF" stroke-width="' + n(w * 0.34) + '" stroke-linecap="round" stroke-dasharray="0.1 ' + n(w * 1.34) + '" transform="translate(' + n(-w * 0.18) + ' ' + n(-w * 0.2) + ')" opacity=".95"/>' +
      "</g>";
  }

  function hero() {
    var p = "h_", r = seeded(7), o = "";
    o += '<svg class="hero-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-26 -24 552 728" role="img" aria-label="A palace across a lotus lake at dusk, framed by an arched window" preserveAspectRatio="xMidYMid meet">';
    o += "<defs>" + common(p) + diyaDefs(p) +
      '<clipPath id="' + p + 'clip"><path d="' + ARCH + '"/></clipPath>' +
      '<linearGradient id="' + p + 'sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0D2433"/><stop offset=".28" stop-color="#2A2A5A"/><stop offset=".48" stop-color="#6A2F5E"/><stop offset=".62" stop-color="#C75A62"/><stop offset=".74" stop-color="#F09A5C"/><stop offset="1" stop-color="#FAD088"/></linearGradient>' +
      '<linearGradient id="' + p + 'water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0A266"/><stop offset=".16" stop-color="#B9566A"/><stop offset=".45" stop-color="#43315F"/><stop offset="1" stop-color="#0B2230"/></linearGradient>' +
      '<radialGradient id="' + p + 'sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF3C4"/><stop offset=".35" stop-color="#FFD98A" stop-opacity=".95"/><stop offset=".62" stop-color="#F7A95E" stop-opacity=".45"/><stop offset="1" stop-color="#F7A95E" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + p + 'fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".6" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<mask id="' + p + 'refl" maskUnits="userSpaceOnUse" x="0" y="440" width="500" height="220"><rect x="0" y="440" width="500" height="220" fill="url(#' + p + 'fade)"/></mask>' +
      '<linearGradient id="' + p + 'vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05101A" stop-opacity="0"/><stop offset="1" stop-color="#05101A" stop-opacity=".55"/></linearGradient>' +
      '<linearGradient id="' + p + 'cloud" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFD9B0" stop-opacity="0"/><stop offset=".5" stop-color="#FFD9B0" stop-opacity=".5"/><stop offset="1" stop-color="#FFD9B0" stop-opacity="0"/></linearGradient>' +
      "</defs>";

    // plinth
    o += '<g class="plinth"><rect x="-18" y="662" width="536" height="14" rx="2" fill="url(#' + p + 'brassV)"/>' +
      '<rect x="-26" y="676" width="552" height="16" rx="2" fill="url(#' + p + 'brassH)"/>' +
      '<path d="M-14 669H514" stroke="#F8E4A4" stroke-width=".8" stroke-dasharray="2 5" opacity=".8"/></g>';

    o += '<g clip-path="url(#' + p + 'clip)">';
    o += '<rect x="0" y="0" width="500" height="440" fill="url(#' + p + 'sky)"/>';
    // stars
    var stars = "";
    for (var i = 0; i < 46; i++) {
      var sx = 8 + r() * 484, sy = 10 + r() * 270;
      stars += '<circle class="star" cx="' + n(sx) + '" cy="' + n(sy) + '" r="' + n(0.6 + r() * 1.3) + '" fill="#FFF6DD" style="animation-delay:' + n(r() * 4) + 's"/>';
    }
    o += stars;
    // sun
    o += '<g class="sun"><circle cx="250" cy="392" r="150" fill="url(#' + p + 'sun)"/></g>';
    o += '<circle cx="250" cy="392" r="62" fill="#FFE4A0" opacity=".96"/>';
    // clouds
    o += '<g class="cloud c1"><ellipse cx="110" cy="318" rx="92" ry="7" fill="url(#' + p + 'cloud)"/><ellipse cx="150" cy="332" rx="60" ry="5" fill="url(#' + p + 'cloud)"/></g>';
    o += '<g class="cloud c2"><ellipse cx="400" cy="286" rx="84" ry="6" fill="url(#' + p + 'cloud)"/><ellipse cx="360" cy="300" rx="56" ry="4.5" fill="url(#' + p + 'cloud)"/></g>';
    // birds
    o += '<g class="birds">';
    [[70, 250, 1], [96, 236, 0.8], [116, 258, 0.7], [380, 214, 0.9], [404, 232, 0.7]].forEach(function (b, i) {
      o += '<path class="bird" style="animation-delay:' + (i * 0.35) + 's" d="M' + b[0] + ' ' + b[1] + 'q' + 5 * b[2] + ' -6 ' + 10 * b[2] + ' 0q' + 5 * b[2] + ' -6 ' + 10 * b[2] + ' 0" fill="none" stroke="#1B1026" stroke-width="1.5" stroke-linecap="round"/>';
    });
    o += "</g>";
    // far hills + far palace
    o += '<path d="M0 440V412C40 402 70 408 110 414C150 420 170 410 210 416L210 440Z" fill="#5E3560" opacity=".7"/>';
    o += '<path d="M290 440V418C330 410 360 418 400 412C440 406 470 410 500 414V440Z" fill="#5E3560" opacity=".7"/>';
    o += palace(250, 441, 1.12, "#4B2C58", "#FFC66B", "wins wins-far");
    o += palace(250, 441, 1.0, "#241431", "#FFC76B", "wins");
    // water
    o += '<rect x="0" y="440" width="500" height="230" fill="url(#' + p + 'water)"/>';
    // reflection
    o += '<g mask="url(#' + p + 'refl)"><g transform="translate(0 882) scale(1 -1)" opacity=".4">' + palace(250, 441, 1.0, "#241431", "#FFC76B", "wins") + '</g></g>';
    // sun column
    o += '<g class="glints">';
    for (var g = 0; g < 14; g++) {
      var gw = 90 - g * 5 + r() * 14, gy = 448 + g * 11 + r() * 3;
      o += '<rect class="glint" style="animation-delay:' + n(r() * 3) + 's" x="' + n(250 - gw / 2 + (r() - 0.5) * 14) + '" y="' + n(gy) + '" width="' + n(gw) + '" height="2.2" rx="1.1" fill="#FFE9B0" opacity="' + n(0.75 - g * 0.04) + '"/>';
    }
    o += "</g>";
    // ripples lines
    o += '<g class="lines" opacity=".16">';
    for (var l = 0; l < 10; l++) {
      var ly = 470 + l * 18 + r() * 6, lx = r() * 380;
      o += '<rect class="wave" style="animation-delay:' + n(r() * 5) + 's" x="' + n(lx) + '" y="' + n(ly) + '" width="' + n(60 + r() * 90) + '" height="1.4" rx=".7" fill="#fff"/>';
    }
    o += "</g>";
    // lotus pads + buds + flowers
    o += pad(p, 70, 618, 54, 11) + pad(p, 430, 626, 62, 12) + pad(p, 250, 650, 76, 13) + pad(p, 160, 578, 36, 7) + pad(p, 345, 572, 40, 8);
    o += '<path d="M118 626C120 600 110 580 112 560" stroke="#2F6F4F" stroke-width="2" fill="none"/>' + bud(p, 112, 560, 0.7, -4);
    o += '<path d="M388 630C386 604 396 590 392 566" stroke="#2F6F4F" stroke-width="2" fill="none"/>' + bud(p, 392, 566, 0.62, 6);
    o += lotus(p, 70, 616, 0.82, "lotus l1");
    o += lotus(p, 430, 626, 0.92, "lotus l2");
    o += lotus(p, 250, 648, 1.0, "lotus l3");
    o += lotus(p, 160, 578, 0.5, "lotus l4");
    o += lotus(p, 345, 572, 0.56, "lotus l5");
    // swans with ripples + reflections
    function swanBlock(x, y, s, flip, cls, delay) {
      var blk = '<g class="swim ' + cls + '" style="animation-delay:' + delay + 's">';
      blk += '<ellipse class="ring" style="animation-delay:' + delay + 's" cx="' + (x + 90 * s * (flip ? -1 : 1)) + '" cy="' + (y + 140 * s) + '" rx="' + 80 * s + '" ry="' + 9 * s + '" fill="none" stroke="#FFEBC8" stroke-width="1.2" opacity=".5"/>';
      blk += '<g opacity=".22" transform="translate(0 ' + n(2 * (y + 138 * s) - 0) + ') scale(1 -1)">' + swan(p, x, y, s, flip, "swan-refl") + "</g>";
      blk += swan(p, x, y, s, flip, "swan");
      return blk + "</g>";
    }
    o += swanBlock(150, 470, 0.5, false, "sw1", 0);
    o += swanBlock(372, 500, 0.62, true, "sw2", -2.4);
    // floating lamps
    o += diya(p, 52, 520, 0.34, 0.2) + diya(p, 430, 560, 0.3, 1.1) + diya(p, 252, 590, 0.28, 0.6);
    o += '<rect x="0" y="540" width="500" height="120" fill="url(#' + p + 'vig)"/>';
    o += "</g>";

    // frame
    o += '<path d="' + ARCH + '" fill="none" stroke="url(#' + p + 'brass)" stroke-width="15"/>';
    o += '<path d="' + ARCH + '" fill="none" stroke="#F8E4A4" stroke-width="1" opacity=".7" transform="translate(0 0)" stroke-dasharray="1 0"/>';
    o += '<g transform="translate(250 330) scale(.962 .962) translate(-250 -330)"><path d="' + ARCH + '" fill="none" stroke="rgba(60,30,8,.55)" stroke-width="1.4"/></g>';
    o += '<g transform="translate(250 330) scale(1.04 1.034) translate(-250 -330)"><path d="' + ARCH + '" fill="none" stroke="url(#' + p + 'brass)" stroke-width="2.4"/></g>';
    o += '<g transform="translate(250 330) scale(.972 .972) translate(-250 -330)">' + pearlStrand(ARCH, 5.2) + "</g>";
    // finial
    o += '<g transform="translate(250 -4)"><circle cx="0" cy="-8" r="5.5" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width=".6"/><path d="M0 -14L0 -22" stroke="url(#' + p + 'brass)" stroke-width="2"/><circle cx="0" cy="-23" r="2.4" fill="url(#' + p + 'brass)"/></g>';
    // shoulder rosettes
    [[180, 70], [320, 70]].forEach(function (c) {
      o += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="9" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width=".6"/><circle cx="' + c[0] + '" cy="' + c[1] + '" r="4" fill="#B3364F"/>';
    });
    // pearl necklace across the shoulders
    var neck = "M14 228C74 272 160 304 250 304C340 304 426 272 486 228";
    o += '<g class="necklace">' + pearlStrand(neck, 7.4) +
      pearlStrand("M16 244C78 286 162 318 250 318C338 318 422 286 484 244", 4.6) +
      '<g transform="translate(250 314)"><path d="M0 0L0 14" stroke="url(#' + p + 'brass)" stroke-width="1.6"/>' +
      lotus(p, 0, 46, 0.4, "pend") +
      '<circle cx="0" cy="52" r="5.2" fill="url(#' + p + 'pearl)" stroke="#9C8A6B" stroke-width=".4"/></g></g>';
    return o + "</svg>";
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
  function skyline(opts) {
    opts = opts || {};
    var o = '<svg class="skyline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 290" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><g fill="currentColor">';
    [[150, 1], [440, 0.7], [740, 1.04], [1060, 0.76], [1370, 0.98]].forEach(function (t) { o += temple(t[0], 288, t[1]); });
    o += '<rect x="0" y="270" width="1600" height="20"/></g>';
    // ridge relief lines
    o += '<g fill="none" stroke="' + (opts.line || "rgba(255,255,255,.13)") + '" stroke-width="1">';
    for (var y = 276; y > 262; y -= 5) o += '<path d="M0 ' + y + 'H1600"/>';
    o += "</g></svg>";
    return o;
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

  /* ---------- pearl + lotus divider ---------- */
  function divider(p, color) {
    p = p || "dv_"; var c = color || "#B8862F";
    return '<svg class="divider-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 40" aria-hidden="true" focusable="false"><defs>' + common(p) + '</defs>' +
      '<path d="M4 20H128" stroke="' + c + '" stroke-width="1" opacity=".7"/><path d="M232 20H356" stroke="' + c + '" stroke-width="1" opacity=".7"/>' +
      '<path d="M134 20H152M208 20H226" stroke="' + c + '" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 8" opacity=".9"/>' +
      '<g transform="translate(180 34) scale(.52)">' + lotus(p, 0, 0, 1, "lotus") + '</g>' +
      '<circle cx="4" cy="20" r="2.4" fill="' + c + '"/><circle cx="356" cy="20" r="2.4" fill="' + c + '"/></svg>';
  }

  /* ---------- brass hand mirror (darpan) ---------- */
  function mirror() {
    var p = "m_", o = "";
    o += '<svg class="mirror-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 470" role="img" aria-label="Antique brass hand mirror">';
    o += "<defs>" + common(p) +
      '<radialGradient id="' + p + 'glass" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#EAF3EE"/><stop offset=".45" stop-color="#A9C5C0"/><stop offset="1" stop-color="#4E7677"/></radialGradient>' +
      '<clipPath id="' + p + 'cl"><circle cx="140" cy="140" r="92"/></clipPath>' +
      '<linearGradient id="' + p + 'sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      "</defs>";
    // handle
    o += '<path d="M126 238C128 300 130 340 124 404L156 404C150 340 152 300 154 238Z" fill="url(#' + p + 'brassH)" stroke="#5E3C12" stroke-width=".8"/>';
    [256, 292, 328, 364].forEach(function (y, i) {
      o += '<ellipse cx="140" cy="' + y + '" rx="' + (17 - i * 0.8) + '" ry="5.2" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".6"/>';
    });
    o += '<path d="M132 250C132 300 134 340 130 396" stroke="#FFF1BD" stroke-width="1.2" opacity=".6" fill="none"/>';
    o += lotus(p, 140, 442, 0.78, "lotus l0").replace('class="lotus l0"', 'class="lotus l0" ');
    o += '<g class="tassel"><path d="M140 446C140 452 140 454 140 458" stroke="#8E1B2E" stroke-width="2"/><circle cx="140" cy="460" r="4.4" fill="url(#' + p + 'pearl)" stroke="#9C8A6B" stroke-width=".4"/></g>';
    // scalloped petal rim
    var rim = "";
    for (var i = 0; i < 20; i++) {
      var a = (i / 20) * 360;
      rim += '<path d="M0 -118C-9 -122 -9 -134 0 -140C9 -134 9 -122 0 -118Z" transform="translate(140 140) rotate(' + a + ')" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".5"/>';
    }
    o += rim;
    o += '<circle cx="140" cy="140" r="116" fill="url(#' + p + 'brass)" stroke="#5E3C12" stroke-width="1"/>';
    o += '<circle cx="140" cy="140" r="102" fill="none" stroke="rgba(60,30,8,.5)" stroke-width="1.4"/>';
    o += '<circle cx="140" cy="140" r="108" fill="none" stroke="#FFF1BD" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 9.7" opacity=".95"/>';
    o += '<circle cx="140" cy="140" r="96" fill="none" stroke="url(#' + p + 'brassV)" stroke-width="7"/>';
    // glass with a faint reflection
    o += '<circle cx="140" cy="140" r="92" fill="url(#' + p + 'glass)"/>';
    o += '<g clip-path="url(#' + p + 'cl)" opacity=".55">' +
      '<path d="M40 190C70 160 110 150 140 150C170 150 210 160 240 190L240 240L40 240Z" fill="#2F6F6A" opacity=".5"/>' +
      '<g transform="translate(140 196) scale(.7)">' + lotus(p, 0, 0, 1, "lotus") + "</g>" +
      '<circle cx="190" cy="96" r="15" fill="#FFF0C2" opacity=".75"/></g>';
    o += '<g clip-path="url(#' + p + 'cl)"><rect class="sheen" x="-120" y="30" width="70" height="220" fill="url(#' + p + 'sheen)" transform="rotate(24 140 140)"/></g>';
    o += '<path d="M78 112C90 80 118 62 148 60" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>';
    return o + "</svg>";
  }

  /* ---------- rabab ---------- */
  function rabab() {
    var p = "r_", o = "";
    o += '<svg class="rabab-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 500" role="img" aria-label="A rabab">';
    o += "<defs>" + common(p) +
      '<linearGradient id="' + p + 'wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A1A0C"/><stop offset=".35" stop-color="#8A4623"/><stop offset=".6" stop-color="#6A3318"/><stop offset="1" stop-color="#2E1409"/></linearGradient>' +
      '<radialGradient id="' + p + 'skin" cx=".45" cy=".4" r=".75"><stop offset="0" stop-color="#F3DDB4"/><stop offset=".7" stop-color="#DDBA83"/><stop offset="1" stop-color="#B98F57"/></radialGradient>' +
      "</defs>";
    // scroll head & neck
    o += '<path d="M96 60C78 54 70 36 82 24C94 14 112 20 108 36C106 44 98 46 94 40" fill="none" stroke="url(#' + p + 'wood)" stroke-width="10" stroke-linecap="round"/>';
    o += '<rect x="92" y="44" width="36" height="86" rx="10" fill="url(#' + p + 'wood)" stroke="#1E0D05" stroke-width=".8"/>';
    [[88, 62], [88, 84], [88, 106], [132, 72], [132, 94], [132, 116]].forEach(function (q) {
      o += '<g><rect x="' + (q[0] - 8) + '" y="' + (q[1] - 3.2) + '" width="16" height="6.4" rx="3.2" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".5"/></g>';
    });
    o += '<rect x="98" y="128" width="24" height="132" fill="url(#' + p + 'wood)" stroke="#1E0D05" stroke-width=".8"/>';
    // inlay dots on neck
    for (var i = 0; i < 9; i++) o += '<circle cx="110" cy="' + (142 + i * 13) + '" r="' + (i % 2 ? 1.8 : 2.8) + '" fill="url(#' + p + 'pearl)"/>';
    // body: two bulbs
    o += '<path d="M110 232C60 232 40 262 46 296C28 316 18 350 26 392C36 446 76 474 110 474C144 474 184 446 194 392C202 350 192 316 174 296C180 262 160 232 110 232Z" fill="url(#' + p + 'wood)" stroke="#1E0D05" stroke-width="1"/>';
    o += '<path d="M110 242C68 242 54 266 58 292C42 312 36 346 42 386C50 432 80 458 110 458C140 458 170 432 178 386C184 346 178 312 162 292C166 266 152 242 110 242Z" fill="url(#' + p + 'skin)" stroke="#8C6532" stroke-width="1.2"/>';
    // sound holes
    o += '<path d="M72 330C64 338 66 352 76 356" fill="none" stroke="#3A1A0C" stroke-width="3.6" stroke-linecap="round"/>';
    o += '<path d="M148 330C156 338 154 352 144 356" fill="none" stroke="#3A1A0C" stroke-width="3.6" stroke-linecap="round"/>';
    // medallion + lotus on skin
    o += '<circle cx="110" cy="300" r="26" fill="none" stroke="#8C6532" stroke-width="1.2"/><circle cx="110" cy="300" r="21" fill="none" stroke="#8C6532" stroke-width="3" stroke-dasharray="0.1 5.2" stroke-linecap="round"/>';
    o += '<g transform="translate(110 314) scale(.5)">' + lotus(p, 0, 0, 1, "lotus") + "</g>";
    // bridge
    o += '<rect x="80" y="410" width="60" height="9" rx="3" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width=".7"/>';
    o += '<path d="M96 419L124 419L120 438L100 438Z" fill="#3A1A0C"/>';
    // strings
    o += '<g class="strings" stroke="#F1E2BE" stroke-width="1" stroke-linecap="round">';
    [-9, -4.5, 0, 4.5, 9].forEach(function (dx, i) {
      o += '<path class="str" style="animation-delay:' + (i * 0.18) + 's" d="M' + (110 + dx * 0.55) + ' 52L' + (110 + dx * 0.55) + ' 130L' + (110 + dx * 0.5) + ' 262L' + (110 + dx * 1.35) + ' 414"/>';
    });
    o += "</g>";
    return o + "</svg>";
  }

  /* ---------- collection tile art ---------- */
  function tileEarrings() {
    var p = "te_", o = "", r = seeded(21);
    o += '<svg class="tile-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + common(p) +
      '<linearGradient id="' + p + 'sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14305A"/><stop offset=".6" stop-color="#5A2C62"/><stop offset="1" stop-color="#C9605E"/></linearGradient>' +
      '<linearGradient id="' + p + 'wat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A4A66"/><stop offset="1" stop-color="#0E2538"/></linearGradient>' +
      '<clipPath id="' + p + 'c"><circle cx="200" cy="230" r="150"/></clipPath></defs>';
    o += '<rect width="400" height="480" fill="#3B1020"/>';
    o += '<g clip-path="url(#' + p + 'c)"><rect x="40" y="70" width="320" height="260" fill="url(#' + p + 'sky)"/>';
    for (var i = 0; i < 30; i++) o += '<circle class="star" style="animation-delay:' + n(r() * 4) + 's" cx="' + n(60 + r() * 280) + '" cy="' + n(80 + r() * 150) + '" r="' + n(0.6 + r() * 1.1) + '" fill="#FFF3D2"/>';
    o += '<circle cx="268" cy="132" r="30" fill="#FFE9B0"/><circle cx="282" cy="124" r="27" fill="#3A2A62"/>';
    o += '<rect x="40" y="250" width="320" height="90" fill="url(#' + p + 'wat)"/>';
    o += '<g fill="#1E1030" transform="translate(200 252) scale(.46)"><path d="M-150 0V-28L-120 -36L-90 -28V0Z"/><path d="M-60 0V-60C-60 -100 -30 -110 0 -140C30 -110 60 -100 60 -60V0Z"/><path d="M90 0V-34L120 -44L150 -34V0Z"/></g>';
    o += swan(p, 150, 232, 0.55, false, "swan");
    o += lotus(p, 90, 318, 0.7, "lotus l1") + lotus(p, 300, 326, 0.78, "lotus l2") + lotus(p, 208, 330, 0.55, "lotus l3");
    o += "</g>";
    o += '<circle cx="200" cy="230" r="150" fill="none" stroke="url(#' + p + 'brass)" stroke-width="12"/>';
    o += '<circle cx="200" cy="230" r="132" fill="none" stroke="#F6EEDD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.1 9.4"/>';
    for (var k = 0; k < 16; k++) o += '<path d="M0 -168C-7 -172 -7 -182 0 -188C7 -182 7 -172 0 -168Z" transform="translate(200 230) rotate(' + (k * 22.5) + ')" fill="url(#' + p + 'brassV)" opacity=".9"/>';
    return o + "</svg>";
  }
  function tileKeychains() {
    var p = "tk_", o = "";
    o += '<svg class="tile-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + common(p) + diyaDefs(p) +
      '<radialGradient id="' + p + 'halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F7C96A" stop-opacity=".7"/><stop offset="1" stop-color="#F7C96A" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + p + 'bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14393A"/><stop offset="1" stop-color="#0B2224"/></linearGradient></defs>';
    o += '<rect width="400" height="480" fill="url(#' + p + 'bg)"/>';
    o += '<circle class="halo" cx="200" cy="236" r="190" fill="url(#' + p + 'halo)"/>';
    // radiating petals
    o += '<g transform="translate(200 270)" class="petal-ring">';
    for (var k = 0; k < 18; k++) o += '<path d="M0 0C-16 -46 -14 -120 0 -160C14 -120 16 -46 0 0Z" transform="rotate(' + (k * 20) + ')" fill="none" stroke="#D9AB54" stroke-opacity=".45" stroke-width="1.1"/>';
    o += "</g>";
    // kalash
    o += '<g transform="translate(200 0)">';
    o += '<path d="M-86 300C-96 244 -70 214 -44 196L-34 160L34 160L44 196C70 214 96 244 86 300C80 352 48 386 0 386C-48 386 -80 352 -86 300Z" fill="url(#' + p + 'brassH)" stroke="#5E3C12" stroke-width="1.2"/>';
    o += '<path d="M-64 266C-30 282 30 282 64 266M-72 300C-34 322 34 322 72 300" fill="none" stroke="#5E3C12" stroke-width="1.1" opacity=".6"/>';
    o += '<path d="M-60 236C-30 246 30 246 60 236" fill="none" stroke="#FFF1BD" stroke-width="1" opacity=".6"/>';
    o += '<ellipse cx="0" cy="160" rx="46" ry="11" fill="url(#' + p + 'brassV)" stroke="#5E3C12" stroke-width="1"/>';
    o += '<path d="M-58 214C-40 206 40 206 58 214" stroke="#F7E3A0" stroke-width="3" fill="none" stroke-dasharray="0.1 7" stroke-linecap="round"/>';
    o += '<ellipse cx="-26" cy="270" rx="10" ry="46" fill="#fff" opacity=".13" transform="rotate(8 -26 270)"/>';
    // mango leaves + coconut
    [[-64, 1], [-32, 1.08], [0, 1.16], [32, 1.08], [64, 1]].forEach(function (a) {
      o += '<path d="M0 0C-20 -36 -18 -96 0 -126C18 -96 20 -36 0 0Z" transform="translate(0 158) rotate(' + a[0] + ') scale(' + a[1] * 0.78 + ')" fill="url(#' + p + 'pad)" stroke="#0F2D24" stroke-width=".8"/>';
    });
    o += '<ellipse cx="0" cy="106" rx="34" ry="38" fill="#9A5B2A" stroke="#4A2812" stroke-width="1"/><path d="M-22 96C-8 84 8 84 22 96" stroke="#C48650" stroke-width="2" fill="none"/><circle cx="0" cy="118" r="3" fill="#3A1D0C"/>';
    o += '<path d="M-14 60C-6 80 6 80 14 60" stroke="#E9B24A" stroke-width="2" fill="none"/>';
    o += "</g>";
    o += diya(p, 74, 420, 0.5, 0.3) + diya(p, 272, 424, 0.5, 1.2);
    o += lotus(p, 62, 460, 0.55, "lotus l1") + lotus(p, 338, 462, 0.55, "lotus l2");
    return o + "</svg>";
  }

  /* ---------- small marks ---------- */
  function mark(p) {
    p = p || "mk_";
    return '<svg class="mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -64 80 76" aria-hidden="true" focusable="false"><defs>' + common(p) + '</defs>' + lotus(p, 0, 8, 0.95, "lotus") + "</svg>";
  }
  function swanPair(p) {
    p = p || "sp_";
    return '<svg class="swanpair-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 190" aria-hidden="true" focusable="false"><defs>' + common(p) + '</defs>' +
      '<g class="swim sw1">' + swan(p, 40, 20, 0.9, false, "swan") + '</g><g class="swim sw2">' + swan(p, 360, 36, 0.78, true, "swan") + '</g>' +
      '<path d="M10 176H390" stroke="#D9AB54" stroke-opacity=".5" stroke-width="1.2" stroke-dasharray="1 7" stroke-linecap="round"/></svg>';
  }
  function diyaRow(p) {
    p = p || "dr_";
    return '<svg class="diyarow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64" aria-hidden="true" focusable="false"><defs>' + common(p) + diyaDefs(p) + '</defs>' +
      diya(p, 6, 6, 0.62, 0) + diya(p, 106, 6, 0.62, 0.7) + diya(p, 206, 6, 0.62, 1.4) + '</svg>';
  }

  return {
    hero: hero, skyline: skyline, jaliURI: jaliURI, divider: divider, mirror: mirror, rabab: rabab,
    tileEarrings: tileEarrings, tileKeychains: tileKeychains, mark: mark, swanPair: swanPair, diyaRow: diyaRow,
    common: common, lotus: lotus, swan: swan, diya: diya, palace: palace, pearlStrand: pearlStrand, ARCH: ARCH
  };
});
