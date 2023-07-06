import React, { useContext, useEffect, useState } from "react";
import LoginPage from "./Components/Authentication/LoginPage";
import Header from "./Components/Layouts/Header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "./store/AuthContext";
import ContactDetails from "./Components/Pages/ContactDetails";
import DailyExpense from "./Components/Pages/DailyExpense";

function App() {
  const authcntx = useContext(AuthContext);

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
    if (!authcntx.isLoggedIn) {
      navigate("/");
    }
  }, [authcntx.isLoggedIn]);

  return (
    <div>
      <Header onClicks={clickOpenCart}></Header>

      <Routes>
        {!authcntx.isLoggedIn && (
          <Route path="/" element={<LoginPage />}></Route>
        )}
        {authcntx.isLoggedIn && openCart && (
          <Route
            path="/contact"
            element={<ContactDetails onClose={closeCart} />}
          />
        )}
        {authcntx.isLoggedIn && (
          <Route path="/dailyexpense" element={<DailyExpense />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
