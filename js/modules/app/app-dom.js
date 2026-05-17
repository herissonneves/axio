/**
 * DOM references for the main application shell.
 */

/**
 * @typedef {Object} AppElements
 * @property {HTMLButtonElement | null} themeToggle
 * @property {HTMLFormElement | null} form
 * @property {HTMLInputElement | null} input
 * @property {HTMLButtonElement | null} btnClear
 * @property {HTMLButtonElement | null} btnClearAll
 * @property {NodeListOf<HTMLButtonElement>} filterButtons
 * @property {HTMLButtonElement | null} languageSelector
 */

/**
 * Collects references to interactive elements used during bootstrap.
 *
 * @returns {AppElements}
 */
export const queryAppElements = () => ({
  themeToggle: document.getElementById("theme-toggle"),
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  btnClear: document.getElementById("clear-completed"),
  btnClearAll: document.getElementById("clear-all"),
  filterButtons: document.querySelectorAll(".todo-filters__button"),
  languageSelector: document.getElementById("language-selector"),
});
