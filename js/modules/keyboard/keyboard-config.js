/**
 * Configurações e Constantes de Atalhos de Teclado
 * 
 * Define todas as configurações centralizadas para atalhos de teclado:
 * - Mapeamento de teclas para handlers
 * - Tags HTML que bloqueiam atalhos
 * - Constantes do sistema
 */

/**
 * Configuração dos atalhos de teclado
 * Cada atalho define a tecla, modificadores e a chave do handler
 * 
 * @typedef {Object} ShortcutConfig
 * @property {string} key - Tecla do atalho (ex: "k", "1", "F1")
 * @property {boolean} [modifier] - Se requer Ctrl/Cmd pressionado
 * @property {boolean} [shift] - Se requer Shift pressionado
 * @property {string} handler - Nome da função handler a ser executada
 */

/**
 * Mapeamento completo de atalhos de teclado
 * @type {Object.<string, ShortcutConfig>}
 */
export const KEYBOARD_SHORTCUTS = {
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
 * Tags HTML que devem bloquear atalhos de teclado quando focadas
 * @type {string[]}
 */
export const BLOCKED_TAGS = ["INPUT", "TEXTAREA"];

/**
 * Teclas especiais que devem ser permitidas em qualquer contexto
 * @type {string[]}
 */
export const SPECIAL_ALLOWED_KEYS = ["Escape", "/"];
