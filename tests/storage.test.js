/**
 * Tests for storage module
 */

import { loadTasks, saveTasks } from "../js/modules/storage.js";

export function runStorageTests(runner) {
  runner.category("Testes Unitários - Storage");
  runner.test("loadTasks should return empty array when localStorage is empty", () => {
    localStorage.clear();
    const tasks = loadTasks();
    runner.assertEquals(tasks, []);
  });

  runner.test("loadTasks should return tasks from localStorage", () => {
    const testTasks = [
      { id: "1", text: "Test task", completed: false },
      { id: "2", text: "Another task", completed: true },
    ];
    localStorage.setItem("tasks", JSON.stringify(testTasks));
    const tasks = loadTasks();
    runner.assertEquals(tasks, testTasks);
  });

  runner.test("loadTasks should return empty array on invalid JSON", () => {
    localStorage.setItem("tasks", "invalid json");
    const tasks = loadTasks();
    runner.assertEquals(tasks, []);
  });

  runner.test("saveTasks should save tasks to localStorage", () => {
    const testTasks = [
      { id: "1", text: "Test task", completed: false },
    ];
    saveTasks(testTasks);
    const saved = JSON.parse(localStorage.getItem("tasks"));
    runner.assertEquals(saved, testTasks);
  });

  runner.test("saveTasks should overwrite existing tasks", () => {
    const initialTasks = [{ id: "1", text: "Initial", completed: false }];
    const newTasks = [{ id: "2", text: "New", completed: true }];

    saveTasks(initialTasks);
    saveTasks(newTasks);

    const saved = JSON.parse(localStorage.getItem("tasks"));
    runner.assertEquals(saved, newTasks);
  });

  runner.test("loadTasks should handle null from localStorage", () => {
    localStorage.removeItem("tasks");
    const tasks = loadTasks();
    runner.assertEquals(tasks, []);
  });
}
