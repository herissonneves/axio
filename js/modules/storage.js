/**
 * Módulo de Armazenamento (Storage)
 * 
 * Gerencia a persistência de tarefas no localStorage do navegador.
 * Fornece funções para carregar e salvar tarefas de forma segura,
 * com tratamento de erros para evitar falhas de parsing.
 */

/**
 * Carrega as tarefas do localStorage
 * 
 * @returns {Array} Array de tarefas ou array vazio em caso de falha
 */
export function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.warn("Falha ao analisar tarefas do storage, resetando armazenamento.", error);
    return [];
  }
}

/**
 * Persiste as tarefas no localStorage
 * 
 * @param {Array} tasks - Array de tarefas a serem salvas
 */
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
