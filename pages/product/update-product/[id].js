import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemPanes from "@/components/ItemPanes";

export default function UpdateProduct() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/product", id);
      setProduct(res.data);
    };
    getData();
  }, []);
  if (!product) {
    return <h2>Loading....</h2>;
  }
  return (
    <div>
      {product.map((item) => (
        <ItemPanes data={item} />
      ))}
    </div>
  );
}
