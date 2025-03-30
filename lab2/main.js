// main.js

// Шаг 1: Создание массива транзакций
/**
 * @typedef {Object} Transaction
 * @property {string} transaction_id - Уникальный идентификатор транзакции
 * @property {string} transaction_date - Дата транзакции (в формате YYYY-MM-DD)
 * @property {number} transaction_amount - Сумма транзакции
 * @property {string} transaction_type - Тип транзакции (debit или credit)
 * @property {string} transaction_description - Описание транзакции
 * @property {string} merchant_name - Название магазина или сервиса
 * @property {string} card_type - Тип карты (кредитная или дебетовая)
 */

const transactions = [
    {
        transaction_id: "17",
        transaction_date: "2019-01-17",
        transaction_amount: 55.0,
        transaction_type: "credit",
        transaction_description: "Refund for damaged item",
        merchant_name: "OnlineStoreXYZ",
        card_type: "Discover",
      }
];
//Шаг 2: Функции
/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string[]} Уникальные типы транзакций
 */
function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
}

/**
 * Вычисляет сумму всех транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Общая сумма транзакций
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Вычисляет сумму транзакций за определённую дату.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {number} [year] - Год
 * @param {number} [month] - Месяц (1-12)
 * @param {number} [day] - День
 * @returns {number} Общая сумма транзакций за указанный период
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return (!year || date.getFullYear() === year) &&
               (!month || date.getMonth() + 1 === month) &&
               (!day || date.getDate() === day);
    }).reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Возвращает транзакции указанного типа.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} type - Тип транзакции (debit или credit)
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}

/**
 * Возвращает транзакции в заданном диапазоне дат.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} startDate - Начальная дата (YYYY-MM-DD)
 * @param {string} endDate - Конечная дата (YYYY-MM-DD)
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
}

/**
 * Возвращает массив транзакций, совершенных у указанного продавца.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} merchantName - Название продавца
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Вычисляет среднее значение транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Средняя сумма транзакций
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Возвращает транзакции с суммой в указанном диапазоне.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {number} minAmount - Минимальная сумма
 * @param {number} maxAmount - Максимальная сумма
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Общая сумма дебетовых транзакций
 */
function calculateTotalDebitAmount(transactions) {
    return transactions.filter(t => t.transaction_type === "debit")
        .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/** Возвращает месяц, в котором было больше всего транзакций.
* @param {Transaction[]} transactions - Массив транзакций
* @returns {number|null} Номер месяца (1-12) или null, если нет транзакций
*/
function findMostTransactionsMonth(transactions) {
   if (transactions.length === 0) return null;
   const counts = transactions.reduce((acc, t) => {
       const month = new Date(t.transaction_date).getMonth() + 1;
       acc[month] = (acc[month] || 0) + 1;
       return acc;
   }, {});
   return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

/**
 * Возвращает месяц, в котором было больше дебетовых транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number|null} Номер месяца (1-12) или null, если нет транзакций
 */
function findMostDebitTransactionMonth(transactions) {
    if (transactions.length === 0) return null;
    const counts = transactions.filter(t => t.transaction_type === "debit")
        .reduce((acc, t) => {
            const month = new Date(t.transaction_date).getMonth() + 1;
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, null);
}

/**
 * Возвращает тип транзакций, которых больше всего.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string} "debit", "credit", "equal" или "нет транзакции"
 */
function mostTransactionTypes(transactions) {
    if (transactions.length === 0) return "нет транзакции";
    const debitCount = transactions.filter(t => t.transaction_type === "debit").length;
    const creditCount = transactions.filter(t => t.transaction_type === "credit").length;
    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
}

/**
 * Возвращает массив транзакций, совершенных до указанной даты.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} date - Дата в формате YYYY-MM-DD
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}

/**
 * Возвращает транзакцию по её уникальному идентификатору (ID).
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} id - Уникальный идентификатор транзакции
 * @returns {Transaction|null} Найденная транзакция или null, если не найдена
 */
function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id) || null;
}

/**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string[]} Массив описаний транзакций
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

// Шаг 3: Тестирование функций
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции с SuperMart:", getTransactionsByMerchant(transactions, "SuperMart"));
console.log("Средняя сумма транзакций:", calculateAverageTransactionAmount(transactions));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяц, в котором было больше всего транзакций:", findMostTransactionsMonth(transactions));
console.log("Какого типа транзакций больше:", mostTransactionTypes(transactions));
console.log("месяц, в котором было больше всего debit транзакций.:", findMostDebitTransactionMonth(transactions));
console.log("массив транзакций, совершенных до указанной даты 2025-03-16:", getTransactionsBeforeDate(transactions, "2025-03-16"));
console.log("Поиск транзакции по ID 18:", findTransactionById(transactions, "18"));
console.log("Описание транзакции:", mapTransactionDescriptions(transactions));