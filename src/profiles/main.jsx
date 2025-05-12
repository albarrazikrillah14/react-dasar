import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Profile from "./Profile";
import ProfileName from "./ProfileName";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Profile>
      <ProfileName/>
    </Profile>
  </StrictMode>
)