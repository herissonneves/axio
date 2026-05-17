/**
 * Fixed positioning for the task options menu relative to its trigger button.
 */

/** Estimated menu height used for viewport overflow checks (px). */
const MENU_ESTIMATED_HEIGHT = 120;

/** Estimated menu width used for viewport overflow checks (px). */
const MENU_ESTIMATED_WIDTH = 160;

/** Gap between the trigger button and the menu (px). */
const MENU_SPACING = 4;

/**
 * Positions a menu below the trigger, flipping above or adjusting horizontally
 * when it would overflow the viewport.
 *
 * @param {HTMLElement} menu - Menu element (must use `position: fixed`)
 * @param {HTMLElement} trigger - Options button used as the anchor
 */
export const positionMenuNearTrigger = (menu, trigger) => {
  const rect = trigger.getBoundingClientRect();

  menu.style.position = "fixed";

  let top = rect.bottom + MENU_SPACING;
  let right = window.innerWidth - rect.right;

  if (top + MENU_ESTIMATED_HEIGHT > window.innerHeight) {
    top = rect.top - MENU_ESTIMATED_HEIGHT - MENU_SPACING;
  }

  if (right + MENU_ESTIMATED_WIDTH > window.innerWidth) {
    right = window.innerWidth - rect.left;
  }

  menu.style.top = `${top}px`;
  menu.style.right = `${right}px`;
};
