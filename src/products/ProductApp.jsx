import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductApp() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.info("tes");
    
    if (!loaded) {
      fetch("/products.json")
        .then((response) => response.json())
        .then((response) => setProducts(response.data))

    }
    return () => {
      setLoaded(true);
    }
  },)

  return (
    <div>
      <h1>List Product</h1>
      {
        products.length === 0 ?
          <p>tidak ada produk yang tersedia</p> :
          <ul>
            {
              products.map((product) => <Product key={product.id} {...product} />)
            }
          </ul>
      }
    </div>
  );
}