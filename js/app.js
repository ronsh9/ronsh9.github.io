/**
 * Renders site content from SITE_CONFIG and handles tab navigation.
 */
(function () {
  const config = SITE_CONFIG;

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderResearchAuthors(authors) {
    const selfName = `${config.brand.firstName} ${config.brand.lastName}`;

    return authors
      .map((author, index) => {
        const name = escapeHtml(author);
        const isSelf = author === selfName;
        const separator = index < authors.length - 1 ? ", " : "";

        return `<span class="publication-author${isSelf ? " publication-author--self" : ""}">${name}</span>${separator}`;
      })
      .join("");
  }

  function renderResearchLinks(links) {
    return links
      .map(
        (link, index) => `
          ${index > 0 ? '<span class="publication-links__sep" aria-hidden="true">|</span>' : ""}
          <span class="publication-links__label">${escapeHtml(link.label)}</span>
        `
      )
      .join("");
  }

  function renderResearchItem(publication) {
    const primaryLink = publication.links[0];
    const href = primaryLink?.url || "#";

    return `
      <a
        href="${escapeHtml(href)}"
        class="list-item list-item--publication"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${escapeHtml(publication.title)} — ${escapeHtml(primaryLink?.label || "Paper")}"
      >
        <div class="list-item__body">
          <h2 class="publication-item__title">${escapeHtml(publication.title)}</h2>
          <p class="publication-item__authors">${renderResearchAuthors(publication.authors)}</p>
          <div class="publication-item__footer">
            <span class="publication-item__venue">
              <span>${escapeHtml(publication.venue)} (${escapeHtml(publication.year)})</span>
            </span>
            <span class="publication-item__links">${renderResearchLinks(publication.links)}</span>
          </div>
        </div>
        <span class="list-item__arrow" aria-hidden="true">→</span>
      </a>
    `;
  }

  function renderResearchPanel() {
    const { scholarUrl, items } = config.research;

    return `
      <p class="research-intro">
        For the full list of publications, please visit the
        <a href="${escapeHtml(scholarUrl)}" class="link-underline" target="_blank" rel="noopener noreferrer">Google Scholar page</a>.
      </p>
      <div class="publication-list">
        ${items.map(renderResearchItem).join("")}
      </div>
    `;
  }

  function renderBioPanel() {
    return `<div class="bio-panel">${config.bioPanel.trim()}</div>`;
  }

  function renderPotpourriItem(item) {
    const imageHtml = item.image
      ? `<img class="potpourri-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">`
      : `<div class="placeholder-image" aria-hidden="true">Image</div>`;

    const content = `
      <div class="potpourri-card__label">
        <h2 class="potpourri-card__name">${escapeHtml(item.name)}</h2>
        <h3 class="potpourri-card__date">${escapeHtml(item.date)}</h3>
      </div>
      <div class="potpourri-card__image-wrap">${imageHtml}</div>
    `;

    const isClickable = item.url && item.url !== "#";

    return `
      <li class="potpourri-card">
        ${
          isClickable
            ? `<a href="${escapeHtml(item.url)}" class="potpourri-card__link" target="_blank" rel="noopener noreferrer">${content}</a>`
            : `<div class="potpourri-card__link potpourri-card__link--static">${content}</div>`
        }
      </li>
    `;
  }

  function renderBio() {
    const { intro, image, imageAlt, paragraphs } = config.bio;
    const imageHtml = image
      ? `<figure class="bio__figure"><img class="bio__image" src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt || "")}" loading="lazy"></figure>`
      : "";

    return `
      <div class="bio">
        ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
        ${imageHtml}
        ${paragraphs.map((p) => `<p>${p}</p>`).join("")}
      </div>
    `;
  }

  function renderNewsletter() {
    const { action, method, consentLabel } = config.newsletter;
    return `
      <form class="newsletter" action="${escapeHtml(action)}" method="${escapeHtml(method)}">
        <label class="newsletter__field">
          <input type="email" name="email" placeholder="Email" required>
        </label>
        <div class="newsletter__row">
          <label class="newsletter__consent">
            <input type="checkbox" name="gdpr" value="1" required>
            <h4>${escapeHtml(consentLabel)}</h4>
          </label>
          <button type="submit" class="newsletter__submit" aria-label="Subscribe">→</button>
        </div>
      </form>
    `;
  }

  function renderContacts() {
    return config.contacts
      .map(
        (block) => `
        <div class="contact-block">
          <h3>${escapeHtml(block.title)}</h3>
          ${block.links
            .map(
              (link) =>
                `<a href="${escapeHtml(link.url)}" class="link-underline" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
            )
            .join("")}
        </div>
      `
      )
      .join("");
  }

  const VALID_TABS = ["research", "bio", "potpourri"];
  const LEGACY_TAB_ALIASES = {
    tour: "research",
    archive: "bio",
    store: "potpourri",
  };
  const DEFAULT_TAB = "research";
  const MOBILE_QUERY = window.matchMedia("(max-width: 767px)");

  function isMobile() {
    return MOBILE_QUERY.matches;
  }

  function normalizeTab(hash) {
    if (VALID_TABS.includes(hash)) return hash;
    return LEGACY_TAB_ALIASES[hash] || null;
  }

  function getTabFromUrl() {
    const hash = window.location.hash.replace("#", "");
    return normalizeTab(hash);
  }

  function updateMobileView(tabId) {
    const site = document.querySelector(".site");
    if (!site) return;

    if (isMobile()) {
      site.dataset.mobileView = tabId ? "tab" : "home";
    } else {
      delete site.dataset.mobileView;
    }
  }

  function setActiveTab(tabId) {
    document.querySelectorAll(".tab-nav__item").forEach((tab) => {
      tab.classList.toggle("is-active", tabId !== null && tab.dataset.tab === tabId);
    });

    document.querySelectorAll(".panel-content").forEach((panel) => {
      if (isMobile()) {
        panel.hidden = tabId === null || panel.dataset.panel !== tabId;
      } else {
        const activeTab = tabId || DEFAULT_TAB;
        panel.hidden = panel.dataset.panel !== activeTab;
      }
    });

    updateMobileView(tabId);
  }

  function updateUrl(tabId) {
    const base = window.location.pathname + window.location.search;
    if (tabId) {
      history.replaceState(null, "", `${base}#${tabId}`);
      return;
    }

    history.replaceState(null, "", base);
  }

  function applyView(tabId) {
    setActiveTab(tabId);
    updateUrl(tabId);
  }

  function goHome() {
    applyView(null);
  }

  function initTabs() {
    const initialTab = getTabFromUrl();
    applyView(isMobile() ? initialTab : initialTab || DEFAULT_TAB);

    document.querySelectorAll(".tab-nav__item").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        applyView(tab.dataset.tab);
      });
    });

    const brand = document.getElementById("brand");
    if (brand) {
      brand.addEventListener("click", (e) => {
        e.preventDefault();
        if (isMobile()) {
          goHome();
          return;
        }

        applyView(DEFAULT_TAB);
      });
    }

    window.addEventListener("hashchange", () => {
      const tab = getTabFromUrl();
      applyView(isMobile() ? tab : tab || DEFAULT_TAB);
    });

    MOBILE_QUERY.addEventListener("change", () => {
      const tab = getTabFromUrl();
      applyView(isMobile() ? tab : tab || DEFAULT_TAB);
    });
  }

  function populatePage() {
    document.title = config.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", config.meta.description);

    const brand = document.getElementById("brand");
    if (brand) {
      brand.innerHTML = `
        <h1>${escapeHtml(config.brand.firstName)}</h1>
        <h1>${escapeHtml(config.brand.lastName)}</h1>
      `;
      brand.href = config.brand.homeUrl;
    }

    const researchPanel = document.getElementById("panel-research");
    if (researchPanel) researchPanel.innerHTML = renderResearchPanel();

    const potpourriPanel = document.getElementById("panel-potpourri");
    if (potpourriPanel) {
      potpourriPanel.innerHTML = `<ul class="potpourri-grid">${config.potpourri.map(renderPotpourriItem).join("")}</ul>`;
    }

    const bioPanel = document.getElementById("panel-bio");
    if (bioPanel) {
      bioPanel.innerHTML = renderBioPanel();
    }

    const bioEl = document.getElementById("bio-content");
    if (bioEl) bioEl.innerHTML = renderBio();

    const newsletterEl = document.getElementById("newsletter-form");
    if (newsletterEl) newsletterEl.innerHTML = "";

    const contactsEl = document.getElementById("contacts");
    if (contactsEl) contactsEl.innerHTML = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    populatePage();
    initTabs();
  });
})();
