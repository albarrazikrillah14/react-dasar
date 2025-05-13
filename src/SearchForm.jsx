import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function SearchForm() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  function handleSearch() {
    navigate({
      pathname: "/products",
      search: `?search=${search}`
    })
  }

  return (
    <div>
      <h1>Search Products</h1>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}