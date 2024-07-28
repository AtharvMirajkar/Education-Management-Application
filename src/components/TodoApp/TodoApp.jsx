import React, { useState, useEffect } from "react";
import axios from "axios";
import AppName from "./AppName";
import AddTodo from "./AddTodo";
import TodoItems from "./TodoItems";
import WelcomeMessage from "./WelcomeMessage";
import EditTodo from "./EditTodo";
import { API_URL } from "../../constants";

function TodoApp() {
  const [todoItems, setTodoItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  // Function to fetch all todo items
  const fetchTodoItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todoItems`);
      setTodoItems(response.data);
    } catch (error) {
      console.error("Error fetching todo items:", error);
    }
  };

  // Function to handle adding a new todo item
  const handleNewItem = async (itemName, itemDueDate) => {
    try {
      const response = await axios.post(`${API_URL}/api/todoItems`, {
        name: itemName,
        dueDate: itemDueDate,
      });
      setTodoItems([...todoItems, response.data]);
      console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    } catch (error) {
      console.error("Error adding new todo item:", error);
    }
  };

  // Function to handle deleting a todo item
  const handleDeleteItem = async (todoItemId) => {
    try {
      await axios.delete(`${API_URL}/api/todoItems/${todoItemId}`);
      const newTodoItems = todoItems.filter((item) => item.id !== todoItemId);
      setTodoItems(newTodoItems);
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  };

  // Function to handle editing a todo item
  const handleEditItem = (todoItemId) => {
    // Finding the todo item to edit
    const itemToEdit = todoItems.find((item) => item.id === todoItemId);
    setEditingItem(itemToEdit);
  };

  // Function to handle saving the edited todo item
  const handleSaveEdit = async (todoItemId, newName, newDueDate) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/todoItems/${todoItemId}`,
        {
          name: newName,
          dueDate: newDueDate,
        }
      );
      const updatedTodoItem = response.data;
      const updatedTodoItems = todoItems.map((item) =>
        item.id === todoItemId ? updatedTodoItem : item
      );
      setTodoItems(updatedTodoItems);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving edited todo item:", error);
    }
  };

  // Function to handle canceling edit mode
  const handleCancelEdit = () => {
    setEditingItem(null);
    console.log("Canceling edit mode");
  };

  return (
    <div className="todo-app">
      <div className="container">
        {/* Displaying the app name */}
        <div className="row">
          <div className="col">
            <AppName />
          </div>
        </div>
        {/* Adding new todo */}
        <div className="row">
          <div className="col">
            <AddTodo onNewItem={handleNewItem} />
          </div>
        </div>
        {/* Displaying welcome message if no todos, else displaying todo items */}
        <div className="row">
          <div className="col">
            {todoItems.length === 0 && <WelcomeMessage />}
            <TodoItems
              todoItems={todoItems}
              onDeleteClick={handleDeleteItem}
              onEditClick={handleEditItem}
            />
          </div>
        </div>

        {/* Displaying edit todo component if in edit mode */}
        {editingItem && (
          <div className="row">
            <div className="col">
              <EditTodo
                todoItem={editingItem}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
