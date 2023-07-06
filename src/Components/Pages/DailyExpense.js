import React, { useContext, useEffect, useRef, useState } from "react";
import "./DailyExpense.css";
import CartContext from "../../store/CartContext";

const DailyExpense = () => {
  const cartcnxt = useContext(CartContext);
  // console.log("cartcnxt.expenseList", cartcnxt.expenseList);
  const [expenseList, setExpenseList] = useState([]);

  const inputExpense = useRef("");
  const inputDescription = useRef("");
  const inputCategory = useRef("");

  useEffect(() => {
    setExpenseList(cartcnxt.expenseList);
  }, [cartcnxt.expenseList]);

  const addExpenseHandler = (event) => {
    event.preventDefault();

    const expenseObj = {
      expenseKey: Math.random().toString(),
      expenseAmount: inputExpense.current.value,
      expenseDescription: inputDescription.current.value,
      expenseCategory: inputCategory.current.value,
    };

    if (
      inputExpense.current.value !== "" &&
      inputDescription.current.value !== ""
    ) {
      // console.log("inside cartcontext");
      cartcnxt.addExpense(expenseObj);
    } else {
      alert("Please Enter all value");
    }

    inputExpense.current.value = "";
    inputDescription.current.value = "";
  };
  let id = 0;
  return (
    <div>
      <form className="expenseform">
        <h1 className="h1-expense">Daily Expense</h1>
        <div className="form-group">
          <label className="expenselabel" htmlFor="exampleFormControlInput1">
            Daily Expense
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Daily Expenses"
            ref={inputExpense}
          />
        </div>
        <div className="form-group">
          <label className="expenselabel" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            ref={inputDescription}
          ></input>
        </div>
        <div className="form-group">
          <label className="expenselabel" htmlFor="Category">
            Category
          </label>
          <select className="form-control" id="Category" ref={inputCategory}>
            <option>Food</option>
            <option>Travel Allowance</option>
            <option>Petrol</option>
            <option>Trip</option>
            <option>Film Tickets</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={addExpenseHandler}
          >
            Submit
          </button>
        </div>
        <div>
          {/* {console.log("inside table", expenseList)} */}
          <table className="table" style={{ marginTop: "15px" }}>
            <thead className="thead-exp">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Expense</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((item) => {
                return (
                  <tr className="row-exp" key={item.expenseKey}>
                    {/* <th className="row-exp" scope="row">
                  1
                </th> */}
                    <td>{(id = id + 1)}</td>
                    <td>$ {item.expenseAmount}</td>
                    <td>{item.expenseDescription}</td>
                    <td>{item.expenseCategory}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default DailyExpense;
