import axios from "axios";
import { useState } from "react";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("fullname:", typeof fullName);
      console.log("Email:", typeof email);
      console.log("Password:", typeof password);
      let response = await axios.post("http://localhost:4000/auth/register", {
        fullname: fullName,
        email,
        password,
      });
      console.log("user" , response.data);

    } catch (error) {
        console.error(
            "Error in login:",
            error.response ? error?.response?.data : error?.message
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:w-1/2 w-full gap-6"
    >
      <input
        type="text"
        placeholder="Enter Your Name"
        onChange={(e) => setFullName(e.target.value)}
        className="rounded-md p-2"
        required
      />
      <input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md p-2"
        required
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md p-2"
        required
      />

      <button
        type="submit"
        className="w-1/2 mx-auto p-2 rounded-md font-bold text-white bg-green-700"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
