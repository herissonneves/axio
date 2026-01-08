/**
 * Keyboard shortcuts module
 * Handles global keyboard shortcuts for the application
 */

import { t } from "./i18n.js";

/**
 * Check if a modifier key is pressed (Ctrl on Windows/Linux, Cmd on Mac)
 */
const isModifierPressed = (event) => {
  return event.ctrlKey || event.metaKey;
};

/**
 * Show keyboard shortcuts help dialog
 */
export const showKeyboardShortcutsDialog = () => {
  const dialog = document.createElement("div");
  dialog.classList.add("todo-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", "shortcuts-dialog-title");
  dialog.setAttribute("aria-modal", "true");

  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");

  const container = document.createElement("div");
  container.classList.add("todo-dialog__container", "shortcuts-dialog");

  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = "shortcuts-dialog-title";
  title.textContent = t("keyboardShortcutsTitle");

  const shortcutsList = document.createElement("div");
  shortcutsList.classList.add("shortcuts-list");

  const shortcuts = [
    { key: t("shortcutKeyFocusInput"), description: t("shortcutFocusInput") },
    { key: t("shortcutKeyToggleTheme"), description: t("shortcutToggleTheme") },
    { key: t("shortcutKeyFilterAll"), description: t("shortcutFilterAll") },
    { key: t("shortcutKeyFilterActive"), description: t("shortcutFilterActive") },
    { key: t("shortcutKeyFilterCompleted"), description: t("shortcutFilterCompleted") },
    { key: t("shortcutKeyClearCompleted"), description: t("shortcutClearCompleted") },
    { key: t("shortcutKeyClearAll"), description: t("shortcutClearAll") },
    { key: t("shortcutKeyShowHelp"), description: t("shortcutShowHelp") },
  ];

  shortcuts.forEach((shortcut) => {
    const item = document.createElement("div");
    item.classList.add("shortcuts-item");

    const key = document.createElement("kbd");
    key.classList.add("shortcuts-key");
    key.textContent = shortcut.key;

    const description = document.createElement("span");
    description.classList.add("shortcuts-description");
    description.textContent = shortcut.description;

    item.append(key, description);
    shortcutsList.append(item);
  });

  const actions = document.createElement("div");
  actions.classList.add("todo-dialog__actions");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("todo-dialog__button", "todo-dialog__button--primary");
  closeBtn.textContent = t("close");
  closeBtn.setAttribute("type", "button");

  const closeDialog = () => {
    dialog.remove();
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeDialog);
  overlay.addEventListener("click", closeDialog);

  actions.append(closeBtn);
  container.append(title, shortcutsList, actions);
  dialog.append(overlay, container);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";

  closeBtn.focus();

  // Close on Escape key
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};

/**
 * Initialize keyboard shortcuts
 */
export const initKeyboardShortcuts = (handlers) => {
  const {
    focusInput,
    toggleTheme,
    setFilterAll,
    setFilterActive,
    setFilterCompleted,
    clearCompleted,
    clearAll,
    showHelp,
  } = handlers;

  document.addEventListener("keydown", (event) => {
    // Don't trigger shortcuts when typing in inputs or textareas
    const target = event.target;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      // Allow Escape to close dialogs even when in inputs
      if (event.key === "Escape") {
        return; // Let dialogs handle their own Escape
      }
      // Allow shortcuts with modifiers even in inputs
      if (!isModifierPressed(event) && event.key !== "/") {
        return;
      }
    }

    const modifier = isModifierPressed(event);
    const key = event.key.toLowerCase();

    // Ctrl/Cmd + K or / to focus input
    if ((modifier && key === "k") || (!modifier && key === "/")) {
      event.preventDefault();
      if (focusInput) focusInput();
      return;
    }

    // Ctrl/Cmd + T to toggle theme
    if (modifier && key === "t") {
      event.preventDefault();
      if (toggleTheme) toggleTheme();
      return;
    }

    // Number keys for filters (only when not in input)
    if (!modifier && !event.shiftKey) {
      if (key === "1" && setFilterAll) {
        event.preventDefault();
        setFilterAll();
        return;
      }
      if (key === "2" && setFilterActive) {
        event.preventDefault();
        setFilterActive();
        return;
      }
      if (key === "3" && setFilterCompleted) {
        event.preventDefault();
        setFilterCompleted();
        return;
      }
    }

    // Ctrl/Cmd + Delete to clear completed
    if (modifier && key === "delete" && !event.shiftKey) {
      event.preventDefault();
      if (clearCompleted) clearCompleted();
      return;
    }

    // Ctrl/Cmd + Shift + Delete to clear all
    if (modifier && event.shiftKey && key === "delete") {
      event.preventDefault();
      if (clearAll) clearAll();
      return;
    }

    // Ctrl/Cmd + ? or F1 to show help
    if ((modifier && key === "?") || event.key === "F1") {
      event.preventDefault();
      if (showHelp) showHelp();
      return;
    }
  });
};
