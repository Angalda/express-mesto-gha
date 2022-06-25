const router = require('express').Router();
const User = require('../models/user');
const { getUsers, getUserId, postUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserId);

router.post('/', postUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports=router;
