import React, { useRef, useContext, useEffect } from "react";
import AuthContext from "../../store/context/AuthContext";
import "./ContactDetails.css";
import axios from "axios";

const ContactDetails = (props) => {
  const authcntx = useContext(AuthContext);

  const inputName = useRef("");
  const inputUrl = useRef("");

  useEffect(() => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU",
        {
          idToken: authcntx.token,
        }
      )
      .then((response) => {
        // console.log("getresponse1", response.data.users);
        const loginUser = response.data.users;
        const userName = loginUser[0].displayName;
        const userUrl = loginUser[0].photoUrl;

        inputName.current.value = userName;
        inputUrl.current.value = userUrl;
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, [authcntx.token]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputName.current.value;
    const enteredUrl = inputUrl.current.value;

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU",
        {
          idToken: authcntx.token,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log("profilesubmit", response);
      })
      .catch((error) => {
        console.log("err", error);
      });

    // inputName.current.value = "";
    // inputUrl.current.value = "";
  };

  return (
    <div className="contact-form">
      <span className="heading">
        Contact Us
        <button
          type="button"
          className="btn btn-outline-danger"
          style={{ marginLeft: "35rem" }}
          onClick={props.onClose}
        >
          Cancel
        </button>
      </span>

      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
        <input type="text" required="" ref={inputName} />
        <label htmlFor="url"> Profile Photo URL:</label>
        <input type="url" id="url" ref={inputUrl} required="" />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ContactDetails;
