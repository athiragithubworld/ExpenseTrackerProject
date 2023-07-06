import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import axios from "axios";
// import classes from "./Header.module.css";

const Header = (props) => {
  const authcntx = useContext(AuthContext);
  const isLoggedIn = authcntx.isLoggedIn;

  const LogoutHandler = () => {
    authcntx.logout();
  };

  const verifyEmailHandler = () => {
    // console.log("id", authcntx.token);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU",
        {
          requestType: "VERIFY_EMAIL",
          idToken: authcntx.token,
        }
      )
      .then((response) => {
        console.log(response);

        alert("Email Verified Sucessfully");
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.message) {
          let responsedata = error.response.data;
          alert(responsedata.error.message);
        }
      });
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
              fontSize: "30px",
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
              <Link to="/dailyexpense">Daily Expense</Link>
            </li>
          )}
        </ul>
        <ul style={{ listStyle: "none" }}>
          {isLoggedIn && (
            <div>
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
              </li>

              <li>
                <span>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
                    style={{ borderRadius: "20px" }}
                    onClick={verifyEmailHandler}
                  >
                    Verify Email
                  </button>
                </span>
                <span style={{ marginLeft: "120px" }}>
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
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
