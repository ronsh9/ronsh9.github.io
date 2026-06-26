/**
 * Collapse / expand the right panel on wide screens.
 * The panel always starts expanded on desktop; collapse is session-only.
 */
(function () {
  const DESKTOP_QUERY = window.matchMedia("(min-width: 768px)");

  function isDesktop() {
    return DESKTOP_QUERY.matches;
  }

  function updateButton(collapsed) {
    const button = document.getElementById("panel-toggle");
    if (!button) return;

    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    button.setAttribute(
      "aria-label",
      collapsed ? "Show right panel" : "Hide right panel"
    );
  }

  function setCollapsed(collapsed) {
    const site = document.querySelector(".site");
    if (!site) return;

    if (!isDesktop()) {
      site.removeAttribute("data-right-panel");
      updateButton(false);
      return;
    }

    if (collapsed) {
      site.dataset.rightPanel = "collapsed";
    } else {
      site.removeAttribute("data-right-panel");
    }

    updateButton(collapsed);
  }

  function expandPanel() {
    setCollapsed(false);
  }

  function togglePanel() {
    const site = document.querySelector(".site");
    if (!site || !isDesktop()) return;

    setCollapsed(site.dataset.rightPanel !== "collapsed");
  }

  document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("right-panel-collapsed");

    const button = document.getElementById("panel-toggle");
    if (!button) return;

    button.addEventListener("click", togglePanel);
    expandPanel();
    DESKTOP_QUERY.addEventListener("change", expandPanel);
  });
})();
