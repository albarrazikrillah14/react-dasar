import { useRef, useState } from "react";

export default function Timer() {
  const [now, setNow] = useState(null);
  const [start, setStart] = useState(null);

  const timer = useRef(null);

  function handleStart(e) {
    e.preventDefault();

    setStart(Date.now());
    setNow(Date.now());
    
    timer.current = setInterval(() => {
      setNow(Date.now())
    }, 10);
  }

  function handleStop(e) {
    e.preventDefault();

    clearInterval(timer.current);
  }

  return (
    <div>
      <h1>{now - start}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}