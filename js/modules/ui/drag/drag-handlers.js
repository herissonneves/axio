/**
 * HTML5 drag-and-drop event handlers for task reordering.
 */

import { reorderTasks } from "../../todo.js";
import { getTaskIndex, getOriginalIndex } from "./drag-index.js";
import { beginDragSession, clearDragSession, getDragSession } from "./drag-state.js";
import {
  applyDraggingStyles,
  clearDragOverHighlights,
  getTaskRowFromTarget,
  handleDragLeaveHighlight,
  removeDraggingStyles,
} from "./drag-visual.js";

/** @typedef {import("./drag-filters.js").TaskFilter} TaskFilter */

/** @callback RenderTasksCallback @param {TaskFilter} filter */

/**
 * Starts a drag operation on a task row.
 *
 * @param {DragEvent} event - `dragstart` event
 * @param {HTMLElement} listElement - Parent list element
 */
export const handleDragStart = (event, listElement) => {
  const row = getTaskRowFromTarget(event.target);
  if (!row) {
    return;
  }

  const index = getTaskIndex(row, listElement);
  beginDragSession(row, index);
  applyDraggingStyles(row);

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", row.dataset.id ?? "");
};

/**
 * Ends a drag operation and resets visual state.
 *
 * @param {DragEvent} event - `dragend` event
 * @param {HTMLElement} listElement - Parent list element
 */
export const handleDragEnd = (event, listElement) => {
  const row = getTaskRowFromTarget(event.target);
  if (row) {
    removeDraggingStyles(row);
  }

  clearDragOverHighlights(listElement);
  clearDragSession();
};

/**
 * Allows drop and highlights the row under the pointer.
 *
 * @param {DragEvent} event - `dragover` event
 * @param {HTMLElement} listElement - Parent list element
 */
export const handleDragOver = (event, listElement) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const row = getTaskRowFromTarget(event.target);
  const { item: draggedItem } = getDragSession();

  if (!row || row === draggedItem) {
    return;
  }

  clearDragOverHighlights(listElement, row);
  row.classList.add("todo-item--drag-over");
};

/**
 * Removes drop highlight when leaving a row.
 *
 * @param {DragEvent} event - `dragleave` event
 */
export const handleDragLeave = (event) => {
  handleDragLeaveHighlight(event);
};

/**
 * Reorders tasks when dropped on a valid target row.
 *
 * @param {DragEvent} event - `drop` event
 * @param {HTMLElement} listElement - Parent list element
 * @param {TaskFilter} currentFilter - Active list filter
 * @param {RenderTasksCallback} onRender - Re-renders the list after reorder
 */
export const handleDrop = (event, listElement, currentFilter, onRender) => {
  event.preventDefault();

  const row = getTaskRowFromTarget(event.target);
  const { item: draggedItem, index: draggedIndex } = getDragSession();

  if (!row || row === draggedItem) {
    return;
  }

  const targetIndex = getTaskIndex(row, listElement);

  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
    return;
  }

  const fromOriginal = getOriginalIndex(draggedIndex, currentFilter);
  const toOriginal = getOriginalIndex(targetIndex, currentFilter);

  if (fromOriginal !== -1 && toOriginal !== -1) {
    reorderTasks(fromOriginal, toOriginal);
    onRender(currentFilter);
  }

  row.classList.remove("todo-item--drag-over");
};
