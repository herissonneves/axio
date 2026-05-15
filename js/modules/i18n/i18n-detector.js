/**
 * Language Detection Module
 *
 * Detects the user's preferred browser language.
 * Pure functions for analyzing language preferences.
 */

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./i18n-config.js";

/**
 * Gets the browser language code
 *
 * @returns {string} Browser language code (e.g. 'pt-BR', 'en-US')
 *
 * @example
 * getBrowserLanguage(); // 'pt-BR'
 */
export const getBrowserLanguage = () => {
  return navigator.language || navigator.userLanguage || "";
};

/**
 * Extracts the base language code from a full code
 *
 * @param {string} languageCode - Full code (e.g. 'pt-BR', 'en-US')
 * @returns {string} Base language code (e.g. 'pt', 'en')
 *
 * @example
 * extractBaseLanguage('pt-BR'); // 'pt'
 * extractBaseLanguage('en-US'); // 'en'
 * extractBaseLanguage('pt'); // 'pt'
 */
export const extractBaseLanguage = (languageCode) => {
  if (!languageCode) return "";
  return languageCode.split("-")[0].toLowerCase();
};

/**
 * Checks whether a language is supported by the application
 *
 * @param {string} language - Language code to check
 * @returns {boolean} true if the language is supported, false otherwise
 *
 * @example
 * isLanguageSupported('pt'); // true
 * isLanguageSupported('fr'); // false
 */
export const isLanguageSupported = (language) => {
  return SUPPORTED_LANGUAGES.includes(language);
};

/**
 * Automatically detects the best language based on the browser
 *
 * Checks the browser language and returns a supported language.
 * If the browser language is not supported, returns the default language.
 *
 * @returns {string} Detected language code
 *
 * @example
 * // Browser in Portuguese
 * detectLanguage(); // 'pt'
 *
 * // Browser in French (not supported)
 * detectLanguage(); // 'pt' (default)
 */
export const detectLanguage = () => {
  const browserLang = getBrowserLanguage();
  const baseLang = extractBaseLanguage(browserLang);

  if (isLanguageSupported(baseLang)) {
    return baseLang;
  }

  return DEFAULT_LANGUAGE;
};
