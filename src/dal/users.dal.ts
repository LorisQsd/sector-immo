import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import { cache } from "react";
import { getUserFromSession } from "@/auth/core/session";
import { db } from "@/db/db";

async function _userDal() {
  const session = await getUserFromSession(await cookies());
  if (session?.role !== "admin") {
    unauthorized();
  }
  return db.query.UserTable;
}

export const userDal = cache(_userDal);
