import PropTypes from "prop-types";
import Note from "./Note";

export default function NoteList({ items, onUpdate, onDelete }) {
  return (
    <div>
      <h1>Note List</h1>
      <ul>
        {
          items.map((item) =>
            <li key={item.id}>
              <Note item={item} onUpdate={onUpdate} onDelete={onDelete} />
            </li>
        )
        }
      </ul>
    </div>
  );
}

NoteList.propTypes = {
  items: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}