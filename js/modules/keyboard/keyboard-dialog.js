/**
 * Shortcuts Dialog Management
 *
 * Functions to display and manage the shortcuts help dialog:
 * - Dialog display
 * - Dialog closing
 * - Event management
 */

import { createDialogStructure } from "./keyboard-dom.js";

/**
 * Displays the help dialog with all available keyboard shortcuts
 */
export const showKeyboardShortcutsDialog = () => {
  // Prevent multiple dialogs
  if (document.querySelector('.shortcuts-dialog')) {
    return;
  }

  const closeDialog = () => {
    dialog.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleEscape);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
    }
  };

  const { dialog, closeBtn } = createDialogStructure(closeDialog);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";
  closeBtn.focus();

  document.addEventListener("keydown", handleEscape);
};
