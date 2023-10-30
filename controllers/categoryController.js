const Category = require('../models/Category');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};
const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories, count: categories.length });
};
const getSingleCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ category });
};
const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findOne({ _id: categoryId });
  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }
  category.name = req.body.name;
  await category.save();
  res.status(StatusCodes.OK).json({ category });
};
const deleteCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${req.params.id}`);
  }
  await category.remove();
  res.status(StatusCodes.OK).json({ msg: 'success! category removed' });
};
module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
