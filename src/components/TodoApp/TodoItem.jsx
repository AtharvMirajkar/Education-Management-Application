import React from "react";

function TodoItem({ todoName, todoDate, todoId, onDeleteClick, onEditClick }) {
  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      <div className="border rounded p-4 mb-2 bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex flex-grow-1">
            <p style={{ fontWeight: "600", marginBottom: "0" }}>{todoName}</p>
            <p
              className="pl-4"
              style={{ marginBottom: "0", marginLeft: "1.5rem" }}
            >
              {formatDate(todoDate)}
            </p>
          </div>
          <div className="d-flex mt-3 mt-md-0 gap-4">
            <button
              type="button"
              className="btn btn-primary btn-sm mr-1 px-4"
              onClick={() => onEditClick(todoId)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm px-3"
              onClick={() => onDeleteClick(todoId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
