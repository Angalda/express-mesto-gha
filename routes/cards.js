const router = require('express').Router();
const Card = require('../models/card');

const { getCards, createCard, deleteCardId} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCardId);
router.post('/', createCard);

module.exports=router;

//GET /cards — возвращает все карточки
//POST /cards — создаёт карточку
//DELETE /cards/:cardId — удаляет карточку по идентификатору