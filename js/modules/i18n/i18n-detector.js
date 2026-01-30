/**
 * Módulo de Detecção de Idioma
 * 
 * Detecta o idioma preferido do navegador do usuário.
 * Funções puras para análise de preferências de idioma.
 */

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./i18n-config.js";

/**
 * Obtém o código de idioma do navegador
 * 
 * @returns {string} Código de idioma do navegador (ex: 'pt-BR', 'en-US')
 * 
 * @example
 * getBrowserLanguage(); // 'pt-BR'
 */
export const getBrowserLanguage = () => {
  return navigator.language || navigator.userLanguage || "";
};

/**
 * Extrai o código de idioma base de um código completo
 * 
 * @param {string} languageCode - Código completo (ex: 'pt-BR', 'en-US')
 * @returns {string} Código base do idioma (ex: 'pt', 'en')
 * 
 * @example
 * extractBaseLanguage('pt-BR'); // 'pt'
 * extractBaseLanguage('en-US'); // 'en'
 * extractBaseLanguage('pt'); // 'pt'
 */
export const extractBaseLanguage = (languageCode) => {
  if (!languageCode) return "";
  return languageCode.split("-")[0].toLowerCase();
};

/**
 * Verifica se um idioma é suportado pela aplicação
 * 
 * @param {string} language - Código do idioma a verificar
 * @returns {boolean} true se o idioma é suportado, false caso contrário
 * 
 * @example
 * isLanguageSupported('pt'); // true
 * isLanguageSupported('fr'); // false
 */
export const isLanguageSupported = (language) => {
  return SUPPORTED_LANGUAGES.includes(language);
};

/**
 * Detecta automaticamente o melhor idioma com base no navegador
 * 
 * Verifica o idioma do navegador e retorna um idioma suportado.
 * Se o idioma do navegador não for suportado, retorna o idioma padrão.
 * 
 * @returns {string} Código do idioma detectado
 * 
 * @example
 * // Navegador em português
 * detectLanguage(); // 'pt'
 * 
 * // Navegador em francês (não suportado)
 * detectLanguage(); // 'pt' (padrão)
 */
export const detectLanguage = () => {
  const browserLang = getBrowserLanguage();
  const baseLang = extractBaseLanguage(browserLang);
  
  if (isLanguageSupported(baseLang)) {
    return baseLang;
  }
  
  return DEFAULT_LANGUAGE;
};
