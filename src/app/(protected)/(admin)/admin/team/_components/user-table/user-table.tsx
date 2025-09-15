import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserTableRows } from "./user-table-rows";
import { UserTableRowsSkeleton } from "./user-table-rows.skeleton";

export function UserTable() {
  return (
    <Table>
      <TableCaption>Liste des utilisateurs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom utilisateur</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actif depuis</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Suspense fallback={<UserTableRowsSkeleton />}>
          <UserTableRows />
        </Suspense>
      </TableBody>
    </Table>
  );
}
