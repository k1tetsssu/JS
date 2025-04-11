// Шаг 1: Создание класса Item

class Item {
    /**
     * Представляет предмет в инвентаре.
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {string} rarity - Редкость предмета ('common', 'uncommon', 'rare', 'legendary').
     */
    constructor(name, weight, rarity) {
        // Базовая валидация входных данных
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("Имя должно быть непустой строкой.");
        }
        if (typeof weight !== 'number' || weight < 0 || isNaN(weight)) {
            throw new Error("Вес должен быть неотрицательным числом.");
        }
        const validRarities = ['common', 'uncommon', 'rare', 'legendary'];
        if (typeof rarity !== 'string' || !validRarities.includes(rarity.toLowerCase())) {
            throw new Error(`Редкость должна быть одной из: ${validRarities.join(', ')}`);
        }

        this.name = name;
        this.weight = weight;
        this.rarity = rarity.toLowerCase(); // Приводим к нижнему регистру для единообразия
    }

    /**
     * Возвращает строку с информацией о предмете.
     * @returns {string} Строка с описанием предмета.
     */
    getInfo() {
        // Делаем первую букву редкости заглавной
        const capitalizedRarity = this.rarity.charAt(0).toUpperCase() + this.rarity.slice(1);
        // Используем toFixed(1) для отображения одного знака после запятой у веса
        return `Предмет: ${this.name}, Вес: ${this.weight.toFixed(1)}, Редкость: ${capitalizedRarity}`;
    }

    /**
     * Изменяет вес предмета.
     * @param {number} newWeight - Новый вес предмета.
     */
    setWeight(newWeight) {
        if (typeof newWeight !== 'number' || newWeight < 0 || isNaN(newWeight)) {
            throw new Error("Новый вес должен быть неотрицательным числом.");
        }
        console.log(`Изменнёный все для ${this.name} из ${this.weight.toFixed(1)} до ${newWeight.toFixed(1)}`);
        this.weight = newWeight;
    }
}

// Шаг 2: Создание класса Weapon

class Weapon extends Item {
    /**
     * Представляет оружие, расширяя класс Item.
     * @param {string} name - Название оружия.
     * @param {number} weight - Вес оружия.
     * @param {string} rarity - Редкость оружия.
     * @param {number} damage - Урон оружия.
     * @param {number} [durability=100] - Прочность оружия (от 0 до 100). По умолчанию 100.
     */
    constructor(name, weight, rarity, damage, durability = 100) {
        // Вызываем конструктор родительского класса Item
        super(name, weight, rarity);

        // Валидация дополнительных полей
        if (typeof damage !== 'number' || !Number.isInteger(damage) || damage < 0) {
             throw new Error("Урон должен быть неотрицательным целым числом.");
        }
        if (typeof durability !== 'number' || !Number.isInteger(durability) || durability < 0 || durability > 100) {
            throw new Error("Прочность должна быть целым числом от 0 до 100.");
        }

        this.damage = damage;
        // Убедимся, что начальная прочность в пределах 0-100
        this.durability = Math.max(0, Math.min(durability, 100));
    }

    /**
     * Переопределенный метод. Возвращает строку с информацией об оружии.
     * @returns {string} Строка с описанием оружия.
     */
    getInfo() {
        // Получаем базовую информацию от родительского класса
        const itemInfo = super.getInfo();
        // Добавляем специфичную для оружия информацию
        return `${itemInfo}, Урон: ${this.damage}, Прочность: ${this.durability}%`;
    }

    /**
     * Использует оружие, уменьшая его прочность на 10.
     * Прочность не может упасть ниже 0.
     */
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            // Убедимся, что прочность не ушла в минус
            if (this.durability < 0) {
                this.durability = 0;
            }
            console.log(`Использован ${this.name}. Прочность уменшилась до ${this.durability}%.`);
            if (this.durability === 0) {
                console.log(`${this.name} сломан!`);
            }
        } else {
            console.log(`${this.name} сломан и не может быть использован.`);
        }
    }

    /**
     * Ремонтирует оружие, восстанавливая его прочность до 100.
     */
    repair() {
        if (this.durability < 100) {
            console.log(`Чиним ${this.name}...`);
            this.durability = 100;
            console.log(`${this.name} отремонтирован. Прочность востоновленна до ${this.durability}%.`);
        } else {
            console.log(`${this.name} предмет не нуждается в ремонте.`);
        }
    }
}


// Шаг 3: Тестирование

console.log("--- Тестирование Item класса ---");
try {
    // Создаем предмет согласно примеру
    const sword = new Item("Steel Sword", 3.5, "rare");
    console.log(sword.getInfo()); // Используем getInfo()

    // Изменяем вес
    sword.setWeight(4.0);
    console.log(`Текущий вес меча: ${sword.weight.toFixed(1)}`);
    console.log(sword.getInfo()); // Проверяем обновленную информацию

    // Пример создания другого предмета
    const potion = new Item("Health Potion", 0.5, "common");
    console.log(potion.getInfo());

    // Пример ошибки при создании предмета (неправильная редкость)
    const invalidItem = new Item("Dimond Sword", 7.5, "minecraft");
    console.log(invalidItem.getInfo());

} catch (e) {
    console.error(`Ошибка создания предмета: ${e.message}`);
}

console.log("\n--- Тестирование Weapon класса ---");
try {
    // Создаем оружие согласно примеру
    const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
    console.log(bow.getInfo()); // Используем getInfo() (переопределенный)

    // Используем лук несколько раз
    bow.use();
    console.log(`Прочность лука после использования: ${bow.durability}%`); // Проверяем прочность напрямую
    bow.use();
    bow.use();
    console.log(bow.getInfo()); // Проверяем через getInfo

    // Ремонтируем лук
    bow.repair();
    console.log(`Прочность лука после ремонта: ${bow.durability}%`); // Проверяем прочность
    bow.repair(); // Попытка починить уже целый

    // Используем лук до поломки
    console.log("\nИспользуем лук до поломки...");
    for (let i = 0; i < 11; i++) { // 10 использований до 0%, 11-е - попытка использовать сломанный
        if (bow.durability > 0) {
             bow.use();
        } else {
             bow.use(); // Попытка использовать сломанный
             break;
        }
    }

    console.log(bow.getInfo());
    bow.repair(); // Чиним сломанный
    console.log(bow.getInfo());

    // Создаем еще одно оружие
    const axe = new Weapon("Battle Axe", 5.0, "rare", 25, 75);
    console.log(axe.getInfo());
    axe.use();

} catch (e) {
    console.error(`Ошибка создания предмета: ${e.message}`);
}