const CustomApi = require('../Errors');
const Token = require('../models/Token');
const { isTokenValid, attachCookiesToResponse } = require('../Utils');

const IsItAuthenticatedMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    const ExistingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!ExistingToken || !ExistingToken?.isValid) {
      console.log('Invalid Token');
      throw new CustomApi.UnauthenticatedError('UnAuthenticated1');
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: ExistingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (e) {
    throw new CustomApi.UnauthenticatedError('UnAuthenticated');
  }
};

const AuthorizePermissionsMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomApi.UnauthorizedError(
        'You do not have permission to perform this action'
      );
    }
    next();
  };
};

module.exports = {
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware,
};
