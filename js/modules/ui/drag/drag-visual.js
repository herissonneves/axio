/**
 * CSS class helpers for drag-and-drop visual feedback.
 */

import { TASK_ITEM_SELECTOR } from "./drag-index.js";

/**
 * Resolves a task row from an event target.
 *
 * @param {EventTarget | null} target - Event target (e.g. `event.target`)
 * @returns {HTMLElement | null}
 */
export const getTaskRowFromTarget = (target) => {
  if (!(target instanceof Element)) {
    return null;
  }
  return target.closest(TASK_ITEM_SELECTOR);
};

/**
 * Removes `todo-item--drag-over` from all rows except an optional exception.
 *
 * @param {HTMLElement} listElement - Parent list element
 * @param {HTMLElement | null} [except] - Row to keep highlighted
 */
export const clearDragOverHighlights = (listElement, except = null) => {
  listElement.querySelectorAll(".todo-item--drag-over").forEach((element) => {
    if (element !== except) {
      element.classList.remove("todo-item--drag-over");
    }
  });
};

/**
 * Applies dragging styles when a drag starts.
 *
 * @param {HTMLElement} item - Task row being dragged
 */
export const applyDraggingStyles = (item) => {
  item.classList.add("todo-item--dragging");
  requestAnimationFrame(() => {
    item.classList.add("todo-item--drag-ghost");
  });
};

/**
 * Removes all dragging-related classes from a row.
 *
 * @param {HTMLElement} item - Task row that finished dragging
 */
export const removeDraggingStyles = (item) => {
  item.classList.remove("todo-item--dragging", "todo-item--drag-ghost");
};

/**
 * Clears drag-over highlight on a row when the pointer leaves it completely.
 *
 * Ignores leave events that move into a child of the same row.
 *
 * @param {DragEvent} event - `dragleave` event
 */
export const handleDragLeaveHighlight = (event) => {
  const row = getTaskRowFromTarget(event.target);
  if (!row) {
    return;
  }

  const relatedRow = getTaskRowFromTarget(event.relatedTarget);
  if (relatedRow !== row) {
    row.classList.remove("todo-item--drag-over");
  }
};
