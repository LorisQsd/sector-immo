import { getCachedAllUsers } from "@/services/users.service";
import { CreateSectorForm } from "./create-sector-form";

export const CreateSectorWrapper = async () => {
  const users = await getCachedAllUsers();

  return <CreateSectorForm users={users} />;
};
