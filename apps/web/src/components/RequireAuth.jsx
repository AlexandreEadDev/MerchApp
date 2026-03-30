"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("userInfo");
    if (!token) router.replace("/login");
  }, [router]);

  return children;
}

