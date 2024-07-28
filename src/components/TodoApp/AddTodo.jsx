import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12 col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Todo Here"
            value={todoName}
            onChange={handleNameChange}
          />
        </div>
        <div className="col-12 col-md-4 mb-2">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-12 col-md-2">
          <button
            type="button"
            className="btn btn-success btn-block px-4"
            onClick={handleAddButtonClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
