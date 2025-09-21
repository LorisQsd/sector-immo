import { CheckCircle, XCircle } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/date-formatter";
import { getCachedAllUsers } from "@/services/users.service";

export async function UserTableRows() {
  const users = await getCachedAllUsers();

  return users.map(({ id, name, email, createdAt, isVerified }) => (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {createdAt instanceof Date
          ? formatDate(createdAt)
          : formatDate(new Date(createdAt))}
      </TableCell>
      <TableCell>
        {isVerified ? (
          <span className="text-green-500 font-bold flex items-center gap-2">
            <CheckCircle className="size-4" /> Vérifié
          </span>
        ) : (
          <span className="text-red-500 font-bold flex items-center gap-2">
            <XCircle className="size-4" /> Non vérifié
          </span>
        )}
      </TableCell>
    </TableRow>
  ));
}
