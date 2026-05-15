/**
 * Application Configuration
 *
 * Defines all global constants and application settings.
 */

/**
 * Default application theme
 * @constant {string}
 */
export const DEFAULT_THEME = "light";

/**
 * localStorage key for theme
 * @constant {string}
 */
export const THEME_STORAGE_KEY = "todo-theme";

/**
 * Mapping of theme names to data-theme attribute values
 * @constant {Object.<string, string>}
 */
export const THEME_MAP = {
  light: "light",
  dark: "dark",
};

/**
 * Mapping of filter IDs to filter values
 * @constant {Object.<string, string>}
 */
export const FILTER_MAP = {
  "filter-all": "all",
  "filter-active": "active",
  "filter-completed": "completed",
};

/**
 * SVG namespace for creating SVG elements
 * @constant {string}
 */
export const SVG_NS = "http://www.w3.org/2000/svg";
