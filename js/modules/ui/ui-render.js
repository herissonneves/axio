/**
 * Renderização da Lista de Tarefas
 * 
 * Módulo central de renderização que:
 * - Constrói itens de tarefa completos
 * - Aplica filtros (todas/ativas/concluídas)
 * - Orquestra todos os componentes
 * - Gerencia o DOM da lista
 */

import { getTasks } from "../todo.js";
import { createCheckbox, createTaskText, createOptionsButton, createDragHandle } from "./ui-elements.js";
import { toggleMenu, closeMenu } from "./ui-menu.js";
import { showEditDialog, showDeleteDialog } from "./ui-dialogs.js";
import { createDragHandlers } from "./ui-drag.js";

// Filtros para tarefas
const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

// Estado do filtro atual
let currentFilter = "all";

// Elemento da lista
const listElement = document.getElementById("todo-list");

/**
 * Obtém o filtro atual aplicado
 * @returns {string} Filtro atual
 */
const getCurrentFilter = () => currentFilter;

/**
 * Constrói um item de tarefa completo com todos os elementos
 * @param {Object} task - Objeto da tarefa
 * @param {string} filter - Filtro atual aplicado
 * @param {Function} onRender - Callback para re-renderizar
 * @param {Object} dragHandlers - Handlers de drag-and-drop
 * @returns {HTMLElement} Elemento li da tarefa
 */
const buildTodoItem = (task, filter, onRender, dragHandlers) => {
  const li = document.createElement("li");
  li.classList.add("todo-item__container");
  li.dataset.id = String(task.id);
  li.setAttribute("draggable", "true");

  if (task.completed) {
    li.classList.add("todo-item--completed");
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("todo-item");

  // Criar callbacks para menu
  const handleMenuToggle = (task, filter, buttonElement) => {
    toggleMenu(task, filter, buttonElement, showEditDialog, showDeleteDialog);
  };

  wrapper.append(
    createDragHandle(),
    createCheckbox(task, filter, onRender),
    createTaskText(task, filter, onRender),
    createOptionsButton(task, filter, handleMenuToggle)
  );

  // Adicionar event listeners de arrasto
  li.addEventListener("dragstart", dragHandlers.onDragStart);
  li.addEventListener("dragend", dragHandlers.onDragEnd);
  li.addEventListener("dragover", dragHandlers.onDragOver);
  li.addEventListener("dragleave", dragHandlers.onDragLeave);
  li.addEventListener("drop", dragHandlers.onDrop);

  li.append(wrapper);
  return li;
};

/**
 * Renderiza as tarefas no elemento da lista usando o filtro fornecido
 * 
 * Esta é a função principal de renderização que:
 * - Filtra as tarefas de acordo com o filtro especificado
 * - Cria os elementos DOM para cada tarefa
 * - Atualiza a lista na interface
 * 
 * @param {string} filter - Filtro a ser aplicado: "all", "active" ou "completed"
 */
export function renderTasks(filter = "all") {
  if (!listElement) return;

  // Fechar qualquer menu aberto ao re-renderizar
  closeMenu();

  // Armazenar filtro atual para reordenação por arrastar e soltar
  currentFilter = filter;

  const predicate = FILTERS[filter] ?? FILTERS.all;

  // Criar handlers de drag vinculados ao contexto atual
  const dragHandlers = createDragHandlers(listElement, getCurrentFilter, renderTasks);

  const fragment = document.createDocumentFragment();
  getTasks()
    .filter(predicate)
    .forEach((task) => fragment.append(buildTodoItem(task, filter, renderTasks, dragHandlers)));

  listElement.replaceChildren(fragment);
}
