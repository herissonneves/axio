/**
 * Configurações do Sistema de Internacionalização
 * 
 * Define as constantes e configurações base para o sistema i18n:
 * - Chave de armazenamento no localStorage
 * - Idioma padrão da aplicação
 * - Idiomas suportados
 */

/**
 * Chave usada para armazenar a preferência de idioma no localStorage
 * @constant {string}
 */
export const STORAGE_KEY = "todo-language";

/**
 * Código do idioma padrão da aplicação
 * @constant {string}
 */
export const DEFAULT_LANGUAGE = "pt";

/**
 * Lista de idiomas suportados pela aplicação
 * @constant {Array<string>}
 */
export const SUPPORTED_LANGUAGES = ["pt", "en"];

/**
 * Padrão regex para identificar placeholders nas traduções
 * Formato: {nomeDoPlaceholder}
 * @constant {RegExp}
 */
export const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;
