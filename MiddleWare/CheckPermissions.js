const CustomError = require('../Errors');
const RolesEnum = require('../Constants/Roles');

const checkPermissions = (req, res, next) => {
  if (req.user.role === RolesEnum.ADMIN) return next();
  if (req.user.userId === req.params.id) return next();
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkPermissions;
