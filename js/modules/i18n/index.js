/**
 * Sistema de Internacionalização (i18n) - Ponto de Entrada
 * 
 * Módulo modular para gerenciamento de traduções e idiomas.
 * 
 * Estrutura:
 * - i18n-config.js: Configurações e constantes
 * - i18n-translations.js: Todas as traduções
 * - i18n-storage.js: Persistência no localStorage
 * - i18n-detector.js: Detecção de idioma do navegador
 * - i18n-utils.js: Funções utilitárias puras
 * - i18n-core.js: Lógica principal e API pública
 * 
 * @module i18n
 */

// ============================================================================
// EXPORTAÇÕES PRINCIPAIS (API Pública)
// ============================================================================

export {
  getLanguage,
  setLanguage,
  loadLanguage,
  t,
  getAvailableLanguages,
  hasTranslation,
  getAllTranslations,
  initI18n,
} from "./i18n-core.js";

// ============================================================================
// EXPORTAÇÕES DE CONFIGURAÇÃO
// ============================================================================

export {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
} from "./i18n-config.js";

// ============================================================================
// EXPORTAÇÕES DE UTILITÁRIOS (para testes e uso avançado)
// ============================================================================

export {
  replacePlaceholders,
  hasPlaceholders,
  extractPlaceholders,
  validatePlaceholders,
  normalizeLanguageCode,
} from "./i18n-utils.js";

export {
  detectLanguage,
  getBrowserLanguage,
  extractBaseLanguage,
  isLanguageSupported,
} from "./i18n-detector.js";

export {
  saveLanguagePreference,
  loadLanguagePreference,
  clearLanguagePreference,
} from "./i18n-storage.js";

// ============================================================================
// EXPORTAÇÕES DE TRADUÇÕES (para casos especiais)
// ============================================================================

export { TRANSLATIONS } from "./i18n-translations.js";
