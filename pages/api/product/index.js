import {
  getData,
  addData,
  deleData,
  updateData,
  getItem,
} from "@/feature/firebase/firebaseAuth";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      await addData("products", { ...req.body });
      res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (method === "GET") {
    try {
      const data = await getData("products");
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      await deleData("products", id);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  if (method === "PUT") {
    try {
      const { id, name, description, price, img, type } = req.body;
      await updateData("products", id, { name, description, price, img, type });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
