/**
 * Delete task confirmation dialog.
 */

import { removeTask } from "../../todo.js";
import { t } from "../../i18n/index.js";
import { mountDialog } from "./dialog-core.js";
import {
  createDialogActions,
  createDialogButton,
  createDialogMessage,
  createDialogRoot,
  createDialogTitle,
} from "./dialog-dom.js";

/** @typedef {import("./dialog-core.js").Task} Task */
/** @typedef {import("./dialog-core.js").TaskFilter} TaskFilter */
/** @typedef {import("./dialog-core.js").RenderTasksCallback} RenderTasksCallback */

const DELETE_TITLE_ID = "delete-dialog-title";

/**
 * Opens a confirmation dialog before permanently removing a task.
 *
 * @param {Task} task - Task to delete
 * @param {TaskFilter} filter - Active list filter (passed to `onRender`)
 * @param {RenderTasksCallback} onRender - Re-renders the task list after deletion
 */
export const showDeleteDialog = (task, filter, onRender) => {
  const { dialog, container } = createDialogRoot(DELETE_TITLE_ID);

  const title = createDialogTitle(DELETE_TITLE_ID, t("deleteTask"));
  const message = createDialogMessage(t("deleteTaskConfirm", { text: task.text }));
  const actions = createDialogActions();

  const cancelBtn = createDialogButton({
    label: t("cancel"),
    variant: "secondary",
  });

  const deleteBtn = createDialogButton({
    label: t("deleteButton"),
    variant: "primary",
  });

  actions.append(cancelBtn, deleteBtn);
  container.append(title, message, actions);

  const { close } = mountDialog(dialog, { initialFocus: cancelBtn });

  cancelBtn.addEventListener("click", close);
  deleteBtn.addEventListener("click", () => {
    removeTask(task.id);
    onRender(filter);
    close();
  });
};
