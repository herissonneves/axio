# Unit and Integration Tests - Axio

Unit and integration test system with no external dependencies, using vanilla JavaScript only.

## Structure

```plaintext
tests/
├── unit/                      # Unit tests per module
│   ├── storage.test.js        # Storage module tests
│   ├── todo.test.js           # Task module tests
│   ├── i18n.test.js           # Internationalization module tests
│   ├── keyboard.test.js       # Keyboard shortcuts module tests
│   ├── app.test.js            # app/* module tests
│   └── ui.test.js             # ui/* module tests
├── integration/               # Integration tests
│   └── integration.test.js    # Full flow tests
├── test-runner.js             # Custom test framework
├── test-runner-ui.js          # Test runner UI logic
├── test-runner-ui.css         # Test runner UI styles
├── index.html                 # Web UI to run tests
└── README.md                  # This documentation
```

## How to Run

### In the Browser

1. Open `tests/index.html` in your browser
2. Click the "Run Tests" button
3. View results on screen and in the console

### Via Browser Console

```javascript
// Import required modules
import TestRunner from './tests/test-runner.js';
import { runStorageTests } from './tests/unit/storage.test.js';
import { runTodoTests } from './tests/unit/todo.test.js';
import { runI18nTests } from './tests/unit/i18n.test.js';
import { runKeyboardTests } from './tests/unit/keyboard.test.js';
import { runAppTests } from './tests/unit/app.test.js';
import { runUITests } from './tests/unit/ui.test.js';
import { runIntegrationTests } from './tests/integration/integration.test.js';

// Create a test runner instance
const runner = new TestRunner();

// Register tests
runStorageTests(runner);
runTodoTests(runner);
runI18nTests(runner);
runKeyboardTests(runner);
runAppTests(runner);
runUITests(runner);
runIntegrationTests(runner);

// Run tests
await runner.run();
```

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

## Test Coverage

### Unit Tests

#### Storage Module (`unit/storage.test.js`)

- ✅ Load tasks from localStorage
- ✅ Save tasks to localStorage
- ✅ Error handling (invalid JSON, null, etc.)
- ✅ Default values when no data exists

#### Todo Module (`unit/todo.test.js`)

- ✅ Get task list
- ✅ Add new task
- ✅ Remove task
- ✅ Toggle completion status
- ✅ Update task text
- ✅ Clear completed tasks
- ✅ Clear all tasks
- ✅ Reorder tasks

#### i18n Module (`unit/i18n.test.js`)

- ✅ Core functions (getLanguage, setLanguage, t, etc.) - 35+ tests
- ✅ Utilities (replacePlaceholders, extractPlaceholders, etc.)
- ✅ Language detection (detectLanguage, isLanguageSupported, etc.)
- ✅ Persistence (storage)
- ✅ Translations and placeholders
- ✅ System initialization

#### Keyboard Module (`unit/keyboard.test.js`)

- ✅ Modifier key detection
- ✅ Context validation for blocking
- ✅ Shortcut matching with events
- ✅ Processing utilities

#### App Module (`unit/app.test.js`)

- ✅ Configuration (app-config.js)
- ✅ Theme and contrast management (app-theme.js)
- ✅ Filter management (app-filters.js)
- ✅ Integration between app/* modules

#### UI Module (`unit/ui.test.js`)

- ✅ SVG icon creation (ui-icons.js)
- ✅ Drag-and-drop system (ui-drag.js)
- ✅ Integration between UI components

### Integration Tests (`integration/integration.test.js`)

- ✅ Full flow: add, complete, and remove task
- ✅ Full flow: multiple tasks, filter, and clear
- ✅ Full flow: add, edit, and verify
- ✅ Reorder tasks and verify persistence
- ✅ Clear all and verify empty state
- ✅ Integration between Storage and Todo modules
- ✅ Integration between i18n and Todo modules
- ✅ Full user flow (add, filter, complete, clear)
- ✅ Operations maintain data integrity
- ✅ Edge cases (empty operations)
- ✅ Rapid multiple operations maintain consistency

## Statistics

- **Total tests**: 128+ tests
- **Unit tests**: 87+ tests
- **Integration tests**: 41+ tests
- **Estimated coverage**: ~85%
- **Modules tested**: 7 main modules + 4 sub-modules

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
