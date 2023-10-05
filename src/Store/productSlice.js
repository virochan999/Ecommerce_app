import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
    cartProducts: [],
  },
  reducers: {
    /* Set the products to the state */
    setProducts(state, action) {
      state.products = action.payload;
    },

    /* Update the products by ID */
    updateProductById(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    /* Deletes the product using its ID */
    deleteProductById(state, action) {
      const index = state.products.findIndex((product) => product.id == action.payload)
      if(index !== -1) {
        state.products.splice(index, 1)
      }
    },

    /* Add a product to the cart */
    addProductToCart(state, action) {
      state.cartProducts = [...state.cartProducts, action.payload]
    },

    /* Store the cart items in store */
    setCartProducts(state, action) {
      state.cartProducts = action.payload
    },

    /* Remove the cart item */
    removeCartProduct(state, action) {
      state.cartProducts.splice(action, 1)
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {  
              setProducts,
              setLoading, 
              setError, 
              updateProductById, 
              deleteProductById, 
              setCartProducts, 
              removeCartProduct ,
              addProductToCart
            } = productSlice.actions;

export default productSlice.reducer;