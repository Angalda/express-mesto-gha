const User = require('../models/user');

//возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//возвращает пользователя по _id
module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//создаёт пользователя
module.exports.postUser  = (req, res) => {

    const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//обновляет профиль
module.exports.updateUser  = (req, res) => {
  const { name, about } = req.body;
User.findByIdAndUpdate(req.user._id, { name, about}, {new: true, runValidators: true})

  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};


//обновляет аватар
module.exports.updateAvatar  = (req, res) => {
  const { avatar } = req.body;
User.findByIdAndUpdate(req.user._id, { avatar}, {new: true, runValidators: true})

  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

