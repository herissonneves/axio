/**
 * Testes para o Módulo de Internacionalização (i18n)
 * 
 * Testa as funcionalidades de tradução e troca de idiomas:
 * - Funções principais (getLanguage, setLanguage, t, etc)
 * - Utilitários (replacePlaceholders, extractPlaceholders, etc)
 * - Detecção de idioma (detectLanguage, isLanguageSupported, etc)
 * - Persistência (storage)
 * - Traduções e placeholders
 * - Inicialização do sistema
 */

import {
  // API principal
  getLanguage,
  setLanguage,
  loadLanguage,
  t,
  getAvailableLanguages,
  initI18n,
  hasTranslation,
  getAllTranslations,
  // Constantes
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
  // Utilitários
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
} from "../js/modules/i18n.js";

/**
 * Registra todos os testes do módulo de internacionalização
 * @param {TestRunner} runner - Instância do executor de testes
 */
export function runI18nTests(runner) {
  runner.category("Testes Unitários - i18n");

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

  // ============================================================================
  // TESTES DE UTILITÁRIOS (i18n-utils.js)
  // ============================================================================

  runner.test("replacePlaceholders substitui placeholders simples", () => {
    const result = replacePlaceholders("Olá {name}!", { name: "Maria" });
    runner.assertEquals(result, "Olá Maria!");
  });

  runner.test("replacePlaceholders substitui múltiplos placeholders", () => {
    const result = replacePlaceholders("Olá {name}, você tem {count} mensagens", {
      name: "João",
      count: 5
    });
    runner.assertEquals(result, "Olá João, você tem 5 mensagens");
  });

  runner.test("replacePlaceholders mantém placeholders sem valor", () => {
    const result = replacePlaceholders("Olá {name}!", {});
    runner.assertEquals(result, "Olá {name}!");
  });

  runner.test("replacePlaceholders retorna texto sem placeholders inalterado", () => {
    const result = replacePlaceholders("Olá mundo!", { name: "Maria" });
    runner.assertEquals(result, "Olá mundo!");
  });

  runner.test("hasPlaceholders detecta presença de placeholders", () => {
    runner.assertTrue(hasPlaceholders("Olá {name}!"));
    runner.assertFalse(hasPlaceholders("Olá mundo!"));
    runner.assertFalse(hasPlaceholders(""));
  });

  runner.test("extractPlaceholders extrai nomes dos placeholders", () => {
    const placeholders = extractPlaceholders("Olá {name}, você tem {count} mensagens");
    runner.assertEquals(placeholders.length, 2);
    runner.assertTrue(placeholders.includes("name"));
    runner.assertTrue(placeholders.includes("count"));
  });

  runner.test("extractPlaceholders retorna array vazio sem placeholders", () => {
    const placeholders = extractPlaceholders("Olá mundo!");
    runner.assertEquals(placeholders.length, 0);
  });

  runner.test("validatePlaceholders valida se todos placeholders têm valores", () => {
    runner.assertTrue(validatePlaceholders("Olá {name}!", { name: "Maria" }));
    runner.assertFalse(validatePlaceholders("Olá {name}!", {}));
    runner.assertTrue(validatePlaceholders("Olá mundo!", {}));
  });

  runner.test("normalizeLanguageCode normaliza códigos de idioma", () => {
    runner.assertEquals(normalizeLanguageCode("PT"), "pt");
    runner.assertEquals(normalizeLanguageCode(" en "), "en");
    runner.assertEquals(normalizeLanguageCode("En"), "en");
  });

  // ============================================================================
  // TESTES DE DETECTOR (i18n-detector.js)
  // ============================================================================

  runner.test("extractBaseLanguage extrai código base do idioma", () => {
    runner.assertEquals(extractBaseLanguage("pt-BR"), "pt");
    runner.assertEquals(extractBaseLanguage("en-US"), "en");
    runner.assertEquals(extractBaseLanguage("pt"), "pt");
    runner.assertEquals(extractBaseLanguage(""), "");
  });

  runner.test("isLanguageSupported verifica idiomas suportados", () => {
    runner.assertTrue(isLanguageSupported("pt"));
    runner.assertTrue(isLanguageSupported("en"));
    runner.assertFalse(isLanguageSupported("fr"));
    runner.assertFalse(isLanguageSupported(""));
  });

  runner.test("detectLanguage retorna idioma válido", () => {
    const detected = detectLanguage();
    runner.assertTrue(detected === "pt" || detected === "en");
  });

  // ============================================================================
  // TESTES DE STORAGE (i18n-storage.js)
  // ============================================================================

  runner.test("saveLanguagePreference salva preferência no localStorage", () => {
    if (typeof localStorage !== "undefined") {
      const saved = saveLanguagePreference("en");
      runner.assertTrue(saved);
      runner.assertEquals(localStorage.getItem(STORAGE_KEY), "en");
    }
  });

  runner.test("loadLanguagePreference carrega preferência do localStorage", () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "pt");
      const loaded = loadLanguagePreference();
      runner.assertEquals(loaded, "pt");
    }
  });

  runner.test("loadLanguagePreference retorna null se não houver preferência", () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      const loaded = loadLanguagePreference();
      runner.assertEquals(loaded, null);
    }
  });

  runner.test("clearLanguagePreference remove preferência do localStorage", () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "en");
      const cleared = clearLanguagePreference();
      runner.assertTrue(cleared);
      runner.assertEquals(localStorage.getItem(STORAGE_KEY), null);
    }
  });

  // ============================================================================
  // TESTES DE CORE AVANÇADOS (i18n-core.js)
  // ============================================================================

  runner.test("hasTranslation verifica existência de chave de tradução", () => {
    if (typeof document !== "undefined") {
      setLanguage("pt");
      runner.assertTrue(hasTranslation("pageTitle"));
      runner.assertTrue(hasTranslation("addTaskButton"));
      runner.assertFalse(hasTranslation("chaveInexistente"));
    }
  });

  runner.test("hasTranslation verifica em idioma específico", () => {
    if (typeof document !== "undefined") {
      runner.assertTrue(hasTranslation("addTaskButton", "en"));
      runner.assertTrue(hasTranslation("addTaskButton", "pt"));
      runner.assertFalse(hasTranslation("chaveInexistente", "en"));
    }
  });

  runner.test("getAllTranslations retorna todas traduções do idioma atual", () => {
    if (typeof document !== "undefined") {
      setLanguage("pt");
      const translations = getAllTranslations();
      runner.assertNotNull(translations);
      runner.assertEquals(translations.pageTitle, "Axio");
      runner.assertEquals(translations.addTaskButton, "Adicionar Tarefa");
    }
  });

  runner.test("getAllTranslations retorna traduções de idioma específico", () => {
    if (typeof document !== "undefined") {
      const translations = getAllTranslations("en");
      runner.assertNotNull(translations);
      runner.assertEquals(translations.pageTitle, "Axio");
      runner.assertEquals(translations.addTaskButton, "Add Task");
    }
  });

  runner.test("getAllTranslations retorna null para idioma inválido", () => {
    if (typeof document !== "undefined") {
      const translations = getAllTranslations("fr");
      runner.assertNull(translations);
    }
  });

  // ============================================================================
  // TESTES DE CONSTANTES
  // ============================================================================

  runner.test("DEFAULT_LANGUAGE está definido corretamente", () => {
    runner.assertEquals(DEFAULT_LANGUAGE, "pt");
  });

  runner.test("SUPPORTED_LANGUAGES contém idiomas corretos", () => {
    runner.assertEquals(SUPPORTED_LANGUAGES.length, 2);
    runner.assertTrue(SUPPORTED_LANGUAGES.includes("pt"));
    runner.assertTrue(SUPPORTED_LANGUAGES.includes("en"));
  });

  runner.test("STORAGE_KEY está definido corretamente", () => {
    runner.assertEquals(STORAGE_KEY, "todo-language");
  });

  // ============================================================================
  // TESTES DE INTEGRAÇÃO
  // ============================================================================

  runner.test("Fluxo completo: salvar, carregar e traduzir", () => {
    if (typeof document !== "undefined" && typeof localStorage !== "undefined") {
      // Salva inglês
      setLanguage("en");
      runner.assertEquals(getLanguage(), "en");
      runner.assertEquals(t("addTaskButton"), "Add Task");

      // Recarrega do storage
      loadLanguage();
      runner.assertEquals(getLanguage(), "en");
      runner.assertEquals(t("addTaskButton"), "Add Task");

      // Muda para português
      setLanguage("pt");
      runner.assertEquals(getLanguage(), "pt");
      runner.assertEquals(t("addTaskButton"), "Adicionar Tarefa");
    }
  });

  runner.test("Tradução com placeholder usa fallback se chave não existir", () => {
    if (typeof document !== "undefined") {
      setLanguage("en");
      const result = t("chaveInexistente", { text: "teste" });
      runner.assertEquals(result, "chaveInexistente");
    }
  });

  runner.test("setLanguage normaliza código de idioma", () => {
    if (typeof document !== "undefined") {
      const result = setLanguage("EN");
      runner.assertTrue(result);
      runner.assertEquals(getLanguage(), "en");

      setLanguage("PT");
      runner.assertEquals(getLanguage(), "pt");
    }
  });
}
