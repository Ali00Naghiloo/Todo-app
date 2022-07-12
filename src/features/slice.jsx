import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: "",
};

export const counterSlice = createSlice({
  name: "todoValue",
  initialState,
  reducers: {
    increment: (state) => {
      state.todo = "hi";
    },
    deleteValue: (state) => {
      state.todo = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const { increment, deleteValue } = counterSlice.actions;

export default counterSlice.reducer;
