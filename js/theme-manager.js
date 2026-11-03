/**
 * K-PAXian Dictionary - Theme Manager
 * Exo-Linguistic Archaeological Database • Sector 4
 * Professional Minimalist Spectrum Profiles (Zero Emojis)
 */

const THEMES = [
  {
    id: "pastel-pink",
    name: "Pastel Pink",
    code: "ROSE",
    symbol: "◈",
    description: "Soft rose quartz, blush mineral tones, and clear contrast",
    color: "#ffd1dc"
  },
  {
    id: "mocha",
    name: "Cappuccino Mocha",
    code: "MOCHA",
    symbol: "◆",
    description: "Velvety espresso, toasted almond, and warm archive study tones",
    color: "#3b2f2f"
  },
  {
    id: "dracula",
    name: "Dracula Midnight",
    code: "GOTHIC",
    symbol: "◇",
    description: "Gothic obsidian purple, cyan luminescence, and deep canvas",
    color: "#282a36"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunkish",
    code: "NEON",
    symbol: "⟡",
    description: "High-contrast neon yellow, electric cyan, and deep space geometry",
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

      if (storedAutoRotate === null) {
        this.autoRotate = true;
      } else {
        this.autoRotate = storedAutoRotate === "true";
      }

      if (this.autoRotate) {
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

    try {
      localStorage.setItem(STORAGE_KEY_THEME, this.currentTheme);
    } catch (e) {
      console.warn("Could not persist theme to localStorage", e);
    }

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

if (typeof window !== "undefined") {
  window.THEMES = THEMES;
  window.ThemeManager = ThemeManager;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { THEMES, ThemeManager };
}
