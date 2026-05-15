# Internationalization System (i18n)

Modular and extensible system for managing translations and languages in the Axio application.

## 📋 Overview

The i18n module provides full support for multiple languages with:

- ✅ Translations for pt (Portuguese) and en (English)
- ✅ Automatic browser language detection
- ✅ Preference persistence in localStorage
- ✅ Dynamic placeholder support
- ✅ Simple and intuitive API
- ✅ Modular and testable architecture
- ✅ 100% backward compatible

## 🏗️ Modular Architecture

```plaintext
i18n/
├── index.js                  # Centralized entry point
├── i18n-config.js           # Configuration and constants
├── i18n-translations.js     # All translations
├── i18n-storage.js          # localStorage persistence
├── i18n-detector.js         # Browser language detection
├── i18n-utils.js            # Pure utility functions
├── i18n-core.js             # Core logic
└── README.md                # This documentation
```

### Responsibilities per Module

#### `i18n-config.js` - Configuration

Defines base constants and configuration:

- `STORAGE_KEY`: localStorage key
- `DEFAULT_LANGUAGE`: Default language
- `SUPPORTED_LANGUAGES`: List of supported languages
- `PLACEHOLDER_PATTERN`: Regex for placeholders

#### `i18n-translations.js` - Translations

Contains all translations organized by language:

```javascript
{
  en: { key: "translation" },
  pt: { key: "tradução" }
}
```

#### `i18n-storage.js` - Persistence

Pure functions for localStorage interaction:

- `saveLanguagePreference()`
- `loadLanguagePreference()`
- `clearLanguagePreference()`

#### `i18n-detector.js` - Detection

Detects and validates languages:

- `getBrowserLanguage()`: Gets browser language
- `extractBaseLanguage()`: Extracts base code (pt-BR → pt)
- `isLanguageSupported()`: Validates if language is supported
- `detectLanguage()`: Detects best available language

#### `i18n-utils.js` - Utilities

Pure utility functions:

- `replacePlaceholders()`: Replaces {placeholders}
- `hasPlaceholders()`: Checks for placeholder presence
- `extractPlaceholders()`: Extracts placeholder names
- `validatePlaceholders()`: Validates that all have values
- `normalizeLanguageCode()`: Normalizes language codes

#### `i18n-core.js` - Core Logic

Main system API:

- `getLanguage()`: Gets current language
- `setLanguage()`: Sets language
- `loadLanguage()`: Loads saved language or detects
- `t()`: Translation function
- `getAvailableLanguages()`: Lists available languages
- `hasTranslation()`: Checks if key exists
- `getAllTranslations()`: Gets all translations for a language
- `initI18n()`: Initializes the system

## 🚀 Basic Usage

### Initialization

```javascript
import { initI18n } from "./i18n/index.js";

// Initialize the system (detects or loads saved language)
initI18n(); // Returns: 'pt' or 'en'
```

### Get Translation

```javascript
import { t } from "./i18n/index.js";

// Simple translation
t("addTaskButton"); // 'Adicionar' or 'Add Task'

// Translation with placeholders
t("deleteTaskConfirm", { text: "Buy milk" });
// 'Are you sure you want to delete "Buy milk"?...'
```

### Change Language

```javascript
import { setLanguage, getLanguage } from "./i18n/index.js";

// Set language
setLanguage("en"); // true
getLanguage(); // 'en'

// Invalid language returns false
setLanguage("fr"); // false (not supported)
```

### Check Translations

```javascript
import { hasTranslation, getAllTranslations } from "./i18n/index.js";

// Check if key exists
hasTranslation("addTaskButton"); // true
hasTranslation("nonexistentKey"); // false

// Check in specific language
hasTranslation("addTaskButton", "en"); // true

// Get all translations
const translations = getAllTranslations("pt");
// { pageTitle: 'Axio', addTaskButton: 'Adicionar', ... }
```

## 🔧 Advanced Usage

### Working with Placeholders

```javascript
import {
  replacePlaceholders,
  hasPlaceholders,
  extractPlaceholders,
  validatePlaceholders,
} from "./i18n/index.js";

const text = "Hello {name}, you have {count} messages";

// Check if it has placeholders
hasPlaceholders(text); // true

// Extract placeholder names
extractPlaceholders(text); // ['name', 'count']

// Validate that all placeholders have values
validatePlaceholders(text, { name: "John", count: 5 }); // true
validatePlaceholders(text, { name: "John" }); // false

// Replace placeholders
replacePlaceholders(text, { name: "Maria", count: 3 });
// "Hello Maria, you have 3 messages"
```

### Language Detection

```javascript
import {
  detectLanguage,
  getBrowserLanguage,
  extractBaseLanguage,
  isLanguageSupported,
} from "./i18n/index.js";

// Get browser language
getBrowserLanguage(); // 'pt-BR' or 'en-US'

// Extract base code
extractBaseLanguage("pt-BR"); // 'pt'
extractBaseLanguage("en-US"); // 'en'

// Check if language is supported
isLanguageSupported("pt"); // true
isLanguageSupported("fr"); // false

// Detect best language (checks browser + supported)
detectLanguage(); // 'pt' or 'en'
```

### Manage Persistence

```javascript
import {
  saveLanguagePreference,
  loadLanguagePreference,
  clearLanguagePreference,
} from "./i18n/index.js";

// Save preference
saveLanguagePreference("en"); // true

// Load preference
loadLanguagePreference(); // 'en'

// Clear preference
clearLanguagePreference(); // true
```

### Constants and Configuration

```javascript
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
} from "./i18n/index.js";

console.log(DEFAULT_LANGUAGE); // 'pt'
console.log(SUPPORTED_LANGUAGES); // ['pt', 'en']
console.log(STORAGE_KEY); // 'todo-language'
```

## 📊 Initialization Flow

```plaintext
initI18n()
    ↓
loadLanguage()
    ↓
┌─────────────────────────┐
│ Saved preference?       │
└─────────┬───────────────┘
          │
    ┌─────┴─────┐
    │ Yes       │ No
    ↓           ↓
loadStorage  detectLanguage()
    │           │
    │      ┌────┴────┐
    │      │ Browser │
    │      │ language│
    │      │ support-│
    │      │ ed?     │
    │      └────┬────┘
    │           │
    │      ┌────┴────┐
    │      │ Yes│ No │
    │      ↓    ↓
    │  browserLang  DEFAULT
    │      │    │
    └──────┴────┴─────→ currentLanguage
              ↓
    document.documentElement.lang
```

## 🧪 Tests

The module has full test coverage in `tests/unit/i18n.test.js`:

```bash
# Open tests/index.html in the browser
```

### Test Categories

- ✅ **Core API** (8 tests)
  - getLanguage, setLanguage, loadLanguage, t, etc.
- ✅ **Utilities** (10 tests)
  - replacePlaceholders, extractPlaceholders, etc.
- ✅ **Detector** (3 tests)
  - detectLanguage, isLanguageSupported, etc.
- ✅ **Storage** (4 tests)
  - saveLanguagePreference, loadLanguagePreference, etc.
- ✅ **Advanced Core** (5 tests)
  - hasTranslation, getAllTranslations
- ✅ **Constants** (3 tests)
  - DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, STORAGE_KEY
- ✅ **Integration** (3 tests)
  - Full end-to-end flows

### Total Tests

35+ unit tests implemented

## 📦 Add a New Language

### 1. Update Configuration

```javascript
// i18n-config.js
export const SUPPORTED_LANGUAGES = ["pt", "en", "fr"]; // Add 'fr'
```

### 2. Add Translations

```javascript
// i18n-translations.js
export const TRANSLATIONS = {
  en: {
    /* ... */
  },
  pt: {
    /* ... */
  },
  fr: {
    pageTitle: "Axio",
    addTaskButton: "Ajouter une tâche",
    // ... all other keys
  },
};
```

### 3. Test

```javascript
import { setLanguage, t } from "./i18n/index.js";

setLanguage("fr");
t("addTaskButton"); // 'Ajouter une tâche'
```

## 🔑 Add a New Translation

### 1. Add Key in All Languages

```javascript
// i18n-translations.js
export const TRANSLATIONS = {
  en: {
    // ... existing translations
    newFeature: "New Feature",
  },
  pt: {
    // ... existing translations
    newFeature: "Nova Funcionalidade",
  },
};
```

### 2. Use in Code

```javascript
import { t } from "./i18n/index.js";

const text = t("newFeature"); // 'Nova Funcionalidade' or 'New Feature'
```

## ⚡ Performance

### Implemented Optimizations

1. **Lazy Loading**: Translations loaded on demand
2. **Internal Cache**: Current language kept in memory
3. **Pure Functions**: Easy optimization and memoization
4. **Small Modules**: ~50–150 lines per file

### Metrics

| Metric                    | Value   |
| ------------------------- | ------- |
| Initialization time       | < 5ms   |
| Translation time (t)      | < 0.1ms |
| Total size (minified)     | ~8KB    |
| External dependencies     | 0       |

## 🎯 Best Practices

### ✅ DO

```javascript
// Use t() for all visible strings
const buttonText = t("addTaskButton");

// Validate placeholders before use
if (validatePlaceholders(text, params)) {
  return t("key", params);
}

// Normalize language codes
const lang = normalizeLanguageCode(userInput);
```

### ❌ DON'T

```javascript
// Don't hardcode translations
const text = "Add Task"; // ❌ Use: t('addTaskButton')

// Don't assume language without checking
const lang = getLanguage(); // ✅ Always use the API

// Don't access TRANSLATIONS directly
const text = TRANSLATIONS["pt"]["key"]; // ❌ Use: t('key')
```

## 🔄 Migrating from Legacy Code

The module is 100% backward compatible. Existing code continues to work:

```javascript
// Legacy code (still works)
import { t, setLanguage } from "../js/modules/i18n/index.js";

// New code (same API + extra functions)
import { t, setLanguage, hasTranslation } from "../js/modules/i18n/index.js";
```

## 📚 References

- [i18n specification](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/i18n)
- [BCP 47 Language Tags](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

## 🤝 Contributing

To add new features or languages:

1. Add code in the appropriate module
2. Add tests in `tests/unit/i18n.test.js`
3. Update this documentation
4. Verify backward compatibility

## 📄 License

Part of the Axio project — task management system.

---

**Version**: 2.0 (Modular)  
**Date**: January 2026  
**Status**: ✅ Production
