import React, { useContext, useEffect, useRef, useState } from "react";
import "./DailyExpense.css";
import CartContext from "../../store/CartContext";

const DailyExpense = () => {
  const cartcnxt = useContext(CartContext);
  // console.log("cartcnxt.expenseList", cartcnxt.expenseList);
  const [expenseList, setExpenseList] = useState([cartcnxt.expenseList]);
  const [objId, setObjId] = useState("");

  const inputExpense = useRef("");
  const inputDate = useRef("");
  const inputDescription = useRef("");
  const inputCategory = useRef("");

  useEffect(() => {
    setExpenseList(cartcnxt.expenseList);
  }, [cartcnxt.expenseList]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    console.log("edit id ", objId);

    let expenseObj = {
      objId: objId,
      expenseKey: Math.random().toString(),
      expenseAmount: inputExpense.current.value,
      expenseDescription: inputDescription.current.value,
      expenseCategory: inputCategory.current.value,
      expenseDate: inputDate.current.value,
    };

    if (
      inputExpense.current.value !== "" &&
      inputDescription.current.value !== "" &&
      inputDate.current.value !== ""
    ) {
      // console.log("inside", expenseObj);
      cartcnxt.addExpense(expenseObj);

      inputExpense.current.value = "";
      inputDescription.current.value = "";
      inputDate.current.value = "";
    } else {
      alert("Please Enter all value");
    }
  };

  const editExpenseHandler = (item) => {
    console.log("edit item", item);

    inputExpense.current.value = item.expenseAmount;
    inputDescription.current.value = item.expenseDescription;
    inputCategory.current.value = item.expenseCategory;
    inputDate.current.value = item.expenseDate;
    setObjId(item.id);
    // const updateList = expenseList.filter(
    //   (pdt) => pdt.expenseKey !== item.expenseKey
    // );
    // setExpenseList(updateList);
  };

  const deleteExpenseHandler = (item) => {
    // console.log("delete item", item);
    cartcnxt.removeExpense(item);
  };

  let id = 0;
  return (
    <div>
      <form className="expenseform">
        <h1 className="h1-expense">Daily Expense</h1>

        <div className="form-row">
          <div class="form-group col-md-3">
            <label className="expenselabel" htmlFor="expenselabel">
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
          <div class="form-group col-md-3">
            <label className="expenselabel" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              // placeholder="Daily Expenses"
              ref={inputDate}
            />
          </div>
          <div className="form-group col-md-3">
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
          <div className="form-group col-md-3">
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
        <div className="table-responsive-sm">
          {/* {console.log("inside table", expenseList)} */}
          <table className="table" style={{ marginTop: "15px" }}>
            <thead className="thead-exp">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Date</th>
                <th scope="col">Expense</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Edit Options</th>
                <th scope="col">Delete Options</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log("expense list", expenseList)} */}
              {expenseList.map((item) => {
                return (
                  <tr className="row-exp" key={item.expenseKey}>
                    {/* <th className="row-exp" scope="row">
                  1
                </th> */}
                    <td>{(id = id + 1)}</td>
                    <td>{item.expenseDate}</td>
                    <td>$ {item.expenseAmount}</td>
                    <td>{item.expenseDescription}</td>
                    <td>{item.expenseCategory}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          editExpenseHandler(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          deleteExpenseHandler(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
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
