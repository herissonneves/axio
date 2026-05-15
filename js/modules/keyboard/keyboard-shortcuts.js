/**
 * Keyboard Shortcut Processing
 *
 * Shortcut processing and execution logic:
 * - Event processing
 * - Handler execution
 * - Listener management
 */

import { KEYBOARD_SHORTCUTS } from "./keyboard-config.js";
import { shouldBlockShortcut, matchesShortcut } from "./keyboard-utils.js";

/**
 * Processes a keyboard event and runs the corresponding handler
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Object} handlers - Object with available handlers
 * @returns {boolean} true if a shortcut was processed
 */
export const processShortcut = (event, handlers) => {
  // Check each configured shortcut
  for (const [name, config] of Object.entries(KEYBOARD_SHORTCUTS)) {
    if (matchesShortcut(event, config)) {
      const handler = handlers[config.handler];
      if (handler && typeof handler === "function") {
        event.preventDefault();
        handler();
        return true;
      }
    }
  }

  return false;
};

/**
 * Creates a keyboard listener with the provided handlers
 * @param {Object} handlers - Object with handler functions
 * @returns {Function} Listener function for addEventListener
 */
export const createKeyboardListener = (handlers) => {
  return (event) => {
    // Check whether shortcuts should be blocked in this context
    if (shouldBlockShortcut(event)) {
      return;
    }

    // Process the shortcut
    processShortcut(event, handlers);
  };
};

/**
 * Initializes application keyboard shortcuts
 *
 * @param {Object} handlers - Object with handler functions for each shortcut
 * @param {Function} handlers.focusInput - Focus the input field
 * @param {Function} handlers.toggleTheme - Toggle theme
 * @param {Function} handlers.toggleLanguage - Toggle language
 * @param {Function} handlers.setFilterAll - Show all tasks
 * @param {Function} handlers.setFilterActive - Show active tasks
 * @param {Function} handlers.setFilterCompleted - Show completed tasks
 * @param {Function} handlers.clearCompleted - Clear completed tasks
 * @param {Function} handlers.clearAll - Clear all tasks
 * @param {Function} handlers.showHelp - Show help dialog
 * @returns {Function} Function to remove the listener (cleanup)
 */
export const initKeyboardShortcuts = (handlers) => {
  const listener = createKeyboardListener(handlers);
  document.addEventListener("keydown", listener);

  // Return cleanup function
  return () => {
    document.removeEventListener("keydown", listener);
  };
};
