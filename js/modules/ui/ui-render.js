/**
 * Task List Rendering
 *
 * Central rendering module that:
 * - Builds complete task items
 * - Applies filters (all/active/completed)
 * - Orchestrates all components
 * - Manages list DOM
 */

import { getTasks } from "../todo.js";
import { createCheckbox, createTaskText, createOptionsButton, createDragHandle } from "./ui-elements.js";
import { toggleMenu, closeMenu } from "./ui-menu.js";
import { showEditDialog, showDeleteDialog } from "./ui-dialogs.js";
import { createDragHandlers } from "./ui-drag.js";

// Task filters
const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

// Current filter state
let currentFilter = "all";

// List element
const listElement = document.getElementById("todo-list");

/**
 * Gets the current applied filter
 * @returns {string} Current filter
 */
const getCurrentFilter = () => currentFilter;

/**
 * Builds a complete task item with all elements
 * @param {Object} task - Task object
 * @param {string} filter - Current applied filter
 * @param {Function} onRender - Callback to re-render
 * @param {Object} dragHandlers - Drag-and-drop handlers
 * @returns {HTMLElement} Task li element
 */
const buildTodoItem = (task, filter, onRender, dragHandlers) => {
  const li = document.createElement("li");
  li.classList.add("todo-item__container");
  li.dataset.id = String(task.id);
  li.setAttribute("draggable", "true");

  if (task.completed) {
    li.classList.add("todo-item--completed");
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("todo-item");

  // Create menu callbacks with rendering
  const handleMenuToggle = (task, filter, buttonElement) => {
    const onEdit = (task, filter) => showEditDialog(task, filter, onRender);
    const onDelete = (task, filter) => showDeleteDialog(task, filter, onRender);
    toggleMenu(task, filter, buttonElement, onEdit, onDelete);
  };

  wrapper.append(
    createDragHandle(),
    createCheckbox(task, filter, onRender),
    createTaskText(task, filter, onRender),
    createOptionsButton(task, filter, handleMenuToggle)
  );

  // Add drag event listeners
  li.addEventListener("dragstart", dragHandlers.onDragStart);
  li.addEventListener("dragend", dragHandlers.onDragEnd);
  li.addEventListener("dragover", dragHandlers.onDragOver);
  li.addEventListener("dragleave", dragHandlers.onDragLeave);
  li.addEventListener("drop", dragHandlers.onDrop);

  li.append(wrapper);
  return li;
};

/**
 * Renders tasks in the list element using the provided filter
 *
 * Main rendering function that:
 * - Filters tasks according to the specified filter
 * - Creates DOM elements for each task
 * - Updates the interface list
 *
 * @param {string} filter - Filter to apply: "all", "active", or "completed"
 */
export function renderTasks(filter = "all") {
  if (!listElement) return;

  // Close any open menu when re-rendering
  closeMenu();

  // Store current filter for drag-and-drop reordering
  currentFilter = filter;

  const predicate = FILTERS[filter] ?? FILTERS.all;

  // Create drag handlers bound to current context
  const dragHandlers = createDragHandlers(listElement, getCurrentFilter, renderTasks);

  const fragment = document.createDocumentFragment();
  getTasks()
    .filter(predicate)
    .forEach((task) => fragment.append(buildTodoItem(task, filter, renderTasks, dragHandlers)));

  listElement.replaceChildren(fragment);
}
