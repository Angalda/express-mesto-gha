const Card = require('../models/card');


//возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//создаёт карточку
module.exports.createCard  = (req, res) => {
    const  owner  = req.user._id;
    const { name, link } = req.body;
    return Card.create({ name, link, owner })
    // вернём записанные в базу данные
    .then(card => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//удаляет карточку по идентификатору
module.exports.deleteCardId = (req, res) => {

  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//поставить лайк карточке
module.exports.likeCard = (req, res) => {

  Card.findByIdAndUpdate(req.params.cardId, {$addToSet: {likes: req.user._id}}, {new: true})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//убрать лайк с карточки
module.exports.removeLikeCard = (req, res) => {

  Card.findByIdAndUpdate(req.params.cardId, {$pull: {likes: req.user._id}}, {new: true})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};