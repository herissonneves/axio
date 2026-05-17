/**
 * Task filter predicates for mapping visible list positions to storage order.
 *
 * Mirrors the filter logic used in `ui-render.js` when building the visible list.
 */

/**
 * @typedef {Object} Task
 * @property {string} id - Unique task identifier
 * @property {string} text - Task description
 * @property {boolean} completed - Whether the task is done
 */

/**
 * @typedef {'all'|'active'|'completed'} TaskFilter
 */

/** @type {Record<TaskFilter, (task: Task) => boolean>} */
export const TASK_FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

/**
 * Returns the predicate for a filter name, defaulting to `all`.
 *
 * @param {string} filter - Filter key from the UI
 * @returns {(task: Task) => boolean}
 */
export const getFilterPredicate = (filter) => TASK_FILTERS[filter] ?? TASK_FILTERS.all;
