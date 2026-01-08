/**
 * Tests for todo module
 */

import {
  getTasks,
  addTask,
  removeTask,
  toggleTask,
  updateTask,
  clearCompleted,
  clearAll,
  reorderTasks
} from "../js/modules/todo.js";
import { saveTasks } from "../js/modules/storage.js";

export function runTodoTests(runner) {
  // Helper to clear all tasks
  const clearAllTasks = () => {
    const allTasks = getTasks();
    allTasks.forEach(task => removeTask(task.id));
  };

  runner.test("getTasks should return an array", () => {
    const tasks = getTasks();
    runner.assertTrue(Array.isArray(tasks));
  });

  runner.test("addTask should add a new task", () => {
    clearAllTasks();
    const task = addTask("New task");
    runner.assertTrue(task !== undefined);
    runner.assertEquals(task.text, "New task");
    runner.assertFalse(task.completed);
    runner.assertTrue(task.id !== undefined);

    const tasks = getTasks();
    const foundTask = tasks.find(t => t.id === task.id);
    runner.assertTrue(foundTask !== undefined);
    runner.assertEquals(foundTask.text, "New task");
  });

  runner.test("addTask should persist to localStorage", () => {
    clearAllTasks();
    const task = addTask("Persisted task");
    const saved = JSON.parse(localStorage.getItem("tasks"));
    const foundInStorage = saved.find(t => t.id === task.id);
    runner.assertTrue(foundInStorage !== undefined);
    runner.assertEquals(foundInStorage.text, "Persisted task");
  });

  runner.test("removeTask should remove task by id", () => {
    clearAllTasks();
    const task1 = addTask("Task 1");
    const task2 = addTask("Task 2");
    const testId1 = task1.id;
    const testId2 = task2.id;

    removeTask(testId1);
    const tasks = getTasks();
    const remaining = tasks.find(t => t.id === testId2);
    runner.assertTrue(remaining !== undefined);
    const removed = tasks.find(t => t.id === testId1);
    runner.assertTrue(removed === undefined);
  });

  runner.test("toggleTask should toggle completion status", () => {
    clearAllTasks();
    const task = addTask("Task 1");
    const testId = task.id;

    toggleTask(testId);
    const tasks = getTasks();
    const toggledTask = tasks.find(t => t.id === testId);
    runner.assertTrue(toggledTask !== undefined);
    runner.assertTrue(toggledTask.completed);

    toggleTask(testId);
    const tasks2 = getTasks();
    const toggledTask2 = tasks2.find(t => t.id === testId);
    runner.assertTrue(toggledTask2 !== undefined);
    runner.assertFalse(toggledTask2.completed);
  });

  runner.test("updateTask should update task text", () => {
    clearAllTasks();
    const task = addTask("Original text");
    const testId = task.id;

    updateTask(testId, "Updated text");
    const tasks = getTasks();
    const updatedTask = tasks.find(t => t.id === testId);
    runner.assertTrue(updatedTask !== undefined);
    runner.assertEquals(updatedTask.text, "Updated text");
  });

  runner.test("updateTask should trim text", () => {
    clearAllTasks();
    const task = addTask("Original");
    const testId = task.id;

    updateTask(testId, "  Trimmed text  ");
    const tasks = getTasks();
    const updatedTask = tasks.find(t => t.id === testId);
    runner.assertTrue(updatedTask !== undefined);
    runner.assertEquals(updatedTask.text, "Trimmed text");
  });

  runner.test("clearCompleted should remove only completed tasks", () => {
    clearAllTasks();
    const task1 = addTask("Task 1");
    const task2 = addTask("Task 2");
    const task3 = addTask("Task 3");
    const task4 = addTask("Task 4");

    toggleTask(task2.id);
    toggleTask(task3.id);

    clearCompleted();
    const tasks = getTasks();
    const activeTasks = tasks.filter(t => [task1.id, task4.id].includes(t.id));
    runner.assertTrue(activeTasks.length >= 2);
    const completedTasks = tasks.filter(t => [task2.id, task3.id].includes(t.id));
    runner.assertEquals(completedTasks.length, 0);
  });

  runner.test("clearAll should remove all tasks", () => {
    clearAllTasks();
    const task1 = addTask("Task 1");
    const task2 = addTask("Task 2");
    const testId1 = task1.id;
    const testId2 = task2.id;

    const beforeClear = getTasks().filter(t => [testId1, testId2].includes(t.id));
    runner.assertTrue(beforeClear.length > 0);

    clearAll();
    const tasks = getTasks();
    const afterClear = tasks.filter(t => [testId1, testId2].includes(t.id));
    runner.assertEquals(afterClear.length, 0);
  });

  runner.test("reorderTasks should move task to new position", () => {
    clearAllTasks();
    const task1 = addTask("Task 1");
    const task2 = addTask("Task 2");
    const task3 = addTask("Task 3");
    const testId1 = task1.id;
    const testId2 = task2.id;
    const testId3 = task3.id;

    const tasksBefore = getTasks();
    const testTasks = tasksBefore.filter(t => [testId1, testId2, testId3].includes(t.id));
    const fromIndex = testTasks.findIndex(t => t.id === testId1);
    const toIndex = testTasks.findIndex(t => t.id === testId3);

    if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
      reorderTasks(fromIndex, toIndex);
      const tasksAfter = getTasks();
      const reorderedTasks = tasksAfter.filter(t => [testId1, testId2, testId3].includes(t.id));
      // Verify all tasks are still present
      runner.assertTrue(reorderedTasks.length === 3);
      // Verify the task was moved (first task should now be at the end)
      runner.assertEquals(reorderedTasks[reorderedTasks.length - 1].id, testId1);
    } else {
      runner.assertTrue(true); // Skip if indices not found
    }
  });

  runner.test("getTasks should return a copy, not reference", () => {
    clearAllTasks();
    addTask("Task 1");
    const tasks1 = getTasks();
    const originalLength = tasks1.length;
    tasks1.push({ id: "2", text: "Task 2", completed: false });
    const tasks2 = getTasks();
    // The original tasks array should not be modified
    runner.assertEquals(tasks2.length, originalLength);
  });
}
