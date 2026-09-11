const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    originalPrice: {
      type: Number,
      min: 0
    },

    category: {
      type: String,
      required: true,
      enum: [
        'Round Neck T-Shirts',
        'Oversized T-Shirts',
        'Polo T-Shirts',
        'Acid Wash T-Shirts',
        'Boxy Vest T-Shirts',
        'Hoodies',
        'Women',
        'Kids',
        'Bottom Wear'
      ]
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true
    },

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0
    },

    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL']
    },

    colors: {
      type: [String],
      default: []
    },

    isNewArrival: {
      type: Boolean,
      default: false
    },

    isBestSeller: {
      type: Boolean,
      default: false
    },

    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);