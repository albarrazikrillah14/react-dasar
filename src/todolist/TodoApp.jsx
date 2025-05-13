import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default function TodoApp() {
  const todos = useSelector((state) => state.todoList);

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm />
      <ul>
        {
          todos.map((todo) => (
            <li key={todo.id}>
              <Todo id={todo.id}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}