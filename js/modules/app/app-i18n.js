/**
 * Language Management
 *
 * Manages language switching and interface text updates.
 */

import { getLanguage, setLanguage, t } from "../i18n/index.js";
import { renderTasks } from "../ui/index.js";

/**
 * Updates all static interface texts with the current language translations
 * @param {string} currentFilter - Current filter to re-render tasks
 */
export const updateTexts = (currentFilter) => {
  // Page elements
  const pageTitle = document.getElementById("page-title");
  const todoFormLabel = document.getElementById("todo-form-label");
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-button");

  // Filters
  const filterAll = document.getElementById("filter-all");
  const filterActive = document.getElementById("filter-active");
  const filterCompleted = document.getElementById("filter-completed");

  // Action buttons
  const clearCompletedBtn = document.getElementById("clear-completed");
  const clearAllBtn = document.getElementById("clear-all");

  // Language selector
  const languageSelector = document.getElementById("language-selector");
  const languageSelectorText = document.getElementById("language-selector-text");

  const todoFilters = document.querySelector(".todo-filters");
  const themeToggle = document.getElementById("theme-toggle");

  // Update texts
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

  if (todoFilters) {
    todoFilters.setAttribute("aria-label", t("ariaTaskFilters"));
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", t("ariaThemeToggle"));
  }

  // Re-render tasks to update dynamic content
  renderTasks(currentFilter);
};

/**
 * Closes the language selection menu
 * @param {HTMLElement|null} languageMenu - Language menu
 * @param {HTMLElement} languageSelector - Language selector button
 * @returns {null} Returns null to clear the menu reference
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
 * Creates and displays the language selection menu
 * @param {HTMLElement} languageSelector - Language selector button
 * @param {string} currentFilter - Current filter
 * @param {Function} onClose - Callback to close the menu
 * @returns {HTMLElement} Created menu
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

  // Position menu
  const rect = languageSelector.getBoundingClientRect();
  menu.style.position = "fixed";
  menu.style.top = `${rect.bottom + 4}px`;
  menu.style.right = `${window.innerWidth - rect.right}px`;

  document.body.append(menu);
  languageSelector.setAttribute("aria-expanded", "true");

  // Close when clicking outside the menu
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
 * Toggles between available languages (pt <-> en)
 * @param {string} currentFilter - Current filter
 */
export const toggleLanguage = (currentFilter) => {
  const currentLang = getLanguage();
  const nextLang = currentLang === "pt" ? "en" : "pt";
  setLanguage(nextLang);
  updateTexts(currentFilter);
};
