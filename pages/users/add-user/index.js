import Button from "@/components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "@/components/TextInput";
import { toastify } from "@/components/Toastify";
import Title from "@/components/Title";
import { validate } from "@/feature/validation";

export default function AddUser() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errorInput, setErrorInput] = useState(null);

  const handleLogin = async () => {
    if (confirmPassword !== password) {
      setErrorInput({
        confirmPassword: "mật khẩu nhập lại không chính xác",
      });
    } else {
      const ListInput = [
        {
          input: account,
          type: "account",
        },
        {
          input: password,
          type: "password",
        },
        {
          input: phone,
          type: "phone",
        },
        {
          input: name,
          type: "name",
        },
      ];

      setErrorInput(validate(ListInput));
    }
  };
  const postData = async () => {
    try {
      const data = { account, password, name, phone };
      const response = await axios.post("/api/users", data);
      const result = response.data;
      if (result) {
        toastify({ title: "Create account successful", type: "success" });
      } else {
        toastify({ title: "Account already exists", type: "error" });
      }
    } catch (error) {
      toastify({ title: "Something went wrong", type: "error" });
    }
  };
  useEffect(() => {
    if (errorInput && Object.keys(errorInput).length === 0) {
      postData();
    }
  }, []);
  return (
    <div className="bg-white p-4 flex flex-col items-center min-w-[50vw] min-h-[50vh] rounded-xl">
      <Title content="create user" />
      <div className="flex w-[400px] flex-col justify-around">
        <TextInput
          label="Full name"
          placeholder="Enter full name"
          type="text"
          value={name}
          onTextChange={(text) => setName(text)}
          error={errorInput && errorInput.name}
        />
        <TextInput
          label="phone number"
          placeholder="Enter phone number"
          type="number"
          value={phone}
          onTextChange={(text) => setPhone(text)}
          error={errorInput && errorInput.phone}
        />
        <TextInput
          label="account"
          placeholder="Enter account"
          type="text"
          value={account}
          onTextChange={(text) => setAccount(text)}
          error={errorInput && errorInput.account}
        />
        <TextInput
          label="password"
          placeholder="Enter password"
          type="password"
          value={password}
          onTextChange={(text) => setPassword(text)}
          error={errorInput && errorInput.password}
        />
        <TextInput
          label="confirm password"
          placeholder="Enter confirm password"
          type="password"
          value={confirmPassword}
          onTextChange={(text) => setConfirmPassword(text)}
          error={errorInput && errorInput.confirmPassword}
        />
        <div className="flex mt-4 flex-row items-center justify-around">
          <Button bg="bg-red-400" text="text-white" handleClick={postData}>
            create
          </Button>
          <Button
            bg="border border-black"
            text="text-black"
            handleClick={handleLogin}
          >
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
