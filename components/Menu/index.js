import { BiHomeAlt2 } from "react-icons/bi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { RiTeamLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const object = [
  {
    name: "home",
    icon: <BiHomeAlt2 className=" mr-2 w-7 h-7" />,
    link: "/",
  },
  {
    name: "product",
    icon: <HiOutlineArchiveBox className=" mr-2 w-7 h-7" />,
    link: "/product",
  },
  {
    name: "admins",
    icon: <RiTeamLine className=" mr-2 w-7 h-7" />,
    link: "/admins",
  },
  {
    name: "users",
    icon: <FiUsers className=" mr-2 w-7 h-7" />,
    link: "/users",
  },
];

export default function Menu() {
  const router = useRouter();
  const str = router.pathname.split("/");
  return (
    <div className="pl-4 pt-4">
      <ul>
        {object.map((item) => (
          <li
            key={item.name}
            className={`flex px-4 py-1 rounded-l-lg flex-grow gap-1 mb-4 ${
              str[1] === item.name ? "bg-red-400 text-white" : ""
            }`}
          >
            <Link
              href={item.link}
              className="flex flex-row items-center text-[13px] capitalize"
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
