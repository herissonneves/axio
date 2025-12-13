/**
 * Load tasks from localStorage, returning a safe empty array on any failure.
 */
export function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.warn("Failed to parse tasks from storage, resetting store.", error);
    return [];
  }
}

/**
 * Persist tasks to localStorage.
 */
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
