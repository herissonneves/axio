# Todo List App

A TODO list web application built with **vanilla HTML, CSS and JavaScript** - supports adding, removing, marking tasks as completed, persistence, with `localStorage`, and filtering by status (all / active / completed).

## 🚀 Features

- Add a new task
- Mark tasks as completed (toggle)
- Remove tasks
- Tasks are persisted in browser storage (`localStorage`)
- Filter tasks: **All / Active / Completed**
- Clean, minimal UI with a responsive layout

## 📂 Project Structure

```
/
├── index.html
├── css/
    └── style.css
├── js/
    └── modules/
        └── storage.js
        └── todo.js
        └── ui.js
    └── main.js
```

## 💻 Getting Started - How to Run Locally

1. Clone the repository

    ```bash
    git clone https://github.com/herissonneves/todo-vanilla-js.git

2. Open `index.html` in your browser (double-click or use VSCode Live Server / any static server)

3. Start adding tasks - the app works in the browser without any backend

## 🧠 How to Use

- Use the input field at the top to type a new task and hit "**Add Task**" to create it.
- Click on a task's text to mark it as completed (or toggle back to active).
- Use de ✖️ button next to a task to remove it.
- Use the filter buttons (All / Active / Completed) to view only tasks of the selected status.
- Tasks are saved automatically in the browser: reload or close/open the tab, and your tasks persist.

## ⚙️ Implementation Details

- Data is stored in `localStorage` as JSON-serialized array of objects.
- Each task object contains:
    ```js
    {
        id: number,        // unique timestamp-based id
        text: string,      // task description
        completed: boolean // completion status
    }

- On page load, tasks are loaded from `localStorage` and rendered.
- On add / toggle / remove - a task array is updated, saved to `localStorage`, and the task list is re-rendered based on current filter.

## 🧪 Future Improvements (Todo)

- Edit existing tasks (change text)
- Clear all tasks / clear all completed
- Drag & drop to reorder tasks
- Optionally: persist tasks per user (backend and database)
- Mobile-friendly enhancements (e.g., swipe to remove on touch devices)

## 📝 About

This project was created as a practice exercise in vanilla JavaScript, HTML, and CSS—to learn DOM manipulation, `localStorage`, dynamic rendering, and basic state management.

Feel free to fork, experiment and extend it as you like. Pull requests and suggestions are welcome.