import React, { useContext, useEffect } from "react";
import LoginPage from "./Components/Authentication/LoginPage";
import Header from "./Components/Layouts/Header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "./store/AuthContext";

function App() {
  const authcntx = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(authcntx.isLoggedIn);
  //   if (authcntx.isLoggedIn) {
  //     navigate("/home");
  //   }
  // }, [authcntx.isLoggedIn]);

  return (
    <div>
      <Header></Header>
      {!authcntx.isLoggedIn && <LoginPage></LoginPage>}
      <Routes>
        {/* {authcntx.isLoggedIn && <Route path="/home" element={<Header />} />} */}
      </Routes>
    </div>
  );
}

export default App;
