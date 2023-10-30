const {
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware,
} = require('./IsItAuthenticatedMiddleware');
const NotFoundRouteMiddleware = require('./NotFoundMiddleware');
const ErrorHandlerMiddleware = require('./ErrorHandlerMiddleware');
const ValidationMiddleware = require('./ValidationMiddleware');
const CheckPermissions = require('./CheckPermissions');
module.exports = {
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware,
  NotFoundRouteMiddleware,
  ErrorHandlerMiddleware,
  ValidationMiddleware,
  CheckPermissions,
};
