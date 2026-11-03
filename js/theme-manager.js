/**
 * K-PAXian Dictionary - Theme Manager
 * Supports:
 * - Cute Pastel Pink (Default)
 * - Cappuccino Mocha
 * - Dracula
 * - Cyberpunk
 * 
 * Auto-rotates randomly unless the user sets a fixed/locked theme in localStorage.
 */

export const THEMES = [
  {
    id: "pastel-pink",
    name: "Cute Pastel Pink",
    icon: "🌸",
    description: "Gentle strawberry milk, soft blush, and playful warmth"
  },
  {
    id: "mocha",
    name: "Cappuccino Mocha",
    icon: "☕",
    description: "Velvety espresso, toasted almond, and cozy study tones"
  },
  {
    id: "dracula",
    name: "Dracula",
    icon: "🧛",
    description: "Vampiric dark purple, glowing cyan, and midnight atmosphere"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunkish",
    icon: "⚡",
    description: "High-voltage neon yellow, cyan circuitry, and deep obsidian"
  }
];

const STORAGE_KEY_THEME = "kpax_theme_preference";
const STORAGE_KEY_LOCKED = "kpax_theme_locked";

export class ThemeManager {
  constructor(onThemeChangeCallback = null) {
    this.onThemeChange = onThemeChangeCallback;
    this.currentTheme = "pastel-pink";
    this.isLocked = false;
    this.init();
  }

  init() {
    try {
      const storedLocked = localStorage.getItem(STORAGE_KEY_LOCKED);
      const storedTheme = localStorage.getItem(STORAGE_KEY_THEME);

      this.isLocked = storedLocked === "true";

      if (this.isLocked && storedTheme && THEMES.some(t => t.id === storedTheme)) {
        this.currentTheme = storedTheme;
      } else {
        // Auto-rotate randomly on visit if not locked!
        const randomIndex = Math.floor(Math.random() * THEMES.length);
        this.currentTheme = THEMES[randomIndex].id;
        // Do not lock, but store current choice
        if (!this.isLocked) {
          localStorage.setItem(STORAGE_KEY_THEME, this.currentTheme);
        }
      }
    } catch (e) {
      // LocalStorage unavailable, fallback to default
      this.currentTheme = "pastel-pink";
      this.isLocked = false;
    }

    this.applyTheme(this.currentTheme);
  }

  applyTheme(themeId) {
    if (!THEMES.some(t => t.id === themeId)) {
      themeId = "pastel-pink";
    }
    this.currentTheme = themeId;
    document.documentElement.setAttribute("data-theme", themeId);
    
    // Update theme-color meta tag for PWA chrome
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const colors = {
        "pastel-pink": "#ffd1dc",
        "mocha": "#3b2f2f",
        "dracula": "#282a36",
        "cyberpunk": "#0b0c10"
      };
      themeColorMeta.setAttribute("content", colors[themeId] || "#ffd1dc");
    }

    if (this.onThemeChange) {
      this.onThemeChange({
        theme: themeId,
        isLocked: this.isLocked
      });
    }
  }

  setTheme(themeId, lock = true) {
    this.isLocked = lock;
    this.applyTheme(themeId);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, themeId);
      localStorage.setItem(STORAGE_KEY_LOCKED, String(this.isLocked));
    } catch (e) {
      console.warn("Could not save theme preference to localStorage", e);
    }
  }

  toggleLock() {
    this.isLocked = !this.isLocked;
    try {
      localStorage.setItem(STORAGE_KEY_LOCKED, String(this.isLocked));
      localStorage.setItem(STORAGE_KEY_THEME, this.currentTheme);
    } catch (e) {
      console.warn("Could not update lock state in localStorage", e);
    }
    if (this.onThemeChange) {
      this.onThemeChange({
        theme: this.currentTheme,
        isLocked: this.isLocked
      });
    }
    return this.isLocked;
  }

  rotateRandom() {
    const available = THEMES.filter(t => t.id !== this.currentTheme);
    const next = available[Math.floor(Math.random() * available.length)];
    this.applyTheme(next.id);
  }

  getAvailableThemes() {
    return THEMES;
  }

  getCurrentState() {
    return {
      theme: this.currentTheme,
      isLocked: this.isLocked,
      info: THEMES.find(t => t.id === this.currentTheme) || THEMES[0]
    };
  }
}
