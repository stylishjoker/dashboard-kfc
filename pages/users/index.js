import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";
import UserFace from "@/components/UserFace";

export default function User() {
  const [users, setUsers] = useState();
  const handleDelete = () => {};
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/users");
      const data = await res.data;
      setUsers(data);
    };
    getData();
  }, []);
  if (!users) {
    return <h2>Loading ......</h2>;
  }
  return (
    <div className="p-4">
      <div className="z-10 bg-white">
        <Link href="/users/add-user">
          <Button bg="bg-red-600" text="text-white font-semibold uppercase">
            <AiOutlinePlus />
            add new user
          </Button>
        </Link>
      </div>
      <div className="pt-2">
        <h2 className="uppercase font-bold">User name</h2>
        <ul>
          {users.map((item) => (
            <li
              key={item.id}
              className="relative py-2 flex flex-row justify-between border-b items-center"
            >
              <UserFace callback={handleDelete} {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
