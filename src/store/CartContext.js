import React from "react";

const CartContext = React.createContext({
  expenseList: [],
  totalExpense: 0,
  addExpense: (item) => {},
});

export default CartContext;
