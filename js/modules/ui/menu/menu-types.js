/**
 * Shared types for the task options menu.
 *
 * @module ui/menu/types
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

/**
 * @callback TaskActionCallback
 * @param {Task} task - Task the action applies to
 * @param {TaskFilter} filter - Active list filter when the menu was opened
 */
