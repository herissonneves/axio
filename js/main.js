import {addTask, clearCompleted} from "./modules/todo.js";
import {renderTasks} from "./modules/ui.js";

document.documentElement.setAttribute("data-theme", "light");

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const btnClear = document.getElementById('clear-completed');

  const filterButtons = document.querySelectorAll(".todo-filters__button");

  /* ------------------------- */
  /* SET ACTIVE FILTER BUTTON  */

  /* ------------------------- */
  function setActiveFilter(activeButtonId) {
    const buttons = document.querySelectorAll(".todo-filters__button");

    buttons.forEach((btn) => {
      btn.classList.remove("todo-filters__button--active");
      btn.setAttribute("aria-pressed", "false");

      const existingIcon = btn.querySelector(".todo-filters__button__icon-wrapper");
      if (existingIcon) existingIcon.remove();
    })

    const activeButton = document.getElementById(activeButtonId);
    activeButton.classList.add("todo-filters__button--active");
    activeButton.setAttribute("aria-pressed", "true");

    const checkIconDiv = document.createElement("div");
    checkIconDiv.classList.add("todo-filters__button__icon-wrapper");

    const svgns = "http://www.w3.org/2000/svg";
    const icon = document.createElementNS(svgns, "svg");
    icon.setAttribute("width", "13");
    icon.setAttribute("height", "10");
    icon.setAttribute("viewBox", "0 0 13 10");
    icon.classList.add("todo-filters__check-icon");

    const path = document.createElementNS(svgns, "path");
    path.setAttribute("d", "M4.275 9.01875L0 4.74375L1.06875 3.675L4.275 6.88125L11.1563 0L12.225 1.06875L4.275 9.01875Z");

    icon.appendChild(path);
    checkIconDiv.appendChild(icon);

    activeButton.prepend(checkIconDiv);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks();

    input.value = "";
    input.focus();
  });

  document.getElementById("filter-all").addEventListener("click", () => {
    setActiveFilter("filter-all");
    renderTasks("all");
  });

  document.getElementById("filter-active").addEventListener("click", () => {
    setActiveFilter("filter-active");
    renderTasks("active");
  });

  document.getElementById("filter-completed").addEventListener("click", () => {
    setActiveFilter("filter-completed");
    renderTasks("completed");
  });

  btnClear.addEventListener('click', () => {
    clearCompleted();
    renderTasks();
    btnClear.blur();
  });
});
