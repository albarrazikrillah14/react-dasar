import { useSelector } from "react-redux";

export default function PreviewCounter() {
  const counter = useSelector((state) => state.counter);

  return (
    <h1>Counter: {counter}</h1>
  );
}