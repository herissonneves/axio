/**
 * Index utilities for drag-and-drop reordering.
 *
 * Maps between DOM positions in the filtered list and indices in the full
 * task array persisted in storage.
 */

import { getTasks } from "../../todo.js";
import { getFilterPredicate } from "./drag-filters.js";

/** @typedef {import("./drag-filters.js").Task} Task */
/** @typedef {import("./drag-filters.js").TaskFilter} TaskFilter */

/** CSS selector for draggable task row containers in the list. */
export const TASK_ITEM_SELECTOR = ".todo-item__container";

/**
 * Finds the index of a task row within the visible list.
 *
 * @param {HTMLElement} element - Task row (`.todo-item__container`)
 * @param {HTMLElement} listElement - Parent list element (`#todo-list`)
 * @returns {number} Zero-based index, or `-1` if not a direct list child
 */
export const getTaskIndex = (element, listElement) => {
  const items = Array.from(listElement.querySelectorAll(TASK_ITEM_SELECTOR));
  return items.indexOf(element);
};

/**
 * Resolves a visible list index to the index in the full task array.
 *
 * Required when a filter hides some tasks — DOM order reflects the filtered
 * subset, while `reorderTasks` operates on the complete array.
 *
 * @param {number} visibleIndex - Position in the filtered DOM list
 * @param {TaskFilter} filter - Active filter (`all`, `active`, or `completed`)
 * @returns {number} Index in the full task array, or `-1` if out of bounds
 */
export const getOriginalIndex = (visibleIndex, filter) => {
  const tasks = getTasks();
  const predicate = getFilterPredicate(filter);
  const visibleTasks = tasks.filter(predicate);

  if (visibleIndex < 0 || visibleIndex >= visibleTasks.length) {
    return -1;
  }

  const visibleTask = visibleTasks[visibleIndex];
  return tasks.findIndex((task) => task.id === visibleTask.id);
};
