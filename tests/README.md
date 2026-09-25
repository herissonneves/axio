# Unit and Integration Tests - Axio

Unit and integration test system with no external dependencies, using vanilla JavaScript only.

## Structure

```plaintext
tests/
├── integration/                            # Integration tests
│   ├── integration.test.js                 # Full flow tests
│   └── todo-categories.integration.test.js # Not yet loaded by the browser loader
├── unit/                                   # Unit tests per module
│   ├── app.test.js                         # app/* module tests
│   ├── i18n.test.js                        # Internationalization module tests
│   ├── keyboard.test.js                    # Keyboard shortcuts module tests
│   ├── storage.test.js                     # Storage module tests
│   ├── task-meta.test.js                   # Not yet loaded by the browser loader
│   ├── todo.test.js                        # Task module tests
│   ├── todo-categories.test.js             # Not yet loaded by the browser loader
│   └── ui.test.js                          # ui/* module tests
├── test-runner.js                          # Custom test framework
├── test-runner-ui.js                       # Test runner UI logic
├── test-runner-ui.css                      # Test runner UI styles
├── index.html                              # Web UI to run tests
└── README.md                               # This documentation
```

## How to Run

### In the Browser

1. Run `python3 -m http.server 8000` in the root of the repository, then access `http://localhost:8000/tests/` in your browser
2. Click the **Run Tests** button
3. View results on screen and in the console

## Test Runner API

### Test Methods

- `test(name, fn)` - Registers a test
- `category(name)` - Sets a test category
- `assert(condition, message)` - Asserts that a condition is true
- `assertEquals(actual, expected, message)` - Asserts that two values are equal
- `assertNotEquals(actual, expected, message)` - Asserts that two values are not equal
- `assertTrue(value, message)` - Asserts that a value is truthy
- `assertFalse(value, message)` - Asserts that a value is falsy
- `assertThrows(fn, message)` - Asserts that a function throws an error

### Usage Example

```javascript
runner.test("my test", () => {
  runner.assertEquals(1 + 1, 2);
  runner.assertTrue(true);
  runner.assertFalse(false);
});
```

## Tested areas

### Unit Tests

#### Storage Module (`unit/storage.test.js`)

- Load tasks from localStorage
- Save tasks to localStorage
- Error handling (invalid JSON, null, etc.)
- Default values when no data exists

#### Todo Module (`unit/todo.test.js`)

- Get task list
- Add new task
- Remove task
- Toggle completion status
- Update task text
- Clear completed tasks
- Clear all tasks
- Reorder tasks

#### Task Metadata (`unit/task-meta.test.js`) — not loaded by the browser runner

- Declared cases for category and tag normalization, legacy task migration, and case-insensitive tag matching.

#### Todo Categories (`unit/todo-categories.test.js`) — not loaded by the browser runner

- Declared cases for adding, editing, filtering, and preserving task categories and tags.

#### i18n Module (`unit/i18n.test.js`)

- Core functions (getLanguage, setLanguage, t, etc.)
- Utilities (replacePlaceholders, extractPlaceholders, etc.)
- Language detection (detectLanguage, isLanguageSupported, etc.)
- Persistence (storage)
- Translations and placeholders
- System initialization

#### Keyboard Module (`unit/keyboard.test.js`)

- Modifier key detection
- Context validation for blocking
- Shortcut matching with events
- Processing utilities

#### App Module (`unit/app.test.js`)

- Configuration (app-config.js)
- Theme management (app-theme.js)
- Filter management (app-filters.js)
- Integration between app/* modules

#### UI Module (`unit/ui.test.js`)

- SVG icon creation (ui-icons.js)
- Drag-and-drop system (ui-drag.js)
- Integration between UI components

### Integration Tests (`integration/integration.test.js`)

- Full flow: add, complete, and remove task
- Full flow: multiple tasks, filter, and clear
- Full flow: add, edit, and verify
- Reorder tasks and verify persistence
- Clear all and verify empty state
- Integration between Storage and Todo modules
- Integration between i18n and Todo modules
- Full user flow (add, filter, complete, clear)
- Operations maintain data integrity
- Edge cases (empty operations)
- Rapid multiple operations maintain consistency

### Categories and Tags Integration (`integration/todo-categories.integration.test.js`) — not loaded by the browser runner

- Declared cases for metadata persistence, legacy migration, filtering, and edits across task operations.

## Current test status

- 135 test cases are declared across the unit and integration files.
- The browser runner currently loads 110 cases from seven test modules.
- `task-meta.test.js`, `todo-categories.test.js`, and `todo-categories.integration.test.js` are not registered in the runner yet.
- Code coverage is not currently measured.

## Organization

The test structure follows the modular organization of the source code:

- **`unit/`** - One test file per main module or group of related modules
- **`integration/`** - Tests that verify integration between multiple modules
- **`test-runner.js`** - Custom framework, independent of external libraries
- **`index.html`** - Visual interface for running and viewing results

## Notes

- Tests use the browser's `localStorage`, so make sure you run them in an environment that supports it
- Some tests may interfere with each other due to shared state
- For more isolated tests, consider clearing `localStorage` between tests
- Run tests on an HTTP server (not `file://`) to avoid issues with ES6 modules

## Future Improvements

- [ ] Add mocks for `localStorage` and `document`
- [ ] Implement automatic setup/teardown between tests
- [ ] Add code coverage measurement
- [ ] Implement end-to-end tests with Playwright or similar
- [ ] Add performance tests
- [ ] Register the three remaining test modules in the browser runner
