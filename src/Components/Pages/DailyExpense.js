import React, { useContext, useEffect, useRef, useState } from "react";
import "./DailyExpense.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/ExpenseSlice";
import axios from "axios";
import { GrDocumentDownload } from "react-icons/gr";

import Papa from "papaparse";
import { saveAs } from "file-saver";

const DailyExpense = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [activePremium, setActivePremium] = useState(false);
  const [downloadFlag, setdownloadFlag] = useState(false);
  const [objId, setObjId] = useState("");

  const expense = useSelector((state) => state.expenses);

  console.log("total exp ", expense.totalExpense);
  const inputExpense = useRef();
  const inputDate = useRef();
  const inputDescription = useRef();
  const inputCategory = useRef();
  const formRef = useRef();

  // useEffect(() => {
  //   setExpenseList(cartcnxt.expenseList);
  // }, [cartcnxt.expenseList]);

  const addExpenseHandler = (event) => {
    event.preventDefault();

    let expenseObj = {
      objId: "",
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
      // add to context api
      // cartcnxt.addExpense(expenseObj);

      // add to cartslice
      dispatch(expenseActions.addExpense(expenseObj));

      if (objId) {
        console.log("put objid", objId);
        axios
          .put(
            `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${auth.email}/${objId}.json`,
            expenseObj
          )
          .then((response) => {
            console.log("put response ", response);
            // setObjId("");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(
            `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${auth.email}.json`,
            expenseObj
          )
          .then((response) => {
            console.log("res", response.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
      formRef.current.reset();
    } else {
      alert("Please Enter all value");
    }
  };

  // console.log("slice", expense.expenseList);

  const editExpenseHandler = (item) => {
    // console.log("edit item", item);

    inputExpense.current.value = item.expenseAmount;
    inputDescription.current.value = item.expenseDescription;
    inputCategory.current.value = item.expenseCategory;
    inputDate.current.value = item.expenseDate;
    setObjId(item.id);
    dispatch(expenseActions.editExpense(item));
    dispatch(expenseActions.onRestoreExpenses(item));

    // axios
    //   .get(
    //     `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${auth.email}.json`
    //   )
    //   .then((response) => {
    //     // console.log("get response", response);
    //     const data = response.data;
    //     console.log("get data", Object.entries(data));
    //     Object.entries(data).forEach((i) => {
    //       if (i[1].expenseKey === item.expenseKey) {
    //         console.log("id", i[0]);
    //         setObjId(i[0]);

    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  const deleteExpenseHandler = (item) => {
    let deleteId = item.id;

    if (deleteId) {
      axios
        .delete(
          `https://expense-tracker-project-64558-default-rtdb.firebaseio.com/dailyExepense/${auth.email}/${deleteId}.json`
        )
        .then((response) => {
          console.log("del res", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // context api function
    // cartcnxt.removeExpense(item);

    // using expenseslice
    dispatch(expenseActions.removeExpense(item));
  };

  let id = 0;
  let totalExpense = expense.expenseList.reduce(
    (totalExp, newExp) =>
      (totalExp = Number(totalExp) + Number(newExp.expenseAmount)),
    0
  );

  useEffect(() => {
    if (totalExpense > 10000) {
      setActivePremium(true);
    } else {
      setActivePremium(false);
    }
  }, [totalExpense]);

  const onActiveHandler = () => {
    setdownloadFlag(true);
    setActivePremium(false);
  };

  const dowloadExpenseExcelHandler = () => {
    // Convert data to CSV format
    const data = [];
    expense.expenseList.forEach((val) => {
      const ExpenseAmount = val.expenseAmount;
      const Date = val.expenseDate;
      const Category = val.expenseCategory;
      const Description = val.expenseDescription;

      data.push({ ExpenseAmount, Date, Category, Description });
    });
    console.log("data", data);
    const csv = Papa.unparse(data);

    // Convert CSV data into a Blob
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the CSV file using FileSaver
    saveAs(csvBlob, "Expensedata.csv");

    setActivePremium(false);
  };

  return (
    <div>
      <form className="expenseform" ref={formRef}>
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
        <div>
          <span className="totalExpenses">Total Expenses :</span>
          <span className="totalExpenses"> $ {totalExpense}</span>
          <span>
            {totalExpense > 10000 ? (
              activePremium ? (
                <button
                  type="button"
                  className="btn btn-outline-warning btn"
                  style={{ width: "150px", marginLeft: "260px" }}
                  onClick={onActiveHandler}
                >
                  Active Premium
                </button>
              ) : (
                <button
                  type="button"
                  class="btn btn-outline-success"
                  style={{
                    width: "150px",
                    // marginRight: "20px",
                    marginLeft: "260px",
                    color: "white",
                  }}
                  onClick={dowloadExpenseExcelHandler}
                >
                  {" "}
                  Expense
                  <GrDocumentDownload />
                </button>
              )
            ) : (
              ""
            )}
          </span>
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
              {expense.expenseList.map((item) => {
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
