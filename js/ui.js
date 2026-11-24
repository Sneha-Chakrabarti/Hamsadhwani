/* Page behaviour: inject vector art, header state, rotating announcement,
   scroll reveals, falling petals, hero tilt. No data or payment logic here. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- vector art ----
  var S = window.Scenes;
  var map = {
    hero: S.hero, skyline: function () { return S.skyline({}); }, mirror: S.mirror, rabab: S.rabab,
    tileEarrings: S.tileEarrings, tileKeychains: S.tileKeychains, mark: S.mark, swanPair: S.swanPair,
    diyaRow: S.diyaRow, divider: function () { return S.divider("dv_"); }
  };
  var uid = 0;
  document.querySelectorAll("[data-art]").forEach(function (el) {
    var f = map[el.getAttribute("data-art")];
    if (!f) return;
    uid++;
    var html = f();
    // make gradient ids unique when the same graphic appears more than once
    html = html.replace(/id="([a-z]+_[A-Za-z0-9]+)"/g, function (m, id) { return 'id="' + id + "_" + uid + '"'; })
      .replace(/url\(#([a-z]+_[A-Za-z0-9]+)\)/g, function (m, id) { return "url(#" + id + "_" + uid + ")"; });
    el.innerHTML = html;
  });
  var root = document.documentElement.style;
  root.setProperty("--jali-light", S.jaliURI("#B8862F", 0.2));
  root.setProperty("--jali-dark", S.jaliURI("#D9AB54", 0.13));

  // ---- marquee text ----
  var words = ["Khajuraho", "Lotus", "Antique brass", "Pearl", "Swan", "Rabab", "Palace arch", "Handmade"];
  var track = document.getElementById("marqueeTrack");
  if (track) {
    var one = words.map(function (w) { return "<span>" + w + "</span>"; }).join("");
    track.innerHTML = one + one + one + one;
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
      var shop = document.getElementById("shop");
      if (shop) shop.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });
})();
