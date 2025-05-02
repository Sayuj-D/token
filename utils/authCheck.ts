"use client";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { useEffect } from "react";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const refToken = localStorage.getItem("refToken");

      const currentTime = Math.floor(Date.now() / 1000);

      if (!token) {
        alert("Token not available!");
        router.push("/login");
        return;
      }

      try {
        const decodedToken = jwt.decode(token);

        if (decodedToken?.exp < currentTime) {
          console.log("Access token expired");

          if (!refToken) {
            alert("Refresh token not found");
            router.push("/login");
            return;
          }

          const decodedRef = jwt.decode(refToken);
          if (!decodedRef || decodedRef.exp < currentTime) {
            alert("Refresh token has expired");
            localStorage.removeItem("token");
            localStorage.removeItem("refToken");
            router.push("/login");
            return;
          }

          try {
            const response = await fetch("/api/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refToken }),
            });

            const data = await response.json();

            if (response.ok) {
              localStorage.setItem("token", data.accessToken);
              return;
            } else {
              alert("Refresh failed");
              router.push("/login");
            }
          } catch {
            alert("Something went wrong during refresh");
            router.push("/login");
          }
        }
      } catch {
        alert("Invalid token");
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5000);
    return () => clearInterval(interval);
  }, []);
}
