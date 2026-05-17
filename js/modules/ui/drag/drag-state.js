/**
 * In-memory state for the current drag session.
 *
 * Tracks which list item is being dragged and its starting index. Reset when
 * the drag ends or a drop completes.
 */

/**
 * @typedef {Object} DragSession
 * @property {HTMLElement | null} item - Dragged `.todo-item__container` element
 * @property {number} index - Starting visible index, or `-1` when idle
 */

/** @type {DragSession} */
const session = {
  item: null,
  index: -1,
};

/**
 * @returns {DragSession} Current drag session (mutable; read-only for callers)
 */
export const getDragSession = () => session;

/**
 * Records the element and visible index at drag start.
 *
 * @param {HTMLElement} item - Task row being dragged
 * @param {number} index - Visible list index from `getTaskIndex`
 */
export const beginDragSession = (item, index) => {
  session.item = item;
  session.index = index;
};

/**
 * Clears drag session state after drag end or drop.
 */
export const clearDragSession = () => {
  session.item = null;
  session.index = -1;
};
