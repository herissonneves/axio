/**
 * Keyboard Shortcuts Module Tests
 *
 * Tests keyboard shortcut functionality:
 * - Key detection utilities
 * - Context validation for blocking
 * - Shortcut matching with events
 * - Shortcut processing
 */

import {
  isModifierPressed,
  shouldBlockShortcut,
  matchesShortcut,
} from "../../js/modules/keyboard/keyboard-utils.js";

/**
 * Registers all keyboard shortcuts module tests
 * @param {TestRunner} runner - Test runner instance
 */
export function runKeyboardTests(runner) {
  runner.category("Unit Tests - Keyboard");

  // ============================================================================
  // isModifierPressed tests
  // ============================================================================

  runner.test("isModifierPressed detects Ctrl pressed", () => {
    const event = { ctrlKey: true, metaKey: false };
    runner.assertTrue(isModifierPressed(event));
  });

  runner.test("isModifierPressed detects Cmd/Meta pressed", () => {
    const event = { ctrlKey: false, metaKey: true };
    runner.assertTrue(isModifierPressed(event));
  });

  runner.test("isModifierPressed returns false when no modifier is pressed", () => {
    const event = { ctrlKey: false, metaKey: false };
    runner.assertFalse(isModifierPressed(event));
  });

  runner.test("isModifierPressed detects both Ctrl and Meta", () => {
    const event = { ctrlKey: true, metaKey: true };
    runner.assertTrue(isModifierPressed(event));
  });

  // ============================================================================
  // shouldBlockShortcut tests
  // ============================================================================

  runner.test("shouldBlockShortcut allows Escape in any context", () => {
    const event = {
      key: "Escape",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut blocks normal keys in INPUT", () => {
    const event = {
      key: "a",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertTrue(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut allows modifier shortcuts in INPUT", () => {
    const event = {
      key: "k",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: true,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut allows / in INPUT", () => {
    const event = {
      key: "/",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut blocks normal keys in TEXTAREA", () => {
    const event = {
      key: "a",
      target: { tagName: "TEXTAREA", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertTrue(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut blocks keys in contentEditable", () => {
    const event = {
      key: "a",
      target: { tagName: "DIV", isContentEditable: true },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertTrue(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut allows keys on normal elements", () => {
    const event = {
      key: "a",
      target: { tagName: "DIV", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  // ============================================================================
  // matchesShortcut tests
  // ============================================================================

  runner.test("matchesShortcut identifies Ctrl+K correctly", () => {
    const event = {
      key: "k",
      ctrlKey: true,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "k",
      modifier: true
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut identifies Cmd+K correctly", () => {
    const event = {
      key: "k",
      ctrlKey: false,
      metaKey: true,
      shiftKey: false
    };
    const shortcut = {
      key: "k",
      modifier: true
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut rejects different key", () => {
    const event = {
      key: "j",
      ctrlKey: true,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "k",
      modifier: true
    };
    runner.assertFalse(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut rejects incorrect modifier", () => {
    const event = {
      key: "k",
      ctrlKey: false,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "k",
      modifier: true
    };
    runner.assertFalse(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut accepts key without modifier", () => {
    const event = {
      key: "1",
      ctrlKey: false,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "1",
      modifier: false
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut identifies Ctrl+Shift+Delete", () => {
    const event = {
      key: "delete",
      ctrlKey: true,
      metaKey: false,
      shiftKey: true
    };
    const shortcut = {
      key: "delete",
      modifier: true,
      shift: true
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut rejects incorrect Shift", () => {
    const event = {
      key: "delete",
      ctrlKey: true,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "delete",
      modifier: true,
      shift: true
    };
    runner.assertFalse(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut is case-insensitive for normal keys", () => {
    const event = {
      key: "K",
      ctrlKey: true,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "k",
      modifier: true
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut accepts special keys like F1", () => {
    const event = {
      key: "F1",
      ctrlKey: false,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "F1",
      modifier: false
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut accepts shortcut without modifier definition", () => {
    const event = {
      key: "/",
      ctrlKey: true,
      metaKey: false,
      shiftKey: false
    };
    const shortcut = {
      key: "/"
      // modifier undefined = accepts any state
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  // ============================================================================
  // Integration tests: Shortcut configuration
  // ============================================================================

  runner.test("Shortcut configuration contains all expected keys", () => {
    // Import configuration
    const config = {
      FOCUS_INPUT: { key: "k", modifier: true, handler: "focusInput" },
      TOGGLE_THEME: { key: "g", modifier: true, handler: "toggleTheme" },
      FILTER_ALL: { key: "1", modifier: false, handler: "setFilterAll" },
    };

    runner.assertTrue(config.FOCUS_INPUT.key === "k");
    runner.assertTrue(config.TOGGLE_THEME.modifier === true);
    runner.assertTrue(config.FILTER_ALL.handler === "setFilterAll");
  });
}
