import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function AddNew({ callback, link }) {
  return (
    <Link
      href={link}
      className="group center-col p-4 rounded border-2 border-red-400 card-shadow min-w-[220px] min-h-[300px] overflow-hidden cursor-pointer hover:bg-red-100"
      onClick={callback}
    >
      <AiOutlinePlus className="w-16 h-16 p-3 bg-white rounded rounded-full text-red-400 border-2 border-red-600 group-hover:bg-red-100" />
      <span className="font-bold">Add New</span>
    </Link>
  );
}
