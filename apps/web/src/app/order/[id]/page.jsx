import OrderScreen from "@/screens/OrderScreen";
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
  return (
    <RequireAuth>
      <OrderScreen />
    </RequireAuth>
  );
}

