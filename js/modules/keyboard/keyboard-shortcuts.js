/**
 * Processamento de Atalhos de Teclado
 * 
 * Lógica de processamento e execução de atalhos:
 * - Processamento de eventos
 * - Execução de handlers
 * - Gerenciamento de listeners
 */

import { KEYBOARD_SHORTCUTS } from "./keyboard-config.js";
import { shouldBlockShortcut, matchesShortcut } from "./keyboard-utils.js";

/**
 * Processa um evento de teclado e executa o handler correspondente
 * @param {KeyboardEvent} event - Evento de teclado
 * @param {Object} handlers - Objeto com os handlers disponíveis
 * @returns {boolean} true se um atalho foi processado
 */
export const processShortcut = (event, handlers) => {
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
 * Cria um listener de teclado com os handlers fornecidos
 * @param {Object} handlers - Objeto com funções handler
 * @returns {Function} Função listener a ser usada com addEventListener
 */
export const createKeyboardListener = (handlers) => {
  return (event) => {
    // Verificar se os atalhos devem ser bloqueados neste contexto
    if (shouldBlockShortcut(event)) {
      return;
    }

    // Processar o atalho
    processShortcut(event, handlers);
  };
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
 * @returns {Function} Função para remover o listener (cleanup)
 */
export const initKeyboardShortcuts = (handlers) => {
  const listener = createKeyboardListener(handlers);
  document.addEventListener("keydown", listener);
  
  // Retornar função de cleanup
  return () => {
    document.removeEventListener("keydown", listener);
  };
};
