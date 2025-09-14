import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { LogoutButton } from "@/components/common/LogoutButton";

export default async function AppPage() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <LogoutButton>Log Out</LogoutButton>
    </div>
  );
}
