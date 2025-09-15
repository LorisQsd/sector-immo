"use client";

import { usePathname } from "next/navigation";
import { PAGE_TITLES } from "@/constants/page-titles";

export function HeaderTitle() {
  const pathname = usePathname();

  return (
    <h1 className="text-2xl ml-6 font-bold hidden md:block">
      {PAGE_TITLES[pathname as keyof typeof PAGE_TITLES]}
    </h1>
  );
}
