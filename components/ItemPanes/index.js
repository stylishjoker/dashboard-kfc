import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Button";
import TextInput from "../TextInput";
import { UpLoadFile } from "@/feature/firebase/firebaseAuth";
import axios from "axios";
import { useRouter } from "next/router";
import DropdownInput from "../dropdown-input";
import { toastify } from "../Toastify";

export default function ItemPanes({ data }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  const [id, setID] = useState("");
  const [allType, setAllType] = useState(null);

  const getData = () => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setImg(data.img);
      setType(data.type);
      setID(data.id);
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
  const handleSave = async () => {
    const input = { id, name, description, type, img, price };
    const res = await axios.put("/api/product", input);
    const data = await res.data;
    if (data.success) {
      toastify({ title: "Update successful", type: "success" });
    } else {
      toastify({ title: "Account already exists", type: "error" });
    }
  };
  async function fecthType() {
    const res = await axios.get("/api/item");
    const data = await res.data;
    setAllType(data);
  }
  useEffect(() => {
    fecthType();
    getData();
  }, []);
  if (!allType) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="bg-white p-4 flex flex-col min-w-[50vw] min-h-[50vh] rounded-xl">
      <div className="flex">
        <div className="flex flex-col justify-center p-2 items-center">
          <Image src={img} width={150} height={150} alt="" />
          <input
            className="border border-[#999] mt-2"
            type="file"
            onChange={(text) => handleSelectedFile(text.target.files)}
          />
        </div>
        <div className="flex-40">
          <TextInput
            label="Name"
            value={name}
            onTextChange={(text) => setName(text)}
          />
          <TextInput
            label="Price"
            value={price}
            onTextChange={(text) => setPrice(text)}
          />
          <DropdownInput
            label="Type food"
            value={type}
            data={allType}
            onTextChange={(text) => setType(text)}
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
      <div className="flex w-[400px] justify-around mt-6">
        <Button handleClick={handleSave} text="text-white" bg="bg-red-400">
          update
        </Button>
        <Button
          handleClick={() => router.back("/product")}
          bg="border border-red-600"
        >
          cancel
        </Button>
      </div>
    </div>
  );
}
