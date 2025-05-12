import { useImmerReducer } from "use-immer";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const defaultValue = [
  {
    id: 1,
    text: "Belajar HTML",
    isDone: true,
  },
  {
    id: 2,
    text: "Belajar CSS",
    isDone: true,
  },
  {
    id: 3,
    text: "Belajar Javascript",
    isDone: true,
  },
  {
    id: 4,
    text: "Belajar ReactJS",
    isDone: true,

  }
]

function noteReducer(draft, action) {
  if(action.type === "ADD_NOTE") {
    draft.push({
      id: draft.length + 1,
      text: action.text,
      isDone: false,
    }) 
  } else if (action.type === "CHANGE_NOTE") {
      const index = draft.findIndex((note) => note.id === action.id)
      draft[index].text = action.text;
      draft[index].isDone = action.isDone;
  } else if (action.type === "DELETE_NOTE") {
    const index = draft.findIndex((note) => note.id === action.id)
    draft.splice(index, 1);
  }
}

export default function NoteApp() {

  const [items, dispatch] = useImmerReducer(noteReducer, defaultValue);

  function addItem(text) {
    dispatch({
      type: "ADD_NOTE",
      text: text 
    });
  }

  function deleteByID(id) {
    dispatch({
      type: "DELETE_NOTE",
      id: id,
    })
  }

  function updateByID(note) {
   dispatch({
    type: "CHANGE_NOTE",
    id: note.id,
    text: note.text,
    isDone: note.isDone,
   })
  }

  return (
    <div>
      <NoteForm onSubmit={addItem}/>
      <NoteList items={items} onDelete={deleteByID} onUpdate={updateByID}/>
    </div>
  );
}