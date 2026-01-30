/**
 * Criação de Elementos DOM para Atalhos de Teclado
 * 
 * Funções especializadas em criar elementos DOM para:
 * - Diálogo de ajuda de atalhos
 * - Lista de atalhos
 * - Itens individuais de atalho
 * - Botões e controles
 */

import { t } from "../i18n.js";

/**
 * Cria um item de atalho para exibição no diálogo
 * @param {Object} shortcut - Objeto com key e description
 * @param {string} shortcut.key - Representação visual da tecla
 * @param {string} shortcut.description - Descrição do atalho
 * @returns {HTMLElement} Elemento do item de atalho
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
 * Cria a lista de atalhos para o diálogo
 * @returns {HTMLElement} Elemento da lista de atalhos
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
 * Cria o título do diálogo
 * @returns {HTMLElement} Elemento do título
 */
export const createDialogTitle = () => {
  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = "shortcuts-dialog-title";
  title.textContent = t("keyboardShortcutsTitle");
  return title;
};

/**
 * Cria o botão de fechar do diálogo
 * @param {Function} onClose - Callback para fechar o diálogo
 * @returns {HTMLElement} Elemento do botão
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
 * Cria o overlay do diálogo
 * @param {Function} onClose - Callback para fechar o diálogo
 * @returns {HTMLElement} Elemento do overlay
 */
export const createDialogOverlay = (onClose) => {
  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");
  overlay.addEventListener("click", onClose);
  return overlay;
};

/**
 * Cria o container do diálogo
 * @param {Function} onClose - Callback para fechar o diálogo
 * @returns {Object} Objeto com container e closeBtn
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
 * Cria a estrutura completa do diálogo de atalhos
 * @param {Function} onClose - Callback para fechar o diálogo
 * @returns {Object} Objeto com dialog e closeBtn
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
