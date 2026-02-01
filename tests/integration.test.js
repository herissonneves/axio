/**
 * Testes de Integração para Fluxos Completos da Aplicação
 * 
 * Testa a integração entre módulos e fluxos de usuário completos:
 * - Fluxo completo de adicionar, completar e remover tarefas
 * - Múltiplas tarefas com filtros e limpeza
 * - Edição de tarefas
 * - Reordenação e persistência
 * - Integração entre Storage e Todo
 * - Integração entre i18n e Todo
 * - Casos extremos e operações rápidas
 * - Integridade dos dados
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
import { saveTasks, loadTasks } from "../js/modules/storage.js";
import { setLanguage, getLanguage, t, initI18n } from "../js/modules/i18n/index.js";

/**
 * Registra todos os testes de integração da aplicação
 * @param {TestRunner} runner - Instância do executor de testes
 */
export function runIntegrationTests(runner) {
  runner.category("Testes de Integração");

  // Função auxiliar para limpar todas as tarefas
  const clearAllTasks = () => {
    const allTasks = getTasks();
    allTasks.forEach(task => removeTask(task.id));
  };

  runner.test("Complete flow: Add, complete, and remove task", () => {
    clearAllTasks();

    // Add a task
    const task = addTask("Integration test task");
    runner.assertTrue(task !== undefined);
    runner.assertEquals(task.text, "Integration test task");
    runner.assertFalse(task.completed);

    // Verify it's in the list
    const tasks = getTasks();
    const foundTask = tasks.find(t => t.id === task.id);
    runner.assertTrue(foundTask !== undefined);

    // Complete the task
    toggleTask(task.id);
    const completedTasks = getTasks();
    const completedTask = completedTasks.find(t => t.id === task.id);
    runner.assertTrue(completedTask !== undefined);
    runner.assertTrue(completedTask.completed);

    // Remove the task
    removeTask(task.id);
    const finalTasks = getTasks();
    const removedTask = finalTasks.find(t => t.id === task.id);
    runner.assertTrue(removedTask === undefined);
  });

  runner.test("Complete flow: Add multiple tasks, filter, and clear", () => {
    clearAllTasks();

    // Add multiple tasks
    const task1 = addTask("Task 1");
    const task2 = addTask("Task 2");
    const task3 = addTask("Task 3");

    // Complete some tasks
    toggleTask(task1.id);
    toggleTask(task3.id);

    // Verify all tasks exist
    let tasks = getTasks();
    runner.assertTrue(tasks.length >= 3);

    // Clear completed tasks
    clearCompleted();
    tasks = getTasks();

    // Verify only incomplete task remains
    const remainingTask = tasks.find(t => t.id === task2.id);
    runner.assertTrue(remainingTask !== undefined);
    runner.assertFalse(remainingTask.completed);

    const completedTask1 = tasks.find(t => t.id === task1.id);
    const completedTask3 = tasks.find(t => t.id === task3.id);
    runner.assertTrue(completedTask1 === undefined);
    runner.assertTrue(completedTask3 === undefined);
  });

  runner.test("Complete flow: Add, edit, and verify task", () => {
    clearAllTasks();

    // Add a task
    const task = addTask("Original text");
    runner.assertEquals(task.text, "Original text");

    // Edit the task
    updateTask(task.id, "Updated text");
    const tasks = getTasks();
    const updatedTask = tasks.find(t => t.id === task.id);
    runner.assertTrue(updatedTask !== undefined);
    runner.assertEquals(updatedTask.text, "Updated text");

    // Verify it persists in localStorage
    const saved = JSON.parse(localStorage.getItem("tasks"));
    const savedTask = saved.find(t => t.id === task.id);
    runner.assertTrue(savedTask !== undefined);
    runner.assertEquals(savedTask.text, "Updated text");
  });

  runner.test("Complete flow: Reorder tasks and verify persistence", () => {
    clearAllTasks();

    // Add tasks
    const task1 = addTask("First task");
    const task2 = addTask("Second task");
    const task3 = addTask("Third task");

    const tasksBefore = getTasks();
    const testTasks = tasksBefore.filter(t =>
      [task1.id, task2.id, task3.id].includes(t.id)
    );

    // Get initial order
    const initialOrder = testTasks.map(t => t.id);
    runner.assertEquals(initialOrder[0], task1.id);

    // Reorder: move first to last
    const fromIndex = testTasks.findIndex(t => t.id === task1.id);
    const toIndex = testTasks.findIndex(t => t.id === task3.id);

    if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
      reorderTasks(fromIndex, toIndex);

      // Verify new order
      const tasksAfter = getTasks();
      const reorderedTasks = tasksAfter.filter(t =>
        [task1.id, task2.id, task3.id].includes(t.id)
      );

      // First task should now be at the end
      runner.assertEquals(reorderedTasks[reorderedTasks.length - 1].id, task1.id);

      // Verify persistence
      const saved = JSON.parse(localStorage.getItem("tasks"));
      const savedReordered = saved.filter(t =>
        [task1.id, task2.id, task3.id].includes(t.id)
      );
      runner.assertEquals(savedReordered[savedReordered.length - 1].id, task1.id);
    }
  });

  runner.test("Complete flow: Clear all and verify empty state", () => {
    clearAllTasks();

    // Add multiple tasks
    addTask("Task 1");
    addTask("Task 2");
    addTask("Task 3");

    // Verify tasks exist
    let tasks = getTasks();
    runner.assertTrue(tasks.length >= 3);

    // Clear all
    clearAll();

    // Verify empty
    tasks = getTasks();
    runner.assertEquals(tasks.length, 0);

    // Verify localStorage is empty
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    runner.assertEquals(saved.length, 0);
  });

  runner.test("Integration: Storage and Todo modules work together", () => {
    clearAllTasks();

    // Add task via todo module
    const task = addTask("Storage integration test");

    // Verify it's saved in storage
    const saved = loadTasks();
    const savedTask = saved.find(t => t.id === task.id);
    runner.assertTrue(savedTask !== undefined);
    runner.assertEquals(savedTask.text, "Storage integration test");

    // Modify via storage directly
    const modifiedTasks = saved.map(t =>
      t.id === task.id ? { ...t, completed: true } : t
    );
    saveTasks(modifiedTasks);

    // Reload and verify
    const reloaded = loadTasks();
    const reloadedTask = reloaded.find(t => t.id === task.id);
    runner.assertTrue(reloadedTask !== undefined);
    runner.assertTrue(reloadedTask.completed);
  });

  runner.test("Integration: i18n and todo modules work together", () => {
    if (typeof document === "undefined") {
      runner.assertTrue(true); // Skip in non-browser environment
      return;
    }

    // Set language to English
    setLanguage("en");
    runner.assertEquals(getLanguage(), "en");

    // Verify translations work
    const titleEn = t("pageTitle");
    runner.assertEquals(titleEn, "Axio");

    const addButtonEn = t("addTaskButton");
    runner.assertEquals(addButtonEn, "Add Task");

    // Set language to Portuguese
    setLanguage("pt");
    runner.assertEquals(getLanguage(), "pt");

    // Verify Portuguese translations
    const titlePt = t("pageTitle");
    runner.assertEquals(titlePt, "Axio");

    const addButtonPt = t("addTaskButton");
    runner.assertEquals(addButtonPt, "Adicionar Tarefa");

    // Verify language persists
    const savedLang = localStorage.getItem("todo-language");
    runner.assertEquals(savedLang, "pt");
  });

  runner.test("Integration: Complete user workflow - Add, filter, complete, clear", () => {
    clearAllTasks();

    // Simulate user adding tasks
    const workTask = addTask("Work on project");
    const homeTask = addTask("Buy groceries");
    const personalTask = addTask("Exercise");

    // Simulate user completing some tasks
    toggleTask(workTask.id);
    toggleTask(personalTask.id);

    // Simulate filtering - get only active tasks
    const allTasks = getTasks();
    const activeTasks = allTasks.filter(t => !t.completed);
    const completedTasks = allTasks.filter(t => t.completed);

    runner.assertTrue(activeTasks.length >= 1);
    runner.assertTrue(completedTasks.length >= 2);

    // Verify active task
    const activeTask = activeTasks.find(t => t.id === homeTask.id);
    runner.assertTrue(activeTask !== undefined);
    runner.assertFalse(activeTask.completed);

    // Simulate user clearing completed
    clearCompleted();
    const finalTasks = getTasks();
    const remainingActive = finalTasks.find(t => t.id === homeTask.id);
    const removedCompleted1 = finalTasks.find(t => t.id === workTask.id);
    const removedCompleted2 = finalTasks.find(t => t.id === personalTask.id);

    runner.assertTrue(remainingActive !== undefined);
    runner.assertTrue(removedCompleted1 === undefined);
    runner.assertTrue(removedCompleted2 === undefined);
  });

  runner.test("Integration: Task operations maintain data integrity", () => {
    clearAllTasks();

    // Add tasks
    const task1 = addTask("Task 1");
    const task2 = addTask("Task 2");

    // Get initial state
    const initialTasks = getTasks();
    const initialCount = initialTasks.length;

    // Perform multiple operations
    toggleTask(task1.id);
    updateTask(task2.id, "Updated Task 2");
    toggleTask(task1.id); // Toggle back

    // Verify final state
    const finalTasks = getTasks();
    runner.assertEquals(finalTasks.length, initialCount);

    // Verify task1 is back to incomplete
    const task1Final = finalTasks.find(t => t.id === task1.id);
    runner.assertTrue(task1Final !== undefined);
    runner.assertFalse(task1Final.completed);

    // Verify task2 was updated
    const task2Final = finalTasks.find(t => t.id === task2.id);
    runner.assertTrue(task2Final !== undefined);
    runner.assertEquals(task2Final.text, "Updated Task 2");

    // Verify localStorage consistency
    const saved = JSON.parse(localStorage.getItem("tasks"));
    runner.assertEquals(saved.length, finalTasks.length);
  });

  runner.test("Integration: Edge cases - Empty operations", () => {
    clearAllTasks();

    // Clear when already empty
    clearAll();
    let tasks = getTasks();
    runner.assertEquals(tasks.length, 0);

    // Clear completed when no completed tasks
    addTask("Active task");
    clearCompleted();
    tasks = getTasks();
    runner.assertTrue(tasks.length >= 1);

    // Remove non-existent task (should not error)
    try {
      removeTask("non-existent-id");
      runner.assertTrue(true); // Should not throw
    } catch (error) {
      runner.assertTrue(false, "Should not throw error for non-existent task");
    }
  });

  runner.test("Integration: Multiple rapid operations maintain consistency", () => {
    clearAllTasks();

    // Rapidly add multiple tasks
    const tasks = [];
    for (let i = 0; i < 5; i++) {
      tasks.push(addTask(`Rapid task ${i}`));
    }

    // Verify all were added
    const allTasks = getTasks();
    runner.assertTrue(allTasks.length >= 5);

    // Rapidly toggle all
    tasks.forEach(task => toggleTask(task.id));

    // Verify all are completed
    const completedTasks = getTasks();
    tasks.forEach(task => {
      const found = completedTasks.find(t => t.id === task.id);
      runner.assertTrue(found !== undefined);
      runner.assertTrue(found.completed);
    });

    // Rapidly remove all
    tasks.forEach(task => removeTask(task.id));

    // Verify all removed
    const finalTasks = getTasks();
    tasks.forEach(task => {
      const found = finalTasks.find(t => t.id === task.id);
      runner.assertTrue(found === undefined);
    });
  });
}
