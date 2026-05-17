/**
 * Task options dropdown menu.
 *
 * @module ui/menu
 *
 * Structure:
 * - `menu-state.js` — single open menu session
 * - `menu-dom.js` — menu markup factories
 * - `menu-position.js` — viewport-aware fixed positioning
 * - `menu-outside.js` — click-outside dismissal
 * - `menu-options.js` — build and mount edit/delete menu
 * - `menu-toggle.js` — open/close toggle
 */

export { closeMenu } from "./menu-state.js";
export { createOptionsMenu } from "./menu-options.js";
export { toggleMenu } from "./menu-toggle.js";
