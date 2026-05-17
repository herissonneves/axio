/**
 * Todo Task Management Module
 *
 * Manages application task state, including:
 * - Create, read, update, and delete (CRUD)
 * - Completion state toggling
 * - Categories and tags
 * - Task reordering via drag and drop
 * - Clearing completed or all tasks
 * - Automatic persistence to localStorage
 */

import { loadTasks, saveTasks } from "./storage.js";
import {
  hasTag,
  migrateTask,
  normalizeCategory,
  normalizeTags,
} from "./task-meta.js";

let tasks = loadTasks().map(migrateTask);

/**
 * @typedef {import("./task-meta.js").Task} Task
 */

/**
 * @typedef {Object} AddTaskOptions
 * @property {string|null} [category] - Single category label
 * @property {string[]} [tags] - Tag labels
 */

/**
 * @param {Function} updater
 * @returns {Task[]}
 */
const persist = (updater) => {
  tasks = updater(tasks);
  saveTasks(tasks);
  return tasks;
};

/**
 * @returns {Task[]}
 */
export const getTasks = () => tasks.map(migrateTask);

/**
 * @param {string} text
 * @param {AddTaskOptions} [options]
 * @returns {Task}
 */
export const addTask = (text, options = {}) =>
  persist((current) => [
    ...current,
    {
      id: crypto.randomUUID?.() ?? Date.now(),
      text,
      completed: false,
      category: normalizeCategory(options.category),
      tags: normalizeTags(options.tags),
    },
  ]).at(-1);

/**
 * @param {string|number} id
 */
export const removeTask = (id) => {
  persist((current) => current.filter((task) => task.id !== id));
};

/**
 * @param {string|number} id
 */
export const toggleTask = (id) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    ),
  );
};

/**
 * @param {string|number} id
 * @param {string} text
 */
export const updateTask = (id, text) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, text: text.trim() } : task,
    ),
  );
};

/**
 * @param {string|number} id
 * @param {string|null} category
 */
export const setTaskCategory = (id, category) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, category: normalizeCategory(category) } : task,
    ),
  );
};

/**
 * @param {string|number} id
 * @param {string[]} tags
 */
export const setTaskTags = (id, tags) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, tags: normalizeTags(tags) } : task,
    ),
  );
};

/**
 * @param {string|number} id
 * @param {...string} newTags
 */
export const addTaskTags = (id, ...newTags) => {
  persist((current) =>
    current.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        tags: normalizeTags([...task.tags, ...newTags]),
      };
    }),
  );
};

/**
 * @param {string|number} id
 * @param {string} tag
 */
export const removeTaskTag = (id, tag) => {
  const needle = typeof tag === "string" ? tag.trim().toLowerCase() : "";

  if (!needle) {
    return;
  }

  persist((current) =>
    current.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        tags: task.tags.filter((stored) => stored.toLowerCase() !== needle),
      };
    }),
  );
};

/**
 * @param {string|null} category - Pass null for uncategorized tasks
 * @returns {Task[]}
 */
export const getTasksByCategory = (category) => {
  const normalized = normalizeCategory(category);
  return getTasks().filter((task) => task.category === normalized);
};

/**
 * @param {string} tag
 * @returns {Task[]}
 */
export const getTasksByTag = (tag) => {
  return getTasks().filter((task) => hasTag(task.tags, tag));
};

/**
 * @returns {string[]}
 */
export const getCategories = () => {
  const categories = new Set();

  for (const task of getTasks()) {
    if (task.category) {
      categories.add(task.category);
    }
  }

  return [...categories].sort((a, b) => a.localeCompare(b));
};

/**
 * @returns {string[]}
 */
export const getTags = () => {
  const tags = new Set();

  for (const task of getTasks()) {
    for (const tag of task.tags) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
};

export const clearCompleted = () => {
  persist((current) => current.filter((task) => !task.completed));
};

/**
 * @param {number} fromIndex
 * @param {number} toIndex
 */
export const reorderTasks = (fromIndex, toIndex) => {
  persist((current) => {
    const updated = [...current];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  });
};

export const clearAll = () => {
  persist(() => []);
};
