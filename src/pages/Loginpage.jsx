import { Link } from "react-router-dom";
import LoginForm from "../components/loginForm";


function Loginpage() {
  return (
    <section className="h-dvh">
      <div className="container h-full content-center mx-auto ">
        <div className="shadow-xl bg-gray-800 h-3/4 sm:w-3/4 w-full px-4 mx-auto rounded-lg">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl mb-5 font-bold text-white">Login</h1>
            <LoginForm />

            <p className="mt-5 text-gray-300">Don't have an Account ? <Link to={"/register"} className="text-blue-500" >Register here</Link></p>
          </div>
        </div>
      </div>  
    </section>
  );
}

export default Loginpage;
