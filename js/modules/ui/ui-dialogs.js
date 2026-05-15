/**
 * Interaction Dialogs
 *
 * Manages modal dialogs for:
 * - Task editing
 * - Delete confirmation
 *
 * Includes focus control, accessibility, and Escape-to-close.
 */

import { removeTask, updateTask } from "../todo.js";
import { t } from "../i18n/index.js";

/**
 * Creates and displays the delete confirmation dialog
 * @param {Object} task - Task to delete
 * @param {string} filter - Current applied filter
 * @param {Function} onRender - Callback to re-render
 */
export const showDeleteDialog = (task, filter, onRender) => {
  const dialog = document.createElement("div");
  dialog.classList.add("todo-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", "delete-dialog-title");
  dialog.setAttribute("aria-modal", "true");

  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");

  const container = document.createElement("div");
  container.classList.add("todo-dialog__container");

  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = "delete-dialog-title";
  title.textContent = t("deleteTask");

  const content = document.createElement("p");
  content.classList.add("todo-dialog__content");
  content.textContent = t("deleteTaskConfirm", { text: task.text });

  const actions = document.createElement("div");
  actions.classList.add("todo-dialog__actions");

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("todo-dialog__button", "todo-dialog__button--secondary");
  cancelBtn.textContent = t("cancel");
  cancelBtn.setAttribute("type", "button");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("todo-dialog__button", "todo-dialog__button--primary");
  deleteBtn.textContent = t("deleteButton");
  deleteBtn.setAttribute("type", "button");

  const closeDialog = () => {
    dialog.remove();
    document.body.style.overflow = "";
  };

  cancelBtn.addEventListener("click", closeDialog);
  deleteBtn.addEventListener("click", () => {
    removeTask(task.id);
    onRender(filter);
    closeDialog();
  });

  overlay.addEventListener("click", closeDialog);

  actions.append(cancelBtn, deleteBtn);
  container.append(title, content, actions);
  dialog.append(overlay, container);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";

  // Focus the first button
  cancelBtn.focus();

  // Close on Escape
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};

/**
 * Creates and displays the task edit dialog
 * @param {Object} task - Task to edit
 * @param {string} filter - Current applied filter
 * @param {Function} onRender - Callback to re-render
 */
export const showEditDialog = (task, filter, onRender) => {
  const dialog = document.createElement("div");
  dialog.classList.add("todo-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", "edit-dialog-title");
  dialog.setAttribute("aria-modal", "true");

  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");

  const container = document.createElement("div");
  container.classList.add("todo-dialog__container");

  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = "edit-dialog-title";
  title.textContent = t("editTask");

  const form = document.createElement("form");
  form.classList.add("todo-dialog__form");

  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("todo-dialog__input-wrapper");

  const label = document.createElement("label");
  label.classList.add("todo-dialog__label");
  label.setAttribute("for", "edit-task-input");
  label.textContent = t("taskDescription");

  const input = document.createElement("input");
  input.id = "edit-task-input";
  input.classList.add("todo-dialog__input");
  input.type = "text";
  input.value = task.text;
  input.required = true;
  input.setAttribute("aria-label", t("taskDescription"));

  inputWrapper.append(label, input);

  const actions = document.createElement("div");
  actions.classList.add("todo-dialog__actions");

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("todo-dialog__button", "todo-dialog__button--secondary");
  cancelBtn.textContent = t("cancel");
  cancelBtn.setAttribute("type", "button");

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("todo-dialog__button", "todo-dialog__button--primary");
  saveBtn.textContent = t("save");
  saveBtn.setAttribute("type", "submit");

  const closeDialog = () => {
    dialog.remove();
    document.body.style.overflow = "";
  };

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newText = input.value.trim();
    if (newText && newText !== task.text) {
      updateTask(task.id, newText);
      onRender(filter);
    }
    closeDialog();
  });

  overlay.addEventListener("click", closeDialog);

  actions.append(cancelBtn, saveBtn);
  form.append(inputWrapper, actions);
  container.append(title, form);
  dialog.append(overlay, container);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";

  // Focus input and select text
  input.focus();
  input.select();

  // Close on Escape
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};
