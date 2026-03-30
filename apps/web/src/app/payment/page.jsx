import PaymentScreen from "@/screens/PaymentScreen";
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
  return (
    <RequireAuth>
      <PaymentScreen />
    </RequireAuth>
  );
}

