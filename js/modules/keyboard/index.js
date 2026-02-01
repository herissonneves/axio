/**
 * Módulo de Atalhos de Teclado - Ponto de Entrada
 * 
 * Exporta todas as funcionalidades do sistema de atalhos de teclado.
 * Este é o arquivo principal que deve ser importado por outros módulos.
 */

// Exportar configurações
export { KEYBOARD_SHORTCUTS, BLOCKED_TAGS } from "./keyboard-config.js";

// Exportar utilitários
export { 
  isModifierPressed, 
  shouldBlockShortcut, 
  matchesShortcut
} from "./keyboard-utils.js";

// Exportar funções DOM
export { 
  createShortcutItem,
  createShortcutsList,
  createDialogTitle,
  createCloseButton,
  createDialogOverlay,
  createDialogContainer,
  createDialogStructure
} from "./keyboard-dom.js";

// Exportar processamento de atalhos
export { 
  processShortcut,
  createKeyboardListener,
  initKeyboardShortcuts
} from "./keyboard-shortcuts.js";

// Exportar diálogo
export { showKeyboardShortcutsDialog } from "./keyboard-dialog.js";
