/**
 * DOM Element Creation for Keyboard Shortcuts
 *
 * Specialized functions to create DOM elements for:
 * - Shortcuts help dialog
 * - Shortcut list
 * - Individual shortcut items
 * - Buttons and controls
 */

import { t } from "../i18n/index.js";

/**
 * Creates a shortcut item for display in the dialog
 * @param {Object} shortcut - Object with key and description
 * @param {string} shortcut.key - Visual key representation
 * @param {string} shortcut.description - Shortcut description
 * @returns {HTMLElement} Shortcut item element
 */
export const createShortcutItem = (shortcut) => {
  const item = document.createElement("div");
  item.classList.add("shortcuts-item");

  const key = document.createElement("kbd");
  key.classList.add("shortcuts-key");
  key.textContent = shortcut.key;

  const description = document.createElement("span");
  description.classList.add("shortcuts-description");
  description.textContent = shortcut.description;

  item.append(key, description);
  return item;
};

/**
 * Creates the shortcut list for the dialog
 * @returns {HTMLElement} Shortcut list element
 */
export const createShortcutsList = () => {
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
    shortcutsList.append(createShortcutItem(shortcut));
  });

  return shortcutsList;
};

/**
 * Creates the dialog title
 * @returns {HTMLElement} Title element
 */
export const createDialogTitle = () => {
  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = "shortcuts-dialog-title";
  title.textContent = t("keyboardShortcutsTitle");
  return title;
};

/**
 * Creates the dialog close button
 * @param {Function} onClose - Callback to close the dialog
 * @returns {HTMLElement} Button element
 */
export const createCloseButton = (onClose) => {
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("todo-dialog__button", "todo-dialog__button--primary");
  closeBtn.textContent = t("close");
  closeBtn.setAttribute("type", "button");
  closeBtn.addEventListener("click", onClose);
  return closeBtn;
};

/**
 * Creates the dialog overlay
 * @param {Function} onClose - Callback to close the dialog
 * @returns {HTMLElement} Overlay element
 */
export const createDialogOverlay = (onClose) => {
  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");
  overlay.addEventListener("click", onClose);
  return overlay;
};

/**
 * Creates the dialog container
 * @param {Function} onClose - Callback to close the dialog
 * @returns {Object} Object with container and closeBtn
 */
export const createDialogContainer = (onClose) => {
  const container = document.createElement("div");
  container.classList.add("todo-dialog__container", "shortcuts-dialog");

  const title = createDialogTitle();
  const shortcutsList = createShortcutsList();

  const actions = document.createElement("div");
  actions.classList.add("todo-dialog__actions");

  const closeBtn = createCloseButton(onClose);
  actions.append(closeBtn);

  container.append(title, shortcutsList, actions);

  return { container, closeBtn };
};

/**
 * Creates the complete shortcuts dialog structure
 * @param {Function} onClose - Callback to close the dialog
 * @returns {Object} Object with dialog and closeBtn
 */
export const createDialogStructure = (onClose) => {
  const dialog = document.createElement("div");
  dialog.classList.add("todo-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", "shortcuts-dialog-title");
  dialog.setAttribute("aria-modal", "true");

  const overlay = createDialogOverlay(onClose);
  const { container, closeBtn } = createDialogContainer(onClose);

  dialog.append(overlay, container);

  return { dialog, closeBtn };
};
