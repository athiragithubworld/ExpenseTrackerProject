import React, { useState, useRef, useContext } from "react";
import "./LoginPage.css";
import AuthContext from "../../store/context/AuthContext";
import axios from "axios";
// import Header from "../Layouts/Header";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";

const LoginPage = () => {
  const dispatch = useDispatch();

  // const authcntx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;

    if (enteredEmail.includes("@") && enteredPassword.trim().length > 6) {
      let url = "";
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU";
      } else {
        const enteredConfirmPassword = inputConfirmPassword.current.value;
        if (enteredPassword === enteredConfirmPassword) {
          url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU";
        } else if (enteredPassword !== enteredConfirmPassword) {
          return alert(" Please enter same password ");
        }
        inputConfirmPassword.current.value = "";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              let errormessage = "Authentication Failed";
              // if (data && data.error && data.error.message) {
              //   errormessage = data.error.message;
              // }

              throw new Error(errormessage);
            });
          }
        })
        .then((data) => {
          console.log("loginid", data.idToken);

          const email = data.email.replace(/[@.]/g, "");

          // authcontext api
          // authcntx.login(data.idToken, email);

          // dispatch the value
          dispatch(authActions.login({ token: data.idToken, email: email }));

          // console.log("email", email);
          // cartcntx.addProduct({ email: email });
          // navigate("/store");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      return alert("Please enter valid data");
    }

    inputEmail.current.value = "";
    inputPassword.current.value = "";
  };

  const resetPasswordHandler = () => {
    if (inputEmail.current.value !== "") {
      setLoading(true);
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU",
          {
            requestType: "PASSWORD_RESET",
            email: inputEmail.current.value,
          }
        )
        .then((response) => {
          setLoading(false);
          console.log(response);
          alert("Open your Email and reset password");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please Enter Valid Email");
    }
  };

  return (
    <div className="container">
      {/* <input id="register_toggle" type="checkbox" /> */}
      <div className="slider">
        <form className="form" onSubmit={submitHandler}>
          <span className="title">{isLogin ? "Login" : "Sign Up"}</span>
          <div className="form_control">
            <input required className="input" type="text" ref={inputEmail} />
            <label className="label">Email </label>
          </div>
          <div className="form_control">
            <input
              required
              className="input"
              type="password"
              ref={inputPassword}
            />
            <label className="label">Password</label>
          </div>
          {!isLogin && (
            <div className="form_control">
              <input
                required
                className="input"
                type="password"
                ref={inputConfirmPassword}
              />
              <label className="label"> Confirm Password</label>
            </div>
          )}
          {isLogin && (
            <span className="bottom_text" onClick={resetPasswordHandler}>
              {!loading ? "Forget Password ?" : "Loading..."}
            </span>
          )}
          <button>{isLogin ? "Login" : "Sign Up"}</button>

          <span className="bottom_text" onClick={switchAuthModeHandler}>
            {isLogin
              ? "Create new account ? Sign Up "
              : "Already have an account? Login"}

            {/* <label className="bottom_text" onClick={switchAuthModeHandler}>
                {isLogin ? "Sign Up" : "Login"}
              </label> */}
          </span>
        </form>

        {/* <form className="form">
            <span className="title">Login</span>
            <div className="form_control">
              <input required className="input" type="text" />
              <label className="label">Email Id</label>
            </div>
            <div className="form_control">
              <input required className="input" type="password" />
              <label className="label">Password</label>
            </div>
            <button>Login</button>

            <span className="bottom_text">
              Don't have an account?{" "}
              <label className="swtich" for="register_toggle">
                Sign Up
              </label>{" "}
            </span>
          </form> */}
      </div>
    </div>
  );
};

export default LoginPage;
