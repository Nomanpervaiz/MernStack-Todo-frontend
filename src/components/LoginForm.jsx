import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { EyeIcon, EyeOff } from "lucide-react";
import { AppRoutes } from "../constant/AppRoutes";

function LoginForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const { login ,getUserInfo } = useContext(UserContext);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      const response = await axios.post(
        AppRoutes.login,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = await response?.data?.data?.token;
      getUserInfo(token);
      const user = await response?.data?.data?.user;
      if (!token) {
        throw new Error("Invalid token received. Please try again.");
      }
      console.log("get user from db ==> ", user);
      login(user);
      reset();
    } catch (error) {
      console.error(
        "Error in login:",
        error.response ? error.response.data : error.message
      );

      setError(error?.response?.data?.message);
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex relative flex-col w-full sm:w-3/4 gap-6"
    >
      <input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md p-2"
      />
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md p-2"
        id="password"
      />
      {isPasswordVisible ? (
        <EyeIcon
          onClick={handlePasswordVisibility}
          className="cursor-pointer absolute right-2 top-16 m-2 "
        />
      ) : (
        <EyeOff
          onClick={handlePasswordVisibility}
          className="cursor-pointer absolute right-2 top-16 m-2 "
        />
      )}
      <button className="w-1/2 mx-auto p-2 rounded-md font-bold text-white bg-green-700 ">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
