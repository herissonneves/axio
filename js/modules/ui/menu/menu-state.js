/**
 * Open menu session state (single menu at a time).
 */

/**
 * @typedef {Object} MenuSession
 * @property {HTMLElement | null} menu - Mounted `.todo-menu` element
 * @property {HTMLElement | null} trigger - Options button that opened the menu
 */

/** @type {MenuSession} */
const session = {
  menu: null,
  trigger: null,
};

/**
 * @returns {HTMLElement | null} Currently open menu element, if any
 */
export const getOpenMenu = () => session.menu;

/**
 * Records the open menu and its trigger for accessibility and dismissal.
 *
 * @param {HTMLElement} menu - Menu element appended to the document
 * @param {HTMLElement} trigger - Options button that opened the menu
 */
export const registerOpenMenu = (menu, trigger) => {
  session.menu = menu;
  session.trigger = trigger;
};

/**
 * Removes the open menu from the DOM and resets `aria-expanded` on the trigger.
 */
export const closeMenu = () => {
  if (session.menu) {
    session.menu.remove();
    session.menu = null;
  }

  if (session.trigger) {
    session.trigger.setAttribute("aria-expanded", "false");
    session.trigger = null;
  }
};

/**
 * @returns {boolean} Whether a menu is currently mounted in the document
 */
export const isMenuOpen = () => Boolean(session.menu?.parentElement);
