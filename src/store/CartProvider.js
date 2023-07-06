import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  // console.log("object", props);
  const [expensesList, setExpensesList] = useState([]);

  const addExpenseHandler = (expenseItem) => {
    setExpensesList([...expensesList, expenseItem]);
  };

  // console.log("explist", expensesList);
  const expenseItem = {
    expenseList: expensesList,
    totalExpense: 0,
    addExpense: addExpenseHandler,
  };

  return (
    <CartContext.Provider value={expenseItem}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
