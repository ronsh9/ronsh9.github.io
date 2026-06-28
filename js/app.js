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

  function renderResearchItem(publication) {
    const primaryLink = publication.links[0];
    const href = primaryLink?.url || "#";

    return `
      <a
        href="${escapeHtml(href)}"
        class="list-item list-item--publication"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${escapeHtml(publication.title)}"
      >
        <div class="list-item__body">
          <h2 class="publication-item__title">${escapeHtml(publication.title)}</h2>
          <p class="publication-item__authors">${renderResearchAuthors(publication.authors)}</p>
          <div class="publication-item__footer">
            <span class="publication-item__venue">
              <span>${escapeHtml(publication.venue)} (${escapeHtml(publication.year)})</span>
            </span>
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
  const PANEL_LEGACY_IDS = {
    research: "panel-tour",
    bio: "panel-archive",
    potpourri: "panel-store",
  };
  const DEFAULT_TAB = "research";
  const MOBILE_QUERY = window.matchMedia("(max-width: 767px)");

  function isMobile() {
    return MOBILE_QUERY.matches;
  }

  function canonicalTab(tabId) {
    if (!tabId) return null;
    if (VALID_TABS.includes(tabId)) return tabId;
    return LEGACY_TAB_ALIASES[tabId] || null;
  }

  function getTabFromUrl() {
    const hash = window.location.hash.replace("#", "");
    return canonicalTab(hash);
  }

  function getPanelElement(tabId) {
    return (
      document.getElementById(`panel-${tabId}`) ||
      document.getElementById(PANEL_LEGACY_IDS[tabId])
    );
  }

  function migrateLegacyMarkup() {
    document.querySelectorAll(".tab-nav__item").forEach((tab) => {
      const tabId = canonicalTab(tab.dataset.tab);
      if (!tabId) return;

      tab.dataset.tab = tabId;
      tab.setAttribute("href", `#${tabId}`);
    });

    Object.entries(PANEL_LEGACY_IDS).forEach(([tabId, legacyId]) => {
      const panel = document.getElementById(`panel-${tabId}`) || document.getElementById(legacyId);
      if (!panel) return;

      panel.id = `panel-${tabId}`;
      panel.dataset.panel = tabId;
    });
  }

  function resolveView(tabId) {
    const canonical = canonicalTab(tabId);

    if (isMobile()) {
      return { activeTab: canonical, urlTab: canonical };
    }

    const activeTab = canonical || DEFAULT_TAB;
    return { activeTab, urlTab: activeTab };
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

  function scrollToTop(el) {
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = 0;
    });
  }

  function resetRightPanelScroll() {
    scrollToTop(document.querySelector(".panel-right"));
  }

  function setActiveTab(activeTab) {
    document.querySelectorAll(".tab-nav__item").forEach((tab) => {
      const tabKey = canonicalTab(tab.dataset.tab) || tab.dataset.tab;
      tab.classList.toggle("is-active", activeTab !== null && tabKey === activeTab);
    });

    document.querySelectorAll(".panel-content").forEach((panel) => {
      const panelKey = canonicalTab(panel.dataset.panel) || panel.dataset.panel;
      const isActive = activeTab !== null && panelKey === activeTab;
      panel.hidden = !isActive;
      if (isActive) scrollToTop(panel);
    });

    updateMobileView(activeTab);
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
    const { activeTab, urlTab } = resolveView(tabId);
    setActiveTab(activeTab);
    updateUrl(urlTab);
    if (activeTab === null) resetRightPanelScroll();
  }

  function goHome() {
    applyView(null);
  }

  function initTabs() {
    const initialTab = getTabFromUrl();
    applyView(initialTab);

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

        window.PanelControls?.expandRightPanel();
        window.PanelControls?.expandTabNav({ resetScroll: false });
      });
    }

    window.addEventListener("hashchange", () => {
      applyView(getTabFromUrl());
    });

    MOBILE_QUERY.addEventListener("change", () => {
      applyView(getTabFromUrl());
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

    const researchPanel = getPanelElement("research");
    if (researchPanel) researchPanel.innerHTML = renderResearchPanel();

    const potpourriPanel = getPanelElement("potpourri");
    if (potpourriPanel) {
      potpourriPanel.innerHTML = `<ul class="potpourri-grid">${config.potpourri.map(renderPotpourriItem).join("")}</ul>`;
    }

    const bioPanel = getPanelElement("bio");
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
    migrateLegacyMarkup();
    populatePage();
    initTabs();
  });
})();
