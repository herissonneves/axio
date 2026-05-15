/**
 * Main Application Module
 *
 * Application entry point that orchestrates:
 * - Internationalization (i18n) system initialization
 * - Theme and contrast management
 * - Task filter management
 * - Form submission and task handling
 * - Language selector
 * - Keyboard shortcuts
 */

import { addTask, clearCompleted, clearAll } from "./modules/todo.js";
import { renderTasks } from "./modules/ui/index.js";
import { initI18n } from "./modules/i18n/index.js";
import {
  initKeyboardShortcuts,
  showKeyboardShortcutsDialog,
} from "./modules/keyboard/index.js";
import {
  loadThemePreferences,
  toggleTheme,
  toggleContrast,
  setContrast,
} from "./modules/app/index.js";
import {
  getCurrentFilter,
  setActiveFilter,
  handleFilterClick,
  applyFilter,
} from "./modules/app/index.js";
import {
  updateTexts,
  toggleLanguage,
  closeLanguageMenu,
  createLanguageMenu,
} from "./modules/app/index.js";

// ============================================================================
// DOM SELECTORS
// ============================================================================

/**
 * Fetches and returns references to main DOM elements
 * @returns {Object} Object with DOM element references
 */
const getDOMElements = () => ({
  themeToggle: document.getElementById("theme-toggle"),
  contrastButtons: document.querySelectorAll(".contrast-selector__btn"),
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  btnClear: document.getElementById("clear-completed"),
  btnClearAll: document.getElementById("clear-all"),
  filterButtons: document.querySelectorAll(".todo-filters__button"),
  languageSelector: document.getElementById("language-selector"),
});

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Sets up the form submission handler
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLInputElement} input - Input element
 */
const setupFormHandler = (form, input) => {
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks(getCurrentFilter());

    input.value = "";
    input.focus();
  });
};

/**
 * Sets up clear button handlers
 * @param {HTMLButtonElement} btnClear - Clear completed button
 * @param {HTMLButtonElement} btnClearAll - Clear all button
 * @param {NodeList} filterButtons - Filter buttons
 */
const setupClearHandlers = (btnClear, btnClearAll, filterButtons) => {
  btnClear?.addEventListener("click", () => {
    clearCompleted();

    const currentFilter = getCurrentFilter();
    if (currentFilter === "completed") {
      applyFilter(filterButtons, "all", "filter-all");
    } else {
      renderTasks(currentFilter);
    }

    btnClear.blur();
  });

  btnClearAll?.addEventListener("click", () => {
    clearAll();
    applyFilter(filterButtons, "all", "filter-all");
    btnClearAll.blur();
  });
};

/**
 * Sets up filter button handlers
 * @param {NodeList} filterButtons - Filter buttons
 */
const setupFilterHandlers = (filterButtons) => {
  filterButtons.forEach((button) =>
    button.addEventListener("click", (event) =>
      handleFilterClick(filterButtons, event),
    ),
  );
};

/**
 * Sets up theme and contrast handlers
 * @param {HTMLButtonElement} themeToggle - Theme toggle button
 * @param {NodeList} contrastButtons - Contrast selector buttons
 */
const setupThemeHandlers = (themeToggle, contrastButtons) => {
  themeToggle?.addEventListener("click", () => toggleTheme(themeToggle));

  contrastButtons.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      const value = event.currentTarget.dataset.contrast;
      setContrast(contrastButtons, value);
    }),
  );
};

/**
 * Sets up language selector handlers
 * @param {HTMLButtonElement} languageSelector - Language selector button
 * @returns {Object} Object with getter/setter for the language menu
 */
const setupLanguageHandlers = (languageSelector) => {
  let languageMenu = null;

  languageSelector?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (languageMenu) {
      languageMenu = closeLanguageMenu(languageMenu, languageSelector);
    } else {
      languageMenu = createLanguageMenu(
        languageSelector,
        getCurrentFilter(),
        () => {
          languageMenu = closeLanguageMenu(languageMenu, languageSelector);
        },
      );
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && languageMenu) {
      languageMenu = closeLanguageMenu(languageMenu, languageSelector);
    }
  });

  return {
    get menu() {
      return languageMenu;
    },
    set menu(value) {
      languageMenu = value;
    },
  };
};

/**
 * Sets up application keyboard shortcuts
 * @param {HTMLInputElement} input - Task input
 * @param {HTMLButtonElement} themeToggle - Theme button
 * @param {NodeList} contrastButtons - Contrast buttons
 * @param {NodeList} filterButtons - Filter buttons
 */
const setupKeyboardShortcuts = (input, themeToggle, contrastButtons, filterButtons) => {
  initKeyboardShortcuts({
    focusInput: () => input?.focus(),
    toggleTheme: () => toggleTheme(themeToggle),
    toggleContrast: () => toggleContrast(contrastButtons),
    toggleLanguage: () => toggleLanguage(getCurrentFilter()),
    setFilterAll: () => applyFilter(filterButtons, "all", "filter-all"),
    setFilterActive: () => applyFilter(filterButtons, "active", "filter-active"),
    setFilterCompleted: () => applyFilter(filterButtons, "completed", "filter-completed"),
    clearCompleted: () => {
      clearCompleted();
      const currentFilter = getCurrentFilter();
      if (currentFilter === "completed") {
        applyFilter(filterButtons, "all", "filter-all");
      } else {
        renderTasks(currentFilter);
      }
    },
    clearAll: () => {
      clearAll();
      applyFilter(filterButtons, "all", "filter-all");
    },
    showHelp: showKeyboardShortcutsDialog,
  });
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initializes the application
 */
const initApp = () => {
  // Initialize internationalization system
  initI18n();

  // Fetch DOM elements
  const elements = getDOMElements();

  // Load theme and contrast preferences
  loadThemePreferences(elements.themeToggle, elements.contrastButtons);

  // Update texts with current language
  updateTexts(getCurrentFilter());

  // Render tasks and set initial filter
  renderTasks(getCurrentFilter());
  setActiveFilter(elements.filterButtons, "filter-all");

  // Set up event handlers
  setupFormHandler(elements.form, elements.input);
  setupClearHandlers(elements.btnClear, elements.btnClearAll, elements.filterButtons);
  setupFilterHandlers(elements.filterButtons);
  setupThemeHandlers(elements.themeToggle, elements.contrastButtons);
  setupLanguageHandlers(elements.languageSelector);
  setupKeyboardShortcuts(
    elements.input,
    elements.themeToggle,
    elements.contrastButtons,
    elements.filterButtons,
  );
};

// ============================================================================
// ENTRY POINT
// ============================================================================

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", initApp);
