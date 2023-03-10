import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

const store = configureStore({
  // Merge new slice into overall Redux store
  // Map reducers
  // Now wiring it up
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
