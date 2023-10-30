const { ValidationError } = require('../Errors');

const ValidationMiddlware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    throw new ValidationError(errorMessage);
  }
  next();
};

module.exports = ValidationMiddlware;
