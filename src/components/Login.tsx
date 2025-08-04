import React, { useRef } from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constant";

const Login: React.FC = () => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  return (
    <div>
      <Header />
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          className="object-cover w-full h-full"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
       {/* Centered Form */}
      <div className="flex justify-center items-center min-h-screen px-4">
        <form className="w-full md:w-3/12 absolute p-12 bg-black my-20 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl mb-6 text-center">{"Sign In"}</h1>
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
          <button className="p-4 my-4 bg-red-700 w-full rounded-lg hover:bg-red-800 transition">
            {" "}
            Sign In{" "}
          </button>

          <p className="py-4 text-center text-sm">
            New to Netflix?{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">
              Sign up now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
