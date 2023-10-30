const Joi = require('joi');

const CategoryValidatorSchema = Joi.object({
    Name: Joi.string().required().trim(),
    Description: Joi.string().required().trim(),
});

module.exports = {
    CategoryValidatorSchema,
};