const express = require('express');
const router = express.Router();
const { IsItAuthenticatedMiddleware } = require('../MiddleWare');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router
  .route('/')
  .post(IsItAuthenticatedMiddleware, createReview)
  .get(getAllReviews);

router
  .route('/:id')
  .get(getSingleReview)
  .patch(IsItAuthenticatedMiddleware, updateReview)
  .delete(IsItAuthenticatedMiddleware, deleteReview);

module.exports = router;
