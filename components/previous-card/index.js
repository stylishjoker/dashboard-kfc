import Image from "next/image";
import { useState } from "react";
import { formatMoney } from "@/utils";

export default function PreviousCard(item) {
  const [show, setShow] = useState(false);
  return (
    <div
      key={item.date}
      className="relative card-shadow border border-black p-2 rounded-xl my-2"
    >
      <div>
        <span>Time: </span> <span>{item.date}</span>{" "}
      </div>
      <div>
        <span>To: </span>
        <span>
          {item.address.home}
          {item.address.wards}
          {item.address.district}
          {item.address.city}
        </span>{" "}
      </div>
      <div>
        <span>Total: </span> <span>{formatMoney(item.total)}₫</span>
      </div>
      <div
        onClick={() => setShow(!show)}
        className="absolute right-4 hover:card-shadow rounded-xl top-[30px] cursor-pointer border border-red-500 px-3"
      >
        Detail
      </div>
      <ul className={!show ? "hidden" : "block"}>
        {item.list_item.map((_item) => (
          <li
            key={_item.id}
            className="border relative rounded-xl flex my-2 p-2"
          >
            <Image src={_item.img} width={100} height={100} alt="" />
            <div className="flex flex-col justify-around ml-2">
              <span className="capitalize font-bold">{_item.name}</span>
              <span className="roboto">{formatMoney(_item.price)}₫</span>
            </div>
            <div className="absolute right-4 ">
              <span>số lượng :</span>
              <span>{_item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
