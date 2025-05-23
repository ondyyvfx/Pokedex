# Pokémon App

Это веб-приложение, разработанное в рамках второго этапа технического задания NFactorial Incubator. Проект позволяет пользователю взаимодействовать с миром покемонов - искать, сохранять, проходить тематические тесты и выполнять игровые задания в стиле геймификации.

---

# Деплой:

- Ссылка: https://pokedex-gamma-sable.vercel.app/
- Если собираетесь запускать на локальном, вам понадобится OPENAI API KEY, я могу его предоставить если свяжетесь со мной

---

##  Функции

-  Поиск покемонов по имени.
-  Просмотр списка покемонов.
-  Тематический тест «Кто ты из покемонов?».
-  Сохранение и отображение приручённых покемонов.
-  Адаптивный интерфейс с мобильной навигацией.

---
## Технологический стек

- NextJS + TypeScript
- NextJS API Routes
- TailwindCSS
- shadcn
  
---

## Почему этот стек?
- Next.js - оптимальный фреймворк для SSR, SEO и удобной маршрутизации, можно написать как клиентскую так и серверную логику благодаря API Routes.
- TypeScript - строгая типизация, меньше ошибок на этапе разработки.
- TailwindCSS - быстрая и гибкая стилизация.
- PokeAPI - открытый API с данными о покемонах.
- Vercel - нативный хостинг для Next.js, обеспечивает лёгкий деплой и CI/CD.

---

##  Установка и запуск

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/ondyyvfx/Pokedex
   cd Pokedex
   code .
   npm install
   npm run dev
