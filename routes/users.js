const router = require('express').Router();
const User = require('../models/user');
const { getUsers, getUserId, postUser } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserId);

router.post('/', postUser);

module.exports=router;
