/**
 * Testes para o Módulo de Atalhos de Teclado (Keyboard)
 * 
 * Testa as funcionalidades de atalhos de teclado:
 * - Exibição do diálogo de ajuda
 * - Registro e execução de atalhos
 * - Detecção de modificadores (Ctrl/Cmd)
 * - Prevenção de atalhos em inputs
 * - Fechamento do diálogo com Escape
 */

import {
  initKeyboardShortcuts,
  showKeyboardShortcutsDialog
} from "../js/modules/keyboard.js";

/**
 * Registra todos os testes do módulo de atalhos de teclado
 * @param {TestRunner} runner - Instância do executor de testes
 */
export function runKeyboardTests(runner) {
  runner.category("Testes Unitários - Keyboard");

  // Helper para criar eventos de teclado simulados
  const createKeyboardEvent = (key, options = {}) => {
    const event = new KeyboardEvent("keydown", {
      key: key,
      ctrlKey: options.ctrlKey || false,
      metaKey: options.metaKey || false,
      shiftKey: options.shiftKey || false,
      bubbles: true,
      cancelable: true
    });

    // Definir target manualmente se fornecido (não pode ser definido no construtor)
    if (options.target) {
      Object.defineProperty(event, "target", {
        value: options.target,
        writable: false
      });
    }

    return event;
  };

  // Helper para limpar event listeners anteriores
  const cleanupKeyboardListeners = () => {
    // Criar um novo documento temporário para limpar listeners
    // Na prática, isso é difícil de fazer sem remover todos os listeners
    // Vamos confiar que cada teste cria uma nova instância
  };

  runner.test("showKeyboardShortcutsDialog should create dialog element", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true); // Skip in non-browser environment
      return;
    }

    // Limpar diálogos anteriores
    const existingDialogs = document.querySelectorAll(".todo-dialog");
    existingDialogs.forEach(dialog => dialog.remove());

    showKeyboardShortcutsDialog();
    const dialog = document.querySelector(".todo-dialog");
    runner.assertTrue(dialog !== null);
    runner.assertEquals(dialog.getAttribute("role"), "dialog");
    runner.assertEquals(dialog.getAttribute("aria-modal"), "true");

    // Limpar após o teste
    dialog.remove();
    document.body.style.overflow = "";
  });

  runner.test("showKeyboardShortcutsDialog should create shortcuts list", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const existingDialogs = document.querySelectorAll(".todo-dialog");
    existingDialogs.forEach(dialog => dialog.remove());

    showKeyboardShortcutsDialog();
    const shortcutsList = document.querySelector(".shortcuts-list");
    runner.assertTrue(shortcutsList !== null);

    const shortcutItems = shortcutsList.querySelectorAll(".shortcuts-item");
    runner.assertTrue(shortcutItems.length > 0);

    // Verificar estrutura de cada item
    shortcutItems.forEach(item => {
      const key = item.querySelector(".shortcuts-key");
      const description = item.querySelector(".shortcuts-description");
      runner.assertTrue(key !== null);
      runner.assertTrue(description !== null);
    });

    const dialog = document.querySelector(".todo-dialog");
    dialog.remove();
    document.body.style.overflow = "";
  });

  runner.test("showKeyboardShortcutsDialog should close on Escape key", async () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const existingDialogs = document.querySelectorAll(".todo-dialog");
    existingDialogs.forEach(dialog => dialog.remove());

    showKeyboardShortcutsDialog();
    let dialog = document.querySelector(".todo-dialog");
    runner.assertTrue(dialog !== null);

    // Simular Escape
    const escapeEvent = createKeyboardEvent("Escape");
    document.dispatchEvent(escapeEvent);

    // Aguardar um pouco para o evento ser processado
    await new Promise(resolve => setTimeout(resolve, 100));

    dialog = document.querySelector(".todo-dialog");
    runner.assertTrue(dialog === null);
    runner.assertEquals(document.body.style.overflow, "");
  });

  runner.test("showKeyboardShortcutsDialog should close on close button click", async () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const existingDialogs = document.querySelectorAll(".todo-dialog");
    existingDialogs.forEach(dialog => dialog.remove());

    showKeyboardShortcutsDialog();
    let dialog = document.querySelector(".todo-dialog");
    runner.assertTrue(dialog !== null);

    const closeBtn = dialog.querySelector(".todo-dialog__button");
    runner.assertTrue(closeBtn !== null);

    closeBtn.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    dialog = document.querySelector(".todo-dialog");
    runner.assertTrue(dialog === null);
    runner.assertEquals(document.body.style.overflow, "");
  });

  runner.test("initKeyboardShortcuts should call focusInput on Ctrl+K", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let focusInputCalled = false;
    const handlers = {
      focusInput: () => { focusInputCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("k", { ctrlKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(focusInputCalled);
  });

  runner.test("initKeyboardShortcuts should call focusInput on / key", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let focusInputCalled = false;
    const handlers = {
      focusInput: () => { focusInputCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("/");
    document.dispatchEvent(event);

    runner.assertTrue(focusInputCalled);
  });

  runner.test("initKeyboardShortcuts should call toggleTheme on Ctrl+G", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let toggleThemeCalled = false;
    const handlers = {
      toggleTheme: () => { toggleThemeCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("g", { ctrlKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(toggleThemeCalled);
  });

  runner.test("initKeyboardShortcuts should call toggleContrast on Ctrl+J", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let toggleContrastCalled = false;
    const handlers = {
      toggleContrast: () => { toggleContrastCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("j", { ctrlKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(toggleContrastCalled);
  });

  runner.test("initKeyboardShortcuts should call toggleLanguage on Ctrl+L", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let toggleLanguageCalled = false;
    const handlers = {
      toggleLanguage: () => { toggleLanguageCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("l", { ctrlKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(toggleLanguageCalled);
  });

  runner.test("initKeyboardShortcuts should call setFilterAll on 1 key", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let setFilterAllCalled = false;
    const handlers = {
      setFilterAll: () => { setFilterAllCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("1");
    document.dispatchEvent(event);

    runner.assertTrue(setFilterAllCalled);
  });

  runner.test("initKeyboardShortcuts should call setFilterActive on 2 key", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let setFilterActiveCalled = false;
    const handlers = {
      setFilterActive: () => { setFilterActiveCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("2");
    document.dispatchEvent(event);

    runner.assertTrue(setFilterActiveCalled);
  });

  runner.test("initKeyboardShortcuts should call setFilterCompleted on 3 key", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let setFilterCompletedCalled = false;
    const handlers = {
      setFilterCompleted: () => { setFilterCompletedCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("3");
    document.dispatchEvent(event);

    runner.assertTrue(setFilterCompletedCalled);
  });

  runner.test("initKeyboardShortcuts should call clearCompleted on Ctrl+Delete", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let clearCompletedCalled = false;
    const handlers = {
      clearCompleted: () => { clearCompletedCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("Delete", { ctrlKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(clearCompletedCalled);
  });

  runner.test("initKeyboardShortcuts should call clearAll on Ctrl+Shift+Delete", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let clearAllCalled = false;
    const handlers = {
      clearAll: () => { clearAllCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("Delete", { ctrlKey: true, shiftKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(clearAllCalled);
  });

  runner.test("initKeyboardShortcuts should call showHelp on Ctrl+?", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let showHelpCalled = false;
    const handlers = {
      showHelp: () => { showHelpCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("?", { ctrlKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(showHelpCalled);
  });

  runner.test("initKeyboardShortcuts should call showHelp on F1", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let showHelpCalled = false;
    const handlers = {
      showHelp: () => { showHelpCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("F1");
    document.dispatchEvent(event);

    runner.assertTrue(showHelpCalled);
  });

  runner.test("initKeyboardShortcuts should not trigger shortcuts when typing in input", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Criar um input para teste e focar nele
    const input = document.createElement("input");
    input.type = "text";
    document.body.appendChild(input);
    input.focus();

    let setFilterAllCalled = false;
    const handlers = {
      setFilterAll: () => { setFilterAllCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    // Simular tecla 1 dentro do input (sem modificador) - não deve acionar
    // O evento precisa ser despachado no document com target sendo o input
    const event = createKeyboardEvent("1", { target: input });
    document.dispatchEvent(event);

    // O atalho não deve ser acionado quando digitando em input sem modificador
    runner.assertFalse(setFilterAllCalled);

    // Limpar
    input.remove();
  });

  runner.test("initKeyboardShortcuts should trigger shortcuts with modifier in input", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const input = document.createElement("input");
    input.type = "text";
    document.body.appendChild(input);

    let focusInputCalled = false;
    const handlers = {
      focusInput: () => { focusInputCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    // Simular Ctrl+K dentro do input (com modificador)
    const event = createKeyboardEvent("k", { ctrlKey: true, target: input });
    document.dispatchEvent(event);

    // O atalho deve ser acionado mesmo em input quando tem modificador
    runner.assertTrue(focusInputCalled);

    // Limpar
    input.remove();
  });

  runner.test("initKeyboardShortcuts should prevent default behavior", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let preventDefaultCalled = false;
    const handlers = {
      focusInput: () => { }
    };

    initKeyboardShortcuts(handlers);

    const event = createKeyboardEvent("k", { ctrlKey: true });

    // Interceptar preventDefault para verificar se foi chamado
    const originalPreventDefault = event.preventDefault;
    event.preventDefault = function () {
      preventDefaultCalled = true;
      originalPreventDefault.call(this);
    };

    document.dispatchEvent(event);

    // Verificar se preventDefault foi chamado
    runner.assertTrue(preventDefaultCalled);
  });

  runner.test("initKeyboardShortcuts should support metaKey (Cmd on Mac)", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    let toggleThemeCalled = false;
    const handlers = {
      toggleTheme: () => { toggleThemeCalled = true; }
    };

    initKeyboardShortcuts(handlers);

    // Simular Cmd+G (metaKey ao invés de ctrlKey)
    const event = createKeyboardEvent("g", { metaKey: true });
    document.dispatchEvent(event);

    runner.assertTrue(toggleThemeCalled);
  });
}
