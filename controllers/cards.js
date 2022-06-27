const Card = require('../models/card');


//возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

//создаёт карточку
module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    // вернём записанные в базу данные
    .then(card => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' })
    });
};

//удаляет карточку по идентификатору
module.exports.deleteCardId = (req, res) => {

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Не найдено' });
        return;
      }
      res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: 'Ошибка сервера' })
    });
};


//поставить лайк карточке
module.exports.likeCard = (req, res) => {

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Не найдено' });
        return;
      }
      res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: 'Ошибка сервера' })
    });
};

//убрать лайк с карточки
module.exports.removeLikeCard = (req, res) => {

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Не найдено' });
        return;
      }
      res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: 'Ошибка сервера' })
    });
};