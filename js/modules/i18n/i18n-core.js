/**
 * Módulo Principal i18n
 * 
 * Gerencia o estado do idioma atual e fornece a API principal para traduções.
 * Integra todos os outros módulos (storage, detector, utils, translations).
 */

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./i18n-config.js";
import { TRANSLATIONS } from "./i18n-translations.js";
import { saveLanguagePreference, loadLanguagePreference } from "./i18n-storage.js";
import { detectLanguage, isLanguageSupported } from "./i18n-detector.js";
import { replacePlaceholders, normalizeLanguageCode } from "./i18n-utils.js";

/**
 * Estado interno - idioma atual da aplicação
 * @private
 */
let currentLanguage = DEFAULT_LANGUAGE;

/**
 * Obtém o idioma atual da aplicação
 * 
 * @returns {string} Código do idioma atual (ex: 'pt', 'en')
 * 
 * @example
 * const lang = getLanguage(); // 'pt'
 */
export const getLanguage = () => currentLanguage;

/**
 * Define o idioma da aplicação e persiste a preferência
 * 
 * Valida se o idioma é suportado antes de aplicar.
 * Atualiza o atributo lang do documento HTML.
 * Salva a preferência no localStorage.
 * 
 * @param {string} lang - Código do idioma (ex: 'pt', 'en')
 * @returns {boolean} true se o idioma foi definido com sucesso, false caso contrário
 * 
 * @example
 * setLanguage('en'); // true - muda para inglês
 * setLanguage('fr'); // false - idioma não suportado
 */
export const setLanguage = (lang) => {
  const normalizedLang = normalizeLanguageCode(lang);
  
  if (!isLanguageSupported(normalizedLang)) {
    console.warn(`Idioma '${lang}' não é suportado. Idiomas disponíveis: ${SUPPORTED_LANGUAGES.join(", ")}`);
    return false;
  }
  
  currentLanguage = normalizedLang;
  document.documentElement.lang = normalizedLang;
  saveLanguagePreference(normalizedLang);
  
  return true;
};

/**
 * Carrega o idioma salvo ou detecta automaticamente
 * 
 * Prioridade de detecção:
 * 1. Idioma salvo no localStorage
 * 2. Idioma do navegador (se suportado)
 * 3. Idioma padrão (pt)
 * 
 * @returns {string} Código do idioma carregado
 * 
 * @example
 * const lang = loadLanguage(); // 'pt' ou 'en'
 */
export const loadLanguage = () => {
  const stored = loadLanguagePreference();
  
  if (stored && isLanguageSupported(stored)) {
    currentLanguage = stored;
  } else {
    currentLanguage = detectLanguage();
  }
  
  document.documentElement.lang = currentLanguage;
  return currentLanguage;
};

/**
 * Obtém a tradução para uma chave específica
 * 
 * Busca a tradução no idioma atual. Se não encontrar, usa o idioma padrão.
 * Se ainda assim não encontrar, retorna a própria chave.
 * Suporta placeholders dinâmicos no formato {nome}.
 * 
 * @param {string} key - Chave da tradução
 * @param {Object.<string, any>} params - Parâmetros para substituir placeholders
 * @returns {string} Texto traduzido
 * 
 * @example
 * t('addTaskButton'); // 'Adicionar Tarefa'
 * 
 * @example
 * t('deleteTaskConfirm', { text: 'Comprar leite' })
 * // 'Tem certeza de que deseja excluir "Comprar leite"?...'
 * 
 * @example
 * t('chaveInexistente'); // 'chaveInexistente' (retorna a chave)
 */
export const t = (key, params = {}) => {
  // Busca no idioma atual
  let translation = TRANSLATIONS[currentLanguage]?.[key];
  
  // Fallback para idioma padrão
  if (translation === undefined) {
    translation = TRANSLATIONS[DEFAULT_LANGUAGE]?.[key];
  }
  
  // Fallback para a própria chave
  if (translation === undefined) {
    console.warn(`Tradução não encontrada para chave '${key}' nos idiomas '${currentLanguage}' e '${DEFAULT_LANGUAGE}'`);
    return key;
  }
  
  // Substituir placeholders se houver parâmetros
  if (params && Object.keys(params).length > 0) {
    return replacePlaceholders(translation, params);
  }
  
  return translation;
};

/**
 * Obtém todos os idiomas disponíveis na aplicação
 * 
 * @returns {Array<string>} Array com códigos dos idiomas disponíveis
 * 
 * @example
 * const languages = getAvailableLanguages(); // ['pt', 'en']
 */
export const getAvailableLanguages = () => {
  return [...SUPPORTED_LANGUAGES];
};

/**
 * Verifica se uma chave de tradução existe
 * 
 * @param {string} key - Chave a verificar
 * @param {string} [lang] - Idioma específico (opcional, usa atual se não fornecido)
 * @returns {boolean} true se a chave existe, false caso contrário
 * 
 * @example
 * hasTranslation('addTaskButton'); // true
 * hasTranslation('chaveInexistente'); // false
 * hasTranslation('addTaskButton', 'en'); // true
 */
export const hasTranslation = (key, lang) => {
  const language = lang || currentLanguage;
  return TRANSLATIONS[language]?.[key] !== undefined;
};

/**
 * Obtém todas as traduções de um idioma específico
 * 
 * @param {string} [lang] - Código do idioma (opcional, usa atual se não fornecido)
 * @returns {Object.<string, string>|null} Objeto com todas as traduções ou null se idioma inválido
 * 
 * @example
 * const translations = getAllTranslations('en');
 * // { pageTitle: 'Axio', addTaskButton: 'Add Task', ... }
 */
export const getAllTranslations = (lang) => {
  const language = lang || currentLanguage;
  
  if (!isLanguageSupported(language)) {
    return null;
  }
  
  return { ...TRANSLATIONS[language] };
};

/**
 * Inicializa o sistema de internacionalização
 * 
 * Carrega o idioma salvo ou detecta automaticamente.
 * Deve ser chamado no início da aplicação.
 * 
 * @returns {string} Código do idioma inicializado
 * 
 * @example
 * initI18n(); // 'pt'
 */
export const initI18n = () => {
  return loadLanguage();
};
