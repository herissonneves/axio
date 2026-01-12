/**
 * Módulo de Atalhos de Teclado
 * 
 * Gerencia os atalhos de teclado globais da aplicação:
 * - Suporte para teclas modificadoras (Ctrl/Cmd)
 * - Atalhos para navegação e ações rápidas
 * - Diálogo de ajuda com lista de atalhos
 * - Compatibilidade entre Windows/Linux e Mac
 */

import { t } from "./i18n.js";

/**
 * Verifica se uma tecla modificadora está pressionada (Ctrl no Windows/Linux, Cmd no Mac)
 * @param {KeyboardEvent} event - Evento de teclado
 * @returns {boolean} true se uma tecla modificadora está pressionada
 */
const isModifierPressed = (event) => {
  return event.ctrlKey || event.metaKey;
};

/**
 * Exibe o diálogo de ajuda com todos os atalhos de teclado disponíveis
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

  // Fechar ao pressionar Escape
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};

/**
 * Inicializa os atalhos de teclado da aplicação
 * 
 * @param {Object} handlers - Objeto com funções handler para cada atalho
 * @param {Function} handlers.focusInput - Focar no campo de entrada
 * @param {Function} handlers.toggleTheme - Alternar tema
 * @param {Function} handlers.toggleContrast - Alternar nível de contraste
 * @param {Function} handlers.toggleLanguage - Alternar idioma
 * @param {Function} handlers.setFilterAll - Mostrar todas as tarefas
 * @param {Function} handlers.setFilterActive - Mostrar tarefas ativas
 * @param {Function} handlers.setFilterCompleted - Mostrar tarefas concluídas
 * @param {Function} handlers.clearCompleted - Limpar tarefas concluídas
 * @param {Function} handlers.clearAll - Limpar todas as tarefas
 * @param {Function} handlers.showHelp - Mostrar diálogo de ajuda
 */
export const initKeyboardShortcuts = (handlers) => {
  const {
    focusInput,
    toggleTheme,
    toggleContrast,
    toggleLanguage,
    setFilterAll,
    setFilterActive,
    setFilterCompleted,
    clearCompleted,
    clearAll,
    showHelp,
  } = handlers;

  document.addEventListener("keydown", (event) => {
    // Não ativar atalhos quando estiver digitando em inputs ou textareas
    const target = event.target;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      // Permitir Escape para fechar diálogos mesmo quando em inputs
      if (event.key === "Escape") {
        return; // Deixar os diálogos tratarem seu próprio Escape
      }
      // Permitir atalhos com modificadores mesmo em inputs
      if (!isModifierPressed(event) && event.key !== "/") {
        return;
      }
    }

    const modifier = isModifierPressed(event);
    const key = event.key.toLowerCase();

    // Ctrl/Cmd + K ou / para focar no input
    if ((modifier && key === "k") || (!modifier && key === "/")) {
      event.preventDefault();
      if (focusInput) focusInput();
      return;
    }

    // Ctrl/Cmd + G para alternar tema
    if (modifier && key === "g") {
      event.preventDefault();
      if (toggleTheme) toggleTheme();
      return;
    }

    // Ctrl/Cmd + J para alternar contraste
    if (modifier && key === "j") {
      event.preventDefault();
      if (toggleContrast) toggleContrast();
      return;
    }

    // Ctrl/Cmd + L para alternar idioma
    if (modifier && key === "l") {
      event.preventDefault();
      if (toggleLanguage) toggleLanguage();
      return;
    }

    // Teclas numéricas para filtros (apenas quando não estiver em input)
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

    // Ctrl/Cmd + Delete para limpar concluídas
    if (modifier && key === "delete" && !event.shiftKey) {
      event.preventDefault();
      if (clearCompleted) clearCompleted();
      return;
    }

    // Ctrl/Cmd + Shift + Delete para limpar todas
    if (modifier && event.shiftKey && key === "delete") {
      event.preventDefault();
      if (clearAll) clearAll();
      return;
    }

    // Ctrl/Cmd + ? ou F1 para mostrar ajuda
    if ((modifier && key === "?") || event.key === "F1") {
      event.preventDefault();
      if (showHelp) showHelp();
      return;
    }
  });
};
