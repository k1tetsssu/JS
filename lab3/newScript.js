// Item как функция-конструктор
function ItemConstructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }
  
  ItemConstructor.prototype.getInfo = function () {
    return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
  };
  
  ItemConstructor.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
  };
  
  // Weapon как функция-конструктор
  function WeaponConstructor(name, weight, rarity, damage, durability) {
    ItemConstructor.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }
  
  // Наследование
  WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
  WeaponConstructor.prototype.constructor = WeaponConstructor;
  
  WeaponConstructor.prototype.use = function () {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    }
  };
  
  WeaponConstructor.prototype.repair = function () {
    this.durability = 100;
  };
  
  WeaponConstructor.prototype.getInfo = function () {
    return `${ItemConstructor.prototype.getInfo.call(this)}, Урон: ${this.damage}, Прочность: ${this.durability}`;
  };
  
  // Пример использования
  const staff = new WeaponConstructor("Magic Staff", 1.8, "rare", 25, 100);
  console.log(staff?.getInfo());  // 
  staff?.use();
  console.log(staff?.durability);
  staff?.repair();
  console.log(staff?.getInfo())