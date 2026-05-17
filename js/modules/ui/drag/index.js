/**
 * Drag-and-drop system for reordering tasks.
 *
 * @module ui/drag
 *
 * Structure:
 * - `drag-filters.js` — filter predicates for index mapping
 * - `drag-index.js` — visible ↔ storage index conversion
 * - `drag-state.js` — active drag session
 * - `drag-visual.js` — CSS feedback helpers
 * - `drag-handlers.js` — HTML5 drag event handlers
 * - `drag-bindings.js` — `createDragHandlers` factory
 */

export { getTaskIndex, getOriginalIndex, TASK_ITEM_SELECTOR } from "./drag-index.js";
export {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragLeave,
  handleDrop,
} from "./drag-handlers.js";
export { createDragHandlers } from "./drag-bindings.js";
