/**
 * Генерация уникального ID
 * @returns {string}
 */
export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  /**
   * Форматирует дату и время в строку
   * @returns {string}
   */
  export function formatDateTime() {
    return new Date().toLocaleString();
  }
  
  /**
   * Обрезает описание до первых 4 слов
   * @param {string} description 
   * @returns {string}
   */
  export function shortenDescription(description) {
    return description.split(' ').slice(0, 4).join(' ') + '...';
  }
  