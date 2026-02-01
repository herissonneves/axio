/**
 * Testes para o Módulo UI
 * 
 * Testa os componentes de interface do usuário:
 * - ui-icons.js: Criação de ícones SVG
 * - ui-elements.js: Componentes básicos
 * - ui-drag.js: Sistema de drag-and-drop
 * - ui-render.js: Renderização da lista
 */

import {
  createCheckIcon,
  createOptionsIcon,
  createDragHandleIcon,
  createEditIcon,
  createDeleteIcon,
} from "../js/modules/ui/ui-icons.js";

import {
  getTaskIndex,
  getOriginalIndex,
} from "../js/modules/ui/ui-drag.js";

/**
 * Registra todos os testes do módulo UI
 * @param {TestRunner} runner - Instância do executor de testes
 */
export function runUITests(runner) {
  runner.category("Testes do Módulo UI");

  // ============================================================================
  // TESTES DE ui-icons.js
  // ============================================================================

  runner.test("ui-icons: createCheckIcon cria elemento SVG válido", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createCheckIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertEquals(icon.getAttribute("width"), "12");
    runner.assertEquals(icon.getAttribute("height"), "10");
    runner.assertTrue(icon.classList.contains("todo-item__checkbox-icon"));
    
    // Verifica que contém path
    const paths = icon.querySelectorAll("path");
    runner.assertTrue(paths.length > 0);
  });

  runner.test("ui-icons: createOptionsIcon cria ícone de três pontos", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createOptionsIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertEquals(icon.getAttribute("width"), "4");
    runner.assertEquals(icon.getAttribute("height"), "16");
    
    const paths = icon.querySelectorAll("path");
    runner.assertTrue(paths.length > 0);
  });

  runner.test("ui-icons: createDragHandleIcon cria ícone de arrastar", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createDragHandleIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertEquals(icon.getAttribute("width"), "24");
    runner.assertEquals(icon.getAttribute("height"), "24");
    runner.assertTrue(icon.classList.contains("todo-item__drag-icon"));
  });

  runner.test("ui-icons: createEditIcon cria ícone de editar", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createEditIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertTrue(icon.classList.contains("todo-menu__icon"));
  });

  runner.test("ui-icons: createDeleteIcon cria ícone de excluir", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createDeleteIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertTrue(icon.classList.contains("todo-menu__icon"));
  });

  runner.test("ui-icons: todos os ícones são elementos SVG únicos", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const check = createCheckIcon();
    const options = createOptionsIcon();
    const drag = createDragHandleIcon();
    const edit = createEditIcon();
    const del = createDeleteIcon();

    // Verificar que são instâncias diferentes
    runner.assertTrue(check !== options);
    runner.assertTrue(check !== drag);
    runner.assertTrue(check !== edit);
    runner.assertTrue(check !== del);

    // Todos são SVG
    runner.assertEquals(check.tagName, "svg");
    runner.assertEquals(options.tagName, "svg");
    runner.assertEquals(drag.tagName, "svg");
    runner.assertEquals(edit.tagName, "svg");
    runner.assertEquals(del.tagName, "svg");
  });

  // ============================================================================
  // TESTES DE ui-drag.js
  // ============================================================================

  runner.test("ui-drag: getTaskIndex retorna índice correto", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Criar lista mock
    const list = document.createElement("ul");
    list.id = "todo-list";
    
    const li1 = document.createElement("li");
    li1.classList.add("todo-item__container");
    const li2 = document.createElement("li");
    li2.classList.add("todo-item__container");
    const li3 = document.createElement("li");
    li3.classList.add("todo-item__container");

    list.append(li1, li2, li3);
    document.body.append(list);

    const index1 = getTaskIndex(li1, list);
    const index2 = getTaskIndex(li2, list);
    const index3 = getTaskIndex(li3, list);

    runner.assertEquals(index1, 0);
    runner.assertEquals(index2, 1);
    runner.assertEquals(index3, 2);

    // Limpar
    list.remove();
  });

  runner.test("ui-drag: getTaskIndex retorna -1 para elemento não encontrado", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const list = document.createElement("ul");
    const li = document.createElement("li");
    
    const index = getTaskIndex(li, list);
    runner.assertEquals(index, -1);
  });

  runner.test("ui-drag: getOriginalIndex valida limites", () => {
    // Testa índice negativo
    const result1 = getOriginalIndex(-1, "all");
    runner.assertEquals(result1, -1);

    // Testa índice fora dos limites
    const result2 = getOriginalIndex(9999, "all");
    runner.assertEquals(result2, -1);
  });

  // ============================================================================
  // TESTES DE INTEGRAÇÃO ui/*
  // ============================================================================

  runner.test("ui: ícones podem ser adicionados ao DOM", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const container = document.createElement("div");
    
    container.append(createCheckIcon());
    container.append(createOptionsIcon());
    container.append(createDragHandleIcon());

    const svgs = container.querySelectorAll("svg");
    runner.assertEquals(svgs.length, 3);

    // Cada SVG tem paths
    svgs.forEach(svg => {
      const paths = svg.querySelectorAll("path");
      runner.assertTrue(paths.length > 0);
    });
  });

  runner.test("ui: ícones mantêm classes CSS corretas", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const check = createCheckIcon();
    const drag = createDragHandleIcon();
    const edit = createEditIcon();
    const del = createDeleteIcon();

    runner.assertTrue(check.classList.contains("todo-item__checkbox-icon"));
    runner.assertTrue(drag.classList.contains("todo-item__drag-icon"));
    runner.assertTrue(edit.classList.contains("todo-menu__icon"));
    runner.assertTrue(del.classList.contains("todo-menu__icon"));
  });

  runner.test("ui: ícones SVG têm viewBox correto", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const check = createCheckIcon();
    const options = createOptionsIcon();
    const drag = createDragHandleIcon();

    runner.assertEquals(check.getAttribute("viewBox"), "0 0 12 10");
    runner.assertEquals(options.getAttribute("viewBox"), "0 0 4 16");
    runner.assertEquals(drag.getAttribute("viewBox"), "0 0 24 24");
  });
}
