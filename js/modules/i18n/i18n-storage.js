/**
 * i18n Persistence Module
 *
 * Manages language preference persistence in localStorage.
 * Pure functions that interact with localStorage to save and retrieve
 * the user's language preference.
 */

import { STORAGE_KEY } from "./i18n-config.js";

/**
 * Saves the language preference to localStorage
 *
 * @param {string} language - Language code to save (e.g. 'pt', 'en')
 * @returns {boolean} true if saved successfully, false on error
 *
 * @example
 * saveLanguagePreference('en'); // true
 */
export const saveLanguagePreference = (language) => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
    return true;
  } catch (error) {
    console.error("Failed to save language preference:", error);
    return false;
  }
};

/**
 * Retrieves the language preference from localStorage
 *
 * @returns {string|null} Saved language code or null if none
 *
 * @example
 * const lang = loadLanguagePreference(); // 'pt' or null
 */
export const loadLanguagePreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to load language preference:", error);
    return null;
  }
};

/**
 * Removes the language preference from localStorage
 *
 * @returns {boolean} true if removed successfully, false on error
 *
 * @example
 * clearLanguagePreference(); // true
 */
export const clearLanguagePreference = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear language preference:", error);
    return false;
  }
};
