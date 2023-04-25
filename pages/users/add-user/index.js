import Button from "@/components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "@/components/TextInput";
import { toastify } from "@/components/Toastify";
import Image from "next/image";
import { UpLoadFile } from "@/feature/firebase/firebaseAuth";

export default function AddUser() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const postData = async () => {
    const data = { account, password, name, address, img };
    const result = await axios.post("/api/users", data);
    if (result.data) {
      toastify({ title: "Create account successfull", type: "success" });
    } else {
      toastify({ title: "Account already exists", type: "error" });
    }
  };
  const handleSelectedFile = async (files) => {
    if (files && files[0].size < 10000000) {
      try {
        const { urlDownload } = await UpLoadFile(files[0]);
        setImg(urlDownload);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("File size to large");
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="bg-white p-4 flex flex-col min-w-[50vw] min-h-[50vh] rounded-xl">
      <div className="flex flex-row justify-around items-center">
        <div className="">
          <TextInput
            label="Full name"
            placeholder="Enter full name"
            type="text"
            value={name}
            onTextChange={(text) => setName(text)}
          />
          <TextInput
            label="address"
            placeholder="Enter address"
            type="text"
            value={account}
            onTextChange={(text) => setAddress(text)}
          />
          <TextInput
            label="account"
            placeholder="Enter account"
            type="text"
            value={account}
            onTextChange={(text) => setAccount(text)}
          />
          <TextInput
            label="password"
            placeholder="Enter password"
            type="text"
            value={password}
            onTextChange={(text) => setPassword(text)}
          />
          {/* <TextInput
        label="confirm password"
        placeholder="Enter confirm password"
        type="text"
      /> */}
        </div>
        <div>
          <input
            className="border border-[#999]"
            type="file"
            accept="image/png/jpg"
            onChange={(files) => handleSelectedFile(files.target.files)}
          />
          {img && (
            <Image className="mt-2" src={img} width={100} height={100} alt="" />
          )}
        </div>
      </div>
      <Button bg="bg-red-400" text="text-white" handleClick={postData}>
        create
      </Button>
    </div>
  );
}
