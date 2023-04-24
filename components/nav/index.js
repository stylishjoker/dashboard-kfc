import Image from "next/image";
import Logo from "/assets/logo.svg";
import { VscSignOut } from "react-icons/vsc";

export default function Nav({ displayName, photoURL, callback }) {
  return (
    <div className="flex flex-row justify-around py-2">
      <h2 className="font-bold text-2xl uppercase">E-commerce</h2>
      <Image src={Logo} width={70} height={30} alt="" />
      <div className="center-row rounded overflow-hidden">
        <Image src={photoURL} width={30} height={30} alt="" />
        <span className="text-[13px] leading-[30px] px-2 h-[30px] bg-[#ccc]">
          {displayName}
        </span>
        <VscSignOut className="w-7 h-7 ml-2" onClick={callback} />
      </div>
    </div>
  );
}
