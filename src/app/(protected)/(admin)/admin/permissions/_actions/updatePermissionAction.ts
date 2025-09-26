"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache-tags";
import { PATHS } from "@/constants/paths";
import { db } from "@/db/db";
import { SessionTable, UserTable } from "@/db/schema/auth.schema";

export async function updatePermissionAction(
  userId: string,
  isActive: boolean
) {
  try {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, userId),
    });

    if (user == null) {
      console.error("User not found while trying to update permission");
      return;
    }

    await db
      .update(UserTable)
      .set({ isActive })
      .where(eq(UserTable.id, userId));

    // Removing the session of the user only if the user is being set as inactive
    if (!isActive) {
      const sessionId = await db.query.SessionTable.findFirst({
        where: eq(SessionTable.userId, userId),
      });
      if (sessionId) {
        await db.delete(SessionTable).where(eq(SessionTable.id, sessionId.id));
      }
    }
  } catch {
    return { success: false };
  }

  revalidatePath(PATHS.protected.admin.permissions);
  revalidatePath(PATHS.protected.admin.team);
  revalidateTag(CACHE_TAGS.getAllUsers);

  return { success: true };
}
