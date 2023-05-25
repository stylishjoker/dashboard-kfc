import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import UserPayment from "@/components/UserPayment";
import UserCard from "@/components/CardUser";
import Avatar from "@/components/Avatar";

export default function InfoUser() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const [img, setImg] = useState(null);
  const [phone, setPhone] = useState(null);
  const getUser = async () => {
    const res = await axios.get("/api/users", { id });
    const data = res.data;
    const user = data[0];
    setAccount(user.account);
    setPassword(user.password);
    setImg(user.img);
    setAddress(user.address);
    setPhone(user.phone);
    setName(user.name);
    setLoading(true);
  };
  useEffect(() => {
    getUser();
  }, []);
  const ShowPassword = () => {
    return show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />;
  };
  if (loading === false) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div className="flex flex-row justify-around items-center h-[90vh]">
      <div className="card-shadow flex flex-col rounded-xl overflow-hidden min-h-[500px]">
        {img ? (
          <Image
            className="w-[250px] h-[250px] mt-2 m-auto rounded-full"
            src={img}
            width={100}
            height={100}
            alt=""
          />
        ) : (
          <Avatar />
        )}
        <div className="flex flex-col px-3">
          <input
            className="outline-0 font-bold text-2xl text-center uppercase my-2"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
          <div className="relative flex flex-row justify-between">
            <input
              className="outline-0"
              value={account}
              onChange={(text) => setAccount(text.target.value)}
            />
            <input
              className="text-right outline-0 pr-6"
              value={password}
              onChange={(text) => setPassword(text.target.value)}
              type={!show ? "text" : "password"}
            />
            <div
              className="cursor-pointer absolute top-[5px] right-0"
              onClick={() => setShow(!show)}
            >
              <ShowPassword />
            </div>
          </div>
          <div className="flex flex-row items-center border-b justify-between mt-2">
            <span className="uppercase font-semibold">address :</span>
            <input
              className="flex-grow p-1 outline-0"
              value={address}
              onChange={(text) => setAddress(text.target.value)}
            />
          </div>
          <div className="flex flex-row items-center border-b justify-between mt-2">
            <span className="uppercase font-semibold">number phone :</span>
            <input
              className="flex-grow p-1 outline-0"
              value={phone}
              onChange={(text) => setPhone(text.target.value)}
            />
          </div>
        </div>
        <div className="text-center p-4">
          <Button bg="bg-red-300 border-2 border-red-400" text="text-white">
            Save
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <UserPayment />
        <UserCard />
      </div>
    </div>
  );
}
