/**
 * Test Runner UI Manager
 * 
 * Gerencia a interface do usuário para execução de testes:
 * - Internacionalização
 * - Gerenciamento de tema
 * - Menu de idiomas
 * - Execução e exibição de resultados
 */

import { initI18n, setLanguage, getLanguage, t } from "../js/modules/i18n/index.js";

let runner, output, resultsDiv;
let logOutput = "";
let currentTheme = "light";
let languageMenu = null;

// ============================================================================
// INTERNACIONALIZAÇÃO
// ============================================================================

/**
 * Atualiza todos os textos da interface conforme o idioma atual
 */
export function updateTexts() {
  const elements = {
    pageTitle: document.getElementById("test-page-title"),
    pageDescription: document.getElementById("test-page-description"),
    runButton: document.getElementById("run-tests"),
    languageSelector: document.getElementById("language-selector"),
    languageSelectorText: document.getElementById("language-selector-text"),
    themeToggle: document.getElementById("theme-toggle"),
  };

  if (elements.pageTitle) {
    elements.pageTitle.textContent = `🧪 ${t("testPageTitle")} - Axio`;
  }
  if (elements.pageDescription) {
    elements.pageDescription.textContent = t("testPageDescription");
  }
  if (elements.runButton) {
    elements.runButton.textContent = t("runTests");
  }
  if (elements.languageSelector) {
    elements.languageSelector.setAttribute("aria-label", t("ariaLanguageSelector"));
  }
  if (elements.languageSelectorText) {
    const lang = getLanguage();
    elements.languageSelectorText.textContent = lang.toUpperCase();
  }
  if (elements.themeToggle) {
    elements.themeToggle.setAttribute("aria-label", t("ariaThemeToggle"));
  }
}

// ============================================================================
// GERENCIAMENTO DE TEMA
// ============================================================================

const THEME_STORAGE_KEY = "todo-theme";

/**
 * Carrega o tema do localStorage e aplica
 */
export function loadTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  currentTheme = stored === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
  updateThemeToggle();
}

/**
 * Atualiza o botão de alternância de tema
 */
function updateThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const isDark = currentTheme === "dark";
  toggle.classList.toggle("theme-toggle--dark", isDark);
  toggle.classList.toggle("theme-toggle--light", !isDark);
  toggle.setAttribute("aria-pressed", String(isDark));
}

/**
 * Alterna entre tema claro e escuro
 */
export function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  updateThemeToggle();
}

// ============================================================================
// MENU DE IDIOMAS
// ============================================================================

/**
 * Fecha o menu de idiomas se estiver aberto
 */
export function closeLanguageMenu() {
  if (languageMenu) {
    languageMenu.remove();
    languageMenu = null;
  }
  const selector = document.getElementById("language-selector");
  if (selector) {
    selector.setAttribute("aria-expanded", "false");
  }
}

/**
 * Cria e exibe o menu de seleção de idiomas
 */
export function createLanguageMenu() {
  closeLanguageMenu();

  const menu = document.createElement("div");
  menu.classList.add("language-menu");
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", t("ariaLanguageSelector"));

  const languages = [
    { code: "pt", name: t("languagePortuguese") },
    { code: "en", name: t("languageEnglish") },
  ];

  languages.forEach((lang) => {
    const item = document.createElement("button");
    item.classList.add("language-menu__item");
    if (getLanguage() === lang.code) {
      item.classList.add("language-menu__item--active");
    }
    item.setAttribute("role", "menuitem");
    item.textContent = lang.name;

    item.addEventListener("click", () => {
      setLanguage(lang.code);
      updateTexts();
      if (runner) {
        resultsDiv.innerHTML = runner.getResultsHTML(t);
      }
      closeLanguageMenu();
    });

    menu.append(item);
  });

  const selector = document.getElementById("language-selector");
  const rect = selector.getBoundingClientRect();
  menu.style.position = "fixed";
  menu.style.top = `${rect.bottom + 4}px`;
  menu.style.right = `${window.innerWidth - rect.right}px`;

  document.body.append(menu);
  languageMenu = menu;
  selector.setAttribute("aria-expanded", "true");

  // Fechar ao clicar fora
  setTimeout(() => {
    const handleClickOutside = (event) => {
      if (!menu.contains(event.target) && event.target !== selector) {
        closeLanguageMenu();
        document.removeEventListener("click", handleClickOutside);
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, 0);
}

// ============================================================================
// EXECUÇÃO DE TESTES
// ============================================================================

/**
 * Captura console.log e console.error para exibição na UI
 */
function setupConsoleCapture() {
  const originalLog = console.log;
  const originalError = console.error;

  console.log = (...args) => {
    logOutput += args.join(" ") + "\n";
    originalLog(...args);
  };

  console.error = (...args) => {
    logOutput += args.join(" ") + "\n";
    originalError(...args);
  };
}

/**
 * Registra e executa todos os testes
 */
async function runAllTests() {
  try {
    logOutput = "";
    resultsDiv.innerHTML = "";
    output.textContent = `${t("executingTests")}\n\n`;

    runner = new (await import("./test-runner.js")).default();

    // Importar e registrar todos os testes
    const testModules = [
      { name: "Storage", path: "./unit/storage.test.js", fn: "runStorageTests" },
      { name: "Todo", path: "./unit/todo.test.js", fn: "runTodoTests" },
      { name: "i18n", path: "./unit/i18n.test.js", fn: "runI18nTests" },
      { name: "Keyboard", path: "./unit/keyboard.test.js", fn: "runKeyboardTests" },
      { name: "Integration", path: "./integration/integration.test.js", fn: "runIntegrationTests" },
      { name: "App", path: "./unit/app.test.js", fn: "runAppTests" },
      { name: "UI", path: "./unit/ui.test.js", fn: "runUITests" },
    ];

    for (const module of testModules) {
      try {
        const testModule = await import(module.path);
        testModule[module.fn](runner);
      } catch (error) {
        console.error(`Erro ao registrar testes de ${module.name}:`, error);
        output.textContent += `${t("errorRegisteringTests", "Error registering tests")} (${module.name}): ${error.message}\n`;
      }
    }

    // Executar testes
    try {
      await runner.run();
    } catch (error) {
      console.error("Erro ao executar testes:", error);
      output.textContent += `${t("errorRunningTests")}: ${error.message}\n`;
    }

    // Exibir resultados
    output.textContent = logOutput || output.textContent || t("noOutputCaptured");
    resultsDiv.innerHTML = runner.getResultsHTML(t);
  } catch (error) {
    console.error("Erro geral:", error);
    output.textContent = `${t("errorRunningTests")}: ${error.message}\n\n${error.stack || ""}`;
    resultsDiv.innerHTML = `<div class="test-result test-failed"><span class="test-icon">✗</span><span class="test-name">${t("errorRunningTests")}</span><div class="test-error">${error.message}</div></div>`;
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializa a interface de testes
 */
export async function initTestUI() {
  try {
    // Importar test runner
    const TestRunnerModule = await import("./test-runner.js");
    const TestRunner = TestRunnerModule.default || TestRunnerModule.TestRunner;

    // Inicializar elementos do DOM
    runner = new TestRunner();
    output = document.getElementById("test-output");
    resultsDiv = document.getElementById("test-results");

    // Configurar captura de console
    setupConsoleCapture();

    // Event listeners
    document.getElementById("run-tests")?.addEventListener("click", runAllTests);
    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
    document.getElementById("language-selector")?.addEventListener("click", (event) => {
      event.stopPropagation();
      if (languageMenu) {
        closeLanguageMenu();
      } else {
        createLanguageMenu();
      }
    });

    // Fechar menu de idiomas com Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && languageMenu) {
        closeLanguageMenu();
      }
    });

    // Inicializar tema e textos
    initI18n();
    loadTheme();
    updateTexts();
  } catch (error) {
    console.error("Erro ao carregar módulos:", error);
    const errorMsg = typeof t === "function" ? t("errorLoadingModules") : "Error loading modules";
    const httpMsg = typeof t === "function" ? t("ensureHttpServer") : "Make sure you are running on an HTTP server (not file://)";
    document.getElementById("test-output").textContent = `${errorMsg}: ${error.message}\n\n${error.stack || ""}\n\n${httpMsg}`;
    document.getElementById("run-tests").disabled = true;
  }
}
