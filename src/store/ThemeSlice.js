import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode:
    localStorage.getItem("themeMode") === null
      ? false
      : JSON.parse(localStorage.getItem("themeMode")),
};

const themeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    changeTheme(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("themeMode", JSON.stringify(state.darkMode));
    },
    loginTheme(state, action) {
      state.darkMode = action.payload;
      // localStorage.setItem("themeMode", JSON.stringify(state.darkMode));
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
