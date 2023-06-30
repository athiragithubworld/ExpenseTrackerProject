import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});

export default AuthContext;
