/**
 * Internationalization System Configuration
 *
 * Defines base constants and settings for the i18n system:
 * - localStorage storage key
 * - Default application language
 * - Supported languages
 */

/**
 * Key used to store language preference in localStorage
 * @constant {string}
 */
export const STORAGE_KEY = "todo-language";

/**
 * Default application language code
 * @constant {string}
 */
export const DEFAULT_LANGUAGE = "pt";

/**
 * List of languages supported by the application
 * @constant {Array<string>}
 */
export const SUPPORTED_LANGUAGES = ["pt", "en"];

/**
 * Regex pattern to identify placeholders in translations
 * Format: {placeholderName}
 * @constant {RegExp}
 */
export const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;
