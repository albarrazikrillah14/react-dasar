import PropTypes from "prop-types";
import { useState } from "react";

export default function Note({ item, onUpdate, onDelete }) {
  let [isEditing, setIsEditing] = useState(false);
  let [text, setText] = useState(item.text);

  function handleDelete(e) {
    e.preventDefault();
    onDelete(item.id);
  }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdate({
      ...item,
      text: text
    });
    setIsEditing(false);
  }

  function handleIsEditing(e) {
    e.preventDefault();
    setIsEditing(true);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleChangeDone(e) {
    onUpdate({
      ...item,
      isDone: e.target.checked
    })
  }
 

  return (
    <>
      <input type="checkbox" checked={item.isDone} onChange={handleChangeDone} />
      {
        isEditing ?
          <input type="text" value={text} onChange={handleChange} />
          : text
      }
      {
        isEditing ?
          <button onClick={handleUpdate}>Save</button>
          : <button onClick={handleIsEditing}>Edit</button>
      }
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}

Note.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}