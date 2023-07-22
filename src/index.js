import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./store/context/AuthProvider";
import CartProvider from "./store/context/CartProvider";
import { Provider } from "react-redux";
import store from "./store/ReduxIndex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
    {/* </AuthProvider> */}
  </BrowserRouter>
);
