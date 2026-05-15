/**
 * Keyboard Shortcuts Configuration and Constants
 *
 * Defines all centralized settings for keyboard shortcuts:
 * - Key-to-handler mapping
 * - HTML tags that block shortcuts
 * - System constants
 */

/**
 * Keyboard shortcut configuration
 * Each shortcut defines the key, modifiers, and handler key
 *
 * @typedef {Object} ShortcutConfig
 * @property {string} key - Shortcut key (e.g. "k", "1", "F1")
 * @property {boolean} [modifier] - Whether Ctrl/Cmd is required
 * @property {boolean} [shift] - Whether Shift is required
 * @property {string} handler - Handler function name to execute
 */

/**
 * Complete keyboard shortcut mapping
 * @type {Object.<string, ShortcutConfig>}
 */
export const KEYBOARD_SHORTCUTS = {
  // Navigation
  FOCUS_INPUT: { key: "k", modifier: true, handler: "focusInput" },
  FOCUS_INPUT_ALT: { key: "/", modifier: false, handler: "focusInput" },

  // Appearance
  TOGGLE_THEME: { key: "g", modifier: true, handler: "toggleTheme" },
  TOGGLE_LANGUAGE: { key: "l", modifier: true, handler: "toggleLanguage" },

  // Filters
  FILTER_ALL: { key: "1", modifier: false, handler: "setFilterAll" },
  FILTER_ACTIVE: { key: "2", modifier: false, handler: "setFilterActive" },
  FILTER_COMPLETED: { key: "3", modifier: false, handler: "setFilterCompleted" },

  // Actions
  CLEAR_COMPLETED: { key: "delete", modifier: true, shift: false, handler: "clearCompleted" },
  CLEAR_ALL: { key: "delete", modifier: true, shift: true, handler: "clearAll" },

  // Help
  SHOW_HELP: { key: "?", modifier: true, handler: "showHelp" },
  SHOW_HELP_ALT: { key: "F1", modifier: false, handler: "showHelp" },
};

/**
 * HTML tags that should block keyboard shortcuts when focused
 * @type {string[]}
 */
export const BLOCKED_TAGS = ["INPUT", "TEXTAREA"];

/**
 * Special keys allowed in any context
 * @type {string[]}
 */
export const SPECIAL_ALLOWED_KEYS = ["Escape", "/"];
