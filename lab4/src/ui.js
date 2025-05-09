import { removeTransaction, getTransactions } from './transactions.js';
import { shortenDescription } from './utils.js';

const tableBody = document.querySelector("#transactions-body");
const totalElement = document.querySelector("#total");
const fullDescriptionBlock = document.querySelector("#full-description");

/**
 * Отрисовка всех транзакций
 * @param {Object[]} transactions 
 */
export function renderTransactions(transactions) {
  tableBody.innerHTML = "";

  transactions.forEach(tx => {
    const row = document.createElement("tr");
    row.dataset.id = tx.id;
    row.className = tx.amount >= 0 ? "positive" : "negative";

    row.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.category}</td>
      <td>${shortenDescription(tx.description)}</td>
      <td><button class="delete-btn">Удалить</button></td>
    `;

    tableBody.appendChild(row);
  });
}

/**
 * Подсчет общей суммы
 */
export function calculateTotal() {
  const total = getTransactions().reduce((sum, t) => sum + t.amount, 0);
  totalElement.textContent = `${total.toFixed(2)} руб.`;
}

/**
 * Показывает полное описание
 * @param {string} description 
 */
export function showFullDescription(description) {
  fullDescriptionBlock.textContent = description;
}

// Обработчик событий для таблицы
export function setupTableEvents() {
  tableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const id = row?.dataset?.id;

    if (e.target.classList.contains("delete-btn")) {
      removeTransaction(id);
      renderTransactions(getTransactions());
      calculateTotal();
    } else {
      const tx = getTransactions().find(t => t.id === id);
      if (tx) showFullDescription(tx.description);
    }
  });
}
