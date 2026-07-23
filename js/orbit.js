/**
 * Responsive top navigation + hash-based section views.
 * Wide: always-visible glass bar. Narrow: expandable vertical menu.
 */
(function () {
  const VIEWS = ["home", "research", "bio", "potpourri"];
  const NARROW_MQ = window.matchMedia("(max-width: 860px)");

  function initNav() {
    const site = document.getElementById("site");
    const toggle = document.getElementById("nav-toggle");
    const scrim = document.getElementById("scrim");
    const footer = document.getElementById("footer");
    if (!site || !scrim) return;

    const localNav = site.dataset.orbitMode === "local";

    function syncFooterHeight() {
      // Keep the CSS-defined thin footer; only bump for the stacked mobile footer.
      document.documentElement.style.setProperty(
        "--footer-h",
        isNarrow() ? "4rem" : "2rem"
      );
    }

    function isNarrow() {
      return NARROW_MQ.matches;
    }

    function setNavOpen(open) {
      // Desktop keeps links visible; only narrow mode uses the drawer
      const shouldOpen = open && isNarrow();
      site.classList.toggle("is-nav-open", shouldOpen);
      if (toggle) {
        toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
        toggle.setAttribute("aria-label", shouldOpen ? "Close navigation" : "Open navigation");
      }
      scrim.hidden = !shouldOpen;
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

    toggle?.addEventListener("click", (e) => {
      e.stopPropagation();
      setNavOpen(!site.classList.contains("is-nav-open"));
    });

    scrim.addEventListener("click", () => setNavOpen(false));

    document.querySelectorAll("[data-nav]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const view = el.dataset.nav;
        if (!localNav) {
          setNavOpen(false);
          return;
        }
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

    function onBreakpointChange() {
      if (!isNarrow()) setNavOpen(false);
      syncFooterHeight();
    }

    if (NARROW_MQ.addEventListener) {
      NARROW_MQ.addEventListener("change", onBreakpointChange);
    } else if (NARROW_MQ.addListener) {
      NARROW_MQ.addListener(onBreakpointChange);
    }

    window.addEventListener("resize", syncFooterHeight);
    window.addEventListener("hashchange", applyHash);

    syncFooterHeight();
    applyHash();
  }

  document.addEventListener("DOMContentLoaded", initNav);
})();
