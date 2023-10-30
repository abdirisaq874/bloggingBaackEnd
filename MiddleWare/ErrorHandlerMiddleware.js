const CustomApi = require('../Errors');

const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApi.CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Invalid JSON payload passed.' });
  }
  console.error(err);
  return res
    .status(500)
    .json({ message: 'Something went wrong, please try again later' });
};

module.exports = ErrorHandlerMiddleware;
