/**
 * Light / dark theme toggle with localStorage persistence.
 */
(function () {
  const STORAGE_KEY = "theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateToggleButton(theme) {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  function applyTheme(theme) {
    document.documentElement.classList.add("theme-animate");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButton(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "light" ? "dark" : "light");
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme());
    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
  });
})();
