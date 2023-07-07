import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  // console.log("object", props);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    // get the expense data from firebase
    axios
      .get(
        "https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense.json"
      )
      .then((response) => {
        console.log("get response", response);
        const data = response.data;
        const loadedMovies = [];
        for (const key in data) {
          loadedMovies.push({
            id: key,
            expenseKey: data[key].expenseKey,
            expenseAmount: data[key].expenseAmount,
            expenseDescription: data[key].expenseDescription,
            expenseCategory: data[key].expenseCategory,
          });
        }
        setExpensesList(loadedMovies);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const addExpenseHandler = (expenseItem) => {
    // store data in firebase

    axios
      .post(
        "https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense.json",
        expenseItem
      )
      .then((response) => {
        console.log("res", response.data);
        //    const data =  response.data;
        // const loadedMovies = {};
        // for (const key in data) {
        //   loadedMovies.push({
        //     id: key,
        //     title: data[key].title,
        //     openingText: data[key].openingText,
        //     releaseDate: data[key].releaseDate,
        //   });
        // }
      })
      .catch((error) => {
        console.log("error", error);
      });

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
