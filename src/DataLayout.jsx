import { Outlet } from "react-router";
import SearchForm from "./SearchForm";

export default function DataLayout() {
  return (
    <div>
      <h1>This is Header</h1>
      <SearchForm/>
      <Outlet/>
      <p>this is footer</p>
    </div>
  );
}