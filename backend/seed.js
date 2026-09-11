const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // =========================
    // ADMIN USER
    // =========================

    const hashedPassword = await bcrypt.hash('ShopNest@123', 10);

    await User.create({
      name: 'ShopNest Admin',
      email: 'ka587183@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    // =========================
    // PRODUCTS
    // =========================

    const products = [

      // -------------------------
      // ROUND NECK T-SHIRTS
      // -------------------------

      {
        name: 'Essential Black T-Shirt',
        description:
          'Premium everyday round neck t-shirt crafted from soft breathable cotton with a clean minimal finish.',
        price: 699,
        originalPrice: 999,
        category: 'Round Neck T-Shirts',
        stock: 45,
        imageUrl:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
        ratings: 4.8,
        numReviews: 124,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Grey'],
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true
      },

      {
        name: 'Classic White Crew Tee',
        description:
          'A timeless white crew neck tee designed for effortless everyday styling.',
        price: 649,
        originalPrice: 899,
        category: 'Round Neck T-Shirts',
        stock: 60,
        imageUrl:
          'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
        ratings: 4.7,
        numReviews: 98,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black'],
        isBestSeller: true,
        isFeatured: true
      },

      // -------------------------
      // OVERSIZED T-SHIRTS
      // -------------------------

      {
        name: 'Urban Oversized Black Tee',
        description:
          'Relaxed oversized silhouette with dropped shoulders and premium heavyweight cotton.',
        price: 899,
        originalPrice: 1299,
        category: 'Oversized T-Shirts',
        stock: 35,
        imageUrl:
          'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80',
        ratings: 4.9,
        numReviews: 156,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Charcoal'],
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true
      },

      {
        name: 'Sand Beige Oversized Tee',
        description:
          'Minimal beige oversized t-shirt with a relaxed fit for modern streetwear looks.',
        price: 949,
        originalPrice: 1399,
        category: 'Oversized T-Shirts',
        stock: 28,
        imageUrl:
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
        ratings: 4.6,
        numReviews: 74,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beige', 'Cream'],
        isNewArrival: true,
        isFeatured: true
      },

      // -------------------------
      // POLO T-SHIRTS
      // -------------------------

      {
        name: 'Premium Navy Polo',
        description:
          'Smart casual polo t-shirt made from premium cotton piqué with a structured collar.',
        price: 999,
        originalPrice: 1499,
        category: 'Polo T-Shirts',
        stock: 32,
        imageUrl:
          'https://images.unsplash.com/photo-1625910513413-5fc45f3c5b05?auto=format&fit=crop&w=900&q=80',
        ratings: 4.7,
        numReviews: 63,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Navy', 'Black', 'White'],
        isNewArrival: true,
        isBestSeller: true
      },

      {
        name: 'Classic Olive Polo',
        description:
          'Versatile olive polo designed for polished everyday outfits.',
        price: 899,
        originalPrice: 1299,
        category: 'Polo T-Shirts',
        stock: 24,
        imageUrl:
          'https://images.unsplash.com/photo-1586363104868-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80',
        ratings: 4.5,
        numReviews: 41,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Olive', 'Black'],
        isBestSeller: true
      },

      // -------------------------
      // ACID WASH
      // -------------------------

      {
        name: 'Vintage Grey Acid Wash Tee',
        description:
          'Vintage-inspired acid wash t-shirt with a relaxed streetwear silhouette.',
        price: 999,
        originalPrice: 1499,
        category: 'Acid Wash T-Shirts',
        stock: 30,
        imageUrl:
          'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80',
        ratings: 4.8,
        numReviews: 87,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Grey', 'Charcoal'],
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true
      },

      {
        name: 'Midnight Blue Acid Wash Tee',
        description:
          'Statement acid wash tee featuring a faded finish and contemporary oversized fit.',
        price: 1099,
        originalPrice: 1599,
        category: 'Acid Wash T-Shirts',
        stock: 22,
        imageUrl:
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
        ratings: 4.6,
        numReviews: 52,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Black'],
        isNewArrival: true
      },

      // -------------------------
      // BOXY VEST
      // -------------------------

      {
        name: 'Relaxed Boxy Vest',
        description:
          'Modern boxy vest with a relaxed silhouette, perfect for layered streetwear outfits.',
        price: 799,
        originalPrice: 1199,
        category: 'Boxy Vest T-Shirts',
        stock: 26,
        imageUrl:
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
        ratings: 4.5,
        numReviews: 36,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Olive'],
        isNewArrival: true
      },

      // -------------------------
      // HOODIES
      // -------------------------

      {
        name: 'Essential Black Hoodie',
        description:
          'Heavyweight cotton-blend hoodie with a clean minimal design and comfortable relaxed fit.',
        price: 1499,
        originalPrice: 2199,
        category: 'Hoodies',
        stock: 25,
        imageUrl:
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
        ratings: 4.9,
        numReviews: 112,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Grey'],
        isBestSeller: true,
        isFeatured: true
      },

      {
        name: 'Stone Grey Essential Hoodie',
        description:
          'Soft premium hoodie in stone grey with a contemporary relaxed fit.',
        price: 1599,
        originalPrice: 2299,
        category: 'Hoodies',
        stock: 18,
        imageUrl:
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80',
        ratings: 4.7,
        numReviews: 67,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Grey', 'Beige'],
        isNewArrival: true
      },

      // -------------------------
      // WOMEN
      // -------------------------

      {
        name: 'Women Relaxed Fit Tee',
        description:
          'Soft relaxed-fit everyday tee designed for effortless casual styling.',
        price: 749,
        originalPrice: 1099,
        category: 'Women',
        stock: 40,
        imageUrl:
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
        ratings: 4.7,
        numReviews: 58,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Beige'],
        isNewArrival: true,
        isFeatured: true
      },

      {
        name: 'Women Oversized Graphic Tee',
        description:
          'Contemporary oversized graphic tee with a relaxed silhouette.',
        price: 899,
        originalPrice: 1299,
        category: 'Women',
        stock: 31,
        imageUrl:
          'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80',
        ratings: 4.6,
        numReviews: 43,
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'White'],
        isBestSeller: true
      },

      // -------------------------
      // KIDS
      // -------------------------

      {
        name: 'Kids Essential Cotton Tee',
        description:
          'Comfortable everyday cotton t-shirt designed for active kids.',
        price: 499,
        originalPrice: 699,
        category: 'Kids',
        stock: 45,
        imageUrl:
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80',
        ratings: 4.6,
        numReviews: 31,
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Blue', 'White', 'Yellow'],
        isNewArrival: true
      },

      // -------------------------
      // BOTTOM WEAR
      // -------------------------

      {
        name: 'Relaxed Fit Cargo Pants',
        description:
          'Utility-inspired relaxed cargo pants with multiple pockets and a modern silhouette.',
        price: 1299,
        originalPrice: 1899,
        category: 'Bottom Wear',
        stock: 20,
        imageUrl:
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
        ratings: 4.7,
        numReviews: 46,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Olive', 'Beige'],
        isBestSeller: true,
        isFeatured: true
      },

      {
        name: 'Classic Black Relaxed Joggers',
        description:
          'Comfortable relaxed joggers made for everyday wear and casual styling.',
        price: 999,
        originalPrice: 1499,
        category: 'Bottom Wear',
        stock: 35,
        imageUrl:
          'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80',
        ratings: 4.5,
        numReviews: 38,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Grey'],
        isNewArrival: true
      }
    ];

    await Product.insertMany(products);

    console.log('✅ ShopNest fashion data imported successfully!');
    console.log(`✅ ${products.length} products added`);
  console.log('✅ Admin: ka587183@gmail.com');
console.log('✅ Password: ShopNest@123');

    process.exit(0);

  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();