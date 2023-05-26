import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import CardList from "@/components/card-list";

export default function Product() {
  const [products, setProducts] = useState([]);

  async function fetchData() {
    const response = await axios.get("/api/item");
    const data = await response.data;
    setProducts(data);
  }
  console.log(products);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="z-10 bg-white">
        <Link href="/product/new-product">
          <Button bg="bg-red-600" text="text-white font-semibold uppercase">
            <AiOutlinePlus />
            add new product
          </Button>
        </Link>
      </div>
      <div className="mt-4 grid grid-flow-row gap-8 xsm:gap-0 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <div className="group card-shadow border border-red-400 cursor-pointer w-[265px] overflow-hidden rounded center-col">
          <AiOutlinePlus className="w-16 h-16 p-3 bg-white rounded rounded-full text-red-400 border-2 border-red-600 group-hover:bg-red-100" />
        </div> */}
        {products.map((item) => (
          <CardList key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
