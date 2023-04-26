import { useContext } from "react";
import AuthContext from "@/feature/auth-context";
import { signInGoogle, signOut } from "@/feature/firebase/firebaseAuth";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import Nav from "../nav";
import Menu from "../Menu";

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
      <div className="bg-blue-900 w-screen h-screen center-row">
        <Button handleClick={handleLogin}>
          <FcGoogle className="w-7 h-7" /> Login with google
        </Button>
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
