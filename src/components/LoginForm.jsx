import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { EyeIcon, EyeOff } from "lucide-react";
import { AppRoutes } from "../constant/AppRoutes";
import { message } from "antd";

function LoginForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  const { login ,getUserInfo } = useContext(UserContext);


  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
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
      if (user) {
        user._id = user.id 
        message.success("Login Successfully");
      }
      login(user);
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error in login:",
        error.response ? error.response.data : error.message
      );
      if (error?.response?.data?.data === null) {
        message.error("user not found");
      }else{
        message.error("Invalid email or password");

      }
    }
    
    setLoading(false);
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
        className="rounded-md p-2 outline-none"
        required
      />
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md p-2 outline-none"
        id="password"
        required
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
      <button
      disabled={loading}
       className="w-1/2 mx-auto p-2 rounded-md font-bold text-white bg-cyan-600 hover:bg-cyan-700 ">
        {
          loading ? "Loading..." : "Login"
        }
      </button>
    </form>
  );
}

export default LoginForm;
