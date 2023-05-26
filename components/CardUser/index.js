import Image from "next/image";
import { formatMoney } from "@/utils";

export default function UserCard({ data }) {
  console.log(data);
  if (!data || data.length === 0) {
    return (
      <div>
        <h2 className="font-bold uppercase oswald text-2xl">Cart</h2>
        <span>Haven not purchased any products before</span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-bold uppercase oswald text-2xl">Cart</h2>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="border relative rounded-xl flex my-2 p-2"
          >
            <Image src={item.img} width={100} height={100} alt="" />
            <div className="flex flex-col justify-around ml-2">
              <span className="capitalize font-bold">{item.name}</span>
              <span className="roboto">{formatMoney(item.price)}₫</span>
            </div>
            <div className="absolute right-4 ">
              <span>số lượng :</span>
              <span>{item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
