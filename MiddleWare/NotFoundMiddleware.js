const {NotFoundError} = require('../Errors');

const NotFoundMiddleware = (req, res) => {
  console.log('Route does not exist');
  throw new NotFoundError('Route does not exist');
};

module.exports = NotFoundMiddleware;
