import { loadTasks, saveTasks } from "./storage.js";

let tasks = loadTasks();

const persist = (updater) => {
  tasks = updater(tasks);
  saveTasks(tasks);
  return tasks;
};

/**
 * Return a shallow copy of tasks to prevent external mutation.
 */
export const getTasks = () => [...tasks];

/**
 * Create and store a new task.
 */
export const addTask = (text) =>
  persist((current) => [
    ...current,
    { id: crypto.randomUUID?.() ?? Date.now(), text, completed: false },
  ]).at(-1);

/**
 * Remove a task by id.
 */
export const removeTask = (id) => {
  persist((current) => current.filter((task) => task.id !== id));
};

/**
 * Toggle completion state by id.
 */
export const toggleTask = (id) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

/**
 * Remove all completed tasks.
 */
export const clearCompleted = () => {
  persist((current) => current.filter((task) => !task.completed));
};
