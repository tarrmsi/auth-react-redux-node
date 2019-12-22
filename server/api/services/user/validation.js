const Joi = require("@hapi/joi");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value.body = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      username: Joi.string(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required()
    })
  }
};
