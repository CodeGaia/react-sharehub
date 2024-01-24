import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    console.log("login status: " + loginStatus);
  }, [loginStatus]);

  const handleSignIn = () => {
    axios
      .post("http://localhost:8000/faculty-login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-700  rounded-[30px] h-max text-slate-50 p-6 md:p-10 my-10 sm:w-[30%] mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-xl font-bold mb-2">
            Faculty Registration
          </h1>
          <Input
            placeholder="Username"
            type="text"
            className="text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-center">{loginStatus}</p>

          <Button variant={"default"} onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
