/**
 * Task Filter Management
 *
 * Manages task filter selection and display.
 */

import { FILTER_MAP, SVG_NS } from "./app-config.js";
import { renderTasks } from "../ui/index.js";

/**
 * Current filter state
 * @private
 */
let currentFilter = "all";

/**
 * Gets the current filter
 * @returns {string} Current filter (all, active, or completed)
 */
export const getCurrentFilter = () => currentFilter;

/**
 * Sets the current filter
 * @param {string} filter - New filter
 */
export const setCurrentFilter = (filter) => {
  currentFilter = filter;
};

/**
 * Creates the check icon to indicate the active filter
 * @returns {SVGElement} SVG check icon element
 */
export const createFilterIcon = () => {
  const icon = document.createElementNS(SVG_NS, "svg");
  icon.setAttribute("width", "13");
  icon.setAttribute("height", "10");
  icon.setAttribute("viewBox", "0 0 13 10");
  icon.classList.add("todo-filters__check-icon");

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M4.275 9.01875L0 4.74375L1.06875 3.675L4.275 6.88125L11.1563 0L12.225 1.06875L4.275 9.01875Z"
  );

  icon.append(path);
  return icon;
};

/**
 * Toggles active filter button styles and accessibility states
 * @param {NodeList} filterButtons - List of filter buttons
 * @param {string} activeButtonId - ID of the active filter button
 */
export const setActiveFilter = (filterButtons, activeButtonId) => {
  filterButtons.forEach((btn) => {
    const isActive = btn.id === activeButtonId;
    btn.classList.toggle("todo-filters__button--active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));

    btn.querySelector(".todo-filters__button-icon-wrapper")?.remove();

    if (isActive) {
      const iconWrapper = document.createElement("div");
      iconWrapper.classList.add("todo-filters__button-icon-wrapper");
      iconWrapper.append(createFilterIcon());
      btn.prepend(iconWrapper);
    }
  });
};

/**
 * Handles a filter button click
 * @param {NodeList} filterButtons - List of filter buttons
 * @param {Event} event - Click event
 * @returns {string} Applied filter
 */
export const handleFilterClick = (filterButtons, event) => {
  const { id } = event.currentTarget;
  const filter = FILTER_MAP[id];
  if (!filter) return currentFilter;

  currentFilter = filter;
  setActiveFilter(filterButtons, id);
  renderTasks(filter);

  return filter;
};

/**
 * Applies a specific filter
 * @param {NodeList} filterButtons - List of filter buttons
 * @param {string} filter - Filter to apply (all, active, or completed)
 * @param {string} buttonId - Corresponding button ID
 */
export const applyFilter = (filterButtons, filter, buttonId) => {
  currentFilter = filter;
  setActiveFilter(filterButtons, buttonId);
  renderTasks(filter);
};
