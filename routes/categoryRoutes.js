const express = require('express');
const router = express.Router();

const { IsItAuthenticatedMiddleware } = require('../MiddleWare');

const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/categories', getAllCategories);
router.get('/categories/:id', getSingleCategory);
router.post('/categories', createCategory);
router.patch('/categories/:id', IsItAuthenticatedMiddleware, updateCategory);
router.delete('/categories/:id', IsItAuthenticatedMiddleware, deleteCategory);

module.exports = router;
