import PlaceOrderScreen from "@/screens/PlaceOrderScreen";
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
  return (
    <RequireAuth>
      <PlaceOrderScreen />
    </RequireAuth>
  );
}

