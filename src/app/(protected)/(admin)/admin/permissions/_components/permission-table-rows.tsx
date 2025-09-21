import { TableCell, TableRow } from "@/components/ui/table";
import { getCachedAllUsers } from "@/services/users.service";
import { PermissionSwitch } from "./permission-switch";

export async function PermissionTableRows() {
  const users = await getCachedAllUsers();

  return users.map(({ id, name, isActive }) => (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>
        <PermissionSwitch id={id} isActive={isActive} />
      </TableCell>
    </TableRow>
  ));
}
