import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema/auth.schema";

export const getAllUsers = async () => {
  const users = db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    where: eq(UserTable.role, "user"),
  });
  return users;
};
