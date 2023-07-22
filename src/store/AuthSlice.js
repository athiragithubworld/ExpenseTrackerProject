import { createSlice } from "@reduxjs/toolkit";

const intialAuthState = {
  token: !localStorage.getItem("emailobj")
    ? null
    : JSON.parse(localStorage.getItem("emailobj")).token,
  email: !localStorage.getItem("emailobj")
    ? null
    : JSON.parse(localStorage.getItem("emailobj")).email,
  userLoggedIn: !localStorage.getItem("emailobj")
    ? false
    : JSON.parse(localStorage.getItem("emailobj")).userLoggedIn,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: intialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.userLoggedIn = true;
      // console.log("login111-", state.userLoggedIn);
      const emailobj = {
        token: action.payload.token,
        email: action.payload.email,
        userLoggedIn: true,
      };
      localStorage.setItem("emailobj", JSON.stringify(emailobj));
    },

    logout(state) {
      state.token = null;
      state.email = null;
      state.userLoggedIn = false;
      localStorage.removeItem("emailobj");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
