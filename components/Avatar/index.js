import Image from "next/image";

export default function Avatar() {
  return (
    <Image
      className="w-[250px] h-[250px] mt-2 m-auto rounded-full"
      src={
        "https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"
      }
      width={100}
      height={100}
      alt=""
    />
  );
}
