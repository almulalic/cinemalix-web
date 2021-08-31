import { createSlice } from "@reduxjs/toolkit";

export const sidebarReducer = createSlice({
  name: "movieData",
  initialState: {
    currentPage: 0,
  },
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCurrentPage } = sidebarReducer.actions;

export default sidebarReducer.reducer;
