"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import LoadingIndicator from "../connected-header/link-loader";

export function AppSidebarLink({
  href,
  iconSlot,
  children,
}: Pick<React.ComponentProps<typeof Link>, "href" | "children"> & {
  iconSlot?: React.ReactNode;
}) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  return (
    <SidebarMenuButton asChild isActive={pathname === href}>
      <Link
        onClick={() => {
          setOpenMobile(false);
        }}
        href={href}
      >
        {iconSlot && iconSlot}
        <span>{children}</span>
        <LoadingIndicator />
      </Link>
    </SidebarMenuButton>
  );
}
