/**
 * Shared task list actions used by UI buttons and keyboard shortcuts.
 */

import { clearAll, clearCompleted } from "../todo.js";
import { renderTasks } from "../ui/index.js";
import { applyFilter, getCurrentFilter } from "./app-filters.js";

/**
 * @typedef {NodeListOf<HTMLButtonElement>} FilterButtons
 */

/**
 * Clears completed tasks and resets the filter when viewing completed only.
 *
 * @param {FilterButtons} filterButtons
 */
export const runClearCompleted = (filterButtons) => {
  clearCompleted();

  if (getCurrentFilter() === "completed") {
    applyFilter(filterButtons, "all", "filter-all");
  } else {
    renderTasks(getCurrentFilter());
  }
};

/**
 * Removes every task and shows the full list.
 *
 * @param {FilterButtons} filterButtons
 */
export const runClearAll = (filterButtons) => {
  clearAll();
  applyFilter(filterButtons, "all", "filter-all");
};
