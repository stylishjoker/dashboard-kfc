import { useContext } from "react";
import AuthContext from "@/feature/auth-context";
import { signInGoogle, signOut } from "@/feature/firebase/firebaseAuth";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import Nav from "../nav";
import Menu from "../Menu";
import Image from "next/image";

export default function Layout({ children }) {
  const { userInfo } = useContext(AuthContext);
  const handleLogin = async () => {
    const { result, error } = await signInGoogle();
  };
  const handleSignOut = async () => {
    const { result, error } = await signOut();
  };
  if (userInfo === null) {
    return (
      <div className="bg-white w-screen h-screen">
        <div className="container m-auto flex flex-col items-center justify-center h-[100%]">
          <div className="flex items-center justify-between p-2 rounded-xl card-shadow">
            <div className="hidden md:block w-1/2 rounded-xl">
              <Image
                className="rounded-2xl"
                src={
                  "https://i.pinimg.com/564x/4e/de/17/4ede1779250fd54dda22b919dcc30742.jpg"
                }
                alt=""
                width="400"
                height="400"
              />
            </div>
            <div className="flex-grow justify-center flex">
              <button
                className="flex border border-red-500 px-4 py-2 rounded-xl text-red-500 hover:bg-red-400 hover:text-white font-bold"
                onClick={handleLogin}
              >
                <FcGoogle className="w-7 h-7 mr-2" /> Login with google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-h-screen overflow-hidden">
      <Nav {...userInfo} callback={handleSignOut} />
      <div className="flex h-screen">
        <Menu />
        <div className="h-[90vh] bg-white flex-grow pr-2 rounded-lg overflow-y-scroll border border-red-400">
          {children}
        </div>
      </div>
    </div>
  );
}
