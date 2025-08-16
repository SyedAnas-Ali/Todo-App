import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Read input value
  function readInputValue(event) {
    setInput(event.target.value);
  }

  // Add new todo
  function addTodo() {
    if (!input) return alert("Todo is Required");
    setTodoList([...todoList, input]);
    setInput("");
  }

  // Delete todo by index
  function deleteTodo(index) {
    const copyList = [...todoList];
    copyList.splice(index, 1);
    setTodoList(copyList);
  }

  // Start editing
  function startEdit(index) {
    setInput(todoList[index]);   // put todo text into input bar
    setIsEditing(true);          // switch mode
    setEditIndex(index);         // remember which todo we’re editing
  }

  // Update todo
  function updateTodo() {
    if (!input) return alert("Todo is Required");

    const copyList = [...todoList];
    copyList[editIndex] = input; // replace old todo with new input
    setTodoList(copyList);

    // reset state
    setInput("");
    setIsEditing(false);
    setEditIndex(null);
  }

  return (
    <div className="app-container">
      <h1>Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Input a Todo"
          value={input}
          onChange={readInputValue}
        />
        {isEditing ? (
          <button className="update-btn" onClick={updateTodo}>
            Update
          </button>
        ) : (
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        )}
      </div>

      <h2>Todos:</h2>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <div className="actions">
              <button className="edit-btn" onClick={() => startEdit(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
