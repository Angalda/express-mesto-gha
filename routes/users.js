const router = require('express').Router();

const {
  getUsers, getUserId, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getUser);

// router.post('/', postUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
