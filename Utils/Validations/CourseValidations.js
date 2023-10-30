const Joi = require('joi');

const CourseValidatorSchema = Joi.object({
  Name: Joi.string().required().trim(),
  Description: Joi.string().required().trim(),
  Price: Joi.number().required(),
  CategoryId: Joi.string().required().trim(),
  
});

module.exports = {
  CourseValidatorSchema,
};
