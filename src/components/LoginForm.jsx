import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function LoginForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const reset = () => {
    setEmail("");
    setPassword("");

  };



const handleSubmit = async (e) => {
    try {
      e.preventDefault();


      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = await response?.data?.data?.token;
      const getUser = await axios.get("http://localhost:4000/auth/login", {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("get user from db ==> " , getUser);
      login(getUser?.data);
      
      reset();
      console.log("email == ", email);
      console.log("password == ", password);
    } catch (error) {
      console.error(
        "Error in login:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 gap-6">
      <input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md p-2"
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md p-2"
      />
      <button className="w-1/2 mx-auto p-2 rounded-md font-bold text-white bg-green-700 ">
        {" "}
        Login{" "}
      </button>
    </form>
  );
}

export default LoginForm;
