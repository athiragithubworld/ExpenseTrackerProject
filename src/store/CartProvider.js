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
            expenseDate: data[key].expenseDate,
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
    //  store data in firebase
    console.log("expenseItem", expenseItem);
    if (expenseItem.objId) {
      axios
        .put(
          `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${expenseItem.objId}.json`,
          {
            expenseDate: expenseItem.expenseDate,
            expenseAmount: expenseItem.expenseAmount,
            expenseDescription: expenseItem.expenseDescription,
            expenseCategory: expenseItem.expenseCategory,
            expenseKey: expenseItem.expenseKey,
          }
        )
        .then((response) => {
          console.log("put response ", response);

          const updateList = expensesList.filter(
            (pdt) => pdt.id !== expenseItem.objId
          );
          console.log("put updatelist ", updateList);
          const sortList = [
            ...updateList,
            { ...response.data, id: expenseItem.objId },
          ];
          console.log("sort", sortList.sort());
          setExpensesList(sortList.sort());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
      // getExpense();
      setExpensesList([...expensesList, expenseItem]);
    }
  };

  const removeExpenseHandler = (expenseItem) => {
    axios
      .delete(
        `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${expenseItem.id}.json`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const updateList = expensesList.filter((pdt) => pdt.id !== expenseItem.id);
    setExpensesList(updateList);
  };

  const expenseItem = {
    expenseList: expensesList,
    totalExpense: 0,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };

  return (
    <CartContext.Provider value={expenseItem}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
