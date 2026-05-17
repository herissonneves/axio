/**
 * DOM factories for modal dialog structure and controls.
 *
 * Builds reusable pieces of the `.todo-dialog` component tree.
 * Does not attach behavior or mount dialogs — see `dialog-core.js`.
 */

/**
 * Root shell for a modal dialog (overlay + container).
 *
 * @param {string} titleId - Element ID referenced by `aria-labelledby`
 * @returns {{ dialog: HTMLDivElement, overlay: HTMLDivElement, container: HTMLDivElement }}
 */
export const createDialogRoot = (titleId) => {
  const dialog = document.createElement("div");
  dialog.classList.add("todo-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", titleId);
  dialog.setAttribute("aria-modal", "true");

  const overlay = document.createElement("div");
  overlay.classList.add("todo-dialog__overlay");

  const container = document.createElement("div");
  container.classList.add("todo-dialog__container");

  dialog.append(overlay, container);

  return { dialog, overlay, container };
};

/**
 * Dialog heading element.
 *
 * @param {string} id - Unique ID for accessibility
 * @param {string} text - Visible title
 * @returns {HTMLHeadingElement}
 */
export const createDialogTitle = (id, text) => {
  const title = document.createElement("h2");
  title.classList.add("todo-dialog__title");
  title.id = id;
  title.textContent = text;
  return title;
};

/**
 * Paragraph for descriptive dialog body text.
 *
 * @param {string} text - Message content
 * @returns {HTMLParagraphElement}
 */
export const createDialogMessage = (text) => {
  const message = document.createElement("p");
  message.classList.add("todo-dialog__content");
  message.textContent = text;
  return message;
};

/**
 * Horizontal row for primary/secondary actions.
 *
 * @returns {HTMLDivElement}
 */
export const createDialogActions = () => {
  const actions = document.createElement("div");
  actions.classList.add("todo-dialog__actions");
  return actions;
};

/**
 * Styled dialog action button.
 *
 * @param {Object} options
 * @param {string} options.label - Visible button label
 * @param {'primary'|'secondary'} options.variant - Visual style
 * @param {'button'|'submit'} [options.type='button'] - Native button type
 * @returns {HTMLButtonElement}
 */
export const createDialogButton = ({ label, variant, type = "button" }) => {
  const button = document.createElement("button");
  button.classList.add("todo-dialog__button", `todo-dialog__button--${variant}`);
  button.textContent = label;
  button.setAttribute("type", type);
  return button;
};

/**
 * Form with a single required text field for editing a task description.
 *
 * @param {Object} options
 * @param {string} options.inputId - ID linked to the label's `for` attribute
 * @param {string} options.initialValue - Pre-filled task text
 * @param {string} options.labelText - Accessible label copy
 * @returns {{ form: HTMLFormElement, input: HTMLInputElement }}
 */
export const createEditTaskForm = ({ inputId, initialValue, labelText }) => {
  const form = document.createElement("form");
  form.classList.add("todo-dialog__form");

  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("todo-dialog__input-wrapper");

  const label = document.createElement("label");
  label.classList.add("todo-dialog__label");
  label.setAttribute("for", inputId);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.id = inputId;
  input.classList.add("todo-dialog__input");
  input.type = "text";
  input.value = initialValue;
  input.required = true;
  input.setAttribute("aria-label", labelText);

  inputWrapper.append(label, input);
  form.append(inputWrapper);

  return { form, input };
};
