/**
 * Módulo de Persistência i18n
 * 
 * Gerencia a persistência da preferência de idioma no localStorage.
 * Funções puras que interagem com o localStorage para salvar e recuperar
 * a preferência de idioma do usuário.
 */

import { STORAGE_KEY } from "./i18n-config.js";

/**
 * Salva a preferência de idioma no localStorage
 * 
 * @param {string} language - Código do idioma a ser salvo (ex: 'pt', 'en')
 * @returns {boolean} true se salvou com sucesso, false em caso de erro
 * 
 * @example
 * saveLanguagePreference('en'); // true
 */
export const saveLanguagePreference = (language) => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
    return true;
  } catch (error) {
    console.error("Erro ao salvar preferência de idioma:", error);
    return false;
  }
};

/**
 * Recupera a preferência de idioma do localStorage
 * 
 * @returns {string|null} Código do idioma salvo ou null se não houver
 * 
 * @example
 * const lang = loadLanguagePreference(); // 'pt' ou null
 */
export const loadLanguagePreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao carregar preferência de idioma:", error);
    return null;
  }
};

/**
 * Remove a preferência de idioma do localStorage
 * 
 * @returns {boolean} true se removeu com sucesso, false em caso de erro
 * 
 * @example
 * clearLanguagePreference(); // true
 */
export const clearLanguagePreference = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Erro ao limpar preferência de idioma:", error);
    return false;
  }
};
