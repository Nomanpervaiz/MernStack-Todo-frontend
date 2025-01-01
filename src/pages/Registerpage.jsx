import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <section className="h-dvh">
      <div className="container h-full mx-auto  content-center sm:px-8">
        <div className="shadow-xl bg-gray-800 h-auto sm:h-3/4 w-full sm:w-3/4 mx-auto rounded-lg p-6 sm:p-0">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl mb-5 font-bold text-white">Register</h1>
            <RegisterForm />

            <p className="mt-5 text-gray-300">
              Already have an account? <Link to={"/login"} className="text-blue-500">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
