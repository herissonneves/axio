/**
 * Builds and mounts the task options menu (edit / delete).
 */

import { t } from "../../i18n/index.js";
import { createDeleteIcon, createEditIcon } from "../ui-icons.js";
import { createMenuItem, createMenuRoot } from "./menu-dom.js";
import { attachClickOutsideDismiss } from "./menu-outside.js";
import { positionMenuNearTrigger } from "./menu-position.js";
import { closeMenu, registerOpenMenu } from "./menu-state.js";

/** @typedef {import("./menu-types.js").Task} Task */
/** @typedef {import("./menu-types.js").TaskFilter} TaskFilter */
/** @typedef {import("./menu-types.js").TaskActionCallback} TaskActionCallback */

/**
 * Creates, positions, and mounts the dropdown menu for a single task.
 *
 * Closes any previously open menu before opening a new one.
 *
 * @param {Task} task - Task whose options are shown
 * @param {TaskFilter} filter - Active list filter
 * @param {HTMLElement} trigger - Options button that opened the menu
 * @param {TaskActionCallback} onEdit - Opens the edit flow
 * @param {TaskActionCallback} onDelete - Opens the delete confirmation
 * @returns {HTMLDivElement} Mounted menu element
 */
export const createOptionsMenu = (task, filter, trigger, onEdit, onDelete) => {
  closeMenu();

  const menu = createMenuRoot();

  const editItem = createMenuItem({
    ariaLabel: t("ariaEditTask"),
    icon: createEditIcon(),
    label: t("edit"),
    onSelect: () => {
      closeMenu();
      onEdit(task, filter);
    },
  });

  const deleteItem = createMenuItem({
    ariaLabel: t("ariaDeleteTask"),
    icon: createDeleteIcon(),
    label: t("delete"),
    onSelect: () => {
      closeMenu();
      onDelete(task, filter);
    },
  });

  menu.append(editItem, deleteItem);
  positionMenuNearTrigger(menu, trigger);

  document.body.append(menu);
  registerOpenMenu(menu, trigger);
  attachClickOutsideDismiss();

  return menu;
};
