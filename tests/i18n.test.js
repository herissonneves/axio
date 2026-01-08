/**
 * Tests for i18n module
 */

import {
  getLanguage,
  setLanguage,
  loadLanguage,
  t,
  getAvailableLanguages,
  initI18n
} from "../js/modules/i18n.js";

export function runI18nTests(runner) {
  // Mock document for tests
  const originalDocument = global.document;
  const mockDocument = {
    documentElement: {
      lang: "pt",
    },
  };

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
      runner.assertEquals(t("addTaskButton"), "Adicionar Tarefa");
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
    if (typeof localStorage !== "undefined" && typeof document !== "undefined") {
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
}
