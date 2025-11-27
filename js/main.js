import { addTask, clearCompleted } from "./modules/todo.js";
import { renderTasks } from "./modules/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const btnClear = document.getElementById('clear-completed');

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
    const filter = "all";
    renderTasks(filter);
  });

  document.getElementById("filter-active").addEventListener("click", () => {
    const filter = "active";
    renderTasks(filter);
  });

  document.getElementById("filter-completed").addEventListener("click", () => {
    const filter = "completed";
    renderTasks(filter);
  });

  btnClear.addEventListener('click', () => {
    clearCompleted();
    renderTasks();
  });
});
