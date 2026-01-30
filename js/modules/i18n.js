/**
 * Módulo de Internacionalização (i18n) - Wrapper Legacy
 * 
 * Este arquivo mantém retrocompatibilidade com código existente.
 * Todas as funcionalidades foram movidas para módulos especializados em i18n/
 * 
 * Nova estrutura modular:
 * - i18n/i18n-config.js: Configurações e constantes
 * - i18n/i18n-translations.js: Todas as traduções
 * - i18n/i18n-storage.js: Persistência no localStorage
 * - i18n/i18n-detector.js: Detecção de idioma do navegador
 * - i18n/i18n-utils.js: Funções utilitárias puras
 * - i18n/i18n-core.js: Lógica principal
 * - i18n/index.js: Ponto de entrada centralizado
 * 
 * @see {@link ./i18n/index.js} Para documentação completa
 */

// Re-exporta todas as funcionalidades do módulo modular
export {
  getLanguage,
  setLanguage,
  loadLanguage,
  t,
  getAvailableLanguages,
  initI18n,
  // Funções adicionais disponíveis no módulo modular:
  hasTranslation,
  getAllTranslations,
  // Constantes
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
  // Utilitários
  replacePlaceholders,
  hasPlaceholders,
  extractPlaceholders,
  validatePlaceholders,
  normalizeLanguageCode,
  // Detector
  detectLanguage,
  getBrowserLanguage,
  extractBaseLanguage,
  isLanguageSupported,
  // Storage
  saveLanguagePreference,
  loadLanguagePreference,
  clearLanguagePreference,
  // Traduções
  TRANSLATIONS,
} from "./i18n/index.js";
