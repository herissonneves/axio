/**
 * Módulo Principal da Aplicação
 *
 * Ponto de entrada da aplicação que orquestra:
 * - Inicialização do sistema de internacionalização (i18n)
 * - Gerenciamento de temas e contraste
 * - Gerenciamento de filtros de tarefas
 * - Submissão de formulário e manipulação de tarefas
 * - Seletor de idioma
 * - Atalhos de teclado
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
// SELETORES DOM
// ============================================================================

/**
 * Busca e retorna referências aos elementos DOM principais
 * @returns {Object} Objeto com referências aos elementos DOM
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
// MANIPULADORES DE EVENTO
// ============================================================================

/**
 * Configura o manipulador de submissão do formulário
 * @param {HTMLFormElement} form - Elemento do formulário
 * @param {HTMLInputElement} input - Elemento de input
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
 * Configura os manipuladores dos botões de limpeza
 * @param {HTMLButtonElement} btnClear - Botão de limpar concluídas
 * @param {HTMLButtonElement} btnClearAll - Botão de limpar todas
 * @param {NodeList} filterButtons - Botões de filtro
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
 * Configura os manipuladores dos botões de filtro
 * @param {NodeList} filterButtons - Botões de filtro
 */
const setupFilterHandlers = (filterButtons) => {
  filterButtons.forEach((button) =>
    button.addEventListener("click", (event) =>
      handleFilterClick(filterButtons, event),
    ),
  );
};

/**
 * Configura os manipuladores de tema e contraste
 * @param {HTMLButtonElement} themeToggle - Botão de alternância de tema
 * @param {NodeList} contrastButtons - Botões de seleção de contraste
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
 * Configura os manipuladores do seletor de idioma
 * @param {HTMLButtonElement} languageSelector - Botão seletor de idioma
 * @returns {Object} Objeto com getter/setter para o menu de idioma
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
 * Configura os atalhos de teclado da aplicação
 * @param {HTMLInputElement} input - Input de tarefa
 * @param {HTMLButtonElement} themeToggle - Botão de tema
 * @param {NodeList} contrastButtons - Botões de contraste
 * @param {NodeList} filterButtons - Botões de filtro
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
// INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializa a aplicação
 */
const initApp = () => {
  // Inicializar sistema de internacionalização
  initI18n();

  // Buscar elementos DOM
  const elements = getDOMElements();

  // Carregar preferências de tema e contraste
  loadThemePreferences(elements.themeToggle, elements.contrastButtons);

  // Atualizar textos com idioma atual
  updateTexts(getCurrentFilter());

  // Renderizar tarefas e definir filtro inicial
  renderTasks(getCurrentFilter());
  setActiveFilter(elements.filterButtons, "filter-all");

  // Configurar manipuladores de eventos
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
// PONTO DE ENTRADA
// ============================================================================

/**
 * Inicialização da aplicação ao carregar o DOM
 */
document.addEventListener("DOMContentLoaded", initApp);
