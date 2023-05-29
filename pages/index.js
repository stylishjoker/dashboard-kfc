import Image from "next/image";
import { formatMoney } from "@/utils";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [dashboard, setDashBoard] = useState(null);

  async function fectchData() {
    const res = await axios.get("/api/dashboard");
    const data = await res.data;
    setDashBoard(data);
    console.log(data);
  }
  useEffect(() => {
    fectchData();
  }, []);
  if (!dashboard) {
    return <h2>loading .... </h2>;
  }
  return (
    <div className="flex p-4">
      <div className="flex-40">
        <h2 className="oswald text-4xl border-b border-t text-center p-2 border-black text-red-400">
          Dashboard
        </h2>
        <Image
          src={
            "https://i.pinimg.com/564x/00/f6/e3/00f6e35475e44e5dc956624a22200f4f.jpg"
          }
          width={600}
          height={600}
          alt=""
        />
      </div>
      <div className="flex-40 ml-10 p-4">
        <h2 className="oswald text-2xl">Sales Overview</h2>
        <div className="flex">
          <div className="m-2 flex flex-col justify-between border border-red-500 w-[300px] h-[80px] p-2 rounded-2xl">
            <span className="text-xs font-bold">Transactions</span>
            <span className="roboto text-2xl">
              {formatMoney(dashboard.total_pro)}
            </span>
          </div>
          <div className="m-2 flex flex-col justify-between border border-red-500 w-[300px] h-[80px] p-2 rounded-2xl">
            <span className="text-xs font-bold">Income</span>
            <span className="roboto text-2xl">
              {formatMoney(dashboard.value)}₫
            </span>
          </div>
        </div>
        <h2 className="oswald text-2xl">Analytics</h2>
        <div className="flex">
          <div className="m-2 flex flex-col justify-between border border-red-500 w-[300px] h-[80px] p-2 pl-4 rounded-2xl">
            <span className="text-xs font-bold">Registed Members</span>
            <span className="roboto text-2xl">
              {formatMoney(dashboard.registed)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
