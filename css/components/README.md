# CSS Components

This directory contains user interface component styles, organized by functionality.

## Structure

Each CSS file contains styles for a specific component or related group of components:

### `header.css`

Page header and main title styles.

- `.todo-page__header` - Header container
- `.todo-page__title` - Main application title

### `language-selector.css`

Language selector and dropdown menu.

- `.language-selector` - Language selector button
- `.language-menu` - Language dropdown menu
- `.language-menu__item` - Individual menu item

### `theme-controls.css`

Theme (light/dark) and contrast controls.

- `.theme-controls` - Controls container
- `.theme-toggle` - Theme toggle button
- `.contrast-selector` - Contrast level selector

### `form.css`

Task creation form.

- `.todo-form` - Form container
- `.todo-form__input` - Text input field
- `.todo-form__button` - Add task button

### `todo-item.css`

Individual task item and its elements.

- `.todo-item` - Task item container
- `.todo-item__checkbox` - Completion checkbox
- `.todo-item__text` - Task text
- `.todo-item__options-btn` - Options button (⋮)

### `filters.css`

View filter buttons (All / Active / Completed).

- `.todo-filters` - Filters container
- `.todo-filters__button-wrapper` - Button wrapper
- `.todo-filters__button--active` - Active filter state

### `clear-buttons.css`

Clear buttons (Clear Completed / Clear All).

- `.todo-clear` - Buttons container
- `.todo-clear__button` - Clear button

### `drag-drop.css`

Drag-and-drop interaction styles.

- `.todo-item__drag-handle` - Drag handle
- `.todo-item--dragging` - State while dragging
- `.todo-item--drag-over` - Drop target state

### `menu.css`

Task options menu (Edit / Delete).

- `.todo-menu` - Menu container
- `.todo-menu__item` - Menu item
- `.todo-menu__icon` - Item icon

### `dialog.css`

Modal dialogs (edit task, delete, shortcuts).

- `.todo-dialog` - Dialog container
- `.todo-dialog__overlay` - Background overlay
- `.todo-dialog__container` - Content container
- `.todo-dialog__button` - Action buttons
- `.shortcuts-dialog` - Keyboard shortcuts dialog

## Usage

Components are imported automatically through the main `css/components.css` file, which is then imported by `css/main.css`.

## Material Design 3

All components follow Material Design 3 guidelines:

- Color tokens (`--md-sys-color-*`)
- Typography (`--md-text-*`)
- State layers for interactivity
- Proper elevation and shadows
- Smooth animations and transitions

## Accessibility

Components include:

- Visible focus states
- Adequate color contrast
- `prefers-reduced-motion` support
- Appropriate touch sizes for mobile devices
