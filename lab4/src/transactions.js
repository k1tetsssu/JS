/**
 * @typedef {object} Transaction
 * @property {string} id - Уникальный идентификатор транзакции.
 * @property {string} date - Дата и время добавления транзакции (в формате строки).
 * @property {number} amount - Сумма транзакции.
 * @property {string} category - Категория транзакции.
 * @property {string} description - Описание транзакции.
 */

/**
 * Массив для хранения всех транзакций.
 * @type {Transaction[]}
 */
let transactions = [];

/**
 * Возвращает текущий массив транзакций.
 * @returns {Transaction[]} Массив транзакций.
 */
export function getTransactions() {
    // В реальном приложении здесь могла бы быть загрузка из localStorage или с сервера
    return transactions;
}

/**
 * Добавляет новую транзакцию в массив.
 * @param {Transaction} transaction - Объект транзакции для добавления.
 */
export function addTransaction(transaction) {
    transactions.push(transaction);
    // В реальном приложении здесь могло бы быть сохранение в localStorage или на сервер
    console.log('Транзакция добавлена:', transaction);
    console.log('Текущие транзакции:', transactions);
}

/**
 * Удаляет транзакцию из массива по ее идентификатору.
 * @param {string} id - Идентификатор транзакции, которую нужно удалить.
 */
export function deleteTransaction(id) {
    const initialLength = transactions.length;
    transactions = transactions.filter(transaction => transaction.id !== id);
    if (transactions.length < initialLength) {
        console.log(`Транзакция с ID ${id} удалена.`);
    } else {
        console.log(`Транзакция с ID ${id} не найдена.`);
    }
    // В реальном приложении здесь могло бы быть сохранение в localStorage или на сервер
}

/**
 * Находит транзакцию в массиве по ее идентификатору.
 * @param {string} id - Идентификатор транзакции для поиска.
 * @returns {Transaction | undefined} Объект транзакции или undefined, если не найден.
 */
export function getTransactionById(id) {
    return transactions.find(transaction => transaction.id === id);
}

/**
 * Рассчитывает общую сумму всех транзакций.
 * @returns {number} Общая сумма транзакций.
 */
export function calculateTotal() {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}