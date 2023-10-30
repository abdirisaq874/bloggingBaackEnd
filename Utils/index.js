const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} = require('./JWT/jwt');
const createTokenUser = require('./JWT/createTokenUser');
const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = require('./Emails/sendVerficationEmail');
const sendResetPasswordEmail = require('./Emails/sendResetPasswordEmail');
const sendNewBlogtoSubscribers = require('./Emails/SendNewBlogtoSubscribers');
const createHash = require('./createHash');

const {
  RegistrationValidatorSchema,
  LoginValidatorSchema,
} = require('./Validations/AuthValidations');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
  sendNewBlogtoSubscribers,
  RegistrationValidatorSchema,
  LoginValidatorSchema,
};
