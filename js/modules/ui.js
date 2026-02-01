/**
 * Módulo de Interface do Usuário (UI) - LEGACY WRAPPER
 * 
 * Este arquivo atua como um wrapper de compatibilidade para a nova
 * arquitetura modular do módulo UI.
 * 
 * NOVA ESTRUTURA MODULAR:
 * - ui/ui-icons.js      - Ícones SVG (check, options, drag, edit, delete)
 * - ui/ui-elements.js   - Componentes básicos (checkbox, text, buttons, drag handle)
 * - ui/ui-menu.js       - Menu de opções (editar/excluir)
 * - ui/ui-dialogs.js    - Diálogos modais (edição e exclusão)
 * - ui/ui-drag.js       - Sistema de drag-and-drop
 * - ui/ui-render.js     - Renderização principal
 * - ui/index.js         - Entry point centralizado
 * 
 * Para manter compatibilidade com código existente, este arquivo
 * re-exporta todas as funcionalidades do novo módulo modular.
 */

// Re-exportar tudo do novo módulo modular
export { renderTasks } from "./ui/index.js";
