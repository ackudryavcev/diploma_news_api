# news-explorer-api

http://api.ackudryavcev.tk-- API для работы с новостями и юзерами

===
Все роуты, кроме /signin и /signup, защищены авторизацией.
===
Роуты пользователей и роуты статей описаны в отдельных файлах.
===
Ошибки API обрабатываются
===
Реализовано бережное хранение пароля:
===
Данные валидируются перед добавлением в базу.
===
Пользователь не может удалить сохранённую карточку из профиля другого пользователя.
===
К серверу можно обратиться по http по адресу домена, указанному в README.md.
===
Правильно реализовано хранение секретного ключа для создания JWT
