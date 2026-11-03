/**
 * K-PAXian Dictionary - Theme Manager
 * Supports 4 planetary visual spectrums:
 * - Cute Pastel Pink (Default Fallback)
 * - Cappuccino Mocha
 * - Dracula
 * - Cyberpunkish
 * 
 * Theme selection is strictly decoupled from the Auto-Rotate toggle:
 * - Theme Selector: Sets the current active planetary spectrum.
 * - Auto-Rotate: When enabled (default: true for new visitors), automatically rolls a
 *   random theme upon new orbital visits/sessions. When disabled, locks to the selected theme.
 */

const THEMES = [
  {
    id: "pastel-pink",
    name: "Cute Pastel Pink",
    icon: "🌸",
    description: "Gentle strawberry milk, soft blush, and playful warmth",
    color: "#ffd1dc"
  },
  {
    id: "mocha",
    name: "Cappuccino Mocha",
    icon: "☕",
    description: "Velvety espresso, toasted almond, and cozy study tones",
    color: "#3b2f2f"
  },
  {
    id: "dracula",
    name: "Dracula",
    icon: "🧛",
    description: "Vampiric dark purple, glowing cyan, and midnight atmosphere",
    color: "#282a36"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunkish",
    icon: "⚡",
    description: "High-voltage neon yellow, cyan circuitry, and deep obsidian",
    color: "#0b0c10"
  }
];

const STORAGE_KEY_THEME = "kpax_theme_preference";
const STORAGE_KEY_AUTOROTATE = "kpax_theme_autorotate";

class ThemeManager {
  constructor(onThemeChangeCallback = null) {
    this.currentTheme = "pastel-pink";
    this.autoRotate = false;
    this.init();
    this.onThemeChange = onThemeChangeCallback;
  }

  init() {
    try {
      const storedAutoRotate = localStorage.getItem(STORAGE_KEY_AUTOROTATE);
      const storedTheme = localStorage.getItem(STORAGE_KEY_THEME);

      // Default autoRotate to true only if never explicitly set by user
      if (storedAutoRotate === null) {
        this.autoRotate = true;
      } else {
        this.autoRotate = storedAutoRotate === "true";
      }

      if (this.autoRotate) {
        // Roll random theme on fresh session
        const randomIndex = Math.floor(Math.random() * THEMES.length);
        this.currentTheme = THEMES[randomIndex].id;
      } else if (storedTheme && THEMES.some(t => t.id === storedTheme)) {
        this.currentTheme = storedTheme;
      } else {
        this.currentTheme = "pastel-pink";
      }
    } catch (e) {
      this.currentTheme = "pastel-pink";
      this.autoRotate = false;
    }

    this.applyTheme(this.currentTheme);
  }

  applyTheme(themeId) {
    if (!THEMES.some(t => t.id === themeId)) {
      themeId = "pastel-pink";
    }
    this.currentTheme = themeId;
    document.documentElement.setAttribute("data-theme", themeId);

    // Save active theme preference without modifying autoRotate setting
    try {
      localStorage.setItem(STORAGE_KEY_THEME, this.currentTheme);
    } catch (e) {
      console.warn("Could not persist theme to localStorage", e);
    }

    // Update meta theme-color tag for PWA / iOS mobile chrome
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const themeObj = THEMES.find(t => t.id === themeId);
      themeColorMeta.setAttribute("content", themeObj ? themeObj.color : "#ffd1dc");
    }

    if (this.onThemeChange) {
      this.onThemeChange(this.getCurrentState());
    }
  }

  setTheme(themeId) {
    // Only sets theme; does NOT touch autoRotate toggle!
    this.applyTheme(themeId);
  }

  setAutoRotate(enabled) {
    this.autoRotate = Boolean(enabled);
    try {
      localStorage.setItem(STORAGE_KEY_AUTOROTATE, String(this.autoRotate));
    } catch (e) {
      console.warn("Could not save auto-rotate state", e);
    }
    if (this.onThemeChange) {
      this.onThemeChange(this.getCurrentState());
    }
    return this.autoRotate;
  }

  toggleAutoRotate() {
    return this.setAutoRotate(!this.autoRotate);
  }

  rotateRandom() {
    const available = THEMES.filter(t => t.id !== this.currentTheme);
    const next = available[Math.floor(Math.random() * available.length)];
    this.setTheme(next.id);
  }

  getAvailableThemes() {
    return THEMES;
  }

  getCurrentState() {
    const info = THEMES.find(t => t.id === this.currentTheme) || THEMES[0];
    return {
      theme: this.currentTheme,
      autoRotate: this.autoRotate,
      info
    };
  }
}

// Universal environment support
if (typeof window !== "undefined") {
  window.THEMES = THEMES;
  window.ThemeManager = ThemeManager;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { THEMES, ThemeManager };
}
