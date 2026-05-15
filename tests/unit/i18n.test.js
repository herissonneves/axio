/**
 * Internationalization (i18n) Module Tests
 *
 * Tests translation and language switching functionality:
 * - Core functions (getLanguage, setLanguage, t, etc.)
 * - Utilities (replacePlaceholders, extractPlaceholders, etc.)
 * - Language detection (detectLanguage, isLanguageSupported, etc.)
 * - Persistence (storage)
 * - Translations and placeholders
 * - System initialization
 */

import {
  // Core API
  getLanguage,
  setLanguage,
  loadLanguage,
  t,
  getAvailableLanguages,
  initI18n,
  hasTranslation,
  getAllTranslations,
  // Constants
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
  // Utilities
  replacePlaceholders,
  hasPlaceholders,
  extractPlaceholders,
  validatePlaceholders,
  normalizeLanguageCode,
  // Detector
  detectLanguage,
  extractBaseLanguage,
  isLanguageSupported,
  // Storage
  saveLanguagePreference,
  loadLanguagePreference,
  clearLanguagePreference,
} from "../../js/modules/i18n/index.js";

/**
 * Registers all internationalization module tests
 * @param {TestRunner} runner - Test runner instance
 */
export function runI18nTests(runner) {
  runner.category("Unit Tests - i18n");

  runner.test("getAvailableLanguages should return all language codes", () => {
    const languages = getAvailableLanguages();
    runner.assertTrue(languages.includes("en"));
    runner.assertTrue(languages.includes("pt"));
    runner.assertEquals(languages.length, 2);
  });

  runner.test("setLanguage should change language to valid code", () => {
    if (typeof document !== "undefined") {
      const result = setLanguage("en");
      runner.assertTrue(result);
      runner.assertEquals(getLanguage(), "en");

      setLanguage("pt");
      runner.assertEquals(getLanguage(), "pt");
    }
  });

  runner.test("setLanguage should return false for invalid language", () => {
    if (typeof document !== "undefined") {
      const result = setLanguage("invalid");
      runner.assertFalse(result);
    }
  });

  runner.test("t should return translation for current language", () => {
    if (typeof document !== "undefined") {
      setLanguage("en");
      runner.assertEquals(t("pageTitle"), "Axio");
      runner.assertEquals(t("addTaskButton"), "Add Task");

      setLanguage("pt");
      runner.assertEquals(t("pageTitle"), "Axio");
      runner.assertEquals(t("addTaskButton"), "Adicionar");
    }
  });

  runner.test("t should replace placeholders in translations", () => {
    if (typeof document !== "undefined") {
      setLanguage("en");
      const result = t("deleteTaskConfirm", { text: "Test task" });
      runner.assertTrue(result.includes("Test task"));
      runner.assertTrue(result.includes("delete"));

      setLanguage("pt");
      const resultPt = t("deleteTaskConfirm", { text: "Tarefa teste" });
      runner.assertTrue(resultPt.includes("Tarefa teste"));
      runner.assertTrue(resultPt.includes("excluir"));
    }
  });

  runner.test("t should return key if translation not found", () => {
    if (typeof document !== "undefined") {
      const result = t("nonexistentKey");
      runner.assertEquals(result, "nonexistentKey");
    }
  });

  runner.test("t should handle multiple placeholders", () => {
    if (typeof document !== "undefined") {
      setLanguage("en");
      // Using a key that might have placeholders
      const result = t("ariaMarkCompleted", { text: "My Task" });
      runner.assertTrue(result.includes("My Task"));
    }
  });

  runner.test("loadLanguage should load from localStorage if available", () => {
    if (
      typeof localStorage !== "undefined" &&
      typeof document !== "undefined"
    ) {
      localStorage.setItem("todo-language", "en");
      loadLanguage();
      runner.assertEquals(getLanguage(), "en");

      localStorage.setItem("todo-language", "pt");
      loadLanguage();
      runner.assertEquals(getLanguage(), "pt");
    }
  });

  runner.test("initI18n should initialize the i18n system", () => {
    if (typeof document !== "undefined") {
      initI18n();
      const lang = getLanguage();
      runner.assertTrue(lang === "en" || lang === "pt");
    }
  });

  // ============================================================================
  // UTILITY TESTS (i18n-utils.js)
  // ============================================================================

  runner.test("replacePlaceholders replaces simple placeholders", () => {
    const result = replacePlaceholders("Hello {name}!", { name: "Maria" });
    runner.assertEquals(result, "Hello Maria!");
  });

  runner.test("replacePlaceholders replaces multiple placeholders", () => {
    const result = replacePlaceholders(
      "Hello {name}, you have {count} messages",
      {
        name: "John",
        count: 5,
      }
    );
    runner.assertEquals(result, "Hello John, you have 5 messages");
  });

  runner.test("replacePlaceholders keeps placeholders without values", () => {
    const result = replacePlaceholders("Hello {name}!", {});
    runner.assertEquals(result, "Hello {name}!");
  });

  runner.test(
    "replacePlaceholders returns text without placeholders unchanged",
    () => {
      const result = replacePlaceholders("Hello world!", { name: "Maria" });
      runner.assertEquals(result, "Hello world!");
    }
  );

  runner.test("hasPlaceholders detects presence of placeholders", () => {
    runner.assertTrue(hasPlaceholders("Hello {name}!"));
    runner.assertFalse(hasPlaceholders("Hello world!"));
    runner.assertFalse(hasPlaceholders(""));
  });

  runner.test("extractPlaceholders extracts placeholder names", () => {
    const placeholders = extractPlaceholders(
      "Hello {name}, you have {count} messages"
    );
    runner.assertEquals(placeholders.length, 2);
    runner.assertTrue(placeholders.includes("name"));
    runner.assertTrue(placeholders.includes("count"));
  });

  runner.test(
    "extractPlaceholders returns empty array without placeholders",
    () => {
      const placeholders = extractPlaceholders("Hello world!");
      runner.assertEquals(placeholders.length, 0);
    }
  );

  runner.test(
    "validatePlaceholders validates that all placeholders have values",
    () => {
      runner.assertTrue(validatePlaceholders("Hello {name}!", { name: "Maria" }));
      runner.assertFalse(validatePlaceholders("Hello {name}!", {}));
      runner.assertTrue(validatePlaceholders("Hello world!", {}));
    }
  );

  runner.test("normalizeLanguageCode normalizes language codes", () => {
    runner.assertEquals(normalizeLanguageCode("PT"), "pt");
    runner.assertEquals(normalizeLanguageCode(" en "), "en");
    runner.assertEquals(normalizeLanguageCode("En"), "en");
  });

  // ============================================================================
  // DETECTOR TESTS (i18n-detector.js)
  // ============================================================================

  runner.test("extractBaseLanguage extracts base language code", () => {
    runner.assertEquals(extractBaseLanguage("pt-BR"), "pt");
    runner.assertEquals(extractBaseLanguage("en-US"), "en");
    runner.assertEquals(extractBaseLanguage("pt"), "pt");
    runner.assertEquals(extractBaseLanguage(""), "");
  });

  runner.test("isLanguageSupported checks supported languages", () => {
    runner.assertTrue(isLanguageSupported("pt"));
    runner.assertTrue(isLanguageSupported("en"));
    runner.assertFalse(isLanguageSupported("fr"));
    runner.assertFalse(isLanguageSupported(""));
  });

  runner.test("detectLanguage returns a valid language", () => {
    const detected = detectLanguage();
    runner.assertTrue(detected === "pt" || detected === "en");
  });

  // ============================================================================
  // STORAGE TESTS (i18n-storage.js)
  // ============================================================================

  runner.test(
    "saveLanguagePreference saves preference to localStorage",
    () => {
      if (typeof localStorage !== "undefined") {
        const saved = saveLanguagePreference("en");
        runner.assertTrue(saved);
        runner.assertEquals(localStorage.getItem(STORAGE_KEY), "en");
      }
    }
  );

  runner.test(
    "loadLanguagePreference loads preference from localStorage",
    () => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, "pt");
        const loaded = loadLanguagePreference();
        runner.assertEquals(loaded, "pt");
      }
    }
  );

  runner.test(
    "loadLanguagePreference returns null when no preference exists",
    () => {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
        const loaded = loadLanguagePreference();
        runner.assertEquals(loaded, null);
      }
    }
  );

  runner.test(
    "clearLanguagePreference removes preference from localStorage",
    () => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, "en");
        const cleared = clearLanguagePreference();
        runner.assertTrue(cleared);
        runner.assertEquals(localStorage.getItem(STORAGE_KEY), null);
      }
    }
  );

  // ============================================================================
  // ADVANCED CORE TESTS (i18n-core.js)
  // ============================================================================

  runner.test("hasTranslation checks translation key existence", () => {
    if (typeof document !== "undefined") {
      setLanguage("pt");
      runner.assertTrue(hasTranslation("pageTitle"));
      runner.assertTrue(hasTranslation("addTaskButton"));
      runner.assertFalse(hasTranslation("nonexistentKey"));
    }
  });

  runner.test("hasTranslation checks specific language", () => {
    if (typeof document !== "undefined") {
      runner.assertTrue(hasTranslation("addTaskButton", "en"));
      runner.assertTrue(hasTranslation("addTaskButton", "pt"));
      runner.assertFalse(hasTranslation("nonexistentKey", "en"));
    }
  });

  runner.test(
    "getAllTranslations returns all translations for current language",
    () => {
      if (typeof document !== "undefined") {
        setLanguage("pt");
        const translations = getAllTranslations();
        runner.assertNotEquals(translations, null);
        runner.assertEquals(translations.pageTitle, "Axio");
        runner.assertEquals(translations.addTaskButton, "Adicionar");
      }
    }
  );

  runner.test(
    "getAllTranslations returns translations for specific language",
    () => {
      if (typeof document !== "undefined") {
        const translations = getAllTranslations("en");
        runner.assertNotEquals(translations, null);
        runner.assertEquals(translations.pageTitle, "Axio");
        runner.assertEquals(translations.addTaskButton, "Add Task");
      }
    }
  );

  runner.test("getAllTranslations returns null for invalid language", () => {
    if (typeof document !== "undefined") {
      const translations = getAllTranslations("fr");
      runner.assertEquals(translations, null);
    }
  });

  // ============================================================================
  // CONSTANTS TESTS
  // ============================================================================

  runner.test("DEFAULT_LANGUAGE is defined correctly", () => {
    runner.assertEquals(DEFAULT_LANGUAGE, "pt");
  });

  runner.test("SUPPORTED_LANGUAGES contains correct languages", () => {
    runner.assertEquals(SUPPORTED_LANGUAGES.length, 2);
    runner.assertTrue(SUPPORTED_LANGUAGES.includes("pt"));
    runner.assertTrue(SUPPORTED_LANGUAGES.includes("en"));
  });

  runner.test("STORAGE_KEY is defined correctly", () => {
    runner.assertEquals(STORAGE_KEY, "todo-language");
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================

  runner.test("Full flow: save, load, and translate", () => {
    if (
      typeof document !== "undefined" &&
      typeof localStorage !== "undefined"
    ) {
      // Save English
      setLanguage("en");
      runner.assertEquals(getLanguage(), "en");
      runner.assertEquals(t("addTaskButton"), "Add Task");

      // Reload from storage
      loadLanguage();
      runner.assertEquals(getLanguage(), "en");
      runner.assertEquals(t("addTaskButton"), "Add Task");

      // Switch to Portuguese
      setLanguage("pt");
      runner.assertEquals(getLanguage(), "pt");
      runner.assertEquals(t("addTaskButton"), "Adicionar");
    }
  });

  runner.test(
    "Translation with placeholder uses fallback if key does not exist",
    () => {
      if (typeof document !== "undefined") {
        setLanguage("en");
        const result = t("nonexistentKey", { text: "test" });
        runner.assertEquals(result, "nonexistentKey");
      }
    }
  );

  runner.test("setLanguage normalizes language code", () => {
    if (typeof document !== "undefined") {
      const result = setLanguage("EN");
      runner.assertTrue(result);
      runner.assertEquals(getLanguage(), "en");

      setLanguage("PT");
      runner.assertEquals(getLanguage(), "pt");
    }
  });
}
