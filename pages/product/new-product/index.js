import { useState } from "react";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Link from "next/link";
import { toastify } from "@/components/Toastify";
import axios from "axios";
import Image from "next/image";
import { UpLoadFile } from "@/feature/firebase/firebaseAuth";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");

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
  const handleSave = async (ev) => {
    ev.preventDefault();
    const data = { name, description, price, type, img };
    await axios.post("/api/product", data);
    toastify({ title: "Update successfull", type: "success" });
    // setDescription("");
    // setImg("");
    // setName("");
    // setPrice("");
    // setType("");
  };

  return (
    <div className="bg-white p-4 flex flex-col min-w-[50vw] min-h-[50vh] rounded-xl">
      <div className="flex flex-row justify-around items-center">
        {/* <div>
          <input
            className="border border-[#999]"
            type="file"
            accept="image/png/jpg"
            onChange={(files) => handleSelectedFile(files.target.files)}
          />
          {img && (
            <Image className="mt-2" src={img} width={100} height={100} alt="" />
          )}
        </div> */}
        <div>
          <TextInput
            label="img"
            value={img}
            onTextChange={(text) => setImg(text)}
          />
          <TextInput
            label="Name"
            value={name}
            onTextChange={(text) => setName(text)}
          />
          <TextInput
            label="Type food"
            value={type}
            onTextChange={(text) => setType(text)}
          />
          <TextInput
            label="Price"
            value={price}
            onTextChange={(text) => setPrice(text)}
            type="number"
          />
          <div className="flex flex-col justify-center items-left mt-[20px]">
            <label className="capitalize font-semibold">description</label>
            <textarea
              rows="4"
              cols="50"
              className="block w-[100%] px-4 text-xs py-2 border border-[#ccc] mt-[5px]"
              value={description}
              onChange={(text) => setDescription(text.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around mt-6">
        <Button handleClick={handleSave} bg="bg-red-400" text="text-white">
          Save
        </Button>
        <Link href="/product">
          <Button bg="border border-red-600">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}
