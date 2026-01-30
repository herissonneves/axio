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

// ============================================================================
// CONSTANTES E CONFIGURAÇÕES
// ============================================================================

/**
 * Configuração dos atalhos de teclado
 * Cada atalho define a tecla, modificadores e a chave do handler
 */
const KEYBOARD_SHORTCUTS = {
  // Navegação
  FOCUS_INPUT: { key: "k", modifier: true, handler: "focusInput" },
  FOCUS_INPUT_ALT: { key: "/", modifier: false, handler: "focusInput" },
  
  // Aparência
  TOGGLE_THEME: { key: "g", modifier: true, handler: "toggleTheme" },
  TOGGLE_CONTRAST: { key: "j", modifier: true, handler: "toggleContrast" },
  TOGGLE_LANGUAGE: { key: "l", modifier: true, handler: "toggleLanguage" },
  
  // Filtros
  FILTER_ALL: { key: "1", modifier: false, handler: "setFilterAll" },
  FILTER_ACTIVE: { key: "2", modifier: false, handler: "setFilterActive" },
  FILTER_COMPLETED: { key: "3", modifier: false, handler: "setFilterCompleted" },
  
  // Ações
  CLEAR_COMPLETED: { key: "delete", modifier: true, shift: false, handler: "clearCompleted" },
  CLEAR_ALL: { key: "delete", modifier: true, shift: true, handler: "clearAll" },
  
  // Ajuda
  SHOW_HELP: { key: "?", modifier: true, handler: "showHelp" },
  SHOW_HELP_ALT: { key: "F1", modifier: false, handler: "showHelp" },
};

/**
 * Tags HTML que devem bloquear atalhos de teclado
 */
const BLOCKED_TAGS = ["INPUT", "TEXTAREA"];

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Verifica se uma tecla modificadora está pressionada (Ctrl no Windows/Linux, Cmd no Mac)
 * @param {KeyboardEvent} event - Evento de teclado
 * @returns {boolean} true se uma tecla modificadora está pressionada
 */
const isModifierPressed = (event) => {
  return event.ctrlKey || event.metaKey;
};

/**
 * Verifica se o evento ocorreu em um contexto onde atalhos devem ser bloqueados
 * @param {KeyboardEvent} event - Evento de teclado
 * @returns {boolean} true se os atalhos devem ser bloqueados
 */
const shouldBlockShortcut = (event) => {
  const target = event.target;
  
  // Permitir Escape para fechar diálogos mesmo quando em inputs
  if (event.key === "Escape") {
    return false;
  }
  
  // Bloquear se estiver em input/textarea/contentEditable
  if (
    BLOCKED_TAGS.includes(target.tagName) ||
    target.isContentEditable
  ) {
    // Permitir atalhos com modificadores mesmo em inputs
    return !isModifierPressed(event) && event.key !== "/";
  }
  
  return false;
};

/**
 * Verifica se um evento corresponde a um atalho específico
 * @param {KeyboardEvent} event - Evento de teclado
 * @param {Object} shortcut - Configuração do atalho
 * @returns {boolean} true se o evento corresponde ao atalho
 */
const matchesShortcut = (event, shortcut) => {
  const modifier = isModifierPressed(event);
  const key = event.key.toLowerCase();
  
  // Verificar modificador
  if (shortcut.modifier !== undefined && modifier !== shortcut.modifier) {
    return false;
  }
  
  // Verificar Shift
  if (shortcut.shift !== undefined && event.shiftKey !== shortcut.shift) {
    return false;
  }
  
  // Verificar tecla (case-insensitive, exceto para F1 e outras teclas especiais)
  const shortcutKey = shortcut.key.toLowerCase();
  const eventKey = event.key === shortcut.key ? event.key : key;
  
  return eventKey === shortcutKey || key === shortcutKey;
};

// ============================================================================
// CRIAÇÃO DE ELEMENTOS DOM
// ============================================================================

/**
 * Cria um item de atalho para exibição no diálogo
 * @param {Object} shortcut - Objeto com key e description
 * @returns {HTMLElement} Elemento do item de atalho
 */
const createShortcutItem = (shortcut) => {
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
const createShortcutsList = () => {
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
 * Cria o botão de fechar do diálogo
 * @param {Function} onClose - Callback para fechar o diálogo
 * @returns {HTMLElement} Elemento do botão
 */
const createCloseButton = (onClose) => {
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("todo-dialog__button", "todo-dialog__button--primary");
  closeBtn.textContent = t("close");
  closeBtn.setAttribute("type", "button");
  closeBtn.addEventListener("click", onClose);
  return closeBtn;
};

/**
 * Cria a estrutura completa do diálogo de atalhos
 * @param {Function} onClose - Callback para fechar o diálogo
 * @returns {Object} Objeto com dialog e closeBtn
 */
const createDialogStructure = (onClose) => {
  const dialog = document.createElement("div");
  dialog.classList.add("todo-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", "shortcuts-dialog-title");
  dialog.setAttribute("aria-modal", "true");

  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");
  overlay.addEventListener("click", onClose);

  const container = document.createElement("div");
  container.classList.add("todo-dialog__container", "shortcuts-dialog");

  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = "shortcuts-dialog-title";
  title.textContent = t("keyboardShortcutsTitle");

  const shortcutsList = createShortcutsList();

  const actions = document.createElement("div");
  actions.classList.add("todo-dialog__actions");

  const closeBtn = createCloseButton(onClose);
  actions.append(closeBtn);

  container.append(title, shortcutsList, actions);
  dialog.append(overlay, container);

  return { dialog, closeBtn };
};

// ============================================================================
// FUNÇÕES PÚBLICAS
// ============================================================================

/**
 * Exibe o diálogo de ajuda com todos os atalhos de teclado disponíveis
 */
export const showKeyboardShortcutsDialog = () => {
  const closeDialog = () => {
    dialog.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleEscape);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
    }
  };

  const { dialog, closeBtn } = createDialogStructure(closeDialog);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";
  closeBtn.focus();

  document.addEventListener("keydown", handleEscape);
};

/**
 * Processa um evento de teclado e executa o handler correspondente
 * @param {KeyboardEvent} event - Evento de teclado
 * @param {Object} handlers - Objeto com os handlers disponíveis
 * @returns {boolean} true se um atalho foi processado
 */
const processShortcut = (event, handlers) => {
  // Verificar cada atalho configurado
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
  document.addEventListener("keydown", (event) => {
    // Verificar se os atalhos devem ser bloqueados neste contexto
    if (shouldBlockShortcut(event)) {
      return;
    }

    // Processar o atalho
    processShortcut(event, handlers);
  });
};
