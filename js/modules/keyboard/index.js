/**
 * Keyboard Shortcuts Module - Entry Point
 *
 * Exports all keyboard shortcut system functionality.
 * This is the main file that should be imported by other modules.
 */

// Export configuration
export { KEYBOARD_SHORTCUTS, BLOCKED_TAGS } from "./keyboard-config.js";

// Export utilities
export {
  isModifierPressed,
  shouldBlockShortcut,
  matchesShortcut
} from "./keyboard-utils.js";

// Export DOM functions
export {
  createShortcutItem,
  createShortcutsList,
  createDialogTitle,
  createCloseButton,
  createDialogOverlay,
  createDialogContainer,
  createDialogStructure
} from "./keyboard-dom.js";

// Export shortcut processing
export {
  processShortcut,
  createKeyboardListener,
  initKeyboardShortcuts
} from "./keyboard-shortcuts.js";

// Export dialog
export { showKeyboardShortcutsDialog } from "./keyboard-dialog.js";
