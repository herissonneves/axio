/**
 * App Module Tests
 *
 * Tests application configuration modules:
 * - app-theme.js: Theme and contrast management
 * - app-filters.js: Filter management
 * - app-config.js: Constants and configuration
 */

import {
  DEFAULT_THEME,
  CONTRAST_DEFAULT,
  THEME_STORAGE_KEY,
  CONTRAST_STORAGE_KEY,
  VALID_CONTRASTS,
  FILTER_MAP,
  THEME_MAP,
} from "../../js/modules/app/app-config.js";

import {
  getCurrentTheme,
  getCurrentContrast,
  applyTheme,
  loadThemePreferences,
  toggleTheme,
  setContrast,
  toggleContrast,
} from "../../js/modules/app/app-theme.js";

import {
  getCurrentFilter,
  setCurrentFilter,
} from "../../js/modules/app/app-filters.js";

/**
 * Registers all app module tests
 * @param {TestRunner} runner - Test runner instance
 */
export function runAppTests(runner) {
  runner.category("App Module Tests");

  // ============================================================================
  // app-config.js TESTS
  // ============================================================================

  runner.test("app-config: DEFAULT_THEME is 'light'", () => {
    runner.assertEquals(DEFAULT_THEME, "light");
  });

  runner.test("app-config: CONTRAST_DEFAULT is 'default'", () => {
    runner.assertEquals(CONTRAST_DEFAULT, "default");
  });

  runner.test("app-config: VALID_CONTRASTS contains all levels", () => {
    runner.assertTrue(VALID_CONTRASTS.includes("default"));
    runner.assertTrue(VALID_CONTRASTS.includes("medium"));
    runner.assertTrue(VALID_CONTRASTS.includes("high"));
    runner.assertEquals(VALID_CONTRASTS.length, 3);
  });

  runner.test("app-config: FILTER_MAP maps IDs to values", () => {
    runner.assertEquals(FILTER_MAP["filter-all"], "all");
    runner.assertEquals(FILTER_MAP["filter-active"], "active");
    runner.assertEquals(FILTER_MAP["filter-completed"], "completed");
  });

  runner.test("app-config: THEME_MAP contains all combinations", () => {
    // Light theme
    runner.assertEquals(THEME_MAP.light.default, "light");
    runner.assertEquals(THEME_MAP.light.medium, "light-medium-contrast");
    runner.assertEquals(THEME_MAP.light.high, "light-high-contrast");

    // Dark theme
    runner.assertEquals(THEME_MAP.dark.default, "dark");
    runner.assertEquals(THEME_MAP.dark.medium, "dark-medium-contrast");
    runner.assertEquals(THEME_MAP.dark.high, "dark-high-contrast");
  });

  // ============================================================================
  // app-theme.js TESTS
  // ============================================================================

  runner.test("app-theme: getCurrentTheme returns current theme", () => {
    const theme = getCurrentTheme();
    runner.assertTrue(theme === "light" || theme === "dark");
  });

  runner.test("app-theme: getCurrentContrast returns current contrast", () => {
    const contrast = getCurrentContrast();
    runner.assertTrue(VALID_CONTRASTS.includes(contrast));
  });

  runner.test("app-theme: applyTheme sets data-theme on document", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true); // Skip in non-browser environment
      return;
    }

    applyTheme("dark", "default");
    runner.assertEquals(document.documentElement.dataset.theme, "dark");

    applyTheme("light", "medium");
    runner.assertEquals(document.documentElement.dataset.theme, "light-medium-contrast");

    applyTheme("dark", "high");
    runner.assertEquals(document.documentElement.dataset.theme, "dark-high-contrast");
  });

  runner.test("app-theme: setContrast validates contrast before applying", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Create mock buttons
    const buttons = [];
    const result1 = setContrast(buttons, "invalid");
    runner.assertFalse(result1);

    const result2 = setContrast(buttons, "medium");
    runner.assertTrue(result2);

    const result3 = setContrast(buttons, "high");
    runner.assertTrue(result3);
  });

  runner.test("app-theme: toggleContrast cycles through levels", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const buttons = [];

    // Should cycle: default -> medium -> high -> default
    setContrast(buttons, "default");
    let next = toggleContrast(buttons);
    runner.assertEquals(next, "medium");

    next = toggleContrast(buttons);
    runner.assertEquals(next, "high");

    next = toggleContrast(buttons);
    runner.assertEquals(next, "default");
  });

  runner.test("app-theme: loadThemePreferences loads from localStorage", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Save preferences
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    localStorage.setItem(CONTRAST_STORAGE_KEY, "high");

    // Load
    const result = loadThemePreferences(null, []);

    runner.assertEquals(result.theme, "dark");
    runner.assertEquals(result.contrast, "high");

    // Cleanup
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(CONTRAST_STORAGE_KEY);
  });

  runner.test("app-theme: loadThemePreferences uses defaults when no data exists", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Ensure no data exists
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(CONTRAST_STORAGE_KEY);

    const result = loadThemePreferences(null, []);

    runner.assertEquals(result.theme, DEFAULT_THEME);
    runner.assertEquals(result.contrast, CONTRAST_DEFAULT);
  });

  // ============================================================================
  // app-filters.js TESTS
  // ============================================================================

  runner.test("app-filters: getCurrentFilter returns current filter", () => {
    const filter = getCurrentFilter();
    runner.assertTrue(
      filter === "all" || filter === "active" || filter === "completed"
    );
  });

  runner.test("app-filters: setCurrentFilter sets current filter", () => {
    setCurrentFilter("active");
    runner.assertEquals(getCurrentFilter(), "active");

    setCurrentFilter("completed");
    runner.assertEquals(getCurrentFilter(), "completed");

    setCurrentFilter("all");
    runner.assertEquals(getCurrentFilter(), "all");
  });

  runner.test("app-filters: filter persists between calls", () => {
    setCurrentFilter("completed");
    runner.assertEquals(getCurrentFilter(), "completed");

    // Verify persistence
    runner.assertEquals(getCurrentFilter(), "completed");

    // Reset to all
    setCurrentFilter("all");
  });

  // ============================================================================
  // app/* INTEGRATION TESTS
  // ============================================================================

  runner.test("app: theme and contrast work together", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Apply light + medium
    applyTheme("light", "medium");
    runner.assertEquals(document.documentElement.dataset.theme, "light-medium-contrast");

    // Apply dark + high
    applyTheme("dark", "high");
    runner.assertEquals(document.documentElement.dataset.theme, "dark-high-contrast");

    // Apply light + default
    applyTheme("light", "default");
    runner.assertEquals(document.documentElement.dataset.theme, "light");
  });

  runner.test("app: settings persist in localStorage", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const buttons = [];

    // Set theme and contrast
    const mockToggle = { classList: { toggle: () => {}, add: () => {}, remove: () => {} }, setAttribute: () => {} };
    toggleTheme(mockToggle);
    setContrast(buttons, "medium");

    // Verify localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const savedContrast = localStorage.getItem(CONTRAST_STORAGE_KEY);

    runner.assertTrue(savedTheme === "light" || savedTheme === "dark");
    runner.assertEquals(savedContrast, "medium");

    // Cleanup
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(CONTRAST_STORAGE_KEY);
  });
}
