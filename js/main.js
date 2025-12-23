import { addTask, clearCompleted } from "./modules/todo.js";
import { renderTasks } from "./modules/ui.js";

/**
 * App entry: wires form submission, filters, and clear controls.
 */
document.addEventListener("DOMContentLoaded", () => {
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
  const filterButtons = document.querySelectorAll(".todo-filters__button");

  const FILTER_MAP = {
    "filter-all": "all",
    "filter-active": "active",
    "filter-completed": "completed",
  };

  const SVG_NS = "http://www.w3.org/2000/svg";

  let currentTheme = DEFAULT_THEME;
  let currentContrast = CONTRAST_DEFAULT;

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

    setActiveFilter(id);
    renderTasks(filter);
  };

  renderTasks();
  setActiveFilter("filter-all");
  loadThemePreferences();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks();

    input.value = "";
    input.focus();
  });

  filterButtons.forEach((button) =>
    button.addEventListener("click", handleFilterClick)
  );

  btnClear?.addEventListener("click", () => {
    clearCompleted();
    renderTasks();
    btnClear.blur();
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
});
