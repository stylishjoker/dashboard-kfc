import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

export default function UserFace({ id, img, callback, name, account }) {
  return (
    <div className="center-col">
      <Image
        src={img}
        className="rounded-full w-28 h-28"
        width={100}
        height={100}
        alt=""
      />
      <span className="font-semibold text-center text-xl">{name}</span>
      <span className="text-sm text-slate-600">{account}</span>
      <button className="bg-red-400 px-3 py-1 rounded-3xl text-white font-semibold text-sm">
        view profile
      </button>
      {/* <div>
        <Button handleClick={callback}>delete</Button>
        <Link href={`/users/update-user/${id}`}>Edit</Link>
      </div> */}
    </div>
  );
}
