import { getTasks, removeTask, toggleTask } from "./todo.js";

const listElement = document.getElementById('todo-list');

export function renderTasks(filter = 'all') {
  listElement.innerHTML = '';

  getTasks()
    .filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
    })
    .forEach((task) => {
      /* -----------------------------
       * LIST ITEM (todo-item)
       * ----------------------------- */
      const li = document.createElement('li');
      li.classList.add("todo-item");
      li.dataset.id = task.id;

      if (task.completed) {
        li.classList.add("todo-item--completed");
      }

      /* -----------------------------
      * CHECKBOX AREA
      * Wrappers follow BEM structure:
      * todo-item__checkbox-wrapper
      * └── todo-item__checkbox-layer
      *     └── todo-item__checkbox
      * ----------------------------- */
      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.classList.add("todo-item__checkbox-wrapper");

      const checkboxLayer = document.createElement("div");
      checkboxLayer.classList.add("todo-item__checkbox-layer");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      checkbox.classList.add("todo-item__checkbox");
      checkbox.setAttribute("aria-label", "Mark task as completed");
      checkbox.checked = task.completed;

      checkbox.addEventListener("change", () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      checkboxLayer.appendChild(checkbox);
      checkboxWrapper.appendChild(checkboxLayer);

      /* -----------------------------
       * TEXT SPAN (todo-item__text)
       * ----------------------------- */
      const span = document.createElement("span");
      span.classList.add("todo-item__text");
      span.textContent = task.text;

      span.addEventListener('click', () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      /* -----------------------------
       * OPTIONS BUTTON (todo-item__options-btn)
       * ----------------------------- */
      const optionsBtn = document.createElement('button');
      optionsBtn.classList.add("todo-item__options-btn");
      optionsBtn.setAttribute("aria-label", "Task options");

      // SVG icon
      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("height", "16");
      svg.setAttribute("width", "4");
      svg.setAttribute("viewBox", "0 0 4 16");

      const path = document.createElementNS(svgns, "path");
      path.setAttribute(
        "d",
        "M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z"
      );

      svg.appendChild(path);
      optionsBtn.appendChild(svg);

      optionsBtn.addEventListener('click', () => {
        removeTask(task.id);
        renderTasks(filter);
      });

      /* -----------------------------
       * APPEND FINAL STRUCTURE
       * ----------------------------- */
      li.append(checkboxWrapper, span, optionsBtn);
      listElement.appendChild(li);
    });
}