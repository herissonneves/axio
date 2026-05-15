/**
 * Drag and Drop System
 *
 * Manages drag-and-drop functionality for task reordering:
 * - Drag state
 * - Index mapping (visible ↔ original)
 * - Drag event handlers
 * - Visual feedback during drag
 */

import { getTasks, reorderTasks } from "../todo.js";

// Task filters
const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

// Drag-and-drop state
let draggedItem = null;
let draggedIndex = -1;

/**
 * Gets a task element index in the visible list
 * @param {HTMLElement} element - Task element
 * @param {HTMLElement} listElement - List element
 * @returns {number} Element index
 */
export const getTaskIndex = (element, listElement) => {
  const items = Array.from(listElement.querySelectorAll(".todo-item__container"));
  return items.indexOf(element);
};

/**
 * Maps visible index to original index in the task array
 * @param {number} visibleIndex - Index in the filtered list
 * @param {string} filter - Applied filter
 * @returns {number} Index in the original task array
 */
export const getOriginalIndex = (visibleIndex, filter) => {
  const tasks = getTasks();
  const predicate = FILTERS[filter] ?? FILTERS.all;
  const visibleTasks = tasks.filter(predicate);

  if (visibleIndex < 0 || visibleIndex >= visibleTasks.length) return -1;

  const visibleTask = visibleTasks[visibleIndex];
  return tasks.findIndex((t) => t.id === visibleTask.id);
};

/**
 * Handles drag start event
 * @param {DragEvent} event - Drag start event
 * @param {HTMLElement} listElement - List element
 */
export const handleDragStart = (event, listElement) => {
  const li = event.target.closest(".todo-item__container");
  if (!li) return;

  draggedItem = li;
  draggedIndex = getTaskIndex(li, listElement);

  li.classList.add("todo-item--dragging");

  // Set drag data and effect
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", li.dataset.id);

  // Create a custom drag image for better visual feedback
  requestAnimationFrame(() => {
    li.classList.add("todo-item--drag-ghost");
  });
};

/**
 * Handles drag end event
 * @param {DragEvent} event - Drag end event
 * @param {HTMLElement} listElement - List element
 */
export const handleDragEnd = (event, listElement) => {
  const li = event.target.closest(".todo-item__container");
  if (li) {
    li.classList.remove("todo-item--dragging", "todo-item--drag-ghost");
  }

  // Clear all drag-over states
  listElement.querySelectorAll(".todo-item--drag-over").forEach((el) => {
    el.classList.remove("todo-item--drag-over");
  });

  draggedItem = null;
  draggedIndex = -1;
};

/**
 * Handles drag over event
 * @param {DragEvent} event - Drag over event
 * @param {HTMLElement} listElement - List element
 */
export const handleDragOver = (event, listElement) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const li = event.target.closest(".todo-item__container");
  if (!li || li === draggedItem) return;

  // Clear previous drag-over states
  listElement.querySelectorAll(".todo-item--drag-over").forEach((el) => {
    if (el !== li) el.classList.remove("todo-item--drag-over");
  });

  li.classList.add("todo-item--drag-over");
};

/**
 * Handles drag leave event
 * @param {DragEvent} event - Drag leave event
 */
export const handleDragLeave = (event) => {
  const li = event.target.closest(".todo-item__container");
  if (!li) return;

  // Remove only when leaving the element completely
  const relatedTarget = event.relatedTarget?.closest?.(".todo-item__container");
  if (relatedTarget !== li) {
    li.classList.remove("todo-item--drag-over");
  }
};

/**
 * Handles drop event
 * @param {DragEvent} event - Drop event
 * @param {HTMLElement} listElement - List element
 * @param {string} currentFilter - Current applied filter
 * @param {Function} onRender - Callback to re-render
 */
export const handleDrop = (event, listElement, currentFilter, onRender) => {
  event.preventDefault();

  const li = event.target.closest(".todo-item__container");
  if (!li || li === draggedItem) return;

  const targetIndex = getTaskIndex(li, listElement);
  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return;

  // Map visible indices to original indices
  const fromOriginal = getOriginalIndex(draggedIndex, currentFilter);
  const toOriginal = getOriginalIndex(targetIndex, currentFilter);

  if (fromOriginal !== -1 && toOriginal !== -1) {
    reorderTasks(fromOriginal, toOriginal);
    onRender(currentFilter);
  }

  li.classList.remove("todo-item--drag-over");
};

/**
 * Creates event handlers bound to the context
 * @param {HTMLElement} listElement - List element
 * @param {Function} getCurrentFilter - Function to get current filter
 * @param {Function} onRender - Callback to re-render
 * @returns {Object} Object with bound handlers
 */
export const createDragHandlers = (listElement, getCurrentFilter, onRender) => {
  return {
    onDragStart: (event) => handleDragStart(event, listElement),
    onDragEnd: (event) => handleDragEnd(event, listElement),
    onDragOver: (event) => handleDragOver(event, listElement),
    onDragLeave: (event) => handleDragLeave(event),
    onDrop: (event) => handleDrop(event, listElement, getCurrentFilter(), onRender),
  };
};
