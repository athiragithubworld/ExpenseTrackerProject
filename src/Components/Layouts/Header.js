import React from "react";

const Header = () => {
  return (
    <>
      <nav
        className="navbar bg-body-tertiary"
        // style={{ backgroundColor: "#2B36CE" }} // 05096D--825AEA -- 6258ED-- 631E73
      >
        <div className="container-fluid">
          <span
            className="navbar-brand mb-0 h1"
            style={{
              color: "White",
              fontSize: "50px",
              fontFamily: "Font1, sans-serif",
              fontWeight: "bold",
            }}
          >
            Expense Tracker
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
