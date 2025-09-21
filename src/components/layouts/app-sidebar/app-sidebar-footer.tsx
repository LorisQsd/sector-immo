import { logOut } from "@/auth/nextjs/action";
import { SidebarFooter, SidebarLogoutButton } from "@/components/ui/sidebar";

export const AppSidebarFooter = () => {
  return (
    <SidebarFooter>
      <form action={logOut}>
        <SidebarLogoutButton />
      </form>
    </SidebarFooter>
  );
};
