/**
 * Modal dialogs for task actions.
 *
 * @module ui/dialogs
 *
 * Structure:
 * - `dialog-core.js` — mount, focus, Escape, overlay, scroll lock
 * - `dialog-dom.js` — DOM factories for dialog markup
 * - `delete-dialog.js` — delete confirmation flow
 * - `edit-dialog.js` — edit task description flow
 */

export { mountDialog } from "./dialog-core.js";
export { showDeleteDialog } from "./delete-dialog.js";
export { showEditDialog } from "./edit-dialog.js";
