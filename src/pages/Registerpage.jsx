import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import PopupMessage from "../components/PopupMessage";
import { useState } from "react";

function RegisterPage() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [message , setMessage] = useState("");
  const hideMessage = () => setPopupVisible(false);
  const showMessage = (message) => {
    setPopupVisible(true);
    setMessage(message);
  }

  return (
    <section className="h-dvh">
      <div className="container h-full mx-auto  content-center sm:px-8">
        <div className="shadow-xl bg-gray-800 h-auto sm:h-3/4 w-full sm:w-3/4 mx-auto rounded-lg p-6 sm:p-0">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl mb-5 font-bold text-white">Register</h1>
            <RegisterForm showMessage={showMessage}/>
            {isPopupVisible && (
              <PopupMessage
                message={message || "Something went wrong"}
                onClose={hideMessage}
              />
            )}

            <p className="mt-5 text-gray-300">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
