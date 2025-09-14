import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { comparePasswords } from "@/auth/core/passwordHasher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema/auth.schema";

export function AuthForm() {
  async function signIn(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, email),
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password || !user.salt) {
      throw new Error("User has no password or salt");
    }

    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      throw new Error("Invalid password");
    }

    redirect("/app");
  }
  return (
    <form action={signIn}>
      <Input name="email" type="email" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
