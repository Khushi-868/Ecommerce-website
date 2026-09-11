const Review = require('../models/Review');
const Product = require('../models/Product');

// GET /api/reviews/:productId - Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/reviews/:productId - Create a review (requires auth)
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({ productId, userId: req.user._id });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      productId,
      userId: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    });

    // Update product ratings avg and count
    const allReviews = await Review.find({ productId });
    product.numReviews = allReviews.length;
    product.ratings = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    // Handle unique index violation (duplicate review)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductReviews, createReview };
