const express = require('express');
const router = express.Router();

const {
  IsItAuthenticatedMiddleware,
  ValidationMiddleware,
} = require('../MiddleWare');

const {
  RegistrationValidatorSchema,
  LoginValidatorSchema,
} = require('../Utils');

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post(
  '/Register',
  ValidationMiddleware(RegistrationValidatorSchema),
  register
);
router.post('/Login', ValidationMiddleware(LoginValidatorSchema), login);
router.delete('/Logout', IsItAuthenticatedMiddleware, logout);
router.post('/Verify-email', verifyEmail);
router.post('/Reset-password', resetPassword);
router.post('/Forgot-password', forgotPassword);

module.exports = router;
