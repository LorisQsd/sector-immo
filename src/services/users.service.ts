import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATE } from "@/constants/cache-revalidate";
import { CACHE_TAGS } from "@/constants/cache-tags";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema/auth.schema";

export const getAllUsers = async () => {
  const users = db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      isVerified: true,
      isActive: true,
    },
    where: eq(UserTable.role, "user"),
  });
  return users;
};

export const getCachedAllUsers = unstable_cache(
  async () => {
    return await getAllUsers();
  },
  [CACHE_TAGS.getAllUsers],
  {
    revalidate: CACHE_REVALIDATE["24h"],
  }
);
