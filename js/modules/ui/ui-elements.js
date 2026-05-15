/**
 * UI Elements - Basic Components
 *
 * Reusable components for building task items:
 * - Checkbox with state
 * - Task text
 * - Options button
 * - Drag handle
 */

import { toggleTask } from "../todo.js";
import { t } from "../i18n/index.js";
import { createCheckIcon, createOptionsIcon, createDragHandleIcon } from "./ui-icons.js";

/**
 * Creates the checkbox component for a task
 * @param {Object} task - Task object
 * @param {string} filter - Current applied filter
 * @param {Function} onRender - Callback to re-render
 * @returns {HTMLElement} Checkbox container element
 */
export const createCheckbox = (task, filter, onRender) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("todo-item__checkbox-container");

  const checkboxInnerContainer = document.createElement("div");
  checkboxInnerContainer.classList.add("todo-item__checkbox-inner-container");

  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.classList.add("todo-item__checkbox-wrapper");

  const checkboxLayer = document.createElement("div");
  checkboxLayer.classList.add("todo-item__checkbox-layer");
  checkboxLayer.append(createCheckIcon());

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-item__checkbox");
  checkbox.setAttribute("aria-label", t("ariaMarkCompleted", { text: task.text }));
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    toggleTask(task.id);
    onRender(filter);
  });

  checkboxWrapper.append(checkbox, checkboxLayer);
  checkboxInnerContainer.append(checkboxWrapper);
  checkboxContainer.append(checkboxInnerContainer);

  return checkboxContainer;
};

/**
 * Creates the task text element
 * @param {Object} task - Task object
 * @param {string} filter - Current applied filter
 * @param {Function} onRender - Callback to re-render
 * @returns {HTMLElement} Span element with task text
 */
export const createTaskText = (task, filter, onRender) => {
  const text = document.createElement("span");
  text.classList.add("todo-item__text");
  text.textContent = task.text;
  text.addEventListener("click", () => {
    toggleTask(task.id);
    onRender(filter);
  });
  return text;
};

/**
 * Creates the options button (three dots) for a task
 * @param {Object} task - Task object
 * @param {string} filter - Current applied filter
 * @param {Function} onMenuToggle - Callback to open/close menu
 * @returns {HTMLElement} Options button element
 */
export const createOptionsButton = (task, filter, onMenuToggle) => {
  const optionsBtn = document.createElement("button");
  optionsBtn.classList.add("todo-item__options-btn");
  optionsBtn.setAttribute("aria-label", t("ariaTaskOptions"));
  optionsBtn.setAttribute("aria-haspopup", "true");
  optionsBtn.setAttribute("aria-expanded", "false");
  optionsBtn.append(createOptionsIcon());

  optionsBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    onMenuToggle(task, filter, optionsBtn);
  });

  return optionsBtn;
};

/**
 * Creates the drag handle element for a task
 * @returns {HTMLElement} Drag handle element
 */
export const createDragHandle = () => {
  const handle = document.createElement("div");
  handle.classList.add("todo-item__drag-handle");
  handle.setAttribute("aria-label", t("ariaDragReorder"));
  handle.append(createDragHandleIcon());
  return handle;
};
