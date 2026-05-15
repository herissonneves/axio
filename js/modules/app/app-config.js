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
 * Default contrast level
 * @constant {string}
 */
export const CONTRAST_DEFAULT = "default";

/**
 * localStorage key for theme
 * @constant {string}
 */
export const THEME_STORAGE_KEY = "todo-theme";

/**
 * localStorage key for contrast
 * @constant {string}
 */
export const CONTRAST_STORAGE_KEY = "todo-contrast";

/**
 * List of valid contrast levels
 * @constant {Array<string>}
 */
export const VALID_CONTRASTS = [CONTRAST_DEFAULT, "medium", "high"];

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

/**
 * Map of theme/contrast combinations to CSS classes
 * @constant {Object.<string, Object.<string, string>>}
 */
export const THEME_MAP = {
  light: {
    [CONTRAST_DEFAULT]: "light",
    medium: "light-medium-contrast",
    high: "light-high-contrast",
  },
  dark: {
    [CONTRAST_DEFAULT]: "dark",
    medium: "dark-medium-contrast",
    high: "dark-high-contrast",
  },
};
