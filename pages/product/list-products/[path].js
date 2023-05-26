import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardFood from "@/components/card-food";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

export default function InfoProducts() {
  const router = useRouter();
  const { path } = router.query;
  const [products, setProducts] = useState(null);
  const [tittle, setTitle] = useState(null);

  async function fecthData() {
    const res = await axios.post("/api/list", { path });
    const data = await res.data;
    console.log(data);
    if (data) {
      setProducts(data.newData);
      setTitle(data.name);
    }
  }
  useEffect(() => {
    fecthData();
  }, []);
  if (!products) {
    return <h2>Loading.......</h2>;
  }
  return (
    <div className="p-4">
      <h2 className="oswald uppercase text-2xl py-4">{tittle}</h2>
      <div className="group grid grid-flow-row gap-8 xsm:gap-0 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          className="card-shadow overflow-hidden center-col rounded"
          href={"/product/new-product"}
        >
          <AiOutlinePlus className="w-16 h-16 p-3 bg-white rounded rounded-full text-red-400 border-2 border-red-600 group-hover:bg-red-100" />
        </Link>
        {products.map((item) => (
          <CardFood key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
