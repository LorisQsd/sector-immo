import {
  ChevronRight,
  MapPinned,
  MessageCircleMore,
  Settings,
} from "lucide-react";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PATHS } from "@/constants/paths";
import { AppSidebarFooter } from "./app-sidebar-footer";
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

              <SidebarMenuItem>
                <AppSidebarLink
                  href={PATHS.protected.messages}
                  iconSlot={<MessageCircleMore />}
                >
                  Messages
                </AppSidebarLink>
              </SidebarMenuItem>

              <AdminMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}
