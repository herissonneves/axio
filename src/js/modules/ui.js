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
      if (task.completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.textContent = task.text;
      if (task.completed) span.classList.add('completed');

      span.addEventListener('click', () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✖️';
      removeBtn.classList.add('remove-btn');
      removeBtn.addEventListener('click', () => {
        removeTask(task.id);
        renderTasks(filter);
      });

      li.append(span, removeBtn);
      listElement.appendChild(li);
    });
}