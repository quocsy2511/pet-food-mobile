import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    todo: (state, action) => { },
    initUser: (state, action) => {
      const user = action.payload.user;
      state.user = user;
    },
  },
});

export const todo = userSlice.actions.todo;
export const initUser = userSlice.actions.initUser;

export default userSlice.reducer;
