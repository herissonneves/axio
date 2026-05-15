/**
 * Theme Management
 *
 * Manages application and persistence of light/dark themes.
 */

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEME_MAP,
} from "./app-config.js";

/**
 * Current theme state
 * @private
 */
let currentTheme = DEFAULT_THEME;

/**
 * Gets the current theme
 * @returns {string} Current theme (light or dark)
 */
export const getCurrentTheme = () => currentTheme;

/**
 * Applies the selected theme to the document
 * @param {string} theme - Theme (light or dark)
 */
export const applyTheme = (theme) => {
  const resolvedTheme = THEME_MAP[theme] ?? THEME_MAP[DEFAULT_THEME];
  document.documentElement.dataset.theme = resolvedTheme;
};

/**
 * Updates the visual state of the theme toggle button
 * @param {HTMLElement} themeToggle - Theme button element
 * @param {string} theme - Current theme (light or dark)
 */
export const updateThemeToggle = (themeToggle, theme) => {
  if (!themeToggle) return;

  const isDark = theme === "dark";
  themeToggle.classList.toggle("theme-toggle--dark", isDark);
  themeToggle.classList.toggle("theme-toggle--light", !isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

/**
 * Loads theme preferences from localStorage
 * @param {HTMLElement} themeToggle - Theme button element
 * @returns {string} Loaded theme
 */
export const loadThemePreferences = (themeToggle) => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const initialTheme = storedTheme === "dark" ? "dark" : DEFAULT_THEME;

  currentTheme = initialTheme;

  updateThemeToggle(themeToggle, initialTheme);
  applyTheme(initialTheme);

  return initialTheme;
};

/**
 * Toggles between themes (light <-> dark)
 * @param {HTMLElement} themeToggle - Theme button element
 * @returns {string} Newly applied theme
 */
export const toggleTheme = (themeToggle) => {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = nextTheme;

  updateThemeToggle(themeToggle, nextTheme);
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

  return nextTheme;
};
