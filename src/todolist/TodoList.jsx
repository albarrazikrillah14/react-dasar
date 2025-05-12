import Todo from "./todo";

export default function TodoList() {
  const data = [
    {
      id: 0,
      text: "Learn HTML",
      isCompleted: true,
    },
    {
      id: 1,
      text: "Learn CSS",
      isCompleted: true,
    },
    {
      id: 3,
      text: "Learn JavaScript",
      isCompleted: true,
    },
    {
      id: 4,
      text: "Learn ReactJs",
      isCompleted: false,
    }
  ];

  return (
    <ul>
      { data.map((todo) => ( <Todo key={todo.id} {...todo}/> )) }
    </ul>
  );
}