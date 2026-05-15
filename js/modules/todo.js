/**
 * Todo Task Management Module
 *
 * Manages application task state, including:
 * - Create, read, update, and delete (CRUD)
 * - Completion state toggling
 * - Task reordering via drag and drop
 * - Clearing completed or all tasks
 * - Automatic persistence to localStorage
 */

import { loadTasks, saveTasks } from "./storage.js";

// Task state loaded from localStorage
let tasks = loadTasks();

/**
 * Helper to update task state and persist
 *
 * @param {Function} updater - Function that receives current tasks and returns updated tasks
 * @returns {Array} Updated task array
 */
const persist = (updater) => {
  tasks = updater(tasks);
  saveTasks(tasks);
  return tasks;
};

/**
 * Returns a shallow copy of tasks to prevent external mutation
 *
 * @returns {Array} Copy of the task array
 */
export const getTasks = () => [...tasks];

/**
 * Creates and stores a new task
 *
 * @param {string} text - Task text
 * @returns {Object} The newly created task
 */
export const addTask = (text) =>
  persist((current) => [
    ...current,
    { id: crypto.randomUUID?.() ?? Date.now(), text, completed: false },
  ]).at(-1);

/**
 * Removes a task by ID
 *
 * @param {string|number} id - ID of the task to remove
 */
export const removeTask = (id) => {
  persist((current) => current.filter((task) => task.id !== id));
};

/**
 * Toggles completion state of a task by ID
 *
 * @param {string|number} id - Task ID
 */
export const toggleTask = (id) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

/**
 * Updates task text by ID
 *
 * @param {string|number} id - Task ID
 * @param {string} text - New task text
 */
export const updateTask = (id, text) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, text: text.trim() } : task
    )
  );
};

/**
 * Removes all completed tasks
 */
export const clearCompleted = () => {
  persist((current) => current.filter((task) => !task.completed));
};

/**
 * Reorders tasks by moving one from a source index to a destination index
 *
 * @param {number} fromIndex - Source index
 * @param {number} toIndex - Destination index
 */
export const reorderTasks = (fromIndex, toIndex) => {
  persist((current) => {
    const updated = [...current];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  });
};

/**
 * Removes all tasks
 */
export const clearAll = () => {
  persist(() => []);
};
