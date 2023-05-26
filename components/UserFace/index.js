import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import CardLoader from "../card-loader";

export default function UserFace({ id, img, name, account }) {
  const [show, setShow] = useState(true);
  const [display, setDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await axios.delete(`/api/users?id=${id}`);
    const data = await res.data;
    if (data.success) {
      console.log("hêhe");
      setLoading(false);
      setDisplay(false);
    }
  };
  return (
    <div
      className={`${
        !display ? "hidden" : "flex"
      } relative flex-col items-center justify-center bg-white p-4 rounded border border-red-200 card-shadow min-w-[220px] min-h-[300px]`}
    >
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
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="text-[13px] py-[2px] px-3 text-[#ccc] hover:text-black"
          onClick={() => setShow(!show)}
        >
          Cancel
        </button>
      </div>

      {loading && <CardLoader />}
    </div>
  );
}
