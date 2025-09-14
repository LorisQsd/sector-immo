"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "@/auth/core/passwordHasher";
import { createUserSession, removeUserFromSession } from "@/auth/core/session";
import { paths } from "@/constants/paths";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema/auth.schema";
import { signInSchema, signUpSchema } from "./schemas";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to log you in";

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  });

  if (user == null || user.password == null || user.salt == null) {
    return "Unable to log you in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";

  await createUserSession({ id: user.id }, await cookies());

  redirect(paths.protected.root);
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Unable to create account";

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return "Account already exists for this email";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) return "Unable to create account";
    await createUserSession({ id: user.id }, await cookies());
  } catch {
    return "Unable to create account";
  }

  redirect(paths.root);
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect(paths.root);
}
