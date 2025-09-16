"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { createUserSchema } from "@/app/(protected)/(admin)/admin/team/_components/create-user-dialog/create-user.schema";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "@/auth/core/passwordHasher";
import { createUserSession, removeUserFromSession } from "@/auth/core/session";
import { CACHE_TAGS } from "@/constants/cache-tags";
import { PATHS } from "@/constants/paths";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema/auth.schema";
import { signInSchema, signUpSchema } from "./schemas";

export async function signInAction(_: unknown, formData: FormData) {
  const formDataObject = Object.fromEntries(formData) as z.infer<
    typeof signInSchema
  >;

  const { success, data, error } = signInSchema.safeParse(formDataObject);

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    };
  }

  const user = await db.query.UserTable.findFirst({
    columns: {
      password: true,
      salt: true,
      id: true,
      email: true,
      role: true,
      isVerified: true,
    },
    where: eq(UserTable.email, data.email),
  });

  if (user == null || user.password == null || user.salt == null) {
    return {
      errors: {
        email: ["Aucun utilisateur trouvé dans la base de données"],
      },
    };
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword)
    return {
      errors: {
        password: ["Mot de passe incorrect"],
      },
    };

  await createUserSession({ id: user.id }, await cookies());

  const isAdmin = user.role === "admin";
  if (isAdmin) {
    redirect(PATHS.protected.admin.team);
  }

  if (!user.isVerified) {
    redirect(PATHS.accountVerification);
  }

  redirect(PATHS.protected.root);
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Impossible de créer le compte";

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null)
    return "Le compte existe déjà pour cette adresse email";

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
        isVerified: false,
        isActive: true,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) return "Impossible de créer le compte";
    await createUserSession({ id: user.id }, await cookies());
  } catch {
    return "Impossible de créer le compte";
  }

  redirect(PATHS.protected.root);
}

export async function signUpAction(_: unknown, formData: FormData) {
  const { success, data, error } = createUserSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) return { errors: error.flatten().fieldErrors };

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null)
    return {
      errors: { email: ["Le compte existe déjà avec cette adresse email"] },
    };

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
        isVerified: false,
        isActive: true,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) {
      return { errors: { email: ["Impossible de créer le compte"] } };
    }
  } catch {
    return { errors: { email: ["Impossible de créer le compte"] } };
  }
  revalidatePath(PATHS.protected.admin.team);
  revalidateTag(CACHE_TAGS.getAllUsers);
  return { success: true };
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect(PATHS.root);
}
