/**
 * Edit task description dialog.
 */

import { updateTask } from "../../todo.js";
import { t } from "../../i18n/index.js";
import { mountDialog } from "./dialog-core.js";
import {
  createDialogActions,
  createDialogButton,
  createDialogRoot,
  createDialogTitle,
  createEditTaskForm,
} from "./dialog-dom.js";

/** @typedef {import("./dialog-core.js").Task} Task */
/** @typedef {import("./dialog-core.js").TaskFilter} TaskFilter */
/** @typedef {import("./dialog-core.js").RenderTasksCallback} RenderTasksCallback */

const EDIT_TITLE_ID = "edit-dialog-title";
const EDIT_INPUT_ID = "edit-task-input";

/**
 * Opens a modal form to change a task description.
 *
 * Saves only when the trimmed text is non-empty and different from the original.
 *
 * @param {Task} task - Task to edit
 * @param {TaskFilter} filter - Active list filter (passed to `onRender`)
 * @param {RenderTasksCallback} onRender - Re-renders the task list after a successful save
 */
export const showEditDialog = (task, filter, onRender) => {
  const { dialog, container } = createDialogRoot(EDIT_TITLE_ID);

  const title = createDialogTitle(EDIT_TITLE_ID, t("editTask"));
  const { form, input } = createEditTaskForm({
    inputId: EDIT_INPUT_ID,
    initialValue: task.text,
    labelText: t("taskDescription"),
  });

  const actions = createDialogActions();
  const cancelBtn = createDialogButton({
    label: t("cancel"),
    variant: "secondary",
  });
  const saveBtn = createDialogButton({
    label: t("save"),
    variant: "primary",
    type: "submit",
  });

  actions.append(cancelBtn, saveBtn);
  form.append(actions);
  container.append(title, form);

  const { close } = mountDialog(dialog, {
    initialFocus: input,
    selectOnFocus: true,
  });

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newText = input.value.trim();

    if (newText && newText !== task.text) {
      updateTask(task.id, newText);
      onRender(filter);
    }

    close();
  });
};
