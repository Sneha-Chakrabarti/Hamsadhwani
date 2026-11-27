/* Page behaviour: inject vector art, header state, rotating announcement,
   scroll reveals, falling petals, hero tilt. No data or payment logic here. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- vector art ----
  var S = window.Scenes;
  var map = {
    hero: S.hero, peacockCut: S.peacockCut, dresserCut: S.dresserCut, jaaliCut: S.jaaliCut, lotusSway: S.lotusSway, pond: S.pond, ghatStrip: S.ghatStrip, skyline: function () { return S.skyline({}); }, craftScene: S.craftScene,
    tileEarrings: S.tileEarrings, tileKeychains: S.tileKeychains, tileCeleste: S.tileCeleste, tileSilkRoad: S.tileSilkRoad, tileFlora: S.tileFlora, mark: S.mark, diyaRow: S.diyaRow, urli: S.urli,
    divider: function () { return S.divider("dv_"); }
  };
  var uid = 0;
  document.querySelectorAll("[data-art]").forEach(function (el) {
    var f = map[el.getAttribute("data-art")];
    if (!f) return;
    uid++;
    var html = f();
    // make gradient ids unique when the same graphic appears more than once
    html = html.replace(/id="([a-z]+_[A-Za-z0-9]+)"/g, function (m, id) { return 'id="' + id + "_" + uid + '"'; })
      .replace(/url\(#([a-z]+_[A-Za-z0-9]+)\)/g, function (m, id) { return "url(#" + id + "_" + uid + ")"; })
      .replace(/href="#([a-z]+_[A-Za-z0-9]+)"/g, function (m, id) { return 'href="#' + id + "_" + uid + '"'; });
    el.innerHTML = html;
  });
  // the sandook's metal sheen and pearl iridescence are SMIL: stop them for reduced motion, and while the scene is off screen
  (function () {
    var svg = document.querySelector(".craft-svg");
    if (!svg || !svg.pauseAnimations) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.pauseAnimations();
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    svg.pauseAnimations();
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) svg.unpauseAnimations(); else svg.pauseAnimations(); });
    }, { rootMargin: "80px" }).observe(svg);
  })();
  // the urli's lilies and lamps drift only while it is on screen
  (function () {
    var svg = document.querySelector(".urli-svg");
    if (!svg || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { svg.classList.toggle("off", !e.isIntersecting); });
    }, { rootMargin: "80px" }).observe(svg);
  })();
  // glitter on the sandook scene flares up when the pointer passes over it
  (function () {
    var svg = document.querySelector(".craft-svg");
    if (!svg || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var stars = [].slice.call(svg.querySelectorAll(".glit,.glint")), raf = 0, px = 0, py = 0;
    svg.addEventListener("pointermove", function (e) {
      px = e.clientX; py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        stars.forEach(function (el) {
          if (el.classList.contains("flare")) return;
          var b = el.getBoundingClientRect(), dx = b.left + b.width / 2 - px, dy = b.top + b.height / 2 - py;
          if (dx * dx + dy * dy < 3000) { el.classList.add("flare"); setTimeout(function () { el.classList.remove("flare"); }, 900); }
        });
      });
    });
  })();
  var root = document.documentElement.style;
  root.setProperty("--jali-light", S.jaliURI("#B8862F", 0.2));
  root.setProperty("--jali-ochre", S.jaliURI("#8A5A12", 0.16));
  root.setProperty("--jali-rose", S.jaliURI("#9A3A4A", 0.12));
  root.setProperty("--jali-dark", S.jaliURI("#D9AB54", 0.13));
  root.setProperty("--folio", S.folioURI());

  // ---- lotus motifs: a small spring that each scroll nudges ----
  var sways = [].slice.call(document.querySelectorAll(".sway,.leaf,.pond-lotus")).map(function (el, i) {
    return { el: el, a: 0, v: 0, k: parseFloat(el.getAttribute("data-sway")) || 1, ph: i * 1.7 };
  });
  var lastY = window.scrollY, swRaf = 0;
  function swayTick() {
    var live = false;
    sways.forEach(function (s) {
      s.v += -0.06 * s.a - 0.07 * s.v;
      s.a += s.v;
      s.el.style.setProperty("--sw", s.a.toFixed(3));
      if (Math.abs(s.a) > 0.02 || Math.abs(s.v) > 0.02) live = true;
    });
    swRaf = live ? requestAnimationFrame(swayTick) : 0;
  }
  if (!reduce && sways.length) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY, d = y - lastY;
      lastY = y;
      if (!d) return;
      var imp = Math.max(-1, Math.min(1, d * 0.02));
      sways.forEach(function (s) { s.v += imp * s.k * (0.8 + 0.4 * Math.sin(s.ph + y / 400)); });
      if (!swRaf) swRaf = requestAnimationFrame(swayTick);
    }, { passive: true });
  }

  // ---- marquee: aroh and avaroh of raga Hamsadhwani ----
  var MI = {"swan": "<svg class=\"mi\" viewBox=\"0 0 28 28\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 18.500C5.500 20.800 9 21.800 14 21.800c5 0 8-2 8-4.300 0-1-1-1.500-2.500-1C17 17.200 15 16 12 15 9 14 6 13 4.500 11.500 4 14 3.500 16 3 18.500z\"/><path d=\"M9 17.500c2 1 5 1 7.500 0\"/><path d=\"M19 16c2.800-2 3-5 .2-6.400-2.600-1.300-2.200-4.600.2-5.100 1.200-.2 2.200.4 2.500 1.400\"/><path d=\"M21.700 5.800l2.500.9-2.600 1\"/></svg>", "lotus": "<svg class=\"mi\" viewBox=\"0 0 28 28\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14 5c3 3.2 3.4 7 0 11.5C10.6 12 11 8.2 14 5z\"/><path d=\"M14 16.5C13 12.5 9 9.5 4.5 10.5c.2 4 3.6 7 9.5 6z\"/><path d=\"M14 16.5c1-4 5-7 9.500-6-.2 4-3.600 7-9.500 6z\"/><path d=\"M5 21c5 2 13 2 18 0\"/></svg>", "banjo": "<svg class=\"mi\" viewBox=\"0 0 28 28\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"9.500\" cy=\"18.500\" r=\"6\"/><circle cx=\"9.500\" cy=\"18.500\" r=\"2.800\"/><path d=\"M13.800 14.200L23.500 4.500\"/><path d=\"M15.200 16l9-9\"/><path d=\"M22.500 3l3 3\"/></svg>"};
  var aroh = "सा रे ग प नि सां";
  var avaroh = "सां नि प ग रे सा";
  var sep = '<span class="m-sep" aria-hidden="true">||</span>';
  var unit =
    '<span class="m-ic">' + MI.swan + '</span><span class="m-sw">' + aroh + '</span><span class="m-ic">' + MI.lotus + '</span>' + sep +
    '<span class="m-ic">' + MI.banjo + '</span><span class="m-sw">' + avaroh + '</span><span class="m-ic">' + MI.lotus + '</span>' + sep;
  var track = document.getElementById("marqueeTrack");
  if (track) {
    track.innerHTML = unit + unit + unit + unit + unit + unit;
  }

  // ---- header + announcement ----
  var header = document.getElementById("siteHeader");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var msgs = document.querySelectorAll("#announce span"), mi = 0;
  if (msgs.length > 1) {
    setInterval(function () {
      msgs[mi].classList.remove("on");
      mi = (mi + 1) % msgs.length;
      msgs[mi].classList.add("on");
    }, 4200);
  }

  // ---- scroll reveal ----
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  }
  function observe(el) {
    if (!el) return;
    if (io) io.observe(el); else el.classList.add("in");
  }
  document.querySelectorAll(".reveal").forEach(observe);
  window.UI = { observe: observe };

  // ---- falling petals ----
  var pf = document.getElementById("petals");
  if (pf && !reduce) {
    var petalSvg = '<svg viewBox="0 0 20 28" aria-hidden="true"><path d="M10 0C18 8 18 20 10 28C2 20 2 8 10 0Z" fill="#EBA1B6" opacity=".85"/><path d="M10 4C13 10 13 18 10 24" stroke="#fff" stroke-opacity=".5" fill="none"/></svg>';
    for (var i = 0; i < 12; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      p.innerHTML = petalSvg;
      p.style.left = Math.round(Math.random() * 96) + "%";
      p.style.width = 9 + Math.round(Math.random() * 10) + "px";
      p.style.animationDuration = 11 + Math.random() * 12 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      p.style.setProperty("--dx", Math.round(-80 + Math.random() * 180) + "px");
      pf.appendChild(p);
    }
  }

  // ---- hero tilt (pointer devices only) ----
  var hero = document.getElementById("heroIn");
  var art = hero && hero.querySelector(".hero-svg");
  if (art && !reduce && window.matchMedia("(hover:hover)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      art.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      art.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener("pointerleave", function () {
      art.style.setProperty("--px", 0); art.style.setProperty("--py", 0);
    });
  }

  // ---- collection tiles jump to the shop with the filter set ----
  document.querySelectorAll("[data-cat-link]").forEach(function (t) {
    t.addEventListener("click", function () {
      var tab = document.querySelector('.tab[data-cat="' + t.getAttribute("data-cat-link") + '"]');
      if (tab) tab.click();
      var shop = document.getElementById("tabs");
      if (shop) shop.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });
})();
