import { truncateDescription, formatDate } from './utils.js';
import { getTransactionById } from './transactions.js';

// Получаем ссылки на элементы DOM один раз
const transactionsTableBody = document.getElementById('transactions-table-body');
const totalAmountElement = document.getElementById('total-amount');
const transactionDetailsElement = document.getElementById('transaction-details');
const detailsContentElement = document.getElementById('details-content');

/**
 * Отрисовывает одну строку таблицы для заданной транзакции.
 * @param {object} transaction - Объект транзакции.
 * @returns {HTMLTableRowElement} Созданный элемент строки таблицы (<tr>).
 */
function renderTransactionRow(transaction) {
    const row = document.createElement('tr');
    row.classList.add('transaction-row'); // Добавляем класс для стилей и event delegation
    row.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');
    row.dataset.id = transaction.id; // Сохраняем ID в data-атрибуте строки

    const shortDescription = truncateDescription(transaction.description, 4);

    row.innerHTML = `
        <td>${formatDate(new Date(transaction.date))}</td>
        <td>${transaction.category}</td>
        <td>${shortDescription}</td>
        <td>
            <button class="delete-btn" data-id="${transaction.id}">Удалить</button>
        </td>
    `;

    return row;
}

/**
 * Отрисовывает все транзакции в таблице.
 * Очищает текущее содержимое таблицы перед отрисовкой.
 * @param {object[]} transactions - Массив транзакций для отображения.
 */
export function renderTransactions(transactions) {
    // Очищаем текущее содержимое таблицы
    transactionsTableBody.innerHTML = '';

    // Добавляем каждую транзакцию как новую строку
    transactions.forEach(transaction => {
        const row = renderTransactionRow(transaction);
        transactionsTableBody.appendChild(row);
    });
}

/**
 * Удаляет строку транзакции из DOM по ее идентификатору.
 * @param {string} id - Идентификатор транзакции, строку которой нужно удалить.
 */
export function removeTransactionRow(id) {
    const rowToRemove = transactionsTableBody.querySelector(`tr[data-id="${id}"]`);
    if (rowToRemove) {
        rowToRemove.remove();
        console.log(`Строка транзакции с ID ${id} удалена из DOM.`);
        // Скрываем детали, если была выбрана удаленная транзакция
        const displayedDetailsId = detailsContentElement.dataset.id;
        if (displayedDetailsId === id) {
             hideTransactionDetails();
        }
    }
}


/**
 * Обновляет отображение общей суммы на странице.
 * @param {number} total - Новая общая сумма.
 */
export function updateTotalDisplay(total) {
    totalAmountElement.textContent = total.toFixed(2); // Форматируем до двух знаков после запятой
}

/**
 * Отображает полные подробности транзакции в специальном блоке.
 * @param {object} transaction - Объект транзакции, подробности которой нужно отобразить.
 */
export function displayTransactionDetails(transaction) {
    if (!transaction) {
        hideTransactionDetails();
        return;
    }

    detailsContentElement.innerHTML = `
        <strong>ID:</strong> ${transaction.id}<br>
        <strong>Дата и Время:</strong> ${formatDate(new Date(transaction.date))}<br>
        <strong>Сумма:</strong> ${transaction.amount.toFixed(2)}<br>
        <strong>Категория:</strong> ${transaction.category}<br>
        <strong>Описание:</strong> ${transaction.description}
    `;
    detailsContentElement.dataset.id = transaction.id; // Сохраняем ID отображаемой транзакции
    transactionDetailsElement.style.display = 'block'; // Показываем блок с деталями
}

/**
 * Скрывает блок с подробностями транзакции.
 */
export function hideTransactionDetails() {
    detailsContentElement.innerHTML = '';
     detailsContentElement.dataset.id = ''; // Очищаем ID
    transactionDetailsElement.style.display = 'none';
}


/**
 * Настраивает слушатели событий на таблице с использованием делегирования.
 * Обрабатывает клики по кнопке "Удалить" и клики по строкам транзакций.
 * @param {function(string): void} onDeleteClick - Колбэк, вызываемый при клике на кнопку "Удалить". Принимает ID транзакции.
 * @param {function(string): void} onRowClick - Колбэк, вызываемый при клике на строку транзакции (кроме кнопки удаления). Принимает ID транзакции.
 */
export function setupTableEventListeners(onDeleteClick, onRowClick) {
    transactionsTableBody.addEventListener('click', (event) => {
        const target = event.target;

        // Проверяем, был ли клик по кнопке удаления
        if (target.classList.contains('delete-btn')) {
            const transactionId = target.dataset.id;
            if (transactionId && onDeleteClick) {
                onDeleteClick(transactionId);
            }
        }
        // Проверяем, был ли клик по строке транзакции (но не по кнопке удаления внутри строки)
        else {
             const row = target.closest('.transaction-row'); // Ищем ближайший родительский элемент с классом 'transaction-row'
            if (row) {
                 const transactionId = row.dataset.id;
                 if (transactionId && onRowClick) {
                     onRowClick(transactionId);
                 }
             }
        }
    });
}