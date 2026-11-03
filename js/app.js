/**
 * K-PAXian Dictionary - Main Application Logic
 * Exo-Linguistic Archaeological Archives • Sector 4
 * Universal Dual-Load Compatible (Zero Emojis, Clean Technical Glyphs)
 */

(function() {
  // Guard: Disable local file:// protocol in favor of live public webapp
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    const renderDisabledScreen = () => {
      document.body.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #090a0f; color: #f8f8f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 1.5rem; text-align: center;">
          <div style="max-width: 520px; width: 100%; background: #171a28; border: 1.5px solid #00ffff; border-radius: 16px; padding: 2rem 1.5rem; box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);">
            <div style="font-size: 2.4rem; color: #00ffff; margin-bottom: 0.5rem;">⟡</div>
            <h1 style="font-size: 1.45rem; font-weight: 800; color: #00ffff; margin-bottom: 0.5rem;">Local Protocol Disabled</h1>
            <p style="color: #bfbfd4; font-size: 0.88rem; line-height: 1.55; margin-bottom: 1.5rem;">
              The <strong>K-PAXian Planetary Lexicon</strong> is an interstellar Progressive Web Application built for public deployment. Local <code>file://</code> execution is disabled.
            </p>
            <a href="https://eclypheon.github.io/KpaxianDict/" style="display: inline-flex; align-items: center; gap: 0.4rem; background: #f7ee16; color: #090a0f; font-weight: 800; font-size: 0.92rem; padding: 0.65rem 1.35rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 15px rgba(247,238,22,0.3);">
              Launch Live Webapp on GitHub Pages ↗
            </a>
            <div style="margin-top: 1.5rem; font-size: 0.72rem; color: #5e6b8a; font-family: monospace;">
              Department of Exo-Linguistic Studies • Sector 4 Archives
            </div>
          </div>
        </div>
      `;
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderDisabledScreen);
    } else {
      renderDisabledScreen();
    }
    return;
  }

  // Disable pinch-to-zoom gestures
  if (typeof document !== 'undefined') {
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());
    document.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  const DICTIONARY_SOURCE = (typeof window !== "undefined" && window.KPAXIAN_DICTIONARY) 
    ? window.KPAXIAN_DICTIONARY 
    : [];

  const THEMES_SOURCE = (typeof window !== "undefined" && window.THEMES) 
    ? window.THEMES 
    : [];

  const ThemeManagerClass = (typeof window !== "undefined" && window.ThemeManager)
    ? window.ThemeManager
    : class FallbackThemeManager {
        constructor() { this.currentTheme = "pastel-pink"; this.autoRotate = false; }
        getCurrentState() { return { theme: this.currentTheme, autoRotate: this.autoRotate, info: { name: "Pastel Pink", symbol: "◈", color: "#ffd1dc" } }; }
        setTheme(t) { this.currentTheme = t; document.documentElement.setAttribute("data-theme", t); }
        toggleAutoRotate() { this.autoRotate = !this.autoRotate; return this.autoRotate; }
      };

  class KpaxianApp {
    constructor() {
      this.words = [...DICTIONARY_SOURCE];
      this.activeFilter = "all";
      this.searchQuery = "";
      this.currentWotd = null;
      this.hasSpeech = "speechSynthesis" in window;

      // DOM Elements - Navigation & Drawer
      this.btnToggleDrawer = document.getElementById("btnToggleDrawer");
      this.btnCloseDrawer = document.getElementById("btnCloseDrawer");
      this.drawerBackdrop = document.getElementById("drawerBackdrop");
      this.planetaryDrawer = document.getElementById("planetaryDrawer");
      this.headerWordCountBadge = document.getElementById("headerWordCountBadge");
      this.currentThemePill = document.getElementById("currentThemePill");
      this.drawerThemesGrid = document.getElementById("drawerThemesGrid");
      this.drawerAutoRotateToggle = document.getElementById("drawerAutoRotateToggle");
      this.browserSearchInput = document.getElementById("browserSearchInput");
      this.browserClearBtn = document.getElementById("browserClearBtn");
      this.lexiconBrowserList = document.getElementById("lexiconBrowserList");
      this.browserCountBadge = document.getElementById("browserCountBadge");

      // Drawer Quick Actions
      this.drawerBtnRandom = document.getElementById("drawerBtnRandom");
      this.drawerBtnWotd = document.getElementById("drawerBtnWotd");
      this.drawerBtnAudioTest = document.getElementById("drawerBtnAudioTest");

      // Header Controls
      this.btnOpenThemeModal = document.getElementById("btnOpenThemeModal");
      this.themeBtnSymbol = document.getElementById("themeBtnSymbol");
      this.themeBtnLabel = document.getElementById("themeBtnLabel");
      this.btnToggleAutoRotate = document.getElementById("btnToggleAutoRotate");
      this.autoRotateLabel = document.getElementById("autoRotateLabel");
      this.btnQuickRandom = document.getElementById("btnQuickRandom");

      // Main Grid & Search
      this.gridElement = document.getElementById("dictionaryGrid");
      this.resultsCountElement = document.getElementById("resultsCount");
      this.searchInput = document.getElementById("searchInput");
      this.clearSearchBtn = document.getElementById("clearSearchBtn");
      this.filterPillsContainer = document.getElementById("filterPills");
      this.btnRandom = document.getElementById("btnRandom");

      // WOTD elements
      this.wotdSection = document.getElementById("wotdSection");
      this.wotdWord = document.getElementById("wotdWord");
      this.wotdIpa = document.getElementById("wotdIpa");
      this.wotdPos = document.getElementById("wotdPos");
      this.wotdDef = document.getElementById("wotdDef");
      this.wotdExtDef = document.getElementById("wotdExtDef");
      this.wotdEtymology = document.getElementById("wotdEtymology");
      this.wotdResearch = document.getElementById("wotdResearch");
      this.wotdTimer = document.getElementById("wotdTimer");
      this.btnWotdSpeak = document.getElementById("btnWotdSpeak");
      this.btnWotdInspect = document.getElementById("btnWotdInspect");

      // Modals
      this.themeModal = document.getElementById("themeModal");
      this.btnCloseThemeModal = document.getElementById("btnCloseThemeModal");
      this.themeOptionsContainer = document.getElementById("themeOptions");
      this.modalAutoRotateToggle = document.getElementById("modalAutoRotateToggle");

      this.wordDetailModal = document.getElementById("wordDetailModal");
      this.btnDetailClose = document.getElementById("btnDetailClose");
      this.detailModalBody = document.getElementById("detailModalBody");

      // Toast & PWA
      this.appToast = document.getElementById("appToast");
      this.toastTimeout = null;

      // Initialize Theme Manager
      this.themeManager = new ThemeManagerClass((state) => this.onThemeStateChange(state));

      this.init();
    }

    init() {
      // 1. Setup Word of the Day & Live Countdown Timer
      this.setupWordOfTheDay();

      // 2. Render Categories & Main Cards
      this.renderCategoryFilters();
      this.renderWordCards();

      // 3. Setup Navigation Drawer & Full Lexicon Browser
      this.setupDrawer();
      this.renderFullLexiconBrowser();

      // 4. Setup Controls & Listeners
      this.setupSearch();
      this.setupRandomWordButtons();
      this.setupThemeControls();
      this.setupPWA();

      // 5. Initial theme UI sync
      this.onThemeStateChange(this.themeManager.getCurrentState());

      // 6. Set word count badges
      if (this.headerWordCountBadge) this.headerWordCountBadge.textContent = this.words.length;
      if (this.browserCountBadge) this.browserCountBadge.textContent = `${this.words.length} Records`;
    }

    /* ==========================================================================
       WORD OF THE DAY & LIVE COUNTDOWN TIMER
       ========================================================================== */
    setupWordOfTheDay() {
      if (this.words.length === 0) return;

      const today = new Date();
      const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const hash = dateStr.split("").reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 3), 0);
      const wotdIndex = hash % this.words.length;
      this.currentWotd = this.words[wotdIndex];

      if (this.currentWotd) {
        if (this.wotdWord) this.wotdWord.textContent = this.currentWotd.word;
        if (this.wotdIpa) this.wotdIpa.textContent = this.currentWotd.ipa;
        if (this.wotdPos) {
          const cleanPos = this.currentWotd.partOfSpeech.split("/")[0].trim().toLowerCase();
          this.wotdPos.textContent = this.currentWotd.partOfSpeech;
          this.wotdPos.setAttribute("data-pos", cleanPos);
        }
        if (this.wotdDef) this.wotdDef.textContent = this.currentWotd.definition;
        if (this.wotdExtDef) this.wotdExtDef.textContent = this.currentWotd.extendedDefinition || "";
        if (this.wotdEtymology) this.wotdEtymology.textContent = this.currentWotd.etymology;
        if (this.wotdResearch) this.wotdResearch.textContent = this.currentWotd.researchNotes;

        if (this.btnWotdSpeak) {
          this.btnWotdSpeak.onclick = (e) => {
            e.stopPropagation();
            this.speakWord(this.currentWotd.word, this.btnWotdSpeak);
          };
        }

        if (this.btnWotdInspect) {
          this.btnWotdInspect.onclick = () => {
            this.openWordDetail(this.currentWotd.id);
          };
        }
      }

      this.updateMidnightCountdown();
      setInterval(() => this.updateMidnightCountdown(), 1000);
    }

    updateMidnightCountdown() {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffMs = Math.max(0, tomorrow - now);

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, "0");
      if (this.wotdTimer) {
        this.wotdTimer.textContent = `Orbit T- ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
      }
    }

    /* ==========================================================================
       CATEGORY FILTERS & SEARCH
       ========================================================================== */
    renderCategoryFilters() {
      const categories = [
        { id: "all", label: `ALL (${this.words.length})` },
        { id: "nouns", label: "NOUNS" },
        { id: "verbs", label: "VERBS" },
        { id: "adjectives", label: "ADJECTIVES" },
        { id: "core", label: "CORE" },
        { id: "tech", label: "TECH" },
        { id: "social", label: "CLUSTERS" },
        { id: "security", label: "SECURITY" },
        { id: "audio", label: "AUDIO" }
      ];

      this.filterPillsContainer.innerHTML = categories.map(cat => `
        <button class="filter-pill ${this.activeFilter === cat.id ? 'active' : ''}" data-filter="${cat.id}">
          ${cat.label}
        </button>
      `).join("");

      this.filterPillsContainer.addEventListener("click", (e) => {
        const pill = e.target.closest(".filter-pill");
        if (!pill) return;
        this.activeFilter = pill.getAttribute("data-filter");
        this.filterPillsContainer.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.renderWordCards();
      });
    }

    getFilteredWords() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.words.filter(item => {
        const posLower = (item.partOfSpeech || "").toLowerCase();
        const tags = (item.tags || []).map(t => t.toLowerCase());

        let matchesFilter = true;
        if (this.activeFilter === "all") {
          matchesFilter = true;
        } else if (this.activeFilter === "nouns") {
          matchesFilter = posLower.includes("noun") || tags.includes("nouns");
        } else if (this.activeFilter === "verbs") {
          matchesFilter = posLower.includes("verb") || tags.includes("verbs");
        } else if (this.activeFilter === "adjectives") {
          matchesFilter = posLower.includes("adjective") || tags.includes("adjectives");
        } else {
          matchesFilter = tags.includes(this.activeFilter) || posLower.includes(this.activeFilter);
        }

        if (!matchesFilter) return false;
        if (!query) return true;

        const matchesWord = item.word.toLowerCase().includes(query);
        const matchesIpa = (item.ipa || "").toLowerCase().includes(query);
        const matchesDef = (item.definition || "").toLowerCase().includes(query);
        const matchesExt = (item.extendedDefinition || "").toLowerCase().includes(query);
        const matchesEtym = (item.etymology || "").toLowerCase().includes(query);
        const matchesNotes = (item.researchNotes || "").toLowerCase().includes(query);
        const matchesTags = tags.some(t => t.includes(query));

        return matchesWord || matchesIpa || matchesDef || matchesExt || matchesEtym || matchesNotes || matchesTags;
      });
    }

    renderWordCards() {
      const filtered = this.getFilteredWords();
      if (this.resultsCountElement) {
        this.resultsCountElement.textContent = `Showing ${filtered.length} of ${this.words.length} deciphered records`;
      }

      if (filtered.length === 0) {
        this.gridElement.innerHTML = `
          <div class="empty-state">
            <span class="empty-glyph">⟡</span>
            <h3>No Planetary Records Found</h3>
            <p>No transmissions match your query "${this.escapeHtml(this.searchQuery)}". Try searching for 'ting', 'stutudo', 'fren cluster', or 'bbychubi'.</p>
          </div>
        `;
        return;
      }

      this.gridElement.innerHTML = filtered.map(item => {
        const primaryPos = item.partOfSpeech.split("/")[0].trim().toLowerCase();
        
        const conjEntries = Object.entries(item.conjugations || {}).slice(0, 3);
        const conjHtml = conjEntries.length ? `
          <div class="card-section">
            <div class="section-label">Conjugations & Forms</div>
            <div class="conjugations-list">
              ${conjEntries.map(([k, v]) => `
                <div class="conjugation-item">
                  <span class="conj-type">${this.formatKey(k)}:</span>
                  <span class="conj-val">${this.escapeHtml(v)}</span>
                </div>
              `).join("")}
            </div>
          </div>
        ` : "";

        const firstEx = item.examples && item.examples[0];
        const exHtml = firstEx ? `
          <div class="example-box">
            <div class="example-kpaxian">“${this.escapeHtml(firstEx.kpaxian)}”</div>
            <div class="example-english">— ${this.escapeHtml(firstEx.english)}</div>
          </div>
        ` : "";

        return `
          <article class="word-card" data-id="${item.id}" id="card-${item.id}">
            <div class="word-card-top">
              <div class="card-title-group">
                <div class="card-word-title">
                  ${this.escapeHtml(item.word)}
                  <button class="btn-speak" data-word="${this.escapeHtml(item.word)}" title="Synthesize pronunciation">
                    <svg class="ui-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  </button>
                </div>
                <div class="card-ipa">${item.ipa}</div>
              </div>
              <span class="pos-badge" data-pos="${primaryPos}">${item.partOfSpeech}</span>
            </div>

            <div class="card-definition">
              ${this.escapeHtml(item.definition)}
            </div>

            ${conjHtml}
            ${exHtml}

            <div class="card-section">
              <div class="section-label">Research Note</div>
              <p class="lore-note">${this.escapeHtml(item.researchNotes)}</p>
            </div>

            <div class="card-footer-row">
              <div class="card-tags">
                ${(item.tags || []).map(t => `<span class="tag-badge">#${t}</span>`).join("")}
              </div>
              <span class="card-expand-link">Expand ↗</span>
            </div>
          </article>
        `;
      }).join("");

      this.gridElement.querySelectorAll(".word-card").forEach(card => {
        card.addEventListener("click", (e) => {
          const speakBtn = e.target.closest(".btn-speak");
          if (speakBtn) {
            e.stopPropagation();
            const wordToSpeak = speakBtn.getAttribute("data-word");
            this.speakWord(wordToSpeak, speakBtn);
            return;
          }
          const id = card.getAttribute("data-id");
          this.openWordDetail(id);
        });
      });
    }

    setupSearch() {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.clearSearchBtn.classList.toggle("active", this.searchQuery.length > 0);
        this.renderWordCards();
      });

      this.clearSearchBtn.addEventListener("click", () => {
        this.searchInput.value = "";
        this.searchQuery = "";
        this.clearSearchBtn.classList.remove("active");
        this.searchInput.focus();
        this.renderWordCards();
      });
    }

    /* ==========================================================================
       OFF-CANVAS PLANETARY SIDEBAR DRAWER & FULL LEXICON BROWSER
       ========================================================================== */
    setupDrawer() {
      const openDrawer = () => {
        this.planetaryDrawer.classList.add("active");
        this.drawerBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
      };

      const closeDrawer = () => {
        this.planetaryDrawer.classList.remove("active");
        this.drawerBackdrop.classList.remove("active");
        document.body.style.overflow = "";
      };

      if (this.btnToggleDrawer) this.btnToggleDrawer.addEventListener("click", openDrawer);
      if (this.btnCloseDrawer) this.btnCloseDrawer.addEventListener("click", closeDrawer);
      if (this.drawerBackdrop) this.drawerBackdrop.addEventListener("click", closeDrawer);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeDrawer();
          this.themeModal.classList.remove("active");
          this.wordDetailModal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });

      if (this.drawerBtnRandom) {
        this.drawerBtnRandom.addEventListener("click", () => {
          closeDrawer();
          this.triggerRandomWord();
        });
      }

      if (this.drawerBtnWotd) {
        this.drawerBtnWotd.addEventListener("click", () => {
          closeDrawer();
          if (this.wotdSection) {
            this.wotdSection.scrollIntoView({ behavior: "smooth" });
            this.showToast("Jumped to Lexeme of the Orbit");
          }
        });
      }

      if (this.drawerBtnAudioTest) {
        this.drawerBtnAudioTest.addEventListener("click", () => {
          const testPhrase = this.currentWotd ? this.currentWotd.word : "K-PAX";
          this.speakWord(testPhrase, null);
          this.showToast(`Synthesizing: "${testPhrase}"`);
        });
      }

      if (this.drawerAutoRotateToggle) {
        this.drawerAutoRotateToggle.addEventListener("change", () => {
          const isEnabled = this.themeManager.toggleAutoRotate();
          this.showToast(isEnabled ? "Auto-Rotate Enabled" : "Planetary Spectrum Locked");
        });
      }

      if (this.browserSearchInput) {
        this.browserSearchInput.addEventListener("input", (e) => {
          const q = e.target.value.toLowerCase().trim();
          if (this.browserClearBtn) {
            this.browserClearBtn.classList.toggle("active", q.length > 0);
          }
          this.renderFullLexiconBrowser(q);
        });
      }

      if (this.browserClearBtn) {
        this.browserClearBtn.addEventListener("click", () => {
          this.browserSearchInput.value = "";
          this.browserClearBtn.classList.remove("active");
          this.renderFullLexiconBrowser("");
        });
      }
    }

    renderFullLexiconBrowser(query = "") {
      if (!this.lexiconBrowserList) return;

      const filtered = this.words.filter(w => {
        if (!query) return true;
        return w.word.toLowerCase().includes(query) ||
               w.definition.toLowerCase().includes(query) ||
               w.partOfSpeech.toLowerCase().includes(query);
      }).sort((a, b) => a.word.localeCompare(b.word));

      if (this.browserCountBadge) {
        this.browserCountBadge.textContent = `${filtered.length} of ${this.words.length}`;
      }

      if (filtered.length === 0) {
        this.lexiconBrowserList.innerHTML = `
          <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.76rem;">
            No records found matching "${this.escapeHtml(query)}"
          </div>
        `;
        return;
      }

      this.lexiconBrowserList.innerHTML = filtered.map(item => {
        const primaryPos = item.partOfSpeech.split("/")[0].trim().toLowerCase();
        return `
          <div class="browser-item" data-id="${item.id}">
            <div class="browser-item-left">
              <span class="browser-item-word">${this.escapeHtml(item.word)}</span>
              <span class="browser-item-ipa">${item.ipa}</span>
              <span class="browser-item-def">${this.escapeHtml(item.definition)}</span>
            </div>
            <span class="pos-badge" data-pos="${primaryPos}">${item.partOfSpeech}</span>
          </div>
        `;
      }).join("");

      this.lexiconBrowserList.querySelectorAll(".browser-item").forEach(el => {
        el.addEventListener("click", () => {
          const id = el.getAttribute("data-id");
          this.planetaryDrawer.classList.remove("active");
          this.drawerBackdrop.classList.remove("active");
          document.body.style.overflow = "";

          this.openWordDetail(id);

          const cardEl = document.getElementById(`card-${id}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      });
    }

    /* ==========================================================================
       THEME MANAGEMENT & SEPARATED CONTROLS
       ========================================================================== */
    setupThemeControls() {
      if (this.btnOpenThemeModal) {
        this.btnOpenThemeModal.addEventListener("click", () => {
          this.renderThemeOptions();
          this.themeModal.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      }

      if (this.btnCloseThemeModal) {
        this.btnCloseThemeModal.addEventListener("click", () => {
          this.themeModal.classList.remove("active");
          document.body.style.overflow = "";
        });
      }

      if (this.themeModal) {
        this.themeModal.addEventListener("click", (e) => {
          if (e.target === this.themeModal) {
            this.themeModal.classList.remove("active");
            document.body.style.overflow = "";
          }
        });
      }

      if (this.btnToggleAutoRotate) {
        this.btnToggleAutoRotate.addEventListener("click", () => {
          const isEnabled = this.themeManager.toggleAutoRotate();
          this.showToast(isEnabled ? "Auto-Rotate Enabled" : "Planetary Spectrum Locked");
        });
      }

      if (this.modalAutoRotateToggle) {
        this.modalAutoRotateToggle.addEventListener("change", () => {
          const isEnabled = this.themeManager.toggleAutoRotate();
          this.showToast(isEnabled ? "Auto-Rotate Enabled" : "Planetary Spectrum Locked");
        });
      }
    }

    renderThemeOptions(passedState = null) {
      const state = passedState || (this.themeManager ? this.themeManager.getCurrentState() : { theme: 'pastel-pink', autoRotate: true });
      const themes = (this.themeManager && this.themeManager.getAvailableThemes) ? this.themeManager.getAvailableThemes() : THEMES_SOURCE;

      if (this.modalAutoRotateToggle) {
        this.modalAutoRotateToggle.checked = state.autoRotate;
      }

      if (this.themeOptionsContainer) {
        this.themeOptionsContainer.innerHTML = themes.map(t => `
          <div class="theme-card-option ${t.id === state.theme ? 'selected' : ''}" data-theme="${t.id}">
            <div class="theme-opt-top">
              <span class="theme-opt-symbol">${t.symbol || '◈'}</span>
              <span class="theme-opt-swatch" style="background-color: ${t.color}"></span>
            </div>
            <span class="theme-opt-name">${t.name}</span>
            <span class="theme-opt-desc">${t.description}</span>
          </div>
        `).join("");

        this.themeOptionsContainer.querySelectorAll(".theme-card-option").forEach(card => {
          card.addEventListener("click", () => {
            const themeId = card.getAttribute("data-theme");
            this.themeManager.setTheme(themeId);
            this.renderThemeOptions();
            this.showToast(`Spectrum: ${THEMES_SOURCE.find(x => x.id === themeId)?.name || themeId}`);
          });
        });
      }

      if (this.drawerThemesGrid) {
        this.drawerThemesGrid.innerHTML = themes.map(t => `
          <div class="drawer-theme-card ${t.id === state.theme ? 'active' : ''}" data-theme="${t.id}">
            <span class="theme-card-icon">${t.symbol || '◈'}</span>
            <span class="theme-card-title">${t.name}</span>
          </div>
        `).join("");

        this.drawerThemesGrid.querySelectorAll(".drawer-theme-card").forEach(card => {
          card.addEventListener("click", () => {
            const themeId = card.getAttribute("data-theme");
            this.themeManager.setTheme(themeId);
            this.renderThemeOptions();
            this.showToast(`Spectrum: ${THEMES_SOURCE.find(x => x.id === themeId)?.name || themeId}`);
          });
        });
      }
    }

    onThemeStateChange(state) {
      if (this.themeBtnSymbol) this.themeBtnSymbol.textContent = state.info.symbol || "◈";
      if (this.themeBtnLabel) this.themeBtnLabel.textContent = state.info.name;
      if (this.currentThemePill) this.currentThemePill.textContent = state.info.name;

      if (this.btnToggleAutoRotate) {
        this.btnToggleAutoRotate.classList.toggle("active", state.autoRotate);
      }
      if (this.autoRotateLabel) {
        this.autoRotateLabel.textContent = state.autoRotate ? "Auto: ON" : "Auto: OFF";
      }

      if (this.drawerAutoRotateToggle) {
        this.drawerAutoRotateToggle.checked = state.autoRotate;
      }
      if (this.modalAutoRotateToggle) {
        this.modalAutoRotateToggle.checked = state.autoRotate;
      }

      this.renderThemeOptions();
    }

    /* ==========================================================================
       RANDOM WORD DISCOVERY
       ========================================================================== */
    setupRandomWordButtons() {
      const trigger = (btn) => {
        if (btn) btn.classList.add("rolling");
        setTimeout(() => {
          if (btn) btn.classList.remove("rolling");
          this.triggerRandomWord();
        }, 350);
      };

      if (this.btnRandom) {
        this.btnRandom.addEventListener("click", () => trigger(this.btnRandom));
      }
      if (this.btnQuickRandom) {
        this.btnQuickRandom.addEventListener("click", () => trigger(this.btnQuickRandom));
      }
    }

    triggerRandomWord() {
      if (this.words.length === 0) return;
      const randomIndex = Math.floor(Math.random() * this.words.length);
      const chosen = this.words[randomIndex];
      this.openWordDetail(chosen.id);
      this.showToast(`Discovered: ${chosen.word}`);
    }

    /* ==========================================================================
       WORD DETAIL MODAL ("ARCHIVAL FIELD RECORD")
       ========================================================================== */
    openWordDetail(id) {
      const item = this.words.find(w => w.id === id);
      if (!item) return;

      const primaryPos = item.partOfSpeech.split("/")[0].trim().toLowerCase();

      this.detailModalBody.innerHTML = `
        <div class="detail-word-header">
          <div>
            <h2 class="detail-title">
              ${this.escapeHtml(item.word)}
              <button class="btn-speak" id="modalSpeakBtn" title="Synthesize phonetic pronunciation">
                <svg class="ui-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              </button>
            </h2>
            <div class="detail-ipa">${item.ipa}</div>
          </div>
          <span class="pos-badge" data-pos="${primaryPos}">${item.partOfSpeech}</span>
        </div>

        <div class="detail-def-box">
          <div class="detail-def-primary">${this.escapeHtml(item.definition)}</div>
          <div class="detail-def-ext">${this.escapeHtml(item.extendedDefinition || '')}</div>
        </div>

        <div class="card-section">
          <div class="section-label">Morphological Conjugations</div>
          <div class="detail-conj-grid">
            ${Object.entries(item.conjugations || {}).map(([k, v]) => `
              <div class="detail-conj-chip">
                <span class="detail-conj-label">${this.formatKey(k)}</span>
                <span class="detail-conj-val">${this.escapeHtml(v)}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="meta-box">
          <div class="meta-title">Planetary Etymology & Roots</div>
          <div class="meta-content">${this.escapeHtml(item.etymology)}</div>
        </div>

        <div class="meta-box">
          <div class="meta-title">Archaeological Excavation Notes</div>
          <div class="meta-content">${this.escapeHtml(item.researchNotes)}</div>
        </div>

        <div class="card-section">
          <div class="section-label">Attested Dispatches in Spacetime</div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            ${(item.examples || []).map(ex => `
              <div class="example-box">
                <div class="example-kpaxian">“${this.escapeHtml(ex.kpaxian)}”</div>
                <div class="example-english">— ${this.escapeHtml(ex.english)}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="card-footer-row" style="margin-top: 0.35rem;">
          <div class="card-tags">
            ${(item.tags || []).map(t => `<span class="tag-badge">#${t}</span>`).join("")}
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">
            REF: ${item.id}
          </span>
        </div>
      `;

      const modalSpeakBtn = document.getElementById("modalSpeakBtn");
      if (modalSpeakBtn) {
        modalSpeakBtn.addEventListener("click", () => {
          this.speakWord(item.word, modalSpeakBtn);
        });
      }

      this.wordDetailModal.classList.add("active");
      document.body.style.overflow = "hidden";

      if (this.btnDetailClose) {
        this.btnDetailClose.onclick = () => {
          this.wordDetailModal.classList.remove("active");
          document.body.style.overflow = "";
        };
      }

      this.wordDetailModal.onclick = (e) => {
        if (e.target === this.wordDetailModal) {
          this.wordDetailModal.classList.remove("active");
          document.body.style.overflow = "";
        }
      };
    }

    /* ==========================================================================
       SPEECH SYNTHESIS (WEB SPEECH API)
       ========================================================================== */
    speakWord(word, btnElement = null) {
      if (!this.hasSpeech) {
        this.showToast("Speech synthesis not supported on this device.");
        return;
      }

      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.86;
        utterance.pitch = 1.06;

        if (btnElement) {
          btnElement.classList.add("speaking");
          utterance.onend = () => btnElement.classList.remove("speaking");
          utterance.onerror = () => btnElement.classList.remove("speaking");
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error", err);
      }
    }

    /* ==========================================================================
       TOAST NOTIFICATIONS
       ========================================================================== */
    showToast(message) {
      if (!this.appToast) return;
      clearTimeout(this.toastTimeout);
      this.appToast.textContent = message;
      this.appToast.classList.add("active");
      this.toastTimeout = setTimeout(() => {
        this.appToast.classList.remove("active");
      }, 2400);
    }

    /* ==========================================================================
       PWA INSTALLATION & SERVICE WORKER
       ========================================================================== */
    setupPWA() {
      if ("serviceWorker" in navigator) {
        const APP_BUILD_ID = "20261104-0230";
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("./sw.js?v=" + APP_BUILD_ID).then(reg => {
            document.addEventListener("visibilitychange", () => {
              if (document.visibilityState === "visible") {
                reg.update().catch(() => {});
              }
            });
            setInterval(() => reg.update().catch(() => {}), 60000);
          }).catch(err => {
            console.warn("ServiceWorker registration skipped:", err);
          });
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });
      }

      let deferredPrompt = null;
      const banner = document.getElementById("pwaInstallBanner");
      const installBtn = document.getElementById("btnInstallApp");
      const dismissBtn = document.getElementById("btnDismissInstall");

      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (banner) banner.classList.add("visible");
      });

      if (installBtn) {
        installBtn.addEventListener("click", async () => {
          if (!deferredPrompt) return;
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === "accepted") {
            if (banner) banner.classList.remove("visible");
          }
          deferredPrompt = null;
        });
      }

      if (dismissBtn && banner) {
        dismissBtn.addEventListener("click", () => {
          banner.classList.remove("visible");
        });
      }
    }

    /* Utilities */
    formatKey(key) {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^\w/, c => c.toUpperCase());
    }

    escapeHtml(str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.kpaxApp = new KpaxianApp();
    });
  } else {
    window.kpaxApp = new KpaxianApp();
  }
})();
