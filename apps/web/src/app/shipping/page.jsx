import ShippingScreen from "@/screens/ShippingScreen";
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
  return (
    <RequireAuth>
      <ShippingScreen />
    </RequireAuth>
  );
}

