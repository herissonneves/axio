/**
 * UI Module - User Interface
 *
 * Centralized entry point for all UI components.
 * Exports functionality for:
 * - SVG icons
 * - Task elements
 * - Options menu
 * - Modal dialogs
 * - Drag and drop
 * - Rendering
 */

// Icons
export {
  createCheckIcon,
  createOptionsIcon,
  createDragHandleIcon,
  createEditIcon,
  createDeleteIcon
} from "./ui-icons.js";

// Elements
export {
  createCheckbox,
  createTaskText,
  createOptionsButton,
  createDragHandle
} from "./ui-elements.js";

// Menu
export {
  createOptionsMenu,
  toggleMenu,
  closeMenu
} from "./ui-menu.js";

// Dialogs
export {
  showEditDialog,
  showDeleteDialog
} from "./ui-dialogs.js";

// Drag and Drop
export {
  getTaskIndex,
  getOriginalIndex,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  createDragHandlers
} from "./ui-drag.js";

// Rendering (main export)
export { renderTasks } from "./ui-render.js";
