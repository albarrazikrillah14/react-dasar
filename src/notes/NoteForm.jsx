import PropTypes from "prop-types";
import { useState } from "react";

export default function NoteForm({onSubmit}) {
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
      <h1>Create Note</h1>
      <input type="text" value={item} onChange={handleChange} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}