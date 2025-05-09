/**
 * Генерация уникального ID для транзакции
 * @returns {string} - Уникальный ID
 */
let transactions = [
    {
        id: 'uuid',
        date: '2025-05-09 14:00',
        amount: 1000,
        category: 'Доход',
        description: 'Зарплата за проект'
    }
];

/**
 * Добавить транзакцию
 * @param {Object} transaction 
 */
export function addTransaction(transaction) {
  transactions.push(transaction);
}

/**
 * Удалить транзакцию по ID
 * @param {string} id 
 */
export function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
}

/**
 * Получить все транзакции
 * @returns {Object[]}
 */
export function getTransactions() {
  return [...transactions];
}
