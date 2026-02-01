/**
 * Módulo UI - Interface do Usuário
 * 
 * Entry point centralizado para todos os componentes de UI.
 * Exporta funcionalidades de:
 * - Ícones SVG
 * - Elementos de tarefa
 * - Menu de opções
 * - Diálogos modais
 * - Drag and drop
 * - Renderização
 */

// Ícones
export { 
  createCheckIcon, 
  createOptionsIcon, 
  createDragHandleIcon, 
  createEditIcon, 
  createDeleteIcon 
} from "./ui-icons.js";

// Elementos
export { 
  createCheckbox, 
  createTaskText, 
  createOptionsButton, 
  createDragHandle 
} from "./ui-elements.js";

// Menu
export { 
  createOptionsMenu, 
  toggleMenu, 
  closeMenu 
} from "./ui-menu.js";

// Diálogos
export { 
  showEditDialog, 
  showDeleteDialog 
} from "./ui-dialogs.js";

// Drag and Drop
export { 
  getTaskIndex, 
  getOriginalIndex, 
  handleDragStart, 
  handleDragEnd, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop,
  createDragHandlers 
} from "./ui-drag.js";

// Renderização (export principal)
export { renderTasks } from "./ui-render.js";
