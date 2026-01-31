/**
 * Configurações da Aplicação
 * 
 * Define todas as constantes e configurações globais da aplicação.
 */

/**
 * Tema padrão da aplicação
 * @constant {string}
 */
export const DEFAULT_THEME = "light";

/**
 * Nível de contraste padrão
 * @constant {string}
 */
export const CONTRAST_DEFAULT = "default";

/**
 * Chave do localStorage para o tema
 * @constant {string}
 */
export const THEME_STORAGE_KEY = "todo-theme";

/**
 * Chave do localStorage para o contraste
 * @constant {string}
 */
export const CONTRAST_STORAGE_KEY = "todo-contrast";

/**
 * Lista de níveis de contraste válidos
 * @constant {Array<string>}
 */
export const VALID_CONTRASTS = [CONTRAST_DEFAULT, "medium", "high"];

/**
 * Mapeamento de IDs de filtro para valores de filtro
 * @constant {Object.<string, string>}
 */
export const FILTER_MAP = {
  "filter-all": "all",
  "filter-active": "active",
  "filter-completed": "completed",
};

/**
 * Namespace SVG para criação de elementos SVG
 * @constant {string}
 */
export const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Mapa de combinações tema/contraste para classes CSS
 * @constant {Object.<string, Object.<string, string>>}
 */
export const THEME_MAP = {
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
