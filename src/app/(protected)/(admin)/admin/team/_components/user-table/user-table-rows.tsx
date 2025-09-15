import { unstable_cache } from "next/cache";
import { TableCell, TableRow } from "@/components/ui/table";
import { CACHE_REVALIDATE } from "@/constants/cache-revalidate";
import { CACHE_TAGS } from "@/constants/cache-tags";
import { formatDate } from "@/lib/date-formatter";
import { getAllUsers } from "@/services/users.service";

export async function UserTableRows() {
  const getCachedUsers = unstable_cache(
    async () => {
      return await getAllUsers();
    },
    [CACHE_TAGS.getAllUsers],
    {
      revalidate: CACHE_REVALIDATE["24h"],
    }
  );

  const users = await getCachedUsers();

  return users.map(({ id, name, email, createdAt }) => (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {createdAt instanceof Date
          ? formatDate(createdAt)
          : formatDate(new Date(createdAt))}
      </TableCell>
    </TableRow>
  ));
}
