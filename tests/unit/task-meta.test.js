/**
 * Task metadata (categories and tags) unit tests.
 */

import {
  normalizeCategory,
  normalizeTags,
  migrateTask,
  hasTag,
} from "../../js/modules/task-meta.js";

/**
 * @param {import("../../tests/test-runner.js").default} runner
 */
export function runTaskMetaTests(runner) {
  runner.category("Unit Tests - Todo Categories & Tags");

  runner.test("normalizeCategory: returns null for empty values", () => {
    runner.assertEquals(normalizeCategory(null), null);
    runner.assertEquals(normalizeCategory(undefined), null);
    runner.assertEquals(normalizeCategory(""), null);
    runner.assertEquals(normalizeCategory("   "), null);
  });

  runner.test("normalizeCategory: trims valid categories", () => {
    runner.assertEquals(normalizeCategory("  Work  "), "Work");
    runner.assertEquals(normalizeCategory("Personal"), "Personal");
  });

  runner.test("normalizeTags: returns empty array for invalid input", () => {
    runner.assertEquals(JSON.stringify(normalizeTags(null)), "[]");
    runner.assertEquals(JSON.stringify(normalizeTags("work")), "[]");
  });

  runner.test("normalizeTags: trims, deduplicates, and drops empties", () => {
    const tags = normalizeTags(["  urgent ", "URGENT", "", "home", "  home  "]);
    runner.assertEquals(JSON.stringify(tags), JSON.stringify(["urgent", "home"]));
  });

  runner.test("migrateTask: adds defaults for legacy tasks", () => {
    const migrated = migrateTask({
      id: "1",
      text: "Legacy",
      completed: false,
    });

    runner.assertEquals(migrated.category, null);
    runner.assertEquals(JSON.stringify(migrated.tags), "[]");
  });

  runner.test("migrateTask: normalizes existing metadata", () => {
    const migrated = migrateTask({
      id: "2",
      text: "Tagged",
      completed: true,
      category: "  Work ",
      tags: ["a", "A"],
    });

    runner.assertEquals(migrated.category, "Work");
    runner.assertEquals(JSON.stringify(migrated.tags), JSON.stringify(["a"]));
  });

  runner.test("hasTag: matches case-insensitively", () => {
    runner.assertTrue(hasTag(["Urgent", "Home"], "urgent"));
    runner.assertFalse(hasTag(["Home"], "urgent"));
  });
}
