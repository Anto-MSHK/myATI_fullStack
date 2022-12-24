# myATI_fullStack
## О проекте
Клиент-серверное приложение для отображения расписания для студентов ТИ (филиала) ДГТУ в г. Азов.
#### Технологический стек
Клиентская часть - React Native, Redux
Серверная часть - Node.js, Express.js
База данных - MongoDB
## Сервер
Программа скачивает расписание с сайта института (https://www.atidstu.ru/?q=node/189) в формате excel файла, затем парсит расписание и сохраняет ответы в БД.
> Репозиторий алгоритма парсинга:
https://github.com/Anto-MSHK/myATI_parser

## Клиент
Мобильное приложение, в котором доступно:
- расписание всех групп;
- отслеживание учебных дней по датам и верхней/нижней неделе;
- возможность закрепления групп и быстрого доступа к ним;
- хранение расписания своей группы локально на телефоне.

> Приложение в google play: 
https://play.google.com/store/apps/details?id=com.antomshk.myati
