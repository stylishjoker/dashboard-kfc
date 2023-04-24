import {
  getData,
  addData,
  deleData,
  updateData,
  getItem,
} from "@/feature/firebase/firebaseAuth";

const nameDB = "users";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      await addData(nameDB, { ...req.body });
      res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (method === "GET" && !req.body.id) {
    try {
      const data = await getData(nameDB);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (method === "DELETE") {
    try {
      await deleData(nameDB, { ...req.body });
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  if (method === "PUT") {
    try {
      const data = req.body;
      await updateData(nameDB, data.id, { ...data });
      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  if (method === "GET" && req.body.id) {
    try {
      const data = await getItem(nameDB, req.body.id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
