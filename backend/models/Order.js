const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },

        name: {
          type: String,
          required: true
        },

        imageUrl: {
          type: String
        },

        qty: {
          type: Number,
          required: true,
          min: 1
        },

        price: {
          type: Number,
          required: true,
          min: 0
        },

        size: {
          type: String
        },

        color: {
          type: String
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    address: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },

      street: {
        type: String,
        required: true,
        trim: true
      },

      city: {
        type: String,
        required: true,
        trim: true
      },

      postalCode: {
        type: String,
        required: true,
        trim: true
      },

      country: {
        type: String,
        required: true,
        trim: true,
        default: 'India'
      }
    },

    paymentId: {
      type: String,
      default: null
    },

    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },

    status: {
      type: String,
      enum: [
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
      ],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);