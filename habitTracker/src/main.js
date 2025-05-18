import { habitManager } from "./habitManager.js";

// Получаем элементы из DOM
const habitNameInput = document.getElementById('habitName');
const habitColorInput = document.getElementById('habitColor'); 
const addHabitBtn = document.getElementById('addHabitBtn');
const habitsContainer = document.getElementById('habitContainer'); 
const errorElem = document.getElementById('habitError'); 
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const toggleThemeBtn = document.getElementById('toggleTheme'); 

// Функция для отрисовки списка привычек
const renderHabits = () => {
    const query = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const today = new Date().toISOString().slice(0, 10);

    let habits = habitManager.getHabits();
    habits = habits.filter(h => h.name.toLowerCase().includes(query));
    
    habits = habitManager.filterHabitsByStatus(habits, status, today);

    // Очищаем контейнер и добавляем отфильтрованные привычки
    habitsContainer.innerHTML = '';

    if (habits.length === 0) {
        habitsContainer.innerHTML = '<p style="text-align: center; color: var(--text-color);">Привычки не найдены.</p>';
        return;
    }


    habits.forEach(habit => {
        // Создаем карточку привычки
        const card = document.createElement('div');
        card.className = 'habit-card';
        // Используем шаблонные строки для создания содержимого карточки
        card.innerHTML = `
            <div class="habit-header">
                <strong style="color: ${habit.color || '#00b894'}">${habit.name}</strong>
            </div>
            <button class="delete-btn" data-id="${habit.id}">×</button>
            <div class="calendar">
                ${generateCalendarDays(habit.id, habit.dates)}
            </div>
        `;

        // Назначаем обработчик клика на кнопку удаления
        const deleteButton = card.querySelector('.delete-btn');
        deleteButton.onclick = () => {
             // Уточняем сообщение подтверждения
            if (confirm(`Вы уверены, что хотите удалить привычку "${habit.name}"?`)) {
                const habitId = deleteButton.dataset.id;
                habitManager.deleteHabit(habitId);
                renderHabits();
            }
        };

        // Назначаем обработчики кликов на дни календаря
        const calendarDays = card.querySelectorAll('.day');
        calendarDays.forEach(day => {
            day.onclick = () => {
                const habitId = day.dataset.habitId; // Получаем ID привычки из data-атрибута
                const date = day.dataset.date; // Получаем дату из data-атрибута
                habitManager.toggleDate(habitId, date);
                renderHabits();
            };
        });

        habitsContainer.appendChild(card);
    });
};

// Вспомогательная функция для генерации HTML дней календаря
const generateCalendarDays = (habitId, dates) => {
    let daysHtml = '';
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().slice(0, 10); 
        const dayNumber = date.getDate(); 
        const isDone = dates && dates[dateStr]; // Проверяем, выполнена ли привычка в этот день

        // Добавляем data-атрибуты для удобства
        daysHtml += `
            <div class="day ${isDone ? 'done' : ''}" data-habit-id="${habitId}" data-date="${dateStr}">
                ${dayNumber}
            </div>
        `;
    }
    return daysHtml;
};


// Обработчик клика по кнопке добавления привычки
addHabitBtn.onclick = () => {
    const name = habitNameInput.value.trim();

    if (!name) {
        // Показываем ошибку, если имя пустое
        errorElem.textContent = 'Название привычки не может быть пустым!';
        errorElem.style.display = 'block'; // Убедимся, что элемент виден
        return;
    }

    errorElem.textContent = '';
    errorElem.style.display = 'none';

    const color = habitColorInput.value;
    habitManager.addHabit(name, color);

    habitNameInput.value = '';
    renderHabits();
};

// Обработчики событий для поиска и фильтрации
searchInput.oninput = renderHabits;
statusFilter.onchange = renderHabits;

// Обработчик события для переключения темы
toggleThemeBtn.onclick = () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleThemeBtn.textContent = isDark ? 'Светлая тема' : 'Темная тема';
};

// При загрузке страницы:
document.addEventListener('DOMContentLoaded', () => {
    // Применяем сохраненную тему из localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        toggleThemeBtn.textContent = 'Светлая тема';
    } else {
         // Если нет сохраненной темы или она 'light', убедимся, что класс 'dark' отсутствует
        document.body.classList.remove('dark');
        toggleThemeBtn.textContent = 'Темная тема';
    }


    renderHabits();
});