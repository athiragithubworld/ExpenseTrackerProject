import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";

const AuthProvider = (props) => {
  const cartcntx = useContext(CartContext);
  // console.log("epx123", cartcntx.expenseList);

  let Loginstring = localStorage.getItem("emailobj");
  const [token, setToken] = useState(Loginstring);

  const [email, setEmail] = useState("");

  let logintoken = "",
    loginEmail = "";

  useEffect(() => {
    const Loginobj = JSON.parse(Loginstring);

    if (Loginobj !== null) {
      logintoken = Loginobj.token;
      loginEmail = Loginobj.email;
      setToken(logintoken);
      setEmail(loginEmail);
    }
  }, [Loginstring]);

  const userLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    cartcntx.expenseList = [];
    localStorage.removeItem("emailobj");
  };

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    const emailobj = { token: token, email: email };
    localStorage.setItem("emailobj", JSON.stringify(emailobj));
  };

  const contxtvalue = {
    token: token,
    email: email,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contxtvalue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
