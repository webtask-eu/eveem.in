## Как это работает.

- Вам нужно добавить ссылки в файл list.txt, каждую **через запятую**. Ссылки должны быть вида

```
https://mr-trader.com/business-ideas/top-10-ideas-from-usa, https://mr-trader.com/business-ideas/top-10-ideas-from-usa, https://mr-trader.com/business-ideas/top-10-ideas-from-usa,
```

- Открыть консоль и ввести последовательно команды

```bash
npm i
npm run start
```

Для работы у вас должна быть установлена платформа Node Js https://nodejs.org/en/



## Режим "без головы"

В файле `.env` можно включить фоновый режим, в котором браузер будет работать, но окно не запустится. Для этого нужно поставить 

```bash
HEADLESS=true
```

Ссылки которые не вызвали ошибки записываются в файл `success.txt`, остальные в `error.txt`

