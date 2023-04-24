import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
  const [products, setProducts] = useState([]);

  async function fetchData() {
    const response = await axios.get("/api/product");
    const data = await response.data;
    setProducts(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    const data = { id };
    await axios.delete("/api/product", data);
  };
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
      <div className="pt-2">
        <h2 className="uppercase font-bold">Product name</h2>
        <ul>
          {products.map((item) => (
            <li
              key={item.id}
              className="relative py-2 flex flex-row justify-between border-b items-center"
            >
              <div className="center-row">
                <span className="relative  ml-4 pr-10">{item.name}</span>
                <Image src={item.img} width={70} height={50} alt="" />
              </div>
              <div className="mr-10">
                <Link
                  href={`/product/update-product/${item.id}`}
                  className="text-sm capitalize border-red-400 border px-2 rounded-lg py-1 mx-2 hover:text-white hover:bg-red-400"
                >
                  edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm capitalize border-red-400 border px-2 rounded-lg py-1 mx-2 hover:text-white hover:bg-red-400"
                >
                  delete
                </button>
              </div>
              <TiArrowRightOutline className="arrow w-5 h-5 text-red-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
