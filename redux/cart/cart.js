import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    todo: (state, action) => {},
    updateCart: (state, action) => {
      const cart = action.payload.cart;
      state.cart = cart;
    },
  },
});

export const todo = cartSlice.actions.todo;
export const updateCart = cartSlice.actions.updateCart;

export default cartSlice.reducer;
