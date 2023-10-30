const express = require('express');
const router = express.Router();

const {
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware,
} = require('../MiddleWare');

const {
  createEmployee,
  getAllEmployees,
} = require('../controllers/EmployeesController');
const RolesEnum = require('../Constants/Roles');

router.post(
  '/employees',
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware(RolesEnum.ADMIN),
  createEmployee
);
router.get(
  '/employees',
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware(RolesEnum.ADMIN),
  getAllEmployees
);

module.exports = router;
