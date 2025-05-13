import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "./todoListSlicie";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  function handleAddTodo(e) {
    e.preventDefault();
    dispatch(createTodo({name: todo}));
    setTodo("");
  }

  return (
    <div>
      <h1>Create Todo</h1>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
      <button onClick={handleAddTodo}> Add</button>
    </div>
  );
}
