/**
 * App Module Tests
 *
 * Tests application configuration modules:
 * - app-theme.js: Theme management
 * - app-filters.js: Filter management
 * - app-config.js: Constants and configuration
 */

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  FILTER_MAP,
  THEME_MAP,
} from "../../js/modules/app/app-config.js";

import {
  getCurrentTheme,
  applyTheme,
  loadThemePreferences,
  toggleTheme,
} from "../../js/modules/app/app-theme.js";

import {
  getCurrentFilter,
  setCurrentFilter,
} from "../../js/modules/app/app-filters.js";

const createMockToggle = () => ({
  classList: {
    toggle: () => {},
    add: () => {},
    remove: () => {},
  },
  setAttribute: () => {},
});

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

  runner.test("app-config: FILTER_MAP maps IDs to values", () => {
    runner.assertEquals(FILTER_MAP["filter-all"], "all");
    runner.assertEquals(FILTER_MAP["filter-active"], "active");
    runner.assertEquals(FILTER_MAP["filter-completed"], "completed");
  });

  runner.test("app-config: THEME_MAP maps light and dark themes", () => {
    runner.assertEquals(THEME_MAP.light, "light");
    runner.assertEquals(THEME_MAP.dark, "dark");
  });

  // ============================================================================
  // app-theme.js TESTS
  // ============================================================================

  runner.test("app-theme: getCurrentTheme returns current theme", () => {
    const theme = getCurrentTheme();
    runner.assertTrue(theme === "light" || theme === "dark");
  });

  runner.test("app-theme: applyTheme sets data-theme on document", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    applyTheme("dark");
    runner.assertEquals(document.documentElement.dataset.theme, "dark");

    applyTheme("light");
    runner.assertEquals(document.documentElement.dataset.theme, "light");
  });

  runner.test("app-theme: loadThemePreferences loads from localStorage", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    const theme = loadThemePreferences(createMockToggle());

    runner.assertEquals(theme, "dark");
    runner.assertEquals(getCurrentTheme(), "dark");
    runner.assertEquals(document.documentElement.dataset.theme, "dark");

    localStorage.removeItem(THEME_STORAGE_KEY);
  });

  runner.test("app-theme: loadThemePreferences uses default when no data exists", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    localStorage.removeItem(THEME_STORAGE_KEY);

    const theme = loadThemePreferences(createMockToggle());

    runner.assertEquals(theme, DEFAULT_THEME);
    runner.assertEquals(getCurrentTheme(), DEFAULT_THEME);
  });

  runner.test("app-theme: toggleTheme switches theme and persists", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const mockToggle = createMockToggle();
    loadThemePreferences(mockToggle);

    const nextTheme = toggleTheme(mockToggle);

    runner.assertTrue(nextTheme === "light" || nextTheme === "dark");
    runner.assertEquals(getCurrentTheme(), nextTheme);
    runner.assertEquals(localStorage.getItem(THEME_STORAGE_KEY), nextTheme);
    runner.assertEquals(document.documentElement.dataset.theme, nextTheme);

    localStorage.removeItem(THEME_STORAGE_KEY);
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
    runner.assertEquals(getCurrentFilter(), "completed");
    setCurrentFilter("all");
  });

  // ============================================================================
  // app/* INTEGRATION TESTS
  // ============================================================================

  runner.test("app: theme applies correct data-theme values", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    applyTheme("light");
    runner.assertEquals(document.documentElement.dataset.theme, "light");

    applyTheme("dark");
    runner.assertEquals(document.documentElement.dataset.theme, "dark");
  });
}
