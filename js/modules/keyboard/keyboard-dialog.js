/**
 * Gerenciamento do Diálogo de Atalhos
 * 
 * Funções para exibir e gerenciar o diálogo de ajuda de atalhos:
 * - Exibição do diálogo
 * - Fechamento do diálogo
 * - Gerenciamento de eventos
 */

import { createDialogStructure } from "./keyboard-dom.js";

/**
 * Exibe o diálogo de ajuda com todos os atalhos de teclado disponíveis
 */
export const showKeyboardShortcutsDialog = () => {
  // Prevenir múltiplos diálogos
  if (document.querySelector('.shortcuts-dialog')) {
    return;
  }

  const closeDialog = () => {
    dialog.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleEscape);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeDialog();
    }
  };

  const { dialog, closeBtn } = createDialogStructure(closeDialog);

  document.body.append(dialog);
  document.body.style.overflow = "hidden";
  closeBtn.focus();

  document.addEventListener("keydown", handleEscape);
};
