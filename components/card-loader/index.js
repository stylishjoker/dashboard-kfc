import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function CardLoader() {
  return (
    <div className="absolute top-0 center-col right-0 w-[100%] h-[100%] opacity-90 bg-white text-red-400">
      <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
    </div>
  );
}
