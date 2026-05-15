/**
 * i18n Utilities
 *
 * Pure utility functions for translation processing.
 * Includes placeholder replacement, validation, and formatting.
 */

import { PLACEHOLDER_PATTERN } from "./i18n-config.js";

/**
 * Replaces placeholders in a string with provided values
 *
 * Finds placeholders in {name} format and replaces them with
 * corresponding values from the parameters object.
 *
 * @param {string} text - Text with placeholders
 * @param {Object.<string, any>} params - Object with replacement values
 * @returns {string} Text with placeholders replaced
 *
 * @example
 * replacePlaceholders("Hello {name}!", { name: "Maria" })
 * // Returns: "Hello Maria!"
 *
 * @example
 * replacePlaceholders("Delete {text}?", { text: "task" })
 * // Returns: "Delete task?"
 *
 * @example
 * // Missing placeholder keeps the original
 * replacePlaceholders("Hello {name}!", {})
 * // Returns: "Hello {name}!"
 */
export const replacePlaceholders = (text, params = {}) => {
  if (!text || typeof text !== "string") {
    return text;
  }

  if (!params || Object.keys(params).length === 0) {
    return text;
  }

  return text.replace(PLACEHOLDER_PATTERN, (match, paramKey) => {
    return params[paramKey] !== undefined ? params[paramKey] : match;
  });
};

/**
 * Checks whether a string contains placeholders
 *
 * @param {string} text - Text to check
 * @returns {boolean} true if it contains placeholders, false otherwise
 *
 * @example
 * hasPlaceholders("Hello {name}!"); // true
 * hasPlaceholders("Hello world!"); // false
 */
export const hasPlaceholders = (text) => {
  if (!text || typeof text !== "string") {
    return false;
  }
  return PLACEHOLDER_PATTERN.test(text);
};

/**
 * Extracts placeholder names from a string
 *
 * @param {string} text - Text with placeholders
 * @returns {Array<string>} Array of placeholder names found
 *
 * @example
 * extractPlaceholders("Hello {name}, you have {count} messages")
 * // Returns: ["name", "count"]
 *
 * @example
 * extractPlaceholders("No placeholders")
 * // Returns: []
 */
export const extractPlaceholders = (text) => {
  if (!text || typeof text !== "string") {
    return [];
  }

  const placeholders = [];
  const regex = new RegExp(PLACEHOLDER_PATTERN, "g");
  let match;

  while ((match = regex.exec(text)) !== null) {
    placeholders.push(match[1]);
  }

  return placeholders;
};

/**
 * Validates that all required placeholders were provided
 *
 * @param {string} text - Text with placeholders
 * @param {Object.<string, any>} params - Object with provided values
 * @returns {boolean} true if all placeholders have values, false otherwise
 *
 * @example
 * validatePlaceholders("Hello {name}!", { name: "Maria" }); // true
 * validatePlaceholders("Hello {name}!", {}); // false
 */
export const validatePlaceholders = (text, params = {}) => {
  const placeholders = extractPlaceholders(text);

  if (placeholders.length === 0) {
    return true;
  }

  return placeholders.every(placeholder => params[placeholder] !== undefined);
};

/**
 * Normalizes a language code to the standard format
 *
 * @param {string} language - Language code
 * @returns {string} Normalized code (lowercase, no spaces)
 *
 * @example
 * normalizeLanguageCode("PT"); // "pt"
 * normalizeLanguageCode(" en "); // "en"
 */
export const normalizeLanguageCode = (language) => {
  if (!language || typeof language !== "string") {
    return "";
  }
  return language.trim().toLowerCase();
};
