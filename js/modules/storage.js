/**
 * Storage Module
 *
 * Manages task persistence in the browser's localStorage.
 * Provides functions to load and save tasks safely,
 * with error handling to prevent parsing failures.
 */

/**
 * Loads tasks from localStorage
 *
 * @returns {Array} Array of tasks or empty array on failure
 */
export function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.warn("Failed to parse tasks from storage, resetting storage.", error);
    return [];
  }
}

/**
 * Persists tasks to localStorage
 *
 * @param {Array} tasks - Array of tasks to save
 */
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
