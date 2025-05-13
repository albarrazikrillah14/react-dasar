import { useParams } from "react-router";

export default function ProductDetail() {
  const params = useParams();
  return (
    <div>
      <h1>Product Detail {params.id}</h1>
    </div>
  );
}