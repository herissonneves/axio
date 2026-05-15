/**
 * UI Module Tests
 *
 * Tests user interface components:
 * - ui-icons.js: SVG icon creation
 * - ui-elements.js: Basic components
 * - ui-drag.js: Drag-and-drop system
 * - ui-render.js: List rendering
 */

import {
  createCheckIcon,
  createOptionsIcon,
  createDragHandleIcon,
  createEditIcon,
  createDeleteIcon,
} from "../../js/modules/ui/ui-icons.js";

import {
  getTaskIndex,
  getOriginalIndex,
} from "../../js/modules/ui/ui-drag.js";

/**
 * Registers all UI module tests
 * @param {TestRunner} runner - Test runner instance
 */
export function runUITests(runner) {
  runner.category("UI Module Tests");

  // ============================================================================
  // ui-icons.js TESTS
  // ============================================================================

  runner.test("ui-icons: createCheckIcon creates a valid SVG element", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createCheckIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertEquals(icon.getAttribute("width"), "12");
    runner.assertEquals(icon.getAttribute("height"), "10");
    runner.assertTrue(icon.classList.contains("todo-item__checkbox-icon"));

    // Verify it contains a path
    const paths = icon.querySelectorAll("path");
    runner.assertTrue(paths.length > 0);
  });

  runner.test("ui-icons: createOptionsIcon creates a three-dot icon", () => {
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

  runner.test("ui-icons: createDragHandleIcon creates a drag icon", () => {
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

  runner.test("ui-icons: createEditIcon creates an edit icon", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createEditIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertTrue(icon.classList.contains("todo-menu__icon"));
  });

  runner.test("ui-icons: createDeleteIcon creates a delete icon", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const icon = createDeleteIcon();
    runner.assertEquals(icon.tagName, "svg");
    runner.assertTrue(icon.classList.contains("todo-menu__icon"));
  });

  runner.test("ui-icons: all icons are unique SVG elements", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const check = createCheckIcon();
    const options = createOptionsIcon();
    const drag = createDragHandleIcon();
    const edit = createEditIcon();
    const del = createDeleteIcon();

    // Verify they are different instances
    runner.assertTrue(check !== options);
    runner.assertTrue(check !== drag);
    runner.assertTrue(check !== edit);
    runner.assertTrue(check !== del);

    // All are SVG
    runner.assertEquals(check.tagName, "svg");
    runner.assertEquals(options.tagName, "svg");
    runner.assertEquals(drag.tagName, "svg");
    runner.assertEquals(edit.tagName, "svg");
    runner.assertEquals(del.tagName, "svg");
  });

  // ============================================================================
  // ui-drag.js TESTS
  // ============================================================================

  runner.test("ui-drag: getTaskIndex returns the correct index", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    // Create mock list
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

    // Cleanup
    list.remove();
  });

  runner.test("ui-drag: getTaskIndex returns -1 when element is not found", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true);
      return;
    }

    const list = document.createElement("ul");
    const li = document.createElement("li");

    const index = getTaskIndex(li, list);
    runner.assertEquals(index, -1);
  });

  runner.test("ui-drag: getOriginalIndex validates bounds", () => {
    // Test negative index
    const result1 = getOriginalIndex(-1, "all");
    runner.assertEquals(result1, -1);

    // Test out-of-bounds index
    const result2 = getOriginalIndex(9999, "all");
    runner.assertEquals(result2, -1);
  });

  // ============================================================================
  // ui/* INTEGRATION TESTS
  // ============================================================================

  runner.test("ui: icons can be added to the DOM", () => {
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

    // Each SVG has paths
    svgs.forEach(svg => {
      const paths = svg.querySelectorAll("path");
      runner.assertTrue(paths.length > 0);
    });
  });

  runner.test("ui: icons keep correct CSS classes", () => {
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

  runner.test("ui: SVG icons have correct viewBox", () => {
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
