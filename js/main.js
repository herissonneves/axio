import { addTask, clearCompleted } from "./modules/todo.js";
import { renderTasks } from "./modules/ui.js";

/**
 * App entry: wires form submission, filters, and clear controls.
 */
document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_THEME = "light";
  document.documentElement.dataset.theme = DEFAULT_THEME;

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const btnClear = document.getElementById("clear-completed");
  const filterButtons = document.querySelectorAll(".todo-filters__button");

  const FILTER_MAP = {
    "filter-all": "all",
    "filter-active": "active",
    "filter-completed": "completed",
  };

  const SVG_NS = "http://www.w3.org/2000/svg";

  const renderFilterIcon = () => {
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
   * Toggle active filter button styles and assistive states.
   */
  const setActiveFilter = (activeButtonId) => {
    filterButtons.forEach((btn) => {
      const isActive = btn.id === activeButtonId;
      btn.classList.toggle("todo-filters__button--active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));

      btn.querySelector(".todo-filters__button__icon-wrapper")?.remove();

      if (isActive) {
        const iconWrapper = document.createElement("div");
        iconWrapper.classList.add("todo-filters__button__icon-wrapper");
        iconWrapper.append(renderFilterIcon());
        btn.prepend(iconWrapper);
      }
    });
  };

  /**
   * Handle filter selection.
   */
  const handleFilterClick = (event) => {
    const { id } = event.currentTarget;
    const filter = FILTER_MAP[id];
    if (!filter) return;

    setActiveFilter(id);
    renderTasks(filter);
  };

  renderTasks();
  setActiveFilter("filter-all");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks();

    input.value = "";
    input.focus();
  });

  filterButtons.forEach((button) =>
    button.addEventListener("click", handleFilterClick)
  );

  btnClear?.addEventListener("click", () => {
    clearCompleted();
    renderTasks();
    btnClear.blur();
  });
});
