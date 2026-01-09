/**
 * Módulo de Gerenciamento de Tarefas (Todo)
 * 
 * Gerencia o estado das tarefas da aplicação, incluindo:
 * - Criação, leitura, atualização e remoção de tarefas (CRUD)
 * - Alternância de estado de conclusão
 * - Reordenação de tarefas via arrastar e soltar
 * - Limpeza de tarefas concluídas ou todas as tarefas
 * - Persistência automática no localStorage
 */

import { loadTasks, saveTasks } from "./storage.js";

// Estado das tarefas carregado do localStorage
let tasks = loadTasks();

/**
 * Função auxiliar para atualizar o estado das tarefas e persistir
 * 
 * @param {Function} updater - Função que recebe as tarefas atuais e retorna as tarefas atualizadas
 * @returns {Array} Array de tarefas atualizado
 */
const persist = (updater) => {
  tasks = updater(tasks);
  saveTasks(tasks);
  return tasks;
};

/**
 * Retorna uma cópia superficial das tarefas para prevenir mutação externa
 * 
 * @returns {Array} Cópia do array de tarefas
 */
export const getTasks = () => [...tasks];

/**
 * Cria e armazena uma nova tarefa
 * 
 * @param {string} text - Texto da tarefa
 * @returns {Object} A tarefa recém-criada
 */
export const addTask = (text) =>
  persist((current) => [
    ...current,
    { id: crypto.randomUUID?.() ?? Date.now(), text, completed: false },
  ]).at(-1);

/**
 * Remove uma tarefa por ID
 * 
 * @param {string|number} id - ID da tarefa a ser removida
 */
export const removeTask = (id) => {
  persist((current) => current.filter((task) => task.id !== id));
};

/**
 * Alterna o estado de conclusão de uma tarefa por ID
 * 
 * @param {string|number} id - ID da tarefa
 */
export const toggleTask = (id) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

/**
 * Atualiza o texto de uma tarefa por ID
 * 
 * @param {string|number} id - ID da tarefa
 * @param {string} text - Novo texto da tarefa
 */
export const updateTask = (id, text) => {
  persist((current) =>
    current.map((task) =>
      task.id === id ? { ...task, text: text.trim() } : task
    )
  );
};

/**
 * Remove todas as tarefas concluídas
 */
export const clearCompleted = () => {
  persist((current) => current.filter((task) => !task.completed));
};

/**
 * Reordena as tarefas movendo uma tarefa de uma posição para outra
 * 
 * @param {number} fromIndex - Índice de origem
 * @param {number} toIndex - Índice de destino
 */
export const reorderTasks = (fromIndex, toIndex) => {
  persist((current) => {
    const updated = [...current];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  });
};

/**
 * Remove todas as tarefas
 */
export const clearAll = () => {
  persist(() => []);
};
