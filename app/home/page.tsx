"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthCheck } from "@/utils/authCheck";

const Home = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  useAuthCheck();
  return (
    <>
      <div>This is a Home page.</div>
      <br />

      <Link href="/aboutUs">Go to: About Us</Link>
      <br />
      <br />
      <button
        onClick={handleLogout}
        className="bg-blue-50 px-4 py-2 rounded-md cursor-pointer"
      >
        Logout
      </button>
    </>
  );
};

export default Home;
