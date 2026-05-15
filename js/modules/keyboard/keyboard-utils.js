/**
 * Keyboard Shortcut Utilities
 *
 * Helper functions for keyboard event processing:
 * - Modifier key detection
 * - Context validation
 * - Shortcut matching
 */

import { BLOCKED_TAGS, SPECIAL_ALLOWED_KEYS } from "./keyboard-config.js";

/**
 * Checks whether a modifier key is pressed (Ctrl on Windows/Linux, Cmd on Mac)
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean} true if a modifier key is pressed
 */
export const isModifierPressed = (event) => {
  return event.ctrlKey || event.metaKey;
};

/**
 * Checks whether the event occurred in a context where shortcuts should be blocked
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean} true if shortcuts should be blocked
 */
export const shouldBlockShortcut = (event) => {
  const target = event.target;

  // Allow special keys in any context
  if (SPECIAL_ALLOWED_KEYS.includes(event.key)) {
    return false;
  }

  // Block when in input/textarea/contentEditable
  if (
    BLOCKED_TAGS.includes(target.tagName) ||
    target.isContentEditable
  ) {
    // Allow shortcuts with modifiers even in inputs
    return !isModifierPressed(event) && !SPECIAL_ALLOWED_KEYS.includes(event.key);
  }

  return false;
};

/**
 * Checks whether an event matches a specific shortcut
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Object} shortcut - Shortcut configuration
 * @returns {boolean} true if the event matches the shortcut
 */
export const matchesShortcut = (event, shortcut) => {
  const modifier = isModifierPressed(event);
  const key = event.key.toLowerCase();

  // Check modifier
  if (shortcut.modifier !== undefined && modifier !== shortcut.modifier) {
    return false;
  }

  // Check Shift
  if (shortcut.shift !== undefined && event.shiftKey !== shortcut.shift) {
    return false;
  }

  // Check key (case-insensitive, except for F1 and other special keys)
  const shortcutKey = shortcut.key.toLowerCase();
  const eventKey = event.key === shortcut.key ? event.key : key;

  return eventKey === shortcutKey || key === shortcutKey;
};
