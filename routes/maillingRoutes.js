const express = require('express');
const router = express.Router();

const {
  createBlogsSubscribtion,
  deleteBlogSubscription,
} = require('../controllers/maillingController');

router.post('/subscribe', createBlogsSubscribtion);
router.delete('/unsubscribe', deleteBlogSubscription);

module.exports = router;
