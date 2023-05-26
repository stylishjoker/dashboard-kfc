import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/utils";
import axios from "axios";
import CardLoader from "../card-loader";
import { useState } from "react";

export default function CardFood({ description, name, img, price, id }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const handleDelete = async () => {
    setLoading(true);
    const res = await axios.delete(`/api/product?id=${id}`);
    const data = await res.data;
    if (data.success) {
      setLoading(false);
      setShow(false);
    }
  };
  return (
    <div
      className={`relative rounded card-shadow p-[10px] ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="overflow-hidden">
        <Image
          className="min-h-48 w-full hover:scale-110 duration-700"
          src={img}
          width={200}
          height={200}
          alt=""
        />
      </div>
      <div className="roboto flex flex-row items-baseline justify-between px-2 text-xl font-semibold capitalize">
        <span>
          <Link href={`/product/update-product/${id}`}>{name}</Link>
        </span>
        <span>{formatMoney(price)}₫</span>
      </div>
      <p className="font-medium px-2 py-3 text-justify break-words pb-14 text-[14px] text-[#444]">
        {description}
      </p>
      <div className="absolute flex justify-around left-0 bottom-[10px] px-2 pb-2 w-[100%]">
        <Link
          className="font-bold hover:bg-red-300 hover:text-white border border-red-600 px-6 py-1 rounded-full card-shadow"
          href={`/product/update-product/${id}`}
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="font-bold hover:bg-red-300 hover:text-white border border-red-600 px-6 py-1 rounded-full card-shadow"
        >
          Delete
        </button>
      </div>

      {loading === true && <CardLoader />}
    </div>
  );
}
