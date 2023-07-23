import React, { useContext, useEffect, useState } from "react";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { MdNightlightRound } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../../store/context/AuthContext";
import axios from "axios";
// import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { expenseActions } from "../../store/ExpenseSlice";
import { themeActions } from "../../store/ThemeSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeMode);

  // const authcntx = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  const token = useSelector((state) => state.auth.token);

  const expense = useSelector((state) => state.expenses);

  let totalExpense = expense.expenseList.reduce(
    (totalExp, newExp) =>
      (totalExp = Number(totalExp) + Number(newExp.expenseAmount)),
    0
  );

  // console.log("total exp ", totalExpenses);
  useEffect(() => {
    if (totalExpense > 10000) {
      // setDarkMode(true);
      dispatch(themeActions.changeTheme());
    } else {
      // setDarkMode(false);
    }
  }, [totalExpense]);

  const LogoutHandler = () => {
    // authcontext form
    // authcntx.logout();

    // dispatch form
    dispatch(authActions.logout());
    dispatch(expenseActions.setExpenseListNull());
  };

  const verifyEmailHandler = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
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

  const themeHandler = () => {
    dispatch(themeActions.changeTheme());
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
        {isLoggedIn && (
          <ul
            style={{
              listStyle: "none",
              marginTop: "15px",
              backgroundColor: "rgb(196, 127, 226)",
              borderRadius: "10px",
              padding: "10px",
              textEmphasisColor: "white",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {isLoggedIn && (
              <li>
                <Link to="/dailyexpense">Daily Expense</Link>{" "}
              </li>
            )}
          </ul>
        )}
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
                <span>
                  {theme.darkMode ? (
                    <button
                      onClick={themeHandler}
                      type="button"
                      className="btn btn-outline-dark"
                      style={{ borderRadius: "20px" }}
                    >
                      Light Mode :<BsFillBrightnessHighFill />
                    </button>
                  ) : (
                    <button
                      onClick={themeHandler}
                      type="button"
                      className="btn btn-outline-light"
                      style={{ borderRadius: "20px" }}
                    >
                      Dark Mode :
                      <MdNightlightRound />
                    </button>
                  )}
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
