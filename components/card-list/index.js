import Image from "next/image";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";

export default function CardList({ img, name, path }) {
  return (
    <div className="card-shadow w-[265px] overflow-hidden rounded">
      <div className="overflow-hidden">
        <Image
          className="w-[265px] h-[223px] hover:scale-110 duration-700"
          src={img}
          width={500}
          height={500}
          alt=""
        />
      </div>
      <Link
        href={`/product/list-products/${path}`}
        className="flex cursor-pointer flex-row items-center p-3 text-sm font-bold capitalize"
      >
        {name} <GrFormNext className="w-6 h-6" />
      </Link>
    </div>
  );
}
