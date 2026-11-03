/**
 * K-PAXian Dictionary - Main Application Logic
 * Integrates Vocabulary Dataset, Search, Word of the Day, and Theme Manager.
 */

import { KPAXIAN_DICTIONARY } from "./dictionary-data.js";
import { ThemeManager, THEMES } from "./theme-manager.js";

class KpaxianDictionaryApp {
  constructor() {
    this.words = [...KPAXIAN_DICTIONARY];
    this.activeFilter = "all";
    this.searchQuery = "";
    this.selectedWord = null;

    // DOM Elements
    this.gridElement = document.getElementById("dictionaryGrid");
    this.resultsCountElement = document.getElementById("resultsCount");
    this.searchInput = document.getElementById("searchInput");
    this.clearSearchBtn = document.getElementById("clearSearchBtn");
    this.filterPillsContainer = document.getElementById("filterPills");
    this.btnRandom = document.getElementById("btnRandom");
    
    // WOTD elements
    this.wotdWord = document.getElementById("wotdWord");
    this.wotdIpa = document.getElementById("wotdIpa");
    this.wotdPos = document.getElementById("wotdPos");
    this.wotdDef = document.getElementById("wotdDef");
    this.wotdEtymology = document.getElementById("wotdEtymology");
    this.wotdResearch = document.getElementById("wotdResearch");
    this.wotdTimer = document.getElementById("wotdTimer");
    this.btnWotdSpeak = document.getElementById("btnWotdSpeak");

    // Modal elements
    this.themeModal = document.getElementById("themeModal");
    this.btnOpenThemeModal = document.getElementById("btnOpenThemeModal");
    this.btnCloseThemeModal = document.getElementById("btnCloseThemeModal");
    this.themeOptionsContainer = document.getElementById("themeOptions");
    this.lockToggle = document.getElementById("lockToggle");
    this.themePillLabel = document.getElementById("themePillLabel");
    this.themePillIcon = document.getElementById("themePillIcon");
    this.themeLockIndicator = document.getElementById("themeLockIndicator");

    // Word detail modal
    this.wordDetailModal = document.getElementById("wordDetailModal");
    this.btnDetailClose = document.getElementById("btnDetailClose");
    this.detailModalBody = document.getElementById("detailModalBody");

    // Initialize Theme Manager
    this.themeManager = new ThemeManager((state) => this.updateThemeUI(state));

    this.init();
  }

  init() {
    this.setupWordOfTheDay();
    this.renderFilters();
    this.renderWordCards();
    this.setupSearch();
    this.setupRandomWord();
    this.setupThemeModal();
    this.setupSpeechSynthesis();
    this.setupPWA();
    this.updateThemeUI(this.themeManager.getCurrentState());
  }

  /* Word of the Day (Deterministic by Date String) */
  setupWordOfTheDay() {
    // Deterministic index using date string: YYYY-MM-DD
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const hash = dateStr.split("").reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0);
    const wotdIndex = hash % this.words.length;
    this.currentWotd = this.words[wotdIndex];

    if (this.currentWotd) {
      this.wotdWord.textContent = this.currentWotd.word;
      this.wotdIpa.textContent = this.currentWotd.ipa;
      this.wotdPos.textContent = this.currentWotd.partOfSpeech;
      this.wotdPos.setAttribute("data-pos", this.currentWotd.partOfSpeech.split("/")[0].trim().toLowerCase());
      this.wotdDef.textContent = this.currentWotd.definition;
      this.wotdEtymology.textContent = this.currentWotd.etymology;
      this.wotdResearch.textContent = this.currentWotd.researchNotes;

      this.btnWotdSpeak.addEventListener("click", (e) => {
        e.stopPropagation();
        this.speakWord(this.currentWotd.word);
      });
    }

    // Live countdown to midnight (next planetary orbit)
    this.updateMidnightCountdown();
    setInterval(() => this.updateMidnightCountdown(), 1000);
  }

  updateMidnightCountdown() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diffMs = tomorrow - now;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");
    if (this.wotdTimer) {
      this.wotdTimer.textContent = `Next orbit in ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
    }
  }

  /* Filters */
  renderFilters() {
    const categories = [
      { id: "all", label: "All Lexemes" },
      { id: "noun", label: "Nouns" },
      { id: "verb", label: "Verbs" },
      { id: "adjective", label: "Adjectives" },
      { id: "interjection", label: "Interjections" },
      { id: "adverb", label: "Adverbs" },
      { id: "tech", label: "Stellar Tech" }
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

  /* Search & Filter Pipeline */
  getFilteredWords() {
    const query = this.searchQuery.toLowerCase().trim();
    return this.words.filter(item => {
      const matchesFilter = 
        this.activeFilter === "all" ||
        item.partOfSpeech.toLowerCase().includes(this.activeFilter) ||
        (item.tags && item.tags.includes(this.activeFilter));

      if (!matchesFilter) return false;
      if (!query) return true;

      const matchesWord = item.word.toLowerCase().includes(query);
      const matchesDef = item.definition.toLowerCase().includes(query);
      const matchesExt = item.extendedDefinition.toLowerCase().includes(query);
      const matchesEtym = item.etymology.toLowerCase().includes(query);
      const matchesNotes = item.researchNotes.toLowerCase().includes(query);
      const matchesTags = item.tags && item.tags.some(t => t.toLowerCase().includes(query));

      return matchesWord || matchesDef || matchesExt || matchesEtym || matchesNotes || matchesTags;
    });
  }

  /* Render Word Cards */
  renderWordCards() {
    const filtered = this.getFilteredWords();
    this.resultsCountElement.textContent = `Showing ${filtered.length} of ${this.words.length} deciphered records`;

    if (filtered.length === 0) {
      this.gridElement.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🪐</span>
          <h3>No K-PAXian records found</h3>
          <p>No transmissions match your query "${this.searchQuery}". Try searching for 'ting', 'stutudo', or 'bbychubi'.</p>
        </div>
      `;
      return;
    }

    this.gridElement.innerHTML = filtered.map(item => {
      const primaryPos = item.partOfSpeech.split("/")[0].trim().toLowerCase();
      
      // Conjugation snippet
      const conjEntries = Object.entries(item.conjugations || {}).slice(0, 3);
      const conjHtml = conjEntries.length ? `
        <div class="card-section">
          <div class="section-label">⚡ Conjugations & Forms</div>
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

      // Example snippet
      const firstEx = item.examples && item.examples[0];
      const exHtml = firstEx ? `
        <div class="example-box">
          <div class="example-kpaxian">“${this.escapeHtml(firstEx.kpaxian)}”</div>
          <div class="example-english">— ${this.escapeHtml(firstEx.english)}</div>
        </div>
      ` : "";

      return `
        <article class="word-card" data-id="${item.id}">
          <div class="word-card-top">
            <div class="card-title-group">
              <div class="card-word-title">
                ${this.escapeHtml(item.word)}
                <button class="btn-speak" data-word="${this.escapeHtml(item.word)}" title="Synthesize Pronunciation">🔊</button>
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
            <div class="section-label">📜 Research Note</div>
            <p class="lore-note">${this.escapeHtml(item.researchNotes)}</p>
          </div>

          <div class="card-tags">
            ${(item.tags || []).map(t => `<span class="tag-badge">#${t}</span>`).join("")}
          </div>
        </article>
      `;
    }).join("");

    // Wire up clicks on card for modal detail
    this.gridElement.querySelectorAll(".word-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-speak")) {
          const wordToSpeak = e.target.closest(".btn-speak").getAttribute("data-word");
          this.speakWord(wordToSpeak);
          return;
        }
        const id = card.getAttribute("data-id");
        this.openWordDetail(id);
      });
    });
  }

  /* Search listeners */
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

  /* Random Word Discovery */
  setupRandomWord() {
    this.btnRandom.addEventListener("click", () => {
      this.btnRandom.classList.add("rolling");
      setTimeout(() => {
        this.btnRandom.classList.remove("rolling");
        const randomIndex = Math.floor(Math.random() * this.words.length);
        const randomWord = this.words[randomIndex];
        this.openWordDetail(randomWord.id);
      }, 400);
    });
  }

  /* Word Detail Modal */
  openWordDetail(id) {
    const item = this.words.find(w => w.id === id);
    if (!item) return;

    const primaryPos = item.partOfSpeech.split("/")[0].trim().toLowerCase();

    this.detailModalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
            ${this.escapeHtml(item.word)}
            <button class="btn-speak" data-word="${this.escapeHtml(item.word)}" style="font-size: 1.4rem;" title="Listen">🔊</button>
          </h2>
          <div style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--text-muted); margin-top: 0.25rem;">
            ${item.ipa}
          </div>
        </div>
        <span class="pos-badge" data-pos="${primaryPos}">${item.partOfSpeech}</span>
      </div>

      <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.5;">
        ${this.escapeHtml(item.definition)}
      </div>

      <div style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
        ${this.escapeHtml(item.extendedDefinition)}
      </div>

      <div class="card-section" style="margin-bottom: 1.25rem;">
        <div class="section-label">⚡ Complete Conjugations & Forms</div>
        <div class="conjugations-list" style="gap: 0.5rem;">
          ${Object.entries(item.conjugations || {}).map(([k, v]) => `
            <div class="conjugation-item">
              <span class="conj-type" style="font-size: 0.88rem;">${this.formatKey(k)}</span>
              <span class="conj-val" style="font-size: 0.92rem;">${this.escapeHtml(v)}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="meta-box" style="margin-bottom: 1rem;">
        <div class="meta-title">🪐 Fictitious Etymology & Origins</div>
        <div class="meta-content" style="line-height: 1.5;">${this.escapeHtml(item.etymology)}</div>
      </div>

      <div class="meta-box" style="margin-bottom: 1rem;">
        <div class="meta-title">📜 Archaeological Excavation Notes</div>
        <div class="meta-content" style="line-height: 1.5;">${this.escapeHtml(item.researchNotes)}</div>
      </div>

      <div style="margin-bottom: 1rem;">
        <div class="section-label" style="margin-bottom: 0.5rem;">💬 Attested Examples in Spacetime</div>
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${(item.examples || []).map(ex => `
            <div class="example-box">
              <div class="example-kpaxian">“${this.escapeHtml(ex.kpaxian)}”</div>
              <div class="example-english">— ${this.escapeHtml(ex.english)}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    this.detailModalBody.querySelector(".btn-speak")?.addEventListener("click", () => {
      this.speakWord(item.word);
    });

    this.wordDetailModal.classList.add("active");
  }

  /* Speech Synthesis for Pronunciation */
  setupSpeechSynthesis() {
    this.hasSpeech = "speechSynthesis" in window;
  }

  speakWord(word) {
    if (!this.hasSpeech) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.85;
      utterance.pitch = 1.1; // Slightly cute and inquisitive pitch
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis unavailable", e);
    }
  }

  /* Theme Modal Setup */
  setupThemeModal() {
    this.btnOpenThemeModal.addEventListener("click", () => {
      this.renderThemeOptions();
      this.themeModal.classList.add("active");
    });

    this.btnCloseThemeModal.addEventListener("click", () => {
      this.themeModal.classList.remove("active");
    });

    this.btnDetailClose.addEventListener("click", () => {
      this.wordDetailModal.classList.remove("active");
    });

    [this.themeModal, this.wordDetailModal].forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
      });
    });

    this.lockToggle.addEventListener("change", (e) => {
      this.themeManager.toggleLock();
      this.renderThemeOptions();
    });
  }

  renderThemeOptions() {
    const state = this.themeManager.getCurrentState();
    this.lockToggle.checked = state.isLocked;

    this.themeOptionsContainer.innerHTML = THEMES.map(theme => `
      <div class="theme-card-option ${theme.id === state.theme ? 'selected' : ''}" data-theme="${theme.id}">
        <span class="theme-opt-icon">${theme.icon}</span>
        <span class="theme-opt-name">${theme.name}</span>
        <span class="theme-opt-desc">${theme.description}</span>
      </div>
    `).join("");

    this.themeOptionsContainer.querySelectorAll(".theme-card-option").forEach(card => {
      card.addEventListener("click", () => {
        const themeId = card.getAttribute("data-theme");
        // Selecting a theme locks it automatically
        this.themeManager.setTheme(themeId, true);
        this.renderThemeOptions();
      });
    });
  }

  updateThemeUI(state) {
    if (this.themePillLabel) this.themePillLabel.textContent = state.info.name;
    if (this.themePillIcon) this.themePillIcon.textContent = state.info.icon;
    if (this.themeLockIndicator) {
      this.themeLockIndicator.textContent = state.isLocked ? "🔒 Fixed" : "🎲 Auto-Rotate";
    }
    if (this.lockToggle) {
      this.lockToggle.checked = state.isLocked;
    }
  }

  /* PWA Setup */
  setupPWA() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(err => {
          console.warn("ServiceWorker registration failed: ", err);
        });
      });
    }

    let deferredPrompt;
    const banner = document.getElementById("pwaInstallBanner");
    const installBtn = document.getElementById("btnInstallApp");

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
          banner.classList.remove("visible");
        }
        deferredPrompt = null;
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

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.kpaxApp = new KpaxianDictionaryApp();
});
