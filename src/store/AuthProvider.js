import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  let Loginstring = localStorage.getItem("emailobj");
  const [token, setToken] = useState(Loginstring);

  const [email, setEmail] = useState("");

  let logintoken = "";

  useEffect(() => {
    const Loginobj = JSON.parse(Loginstring);

    if (Loginobj !== null) {
      logintoken = Loginobj.token;
      setToken(logintoken);
    }
  }, [Loginstring]);

  const userLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
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
