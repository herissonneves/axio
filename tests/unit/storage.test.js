/**
 * Testes para o Módulo de Armazenamento (Storage)
 * 
 * Testa as funcionalidades de persistência de dados:
 * - Carregar tarefas do localStorage
 * - Salvar tarefas no localStorage
 * - Tratamento de erros e dados inválidos
 * - Retorno de valores padrão quando não há dados
 */

import { loadTasks, saveTasks } from "../../js/modules/storage.js";

/**
 * Registra todos os testes do módulo de armazenamento
 * @param {TestRunner} runner - Instância do executor de testes
 */
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
