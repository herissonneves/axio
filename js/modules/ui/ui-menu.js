/**
 * Menu de Opções da Tarefa
 * 
 * Gerencia o menu suspenso com opções de editar/excluir.
 * Inclui controle de estado, posicionamento e fechamento automático.
 */

import { t } from "../i18n.js";
import { createEditIcon, createDeleteIcon } from "./ui-icons.js";

// Estado do menu
let openMenu = null;
let openMenuButton = null;

/**
 * Fecha qualquer menu aberto
 */
export const closeMenu = () => {
  if (openMenu) {
    openMenu.remove();
    openMenu = null;
  }
  if (openMenuButton) {
    openMenuButton.setAttribute("aria-expanded", "false");
    openMenuButton = null;
  }
};

/**
 * Fecha o menu ao clicar fora dele
 * @param {Event} event - Evento de clique
 */
const handleClickOutside = (event) => {
  if (openMenu && !openMenu.contains(event.target) && !event.target.closest(".todo-item__options-btn")) {
    closeMenu();
    document.removeEventListener("click", handleClickOutside);
  }
};

/**
 * Cria o menu suspenso com opções da tarefa (editar/excluir)
 * @param {Object} task - Objeto da tarefa
 * @param {string} filter - Filtro atual aplicado
 * @param {HTMLElement} buttonElement - Elemento do botão que abriu o menu
 * @param {Function} onEdit - Callback para editar tarefa
 * @param {Function} onDelete - Callback para excluir tarefa
 * @returns {HTMLElement} Elemento do menu criado
 */
export const createOptionsMenu = (task, filter, buttonElement, onEdit, onDelete) => {
  // Fechar qualquer menu existente
  closeMenu();

  const menu = document.createElement("div");
  menu.classList.add("todo-menu");
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", t("ariaTaskOptionsMenu"));

  // Opção de editar
  const editItem = document.createElement("button");
  editItem.classList.add("todo-menu__item");
  editItem.setAttribute("role", "menuitem");
  editItem.setAttribute("aria-label", t("ariaEditTask"));
  editItem.append(createEditIcon());
  const editText = document.createElement("span");
  editText.classList.add("todo-menu__text");
  editText.textContent = t("edit");
  editItem.append(editText);

  editItem.addEventListener("click", () => {
    closeMenu();
    onEdit(task, filter);
  });

  // Opção de excluir
  const deleteItem = document.createElement("button");
  deleteItem.classList.add("todo-menu__item");
  deleteItem.setAttribute("role", "menuitem");
  deleteItem.setAttribute("aria-label", t("ariaDeleteTask"));
  deleteItem.append(createDeleteIcon());
  const deleteText = document.createElement("span");
  deleteText.classList.add("todo-menu__text");
  deleteText.textContent = t("delete");
  deleteItem.append(deleteText);

  deleteItem.addEventListener("click", () => {
    closeMenu();
    onDelete(task, filter);
  });

  menu.append(editItem, deleteItem);

  // Posicionar menu
  const rect = buttonElement.getBoundingClientRect();
  menu.style.position = "fixed";

  // Calcular posição para evitar sair da tela
  const menuHeight = 120; // Approximate height
  const menuWidth = 160; // Approximate width
  const spacing = 4;

  let top = rect.bottom + spacing;
  let right = window.innerWidth - rect.right;

  // Ajustar se o menu ficaria abaixo do viewport
  if (top + menuHeight > window.innerHeight) {
    top = rect.top - menuHeight - spacing;
  }

  // Ajustar se o menu ficaria fora da borda direita
  if (right + menuWidth > window.innerWidth) {
    right = window.innerWidth - rect.left;
  }

  menu.style.top = `${top}px`;
  menu.style.right = `${right}px`;

  document.body.append(menu);
  openMenu = menu;
  openMenuButton = buttonElement;

  // Fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);

  return menu;
};

/**
 * Alterna o estado do menu (abre ou fecha)
 * @param {Object} task - Objeto da tarefa
 * @param {string} filter - Filtro atual aplicado
 * @param {HTMLElement} buttonElement - Elemento do botão
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para excluir
 */
export const toggleMenu = (task, filter, buttonElement, onEdit, onDelete) => {
  const isOpen = openMenu && openMenu.parentElement;

  if (isOpen) {
    closeMenu();
    buttonElement.setAttribute("aria-expanded", "false");
  } else {
    createOptionsMenu(task, filter, buttonElement, onEdit, onDelete);
    buttonElement.setAttribute("aria-expanded", "true");
  }
};
