import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../config";

export default function TodoList() {
  const [todos, setTodos] = useState();
  const [newTodo, setNewTodo] = useState();

  //Create a new todo
  async function handleAddTodo() {
    const res = await axios.post(url + "new", {
      text: newTodo,
    });
    setNewTodo("");
    fetchTodos();
  }
  //Read todos
  async function fetchTodos() {
    const res = await axios.get(url);
    setTodos(res.data);
    console.log(todos);
  }
  //Update existing todo's status
  async function handleStatusChange(curId) {
    const res = await axios.put(url + "complete/" + curId);
    fetchTodos();
  }

  //Delete a todo
  async function deleteTodo(curId) {
    const res = await axios.delete(url + curId);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <ul className="list">
        {todos?.map((todo) => (
          <div>
            <span
              className={todo.complete ? "completed-item" : ""}
              onClick={() => handleStatusChange(todo._id)}
            >
              {todo.text}
            </span>
            <button className="button" onClick={() => deleteTodo(todo._id)}>
              -
            </button>
          </div>
        ))}
      </ul>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>+</button>
    </div>
  );
}
