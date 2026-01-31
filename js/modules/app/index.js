/**
 * Módulo Principal da Aplicação - Ponto de Entrada
 *
 * Re-exporta todas as funcionalidades dos módulos especializados.
 * Estrutura modular para melhor organização e manutenibilidade.
 */

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

export {
  DEFAULT_THEME,
  CONTRAST_DEFAULT,
  THEME_STORAGE_KEY,
  CONTRAST_STORAGE_KEY,
  VALID_CONTRASTS,
  FILTER_MAP,
  SVG_NS,
  THEME_MAP,
} from "./app-config.js";

// ============================================================================
// GERENCIAMENTO DE TEMA
// ============================================================================

export {
  getCurrentTheme,
  getCurrentContrast,
  applyTheme,
  updateThemeToggle,
  updateContrastButtons,
  loadThemePreferences,
  toggleTheme,
  setContrast,
  toggleContrast,
} from "./app-theme.js";

// ============================================================================
// GERENCIAMENTO DE FILTROS
// ============================================================================

export {
  getCurrentFilter,
  setCurrentFilter,
  createFilterIcon,
  setActiveFilter,
  handleFilterClick,
  applyFilter,
} from "./app-filters.js";

// ============================================================================
// GERENCIAMENTO DE IDIOMA
// ============================================================================

export {
  updateTexts,
  closeLanguageMenu,
  createLanguageMenu,
  toggleLanguage,
} from "./app-i18n.js";
