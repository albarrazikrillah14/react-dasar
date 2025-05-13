import { useParams } from "react-router";

export default function NotFound() {
  const params = useParams();
  return (
    <div>
      <h1>Not Found {params["*"]}</h1>
    </div>
  );
}