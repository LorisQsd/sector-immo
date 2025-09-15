"use client";

import { usePathname } from "next/navigation";
import { paths } from "@/constants/paths";

export function HeaderTitle() {
  const pathname = usePathname();

  const title = {
    [paths.protected.root]: "Secteur",
    [paths.protected.admin.team]: "Equipe",
    [paths.protected.admin.permissions]: "Permissions",
  };

  return (
    <h1 className="text-2xl ml-6 font-bold hidden md:block">
      {title[pathname as keyof typeof title]}
    </h1>
  );
}
