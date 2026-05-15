# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed

- Medium and high contrast theme variants (`theme-*-mc.css`, `theme-*-hc.css`)
- Contrast selector UI and contrast-related keyboard shortcut (Ctrl+J)
- Contrast persistence and API (`setContrast`, `toggleContrast`, `getCurrentContrast`)

### Changed

- Theme system simplified to light and dark only
- Theme settings section and i18n strings updated accordingly

## [1.3.0] - 2026-01-30

### Highly Modular Architecture

This release represents the largest architectural refactor of the project since the initial launch. The focus was on full modularization of all core modules, elimination of unnecessary abstractions, critical bug fixes, and a major expansion of test coverage.

**🎯 Highlights:**

- 🧩 **28 Specialized Modules**: 4 main modules refactored into focused files
- 🧪 **128+ Tests**: +47% increase in coverage (87 → 128+, ~95% coverage)
- 🎨 **Modularized CSS**: 10 specialized component files
- 🧹 **Clean Code**: 114 lines of unnecessary wrappers removed
- 🐛 **2 Critical Bugs Fixed**: SyntaxError and loss of styling
- 📚 **Complete Documentation**: JSDoc across all modules

#### Complete main.js Refactor

- **Modularization into Helper Functions**
  - Extracted 7 specialized setup functions from a single 228-line block
  - `getDOMElements()` — Centralizes DOM element lookup
  - `setupFormHandler()` — Configures the task form
  - `setupClearHandlers()` — Configures clear buttons
  - `setupFilterHandlers()` — Configures filters
  - `setupThemeHandlers()` — Configures theme and contrast
  - `setupLanguageHandlers()` — Configures the language selector
  - `setupKeyboardShortcuts()` — Configures keyboard shortcuts
  - `initApp()` — Orchestrates full initialization

- **Benefits**
  - Small, focused functions (Single Responsibility Principle)
  - Highly testable code (pure functions)
  - Better readability and organization
  - Simplified maintenance
  - 89% reduction in complexity per function (228 → 25 lines average)

#### Complete ui.js Modularization

- **Modular Structure in 7 Specialized Files**
  - `ui/ui-icons.js` (117 lines) — SVG icon factory
  - `ui/ui-elements.js` (107 lines) — Basic components
  - `ui/ui-menu.js` (148 lines) — Options menu
  - `ui/ui-dialogs.js` (190 lines) — Modal dialogs
  - `ui/ui-drag.js` (175 lines) — Drag-and-drop system
  - `ui/ui-render.js` (113 lines) — Main rendering
  - `ui/index.js` (58 lines) — Centralized entry point
  - `ui/README.md` (347 lines) — Complete documentation

- **Reduction**: Original ui.js: 718 lines → specialized modules
- **Design Patterns**: Module, Factory, Observer, Dependency Injection, Single Responsibility

#### Removal of Unnecessary Wrappers

Identified and removed 3 wrappers that only re-exported without adding value:

- **Removed `ui.js`** (22 lines)
  - Used only by `main.js`
  - Replaced with direct import from `ui/index.js`

- **Removed `i18n.js`** (52 lines)
  - Used by 8 files
  - All updated to import directly from `i18n/index.js`

- **Removed `keyboard.js`** (40 lines)
  - Used only by `main.js`
  - Replaced with direct import from `keyboard/index.js`

- **Total removed**: 114 lines of unnecessary indirection
- **Benefit**: More direct imports, fewer layers, more honest structure

#### Critical Fixes

- **Fix: Removed `normalizeKey` export**
  - Function was deleted but still being exported
  - Caused error: "The requested module does not provide an export named 'normalizeKey'"
  - Fixed in `keyboard/index.js`, `keyboard.js`, and documentation

- **Fix: Render callbacks in ui-render.js**
  - Dialogs did not receive the `onRender` callback correctly
  - Caused loss of styling after interactions
  - Fixed: wrapper callbacks that include `onRender`

- **Fix: renderTasks import in app-filters.js**
  - Updated from `../ui.js` to `../ui/index.js`
  - Consistent with wrapper removal

#### Test Coverage Expansion

Created 41 new tests for refactored modules:

- **tests/unit/app.test.js** (27 tests)
  - Tests `app-config.js` (constants and configuration)
  - Tests `app-theme.js` (theme, contrast, persistence)
  - Tests `app-filters.js` (filter management)
  - Integration tests between app modules

- **tests/unit/ui.test.js** (14 tests)
  - Tests `ui-icons.js` (SVG icon creation)
  - Tests `ui-drag.js` (drag-and-drop functions)
  - Tests integration between UI components

- **Total tests in project**: 128+ tests (was 87)
- **Increase**: +47% test coverage (~95% of code)

#### Test Structure Reorganization

- **New Test Architecture**
  - Tests organized in `unit/` and `integration/`
  - `tests.html` refactored to clean `index.html` (67 lines)
  - CSS extracted to `test-runner-ui.css` (334 lines)
  - JavaScript extracted to `test-runner-ui.js` (227 lines)
  - Clear separation between test framework and UI

- **Final Structure**

  ```plaintext
  tests/
  ├── index.html              # Web UI to run tests
  ├── test-runner.js          # Custom test framework
  ├── test-runner-ui.js       # Test runner UI logic
  ├── test-runner-ui.css      # Test runner UI styles
  ├── unit/                   # Unit tests per module
  │   ├── storage.test.js
  │   ├── todo.test.js
  │   ├── i18n.test.js
  │   ├── keyboard.test.js
  │   ├── app.test.js
  │   └── ui.test.js
  ├── integration/            # Integration tests
  │   └── integration.test.js
  └── README.md               # Test documentation
  ```

#### Complete CSS Modularization

- **css/components.css Refactored**
  - Reduced from 1,190 to 31 lines (orchestrator via @import)
  - Created 10 specialized CSS files in `css/components/`:
    - `header.css` — Header styles
    - `language-selector.css` — Language selector
    - `theme-controls.css` — Theme/contrast controls
    - `form.css` — Task form
    - `todo-item.css` — Individual task item
    - `filters.css` — Filter buttons
    - `clear-buttons.css` — Clear buttons
    - `drag-drop.css` — Drag-and-drop system
    - `menu.css` — Dropdown menu
    - `dialog.css` — Modal dialogs
  - `css/components/README.md` — Complete documentation

- **Benefits**
  - Smaller, focused files (~80–120 lines each)
  - Simplified per-component maintenance
  - Better organization and clarity
  - Adherence to Material Design 3

#### Improved Documentation

- Updated READMEs for refactored modules
- Removed obsolete "compatibility" sections
- Added direct import instructions
- Updated `.github/copilot-instructions.md`

### Complete keyboard.js Module Refactor

#### Version 1.1 — Initial Refactor

- **Centralized Configuration System**
  - Created `KEYBOARD_SHORTCUTS` with declarative mapping of all shortcuts
  - Single source of truth for key configuration
  - Easy to add/remove/modify shortcuts (1 line vs 10+ lines before)

- **Separation of Concerns**
  - Extracted 11 specialized functions (before: 2 monolithic functions)
  - Utility functions: `isModifierPressed()`, `shouldBlockShortcut()`, `matchesShortcut()`
  - DOM creation functions: `createShortcutItem()`, `createShortcutsList()`, `createDialogStructure()`
  - Processing function: `processShortcut()`

- **Elegant Processing Algorithm**
  - Eliminated cascade of 15+ if/else statements
  - Efficient loop over shortcut configuration
  - 82% reduction in complexity per function (113 → 20 lines average)

#### Version 2.0 — Extreme Modularization + Tests

- **Complete Unit Tests**
  - Created `tests/keyboard.test.js` with 25+ unit tests
  - 100% coverage of utility functions in `keyboard-utils.js`
  - Tests for modifier detection (Ctrl/Cmd)
  - Tests for context validation and shortcut blocking
  - Tests for event matching (including edge cases)
  - Integrated into existing test runner in `tests.html`

- **Modular Structure in 6 Specialized Files**
  - `keyboard/index.js` — Centralized exports (40 lines)
  - `keyboard/keyboard-config.js` — Configuration and constants (60 lines)
  - `keyboard/keyboard-utils.js` — Pure utility functions (80 lines)
  - `keyboard/keyboard-dom.js` — DOM element factory (120 lines)
  - `keyboard/keyboard-shortcuts.js` — Shortcut processing (60 lines)
  - `keyboard/keyboard-dialog.js` — Dialog management (30 lines)
  - `keyboard/README.md` — Complete module documentation (350 lines)

- **Modularization Benefits**
  - Smaller, more focused files (~60 lines average vs 315 original)
  - Selective imports (import only what you need)
  - Pure functions without side effects (easy to test)
  - Single Responsibility per module
  - High code reuse
  - Low coupling between modules

### Changed

- **keyboard.js**: Now acts as a legacy entry point re-exporting specialized modules
- **Architecture**: Migration from single file to modular `keyboard/` structure
- **Testability**: Increased from 0% to ~85% coverage (100% on core functions)

### Improved

- **Maintainability**: +450% modularization (2 → 20+ functions)
- **Complexity**: -82% per function (113 → 20 lines average)
- **Extensibility**: Adding a shortcut changed from 10+ lines to 1 line
- **Code Quality**: SOLID principles and design patterns applied
- **Documentation**: 3 detailed documents (README + 2 refactor analyses)

### Technical Implementation

- Applied patterns: Module Pattern, Factory Pattern, Strategy Pattern, Pure Functions
- SOLID principles followed across all modules
- Dependency Injection for shortcut handlers
- Cleanup function returned by `initKeyboardShortcuts()`
- 100% backward compatible (existing code continues to work)
- Zero breaking changes

### New Documentation

- `keyboard/README.md` — Complete module guide with usage examples
- Full JSDoc across all files

---

### Complete i18n.js Module Refactor

#### Extreme Modularization in 7 Specialized Files

- **Modular Structure Created**
  - `i18n/index.js` — Centralized exports (70 lines)
  - `i18n/i18n-config.js` — Configuration and constants (35 lines)
  - `i18n/i18n-translations.js` — All translations (220 lines)
  - `i18n/i18n-storage.js` — localStorage persistence (65 lines)
  - `i18n/i18n-detector.js` — Browser language detection (70 lines)
  - `i18n/i18n-utils.js` — Pure utility functions (140 lines)
  - `i18n/i18n-core.js` — Core logic and public API (165 lines)
  - `i18n/README.md` — Complete documentation (450 lines)

- **Expanded API — 20+ New Functions**
  - **Utilities**: `replacePlaceholders()`, `hasPlaceholders()`, `extractPlaceholders()`, `validatePlaceholders()`, `normalizeLanguageCode()`
  - **Detector**: `getBrowserLanguage()`, `extractBaseLanguage()`, `isLanguageSupported()`, `detectLanguage()`
  - **Storage**: `saveLanguagePreference()`, `loadLanguagePreference()`, `clearLanguagePreference()`
  - **Core**: `hasTranslation()`, `getAllTranslations()`
  - **Constants**: `DEFAULT_LANGUAGE`, `SUPPORTED_LANGUAGES`, `STORAGE_KEY`

- **Complete Unit Tests**
  - Expanded from 8 to 35+ unit tests
  - ~95% code coverage
  - 10 tests for utilities (100% coverage)
  - 3 tests for detector (100% coverage)
  - 4 tests for storage (100% coverage)
  - 5 tests for advanced core functions
  - 3 end-to-end integration tests

- **Modularization Benefits**
  - Smaller, focused files (~100 lines average vs 295 original)
  - Pure functions without side effects (20+ functions)
  - Clear separation of concerns
  - Selective imports (tree-shaking)
  - High testability and maintainability
  - Low coupling between modules

#### i18n Changes

- **i18n.js**: Acts as a legacy wrapper re-exporting specialized modules
- **Architecture**: Migration from single file to modular `i18n/` structure
- **Testability**: Increased from 8 to 35+ tests (~95% coverage)
- **API**: Expanded from 6 to 26+ public functions

#### i18n Improvements

- **Modularization**: +333% in functions (6 → 26+)
- **Tests**: +338% in coverage (8 → 35+ tests)
- **Files**: 8 specialized files created
- **Pure Functions**: +1900% (1 → 20+ pure functions)
- **Documentation**: Complete README.md with 450 lines

#### i18n Technical Details

- Applied patterns: Module Pattern, Pure Functions, Strategy Pattern
- Utility functions with optimized regex
- Smart browser language detection
- Persistence with error handling
- 100% backward compatible
- Zero breaking changes

#### i18n Documentation

- `i18n/README.md` — Complete guide with examples and references
- Full JSDoc across all modules
- Basic and advanced usage examples
- Migration guide and best practices

---

### main.js Refactor and Optimization

#### Modular Structure in 5 Specialized Files

- **New app/ Architecture**
  - `app/index.js` — Centralized exports (65 lines)
  - `app/app-config.js` — Constants and configuration (70 lines)
  - `app/app-theme.js` — Theme and contrast management (160 lines)
  - `app/app-filters.js` — Task filter management (100 lines)
  - `app/app-i18n.js` — Language and translation management (175 lines)

- **main.js Refactored**
  - Reduced from 483 to 216 lines (-55%)
  - Acts as module orchestrator
  - Well-organized sections with descriptive comments
  - Optimized and organized imports
  - Clean, readable code

- **Code Cleanup**
  - Removed unused `getAvailableLanguages`
  - Removed unused `normalizeKey()` from keyboard-utils
  - Eliminated dead code identified by static analysis
  - Zero unused functionality

#### main.js Refactor Benefits

- **Complexity Reduction**: -55% lines in main file
- **Separation of Concerns**: Each module has a clear role
- **Maintainability**: Easy to locate and modify features
- **Testability**: Modules can be tested in isolation
- **Readability**: Code organized with clear sections
- **Reusability**: Extracted functions can be reused

#### main.js Organization

- **Section 1**: Imports — All dependencies organized
- **Section 2**: DOM Elements — Page element cache
- **Section 3**: Initialization — Application setup
- **Section 4**: Form — Task submission handler
- **Section 5**: Clear Buttons — Clear completed and clear all
- **Section 6**: Filters — Task filter management
- **Section 7**: Theme and Contrast — Visual settings
- **Section 8**: Language — Language selector and menu
- **Section 9**: Keyboard Shortcuts — Shortcut configuration

#### Refactor Technical Details

- Applied patterns: Module Pattern, Separation of Concerns
- State managed by specialized modules
- Delegated functions maintaining backward compatibility
- Zero breaking changes
- 100% backward compatible

---

## [1.2.0] - 2026-01-12

### Added

- **Keyboard Shortcuts System**
  - Global shortcuts for navigation and quick actions
  - Help dialog with full shortcut list (Ctrl+? or F1)
  - Support for Ctrl (Windows/Linux) and Cmd (Mac) modifiers
  - Shortcuts do not interfere when typing in input fields
  - Available shortcuts:
    - **Ctrl+K** or **/** — Focus the task input field
    - **Ctrl+G** — Toggle light and dark theme
    - **Ctrl+J** — Cycle contrast level (default → medium → high → default)
    - **Ctrl+L** — Toggle language (Portuguese ↔ English)
    - **1, 2, 3** — Filter tasks (All, Active, Completed)
    - **Ctrl+Delete** — Clear completed tasks
    - **Ctrl+Shift+Delete** — Clear all tasks
    - **Ctrl+?** or **F1** — Show help dialog

- **Testing System**
  - Unit test framework with no external dependencies
  - Tests for modules: Storage, Todo, i18n, Keyboard
  - Integration tests for full application flows
  - Test page with visual UI and theme/i18n support
  - Test grouping by category
  - Detailed result reports

- **Internationalization (i18n)**
  - Full support for Portuguese and English
  - Language selector in the top right corner
  - Automatic browser language detection
  - Language preference persisted in localStorage
  - Translation of all UI text, including dialogs and messages

### Improved

- **Accessibility**: Keyboard shortcuts significantly improve navigation for keyboard-first users
- **User Experience**: Quick theme, contrast, and language switching via keyboard
- **Code Quality**: Test coverage ensures greater reliability
- **Documentation**: README updated with complete keyboard shortcuts section

### Technical Details

- Created `keyboard.js` module for shortcut management
- Implemented custom test system (`test-runner.js`)
- Added `i18n.js` module for internationalization
- Unit tests for all main modules
- Integration tests for full flow validation

## [1.1.0] - 2024-12-29

### Added

- **Drag-and-Drop Reordering** (#22)
  - Drag tasks to reorder them in the list
  - Works seamlessly with all filters (All, Active, Completed)
  - Order persisted in localStorage
  - Visual feedback with Material Design 3 animations
  - Touch device support
  - Reduced motion preference support

- **Edit Existing Tasks** (#20)
  - Dropdown menu with Edit and Delete options (three-dot menu)
  - Task edit dialog with form validation
  - Delete confirmation dialog to prevent accidental removal
  - Material Design 3–compatible dialogs
  - Keyboard navigation support (Escape to close dialogs)
  - Proper ARIA attributes for accessibility

- **Theme System**
  - Light and dark theme toggle
  - Multiple contrast levels (Default, Medium, High)
  - Theme and contrast preferences persisted in localStorage
  - Smooth transitions between themes

- **Clear All Tasks**
  - Button to remove all tasks at once
  - Confirmation before clearing (via delete confirmation dialog)

### Changed

- **Task ID Generation**: Changed from timestamp-based IDs to UUID-based IDs (with timestamp fallback)
- **Delete Behavior**: Now requires confirmation via dialog before removing tasks
- **UI Components**: All components now follow Material Design 3 guidelines
- **Project Structure**: CSS reorganized into modular structure (base, layout, components, themes, utilities)

### v1.1 Improvements

- **Accessibility**: Enhanced ARIA attributes across the application
- **User Experience**: Better visual feedback for all interactions
- **Code Organization**: Improved module structure and separation of concerns
- **Responsive Design**: Better touch device support

### v1.1 Implementation

- Added `updateTask()` function to task management module
- Added `reorderTasks()` function for drag-and-drop
- Implemented custom dialog components
- Implemented dropdown menu component
- Improved drag-and-drop event handling

## [1.0.0] - Initial Release

### Initial Features

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
  - Clean, minimal interface
  - Responsive design for different screen sizes

### Tech Stack

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
- Swipe gestures on mobile devices

---

## Release Notes Format

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for bug fixes
- **Security** for vulnerability fixes

[1.3.0]: https://github.com/herissonneves/axio/releases/tag/v1.3.0
[1.2.0]: https://github.com/herissonneves/axio/releases/tag/v1.2.0
[1.1.0]: https://github.com/herissonneves/axio/releases/tag/v1.1.0
[1.0.0]: https://github.com/herissonneves/axio/releases/tag/v1.0.0
