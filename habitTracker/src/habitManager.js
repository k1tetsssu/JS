const STORAGE_KEY = 'habitData';

export const habitManager = {
    // Получение привычек из localStorage
    getHabits() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            // Парсим JSON или возвращаем пустой массив, если данных нет
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Ошибка при загрузке привычек из localStorage:", error);
            return [];
        }
    },

    // Сохраняет привычки в localStorage
    saveHabits(habits) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
        } catch (error) {
            console.error("Ошибка при сохранении привычек в localStorage:", error);
        }
    },

    // Добавляние новой привычки
    addHabit(name, color) {
        const habits = this.getHabits();
        const newHabit = {
            id: Date.now().toString(),
            name: name.trim(),
            color: color || '#00b894',
            dates: {},
        };
        habits.push(newHabit);
        this.saveHabits(habits);
        return newHabit;
    },

    // Переключение состояния выполнения привычки для конкретной даты
    toggleDate(habitId, date) {
        const habits = this.getHabits();
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            habit.dates[date] = !habit.dates[date];
            this.saveHabits(habits);
        } else {
            console.warn(`Привычка с ID ${habitId} не найдена.`);
        }
    },

    // Удаление привычки по ID
    deleteHabit(habitId) { 
        let habits = this.getHabits();
        // Фильтруем, оставляя все привычки, кроме той, что нужно удалить
        habits = habits.filter(h => h.id !== habitId);
        this.saveHabits(habits);
    },

    // Фильтрует привычки по статусу выполнения для конкретной даты
    filterHabitsByStatus(habits, status, date) {
        if (status === 'done') {
            return habits.filter(h => h.dates && h.dates[date]); 
        } else if (status === 'not-done') {
            return habits.filter(h => !h.dates || !h.dates[date]);
        }
        return habits;
    },
};