/**
 * Gerenciamento de Idioma
 * 
 * Gerencia a mudança de idioma e atualização de textos da interface.
 */

import { getLanguage, setLanguage, t } from "../i18n.js";
import { renderTasks } from "../ui.js";

/**
 * Atualiza todos os textos estáticos da interface com as traduções do idioma atual
 * @param {string} currentFilter - Filtro atual para re-renderizar as tarefas
 */
export const updateTexts = (currentFilter) => {
  // Elementos da página
  const pageTitle = document.getElementById("page-title");
  const todoFormLabel = document.getElementById("todo-form-label");
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-button");
  
  // Filtros
  const filterAll = document.getElementById("filter-all");
  const filterActive = document.getElementById("filter-active");
  const filterCompleted = document.getElementById("filter-completed");
  
  // Botões de ação
  const clearCompletedBtn = document.getElementById("clear-completed");
  const clearAllBtn = document.getElementById("clear-all");
  
  // Seletor de idioma
  const languageSelector = document.getElementById("language-selector");
  const languageSelectorText = document.getElementById("language-selector-text");
  
  // Controles de tema
  const themeControls = document.querySelector(".theme-controls");
  const todoFilters = document.querySelector(".todo-filters");
  const themeToggle = document.getElementById("theme-toggle");

  // Atualizar textos
  if (pageTitle) pageTitle.textContent = t("pageTitle");
  if (todoFormLabel) todoFormLabel.textContent = t("taskDescription");
  if (todoInput) todoInput.placeholder = t("addTaskPlaceholder");
  if (addTaskButton) addTaskButton.textContent = t("addTaskButton");
  
  if (filterAll) filterAll.textContent = t("filterAll");
  if (filterActive) filterActive.textContent = t("filterActive");
  if (filterCompleted) filterCompleted.textContent = t("filterCompleted");
  
  if (clearCompletedBtn) {
    clearCompletedBtn.textContent = t("clearCompleted");
    clearCompletedBtn.setAttribute("aria-label", t("ariaClearCompleted"));
  }
  
  if (clearAllBtn) {
    clearAllBtn.textContent = t("clearAll");
    clearAllBtn.setAttribute("aria-label", t("ariaClearAll"));
  }
  
  if (languageSelector) {
    languageSelector.setAttribute("aria-label", t("ariaLanguageSelector"));
    const currentLang = getLanguage();
    if (languageSelectorText) {
      languageSelectorText.textContent = currentLang.toUpperCase();
    }
  }
  
  if (themeControls) {
    themeControls.setAttribute("aria-label", t("ariaThemeSettings"));
  }
  
  if (todoFilters) {
    todoFilters.setAttribute("aria-label", t("ariaTaskFilters"));
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", t("ariaThemeToggle"));
  }

  // Atualizar botões de contraste
  const contrastButtons = document.querySelectorAll(".contrast-selector__btn");
  contrastButtons.forEach((btn) => {
    const contrast = btn.dataset.contrast;
    if (contrast === "default") {
      btn.setAttribute("aria-label", t("ariaDefaultContrast"));
    } else if (contrast === "medium") {
      btn.setAttribute("aria-label", t("ariaMediumContrast"));
    } else if (contrast === "high") {
      btn.setAttribute("aria-label", t("ariaHighContrast"));
    }
  });

  // Re-renderizar tarefas para atualizar conteúdo dinâmico
  renderTasks(currentFilter);
};

/**
 * Fecha o menu de seleção de idioma
 * @param {HTMLElement|null} languageMenu - Menu de idioma
 * @param {HTMLElement} languageSelector - Botão seletor de idioma
 * @returns {null} Retorna null para limpar a referência ao menu
 */
export const closeLanguageMenu = (languageMenu, languageSelector) => {
  if (languageMenu) {
    languageMenu.remove();
  }
  if (languageSelector) {
    languageSelector.setAttribute("aria-expanded", "false");
  }
  return null;
};

/**
 * Cria e exibe o menu de seleção de idioma
 * @param {HTMLElement} languageSelector - Botão seletor de idioma
 * @param {string} currentFilter - Filtro atual
 * @param {Function} onClose - Callback para fechar o menu
 * @returns {HTMLElement} Menu criado
 */
export const createLanguageMenu = (languageSelector, currentFilter, onClose) => {
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
      updateTexts(currentFilter);
      onClose();
    });

    menu.append(item);
  });

  // Posicionar menu
  const rect = languageSelector.getBoundingClientRect();
  menu.style.position = "fixed";
  menu.style.top = `${rect.bottom + 4}px`;
  menu.style.right = `${window.innerWidth - rect.right}px`;

  document.body.append(menu);
  languageSelector.setAttribute("aria-expanded", "true");

  // Fechar ao clicar fora do menu
  setTimeout(() => {
    const handleClickOutside = (event) => {
      if (!menu.contains(event.target) && event.target !== languageSelector) {
        onClose();
        document.removeEventListener("click", handleClickOutside);
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, 0);

  return menu;
};

/**
 * Alterna entre os idiomas disponíveis (pt <-> en)
 * @param {string} currentFilter - Filtro atual
 */
export const toggleLanguage = (currentFilter) => {
  const currentLang = getLanguage();
  const nextLang = currentLang === "pt" ? "en" : "pt";
  setLanguage(nextLang);
  updateTexts(currentFilter);
};
