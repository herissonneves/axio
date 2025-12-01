import { getTasks, removeTask, toggleTask } from "./todo.js";

const listElement = document.getElementById('todo-list');

export function renderTasks(filter = 'all') {
  listElement.innerHTML = '';

  getTasks().
    filter(task => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
    }).forEach(task => {
      const li = document.createElement('li');
      li.setAttribute("data-id", task.id);

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('todo-item');

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      const span = document.createElement('span');
      span.textContent = task.text;
      if (task.completed) span.classList.add('completed');


      if (task.completed) li.classList.add('completed');


      span.addEventListener('click', () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.setAttribute('aria-label', 'Remove task');

      // cria o SVG dentro do botão
      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("height", "1.5rem");
      svg.setAttribute("width", "1.5rem");
      svg.setAttribute("viewBox", "0 -960 960 960");
      svg.setAttribute("fill", "#e3e3e3");
      const path = document.createElementNS(svgns, "path");
      path.setAttribute("d",
          "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      );
      svg.appendChild(path);

      removeBtn.appendChild(svg);

      removeBtn.addEventListener('click', () => {
        removeTask(task.id);
        renderTasks(filter);
      });

      li.append(checkbox, span, removeBtn);
      li.appendChild(itemDiv);
      listElement.appendChild(li);
    });
}