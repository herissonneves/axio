/**
 * Main Application Module - Entry Point
 *
 * Re-exports all functionality from specialized modules.
 * Modular structure for better organization and maintainability.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

export {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  FILTER_MAP,
  SVG_NS,
  THEME_MAP,
} from "./app-config.js";

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

export {
  getCurrentTheme,
  applyTheme,
  updateThemeToggle,
  loadThemePreferences,
  toggleTheme,
} from "./app-theme.js";

// ============================================================================
// FILTER MANAGEMENT
// ============================================================================

export {
  getCurrentFilter,
  setCurrentFilter,
  createFilterIcon,
  setActiveFilter,
  handleFilterClick,
  applyFilter,
} from "./app-filters.js";

// ============================================================================
// LANGUAGE MANAGEMENT
// ============================================================================

export {
  updateTexts,
  closeLanguageMenu,
  createLanguageMenu,
  toggleLanguage,
} from "./app-i18n.js";
