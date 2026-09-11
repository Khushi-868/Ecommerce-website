const express = require('express');
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/reviews/:productId
router.get('/:productId', getProductReviews);

// POST /api/reviews/:productId (requires login)
router.post('/:productId', protect, createReview);

module.exports = router;
