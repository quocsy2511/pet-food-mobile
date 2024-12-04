import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user/user";
import cartReducers from "./cart/cart";

export const store = configureStore({
  reducer: {
    userReducers: userReducers,
    cartReducers: cartReducers,
  },
});
