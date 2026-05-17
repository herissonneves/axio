/**
 * Task metadata utilities for categories and tags.
 *
 * Normalizes user input and migrates legacy tasks loaded from storage.
 */

/**
 * @typedef {Object} Task
 * @property {string|number} id
 * @property {string} text
 * @property {boolean} completed
 * @property {string|null} [category]
 * @property {string[]} [tags]
 */

/**
 * Normalizes a category string (trimmed) or returns null when empty.
 *
 * @param {unknown} category
 * @returns {string|null}
 */
export const normalizeCategory = (category) => {
  if (category == null || typeof category !== "string") {
    return null;
  }

  const trimmed = category.trim();
  return trimmed.length > 0 ? trimmed : null;
};

/**
 * Normalizes tags: trims, drops empties, deduplicates case-insensitively.
 *
 * @param {unknown} tags
 * @returns {string[]}
 */
export const normalizeTags = (tags) => {
  if (!Array.isArray(tags)) {
    return [];
  }

  const seen = new Set();
  const normalized = [];

  for (const tag of tags) {
    if (typeof tag !== "string") {
      continue;
    }

    const trimmed = tag.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push(trimmed);
  }

  return normalized;
};

/**
 * Ensures a stored task has category and tags fields.
 *
 * @param {Task} task
 * @returns {Task}
 */
export const migrateTask = (task) => ({
  ...task,
  category: normalizeCategory(task.category),
  tags: normalizeTags(task.tags),
});

/**
 * Compares a tag against stored tags (case-insensitive).
 *
 * @param {string[]} tags
 * @param {string} tag
 * @returns {boolean}
 */
export const hasTag = (tags, tag) => {
  const needle = normalizeCategory(tag);
  if (!needle) {
    return false;
  }

  const key = needle.toLowerCase();
  return tags.some((stored) => stored.toLowerCase() === key);
};
