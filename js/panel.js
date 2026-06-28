/**
 * Collapse / expand the tab navigation and right panel on wide screens.
 * Both always start expanded on desktop; collapse is session-only.
 */
(function () {
  const DESKTOP_QUERY = window.matchMedia("(min-width: 768px)");

  function isDesktop() {
    return DESKTOP_QUERY.matches;
  }

  function scrollToTop(el) {
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = 0;
    });
  }

  function updatePanelButton(collapsed) {
    const button = document.getElementById("panel-toggle");
    if (!button) return;

    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    button.setAttribute(
      "aria-label",
      collapsed ? "Show right panel" : "Hide right panel"
    );
  }

  function setRightPanelCollapsed(collapsed, options = {}) {
    const { resetScroll = true } = options;
    const site = document.querySelector(".site");
    if (!site) return;

    if (!isDesktop()) {
      site.removeAttribute("data-right-panel");
      updatePanelButton(false);
      return;
    }

    if (collapsed) {
      site.dataset.rightPanel = "collapsed";
    } else {
      site.removeAttribute("data-right-panel");
      if (resetScroll) {
        scrollToTop(document.querySelector(".panel-right"));
      }
    }

    updatePanelButton(collapsed);
  }

  function expandRightPanel(options) {
    const site = document.querySelector(".site");
    if (!site || !isDesktop() || site.dataset.rightPanel !== "collapsed") return;
    setRightPanelCollapsed(false, options);
  }

  function toggleRightPanel() {
    const site = document.querySelector(".site");
    if (!site || !isDesktop()) return;

    setRightPanelCollapsed(site.dataset.rightPanel !== "collapsed");
  }

  function updateTabNavButton(collapsed) {
    const button = document.getElementById("tab-nav-toggle");
    if (!button) return;

    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    button.setAttribute(
      "aria-label",
      collapsed ? "Show navigation" : "Hide navigation"
    );
  }

  function setTabNavCollapsed(collapsed, options = {}) {
    const { resetScroll = true } = options;
    const site = document.querySelector(".site");
    if (!site) return;

    if (!isDesktop()) {
      site.removeAttribute("data-tab-nav");
      updateTabNavButton(false);
      return;
    }

    if (collapsed) {
      site.dataset.tabNav = "collapsed";
    } else {
      site.removeAttribute("data-tab-nav");
      if (resetScroll) {
        const activePanel = document.querySelector(".panel-content:not([hidden])");
        scrollToTop(activePanel);
      }
    }

    updateTabNavButton(collapsed);
  }

  function expandTabNav(options) {
    const site = document.querySelector(".site");
    if (!site || !isDesktop() || site.dataset.tabNav !== "collapsed") return;
    setTabNavCollapsed(false, options);
  }

  function toggleTabNav() {
    const site = document.querySelector(".site");
    if (!site || !isDesktop()) return;

    setTabNavCollapsed(site.dataset.tabNav !== "collapsed");
  }

  function syncDesktopPanels() {
    setRightPanelCollapsed(false);
    setTabNavCollapsed(false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("right-panel-collapsed");

    const panelButton = document.getElementById("panel-toggle");
    if (panelButton) {
      panelButton.addEventListener("click", toggleRightPanel);
    }

    const tabNavButton = document.getElementById("tab-nav-toggle");
    if (tabNavButton) {
      tabNavButton.addEventListener("click", toggleTabNav);
    }

    syncDesktopPanels();
    DESKTOP_QUERY.addEventListener("change", syncDesktopPanels);

    window.PanelControls = {
      expandRightPanel,
      expandTabNav,
    };
  });
})();
