import {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getTransactionById,
    calculateTotal
} from './transactions.js';

import {
    renderTransactions,
    updateTotalDisplay,
    setupTableEventListeners,
    removeTransactionRow,
    displayTransactionDetails,
    hideTransactionDetails
} from './ui.js';

import { generateId, validateTransaction } from './utils.js';

// Получаем ссылку на форму
const transactionForm = document.getElementById('transaction-form');

/**
 * Инициализация приложения.
 * Загружает данные (если есть), отображает их и настраивает слушатели событий.
 */
function init() {
    // В этом примере данные не сохраняются между сессиями.
    // В реальном приложении здесь могла бы быть загрузка из localStorage.

    const initialTransactions = getTransactions(); // Получаем текущие (пустые) транзакции
    renderTransactions(initialTransactions); // Отображаем их (пустую таблицу)
    updateTotalDisplay(calculateTotal()); // Обновляем отображение общей суммы (будет 0)

    // Настраиваем слушатели событий на таблице (делегирование)
    setupTableEventListeners(handleDeleteTransaction, handleRowClick);

    // Настраиваем слушатель события отправки формы
    transactionForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Обработчик события отправки формы добавления транзакции.
 * @param {Event} event - Объект события отправки формы.
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    // Получаем данные из формы
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');

    const transactionData = {
        amount: amountInput.value,
        category: categoryInput.value,
        description: descriptionInput.value.trim()
    };

    // Валидируем данные
    const validationError = validateTransaction(transactionData);
    if (validationError) {
        alert(validationError); // Простой вывод ошибки
        return; // Прекращаем выполнение, если есть ошибка
    }

    // Создаем новый объект транзакции
    const newTransaction = {
        id: generateId(), // Генерируем уникальный ID
        date: new Date().toISOString(), // Текущая дата и время в ISO формате
        amount: parseFloat(transactionData.amount), // Преобразуем сумму в число
        category: transactionData.category,
        description: transactionData.description
    };

    // Добавляем транзакцию в массив данных
    addTransaction(newTransaction);

    // Отрисовываем новую строку в UI (более эффективно, чем перерисовывать всю таблицу)
    const newRow = renderTransactionRow(newTransaction); // Используем функцию из ui.js
    document.getElementById('transactions-table-body').appendChild(newRow);


    // Обновляем отображение общей суммы
    updateTotalDisplay(calculateTotal());

    // Очищаем форму
    transactionForm.reset();
     hideTransactionDetails(); // Скрываем детали после добавления
}

/**
 * Обработчик клика по кнопке "Удалить" в строке транзакции.
 * Вызывается из ui.js через делегирование событий.
 * @param {string} transactionId - ID транзакции, которую нужно удалить.
 */
function handleDeleteTransaction(transactionId) {
    // Удаляем транзакцию из массива данных
    deleteTransaction(transactionId);

    // Удаляем соответствующую строку из UI
    removeTransactionRow(transactionId);

    // Обновляем отображение общей суммы
    updateTotalDisplay(calculateTotal());

    // Скрываем блок с деталями, если отображалась удаленная транзакция
     // Эта логика уже добавлена в removeTransactionRow
     // hideTransactionDetails(); // Можно убрать отсюда, т.к. обработано в removeTransactionRow
}

/**
 * Обработчик клика по строке транзакции (кроме кнопки удаления).
 * Вызывается из ui.js через делегирование событий.
 * @param {string} transactionId - ID транзакции, на которую кликнули.
 */
function handleRowClick(transactionId) {
    // Находим транзакцию в массиве данных
    const transaction = getTransactionById(transactionId);

    // Отображаем полные детали транзакции в специальном блоке
    displayTransactionDetails(transaction);
}

// Запускаем инициализацию приложения при загрузке скрипта
init();

// Экспортируем функции, которые могут понадобиться для отладки (опционально)
// export { getTransactions, addTransaction, deleteTransaction, calculateTotal };