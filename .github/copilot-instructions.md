# Copilot Instructions

## Project Snapshot
- Vanilla stack: semantic markup in [index.html](../index.html), modular JS in [js/](../js), layered CSS in [css/](../css); no bundler or node toolchain.
- App boots by importing `main.js` as an ES module; always keep new scripts browser-native.
- Tasks persist entirely in `localStorage`, so any feature relying on external services must provide its own adapters.
- Follow the behavioral expectations captured in [README.md](../README.md); the deployed demo mirrors the repo state.

## Architecture Flow
- [js/main.js](../js/main.js) wires DOM events after `DOMContentLoaded`, sets the document theme attribute, and orchestrates filters, the add form, and the clear-completed button.
- [js/modules/todo.js](../js/modules/todo.js) is the single source of truth for the in-memory `tasks` array; every mutation must flow through its helpers so persistence stays consistent.
- [js/modules/storage.js](../js/modules/storage.js) is a thin wrapper around `localStorage` with JSON serialization; guard against `localStorage` availability if you add environments such as SSR or tests.
- [js/modules/ui/](../js/modules/ui/) owns rendering; the modular structure includes ui-render.js for main rendering, ui-elements.js for components, ui-dialogs.js for modals, ui-menu.js for context menus, ui-drag.js for drag-and-drop, and ui-icons.js for SVG icons. Import from `ui/index.js` which exports `renderTasks(filter)` that rebuilds the DOM on each call.

## State & Persistence Guidelines
- Task objects currently use `{ id: timestamp, text, completed }`; extend this schema cautiously and migrate existing data via `loadTasks()` fallbacks.
- After every mutation you must call `saveTasks(tasks)` inside the `todo.js` helpers; never write to `localStorage` directly from UI code to avoid divergence.
- Filters are string literals (`all | active | completed`) passed to `renderTasks`; keep additional filter modes extensible through this same entry point.
- `clearCompleted()` is the only batch mutation today; follow its pattern (mutate array → save → trigger re-render) for future bulk operations.

## UI Rendering Patterns
- BEM-style classes (`todo-page__title`, `todo-item__checkbox-layer`, etc.) drive both structure and styling; reuse existing blocks instead of inventing new naming schemes.
- `renderTasks()` re-creates list items from scratch and reattaches handlers (`toggleTask`, `removeTask`), so new interactive elements must be wired within that loop.
- Checkbox and filter buttons inject inline SVG icons built via DOM APIs (see `svgns` usage); match this approach for consistent theming.
- The filter buttons manage ARIA attributes and an icon wrapper via `setActiveFilter()`; keep accessibility states (aria-pressed, aria-live) in sync when altering filters.

## Styling & Theming
- Global styles live in [css/main.css](../css/main.css) and compose foundational layers from [css/base.css](../css/base.css), [css/layout.css](../css/layout.css), etc.; update tokens consistently across layers.
- The `themes/` directory contains light/dark/high-contrast variants that rely on the `data-theme` attribute set in `main.js`; new themes should follow the same attribute contract.
- Buttons, checkboxes, and list items rely on CSS custom properties for colors and spacing—extend those variables before hardcoding values.
- Animations and focus states are already tuned for accessibility; audit hover/focus/aria feedback whenever you touch interactive elements.

## Local Dev & Testing
- There is no build step: open [index.html](../index.html) directly or run a static server (e.g., VS Code Live Server) for local testing.
- Use browser devtools to inspect `localStorage` under the `tasks` key when debugging persistence issues.
- Manual regression checks should cover add → toggle → remove flows plus each filter and the "Clear Completed" action, mirroring the GIFs in [demo/](../demo).
- When adding dependencies, prefer URL-based modules or self-hosted scripts; document any new setup requirements in [README.md](../README.md).
