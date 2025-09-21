import { ChevronRight, MapPinned, Settings } from "lucide-react";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarLogoutButton,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PATHS } from "@/constants/paths";
import { AppSidebarLink } from "./app-sidebar-link";

async function AdminMenuItem() {
  const user = await getCurrentUser();

  const isAdmin = user?.role === "admin";

  if (!isAdmin) return null;

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <Settings />
            Admin
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <AppSidebarLink href={PATHS.protected.admin.team}>
                Equipe
              </AppSidebarLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <AppSidebarLink href={PATHS.protected.admin.permissions}>
                Permissions
              </AppSidebarLink>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
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
                  href={PATHS.protected.root}
                  iconSlot={<MapPinned />}
                >
                  Secteur
                </AppSidebarLink>
              </SidebarMenuItem>

              <AdminMenuItem />
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
