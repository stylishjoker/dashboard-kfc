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
      const res = await axios.post("/api/item", { id, name: "products" });
      const data = await res.data;
      setProduct({ ...data, id });
    };
    getData();
  }, []);
  if (!product) {
    return <h2>Loading....</h2>;
  }
  return (
    <>
      <ItemPanes data={product} />
    </>
  );
}
