import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserPayment from "../UserPayment";
import UserCard from "../CardUser";
import Avatar from "../Avatar";

export default function UserFace({ id, img, callback, name, account }) {
  const [show, setShow] = useState(true);
  return (
    <div className="relative center-col bg-white p-4 rounded border border-red-200 card-shadow min-w-[220px] min-h-[300px]">
      {img ? (
        <Image
          src={img}
          className="rounded-full w-28 h-28 border-[4px] border-[#ccc] my-1 block"
          width={100}
          height={100}
          alt=""
        />
      ) : (
        <Image
          src={
            "https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"
          }
          className="rounded-full w-28 h-28 border-[4px] border-[#ccc] my-1 block"
          width={100}
          height={100}
          alt=""
        />
      )}
      <span className="font-semibold text-center text-xl my-1">{name}</span>
      <span className="text-sm text-slate-600 mx-1">{account}</span>
      <Link
        href={`/users/info-user/${id}`}
        className="bg-red-400 px-3 py-1 rounded-3xl text-white font-semibold text-sm my-4 hover:border hover:border-red-400 hover:bg-white hover:text-red-500"
      >
        view profile
      </Link>
      <div
        className="absolute top-0 right-0 font-bold text-xl cursor-pointer rotate-90"
        onClick={() => setShow(!show)}
      >
        ...
      </div>
      <div
        className={`${
          show ? "hidden" : "block"
        } absolute top-[-1px] rounded right-0 flex flex-col border bg-white shadow`}
      >
        <button
          className="text-[13px] py-[2px] px-3 text-[#ccc] hover:text-black"
          handleClick={callback}
        >
          Delete
        </button>
        <Link
          className="text-[13px] py-[2px] px-3 text-[#ccc] hover:text-black"
          href={`/users/update-user/${id}`}
        >
          Edit
        </Link>
        <button
          className="text-[13px] py-[2px] px-3 text-[#ccc] hover:text-black"
          onClick={() => setShow(!show)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
