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
import { renderTasks } from "./modules/ui.js";
import { initI18n } from "./modules/i18n.js";
import {
  initKeyboardShortcuts,
  showKeyboardShortcutsDialog,
} from "./modules/keyboard.js";
import {
  loadThemePreferences,
  toggleTheme,
  toggleContrast,
  setContrast,
  getCurrentContrast,
  getCurrentTheme,
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

/**
 * Inicialização da aplicação ao carregar o DOM
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar sistema de internacionalização
  initI18n();

  // ============================================================================
  // ELEMENTOS DO DOM
  // ============================================================================

  const themeToggle = document.getElementById("theme-toggle");
  const contrastButtons = document.querySelectorAll(".contrast-selector__btn");
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const btnClear = document.getElementById("clear-completed");
  const btnClearAll = document.getElementById("clear-all");
  const filterButtons = document.querySelectorAll(".todo-filters__button");
  const languageSelector = document.getElementById("language-selector");

  let languageMenu = null;

  // ============================================================================
  // INICIALIZAÇÃO
  // ============================================================================

  // Carregar preferências de tema e contraste
  loadThemePreferences(themeToggle, contrastButtons);

  // Atualizar textos com idioma atual
  updateTexts(getCurrentFilter());

  // Renderizar tarefas e definir filtro inicial
  renderTasks(getCurrentFilter());
  setActiveFilter(filterButtons, "filter-all");

  // ============================================================================
  // MANIPULADORES DE FORMULÁRIO
  // ============================================================================

  /**
   * Manipula a submissão do formulário de adicionar tarefa
   */
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks(getCurrentFilter());

    input.value = "";
    input.focus();
  });

  // ============================================================================
  // MANIPULADORES DE BOTÕES DE LIMPEZA
  // ============================================================================

  /**
   * Manipula o clique no botão de limpar tarefas concluídas
   */
  btnClear?.addEventListener("click", () => {
    clearCompleted();

    // Se o filtro atual for "completed", mudar para "all"
    const currentFilter = getCurrentFilter();
    if (currentFilter === "completed") {
      applyFilter(filterButtons, "all", "filter-all");
    } else {
      renderTasks(currentFilter);
    }

    btnClear.blur();
  });

  /**
   * Manipula o clique no botão de limpar todas as tarefas
   */
  btnClearAll?.addEventListener("click", () => {
    clearAll();
    applyFilter(filterButtons, "all", "filter-all");
    btnClearAll.blur();
  });

  // ============================================================================
  // MANIPULADORES DE FILTROS
  // ============================================================================

  /**
   * Adiciona event listeners aos botões de filtro
   */
  filterButtons.forEach((button) =>
    button.addEventListener("click", (event) =>
      handleFilterClick(filterButtons, event),
    ),
  );

  // ============================================================================
  // MANIPULADORES DE TEMA E CONTRASTE
  // ============================================================================

  /**
   * Manipula o clique no botão de alternância de tema
   */
  themeToggle?.addEventListener("click", () => toggleTheme(themeToggle));

  /**
   * Manipula o clique em um botão de seleção de contraste
   */
  contrastButtons.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      const value = event.currentTarget.dataset.contrast;
      setContrast(contrastButtons, value);
    }),
  );

  // ============================================================================
  // MANIPULADORES DE SELETOR DE IDIOMA
  // ============================================================================

  /**
   * Manipula o clique no seletor de idioma
   */
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

  /**
   * Fechar menu de idioma ao pressionar Escape
   */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && languageMenu) {
      languageMenu = closeLanguageMenu(languageMenu, languageSelector);
    }
  });

  // ============================================================================
  // ATALHOS DE TECLADO
  // ============================================================================

  /**
   * Inicializa o sistema de atalhos de teclado
   */
  initKeyboardShortcuts({
    focusInput: () => {
      input?.focus();
    },
    toggleTheme: () => toggleTheme(themeToggle),
    toggleContrast: () => toggleContrast(contrastButtons),
    toggleLanguage: () => toggleLanguage(getCurrentFilter()),
    setFilterAll: () => {
      applyFilter(filterButtons, "all", "filter-all");
    },
    setFilterActive: () => {
      applyFilter(filterButtons, "active", "filter-active");
    },
    setFilterCompleted: () => {
      applyFilter(filterButtons, "completed", "filter-completed");
    },
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
});
