/**
 * Test Runner UI Manager
 *
 * Manages the user interface for running tests:
 * - Internationalization
 * - Theme management
 * - Language menu
 * - Test execution and result display
 */

import { initI18n, setLanguage, getLanguage, t } from "../js/modules/i18n/index.js";

let runner, output, resultsDiv;
let logOutput = "";
let currentTheme = "light";
let languageMenu = null;

// ============================================================================
// INTERNATIONALIZATION
// ============================================================================

/**
 * Updates all UI text according to the current language
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
// THEME MANAGEMENT
// ============================================================================

const THEME_STORAGE_KEY = "todo-theme";

/**
 * Loads the theme from localStorage and applies it
 */
export function loadTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  currentTheme = stored === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
  updateThemeToggle();
}

/**
 * Updates the theme toggle button
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
 * Toggles between light and dark theme
 */
export function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  updateThemeToggle();
}

// ============================================================================
// LANGUAGE MENU
// ============================================================================

/**
 * Closes the language menu if open
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
 * Creates and displays the language selection menu
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

  // Close when clicking outside
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
// TEST EXECUTION
// ============================================================================

/**
 * Captures console.log and console.error for display in the UI
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
 * Registers and runs all tests
 */
async function runAllTests() {
  try {
    logOutput = "";
    resultsDiv.innerHTML = "";
    output.textContent = `${t("executingTests")}\n\n`;

    runner = new (await import("./test-runner.js")).default();

    // Import and register all tests
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
        console.error(`Error registering ${module.name} tests:`, error);
        output.textContent += `${t("errorRegisteringTests", "Error registering tests")} (${module.name}): ${error.message}\n`;
      }
    }

    // Run tests
    try {
      await runner.run();
    } catch (error) {
      console.error("Error running tests:", error);
      output.textContent += `${t("errorRunningTests")}: ${error.message}\n`;
    }

    // Display results
    output.textContent = logOutput || output.textContent || t("noOutputCaptured");
    resultsDiv.innerHTML = runner.getResultsHTML(t);
  } catch (error) {
    console.error("General error:", error);
    output.textContent = `${t("errorRunningTests")}: ${error.message}\n\n${error.stack || ""}`;
    resultsDiv.innerHTML = `<div class="test-result test-failed"><span class="test-icon">✗</span><span class="test-name">${t("errorRunningTests")}</span><div class="test-error">${error.message}</div></div>`;
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initializes the test interface
 */
export async function initTestUI() {
  try {
    // Import test runner
    const TestRunnerModule = await import("./test-runner.js");
    const TestRunner = TestRunnerModule.default || TestRunnerModule.TestRunner;

    // Initialize DOM elements
    runner = new TestRunner();
    output = document.getElementById("test-output");
    resultsDiv = document.getElementById("test-results");

    // Set up console capture
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

    // Close language menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && languageMenu) {
        closeLanguageMenu();
      }
    });

    // Initialize theme and text
    initI18n();
    loadTheme();
    updateTexts();
  } catch (error) {
    console.error("Error loading modules:", error);
    const errorMsg = typeof t === "function" ? t("errorLoadingModules") : "Error loading modules";
    const httpMsg = typeof t === "function" ? t("ensureHttpServer") : "Make sure you are running on an HTTP server (not file://)";
    document.getElementById("test-output").textContent = `${errorMsg}: ${error.message}\n\n${error.stack || ""}\n\n${httpMsg}`;
    document.getElementById("run-tests").disabled = true;
  }
}
