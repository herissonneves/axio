/**
 * Dismisses the menu when the user clicks outside it.
 */

import { OPTIONS_BUTTON_SELECTOR } from "./menu-dom.js";
import { closeMenu, getOpenMenu } from "./menu-state.js";

/**
 * Registers a one-shot document click listener to close the menu when clicking
 * outside both the menu and the options trigger buttons.
 *
 * Deferred with `setTimeout` so the opening click does not immediately dismiss.
 */
export const attachClickOutsideDismiss = () => {
  const handleClickOutside = (event) => {
    const menu = getOpenMenu();
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    const element = target instanceof Element ? target : target.parentElement;
    const clickedOptionsButton = element?.closest(OPTIONS_BUTTON_SELECTOR);

    if (menu && !menu.contains(target) && !clickedOptionsButton) {
      closeMenu();
      document.removeEventListener("click", handleClickOutside);
    }
  };

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
};
