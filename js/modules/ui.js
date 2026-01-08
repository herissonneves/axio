import { getTasks, removeTask, toggleTask, reorderTasks, updateTask } from "./todo.js";
import { t } from "./i18n.js";

const listElement = document.getElementById("todo-list");
const SVG_NS = "http://www.w3.org/2000/svg";

const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

// Drag-and-drop state
let draggedItem = null;
let draggedIndex = -1;
let currentFilter = "all";

const createSvg = (attrs) => {
  const svg = document.createElementNS(SVG_NS, "svg");
  Object.entries(attrs).forEach(([key, value]) => svg.setAttribute(key, value));
  return svg;
};

const createCheckIcon = () => {
  const icon = createSvg({
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    class: "todo-item__checkbox-icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", "M4 9.4L0 5.4L1.4 4L4 6.6L10.6 0L12 1.4L4 9.4Z");
  path.classList.add("todo-item__checkbox-check");
  icon.append(path);
  return icon;
};

const createOptionsIcon = () => {
  const svg = createSvg({
    height: "16",
    width: "4",
    viewBox: "0 0 4 16",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z"
  );
  svg.append(path);
  return svg;
};

const createDragHandleIcon = () => {
  const svg = createSvg({
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    class: "todo-item__drag-icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  );
  svg.append(path);
  return svg;
};

const createEditIcon = () => {
  const svg = createSvg({
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    class: "todo-menu__icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
  );
  svg.append(path);
  return svg;
};

const createDeleteIcon = () => {
  const svg = createSvg({
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    class: "todo-menu__icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  );
  svg.append(path);
  return svg;
};

const createCheckbox = (task, filter) => {
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
    renderTasks(filter);
  });

  checkboxWrapper.append(checkbox, checkboxLayer);
  checkboxInnerContainer.append(checkboxWrapper);
  checkboxContainer.append(checkboxInnerContainer);

  return checkboxContainer;
};

const createTaskText = (task, filter) => {
  const text = document.createElement("span");
  text.classList.add("todo-item__text");
  text.textContent = task.text;
  text.addEventListener("click", () => {
    toggleTask(task.id);
    renderTasks(filter);
  });
  return text;
};

// Menu state
let openMenu = null;
let openMenuButton = null;

/**
 * Close any open menu.
 */
const closeMenu = () => {
  if (openMenu) {
    openMenu.remove();
    openMenu = null;
  }
  if (openMenuButton) {
    openMenuButton.setAttribute("aria-expanded", "false");
    openMenuButton = null;
  }
};

/**
 * Close menu when clicking outside.
 */
const handleClickOutside = (event) => {
  if (openMenu && !openMenu.contains(event.target) && !event.target.closest(".todo-item__options-btn")) {
    closeMenu();
    document.removeEventListener("click", handleClickOutside);
  }
};

/**
 * Create dropdown menu for task options.
 */
const createOptionsMenu = (task, filter, buttonElement) => {
  // Close any existing menu
  closeMenu();

  const menu = document.createElement("div");
  menu.classList.add("todo-menu");
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", t("ariaTaskOptionsMenu"));

  // Edit option
  const editItem = document.createElement("button");
  editItem.classList.add("todo-menu__item");
  editItem.setAttribute("role", "menuitem");
  editItem.setAttribute("aria-label", t("ariaEditTask"));
  editItem.append(createEditIcon());
  const editText = document.createElement("span");
  editText.classList.add("todo-menu__text");
  editText.textContent = t("edit");
  editItem.append(editText);

  editItem.addEventListener("click", () => {
    closeMenu();
    showEditDialog(task, filter);
  });

  // Delete option
  const deleteItem = document.createElement("button");
  deleteItem.classList.add("todo-menu__item");
  deleteItem.setAttribute("role", "menuitem");
  deleteItem.setAttribute("aria-label", t("ariaDeleteTask"));
  deleteItem.append(createDeleteIcon());
  const deleteText = document.createElement("span");
  deleteText.classList.add("todo-menu__text");
  deleteText.textContent = t("delete");
  deleteItem.append(deleteText);

  deleteItem.addEventListener("click", () => {
    closeMenu();
    showDeleteDialog(task, filter);
  });

  menu.append(editItem, deleteItem);

  // Position menu
  const rect = buttonElement.getBoundingClientRect();
  menu.style.position = "fixed";

  // Calculate position to avoid going off-screen
  const menuHeight = 120; // Approximate height
  const menuWidth = 160; // Approximate width
  const spacing = 4;

  let top = rect.bottom + spacing;
  let right = window.innerWidth - rect.right;

  // Adjust if menu would go below viewport
  if (top + menuHeight > window.innerHeight) {
    top = rect.top - menuHeight - spacing;
  }

  // Adjust if menu would go off right edge
  if (right + menuWidth > window.innerWidth) {
    right = window.innerWidth - rect.left;
  }

  menu.style.top = `${top}px`;
  menu.style.right = `${right}px`;

  document.body.append(menu);
  openMenu = menu;
  openMenuButton = buttonElement;

  // Close on outside click
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);

  return menu;
};

/**
 * Create and show delete confirmation dialog.
 */
const showDeleteDialog = (task, filter) => {
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
    renderTasks(filter);
    closeDialog();
  });

  overlay.addEventListener("click", closeDialog);

  actions.append(cancelBtn, deleteBtn);
  container.append(title, content, actions);
  dialog.append(overlay, container);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";

  // Focus first button
  cancelBtn.focus();

  // Close on Escape key
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};

/**
 * Create and show edit task dialog.
 */
const showEditDialog = (task, filter) => {
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
      renderTasks(filter);
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

  // Close on Escape key
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};

const createOptionsButton = (task, filter) => {
  const optionsBtn = document.createElement("button");
  optionsBtn.classList.add("todo-item__options-btn");
  optionsBtn.setAttribute("aria-label", t("ariaTaskOptions"));
  optionsBtn.setAttribute("aria-haspopup", "true");
  optionsBtn.setAttribute("aria-expanded", "false");
  optionsBtn.append(createOptionsIcon());

  optionsBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = openMenu && openMenu.parentElement;

    if (isOpen) {
      closeMenu();
      optionsBtn.setAttribute("aria-expanded", "false");
    } else {
      createOptionsMenu(task, filter, optionsBtn);
      optionsBtn.setAttribute("aria-expanded", "true");
    }
  });

  return optionsBtn;
};

const createDragHandle = () => {
  const handle = document.createElement("div");
  handle.classList.add("todo-item__drag-handle");
  handle.setAttribute("aria-label", t("ariaDragReorder"));
  handle.append(createDragHandleIcon());
  return handle;
};

/**
 * Get the index of a task element in the visible list.
 */
const getTaskIndex = (element) => {
  const items = Array.from(listElement.querySelectorAll(".todo-item__container"));
  return items.indexOf(element);
};

/**
 * Map visible index to the original tasks array index.
 */
const getOriginalIndex = (visibleIndex, filter) => {
  const tasks = getTasks();
  const predicate = FILTERS[filter] ?? FILTERS.all;
  const visibleTasks = tasks.filter(predicate);

  if (visibleIndex < 0 || visibleIndex >= visibleTasks.length) return -1;

  const visibleTask = visibleTasks[visibleIndex];
  return tasks.findIndex((t) => t.id === visibleTask.id);
};

/**
 * Handle drag start event.
 */
const handleDragStart = (event) => {
  const li = event.target.closest(".todo-item__container");
  if (!li) return;

  draggedItem = li;
  draggedIndex = getTaskIndex(li);

  li.classList.add("todo-item--dragging");

  // Set drag data and effect
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", li.dataset.id);

  // Create a custom drag image for better visual feedback
  requestAnimationFrame(() => {
    li.classList.add("todo-item--drag-ghost");
  });
};

/**
 * Handle drag end event.
 */
const handleDragEnd = (event) => {
  const li = event.target.closest(".todo-item__container");
  if (li) {
    li.classList.remove("todo-item--dragging", "todo-item--drag-ghost");
  }

  // Clean up all drag-over states
  listElement.querySelectorAll(".todo-item--drag-over").forEach((el) => {
    el.classList.remove("todo-item--drag-over");
  });

  draggedItem = null;
  draggedIndex = -1;
};

/**
 * Handle drag over event.
 */
const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const li = event.target.closest(".todo-item__container");
  if (!li || li === draggedItem) return;

  // Clear previous drag-over states
  listElement.querySelectorAll(".todo-item--drag-over").forEach((el) => {
    if (el !== li) el.classList.remove("todo-item--drag-over");
  });

  li.classList.add("todo-item--drag-over");
};

/**
 * Handle drag leave event.
 */
const handleDragLeave = (event) => {
  const li = event.target.closest(".todo-item__container");
  if (!li) return;

  // Only remove if we're leaving the element entirely
  const relatedTarget = event.relatedTarget?.closest?.(".todo-item__container");
  if (relatedTarget !== li) {
    li.classList.remove("todo-item--drag-over");
  }
};

/**
 * Handle drop event.
 */
const handleDrop = (event) => {
  event.preventDefault();

  const li = event.target.closest(".todo-item__container");
  if (!li || li === draggedItem) return;

  const targetIndex = getTaskIndex(li);
  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return;

  // Map visible indices to original indices
  const fromOriginal = getOriginalIndex(draggedIndex, currentFilter);
  const toOriginal = getOriginalIndex(targetIndex, currentFilter);

  if (fromOriginal !== -1 && toOriginal !== -1) {
    reorderTasks(fromOriginal, toOriginal);
    renderTasks(currentFilter);
  }

  li.classList.remove("todo-item--drag-over");
};

const buildTodoItem = (task, filter) => {
  const li = document.createElement("li");
  li.classList.add("todo-item__container");
  li.dataset.id = String(task.id);
  li.setAttribute("draggable", "true");

  if (task.completed) {
    li.classList.add("todo-item--completed");
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("todo-item");

  wrapper.append(
    createDragHandle(),
    createCheckbox(task, filter),
    createTaskText(task, filter),
    createOptionsButton(task, filter)
  );

  // Add drag event listeners
  li.addEventListener("dragstart", handleDragStart);
  li.addEventListener("dragend", handleDragEnd);
  li.addEventListener("dragover", handleDragOver);
  li.addEventListener("dragleave", handleDragLeave);
  li.addEventListener("drop", handleDrop);

  li.append(wrapper);
  return li;
};

/**
 * Render tasks into the listElement using the provided filter.
 */
export function renderTasks(filter = "all") {
  if (!listElement) return;

  // Close any open menu when re-rendering
  closeMenu();

  // Store current filter for drag-and-drop reordering
  currentFilter = filter;

  const predicate = FILTERS[filter] ?? FILTERS.all;

  const fragment = document.createDocumentFragment();
  getTasks()
    .filter(predicate)
    .forEach((task) => fragment.append(buildTodoItem(task, filter)));

  listElement.replaceChildren(fragment);
}
