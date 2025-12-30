# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-XX

### Added
- **Drag and Drop Reordering** (#22)
  - Drag tasks to reorder them in the list
  - Works seamlessly with all filters (All, Active, Completed)
  - Order persisted in localStorage
  - Material Design 3 visual feedback with animations
  - Touch device support
  - Reduced motion preference support

- **Edit Existing Tasks** (#20)
  - Dropdown menu with Edit and Delete options (three-dots menu)
  - Edit task dialog with form validation
  - Delete confirmation dialog to prevent accidental deletions
  - Material Design 3 compliant dialogs
  - Keyboard navigation support (Escape to close dialogs)
  - Proper ARIA attributes for accessibility

- **Theme System**
  - Light and dark theme toggle
  - Multiple contrast levels (Default, Medium, High)
  - Theme and contrast preferences persisted in localStorage
  - Smooth theme transitions

- **Clear All Tasks**
  - Button to remove all tasks at once
  - Confirmation before clearing (via delete confirmation dialog)

### Changed
- **Task ID Generation**: Changed from timestamp-based to UUID-based IDs (with timestamp fallback)
- **Delete Behavior**: Now requires confirmation via dialog before removing tasks
- **UI Components**: All components now follow Material Design 3 guidelines
- **Project Structure**: Reorganized CSS files into modular structure (base, layout, components, themes, utilities)

### Improved
- **Accessibility**: Enhanced ARIA attributes throughout the application
- **User Experience**: Better visual feedback for all interactions
- **Code Organization**: Improved module structure and separation of concerns
- **Responsive Design**: Better support for touch devices

### Technical
- Added `updateTask()` function to task management module
- Added `reorderTasks()` function for drag-and-drop functionality
- Implemented custom dialog components
- Implemented dropdown menu component
- Enhanced drag-and-drop event handling

## [1.0.0] - Initial Release

### Added
- **Core Task Management**
  - Add new tasks
  - Mark tasks as completed/incomplete (toggle)
  - Remove tasks
  - Tasks persisted in browser storage (localStorage)

- **Filtering**
  - Filter tasks by status: All, Active, Completed
  - Visual indicator for active filter

- **Clear Completed**
  - Button to remove all completed tasks at once

- **Responsive Layout**
  - Clean, minimal UI
  - Responsive design for different screen sizes

### Technical
- Vanilla JavaScript (ES6 modules)
- Modern CSS with custom properties
- localStorage for data persistence
- Modular code structure (storage, todo, ui modules)

---

## [Unreleased]

### Planned
- Unit and integration tests
- Additional demo GIFs
- Task categories/tags
- Task due dates
- Task priorities
- Export/import tasks (JSON)
- Task search functionality
- Mobile swipe gestures

---

## Release Notes Format

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

[1.1.0]: https://github.com/herissonneves/axio/releases/tag/v1.1.0
[1.0.0]: https://github.com/herissonneves/axio/releases/tag/v1.0.0

