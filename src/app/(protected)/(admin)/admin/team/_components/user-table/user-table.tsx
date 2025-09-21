import { Suspense } from "react";
import { TableHeadingDecorator } from "@/components/common/table-decorator";
import { TableBody } from "@/components/ui/table";
import { UserTableRows } from "./user-table-rows";
import { UserTableRowsSkeleton } from "./user-table-rows.skeleton";

export function UserTable() {
  return (
    <TableHeadingDecorator
      caption="Liste des utilisateurs"
      titles={["Nom", "Email", "Créé le", "Statut de vérification"]}
    >
      <TableBody>
        <Suspense fallback={<UserTableRowsSkeleton />}>
          <UserTableRows />
        </Suspense>
      </TableBody>
    </TableHeadingDecorator>
  );
}
