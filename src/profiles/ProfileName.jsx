import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

export default function ProfileName() {
  const name = useContext(ProfileContext);

  return (
    <h1>{name}</h1>
  );
}