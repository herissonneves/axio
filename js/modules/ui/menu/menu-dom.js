/**
 * DOM factories for the task options dropdown menu.
 */

import { t } from "../../i18n/index.js";

/** Selector for the per-task options trigger button. */
export const OPTIONS_BUTTON_SELECTOR = ".todo-item__options-btn";

/**
 * Creates the menu container element with accessibility attributes.
 *
 * @returns {HTMLDivElement}
 */
export const createMenuRoot = () => {
  const menu = document.createElement("div");
  menu.classList.add("todo-menu");
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", t("ariaTaskOptionsMenu"));
  return menu;
};

/**
 * @typedef {Object} MenuItemOptions
 * @property {string} ariaLabel - Accessible name for the action
 * @property {HTMLElement} icon - Leading icon element
 * @property {string} label - Visible action label
 * @property {() => void} onSelect - Called when the item is activated
 */

/**
 * Builds a single menu row (icon + label).
 *
 * @param {MenuItemOptions} options
 * @returns {HTMLButtonElement}
 */
export const createMenuItem = ({ ariaLabel, icon, label, onSelect }) => {
  const item = document.createElement("button");
  item.classList.add("todo-menu__item");
  item.setAttribute("role", "menuitem");
  item.setAttribute("aria-label", ariaLabel);
  item.setAttribute("type", "button");

  const text = document.createElement("span");
  text.classList.add("todo-menu__text");
  text.textContent = label;

  item.append(icon, text);
  item.addEventListener("click", onSelect);

  return item;
};
