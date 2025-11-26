document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    let filter = 'all'; // 'all' | 'active' | 'completed'

    // Try to load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create list items for each task
    tasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '') return;

        const newTask = {
            text: taskText,
            completed: false,
            id: Date.now(), // unique id
        };

        tasks.push(newTask);
        saveTasks();
        createTaskElement(newTask);

        input.value = '';
        input.focus();
    });

    document.getElementById('filter-all').addEventListener('click', () => {
        filter = 'all';
        renderTasks(tasks);
    })

    document.getElementById('filter-active').getElementById('click', () => {
        filter = 'active';
        renderTasks(tasks);
    })

    document.getElementById('filter-completed').addEventListener('click', () => {
        filter = 'completed';
        renderTasks(tasks);
    })

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) li.classList.add('completed');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.classList.add('remove-btn');

        // Mark the task as complete on the click of text
        span.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks(tasks);
        });

        // Remove the task on the click of the remove button
        removeBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks(tasks);
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(tasks) {
        list.innerHTML = '';
        tasks.filter(task =>{
            if (filter === 'all') return true;
            if (filter === 'active') return task.completed === false;
            if (filter === 'completed') return task.completed === true;
        }).forEach(task => createTaskElement(task));
    }
})