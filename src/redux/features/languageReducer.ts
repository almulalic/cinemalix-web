import { createSlice } from "@reduxjs/toolkit";
import { bs, en } from "../../internationalization";

export const languageMap = new Map([
  ["bs", { displayName: "BS", locale: "bs", words: bs }],
  ["en", { displayName: "EN", locale: "en", words: en }],
]);

const cachedLanguage = languageMap.get(localStorage.getItem("language")) || {
  displayName: "BS",
  locale: "bs",
  words: bs,
};

export const languageReducer = createSlice({
  name: "language",

  initialState: {
    displayName: cachedLanguage.displayName,
    locale: cachedLanguage.locale,
    words: cachedLanguage.words,
  },
  reducers: {
    changeLanguage: (state, action) => {
      const { displayName, locale, words } = languageMap.get(action.payload);
      state.displayName = displayName;
      state.locale = locale;
      state.words = words;
    },
  },
});

export const { changeLanguage } = languageReducer.actions;

export default languageReducer.reducer;
