import Joi from "@hapi/joi";

export const validateBody = schema => {
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
};

export const schemas = {
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
};
