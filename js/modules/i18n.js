/**
 * Internationalization module
 * Manages translations and language switching
 */

const TRANSLATIONS = {
  en: {
    // Page title
    pageTitle: "Axio",

    // Form
    taskDescription: "Task description",
    addTaskPlaceholder: "Add a new task...",
    addTaskButton: "Add Task",

    // Filters
    filterAll: "All",
    filterActive: "Active",
    filterCompleted: "Completed",

    // Actions
    clearCompleted: "Clear Completed",
    clearAll: "Clear All",

    // Menu options
    edit: "Edit",
    delete: "Delete",

    // Dialogs
    editTask: "Edit task",
    deleteTask: "Delete task?",
    deleteTaskConfirm: "Are you sure you want to delete \"{text}\"? This action cannot be undone.",
    cancel: "Cancel",
    save: "Save",
    deleteButton: "Delete",

    // ARIA labels
    ariaTaskOptions: "Task options",
    ariaTaskOptionsMenu: "Task options menu",
    ariaEditTask: "Edit task",
    ariaDeleteTask: "Delete task",
    ariaMarkCompleted: "Mark \"{text}\" as completed",
    ariaDragReorder: "Drag to reorder",
    ariaThemeToggle: "Toggle theme",
    ariaContrastLevel: "Contrast level",
    ariaDefaultContrast: "Default contrast",
    ariaMediumContrast: "Medium contrast",
    ariaHighContrast: "High contrast",
    ariaClearCompleted: "Clear all completed tasks",
    ariaClearAll: "Clear all tasks",
    ariaTaskFilters: "Task filters",
    ariaTaskList: "Task list",
    ariaThemeSettings: "Theme and contrast settings",
    ariaLanguageSelector: "Select language",

    // Language names
    languageEnglish: "English",
    languagePortuguese: "Português",
  },
  pt: {
    // Título da página
    pageTitle: "Axio",

    // Formulário
    taskDescription: "Descrição da tarefa",
    addTaskPlaceholder: "Adicionar uma nova tarefa...",
    addTaskButton: "Adicionar Tarefa",

    // Filtros
    filterAll: "Todas",
    filterActive: "Ativas",
    filterCompleted: "Concluídas",

    // Ações
    clearCompleted: "Limpar Concluídas",
    clearAll: "Limpar Todas",

    // Opções do menu
    edit: "Editar",
    delete: "Excluir",

    // Diálogos
    editTask: "Editar tarefa",
    deleteTask: "Excluir tarefa?",
    deleteTaskConfirm: "Tem certeza de que deseja excluir \"{text}\"? Esta ação não pode ser desfeita.",
    cancel: "Cancelar",
    save: "Salvar",
    deleteButton: "Excluir",

    // Rótulos ARIA
    ariaTaskOptions: "Opções da tarefa",
    ariaTaskOptionsMenu: "Menu de opções da tarefa",
    ariaEditTask: "Editar tarefa",
    ariaDeleteTask: "Excluir tarefa",
    ariaMarkCompleted: "Marcar \"{text}\" como concluída",
    ariaDragReorder: "Arrastar para reordenar",
    ariaThemeToggle: "Alternar tema",
    ariaContrastLevel: "Nível de contraste",
    ariaDefaultContrast: "Contraste padrão",
    ariaMediumContrast: "Contraste médio",
    ariaHighContrast: "Contraste alto",
    ariaClearCompleted: "Limpar todas as tarefas concluídas",
    ariaClearAll: "Limpar todas as tarefas",
    ariaTaskFilters: "Filtros de tarefas",
    ariaTaskList: "Lista de tarefas",
    ariaThemeSettings: "Configurações de tema e contraste",
    ariaLanguageSelector: "Selecionar idioma",

    // Nomes dos idiomas
    languageEnglish: "English",
    languagePortuguese: "Português",
  },
};

const STORAGE_KEY = "todo-language";
const DEFAULT_LANGUAGE = "pt";

let currentLanguage = DEFAULT_LANGUAGE;

/**
 * Get current language
 */
export const getLanguage = () => currentLanguage;

/**
 * Set language and save to localStorage
 */
export const setLanguage = (lang) => {
  if (TRANSLATIONS[lang]) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    return true;
  }
  return false;
};

/**
 * Load language from localStorage or use default
 */
export const loadLanguage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && TRANSLATIONS[stored]) {
    currentLanguage = stored;
  } else {
    // Try to detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith("pt")) {
      currentLanguage = "pt";
    } else {
      currentLanguage = DEFAULT_LANGUAGE;
    }
  }
  document.documentElement.lang = currentLanguage;
  return currentLanguage;
};

/**
 * Get translation for a key
 * Supports placeholders like {text}
 */
export const t = (key, params = {}) => {
  const translation = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || key;

  // Replace placeholders
  if (params && Object.keys(params).length > 0) {
    return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }

  return translation;
};

/**
 * Get all available languages
 */
export const getAvailableLanguages = () => Object.keys(TRANSLATIONS);

/**
 * Initialize i18n system
 */
export const initI18n = () => {
  loadLanguage();
};
