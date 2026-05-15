/**
 * Main i18n Module
 *
 * Manages the current language state and provides the main translation API.
 * Integrates all other modules (storage, detector, utils, translations).
 */

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./i18n-config.js";
import { TRANSLATIONS } from "./i18n-translations.js";
import { saveLanguagePreference, loadLanguagePreference } from "./i18n-storage.js";
import { detectLanguage, isLanguageSupported } from "./i18n-detector.js";
import { replacePlaceholders, normalizeLanguageCode } from "./i18n-utils.js";

/**
 * Internal state - current application language
 * @private
 */
let currentLanguage = DEFAULT_LANGUAGE;

/**
 * Gets the current application language
 *
 * @returns {string} Current language code (e.g. 'pt', 'en')
 *
 * @example
 * const lang = getLanguage(); // 'pt'
 */
export const getLanguage = () => currentLanguage;

/**
 * Sets the application language and persists the preference
 *
 * Validates that the language is supported before applying.
 * Updates the HTML document lang attribute.
 * Saves the preference to localStorage.
 *
 * @param {string} lang - Language code (e.g. 'pt', 'en')
 * @returns {boolean} true if language was set successfully, false otherwise
 *
 * @example
 * setLanguage('en'); // true - switches to English
 * setLanguage('fr'); // false - language not supported
 */
export const setLanguage = (lang) => {
  const normalizedLang = normalizeLanguageCode(lang);

  if (!isLanguageSupported(normalizedLang)) {
    console.warn(`Language '${lang}' is not supported. Available languages: ${SUPPORTED_LANGUAGES.join(", ")}`);
    return false;
  }

  currentLanguage = normalizedLang;
  document.documentElement.lang = normalizedLang;
  saveLanguagePreference(normalizedLang);

  return true;
};

/**
 * Loads saved language or detects automatically
 *
 * Detection priority:
 * 1. Language saved in localStorage
 * 2. Browser language (if supported)
 * 3. Default language (pt)
 *
 * @returns {string} Loaded language code
 *
 * @example
 * const lang = loadLanguage(); // 'pt' or 'en'
 */
export const loadLanguage = () => {
  const stored = loadLanguagePreference();

  if (stored && isLanguageSupported(stored)) {
    currentLanguage = stored;
  } else {
    currentLanguage = detectLanguage();
  }

  document.documentElement.lang = currentLanguage;
  return currentLanguage;
};

/**
 * Gets the translation for a specific key
 *
 * Looks up the translation in the current language. If not found, uses the default language.
 * If still not found, returns the key itself.
 * Supports dynamic placeholders in {name} format.
 *
 * @param {string} key - Translation key
 * @param {Object.<string, any>} params - Parameters to replace placeholders
 * @returns {string} Translated text
 *
 * @example
 * t('addTaskButton'); // 'Add Task' (when language is en)
 *
 * @example
 * t('deleteTaskConfirm', { text: 'Buy milk' })
 * // 'Are you sure you want to delete "Buy milk"?...'
 *
 * @example
 * t('missingKey'); // 'missingKey' (returns the key)
 */
export const t = (key, params = {}) => {
  // Look up in current language
  let translation = TRANSLATIONS[currentLanguage]?.[key];

  // Fallback to default language
  if (translation === undefined) {
    translation = TRANSLATIONS[DEFAULT_LANGUAGE]?.[key];
  }

  // Fallback to the key itself
  if (translation === undefined) {
    console.warn(`Translation not found for key '${key}' in languages '${currentLanguage}' and '${DEFAULT_LANGUAGE}'`);
    return key;
  }

  // Replace placeholders if parameters are provided
  if (params && Object.keys(params).length > 0) {
    return replacePlaceholders(translation, params);
  }

  return translation;
};

/**
 * Gets all languages available in the application
 *
 * @returns {Array<string>} Array of available language codes
 *
 * @example
 * const languages = getAvailableLanguages(); // ['pt', 'en']
 */
export const getAvailableLanguages = () => {
  return [...SUPPORTED_LANGUAGES];
};

/**
 * Checks whether a translation key exists
 *
 * @param {string} key - Key to check
 * @param {string} [lang] - Specific language (optional, uses current if omitted)
 * @returns {boolean} true if the key exists, false otherwise
 *
 * @example
 * hasTranslation('addTaskButton'); // true
 * hasTranslation('missingKey'); // false
 * hasTranslation('addTaskButton', 'en'); // true
 */
export const hasTranslation = (key, lang) => {
  const language = lang || currentLanguage;
  return TRANSLATIONS[language]?.[key] !== undefined;
};

/**
 * Gets all translations for a specific language
 *
 * @param {string} [lang] - Language code (optional, uses current if omitted)
 * @returns {Object.<string, string>|null} Object with all translations or null if language is invalid
 *
 * @example
 * const translations = getAllTranslations('en');
 * // { pageTitle: 'Axio', addTaskButton: 'Add Task', ... }
 */
export const getAllTranslations = (lang) => {
  const language = lang || currentLanguage;

  if (!isLanguageSupported(language)) {
    return null;
  }

  return { ...TRANSLATIONS[language] };
};

/**
 * Initializes the internationalization system
 *
 * Loads saved language or detects automatically.
 * Should be called at application startup.
 *
 * @returns {string} Initialized language code
 *
 * @example
 * initI18n(); // 'pt'
 */
export const initI18n = () => {
  return loadLanguage();
};
