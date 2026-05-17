/**
 * Todo module tests for categories and tags.
 */

import {
  getTasks,
  addTask,
  removeTask,
  updateTask,
  setTaskCategory,
  setTaskTags,
  addTaskTags,
  removeTaskTag,
  getTasksByCategory,
  getTasksByTag,
  getCategories,
  getTags,
  clearAll,
} from "../../js/modules/todo.js";

/**
 * @param {import("../../tests/test-runner.js").default} runner
 */
export function runTodoCategoriesTests(runner) {
  runner.category("Unit Tests - Todo Categories & Tags");

  const clearAllTasks = () => {
    clearAll();
  };

  runner.test("addTask: stores category and tags when provided", () => {
    clearAllTasks();

    const task = addTask("Plan sprint", {
      category: "Work",
      tags: ["planning", "urgent"],
    });

    runner.assertEquals(task.category, "Work");
    runner.assertEquals(JSON.stringify(task.tags), JSON.stringify(["planning", "urgent"]));

    const stored = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(stored.category, "Work");
    runner.assertEquals(JSON.stringify(stored.tags), JSON.stringify(["planning", "urgent"]));
  });

  runner.test("addTask: defaults category to null and tags to empty array", () => {
    clearAllTasks();

    const task = addTask("Simple task");
    runner.assertEquals(task.category, null);
    runner.assertEquals(JSON.stringify(task.tags), "[]");
  });

  runner.test("setTaskCategory: updates category for a task", () => {
    clearAllTasks();

    const task = addTask("Read book");
    setTaskCategory(task.id, "Personal");

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(updated.category, "Personal");
  });

  runner.test("setTaskCategory: clears category when empty", () => {
    clearAllTasks();

    const task = addTask("Temp", { category: "Work" });
    setTaskCategory(task.id, "   ");

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(updated.category, null);
  });

  runner.test("setTaskTags: replaces all tags", () => {
    clearAllTasks();

    const task = addTask("Deploy", { tags: ["devops"] });
    setTaskTags(task.id, ["release", "release", "  prod  "]);

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(JSON.stringify(updated.tags), JSON.stringify(["release", "prod"]));
  });

  runner.test("addTaskTags: merges without duplicates", () => {
    clearAllTasks();

    const task = addTask("Write docs", { tags: ["docs"] });
    addTaskTags(task.id, "review", "DOCS");

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(JSON.stringify(updated.tags), JSON.stringify(["docs", "review"]));
  });

  runner.test("removeTaskTag: removes a single tag", () => {
    clearAllTasks();

    const task = addTask("Fix bug", { tags: ["bug", "urgent"] });
    removeTaskTag(task.id, "URGENT");

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(JSON.stringify(updated.tags), JSON.stringify(["bug"]));
  });

  runner.test("getTasksByCategory: filters by category and uncategorized", () => {
    clearAllTasks();

    addTask("Work task", { category: "Work" });
    addTask("No category");
    addTask("Another work", { category: "Work" });

    runner.assertEquals(getTasksByCategory("Work").length, 2);
    runner.assertEquals(getTasksByCategory(null).length, 1);
  });

  runner.test("getTasksByTag: filters by tag case-insensitively", () => {
    clearAllTasks();

    addTask("One", { tags: ["urgent"] });
    addTask("Two", { tags: ["home"] });
    addTask("Three", { tags: ["URGENT"] });

    const urgent = getTasksByTag("urgent");
    runner.assertEquals(urgent.length, 2);
  });

  runner.test("getCategories and getTags: return sorted unique values", () => {
    clearAllTasks();

    addTask("A", { category: "Beta", tags: ["zeta", "alpha"] });
    addTask("B", { category: "Alpha", tags: ["alpha"] });

    runner.assertEquals(JSON.stringify(getCategories()), JSON.stringify(["Alpha", "Beta"]));
    runner.assertEquals(JSON.stringify(getTags()), JSON.stringify(["alpha", "zeta"]));
  });

  runner.test("updateTask: preserves category and tags", () => {
    clearAllTasks();

    const task = addTask("Original", {
      category: "Work",
      tags: ["important"],
    });

    updateTask(task.id, "Updated title");

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(updated.text, "Updated title");
    runner.assertEquals(updated.category, "Work");
    runner.assertEquals(JSON.stringify(updated.tags), JSON.stringify(["important"]));
  });

  runner.test("removeTask: removes task with metadata", () => {
    clearAllTasks();

    const task = addTask("Disposable", {
      category: "Temp",
      tags: ["cleanup"],
    });

    removeTask(task.id);
    runner.assertEquals(getTasks().find((item) => item.id === task.id), undefined);
    runner.assertEquals(getCategories().length, 0);
    runner.assertEquals(getTags().length, 0);
  });
}
