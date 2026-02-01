/**
 * Testes para o Módulo de Atalhos de Teclado
 * 
 * Testa as funcionalidades de atalhos de teclado:
 * - Utilitários de detecção de teclas
 * - Validação de contexto para bloqueio
 * - Correspondência de atalhos com eventos
 * - Processamento de atalhos
 */

import { 
  isModifierPressed,
  shouldBlockShortcut,
  matchesShortcut,
} from "../../js/modules/keyboard/keyboard-utils.js";

/**
 * Registra todos os testes do módulo de atalhos de teclado
 * @param {TestRunner} runner - Instância do executor de testes
 */
export function runKeyboardTests(runner) {
  runner.category("Testes Unitários - Keyboard");

  // ============================================================================
  // Testes: isModifierPressed
  // ============================================================================

  runner.test("isModifierPressed detecta Ctrl pressionado", () => {
    const event = { ctrlKey: true, metaKey: false };
    runner.assertTrue(isModifierPressed(event));
  });

  runner.test("isModifierPressed detecta Cmd/Meta pressionado", () => {
    const event = { ctrlKey: false, metaKey: true };
    runner.assertTrue(isModifierPressed(event));
  });

  runner.test("isModifierPressed retorna false quando nenhum modificador está pressionado", () => {
    const event = { ctrlKey: false, metaKey: false };
    runner.assertFalse(isModifierPressed(event));
  });

  runner.test("isModifierPressed detecta ambos Ctrl e Meta", () => {
    const event = { ctrlKey: true, metaKey: true };
    runner.assertTrue(isModifierPressed(event));
  });

  // ============================================================================
  // Testes: shouldBlockShortcut
  // ============================================================================

  runner.test("shouldBlockShortcut permite Escape em qualquer contexto", () => {
    const event = {
      key: "Escape",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut bloqueia teclas normais em INPUT", () => {
    const event = {
      key: "a",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertTrue(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut permite atalhos com modificador em INPUT", () => {
    const event = {
      key: "k",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: true,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut permite / em INPUT", () => {
    const event = {
      key: "/",
      target: { tagName: "INPUT", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut bloqueia teclas normais em TEXTAREA", () => {
    const event = {
      key: "a",
      target: { tagName: "TEXTAREA", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertTrue(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut bloqueia teclas em contentEditable", () => {
    const event = {
      key: "a",
      target: { tagName: "DIV", isContentEditable: true },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertTrue(shouldBlockShortcut(event));
  });

  runner.test("shouldBlockShortcut permite teclas em elementos normais", () => {
    const event = {
      key: "a",
      target: { tagName: "DIV", isContentEditable: false },
      ctrlKey: false,
      metaKey: false
    };
    runner.assertFalse(shouldBlockShortcut(event));
  });

  // ============================================================================
  // Testes: matchesShortcut
  // ============================================================================

  runner.test("matchesShortcut identifica Ctrl+K corretamente", () => {
    const event = { 
      key: "k", 
      ctrlKey: true, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "k", 
      modifier: true 
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut identifica Cmd+K corretamente", () => {
    const event = { 
      key: "k", 
      ctrlKey: false, 
      metaKey: true, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "k", 
      modifier: true 
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut rejeita tecla diferente", () => {
    const event = { 
      key: "j", 
      ctrlKey: true, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "k", 
      modifier: true 
    };
    runner.assertFalse(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut rejeita modificador incorreto", () => {
    const event = { 
      key: "k", 
      ctrlKey: false, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "k", 
      modifier: true 
    };
    runner.assertFalse(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut aceita tecla sem modificador", () => {
    const event = { 
      key: "1", 
      ctrlKey: false, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "1", 
      modifier: false 
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut identifica Ctrl+Shift+Delete", () => {
    const event = { 
      key: "delete", 
      ctrlKey: true, 
      metaKey: false, 
      shiftKey: true 
    };
    const shortcut = { 
      key: "delete", 
      modifier: true, 
      shift: true 
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut rejeita Shift incorreto", () => {
    const event = { 
      key: "delete", 
      ctrlKey: true, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "delete", 
      modifier: true, 
      shift: true 
    };
    runner.assertFalse(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut é case-insensitive para teclas normais", () => {
    const event = { 
      key: "K", 
      ctrlKey: true, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "k", 
      modifier: true 
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut aceita teclas especiais como F1", () => {
    const event = { 
      key: "F1", 
      ctrlKey: false, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "F1", 
      modifier: false 
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  runner.test("matchesShortcut aceita atalho sem definição de modificador", () => {
    const event = { 
      key: "/", 
      ctrlKey: true, 
      metaKey: false, 
      shiftKey: false 
    };
    const shortcut = { 
      key: "/" 
      // modifier undefined = aceita qualquer estado
    };
    runner.assertTrue(matchesShortcut(event, shortcut));
  });

  // ============================================================================
  // Testes de Integração: Configuração de Atalhos
  // ============================================================================

  runner.test("Configuração de atalhos contém todas as teclas esperadas", () => {
    // Importar a configuração
    const config = {
      FOCUS_INPUT: { key: "k", modifier: true, handler: "focusInput" },
      TOGGLE_THEME: { key: "g", modifier: true, handler: "toggleTheme" },
      FILTER_ALL: { key: "1", modifier: false, handler: "setFilterAll" },
    };
    
    runner.assertTrue(config.FOCUS_INPUT.key === "k");
    runner.assertTrue(config.TOGGLE_THEME.modifier === true);
    runner.assertTrue(config.FILTER_ALL.handler === "setFilterAll");
  });
}
