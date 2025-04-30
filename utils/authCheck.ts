"use client";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { useEffect } from "react";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token expired or not available!");
        router.push("/login");
        return;
      }

      try {
        const decodedToken = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          alert("Session has expired.");
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch {
        alert("Invalid token");
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkToken(); // Run once on initial load

    const interval = setInterval(() => {
      checkToken(); // Run every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clean up when unmounted
  }, []);
}
