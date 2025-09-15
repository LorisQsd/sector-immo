import { MapPinned, SettingsIcon } from "lucide-react";
import { Suspense } from "react";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarLogoutButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { paths } from "@/constants/paths";
import { Skeleton } from "../../ui/skeleton";
import { AppSidebarLink } from "./app-sidebar-link";

async function AdminButton() {
  const user = await getCurrentUser();

  const isAdmin = user?.role === "admin";

  if (!isAdmin) return null;

  return (
    <AppSidebarLink
      href={paths.protected.admin.root}
      iconSlot={<SettingsIcon />}
    >
      Admin
    </AppSidebarLink>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Laforêt Goussainville</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <AppSidebarLink
                  href={paths.protected.root}
                  iconSlot={<MapPinned />}
                >
                  Secteur
                </AppSidebarLink>
              </SidebarMenuItem>
              <Suspense
                fallback={
                  <div className="flex gap-2 h-8 items-center px-2">
                    <Skeleton className="rounded-full size-4" />
                    <Skeleton className="w-10 h-4" />
                  </div>
                }
              >
                <AdminButton />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarLogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
