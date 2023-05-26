import { getData } from "@/feature/firebase/firebaseAuth";

export default async function handle(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { path } = req.body;
      const list_type = await getData("DanhMucMonAn");
      const _type = list_type.find((item) => item.path === path);
      const product = await getData("products");
      const newData = product.filter((item) => item.type === _type.id);
      res.status(200).json({ newData, name: _type.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
