/**
 * Utilitários de Atalhos de Teclado
 * 
 * Funções auxiliares para processamento de eventos de teclado:
 * - Detecção de teclas modificadoras
 * - Validação de contexto
 * - Correspondência de atalhos
 */

import { BLOCKED_TAGS, SPECIAL_ALLOWED_KEYS } from "./keyboard-config.js";

/**
 * Verifica se uma tecla modificadora está pressionada (Ctrl no Windows/Linux, Cmd no Mac)
 * @param {KeyboardEvent} event - Evento de teclado
 * @returns {boolean} true se uma tecla modificadora está pressionada
 */
export const isModifierPressed = (event) => {
  return event.ctrlKey || event.metaKey;
};

/**
 * Verifica se o evento ocorreu em um contexto onde atalhos devem ser bloqueados
 * @param {KeyboardEvent} event - Evento de teclado
 * @returns {boolean} true se os atalhos devem ser bloqueados
 */
export const shouldBlockShortcut = (event) => {
  const target = event.target;
  
  // Permitir teclas especiais em qualquer contexto
  if (SPECIAL_ALLOWED_KEYS.includes(event.key)) {
    return false;
  }
  
  // Bloquear se estiver em input/textarea/contentEditable
  if (
    BLOCKED_TAGS.includes(target.tagName) ||
    target.isContentEditable
  ) {
    // Permitir atalhos com modificadores mesmo em inputs
    return !isModifierPressed(event) && !SPECIAL_ALLOWED_KEYS.includes(event.key);
  }
  
  return false;
};

/**
 * Verifica se um evento corresponde a um atalho específico
 * @param {KeyboardEvent} event - Evento de teclado
 * @param {Object} shortcut - Configuração do atalho
 * @returns {boolean} true se o evento corresponde ao atalho
 */
export const matchesShortcut = (event, shortcut) => {
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

/**
 * Normaliza uma tecla para comparação
 * @param {string} key - Tecla a ser normalizada
 * @returns {string} Tecla normalizada
 */
export const normalizeKey = (key) => {
  // Teclas especiais mantêm o case original
  if (key.startsWith("F") || key === "Escape" || key === "Delete") {
    return key;
  }
  return key.toLowerCase();
};
