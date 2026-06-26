/**
 * Collapse / expand the right panel on wide screens.
 */
(function () {
  const STORAGE_KEY = "right-panel-collapsed";
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

  function setCollapsed(collapsed, persist) {
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

    if (persist !== false) {
      localStorage.setItem(STORAGE_KEY, collapsed ? "collapsed" : "expanded");
    }
  }

  function getStoredCollapsed() {
    return localStorage.getItem(STORAGE_KEY) === "collapsed";
  }

  function togglePanel() {
    const site = document.querySelector(".site");
    if (!site || !isDesktop()) return;

    setCollapsed(site.dataset.rightPanel !== "collapsed");
  }

  function syncPanel() {
    setCollapsed(isDesktop() && getStoredCollapsed(), false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("panel-toggle");
    if (!button) return;

    button.addEventListener("click", togglePanel);
    syncPanel();
    DESKTOP_QUERY.addEventListener("change", syncPanel);
  });
})();
