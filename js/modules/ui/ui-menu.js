/**
 * Task Options Menu
 *
 * Manages the dropdown menu with edit/delete options.
 * Includes state control, positioning, and automatic closing.
 */

import { t } from "../i18n/index.js";
import { createEditIcon, createDeleteIcon } from "./ui-icons.js";

// Menu state
let openMenu = null;
let openMenuButton = null;

/**
 * Closes any open menu
 */
export const closeMenu = () => {
  if (openMenu) {
    openMenu.remove();
    openMenu = null;
  }
  if (openMenuButton) {
    openMenuButton.setAttribute("aria-expanded", "false");
    openMenuButton = null;
  }
};

/**
 * Closes the menu when clicking outside it
 * @param {Event} event - Click event
 */
const handleClickOutside = (event) => {
  if (openMenu && !openMenu.contains(event.target) && !event.target.closest(".todo-item__options-btn")) {
    closeMenu();
    document.removeEventListener("click", handleClickOutside);
  }
};

/**
 * Creates the dropdown menu with task options (edit/delete)
 * @param {Object} task - Task object
 * @param {string} filter - Current applied filter
 * @param {HTMLElement} buttonElement - Button element that opened the menu
 * @param {Function} onEdit - Callback to edit task
 * @param {Function} onDelete - Callback to delete task
 * @returns {HTMLElement} Created menu element
 */
export const createOptionsMenu = (task, filter, buttonElement, onEdit, onDelete) => {
  // Close any existing menu
  closeMenu();

  const menu = document.createElement("div");
  menu.classList.add("todo-menu");
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", t("ariaTaskOptionsMenu"));

  // Edit option
  const editItem = document.createElement("button");
  editItem.classList.add("todo-menu__item");
  editItem.setAttribute("role", "menuitem");
  editItem.setAttribute("aria-label", t("ariaEditTask"));
  editItem.append(createEditIcon());
  const editText = document.createElement("span");
  editText.classList.add("todo-menu__text");
  editText.textContent = t("edit");
  editItem.append(editText);

  editItem.addEventListener("click", () => {
    closeMenu();
    onEdit(task, filter);
  });

  // Delete option
  const deleteItem = document.createElement("button");
  deleteItem.classList.add("todo-menu__item");
  deleteItem.setAttribute("role", "menuitem");
  deleteItem.setAttribute("aria-label", t("ariaDeleteTask"));
  deleteItem.append(createDeleteIcon());
  const deleteText = document.createElement("span");
  deleteText.classList.add("todo-menu__text");
  deleteText.textContent = t("delete");
  deleteItem.append(deleteText);

  deleteItem.addEventListener("click", () => {
    closeMenu();
    onDelete(task, filter);
  });

  menu.append(editItem, deleteItem);

  // Position menu
  const rect = buttonElement.getBoundingClientRect();
  menu.style.position = "fixed";

  // Calculate position to avoid going off-screen
  const menuHeight = 120; // Approximate height
  const menuWidth = 160; // Approximate width
  const spacing = 4;

  let top = rect.bottom + spacing;
  let right = window.innerWidth - rect.right;

  // Adjust if menu would go below the viewport
  if (top + menuHeight > window.innerHeight) {
    top = rect.top - menuHeight - spacing;
  }

  // Adjust if menu would go past the right edge
  if (right + menuWidth > window.innerWidth) {
    right = window.innerWidth - rect.left;
  }

  menu.style.top = `${top}px`;
  menu.style.right = `${right}px`;

  document.body.append(menu);
  openMenu = menu;
  openMenuButton = buttonElement;

  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);

  return menu;
};

/**
 * Toggles menu state (open or close)
 * @param {Object} task - Task object
 * @param {string} filter - Current applied filter
 * @param {HTMLElement} buttonElement - Button element
 * @param {Function} onEdit - Edit callback
 * @param {Function} onDelete - Delete callback
 */
export const toggleMenu = (task, filter, buttonElement, onEdit, onDelete) => {
  const isOpen = openMenu && openMenu.parentElement;

  if (isOpen) {
    closeMenu();
    buttonElement.setAttribute("aria-expanded", "false");
  } else {
    createOptionsMenu(task, filter, buttonElement, onEdit, onDelete);
    buttonElement.setAttribute("aria-expanded", "true");
  }
};
