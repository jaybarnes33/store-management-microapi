const Joi = require("@hapi/joi");
require("@hapi/joi");

const validator = async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

const Format = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim(),
  username: Joi.string().min(4).max(20),
  password: Joi.string().min(8).max(20),
};

const validations = {
  validateRegisterRoute: () => (req, res, next) => {
    const schema = Joi.object().keys({
      email: Format.email.required(),
      username: Format.username.required(),
      password: Format.password.required(),
    });
    return validator(schema, req.body, res, next);
  },
  validateSignInRoute: () => (req, res, next) => {
    const schema = Joi.object().keys({
      email: Format.email,
      username: Format.username,
      password: Format.password,
    });
    return validator(schema, req.body, res, next);
  },
  validateUserUpdateRoute: () => (req, res, next) => {
    const schema = Joi.object().keys({
      email: Format.email,
      username: Format.username,
      password: Format.password,
    });
    return validator(schema, req.body, res, next);
  },
};

module.exports = validations;
