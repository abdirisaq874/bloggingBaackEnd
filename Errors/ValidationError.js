const CustomApi = require('./custom-api');
const { StatusCodes } = require('http-status-codes');

class ValidationError extends CustomApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}
module.exports = ValidationError;
