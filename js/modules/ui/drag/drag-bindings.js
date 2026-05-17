/**
 * Binds drag-and-drop handlers to a list element and render context.
 */

import {
  handleDragEnd,
  handleDragLeave,
  handleDragOver,
  handleDragStart,
  handleDrop,
} from "./drag-handlers.js";

/** @typedef {import("./drag-filters.js").TaskFilter} TaskFilter */

/** @callback GetCurrentFilterCallback @returns {TaskFilter} */

/** @callback RenderTasksCallback @param {TaskFilter} filter */

/**
 * @typedef {Object} DragHandlerMap
 * @property {(event: DragEvent) => void} onDragStart
 * @property {(event: DragEvent) => void} onDragEnd
 * @property {(event: DragEvent) => void} onDragOver
 * @property {(event: DragEvent) => void} onDragLeave
 * @property {(event: DragEvent) => void} onDrop
 */

/**
 * Creates listener callbacks bound to a list and render pipeline.
 *
 * Intended to be attached to each `.todo-item__container` in `ui-render.js`.
 *
 * @param {HTMLElement} listElement - Task list element (`#todo-list`)
 * @param {GetCurrentFilterCallback} getCurrentFilter - Returns the active filter
 * @param {RenderTasksCallback} onRender - Re-renders tasks after reorder
 * @returns {DragHandlerMap}
 */
export const createDragHandlers = (listElement, getCurrentFilter, onRender) => ({
  onDragStart: (event) => handleDragStart(event, listElement),
  onDragEnd: (event) => handleDragEnd(event, listElement),
  onDragOver: (event) => handleDragOver(event, listElement),
  onDragLeave: (event) => handleDragLeave(event),
  onDrop: (event) => handleDrop(event, listElement, getCurrentFilter(), onRender),
});
