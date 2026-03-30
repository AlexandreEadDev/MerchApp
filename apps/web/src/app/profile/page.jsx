import ProfileScreen from "@/screens/ProfileScreen";
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
  return (
    <RequireAuth>
      <ProfileScreen />
    </RequireAuth>
  );
}

