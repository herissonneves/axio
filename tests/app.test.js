/**
 * Testes para o Módulo App
 * 
 * Testa os módulos de configuração da aplicação:
 * - app-theme.js: Gerenciamento de tema e contraste
 * - app-filters.js: Gerenciamento de filtros
 * - app-config.js: Constantes e configurações
 */

import {
  DEFAULT_THEME,
  CONTRAST_DEFAULT,
  THEME_STORAGE_KEY,
  CONTRAST_STORAGE_KEY,
  VALID_CONTRASTS,
  FILTER_MAP,
  THEME_MAP,
} from "../js/modules/app/app-config.js";

import {
  getCurrentTheme,
  getCurrentContrast,
  applyTheme,
  loadThemePreferences,
  toggleTheme,
  setContrast,
  toggleContrast,
} from "../js/modules/app/app-theme.js";

import {
  getCurrentFilter,
  setCurrentFilter,
} from "../js/modules/app/app-filters.js";

/**
 * Registra todos os testes do módulo app
 * @param {TestRunner} runner - Instância do executor de testes
 */
export function runAppTests(runner) {
  runner.category("Testes do Módulo App");

  // ============================================================================
  // TESTES DE app-config.js
  // ============================================================================

  runner.test("app-config: DEFAULT_THEME é 'light'", () => {
    runner.assertEquals(DEFAULT_THEME, "light");
  });

  runner.test("app-config: CONTRAST_DEFAULT é 'default'", () => {
    runner.assertEquals(CONTRAST_DEFAULT, "default");
  });

  runner.test("app-config: VALID_CONTRASTS contém todos os níveis", () => {
    runner.assertTrue(VALID_CONTRASTS.includes("default"));
    runner.assertTrue(VALID_CONTRASTS.includes("medium"));
    runner.assertTrue(VALID_CONTRASTS.includes("high"));
    runner.assertEquals(VALID_CONTRASTS.length, 3);
  });

  runner.test("app-config: FILTER_MAP mapeia IDs para valores", () => {
    runner.assertEquals(FILTER_MAP["filter-all"], "all");
    runner.assertEquals(FILTER_MAP["filter-active"], "active");
    runner.assertEquals(FILTER_MAP["filter-completed"], "completed");
  });

  runner.test("app-config: THEME_MAP contém todas combinações", () => {
    // Light theme
    runner.assertEquals(THEME_MAP.light.default, "light");
    runner.assertEquals(THEME_MAP.light.medium, "light-medium-contrast");
    runner.assertEquals(THEME_MAP.light.high, "light-high-contrast");

    // Dark theme
    runner.assertEquals(THEME_MAP.dark.default, "dark");
    runner.assertEquals(THEME_MAP.dark.medium, "dark-medium-contrast");
    runner.assertEquals(THEME_MAP.dark.high, "dark-high-contrast");
  });

  // ============================================================================
  // TESTES DE app-theme.js
  // ============================================================================

  runner.test("app-theme: getCurrentTheme retorna tema atual", () => {
    const theme = getCurrentTheme();
    runner.assertTrue(theme === "light" || theme === "dark");
  });

  runner.test("app-theme: getCurrentContrast retorna contraste atual", () => {
    const contrast = getCurrentContrast();
    runner.assertTrue(VALID_CONTRASTS.includes(contrast));
  });

  runner.test("app-theme: applyTheme define data-theme no documento", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true); // Skip em ambiente não-browser
      return;
    }

    applyTheme("dark", "default");
    runner.assertEquals(document.documentElement.dataset.theme, "dark");

    applyTheme("light", "medium");
    runner.assertEquals(document.documentElement.dataset.theme, "light-medium-contrast");

    applyTheme("dark", "high");
    runner.assertEquals(document.documentElement.dataset.theme, "dark-high-contrast");
  });

  runner.test("app-theme: setContrast valida contraste antes de aplicar", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Criar mock buttons
    const buttons = [];
    const result1 = setContrast(buttons, "invalid");
    runner.assertFalse(result1);

    const result2 = setContrast(buttons, "medium");
    runner.assertTrue(result2);

    const result3 = setContrast(buttons, "high");
    runner.assertTrue(result3);
  });

  runner.test("app-theme: toggleContrast cicla entre níveis", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const buttons = [];
    
    // Deve ciclar: default -> medium -> high -> default
    setContrast(buttons, "default");
    let next = toggleContrast(buttons);
    runner.assertEquals(next, "medium");

    next = toggleContrast(buttons);
    runner.assertEquals(next, "high");

    next = toggleContrast(buttons);
    runner.assertEquals(next, "default");
  });

  runner.test("app-theme: loadThemePreferences carrega de localStorage", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Salvar preferências
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    localStorage.setItem(CONTRAST_STORAGE_KEY, "high");

    // Carregar
    const result = loadThemePreferences(null, []);
    
    runner.assertEquals(result.theme, "dark");
    runner.assertEquals(result.contrast, "high");

    // Limpar
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(CONTRAST_STORAGE_KEY);
  });

  runner.test("app-theme: loadThemePreferences usa defaults se não houver dados", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Garantir que não há dados
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(CONTRAST_STORAGE_KEY);

    const result = loadThemePreferences(null, []);
    
    runner.assertEquals(result.theme, DEFAULT_THEME);
    runner.assertEquals(result.contrast, CONTRAST_DEFAULT);
  });

  // ============================================================================
  // TESTES DE app-filters.js
  // ============================================================================

  runner.test("app-filters: getCurrentFilter retorna filtro atual", () => {
    const filter = getCurrentFilter();
    runner.assertTrue(
      filter === "all" || filter === "active" || filter === "completed"
    );
  });

  runner.test("app-filters: setCurrentFilter define filtro atual", () => {
    setCurrentFilter("active");
    runner.assertEquals(getCurrentFilter(), "active");

    setCurrentFilter("completed");
    runner.assertEquals(getCurrentFilter(), "completed");

    setCurrentFilter("all");
    runner.assertEquals(getCurrentFilter(), "all");
  });

  runner.test("app-filters: filtro persiste entre chamadas", () => {
    setCurrentFilter("completed");
    runner.assertEquals(getCurrentFilter(), "completed");
    
    // Verificar que persiste
    runner.assertEquals(getCurrentFilter(), "completed");
    
    // Reset para all
    setCurrentFilter("all");
  });

  // ============================================================================
  // TESTES DE INTEGRAÇÃO app/*
  // ============================================================================

  runner.test("app: tema e contraste trabalham juntos", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Aplicar light + medium
    applyTheme("light", "medium");
    runner.assertEquals(document.documentElement.dataset.theme, "light-medium-contrast");

    // Aplicar dark + high
    applyTheme("dark", "high");
    runner.assertEquals(document.documentElement.dataset.theme, "dark-high-contrast");

    // Aplicar light + default
    applyTheme("light", "default");
    runner.assertEquals(document.documentElement.dataset.theme, "light");
  });

  runner.test("app: configurações persistem no localStorage", () => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const buttons = [];
    
    // Definir tema e contraste
    const mockToggle = { classList: { toggle: () => {}, add: () => {}, remove: () => {} }, setAttribute: () => {} };
    toggleTheme(mockToggle);
    setContrast(buttons, "medium");

    // Verificar localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const savedContrast = localStorage.getItem(CONTRAST_STORAGE_KEY);

    runner.assertTrue(savedTheme === "light" || savedTheme === "dark");
    runner.assertEquals(savedContrast, "medium");

    // Limpar
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(CONTRAST_STORAGE_KEY);
  });
}
