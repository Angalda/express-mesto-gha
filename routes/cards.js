const router = require('express').Router();
const Card = require('../models/card');

const { getCards, createCard, deleteCardId, likeCard, removeLikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCardId);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', removeLikeCard);

module.exports = router;

