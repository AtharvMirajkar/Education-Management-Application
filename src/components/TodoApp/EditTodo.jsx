import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function EditTodo({ todoItem, onSaveEdit, onCancelEdit }) {
  const [editedTodoName, setEditedTodoName] = useState(todoItem.name);
  const [editedDueDate, setEditedDueDate] = useState(todoItem.dueDate);

  const handleSaveEdit = () => {
    onSaveEdit(todoItem.id, editedTodoName, editedDueDate);
  };

  return (
    <Modal show={true} onHide={onCancelEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-2"
          value={editedTodoName}
          onChange={(e) => setEditedTodoName(e.target.value)}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelEdit}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTodo;
