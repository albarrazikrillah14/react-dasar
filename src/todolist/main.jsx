import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./todolist";
import Table from '../table/Table';
import AlertButton from "../table/AlertButton";
import Counter from "../form/Counter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoList/>
    <Table/>
    <AlertButton text="Click Me" message="You Click Me!"/>
    <Counter/>
    <Counter/>
  </StrictMode>
)