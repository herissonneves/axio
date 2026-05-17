/**
 * Integration tests for task categories and tags.
 */

import {
  getTasks,
  addTask,
  setTaskCategory,
  setTaskTags,
  addTaskTags,
  removeTaskTag,
  getTasksByCategory,
  getTasksByTag,
  getCategories,
  getTags,
  toggleTask,
  clearCompleted,
  clearAll,
  updateTask,
  reloadTasksFromStorage,
} from "../../js/modules/todo.js";
import { loadTasks } from "../../js/modules/storage.js";

/**
 * @param {import("../../tests/test-runner.js").default} runner
 */
export function runTodoCategoriesIntegrationTests(runner) {
  runner.category("Integration Tests - Categories & Tags");

  const clearAllTasks = () => {
    clearAll();
  };

  runner.test("Integration: category and tags persist in localStorage", () => {
    clearAllTasks();

    const task = addTask("Persist metadata", {
      category: "Work",
      tags: ["persist", "storage"],
    });

    const saved = loadTasks();
    const stored = saved.find((item) => item.id === task.id);

    runner.assertTrue(stored !== undefined);
    runner.assertEquals(stored.category, "Work");
    runner.assertEquals(JSON.stringify(stored.tags), JSON.stringify(["persist", "storage"]));
  });

  runner.test("Integration: legacy tasks gain metadata defaults after migration", () => {
    clearAllTasks();

    localStorage.setItem(
      "tasks",
      JSON.stringify([{ id: "legacy-1", text: "Legacy shape", completed: false }]),
    );

    const reloaded = reloadTasksFromStorage();
    runner.assertEquals(reloaded.length, 1);
    runner.assertEquals(reloaded[0].category, null);
    runner.assertEquals(JSON.stringify(reloaded[0].tags), "[]");
    runner.assertEquals(reloaded[0].text, "Legacy shape");
  });

  runner.test("Integration: filter by category and tag across multiple tasks", () => {
    clearAllTasks();

    addTask("Deploy API", { category: "Work", tags: ["devops", "urgent"] });
    addTask("Buy milk", { category: "Personal", tags: ["errands"] });
    addTask("Write tests", { category: "Work", tags: ["urgent"] });

    const workTasks = getTasksByCategory("Work");
    const urgentTasks = getTasksByTag("urgent");

    runner.assertEquals(workTasks.length, 2);
    runner.assertEquals(urgentTasks.length, 2);
    runner.assertEquals(getCategories().length, 2);
    runner.assertEquals(getTags().length, 3);
  });

  runner.test("Integration: metadata survives toggle and text update", () => {
    clearAllTasks();

    const task = addTask("Refactor module", {
      category: "Work",
      tags: ["refactor"],
    });

    toggleTask(task.id);
    updateTask(task.id, "Refactor modules");

    const updated = getTasks().find((item) => item.id === task.id);
    runner.assertTrue(updated.completed);
    runner.assertEquals(updated.text, "Refactor modules");
    runner.assertEquals(updated.category, "Work");
    runner.assertEquals(JSON.stringify(updated.tags), JSON.stringify(["refactor"]));
  });

  runner.test("Integration: clearCompleted keeps metadata on active tasks", () => {
    clearAllTasks();

    const active = addTask("Active", { category: "Work", tags: ["keep"] });
    const done = addTask("Done", { category: "Work", tags: ["drop"] });

    toggleTask(done.id);
    clearCompleted();

    const remaining = getTasks();
    runner.assertEquals(remaining.length, 1);
    runner.assertEquals(remaining[0].id, active.id);
    runner.assertEquals(remaining[0].category, "Work");
    runner.assertEquals(JSON.stringify(remaining[0].tags), JSON.stringify(["keep"]));
    runner.assertTrue(getTasksByTag("drop").length === 0);
  });

  runner.test("Integration: incremental tag edits through full workflow", () => {
    clearAllTasks();

    const task = addTask("Launch feature");
    setTaskCategory(task.id, "Product");
    addTaskTags(task.id, "launch", "beta");
    setTaskTags(task.id, ["launch", "ga"]);
    removeTaskTag(task.id, "launch");

    const finalTask = getTasks().find((item) => item.id === task.id);
    runner.assertEquals(finalTask.category, "Product");
    runner.assertEquals(JSON.stringify(finalTask.tags), JSON.stringify(["ga"]));
    runner.assertEquals(getTasksByTag("beta").length, 0);
    runner.assertEquals(getTasksByTag("ga").length, 1);
  });
}
