/**
 * Módulo de Atalhos de Teclado - Ponto de Entrada Legacy
 *
 * Este arquivo mantém a compatibilidade com o código existente,
 * re-exportando funcionalidades dos módulos especializados.
 *
 * Estrutura modularizada:
 * - keyboard/keyboard-config.js - Configurações e constantes
 * - keyboard/keyboard-utils.js - Funções utilitárias
 * - keyboard/keyboard-dom.js - Criação de elementos DOM
 * - keyboard/keyboard-shortcuts.js - Processamento de atalhos
 * - keyboard/keyboard-dialog.js - Gerenciamento do diálogo
 * - keyboard/index.js - Exportações centralizadas
 */

// Re-exportar todas as funcionalidades dos módulos especializados
export {
  // Configurações
  KEYBOARD_SHORTCUTS,
  BLOCKED_TAGS,

  // Utilitários
  isModifierPressed,
  shouldBlockShortcut,
  matchesShortcut,

  // DOM
  createShortcutItem,
  createShortcutsList,
  createDialogStructure,

  // Processamento
  processShortcut,
  createKeyboardListener,
  initKeyboardShortcuts,

  // Diálogo
  showKeyboardShortcutsDialog,
} from "./keyboard/index.js";
