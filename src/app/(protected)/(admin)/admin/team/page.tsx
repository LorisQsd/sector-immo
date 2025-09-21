import { CreateUserDialog } from "./_components/create-user-dialog/create-user-dialog";
import { UserTable } from "./_components/user-table/user-table";

export default function AdminTeamPage() {
  return (
    <div className="flex flex-col gap-8">
      <CreateUserDialog />
      <UserTable />
    </div>
  );
}
