/**
 * Gerenciamento de Filtros de Tarefas
 *
 * Gerencia a seleção e visualização de filtros de tarefas.
 */

import { FILTER_MAP, SVG_NS } from "./app-config.js";
import { renderTasks } from "../ui/index.js";

/**
 * Estado atual do filtro
 * @private
 */
let currentFilter = "all";

/**
 * Obtém o filtro atual
 * @returns {string} Filtro atual (all, active ou completed)
 */
export const getCurrentFilter = () => currentFilter;

/**
 * Define o filtro atual
 * @param {string} filter - Novo filtro
 */
export const setCurrentFilter = (filter) => {
  currentFilter = filter;
};

/**
 * Cria o ícone de check para indicar o filtro ativo
 * @returns {SVGElement} Elemento SVG do ícone de check
 */
export const createFilterIcon = () => {
  const icon = document.createElementNS(SVG_NS, "svg");
  icon.setAttribute("width", "13");
  icon.setAttribute("height", "10");
  icon.setAttribute("viewBox", "0 0 13 10");
  icon.classList.add("todo-filters__check-icon");

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M4.275 9.01875L0 4.74375L1.06875 3.675L4.275 6.88125L11.1563 0L12.225 1.06875L4.275 9.01875Z"
  );

  icon.append(path);
  return icon;
};

/**
 * Alterna os estilos do botão de filtro ativo e estados de acessibilidade
 * @param {NodeList} filterButtons - Lista de botões de filtro
 * @param {string} activeButtonId - ID do botão de filtro ativo
 */
export const setActiveFilter = (filterButtons, activeButtonId) => {
  filterButtons.forEach((btn) => {
    const isActive = btn.id === activeButtonId;
    btn.classList.toggle("todo-filters__button--active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));

    btn.querySelector(".todo-filters__button-icon-wrapper")?.remove();

    if (isActive) {
      const iconWrapper = document.createElement("div");
      iconWrapper.classList.add("todo-filters__button-icon-wrapper");
      iconWrapper.append(createFilterIcon());
      btn.prepend(iconWrapper);
    }
  });
};

/**
 * Manipula o clique em um botão de filtro
 * @param {NodeList} filterButtons - Lista de botões de filtro
 * @param {Event} event - Evento de clique
 * @returns {string} Filtro aplicado
 */
export const handleFilterClick = (filterButtons, event) => {
  const { id } = event.currentTarget;
  const filter = FILTER_MAP[id];
  if (!filter) return currentFilter;

  currentFilter = filter;
  setActiveFilter(filterButtons, id);
  renderTasks(filter);

  return filter;
};

/**
 * Aplica um filtro específico
 * @param {NodeList} filterButtons - Lista de botões de filtro
 * @param {string} filter - Filtro a aplicar (all, active ou completed)
 * @param {string} buttonId - ID do botão correspondente
 */
export const applyFilter = (filterButtons, filter, buttonId) => {
  currentFilter = filter;
  setActiveFilter(filterButtons, buttonId);
  renderTasks(filter);
};
