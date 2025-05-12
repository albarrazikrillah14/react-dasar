import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <HelloWorld text="Belajar ReactJS"/>
      <HelloWorld text="Belajar ReactJS"/>
    </Container>
  </StrictMode>
)