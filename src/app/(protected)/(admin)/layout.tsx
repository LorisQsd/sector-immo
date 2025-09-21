import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemClient } from "./_components/breadcrumb-item.client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb className="mb-4 md:hidden">
        <BreadcrumbList>
          <BreadcrumbItem>Admin</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItemClient />
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </>
  );
}
