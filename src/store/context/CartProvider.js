import React, { useEffect, useState, useContext } from "react";
import CartContext from "./CartContext";
import axios from "axios";
import AuthContext from "./AuthContext";

const CartProvider = (props) => {
  const authcntx = useContext(AuthContext);
  const [expensesList, setExpensesList] = useState([]);

  const onRestore = () => {
    axios
      .get(
        `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${authcntx.email}.json`
      )
      .then((response) => {
        console.log("get response", response);
        const data = response.data;
        const loadedExpense = [];
        for (const key in data) {
          loadedExpense.push({
            id: key,
            expenseKey: data[key].expenseKey,
            expenseDate: data[key].expenseDate,
            expenseAmount: data[key].expenseAmount,
            expenseDescription: data[key].expenseDescription,
            expenseCategory: data[key].expenseCategory,
          });
        }
        setExpensesList(loadedExpense);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    onRestore();
  }, [localStorage.length]);

  useEffect(() => {
    onRestore();
  }, []);

  const addExpenseHandler = (expenseItem) => {
    //  store data in firebase
    console.log("expenseItem", expenseItem);
    if (expenseItem.objId) {
      axios
        .put(
          `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${authcntx.email}/${expenseItem.objId}.json`,
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
          // console.log("put updatelist ", updateList);
          const sortList = [
            ...updateList,
            { ...response.data, id: expenseItem.objId },
          ];
          // console.log("sort", sortList.sort());
          setExpensesList(sortList.sort());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${authcntx.email}.json`,
          expenseItem
        )
        .then((response) => {
          console.log("res", response.data);
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
        `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${authcntx.email}/${expenseItem.id}.json`
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
