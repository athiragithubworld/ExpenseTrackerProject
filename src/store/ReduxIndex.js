import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from "./ExpenseSlice";
import themeReducer from "./ThemeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    themeMode: themeReducer,
  },
});

export default store;
