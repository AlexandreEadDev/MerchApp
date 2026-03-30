import Register from "@/screens/Register";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}

