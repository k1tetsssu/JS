import { addTransaction, getTransactions } from './transactions.js';
import { renderTransactions, calculateTotal, setupTableEvents } from './ui.js';
import { generateId, formatDateTime } from './utils.js';

const form = document.querySelector("#transaction-form");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const descriptionInput = document.querySelector("#description");

function validateForm(amount, description) {
  if (isNaN(amount) || description.trim().length < 4) {
    alert("Проверьте введенные данные.");
    return false;
  }
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();

  if (!validateForm(amount, description)) return;

  const newTransaction = {
    id: generateId(),
    date: formatDateTime(),
    amount,
    category,
    description
  };

  addTransaction(newTransaction);
  renderTransactions(getTransactions());
  calculateTotal();
  form.reset();
});

renderTransactions(getTransactions());
calculateTotal();
setupTableEvents();