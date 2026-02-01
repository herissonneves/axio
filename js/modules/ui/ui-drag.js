/**
 * Sistema de Drag and Drop
 * 
 * Gerencia funcionalidades de arrastar e soltar para reordenação de tarefas:
 * - Estado de arrasto
 * - Mapeamento de índices (visível ↔ original)
 * - Event handlers de drag
 * - Feedback visual durante arrasto
 */

import { getTasks, reorderTasks } from "../todo.js";

// Filtros para tarefas
const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

// Estado do arrastar e soltar (drag-and-drop)
let draggedItem = null;
let draggedIndex = -1;

/**
 * Obtém o índice de um elemento de tarefa na lista visível
 * @param {HTMLElement} element - Elemento da tarefa
 * @param {HTMLElement} listElement - Elemento da lista
 * @returns {number} Índice do elemento
 */
export const getTaskIndex = (element, listElement) => {
  const items = Array.from(listElement.querySelectorAll(".todo-item__container"));
  return items.indexOf(element);
};

/**
 * Mapeia o índice visível para o índice original no array de tarefas
 * @param {number} visibleIndex - Índice na lista filtrada
 * @param {string} filter - Filtro aplicado
 * @returns {number} Índice no array original de tarefas
 */
export const getOriginalIndex = (visibleIndex, filter) => {
  const tasks = getTasks();
  const predicate = FILTERS[filter] ?? FILTERS.all;
  const visibleTasks = tasks.filter(predicate);

  if (visibleIndex < 0 || visibleIndex >= visibleTasks.length) return -1;

  const visibleTask = visibleTasks[visibleIndex];
  return tasks.findIndex((t) => t.id === visibleTask.id);
};

/**
 * Manipula o evento de início de arrasto
 * @param {DragEvent} event - Evento de drag start
 * @param {HTMLElement} listElement - Elemento da lista
 */
export const handleDragStart = (event, listElement) => {
  const li = event.target.closest(".todo-item__container");
  if (!li) return;

  draggedItem = li;
  draggedIndex = getTaskIndex(li, listElement);

  li.classList.add("todo-item--dragging");

  // Definir dados e efeito do arrasto
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", li.dataset.id);

  // Criar uma imagem de arrasto personalizada para melhor feedback visual
  requestAnimationFrame(() => {
    li.classList.add("todo-item--drag-ghost");
  });
};

/**
 * Manipula o evento de fim de arrasto
 * @param {DragEvent} event - Evento de drag end
 * @param {HTMLElement} listElement - Elemento da lista
 */
export const handleDragEnd = (event, listElement) => {
  const li = event.target.closest(".todo-item__container");
  if (li) {
    li.classList.remove("todo-item--dragging", "todo-item--drag-ghost");
  }

  // Limpar todos os estados de drag-over
  listElement.querySelectorAll(".todo-item--drag-over").forEach((el) => {
    el.classList.remove("todo-item--drag-over");
  });

  draggedItem = null;
  draggedIndex = -1;
};

/**
 * Manipula o evento de arrastar sobre um elemento
 * @param {DragEvent} event - Evento de drag over
 * @param {HTMLElement} listElement - Elemento da lista
 */
export const handleDragOver = (event, listElement) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const li = event.target.closest(".todo-item__container");
  if (!li || li === draggedItem) return;

  // Limpar estados anteriores de drag-over
  listElement.querySelectorAll(".todo-item--drag-over").forEach((el) => {
    if (el !== li) el.classList.remove("todo-item--drag-over");
  });

  li.classList.add("todo-item--drag-over");
};

/**
 * Manipula o evento de sair do elemento durante o arrasto
 * @param {DragEvent} event - Evento de drag leave
 */
export const handleDragLeave = (event) => {
  const li = event.target.closest(".todo-item__container");
  if (!li) return;

  // Remover apenas se estamos saindo completamente do elemento
  const relatedTarget = event.relatedTarget?.closest?.(".todo-item__container");
  if (relatedTarget !== li) {
    li.classList.remove("todo-item--drag-over");
  }
};

/**
 * Manipula o evento de soltar o elemento arrastado
 * @param {DragEvent} event - Evento de drop
 * @param {HTMLElement} listElement - Elemento da lista
 * @param {string} currentFilter - Filtro atual aplicado
 * @param {Function} onRender - Callback para re-renderizar
 */
export const handleDrop = (event, listElement, currentFilter, onRender) => {
  event.preventDefault();

  const li = event.target.closest(".todo-item__container");
  if (!li || li === draggedItem) return;

  const targetIndex = getTaskIndex(li, listElement);
  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return;

  // Mapear índices visíveis para índices originais
  const fromOriginal = getOriginalIndex(draggedIndex, currentFilter);
  const toOriginal = getOriginalIndex(targetIndex, currentFilter);

  if (fromOriginal !== -1 && toOriginal !== -1) {
    reorderTasks(fromOriginal, toOriginal);
    onRender(currentFilter);
  }

  li.classList.remove("todo-item--drag-over");
};

/**
 * Cria funções de event handlers vinculadas ao contexto
 * @param {HTMLElement} listElement - Elemento da lista
 * @param {Function} getCurrentFilter - Função para obter filtro atual
 * @param {Function} onRender - Callback para re-renderizar
 * @returns {Object} Objeto com handlers vinculados
 */
export const createDragHandlers = (listElement, getCurrentFilter, onRender) => {
  return {
    onDragStart: (event) => handleDragStart(event, listElement),
    onDragEnd: (event) => handleDragEnd(event, listElement),
    onDragOver: (event) => handleDragOver(event, listElement),
    onDragLeave: (event) => handleDragLeave(event),
    onDrop: (event) => handleDrop(event, listElement, getCurrentFilter(), onRender),
  };
};
