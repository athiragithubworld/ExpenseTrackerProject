import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
// import classes from "./Header.module.css";

const Header = (props) => {
  const authcntx = useContext(AuthContext);
  const isLoggedIn = authcntx.isLoggedIn;

  const LogoutHandler = () => {
    authcntx.logout();
  };

  return (
    <nav
      className="navbar navbar-expand-lg bd-navbar sticky-top"
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
              // marginLeft: 0,
              // textAlign: "left",
            }}
          >
            {!isLoggedIn ? "Expense Tracker" : "Welcome to Expense Tracker"}
          </span>
        </div>
        <ul style={{ listStyle: "none" }}>
          {isLoggedIn && (
            <li>
              <label
                // className={classes.label}
                style={{
                  marginTop: "15px",
                  color: "white",
                  backgroundColor: "rgb(76, 18, 211)",
                  borderRadius: "20px",
                  padding: "5.5px",
                  // gap: "10px",
                }}
              >
                Your Profile is Incomplete.
                <Link to="/contact" onClick={props.onClicks}>
                  Complete Now
                </Link>
              </label>
              <span style={{ marginLeft: "10px" }}>
                <button
                  style={{ borderRadius: "20px" }}
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={LogoutHandler}
                >
                  Logout
                </button>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
