const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  //useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false
});

app.use('/users', require('./routes/users'));
//app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  req.user = {
    _id: '62b5f6935617de41d374996e' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);



