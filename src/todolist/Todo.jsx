import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoByID, getTodoByID, updateTodoByID } from "./todoListSlicie";
import { useState } from "react";

export default function Todo({ id }) {
  const [isEditing, setIsEditing] = useState(false);

  const todo = useSelector((state) => getTodoByID(state, { id: id }))
  const [name, setName] = useState(todo.name);

  const dispatch = useDispatch();

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteTodoByID({ id: id }));
  }

  function handleUpdate(e) {
    e.preventDefault();
    dispatch(updateTodoByID({
      id: id,
      name: name
    }));
    setIsEditing(false);
  }

  return (
    <div>
      <p>
        {
          isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> :
            name
        }
        {
          isEditing ?
            <button onClick={handleUpdate}>Save</button> :
            <button onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}>Edit</button>
        }
        <button onClick={handleDelete}>Delete</button>
      </p>
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired
}