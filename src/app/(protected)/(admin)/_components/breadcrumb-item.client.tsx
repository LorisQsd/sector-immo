"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PAGE_TITLES } from "@/constants/page-titles";

export function BreadcrumbItemClient() {
  const pathname = usePathname();
  return (
    <BreadcrumbItem>
      <BreadcrumbPage>
        {PAGE_TITLES[pathname as keyof typeof PAGE_TITLES]}
      </BreadcrumbPage>
    </BreadcrumbItem>
  );
}
