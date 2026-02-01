/**
 * Elementos de UI - Componentes Básicos
 * 
 * Componentes reutilizáveis para construção de itens de tarefa:
 * - Checkbox com estado
 * - Texto da tarefa
 * - Botão de opções
 * - Handle de arrastar
 */

import { toggleTask } from "../todo.js";
import { t } from "../i18n/index.js";
import { createCheckIcon, createOptionsIcon, createDragHandleIcon } from "./ui-icons.js";

/**
 * Cria o componente de checkbox para uma tarefa
 * @param {Object} task - Objeto da tarefa
 * @param {string} filter - Filtro atual aplicado
 * @param {Function} onRender - Callback para re-renderizar
 * @returns {HTMLElement} Elemento do container da checkbox
 */
export const createCheckbox = (task, filter, onRender) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("todo-item__checkbox-container");

  const checkboxInnerContainer = document.createElement("div");
  checkboxInnerContainer.classList.add("todo-item__checkbox-inner-container");

  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.classList.add("todo-item__checkbox-wrapper");

  const checkboxLayer = document.createElement("div");
  checkboxLayer.classList.add("todo-item__checkbox-layer");
  checkboxLayer.append(createCheckIcon());

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-item__checkbox");
  checkbox.setAttribute("aria-label", t("ariaMarkCompleted", { text: task.text }));
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    toggleTask(task.id);
    onRender(filter);
  });

  checkboxWrapper.append(checkbox, checkboxLayer);
  checkboxInnerContainer.append(checkboxWrapper);
  checkboxContainer.append(checkboxInnerContainer);

  return checkboxContainer;
};

/**
 * Cria o elemento de texto da tarefa
 * @param {Object} task - Objeto da tarefa
 * @param {string} filter - Filtro atual aplicado
 * @param {Function} onRender - Callback para re-renderizar
 * @returns {HTMLElement} Elemento span com o texto da tarefa
 */
export const createTaskText = (task, filter, onRender) => {
  const text = document.createElement("span");
  text.classList.add("todo-item__text");
  text.textContent = task.text;
  text.addEventListener("click", () => {
    toggleTask(task.id);
    onRender(filter);
  });
  return text;
};

/**
 * Cria o botão de opções (três pontos) para uma tarefa
 * @param {Object} task - Objeto da tarefa
 * @param {string} filter - Filtro atual aplicado
 * @param {Function} onMenuToggle - Callback para abrir/fechar menu
 * @returns {HTMLElement} Elemento do botão de opções
 */
export const createOptionsButton = (task, filter, onMenuToggle) => {
  const optionsBtn = document.createElement("button");
  optionsBtn.classList.add("todo-item__options-btn");
  optionsBtn.setAttribute("aria-label", t("ariaTaskOptions"));
  optionsBtn.setAttribute("aria-haspopup", "true");
  optionsBtn.setAttribute("aria-expanded", "false");
  optionsBtn.append(createOptionsIcon());

  optionsBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    onMenuToggle(task, filter, optionsBtn);
  });

  return optionsBtn;
};

/**
 * Cria o elemento de arrasto (drag handle) para uma tarefa
 * @returns {HTMLElement} Elemento do drag handle
 */
export const createDragHandle = () => {
  const handle = document.createElement("div");
  handle.classList.add("todo-item__drag-handle");
  handle.setAttribute("aria-label", t("ariaDragReorder"));
  handle.append(createDragHandleIcon());
  return handle;
};
