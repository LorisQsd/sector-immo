import Link from "next/link";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { LogoutButton } from "@/components/common/LogoutButton";
import { paths } from "@/constants/paths";

export default async function AppPage() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <Link href={paths.protected.admin.root}>Admin</Link>
      <LogoutButton>Log Out</LogoutButton>
    </div>
  );
}
