/**
 * Application bootstrap and event wiring.
 */

import { initI18n } from "../i18n/index.js";
import { renderTasks } from "../ui/index.js";
import { queryAppElements } from "./app-dom.js";
import { bindClearButtons, bindFilters, bindKeyboard, bindTaskForm } from "./app-bindings.js";
import { getCurrentFilter, setActiveFilter } from "./app-filters.js";
import { bindLanguageSelector, updateTexts } from "./app-i18n.js";
import { bindThemeToggle, loadThemePreferences } from "./app-theme.js";

/**
 * Initializes i18n, theme, UI copy, task list, and all event listeners.
 */
export const initApp = () => {
  initI18n();

  const elements = queryAppElements();
  const filter = getCurrentFilter();

  loadThemePreferences(elements.themeToggle);
  updateTexts(filter);
  renderTasks(filter);
  setActiveFilter(elements.filterButtons, "filter-all");

  bindTaskForm(elements.form, elements.input);
  bindClearButtons(elements.btnClear, elements.btnClearAll, elements.filterButtons);
  bindFilters(elements.filterButtons);
  bindThemeToggle(elements.themeToggle);
  bindLanguageSelector(elements.languageSelector);
  bindKeyboard(elements);
};
