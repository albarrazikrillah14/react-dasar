import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Timer from "./Timer";


createRoot(document.getElementById("root"))
  .render(
    <StrictMode>
      <Timer/>
    </StrictMode>
  )