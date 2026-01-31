/**
 * Ícones SVG da Interface
 * 
 * Factory de ícones SVG reutilizáveis para a interface do usuário.
 * Todos os ícones são criados dinamicamente usando o namespace SVG.
 */

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Cria um elemento SVG com atributos especificados
 * @param {Object} attrs - Atributos a serem aplicados ao SVG
 * @returns {SVGElement} Elemento SVG criado
 */
const createSvg = (attrs) => {
  const svg = document.createElementNS(SVG_NS, "svg");
  Object.entries(attrs).forEach(([key, value]) => svg.setAttribute(key, value));
  return svg;
};

/**
 * Cria o ícone de check para a checkbox de tarefa
 * @returns {SVGElement} Ícone de check SVG
 */
export const createCheckIcon = () => {
  const icon = createSvg({
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    class: "todo-item__checkbox-icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", "M4 9.4L0 5.4L1.4 4L4 6.6L10.6 0L12 1.4L4 9.4Z");
  path.classList.add("todo-item__checkbox-check");
  icon.append(path);
  return icon;
};

/**
 * Cria o ícone de três pontos para o menu de opções
 * @returns {SVGElement} Ícone de opções SVG
 */
export const createOptionsIcon = () => {
  const svg = createSvg({
    height: "16",
    width: "4",
    viewBox: "0 0 4 16",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z"
  );
  svg.append(path);
  return svg;
};

/**
 * Cria o ícone de arrastar (seis pontos)
 * @returns {SVGElement} Ícone de arrastar SVG
 */
export const createDragHandleIcon = () => {
  const svg = createSvg({
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    class: "todo-item__drag-icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  );
  svg.append(path);
  return svg;
};

/**
 * Cria o ícone de editar
 * @returns {SVGElement} Ícone de editar SVG
 */
export const createEditIcon = () => {
  const svg = createSvg({
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    class: "todo-menu__icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
  );
  svg.append(path);
  return svg;
};

/**
 * Cria o ícone de excluir
 * @returns {SVGElement} Ícone de excluir SVG
 */
export const createDeleteIcon = () => {
  const svg = createSvg({
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    class: "todo-menu__icon",
  });
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  );
  svg.append(path);
  return svg;
};
