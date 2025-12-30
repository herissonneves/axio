# Todo List App

A modern TODO list web application built with **vanilla HTML, CSS and JavaScript** - featuring Material Design 3, drag-and-drop reordering, task editing, theme switching, and full persistence with `localStorage`.

**Live Demo:** [https://herissonneves.github.io/axio/](https://herissonneves.github.io/axio/)

## 📦 Current version

**v1.1.0** — stable release. This version includes: core features (add / mark complete / remove tasks), drag-and-drop reordering, edit tasks with confirmation dialogs, theme toggle (light/dark), contrast levels, persistence (localStorage), filters (all / active / completed), clear completed/all, responsive layout, and Material Design 3 compliant UI.

> 📋 For detailed changelog, see [CHANGELOG.md](CHANGELOG.md)

## Demo

![Todo List Demo - Add and Remove](demo/add-and-remove.gif)
![Todo List Demo - Persistence](demo/persistence.gif)
![Todo List Demo - Filter](demo/filter.gif)
![Todo List Demo - Clear completed](demo/clear-completed.gif)

> **Note:** Additional demo GIFs for drag-and-drop, edit/delete dialogs, and theme switching coming soon.

## 🚀 Features

### Task Management
- ✅ Add a new task
- ✅ Mark tasks as completed (toggle)
- ✅ Edit existing tasks via dropdown menu
- ✅ Remove tasks with confirmation dialog
- ✅ Drag and drop to reorder tasks
- ✅ Tasks are persisted in browser storage (`localStorage`)
- ✅ Filter tasks: **All / Active / Completed**
- ✅ Clear all completed tasks
- ✅ Clear all tasks

### Design & Theming
- ✅ Material Design 3 compliant UI
- ✅ Light and dark theme toggle
- ✅ Multiple contrast levels (Default / Medium / High)
- ✅ Smooth animations and transitions
- ✅ Responsive layout
- ✅ Touch device support

### User Experience
- ✅ Confirmation dialogs for destructive actions
- ✅ Visual feedback for drag-and-drop operations
- ✅ Keyboard navigation support (Escape to close dialogs)
- ✅ Accessible with ARIA attributes
- ✅ Reduced motion preference support

## 📂 Project Structure

```
/
├── index.html
├── css/
│   ├── main.css              # Main stylesheet orchestrator
│   ├── base.css              # Base styles and resets
│   ├── layout.css            # Layout and grid styles
│   ├── components.css        # Component styles
│   ├── utilities.css        # Utility classes
│   └── themes/               # Theme definitions
│       ├── theme-light.css
│       ├── theme-light-mc.css
│       ├── theme-light-hc.css
│       ├── theme-dark.css
│       ├── theme-dark-mc.css
│       └── theme-dark-hc.css
├── js/
│   ├── main.js               # App entry point
│   └── modules/
│       ├── storage.js        # localStorage utilities
│       ├── todo.js           # Task management logic
│       └── ui.js              # UI rendering and components
├── demo/                     # Demo GIFs
└── README.md
```

## 💻 Getting Started - How to Run Locally

1. Clone the repository

    ```bash
    git clone https://github.com/herissonneves/axio.git
    cd axio
    ```

2. Open `index.html` in your browser (double-click or use VSCode Live Server / any static server)

3. Start adding tasks - the app works in the browser without any backend or build tools

## 🧠 How to Use

### Basic Operations
- Use the input field at the top to type a new task and hit "**Add Task**" to create it.
- Click on a task's text or checkbox to mark it as completed (or toggle back to active).
- Use the **three-dots menu** (⋮) next to a task to access options:
  - **Edit**: Opens a dialog to edit the task text
  - **Delete**: Opens a confirmation dialog before removing the task
- Use the filter buttons (All / Active / Completed) to view only tasks of the selected status.
- Use "**Clear Completed**" to remove all completed tasks at once.
- Use "**Clear All**" to remove all tasks.

### Drag and Drop
- Click and hold the **drag handle** (six dots icon) on the left of any task
- Drag the task to a new position in the list
- Release to drop the task in the new position
- The new order is automatically saved

### Theme and Contrast
- Click the **sun/moon icon** to toggle between light and dark themes
- Use the **contrast selector** buttons to choose contrast level:
  - **Default**: Standard contrast
  - **Medium**: Medium contrast
  - **High**: High contrast
- Your theme and contrast preferences are saved automatically

### Keyboard Shortcuts
- **Escape**: Close any open dialog
- **Enter**: Submit forms (add task, edit task)

## 🎨 Design System

This application follows **Material Design 3** guidelines:

- **Color System**: Uses Material Design 3 color tokens
- **Typography**: Roboto font family with Material Design type scale
- **Components**: Material Design 3 compliant components (buttons, dialogs, menus)
- **Elevation**: Proper shadow system for elevated surfaces
- **State Layers**: Interactive elements use state layers for feedback
- **Animations**: Smooth transitions following Material Design motion principles

## ♿ Accessibility

- **ARIA Attributes**: All interactive elements have proper ARIA labels and roles
- **Keyboard Navigation**: Full keyboard support for all features
- **Focus Management**: Proper focus handling in dialogs and menus
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Screen Readers**: Semantic HTML and ARIA attributes for screen reader support
- **High Contrast**: Support for high contrast themes

## ⚙️ Implementation Details

### Technical Stack
- **Vanilla JavaScript** (ES6 modules) - No build tools, no dependencies
- **Modern CSS** with custom properties (CSS variables)
- **HTML5** semantic markup
- **localStorage** for data persistence

### Data Structure
- Data is stored in `localStorage` as JSON-serialized array of objects.
- Each task object contains:
    ```js
    {
        id: string,        // unique UUID (or timestamp fallback)
        text: string,      // task description
        completed: boolean // completion status
    }
    ```

### Architecture
- **Modular Structure**: Code is organized into modules (storage, todo, ui)
- **Separation of Concerns**: UI, logic, and data storage are separated
- **Event-Driven**: Uses DOM events for user interactions
- **State Management**: Centralized task state with localStorage persistence

### Features Implementation
- **Drag and Drop**: Uses HTML5 Drag and Drop API with custom visual feedback
- **Dialogs**: Custom dialog components with overlay and backdrop blur
- **Menu**: Dropdown menu component with proper positioning
- **Theme System**: CSS custom properties with data attributes for theme switching
- **Persistence**: Automatic save on any task modification

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6 Modules**: Requires browser support for ES6 modules
- **localStorage**: Requires browser support for localStorage API
- **Drag and Drop API**: Requires browser support for HTML5 Drag and Drop

## 🧪 Future Improvements

- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add keyboard shortcuts documentation
- [ ] Add more demo GIFs
- [ ] Implement task categories/tags
- [ ] Add task due dates
- [ ] Add task priorities
- [ ] Optionally: persist tasks per user (backend and database)
- [ ] Mobile-friendly enhancements (e.g., swipe gestures)
- [ ] Export/import tasks (JSON)
- [ ] Task search functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to follow the existing code style and add appropriate documentation.

## 📝 About

This project was created as a practice exercise in vanilla JavaScript, HTML, and CSS - to learn DOM manipulation, `localStorage`, dynamic rendering, state management, and Material Design 3 implementation.

The application demonstrates:
- Modern JavaScript (ES6 modules)
- CSS custom properties and theming
- Component-based architecture
- Accessibility best practices
- Material Design 3 guidelines

Feel free to fork, experiment and extend it as you like. Pull requests and suggestions are welcome.

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and version history.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with 💪 using vanilla JavaScript**
