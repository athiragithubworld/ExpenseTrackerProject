import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenseList: [], totalExpense: 0 };

const expenseSlice = createSlice({
  name: "expenseContext",
  initialState,
  reducers: {
    setExpenseListNull(state) {
      state.expenseList = [];
    },
    onRestoreExpenses(state, action) {
      state.expenseList = action.payload;
    },
    addExpense(state, action) {
      state.expenseList = [action.payload, ...state.expenseList];
    },
    editExpense(state, action) {
      state.expenseList = state.expenseList.filter(
        (pdt) => pdt.expenseKey !== action.payload.expenseKey
      );
    },
    removeExpense(state, action) {
      state.expenseList = state.expenseList.filter(
        (pdt) => pdt.expenseKey !== action.payload.expenseKey
      );
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
