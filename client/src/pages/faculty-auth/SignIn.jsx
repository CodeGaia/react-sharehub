import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaLock, FaRegIdCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (username === "" || password === "") {
      toast("Please fill in all fields", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    axios
      .post("http://localhost:8000/faculty-login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          toast(response.data.message, {
            icon: "⚠️",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          navigate("/dashboard");
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <title>SignIn</title>

      {/* MainBox */}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {/* FOrm */}
        <div className="bg-black text-yellow-500 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* SignInBox */}
          <div className="w-3/5 p-5">
            <div className="flex text-left font-bold rounded pb-5">
              <div className="border-2 border-yellow-500 text-yellow-500 pl-2 pr-1 rounded-s-md hover:text-black hover:bg-yellow-500">
                Share
              </div>
              <div className="border-2 border-yellow-500 bg-yellow-500 text-black pr-2 rounded-tr-md rounded-br-md">
                Hub
              </div>
            </div>
            {/* Sign In Header */}
            <h2 className="text-3xl font-bold mb-2">Sign In to Account</h2>
            {/* line */}
            <div className="border-2 w-10 border-yellow-500 inline-block mb-2"></div>
            {/* Paragrahp */}
            <p className="mb-5 px-16 text-center">
              "Log in to unlock seamless file-sharing collaboration"
            </p>

            {/* form */}
            <div className="flex flex-col items-center ">
              <div className="rounded flex bg-yellow-500 w-64 p-2  items-center mb-5">
                <FaRegIdCard className="text-black m-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className=" bg-transparent text-sm flex placeholder-black text-black focus:border-none focus:outline-none"
                />
              </div>

              {/* password */}

              <div className="rounded flex bg-yellow-500 w-64 p-2  items-center mb-2">
                <FaLock className="text-black m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" bg-transparent text-sm flex placeholder-black text-black focus:border-none focus:outline-none"
                />
              </div>
              {/* <p className="text-red-500 text-center">{loginStatus}</p> */}

              {/* remember me */}
              <div className="flex justify-between w-64 mb-5">
                <label className="flex items-center text-xs  ">
                  <input type="checkbox" name="remember" className="mr-1" />
                  Remember
                </label>
                <a href="#" className="text-xs">
                  Forgot Password
                </a>
              </div>

              {/* SignIn Button */}
              <button
                variant={"default"}
                onClick={handleSignIn}
                className="border-2 border-yellow-500 text-yellow-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-yellow-500 hover:text-black"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* SignUpBox */}
          <div className="w-2/5 bg-yellow-500 text-black rounded-tr-2xl rounded-br-2xl py-36 px-12">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-2"> Hi! Welcome</h2>
            {/* line */}
            <div className="border-2 w-10 border-black inline-block mb-2"></div>
            {/*  */}
            <p className="mb-10">
              Fill up the personal information and start your journey with us.
            </p>
            <Link to="/signup">
              <button className="border-2 border-black text-black rounded-full px-12 py-2 inline-block font-semibold hover:bg-black hover:text-yellow-500">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}
