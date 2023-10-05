import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    // Add other reducers here if needed
  },
});

export default store;