import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Button from "@/components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import UserFace from "@/components/UserFace";
import AddNew from "@/components/AddNew";

export default function User() {
  const [users, setUsers] = useState();
  const handleDelete = () => {
    console.log("hehe");
  };
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/users");
      const data = await res.data;
      setUsers(data);
    };
    getData();
  }, []);
  if (users == null) {
    return <h2>Loading ......</h2>;
  }

  return (
    <div className="p-4 h-[90vh]">
      <div className="pt-2">
        <h2 className="uppercase font-bold">User name</h2>
        <ul className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <li className="relative py-2 flex flex-row justify-between items-center">
            <AddNew link="/users/add-user" />
          </li>
          {users.map((item) => (
            <li
              key={item.id}
              className="relative py-2 flex flex-row justify-between items-center"
            >
              <UserFace callback={handleDelete} {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
