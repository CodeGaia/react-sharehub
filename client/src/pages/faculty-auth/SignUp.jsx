import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/faculty-register",
        {
          username: username,
          phone_number: phoneNumber,
          email: email,
          password: password,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            placeholder="Phone Number"
            type="text"
            className="text-black"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant={"default"} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
