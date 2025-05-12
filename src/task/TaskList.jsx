export default function TaskList({items = []}) {
  return (
    <div>
      <h1>List Task</h1>
      <ul>
        {items.map((item) => <li>{item}</li>)}
      </ul>
    </div>
  );
}