import { addTask, clearCompleted, clearAll } from "./modules/todo.js";
import { renderTasks } from "./modules/ui.js";
import { initI18n, setLanguage, t, getLanguage, getAvailableLanguages } from "./modules/i18n.js";

/**
 * App entry: wires form submission, filters, and clear controls.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize i18n
  initI18n();

  const DEFAULT_THEME = "light";
  const CONTRAST_DEFAULT = "default";
  const THEME_STORAGE_KEY = "todo-theme";
  const CONTRAST_STORAGE_KEY = "todo-contrast";

  const VALID_CONTRASTS = [CONTRAST_DEFAULT, "medium", "high"];

  const themeToggle = document.getElementById("theme-toggle");
  const contrastButtons = document.querySelectorAll(".contrast-selector__btn");

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const btnClear = document.getElementById("clear-completed");
  const btnClearAll = document.getElementById("clear-all");
  const filterButtons = document.querySelectorAll(".todo-filters__button");

  const FILTER_MAP = {
    "filter-all": "all",
    "filter-active": "active",
    "filter-completed": "completed",
  };

  const SVG_NS = "http://www.w3.org/2000/svg";

  let currentTheme = DEFAULT_THEME;
  let currentContrast = CONTRAST_DEFAULT;
  let currentFilter = "all";

  // Update all static texts
  const updateTexts = () => {
    const pageTitle = document.getElementById("page-title");
    const todoFormLabel = document.getElementById("todo-form-label");
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-button");
    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterCompleted = document.getElementById("filter-completed");
    const clearCompletedBtn = document.getElementById("clear-completed");
    const clearAllBtn = document.getElementById("clear-all");
    const languageSelector = document.getElementById("language-selector");
    const languageSelectorText = document.getElementById("language-selector-text");
    const themeControls = document.querySelector(".theme-controls");
    const todoFilters = document.querySelector(".todo-filters");

    if (pageTitle) pageTitle.textContent = t("pageTitle");
    if (todoFormLabel) todoFormLabel.textContent = t("taskDescription");
    if (todoInput) todoInput.placeholder = t("addTaskPlaceholder");
    if (addTaskButton) addTaskButton.textContent = t("addTaskButton");
    if (filterAll) filterAll.textContent = t("filterAll");
    if (filterActive) filterActive.textContent = t("filterActive");
    if (filterCompleted) filterCompleted.textContent = t("filterCompleted");
    if (clearCompletedBtn) {
      clearCompletedBtn.textContent = t("clearCompleted");
      clearCompletedBtn.setAttribute("aria-label", t("ariaClearCompleted"));
    }
    if (clearAllBtn) {
      clearAllBtn.textContent = t("clearAll");
      clearAllBtn.setAttribute("aria-label", t("ariaClearAll"));
    }
    if (languageSelector) {
      languageSelector.setAttribute("aria-label", t("ariaLanguageSelector"));
      const currentLang = getLanguage();
      if (languageSelectorText) {
        languageSelectorText.textContent = currentLang.toUpperCase();
      }
    }
    if (themeControls) {
      themeControls.setAttribute("aria-label", t("ariaThemeSettings"));
    }
    if (todoFilters) {
      todoFilters.setAttribute("aria-label", t("ariaTaskFilters"));
    }

    // Update contrast buttons aria-labels
    const contrastButtons = document.querySelectorAll(".contrast-selector__btn");
    contrastButtons.forEach((btn) => {
      const contrast = btn.dataset.contrast;
      if (contrast === "default") {
        btn.setAttribute("aria-label", t("ariaDefaultContrast"));
      } else if (contrast === "medium") {
        btn.setAttribute("aria-label", t("ariaMediumContrast"));
      } else if (contrast === "high") {
        btn.setAttribute("aria-label", t("ariaHighContrast"));
      }
    });

    // Update theme toggle aria-label
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", t("ariaThemeToggle"));
    }

    // Re-render tasks to update dynamic content
    renderTasks(currentFilter);
  };

  // Initial text update
  updateTexts();

  const THEME_MAP = {
    light: {
      [CONTRAST_DEFAULT]: "light",
      medium: "light-medium-contrast",
      high: "light-high-contrast",
    },
    dark: {
      [CONTRAST_DEFAULT]: "dark",
      medium: "dark-medium-contrast",
      high: "dark-high-contrast",
    },
  };

  const applyTheme = (theme, contrast) => {
    const resolvedTheme =
      THEME_MAP[theme]?.[contrast] ?? THEME_MAP[DEFAULT_THEME][CONTRAST_DEFAULT];
    document.documentElement.dataset.theme = resolvedTheme;
  };

  const updateThemeToggle = (theme) => {
    if (!themeToggle) return;

    const isDark = theme === "dark";
    themeToggle.classList.toggle("theme-toggle--dark", isDark);
    themeToggle.classList.toggle("theme-toggle--light", !isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
  };

  const updateContrastButtons = (contrast) => {
    contrastButtons.forEach((btn) => {
      const value = btn.dataset.contrast;
      const isActive = value === contrast;
      btn.classList.toggle("contrast-selector__btn--active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  };

  const loadThemePreferences = () => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const storedContrast = localStorage.getItem(CONTRAST_STORAGE_KEY);

    const initialTheme = storedTheme === "dark" ? "dark" : DEFAULT_THEME;
    const initialContrast = VALID_CONTRASTS.includes(storedContrast)
      ? storedContrast
      : CONTRAST_DEFAULT;

    currentTheme = initialTheme;
    currentContrast = initialContrast;

    updateThemeToggle(initialTheme);
    updateContrastButtons(initialContrast);
    applyTheme(initialTheme, initialContrast);
  };

  const renderFilterIcon = () => {
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
   * Toggle active filter button styles and assistive states.
   */
  const setActiveFilter = (activeButtonId) => {
    filterButtons.forEach((btn) => {
      const isActive = btn.id === activeButtonId;
      btn.classList.toggle("todo-filters__button--active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));

      btn.querySelector(".todo-filters__button-icon-wrapper")?.remove();

      if (isActive) {
        const iconWrapper = document.createElement("div");
        iconWrapper.classList.add("todo-filters__button-icon-wrapper");
        iconWrapper.append(renderFilterIcon());
        btn.prepend(iconWrapper);
      }
    });
  };

  /**
   * Handle filter selection.
   */
  const handleFilterClick = (event) => {
    const { id } = event.currentTarget;
    const filter = FILTER_MAP[id];
    if (!filter) return;

    currentFilter = filter;
    setActiveFilter(id);
    renderTasks(filter);
  };

  renderTasks(currentFilter);
  setActiveFilter("filter-all");
  loadThemePreferences();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks(currentFilter);

    input.value = "";
    input.focus();
  });

  filterButtons.forEach((button) =>
    button.addEventListener("click", handleFilterClick)
  );

  btnClear?.addEventListener("click", () => {
    clearCompleted();

    // Se o filtro atual for "completed", mudar para "all" porque a lista vai esvaziar
    if (currentFilter === "completed") {
      currentFilter = "all";
      setActiveFilter("filter-all");
      renderTasks("all");
    } else {
      renderTasks(currentFilter);
    }

    btnClear.blur();
  });

  btnClearAll?.addEventListener("click", () => {
    clearAll();
    currentFilter = "all";
    setActiveFilter("filter-all");
    renderTasks("all");
    btnClearAll.blur();
  });

  const handleThemeToggleClick = () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    currentTheme = nextTheme;

    updateThemeToggle(nextTheme);
    applyTheme(nextTheme, currentContrast);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  const handleContrastClick = (event) => {
    const button = event.currentTarget;
    const value = button.dataset.contrast;
    if (!VALID_CONTRASTS.includes(value)) return;

    currentContrast = value;
    updateContrastButtons(value);
    applyTheme(currentTheme, currentContrast);
    localStorage.setItem(CONTRAST_STORAGE_KEY, value);
  };

  themeToggle?.addEventListener("click", handleThemeToggleClick);
  contrastButtons.forEach((btn) =>
    btn.addEventListener("click", handleContrastClick)
  );

  // Language selector
  const languageSelector = document.getElementById("language-selector");
  let languageMenu = null;

  const closeLanguageMenu = () => {
    if (languageMenu) {
      languageMenu.remove();
      languageMenu = null;
    }
    if (languageSelector) {
      languageSelector.setAttribute("aria-expanded", "false");
    }
  };

  const createLanguageMenu = () => {
    closeLanguageMenu();

    const menu = document.createElement("div");
    menu.classList.add("language-menu");
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", t("ariaLanguageSelector"));

    const languages = [
      { code: "pt", name: t("languagePortuguese") },
      { code: "en", name: t("languageEnglish") },
    ];

    languages.forEach((lang) => {
      const item = document.createElement("button");
      item.classList.add("language-menu__item");
      if (getLanguage() === lang.code) {
        item.classList.add("language-menu__item--active");
      }
      item.setAttribute("role", "menuitem");
      item.textContent = lang.name;

      item.addEventListener("click", () => {
        setLanguage(lang.code);
        updateTexts();
        closeLanguageMenu();
      });

      menu.append(item);
    });

    const rect = languageSelector.getBoundingClientRect();
    menu.style.position = "fixed";
    menu.style.top = `${rect.bottom + 4}px`;
    menu.style.right = `${window.innerWidth - rect.right}px`;

    document.body.append(menu);
    languageMenu = menu;
    languageSelector.setAttribute("aria-expanded", "true");

    // Close on outside click
    setTimeout(() => {
      const handleClickOutside = (event) => {
        if (!menu.contains(event.target) && event.target !== languageSelector) {
          closeLanguageMenu();
          document.removeEventListener("click", handleClickOutside);
        }
      };
      document.addEventListener("click", handleClickOutside);
    }, 0);
  };

  languageSelector?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (languageMenu) {
      closeLanguageMenu();
    } else {
      createLanguageMenu();
    }
  });

  // Close language menu on Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && languageMenu) {
      closeLanguageMenu();
    }
  });
});
