import CartScreen from "@/screens/CartScreen";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <CartScreen />
    </Suspense>
  );
}

