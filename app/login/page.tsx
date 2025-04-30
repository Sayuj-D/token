"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Empty field detected!");
      return;
    }

    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/home");
      } else {
        alert("something went worng");
      }
    } catch {
      alert("try again");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="flex flex-col gap-4 w-80 bg-amber-100 p-4 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Email"
            className="border-2 rounded-md p-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-md p-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-amber-50 py-2 rounded-md cursor-pointer"
          >
            Login Here
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
