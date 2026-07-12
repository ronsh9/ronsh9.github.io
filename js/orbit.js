/**
 * Glass arc navigation + hash-based section views.
 * Index uses data-orbit-mode="local". Other pages link to ./#section.
 */
(function () {
  const VIEWS = ["home", "research", "bio", "potpourri"];

  function initOrbit() {
    const site = document.getElementById("site");
    const orbit = document.getElementById("orbit");
    const toggle = document.getElementById("orbit-toggle");
    const scrim = document.getElementById("scrim");
    const footer = document.getElementById("footer");
    if (!site || !orbit || !toggle || !scrim) return;

    const items = [...document.querySelectorAll(".orbit__item")];
    const localNav = site.dataset.orbitMode === "local";

    function syncFooterHeight() {
      if (!footer) return;
      document.documentElement.style.setProperty(
        "--footer-h",
        `${footer.getBoundingClientRect().height}px`
      );
    }

    function layoutOrbitItems() {
      if (!site.classList.contains("is-nav-open")) return;

      const w = orbit.clientWidth || window.innerWidth;
      const cssH = getComputedStyle(document.documentElement).getPropertyValue("--arc-h").trim();
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;height:${cssH}`;
      document.body.appendChild(probe);
      const h = probe.offsetHeight || orbit.clientHeight;
      probe.remove();

      const cx = w / 2;
      const rx = w * 0.42;
      const ry = h * 0.72;
      const n = items.length;
      const start = Math.PI * 0.82;
      const end = Math.PI * 0.18;

      items.forEach((item, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const theta = start + (end - start) * t;
        item.style.left = `${cx + rx * Math.cos(theta)}px`;
        item.style.top = `${ry * Math.sin(theta)}px`;
      });
    }

    function setNavOpen(open) {
      site.classList.toggle("is-nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      scrim.hidden = !open;
      if (open) {
        layoutOrbitItems();
        requestAnimationFrame(layoutOrbitItems);
      }
    }

    function goLocal(view) {
      site.dataset.view = view;
      setNavOpen(false);
      history.replaceState(null, "", view === "home" ? "#home" : `#${view}`);
      const section = document.querySelector(`.section--${view}`);
      if (section) section.scrollTop = 0;
    }

    function applyHash() {
      if (!localNav) return;
      const hash = location.hash.replace("#", "");
      if (VIEWS.includes(hash)) goLocal(hash);
      else if (!hash) goLocal("home");
    }

    orbit.addEventListener("transitionend", (e) => {
      if (e.propertyName === "height" && site.classList.contains("is-nav-open")) {
        layoutOrbitItems();
      }
    });

    toggle.addEventListener("click", (e) => {
      if (e.target.closest(".orbit__item a") || e.target.closest(".orbit__brand")) return;
      setNavOpen(!site.classList.contains("is-nav-open"));
    });

    scrim.addEventListener("click", () => setNavOpen(false));

    document.querySelectorAll("[data-nav]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const view = el.dataset.nav;
        if (!localNav) return;
        if (!VIEWS.includes(view)) return;
        e.preventDefault();
        e.stopPropagation();
        goLocal(view);
      });
    });

    document.querySelectorAll(".project-card__links a").forEach((a) => {
      a.addEventListener("click", (e) => e.stopPropagation());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavOpen(false);
    });

    window.addEventListener("resize", () => {
      syncFooterHeight();
      layoutOrbitItems();
    });

    window.addEventListener("hashchange", applyHash);

    syncFooterHeight();
    applyHash();
  }

  document.addEventListener("DOMContentLoaded", initOrbit);
})();
