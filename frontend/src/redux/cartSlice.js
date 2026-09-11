import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      // Ensure we use a unique ID based on product, size, and color
      const cartItemId = item.cartItemId || `${item.productId}-${item.size || 'nosize'}-${item.color || 'nocolor'}`;
      item.cartItemId = cartItemId;

      const existItem = state.cartItems.find((x) => x.cartItemId === cartItemId);
      if (existItem) {
        // If it exists and we're just adding more from product page/card, we add the quantities.
        // If it's an absolute set from the cart page (e.g. qty: 3), we need a flag or we can just replace.
        // For simplicity, if we pass `absoluteQty: true`, we replace, otherwise we add.
        if (item.absoluteQty) {
          existItem.qty = item.qty;
        } else {
          existItem.qty += item.qty;
        }
        
        // Cap at stock limit
        if (existItem.qty > item.stock) {
          existItem.qty = item.stock;
        }
      } else {
        // New item
        // Ensure initial quantity doesn't exceed stock
        if (item.qty > item.stock) {
          item.qty = item.stock;
        }
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      // payload should be the cartItemId now
      state.cartItems = state.cartItems.filter((x) => x.cartItemId !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
