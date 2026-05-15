/**
 * Theme and Contrast Management
 *
 * Manages application and persistence of themes and contrast levels.
 */

import {
  DEFAULT_THEME,
  CONTRAST_DEFAULT,
  THEME_STORAGE_KEY,
  CONTRAST_STORAGE_KEY,
  VALID_CONTRASTS,
  THEME_MAP,
} from "./app-config.js";

/**
 * Current theme state
 * @private
 */
let currentTheme = DEFAULT_THEME;

/**
 * Current contrast state
 * @private
 */
let currentContrast = CONTRAST_DEFAULT;

/**
 * Gets the current theme
 * @returns {string} Current theme (light or dark)
 */
export const getCurrentTheme = () => currentTheme;

/**
 * Gets the current contrast
 * @returns {string} Current contrast (default, medium, or high)
 */
export const getCurrentContrast = () => currentContrast;

/**
 * Applies the selected theme and contrast to the document
 * @param {string} theme - Theme (light or dark)
 * @param {string} contrast - Contrast level (default, medium, or high)
 */
export const applyTheme = (theme, contrast) => {
  const resolvedTheme =
    THEME_MAP[theme]?.[contrast] ?? THEME_MAP[DEFAULT_THEME][CONTRAST_DEFAULT];
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
 * Updates the visual state of contrast selector buttons
 * @param {NodeList} contrastButtons - List of contrast buttons
 * @param {string} contrast - Current contrast level
 */
export const updateContrastButtons = (contrastButtons, contrast) => {
  contrastButtons.forEach((btn) => {
    const value = btn.dataset.contrast;
    const isActive = value === contrast;
    btn.classList.toggle("contrast-selector__btn--active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
};

/**
 * Loads theme and contrast preferences from localStorage
 * @param {HTMLElement} themeToggle - Theme button element
 * @param {NodeList} contrastButtons - List of contrast buttons
 * @returns {Object} Object with loaded theme and contrast
 */
export const loadThemePreferences = (themeToggle, contrastButtons) => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const storedContrast = localStorage.getItem(CONTRAST_STORAGE_KEY);

  const initialTheme = storedTheme === "dark" ? "dark" : DEFAULT_THEME;
  const initialContrast = VALID_CONTRASTS.includes(storedContrast)
    ? storedContrast
    : CONTRAST_DEFAULT;

  currentTheme = initialTheme;
  currentContrast = initialContrast;

  updateThemeToggle(themeToggle, initialTheme);
  updateContrastButtons(contrastButtons, initialContrast);
  applyTheme(initialTheme, initialContrast);

  return { theme: initialTheme, contrast: initialContrast };
};

/**
 * Toggles between themes (light <-> dark)
 * @param {HTMLElement} themeToggle - Theme button element
 * @returns {string} Newly applied theme
 */
export const toggleTheme = (themeToggle) => {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = nextTheme;

  console.log(`[Theme] Switching from ${currentTheme === "dark" ? "light" : "dark"} to ${nextTheme}`);

  updateThemeToggle(themeToggle, nextTheme);
  applyTheme(nextTheme, currentContrast);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

  console.log(`[Theme] data-theme="${document.documentElement.dataset.theme}"`);

  return nextTheme;
};

/**
 * Sets a new contrast level
 * @param {NodeList} contrastButtons - List of contrast buttons
 * @param {string} contrast - New contrast level
 * @returns {boolean} true if contrast was applied, false otherwise
 */
export const setContrast = (contrastButtons, contrast) => {
  if (!VALID_CONTRASTS.includes(contrast)) return false;

  console.log(`[Contrast] Switching to: ${contrast}`);

  currentContrast = contrast;
  updateContrastButtons(contrastButtons, contrast);
  applyTheme(currentTheme, contrast);
  localStorage.setItem(CONTRAST_STORAGE_KEY, contrast);

  console.log(`[Contrast] data-theme="${document.documentElement.dataset.theme}"`);

  return true;
};

/**
 * Cycles contrast levels (default -> medium -> high -> default)
 * @param {NodeList} contrastButtons - List of contrast buttons
 * @returns {string} Newly applied contrast
 */
export const toggleContrast = (contrastButtons) => {
  const contrastOrder = [CONTRAST_DEFAULT, "medium", "high"];
  const currentIndex = contrastOrder.indexOf(currentContrast);
  const nextIndex = (currentIndex + 1) % contrastOrder.length;
  const nextContrast = contrastOrder[nextIndex];

  setContrast(contrastButtons, nextContrast);

  return nextContrast;
};
