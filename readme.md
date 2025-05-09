# Отчет по лабораторной работе №4

**Тема:** Работа с DOM-деревом и событиями в JavaScript

**Цель:** Создание веб-приложения для учета личных финансов с использованием модульного JavaScript, манипуляций с DOM и событийной модели.

---

## Шаг 1. Настройка и структурирование проекта

Проект имеет следующую структуру:

```
├── index.html
├── style.css
└── src
    ├── index.js
    ├── transactions.js
    ├── ui.js
    └── utils.js
```

В `index.html` подключен главный скрипт:

```html
<script type="module" src="./src/index.js"></script>
```

Также подключен файл стилей:

```html
<link rel="stylesheet" href="style.css">
```

---

##  Шаг 2. Представление транзакции

В модуле `transactions.js` реализован массив `transactions`, где каждая транзакция — объект со следующими полями:

```js
{
  id: 'uuid',
  date: '2025-05-09 14:00',
  amount: 1000,
  category: 'Доход',
  description: 'Зарплата за проект'
}
```

---

##  Шаг 3. Отображение транзакций

HTML-таблица создаётся с заголовками:

```html
<table>
  <thead>
    <tr>
      <th>Дата и Время</th>
      <th>Категория</th>
      <th>Краткое описание</th>
      <th>Действие</th>
    </tr>
  </thead>
  <tbody id="transactions-body"></tbody>
</table>
```

Модуль `ui.js` содержит функцию `renderTransactions()`, которая заполняет таблицу на основе массива `transactions`.

---

## ✅ Шаг 4. Добавление транзакций

Функция `addTransaction()` создаёт объект по данным формы, добавляет его в массив и таблицу.
Краткое описание — это первые 4 слова:

```js
function getShortDescription(text) {
  return text.split(' ').slice(0, 4).join(' ');
}
```

Цвет строки зависит от суммы:

```js
row.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');
```

---

## Шаг 5. Управление транзакциями

В каждой строке есть кнопка удаления:

```html
<button class="delete-btn" data-id="...">Удалить</button>
```

Удаление обрабатывается через делегирование:

```js
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    removeTransaction(id);
  }
});
```

---

##  Шаг 6. Подсчет суммы транзакции

В модуле `transactions.js`:

```js
export function calculateTotal(transactions) {
  return transactions.reduce((acc, tx) => acc + Number(tx.amount), 0);
}
```

Отображение общей суммы:

```js
const total = calculateTotal(transactions);
totalElement.textContent = `${total.toFixed(2)} руб.`;
```

---

## Шаг 7. Отображение полного описания

В `index.html` добавлен блок:

```html
<div id="full-description"></div>
```

Клик по строке таблицы отображает полное описание:

```js
tableBody.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (row && row.dataset.id) {
    const tx = transactions.find(t => t.id === row.dataset.id);
    document.getElementById('full-description').textContent = tx.description;
  }
});
```

---

## Шаг 8. Форма добавления и валидация

В форме используется `select` и `textarea`:

```html
<form id="transaction-form">
  <input id="amount" type="number" required>
  <select id="category" required>
    <option value="Доход">Доход</option>
    <option value="Расход">Расход</option>
  </select>
  <textarea id="description" required></textarea>
  <button type="submit">Добавить</button>
</form>
```

Валидация выполняется через `required`, а также логикой в JS:

```js
if (!amount || !description.trim()) {
  alert('Пожалуйста, заполните все поля.');
  return;
}
```

---

## Пример фрагмента модуля `utils.js`

```js
/** Генерирует уникальный ID */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/** Форматирует дату */
export function formatDate() {
  return new Date().toLocaleString('ru-RU');
}
```

---

## Контрольные вопросы

**1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?**

С помощью методов DOM, таких как `getElementById`, `querySelector`, `getElementsByClassName`, `querySelectorAll` и др. Пример:

```js
document.getElementById('myElement');
```

**2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?**

Делегирование событий — это практика назначения одного обработчика событий на родительский элемент, который отслеживает события от его дочерних элементов через механизм всплытия. Это позволяет избежать добавления обработчика на каждый элемент отдельно.

```js
document.querySelector('table').addEventListener('click', function (e) {
  if (e.target.matches('.delete-btn')) {
    // обработка
  }
});
```

**3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?**

Используя свойства `textContent`, `innerHTML` или `value`:

```js
document.getElementById('result').textContent = 'Готово';
```

**4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript?**

Через методы `createElement`, `appendChild`, `insertBefore`, `append` и т. д.:

```js
const div = document.createElement('div');
div.textContent = 'Новый элемент';
document.body.appendChild(div);
```

---

## 📌 Вывод

Блогодоря этой лабороторной работе, я поработал с модулями в js, также реализовал добоваление, отоброжение и удаление транзакций. Самое главное что я понял что такое DOM в js

---

Выполнил: Маев Сергей
