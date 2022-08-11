import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changedInputValue: "",
};

export const changedTodoValueSlice = createSlice({
  name: "changeTodoValue",
  initialState,
  reducers: {
    setChangedInputValue: (state, action) => {
      state.changedInputValue = action.payload;
    },
  },
});

export const { setChangedInputValue } = changedTodoValueSlice.actions;
export default changedTodoValueSlice.reducer;