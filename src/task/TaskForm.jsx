import { useState } from "react";

export default function TaskForm({onSubmit}) {
  let [item, setItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(item);

    setItem("");
  }

  function handleChange(e) {
    setItem(e.target.value);
  }

  return (
    <div>
      <h1>Create Task</h1>
      <form>
        <input type="text" value={item} onChange={handleChange} />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}