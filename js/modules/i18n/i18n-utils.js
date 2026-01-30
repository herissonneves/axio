/**
 * Utilitários i18n
 * 
 * Funções utilitárias puras para processamento de traduções.
 * Inclui substituição de placeholders, validação e formatação.
 */

import { PLACEHOLDER_PATTERN } from "./i18n-config.js";

/**
 * Substitui placeholders em uma string por valores fornecidos
 * 
 * Procura por placeholders no formato {nome} e os substitui pelos
 * valores correspondentes no objeto de parâmetros.
 * 
 * @param {string} text - Texto com placeholders
 * @param {Object.<string, any>} params - Objeto com valores para substituição
 * @returns {string} Texto com placeholders substituídos
 * 
 * @example
 * replacePlaceholders("Olá {name}!", { name: "Maria" })
 * // Retorna: "Olá Maria!"
 * 
 * @example
 * replacePlaceholders("Excluir {text}?", { text: "tarefa" })
 * // Retorna: "Excluir tarefa?"
 * 
 * @example
 * // Placeholder não encontrado mantém o original
 * replacePlaceholders("Olá {name}!", {})
 * // Retorna: "Olá {name}!"
 */
export const replacePlaceholders = (text, params = {}) => {
  if (!text || typeof text !== "string") {
    return text;
  }
  
  if (!params || Object.keys(params).length === 0) {
    return text;
  }
  
  return text.replace(PLACEHOLDER_PATTERN, (match, paramKey) => {
    return params[paramKey] !== undefined ? params[paramKey] : match;
  });
};

/**
 * Verifica se uma string contém placeholders
 * 
 * @param {string} text - Texto a verificar
 * @returns {boolean} true se contém placeholders, false caso contrário
 * 
 * @example
 * hasPlaceholders("Olá {name}!"); // true
 * hasPlaceholders("Olá mundo!"); // false
 */
export const hasPlaceholders = (text) => {
  if (!text || typeof text !== "string") {
    return false;
  }
  return PLACEHOLDER_PATTERN.test(text);
};

/**
 * Extrai os nomes dos placeholders de uma string
 * 
 * @param {string} text - Texto com placeholders
 * @returns {Array<string>} Array com os nomes dos placeholders encontrados
 * 
 * @example
 * extractPlaceholders("Olá {name}, você tem {count} mensagens")
 * // Retorna: ["name", "count"]
 * 
 * @example
 * extractPlaceholders("Sem placeholders")
 * // Retorna: []
 */
export const extractPlaceholders = (text) => {
  if (!text || typeof text !== "string") {
    return [];
  }
  
  const placeholders = [];
  const regex = new RegExp(PLACEHOLDER_PATTERN, "g");
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    placeholders.push(match[1]);
  }
  
  return placeholders;
};

/**
 * Valida se todos os placeholders necessários foram fornecidos
 * 
 * @param {string} text - Texto com placeholders
 * @param {Object.<string, any>} params - Objeto com valores fornecidos
 * @returns {boolean} true se todos os placeholders têm valores, false caso contrário
 * 
 * @example
 * validatePlaceholders("Olá {name}!", { name: "Maria" }); // true
 * validatePlaceholders("Olá {name}!", {}); // false
 */
export const validatePlaceholders = (text, params = {}) => {
  const placeholders = extractPlaceholders(text);
  
  if (placeholders.length === 0) {
    return true;
  }
  
  return placeholders.every(placeholder => params[placeholder] !== undefined);
};

/**
 * Normaliza um código de idioma para o formato padrão
 * 
 * @param {string} language - Código do idioma
 * @returns {string} Código normalizado (minúsculas, sem espaços)
 * 
 * @example
 * normalizeLanguageCode("PT"); // "pt"
 * normalizeLanguageCode(" en "); // "en"
 */
export const normalizeLanguageCode = (language) => {
  if (!language || typeof language !== "string") {
    return "";
  }
  return language.trim().toLowerCase();
};
