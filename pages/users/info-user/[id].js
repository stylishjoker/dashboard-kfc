import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { toastify } from "@/components/Toastify";
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
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [cart, setCart] = useState(null);
  const [previousOrder, setPreviousOrder] = useState(null);

  const getUser = async () => {
    const res = await axios.get("/api/users", { id });
    const data = await res.data;
    const user = data[0];
    setAccount(user.account);
    setPassword(user.password);
    setPhone(user.phone);
    setName(user.name);
    setLoading(true);
  };
  const handleSave = async () => {
    try {
      const data = { id, account, password, name, phone };
      const response = await axios.put("/api/users", data);
      const result = response.data;
      if (result) {
        toastify({ title: "Update account successful", type: "success" });
      } else {
        toastify({ title: "Account already exists", type: "error" });
      }
    } catch (error) {
      toastify({ title: "Something went wrong", type: "error" });
    }
  };
  const getCart = async () => {
    const res = await axios.post("/api/item", { id, name: "cart" });
    const data = await res.data;
    if (data) {
      setCart(data.arrayCart);
    }
  };
  const getPreviousOrder = async () => {
    const res = await axios.post("/api/item", { id, name: "previous-order" });
    const data = await res.data;
    if (data) {
      setPreviousOrder(data.items);
    }
  };
  useEffect(() => {
    getUser();
    getPreviousOrder();
    getCart();
  }, []);
  const ShowPassword = () => {
    return show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />;
  };
  if (loading === false) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div className="flex flex-row container justify-around h-[90vh]">
      <div className="flex-30 relative">
        <div className="card-shadow sticky top-[100px] flex flex-col rounded-xl overflow-hidden">
          <Avatar />
          <div className="flex flex-col px-3">
            <input
              className="outline-0 font-bold text-2xl text-center uppercase my-2 cursor-pointer"
              value={name}
              onChange={(text) => setName(text.target.value)}
            />
            <div className="relative flex flex-row justify-between">
              <input
                className="outline-0  bg-white"
                value={account}
                onChange={(text) => setAccount(text.target.value)}
                disabled={true}
              />
              <input
                className="text-right outline-0 pr-6 cursor-pointer"
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
              <span className="uppercase font-semibold">number phone :</span>
              <input
                className="flex-grow p-1 outline-0 cursor-pointer"
                value={phone}
                onChange={(text) => setPhone(text.target.value)}
              />
            </div>
          </div>
          <div className="text-center p-4">
            <Button
              handleClick={handleSave}
              bg="bg-red-300 border-2 border-red-400"
              text="text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-60">
        <UserPayment data={previousOrder} />
        <UserCard data={cart} />
      </div>
    </div>
  );
}
