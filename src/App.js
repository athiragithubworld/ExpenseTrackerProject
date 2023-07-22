import React, { useContext, useEffect, useState } from "react";
import LoginPage from "./Components/Authentication/LoginPage";
import Header from "./Components/Layouts/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "./store/context/AuthContext";
import ContactDetails from "./Components/Pages/ContactDetails";
import DailyExpense from "./Components/Pages/DailyExpense";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "./store/ExpenseSlice";
import axios from "axios";

function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // console.log("slice loggin", isLoggedIn);

  // const authcntx = useContext(AuthContext);

  const onRestore = () => {
    axios
      .get(
        `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${auth.email}.json`
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
        // const data = response.data;
        // const dataList = Object.values(data);
        // console.log("get data app", loadedExpense);
        dispatch(expenseActions.onRestoreExpenses(loadedExpense));
        // setExpensesList(loadedExpense);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (auth.userLoggedIn) {
      onRestore();
    }
  }, []);

  const [openCart, setOpenCart] = useState(false);

  const clickOpenCart = () => {
    setOpenCart(true);
  };

  const closeCart = () => {
    setOpenCart(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(authcntx.isLoggedIn);
    if (!auth.userLoggedIn) {
      navigate("/");
    }

    onRestore();
  }, [auth.userLoggedIn]);

  return (
    <div>
      <Header onClicks={clickOpenCart}></Header>

      <Routes>
        {!auth.userLoggedIn && <Route path="/" element={<LoginPage />}></Route>}
        {auth.userLoggedIn && openCart && (
          <Route
            path="/contact"
            element={<ContactDetails onClose={closeCart} />}
          />
        )}
        {auth.userLoggedIn && (
          <Route path="/dailyexpense" element={<DailyExpense />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
