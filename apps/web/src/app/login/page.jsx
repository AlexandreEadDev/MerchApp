import Login from "@/screens/Login";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

