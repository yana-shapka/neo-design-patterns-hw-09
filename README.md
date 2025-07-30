# Template Method Pattern - User Data Exporter

Реалізація патерну **Template Method** для експорту користувацьких даних у різних форматах (CSV, JSON, XML).

## Як реалізований патерн Template Method

### Базовий клас `DataExporter`

Містить **шаблонний метод** `export()`, який визначає фіксований алгоритм експорту:

```typescript
public async export(): Promise<void> {
  await this.load();        // 1. Завантаження даних з API
  this.transform();         // 2. Трансформація і сортування
  this.beforeRender();      // 3. Hook-метод (перед рендерингом)
  this.result = this.render(); // 4. Рендеринг у формат (абстрактний)
  this.afterRender();       // 5. Hook-метод (після рендерингу)
  this.save();              // 6. Збереження файлу (абстрактний)
}
```

### Типи методів:

- **Конкретні методи**: `load()`, `transform()` - однакові для всіх підкласів
- **Hook-методи**: `beforeRender()`, `afterRender()` - порожні за замовчуванням, можна перевизначити
- **Абстрактні методи**: `render()`, `save()` - обов'язково реалізувати в підкласах

### Підкласи

- `CsvExporter` - експорт у CSV формат
- `JsonExporter` - експорт у JSON формат  
- `XmlExporter` - експорт у XML формат (перевизначає `afterRender()`)

## Як додати новий формат експорту

1. **Створіть новий клас-нащадок**:
```typescript
export class YamlExporter extends DataExporter {
  protected render(): string {
    // Реалізуйте рендеринг у YAML формат
    let result = '';
    for (let i = 0; i < this.data.length; i++) {
      const user = this.data[i];
      result += `- id: ${user.id}\n`;
      result += `  name: "${user.name}"\n`;
      result += `  email: "${user.email}"\n`;
      result += `  phone: "${user.phone}"\n`;
    }
    return result;
  }

  protected save(): void {
    // Реалізуйте збереження файлу
    const filePath = './dist/users.yaml';
    writeFileSync(filePath, this.result, 'utf8');
    console.log('YAML file saved: ' + filePath);
  }
}
```

2. **Додайте до основного файлу**:
```typescript
import { YamlExporter } from './exporters/YamlExporter';

const exporters = [
  new CsvExporter(),
  new JsonExporter(),
  new XmlExporter(),
  new YamlExporter()  // Додайте новий експортер
];
```

3. **Опціонально створіть ітератор** для читання нового формату.

## Приклад запуску застосунку

### Встановлення залежностей:
```bash
npm install
```

### Експорт даних:
```bash
npm run export
```

### Перегляд згенерованих файлів:
```bash
npm run iterate
```

### Повний тест:
```bash
npm test
```

### Результат роботи:

Після запуску `npm run export` створюються файли:

- `dist/users.csv` - CSV формат з заголовками
- `dist/users.json` - JSON формат з відступами
- `dist/users.xml` - XML формат з коментарем про час створення

Після запуску `npm run iterate` виводиться:
```
--- CSV ---
{ id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289' }
...

--- JSON ---
{ id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289' }
...

--- XML ---
{ id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289' }
...
```

## Структура проекту

```
src/
├── data/
│   └── UserData.ts           # Інтерфейс даних користувача
├── exporters/
│   ├── DataExporter.ts       # Базовий клас з Template Method
│   ├── CsvExporter.ts        # CSV експортер
│   ├── JsonExporter.ts       # JSON експортер
│   └── XmlExporter.ts        # XML експортер
├── iterators/
│   ├── CsvIterator.ts        # Читання CSV
│   ├── JsonIterator.ts       # Читання JSON
│   └── XmlIterator.ts        # Читання XML
├── main.ts                   # Демо експорту
└── main-iterate.ts           # Демо читання
```

