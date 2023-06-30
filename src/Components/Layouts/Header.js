import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import classes from "./Header.module.css";

const Header = () => {
  const authcntx = useContext(AuthContext);
  const isLoggedIn = authcntx.isLoggedIn;

  const LogoutHandler = () => {
    authcntx.logout();
  };

  return (
    <nav
      className="navbar bg-body-tertiary"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <div className="navbar-brand mb-0 h1">
          <span
            style={{
              color: "white",
              fontSize: "50px",
              fontFamily: "Arila",
              fontWeight: "bold",
              fontStyle: "oblique",
              marginLeft: 0,
              textAlign: "left",
            }}
          >
            {!isLoggedIn ? "Expense Tracker" : "Welcome to Expense Tracker"}
          </span>
        </div>
        <ul>
          {/* {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )} */}

          {isLoggedIn && (
            <li>
              <button onClick={LogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
