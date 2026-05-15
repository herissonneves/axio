# Keyboard Shortcuts Module

Modular system for managing keyboard shortcuts in the application.

## 📁 File Structure

```plaintext
keyboard/
├── index.js                    # Entry point - exports everything
├── keyboard-config.js          # Configuration and constants
├── keyboard-utils.js           # Utility functions
├── keyboard-dom.js             # DOM element creation
├── keyboard-shortcuts.js       # Shortcut processing
├── keyboard-dialog.js          # Dialog management
└── README.md                   # This documentation
```

## 📦 Modules

### 1. **keyboard-config.js**

System configuration and constants.

**Exports:**

- `KEYBOARD_SHORTCUTS` - Mapping of all shortcuts
- `BLOCKED_TAGS` - HTML tags that block shortcuts
- `SPECIAL_ALLOWED_KEYS` - Keys allowed in any context

**Example:**

```javascript
import { KEYBOARD_SHORTCUTS } from "./keyboard-config.js";

console.log(KEYBOARD_SHORTCUTS.FOCUS_INPUT);
// { key: "k", modifier: true, handler: "focusInput" }
```

### 2. **keyboard-utils.js**

Pure utility functions for event processing.

**Exports:**

- `isModifierPressed(event)` - Detects Ctrl/Cmd
- `shouldBlockShortcut(event)` - Validates execution context
- `matchesShortcut(event, config)` - Compares event with configuration

**Example:**

```javascript
import { isModifierPressed, matchesShortcut } from "./keyboard-utils.js";

const event = { key: "k", ctrlKey: true };
if (isModifierPressed(event)) {
  console.log("Modifier pressed!");
}
```

**Features:**

- ✅ Pure functions (no side effects)
- ✅ Easily testable
- ✅ No DOM dependencies

### 3. **keyboard-dom.js**

DOM element creation for the shortcuts help dialog.

**Exports:**

- `createShortcutItem(shortcut)` - Individual item
- `createShortcutsList()` - Full list
- `createDialogTitle()` - Dialog title
- `createCloseButton(onClose)` - Close button
- `createDialogOverlay(onClose)` - Overlay
- `createDialogContainer(onClose)` - Container
- `createDialogStructure(onClose)` - Complete structure

**Example:**

```javascript
import { createShortcutItem } from "./keyboard-dom.js";

const item = createShortcutItem({
  key: "Ctrl+K",
  description: "Focus search field",
});
document.body.append(item);
```

**Features:**

- ✅ Factory functions for elements
- ✅ Separation of concerns
- ✅ Reusable

### 4. **keyboard-shortcuts.js**

Shortcut processing and execution logic.

**Exports:**

- `processShortcut(event, handlers)` - Processes event
- `createKeyboardListener(handlers)` - Creates listener
- `initKeyboardShortcuts(handlers)` - Initializes system

**Example:**

```javascript
import { initKeyboardShortcuts } from "./keyboard-shortcuts.js";

const cleanup = initKeyboardShortcuts({
  focusInput: () => document.querySelector("input").focus(),
  toggleTheme: () => document.body.classList.toggle("dark"),
  // ... other handlers
});

// Clean up when no longer needed
cleanup();
```

**Features:**

- ✅ Returns cleanup function
- ✅ Efficient processing
- ✅ Extensible

### 5. **keyboard-dialog.js**

Help dialog management.

**Exports:**

- `showKeyboardShortcutsDialog()` - Shows dialog

**Example:**

```javascript
import { showKeyboardShortcutsDialog } from "./keyboard-dialog.js";

button.addEventListener("click", showKeyboardShortcutsDialog);
```

**Features:**

- ✅ Prevents multiple dialogs
- ✅ Manages focus and overflow
- ✅ Escape key support

### 6. **index.js**

Entry point that re-exports everything.

**Usage:**

```javascript
// Import everything at once
import * as Keyboard from "./keyboard/index.js";

// Or import selectively
import {
  initKeyboardShortcuts,
  showKeyboardShortcutsDialog,
} from "./keyboard/index.js";
```

## 🎯 Basic Usage

### Initialize Shortcuts

```javascript
import { initKeyboardShortcuts } from "./keyboard/index.js";

const handlers = {
  focusInput: () => {
    document.querySelector("#search").focus();
  },
  toggleTheme: () => {
    document.body.classList.toggle("dark-theme");
  },
  setFilterAll: () => {
    showAllTasks();
  },
  // ... other handlers
  showHelp: () => {
    showKeyboardShortcutsDialog();
  },
};

// Initialize
const cleanup = initKeyboardShortcuts(handlers);

// Clean up when needed (e.g. when unmounting component)
window.addEventListener("beforeunload", cleanup);
```

### Show Help Dialog

```javascript
import { showKeyboardShortcutsDialog } from "./keyboard/index.js";

document
  .querySelector("#help-button")
  .addEventListener("click", showKeyboardShortcutsDialog);
```

## 🧪 Tests

Tests are in `tests/unit/keyboard.test.js` and cover:

- ✅ `isModifierPressed` - Ctrl/Cmd detection
- ✅ `shouldBlockShortcut` - Context validation
- ✅ `matchesShortcut` - Shortcut matching
- ✅ Shortcut configuration

**Run tests:**

```bash
# In the browser
Open tests/index.html
```

## 🔧 Add a New Shortcut

1. **Add in keyboard-config.js:**

```javascript
export const KEYBOARD_SHORTCUTS = {
  // ... existing shortcuts
  NEW_SHORTCUT: {
    key: "n",
    modifier: true,
    handler: "myNewHandler",
  },
};
```

2. **Add handler in main.js:**

```javascript
initKeyboardShortcuts({
  // ... existing handlers
  myNewHandler: () => {
    console.log("New shortcut executed!");
  },
});
```

3. **(Optional) Add to dialog list in keyboard-dom.js:**

```javascript
const shortcuts = [
  // ... existing shortcuts
  {
    key: t("shortcutKeyNewShortcut"),
    description: t("shortcutNewShortcut"),
  },
];
```

## 📊 Modularization Benefits

| Aspect            | Before       | After                    |
| ----------------- | ------------ | ------------------------ |
| **Files**         | 1            | 6 specialized            |
| **Lines/file**    | 315          | ~60 average              |
| **Testability**   | Difficult    | Easy (isolated functions)|
| **Maintenance**   | Monolithic   | Modular                  |
| **Reusability**   | Low          | High                     |
| **Imports**       | All or nothing | Selective              |

## 🎨 Applied Patterns

1. **Module Pattern** - Each file is an independent module
2. **Single Responsibility** - Each module has one responsibility
3. **Factory Pattern** - DOM element factory functions
4. **Strategy Pattern** - Configurable handler system
5. **Dependency Injection** - Handlers injected via parameter
6. **Pure Functions** - Utilities without side effects

## 🔄 Migration from Legacy Code

The legacy `keyboard.js` wrapper was removed in v1.3.0. Use the modular entry point:

```javascript
// Recommended import
import { initKeyboardShortcuts } from "./keyboard/index.js";
```

## 📈 Next Steps

- [ ] Add integration tests
- [ ] Implement configuration cache
- [ ] Add shortcut conflict validation
- [ ] Create configuration builder
- [ ] Add shortcut usage telemetry

## 📝 Conventions

- **Files**: kebab-case (keyboard-config.js)
- **Functions**: camelCase (createShortcutItem)
- **Constants**: UPPER_SNAKE_CASE (KEYBOARD_SHORTCUTS)
- **Exports**: Named exports (not default)

---

**Version**: 2.0.0  
**Date**: 2026-01-30  
**Status**: ✅ Production
