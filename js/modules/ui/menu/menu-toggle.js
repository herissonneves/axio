/**
 * Toggle behavior for the task options menu.
 */

import { createOptionsMenu } from "./menu-options.js";
import { closeMenu, isMenuOpen } from "./menu-state.js";

/** @typedef {import("./menu-types.js").Task} Task */
/** @typedef {import("./menu-types.js").TaskFilter} TaskFilter */
/** @typedef {import("./menu-types.js").TaskActionCallback} TaskActionCallback */

/**
 * Opens the options menu or closes it if already open for this interaction.
 *
 * @param {Task} task - Task whose options are shown
 * @param {TaskFilter} filter - Active list filter
 * @param {HTMLElement} trigger - Options button that was clicked
 * @param {TaskActionCallback} onEdit - Opens the edit flow
 * @param {TaskActionCallback} onDelete - Opens the delete confirmation
 */
export const toggleMenu = (task, filter, trigger, onEdit, onDelete) => {
  if (isMenuOpen()) {
    closeMenu();
    trigger.setAttribute("aria-expanded", "false");
    return;
  }

  createOptionsMenu(task, filter, trigger, onEdit, onDelete);
  trigger.setAttribute("aria-expanded", "true");
};
