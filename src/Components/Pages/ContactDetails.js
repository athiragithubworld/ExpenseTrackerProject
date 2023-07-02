import React, { useRef, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import "./ContactDetails.css";

const ContactDetails = (props) => {
  const authcntx = useContext(AuthContext);

  const inputName = useRef("");
  const inputUrl = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputName.current.value;
    const enteredUrl = inputUrl.current.value;

    // const token = authcntx.token.toString();

    // console.log("token2", token.toString());
    // // console.log("name", enteredName);
    // // console.log("url", enteredUrl);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCxXXlq-KNU4vnkfR5NMnPqgwRPh5OF-PU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authcntx.token,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("err", error);
      });

    inputName.current.value = "";
    inputUrl.current.value = "";
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
