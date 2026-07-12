/**
 * Populates the shared footer on all pages.
 */
(function () {
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderSocial() {
    const links = SITE_CONFIG.social
      .map(
        (item) => `
          <a
            href="${escapeHtml(item.url)}"
            aria-label="${escapeHtml(item.label)} Link"
            target="_blank"
            rel="noopener noreferrer"
          >${escapeHtml(item.label)}</a>
        `
      )
      .join("");

    return `
      <h4>${escapeHtml(SITE_CONFIG.meta.email)}</h4>
      <div class="footer__links">${links}</div>
    `;
  }

  function populateFooter() {
    const metaEl = document.getElementById("footer-meta");
    if (metaEl) {
      const { copyright, lastUpdated } = SITE_CONFIG.meta;
      metaEl.textContent = `${copyright}, Last Updated: ${lastUpdated}`;
    }

    const infoLink = document.querySelector(".footer__info");
    if (infoLink && /info\.html$/i.test(window.location.pathname)) {
      infoLink.classList.add("is-active");
      infoLink.setAttribute("aria-current", "page");
    }

    const socialEl = document.getElementById("social-links");
    if (socialEl) {
      socialEl.innerHTML = renderSocial();
    }
  }

  document.addEventListener("DOMContentLoaded", populateFooter);
})();
