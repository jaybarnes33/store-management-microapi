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
  username: Joi.string().min(4).max(20).trim(),
  password: Joi.string().min(8).max(20).trim(),
  storeName: Joi.string().min(4).trim(),
  storeLocation: Joi.string().min(4).trim(),
  phone: Joi.number(),
  storeTagLine: Joi.string(),
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
  validateStoreCreation: () => (req, res, next) => {
    const schema = Joi.object().keys({
      email: Format.email,
      storeName: Format.storeName.required(),
      storeLocation: Format.storeLocation.required(),
      phone: Format.phone.required(),
      storeTagLine: Format.storeTagLine.required(),
    });
    return validator(schema, req.body, res, next);
  },
  validateStoreUpdate: () => (req, res, next) => {
    const schema = Joi.object().keys({
      email: Format.email,
      storeName: Format.storeName,
      storeLocation: Format.storeLocation,
      phone: Format.phone,
      storeTagLine: Format.storeTagLine,
    });
    return validator(schema, req.body, res, next);
  },
};

module.exports = validations;
