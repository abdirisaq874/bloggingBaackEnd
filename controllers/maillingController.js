const Mailing = require('../models/BlogMaillings');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');
const createBlogsSubscribtion = async (req, res) => {
  const { email } = req.body;
  const subscribed = await Mailing.findOne({ email });
  if (subscribed) {
    throw new CustomError.BadRequestError('email already subscribed');
  }
  await Mailing.create({ email });
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'success! blog subscription created' });
};

const deleteBlogSubscription = async (req, res) => {
  const { email } = req.body;
  const subscription = await Mailing.findOne({ email: email });
  if (!subscription) {
    throw new CustomError.NotFoundError('email not subscribed');
  }
  await subscription.deleteOne();
  res
    .status(StatusCodes.OK)
    .json({ message: 'success! blog subscription removed' });
};

module.exports = {
  createBlogsSubscribtion,
  deleteBlogSubscription,
};
