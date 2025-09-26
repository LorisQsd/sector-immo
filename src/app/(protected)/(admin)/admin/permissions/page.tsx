import { InfoIcon } from "lucide-react";
import { Suspense } from "react";
import { TableHeadingDecorator } from "@/components/common/table-decorator";
import { TableBody } from "@/components/ui/table";
import { PermissionTableRows } from "./_components/permission-table-rows";
import { PermissionTableRowsSkeleton } from "./_components/permission-table-rows.skeleton";

export default function AdminPermissionsPage() {
  return (
    <>
      <p className="text-sm mb-4">
        <InfoIcon className="size-4 mr-2 !inline align-text-top" />
        Si vous désactivez une permission, l'utilisateur ne pourra plus accéder
        à l'application mais les données qui lui sont associées seront
        conservées.
      </p>
      <TableHeadingDecorator
        caption="Liste des permissions"
        titles={["Nom", "Permission"]}
      >
        <TableBody>
          <Suspense fallback={<PermissionTableRowsSkeleton />}>
            <PermissionTableRows />
          </Suspense>
        </TableBody>
      </TableHeadingDecorator>
    </>
  );
}
