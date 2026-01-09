/**
 * Módulo de Internacionalização (i18n)
 * 
 * Gerencia traduções e troca de idiomas na aplicação:
 * - Suporte para múltiplos idiomas (pt, en)
 * - Traduções para toda a interface
 * - Persistência da preferência de idioma no localStorage
 * - Detecção automática do idioma do navegador
 * - Suporte a placeholders dinâmicos nas traduções
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

    // Test page
    testPageTitle: "Tests",
    testPageDescription: "Run unit and integration tests to verify module functionality and complete application flows.",
    runTests: "Run Tests",
    testResults: "Test Results",
    testCategoryUnitStorage: "Unit Tests - Storage",
    testCategoryUnitTodo: "Unit Tests - Todo",
    testCategoryUniti18n: "Unit Tests - i18n",
    testCategoryIntegration: "Integration Tests",
    testsPassed: "passed",
    testsFailed: "failed",
    testsTotal: "total",
    executingTests: "Running tests...",
    noOutputCaptured: "No output captured.",
    errorLoadingModules: "Error loading modules",
    errorRunningTests: "Error running tests",
    ensureHttpServer: "Make sure you are running on an HTTP server (not file://)",
    errorRegisteringTests: "Error registering tests",

    // Keyboard shortcuts
    keyboardShortcutsTitle: "Keyboard Shortcuts",
    shortcutKeyFocusInput: "Ctrl+K or /",
    shortcutFocusInput: "Focus task input",
    shortcutKeyToggleTheme: "Ctrl+T",
    shortcutToggleTheme: "Toggle theme (light/dark)",
    shortcutKeyFilterAll: "1",
    shortcutFilterAll: "Show all tasks",
    shortcutKeyFilterActive: "2",
    shortcutFilterActive: "Show active tasks",
    shortcutKeyFilterCompleted: "3",
    shortcutFilterCompleted: "Show completed tasks",
    shortcutKeyClearCompleted: "Ctrl+Delete",
    shortcutClearCompleted: "Clear completed tasks",
    shortcutKeyClearAll: "Ctrl+Shift+Delete",
    shortcutClearAll: "Clear all tasks",
    shortcutKeyShowHelp: "Ctrl+? or F1",
    shortcutShowHelp: "Show this help dialog",
    close: "Close",
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

    // Página de testes
    testPageTitle: "Testes",
    testPageDescription: "Execute os testes unitários e de integração para verificar o funcionamento dos módulos e fluxos completos da aplicação.",
    runTests: "Executar Testes",
    testResults: "Resultados dos Testes",
    testCategoryUnitStorage: "Testes Unitários - Storage",
    testCategoryUnitTodo: "Testes Unitários - Todo",
    testCategoryUniti18n: "Testes Unitários - i18n",
    testCategoryIntegration: "Testes de Integração",
    testsPassed: "passaram",
    testsFailed: "falharam",
    testsTotal: "total",
    executingTests: "Executando testes...",
    noOutputCaptured: "Nenhum output capturado.",
    errorLoadingModules: "Erro ao carregar módulos",
    errorRunningTests: "Erro ao executar testes",
    ensureHttpServer: "Certifique-se de que está executando em um servidor HTTP (não file://)",
    errorRegisteringTests: "Erro ao registrar testes",

    // Atalhos de teclado
    keyboardShortcutsTitle: "Atalhos de Teclado",
    shortcutKeyFocusInput: "Ctrl+K ou /",
    shortcutFocusInput: "Focar no campo de tarefa",
    shortcutKeyToggleTheme: "Ctrl+T",
    shortcutToggleTheme: "Alternar tema (claro/escuro)",
    shortcutKeyFilterAll: "1",
    shortcutFilterAll: "Mostrar todas as tarefas",
    shortcutKeyFilterActive: "2",
    shortcutFilterActive: "Mostrar tarefas ativas",
    shortcutKeyFilterCompleted: "3",
    shortcutFilterCompleted: "Mostrar tarefas concluídas",
    shortcutKeyClearCompleted: "Ctrl+Delete",
    shortcutClearCompleted: "Limpar tarefas concluídas",
    shortcutKeyClearAll: "Ctrl+Shift+Delete",
    shortcutClearAll: "Limpar todas as tarefas",
    shortcutKeyShowHelp: "Ctrl+? ou F1",
    shortcutShowHelp: "Mostrar esta ajuda de atalhos",
    close: "Fechar",
  },
};

const STORAGE_KEY = "todo-language";
const DEFAULT_LANGUAGE = "pt";

let currentLanguage = DEFAULT_LANGUAGE;

/**
 * Obtém o idioma atual
 * @returns {string} Código do idioma atual (ex: 'pt', 'en')
 */
export const getLanguage = () => currentLanguage;

/**
 * Define o idioma e salva no localStorage
 * @param {string} lang - Código do idioma (ex: 'pt', 'en')
 * @returns {boolean} true se o idioma foi definido com sucesso, false caso contrário
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
 * Carrega o idioma do localStorage ou usa o padrão
 * Detecta automaticamente o idioma do navegador se não houver preferência salva
 * @returns {string} Código do idioma carregado
 */
export const loadLanguage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && TRANSLATIONS[stored]) {
    currentLanguage = stored;
  } else {
    // Tentar detectar o idioma do navegador
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
 * Obtém a tradução para uma chave específica
 * Suporta placeholders dinâmicos como {text}
 * 
 * @param {string} key - Chave da tradução
 * @param {Object} params - Objeto com parâmetros para substituir nos placeholders
 * @returns {string} Texto traduzido
 * 
 * @example
 * t("deleteTaskConfirm", { text: "Comprar leite" })
 * // Retorna: "Tem certeza de que deseja excluir "Comprar leite"?..."
 */
export const t = (key, params = {}) => {
  const translation = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || key;

  // Substituir placeholders
  if (params && Object.keys(params).length > 0) {
    return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }

  return translation;
};

/**
 * Obtém todos os idiomas disponíveis
 * @returns {Array<string>} Array com os códigos dos idiomas disponíveis
 */
export const getAvailableLanguages = () => Object.keys(TRANSLATIONS);

/**
 * Inicializa o sistema de internacionalização
 * Carrega o idioma salvo ou detecta automaticamente
 */
export const initI18n = () => {
  loadLanguage();
};
