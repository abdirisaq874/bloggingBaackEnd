const Joi = require('joi');
const Roles = require('../../Constants/Roles');

const RegistrationValidatorSchema = Joi.object({
  Name: Joi.string().required().trim(),
  Email: Joi.string().required().email().lowercase(),
  Password: Joi.string()
    .required()
    .min(8)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
  // Role: Joi.string()
  //   .required()
  //   .valid(Roles.ADMIN, Roles.STUDENT, Roles.INSTRUCTOR),
});

const LoginValidatorSchema = Joi.object({
  Email: Joi.string().required().email().lowercase(),
  Password: Joi.string()
    .required()
    .min(8)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
});

module.exports = {
  RegistrationValidatorSchema,
  LoginValidatorSchema,
};
