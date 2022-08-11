import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalVisible: false,
};

export const modalVisibleSlice = createSlice({
  name: "modalVisible",
  initialState,
  reducers: {
    setIsModalVisible: (state, action) => {
      state.isModalVisible = action.payload;
    },
  },
});

export const { setIsModalVisible } = modalVisibleSlice.actions;
export default modalVisibleSlice.reducer;
