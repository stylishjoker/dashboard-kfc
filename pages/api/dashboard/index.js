import { getData } from "@/feature/firebase/firebaseAuth";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
  }
  if (method === "GET") {
    try {
      const pre_order = await getData("previous-order");
      let value = 0,
        total_pro = 0;
      pre_order.forEach((element) => {
        element.items.forEach((item) => {
          value += item.total;
          item.list_item.forEach((_item) => {
            total_pro += _item.quantity;
          });
        });
      });
      const list_user = await getData("users");
      res
        .status(200)
        .json({ registed: list_user.length, pre_order, value, total_pro });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
