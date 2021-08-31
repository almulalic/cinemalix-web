import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarReducer";
import { useDispatch } from "react-redux";
import languageReducer from "./features/languageReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    language: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
