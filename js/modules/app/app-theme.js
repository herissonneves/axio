/**
 * Gerenciamento de Tema e Contraste
 * 
 * Gerencia a aplicação e persistência de temas e níveis de contraste.
 */

import {
  DEFAULT_THEME,
  CONTRAST_DEFAULT,
  THEME_STORAGE_KEY,
  CONTRAST_STORAGE_KEY,
  VALID_CONTRASTS,
  THEME_MAP,
} from "./app-config.js";

/**
 * Estado atual do tema
 * @private
 */
let currentTheme = DEFAULT_THEME;

/**
 * Estado atual do contraste
 * @private
 */
let currentContrast = CONTRAST_DEFAULT;

/**
 * Obtém o tema atual
 * @returns {string} Tema atual (light ou dark)
 */
export const getCurrentTheme = () => currentTheme;

/**
 * Obtém o contraste atual
 * @returns {string} Contraste atual (default, medium ou high)
 */
export const getCurrentContrast = () => currentContrast;

/**
 * Aplica o tema e contraste selecionados ao documento
 * @param {string} theme - Tema (light ou dark)
 * @param {string} contrast - Nível de contraste (default, medium ou high)
 */
export const applyTheme = (theme, contrast) => {
  const resolvedTheme =
    THEME_MAP[theme]?.[contrast] ?? THEME_MAP[DEFAULT_THEME][CONTRAST_DEFAULT];
  document.documentElement.dataset.theme = resolvedTheme;
};

/**
 * Atualiza o estado visual do botão de alternância de tema
 * @param {HTMLElement} themeToggle - Elemento do botão de tema
 * @param {string} theme - Tema atual (light ou dark)
 */
export const updateThemeToggle = (themeToggle, theme) => {
  if (!themeToggle) return;

  const isDark = theme === "dark";
  themeToggle.classList.toggle("theme-toggle--dark", isDark);
  themeToggle.classList.toggle("theme-toggle--light", !isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

/**
 * Atualiza o estado visual dos botões de seleção de contraste
 * @param {NodeList} contrastButtons - Lista de botões de contraste
 * @param {string} contrast - Nível de contraste atual
 */
export const updateContrastButtons = (contrastButtons, contrast) => {
  contrastButtons.forEach((btn) => {
    const value = btn.dataset.contrast;
    const isActive = value === contrast;
    btn.classList.toggle("contrast-selector__btn--active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
};

/**
 * Carrega as preferências de tema e contraste do localStorage
 * @param {HTMLElement} themeToggle - Elemento do botão de tema
 * @param {NodeList} contrastButtons - Lista de botões de contraste
 * @returns {Object} Objeto com tema e contraste carregados
 */
export const loadThemePreferences = (themeToggle, contrastButtons) => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const storedContrast = localStorage.getItem(CONTRAST_STORAGE_KEY);

  const initialTheme = storedTheme === "dark" ? "dark" : DEFAULT_THEME;
  const initialContrast = VALID_CONTRASTS.includes(storedContrast)
    ? storedContrast
    : CONTRAST_DEFAULT;

  currentTheme = initialTheme;
  currentContrast = initialContrast;

  updateThemeToggle(themeToggle, initialTheme);
  updateContrastButtons(contrastButtons, initialContrast);
  applyTheme(initialTheme, initialContrast);

  return { theme: initialTheme, contrast: initialContrast };
};

/**
 * Alterna entre os temas (light <-> dark)
 * @param {HTMLElement} themeToggle - Elemento do botão de tema
 * @returns {string} Novo tema aplicado
 */
export const toggleTheme = (themeToggle) => {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = nextTheme;

  console.log(`[Theme] Mudando de ${currentTheme === "dark" ? "light" : "dark"} para ${nextTheme}`);
  
  updateThemeToggle(themeToggle, nextTheme);
  applyTheme(nextTheme, currentContrast);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

  console.log(`[Theme] data-theme="${document.documentElement.dataset.theme}"`);

  return nextTheme;
};

/**
 * Define um novo nível de contraste
 * @param {NodeList} contrastButtons - Lista de botões de contraste
 * @param {string} contrast - Novo nível de contraste
 * @returns {boolean} true se o contraste foi aplicado, false caso contrário
 */
export const setContrast = (contrastButtons, contrast) => {
  if (!VALID_CONTRASTS.includes(contrast)) return false;

  console.log(`[Contrast] Mudando para: ${contrast}`);

  currentContrast = contrast;
  updateContrastButtons(contrastButtons, contrast);
  applyTheme(currentTheme, contrast);
  localStorage.setItem(CONTRAST_STORAGE_KEY, contrast);

  console.log(`[Contrast] data-theme="${document.documentElement.dataset.theme}"`);

  return true;
};

/**
 * Alterna entre os níveis de contraste (default -> medium -> high -> default)
 * @param {NodeList} contrastButtons - Lista de botões de contraste
 * @returns {string} Novo contraste aplicado
 */
export const toggleContrast = (contrastButtons) => {
  const contrastOrder = [CONTRAST_DEFAULT, "medium", "high"];
  const currentIndex = contrastOrder.indexOf(currentContrast);
  const nextIndex = (currentIndex + 1) % contrastOrder.length;
  const nextContrast = contrastOrder[nextIndex];

  setContrast(contrastButtons, nextContrast);
  
  return nextContrast;
};
