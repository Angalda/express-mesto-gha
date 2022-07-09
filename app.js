const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
});

/* app.use((req, res, next) => {
  req.user = {
    _id: '62b5f6935617de41d374996e',
  };

  next();
}); */

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Не найдено' });
});

app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
