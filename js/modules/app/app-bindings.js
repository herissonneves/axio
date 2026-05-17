/**
 * Event bindings for the main application shell.
 */

import { addTask } from "../todo.js";
import { renderTasks } from "../ui/index.js";
import {
  initKeyboardShortcuts,
  showKeyboardShortcutsDialog,
} from "../keyboard/index.js";
import { applyFilter, getCurrentFilter, handleFilterClick } from "./app-filters.js";
import { toggleLanguage } from "./app-i18n.js";
import { toggleTheme } from "./app-theme.js";
import { runClearAll, runClearCompleted } from "./app-actions.js";

/** @typedef {import("./app-dom.js").AppElements} AppElements */

/**
 * @param {HTMLFormElement | null} form
 * @param {HTMLInputElement | null} input
 */
export const bindTaskForm = (form, input) => {
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
 * @param {HTMLButtonElement | null} btnClear
 * @param {HTMLButtonElement | null} btnClearAll
 * @param {AppElements["filterButtons"]} filterButtons
 */
export const bindClearButtons = (btnClear, btnClearAll, filterButtons) => {
  btnClear?.addEventListener("click", () => {
    runClearCompleted(filterButtons);
    btnClear.blur();
  });

  btnClearAll?.addEventListener("click", () => {
    runClearAll(filterButtons);
    btnClearAll.blur();
  });
};

/**
 * @param {AppElements["filterButtons"]} filterButtons
 */
export const bindFilters = (filterButtons) => {
  filterButtons.forEach((button) =>
    button.addEventListener("click", (event) => handleFilterClick(filterButtons, event)),
  );
};

/**
 * @param {Pick<AppElements, "input" | "themeToggle" | "filterButtons">} elements
 */
export const bindKeyboard = ({ input, themeToggle, filterButtons }) => {
  initKeyboardShortcuts({
    focusInput: () => input?.focus(),
    toggleTheme: () => toggleTheme(themeToggle),
    toggleLanguage: () => toggleLanguage(getCurrentFilter()),
    setFilterAll: () => applyFilter(filterButtons, "all", "filter-all"),
    setFilterActive: () => applyFilter(filterButtons, "active", "filter-active"),
    setFilterCompleted: () => applyFilter(filterButtons, "completed", "filter-completed"),
    clearCompleted: () => runClearCompleted(filterButtons),
    clearAll: () => runClearAll(filterButtons),
    showHelp: showKeyboardShortcutsDialog,
  });
};
