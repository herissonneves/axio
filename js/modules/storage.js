/**
 * Storage Module
 *
 * Manages task persistence in the browser's localStorage.
 * Provides functions to load and save tasks safely,
 * with error handling to prevent parsing failures.
 */

import { migrateTask } from "./task-meta.js";

/**
 * Loads tasks from localStorage
 *
 * @returns {Array} Array of tasks or empty array on failure
 */
export function loadTasks() {
  try {
    const raw = JSON.parse(localStorage.getItem("tasks")) || [];
    return Array.isArray(raw) ? raw.map(migrateTask) : [];
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
