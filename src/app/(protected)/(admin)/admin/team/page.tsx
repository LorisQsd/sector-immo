import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserTable } from "./_components/user-table/user-table";

export default function AdminTeamPage() {
  return (
    <div className="flex flex-col gap-8">
      <Button className="ml-auto">
        <PlusIcon />
        Ajouter un utilisateur
      </Button>
      <UserTable />
    </div>
  );
}
