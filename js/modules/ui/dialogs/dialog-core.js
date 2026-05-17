/**
 * @typedef {Object} Task
 * @property {string} id - Unique task identifier
 * @property {string} text - Task description
 * @property {boolean} completed - Whether the task is done
 */

/**
 * @typedef {'all'|'active'|'completed'} TaskFilter
 */

/**
 * @callback RenderTasksCallback
 * @param {TaskFilter} filter - Filter used to rebuild the visible list
 */

/**
 * Modal dialog lifecycle and shared interaction behavior.
 *
 * Handles mounting, scroll lock, overlay dismissal, Escape-to-close,
 * and focus management for all task dialogs.
 */

/**
 * @typedef {Object} MountDialogOptions
 * @property {HTMLElement} [initialFocus] - Element to receive focus when opened
 * @property {boolean} [selectOnFocus=false] - Select text after focusing (edit input)
 * @property {() => void} [onClose] - Called after the dialog is removed from the DOM
 */

/**
 * @typedef {Object} DialogHandle
 * @property {HTMLElement} dialog - Root dialog element
 * @property {() => void} close - Dismisses the dialog and cleans up listeners
 */

/**
 * Appends a dialog to the document and wires shared modal behavior.
 *
 * @param {HTMLElement} dialog - Complete dialog tree (must include `.todo-dialog__overlay`)
 * @param {MountDialogOptions} [options] - Focus and lifecycle options
 * @returns {DialogHandle}
 */
export const mountDialog = (dialog, options = {}) => {
  const { initialFocus, selectOnFocus = false, onClose } = options;

  const overlay = dialog.querySelector(".todo-dialog__overlay");

  const close = () => {
    dialog.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleEscape);
    onClose?.();
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      close();
    }
  };

  overlay?.addEventListener("click", close);
  document.body.append(dialog);
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", handleEscape);

  if (initialFocus) {
    initialFocus.focus();
    if (selectOnFocus && initialFocus instanceof HTMLInputElement) {
      initialFocus.select();
    }
  }

  return { dialog, close };
};
