import axios from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { AppRoutes } from "../constant/AppRoutes";

function RegisterForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [fullName, setFullName] = useState("");
  let [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("fullname:", typeof fullName);
    
      let response = await axios.post(AppRoutes.register, {
        fullname: fullName,
        email,
        password,
      });

      let userRegister = response.data;
      if (userRegister) {
        console.log("User Registered Successfully", userRegister);
        fullName = "";
        email = "";
        password = "";
      }
    } catch (error) {
      console.error(
        "Error in login:",
        error.response ? error?.response?.data : error?.message
      );
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col sm:w-3/4 w-full gap-6"
    >
      <input
        type="text"
        placeholder="Enter Your Name"
        onChange={(e) => setFullName(e.target.value)}
        className="rounded-md p-2 outline-none"
        required
      />
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
        required
      />

      {isPasswordVisible ? (
        <EyeIcon
          onClick={handlePasswordVisibility}
          className="cursor-pointer absolute right-2 top-32 m-2 "
        />
      ) : (
        <EyeOff
          onClick={handlePasswordVisibility}
          className="cursor-pointer absolute right-2 top-32 m-2 "
        />
      )}
      <button
        type="submit"
        className="w-1/2 mx-auto p-2 rounded-md font-bold text-white bg-cyan-600 hover:bg-cyan-700"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
