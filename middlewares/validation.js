const { celebrate, Joi } = require('celebrate');

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validationGetUserId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports.validationCreateCard = celebrate({
  params: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
