/**
 * Internationalization (i18n) System - Entry Point
 *
 * Modular module for managing translations and languages.
 *
 * Structure:
 * - i18n-config.js: Configuration and constants
 * - i18n-translations.js: All translations
 * - i18n-storage.js: localStorage persistence
 * - i18n-detector.js: Browser language detection
 * - i18n-utils.js: Pure utility functions
 * - i18n-core.js: Main logic and public API
 *
 * @module i18n
 */

// ============================================================================
// MAIN EXPORTS (Public API)
// ============================================================================

export {
  getLanguage,
  setLanguage,
  loadLanguage,
  t,
  getAvailableLanguages,
  hasTranslation,
  getAllTranslations,
  initI18n,
} from "./i18n-core.js";

// ============================================================================
// CONFIGURATION EXPORTS
// ============================================================================

export {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
} from "./i18n-config.js";

// ============================================================================
// UTILITY EXPORTS (for tests and advanced use)
// ============================================================================

export {
  replacePlaceholders,
  hasPlaceholders,
  extractPlaceholders,
  validatePlaceholders,
  normalizeLanguageCode,
} from "./i18n-utils.js";

export {
  detectLanguage,
  getBrowserLanguage,
  extractBaseLanguage,
  isLanguageSupported,
} from "./i18n-detector.js";

export {
  saveLanguagePreference,
  loadLanguagePreference,
  clearLanguagePreference,
} from "./i18n-storage.js";

// ============================================================================
// TRANSLATION EXPORTS (for special cases)
// ============================================================================

export { TRANSLATIONS } from "./i18n-translations.js";
