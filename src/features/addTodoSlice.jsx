import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
};

export const todoValueSlice = createSlice({
  name: "todoValue",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = todoValueSlice.actions;
export default todoValueSlice.reducer;