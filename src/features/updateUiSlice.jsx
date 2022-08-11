import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateUi: true,
};

export const updateUiSlice = createSlice({
  name: "updatingUI",
  initialState,
  reducers: {
    setUpdateUi: (state, action) => {
      state.updateUi = action.payload;
    },
  },
});

export const { setUpdateUi } = updateUiSlice.actions;
export default updateUiSlice.reducer;