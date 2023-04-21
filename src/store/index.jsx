import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.slice";
import isLoading from "./slices/isLoading.slice";
import carProducts from "./slices/carProducts.slice";

export default configureStore({
  reducer: {
    products,
    isLoading,
    carProducts,
  },
});
