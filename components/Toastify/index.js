import { toast } from "react-toastify";

export function toastify({ title, type }) {
  const position = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  if ((type = "default")) {
    toast(title, position);
  } else if ((type = "success")) {
    toast.success(title, position);
  } else if ((type = "error")) {
    toast.error(title, position);
  } else if ((type = "warning")) {
    toast.warn(title, position);
  } else if ((type = "info")) {
    toast.info(title, position);
  }
}
