import { redirect } from "next/navigation";
import type { z } from "zod";
import { signIn } from "@/auth/nextjs/action";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import type { signInSchema } from "@/auth/nextjs/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/constants/paths";

export default async function SignInPage() {
  const isUserConnected = await getCurrentUser();

  if (isUserConnected) redirect(paths.protected.root);

  async function signInAction(formData: FormData) {
    "use server";

    const data = Object.fromEntries(formData) as z.infer<typeof signInSchema>;

    await signIn(data);
  }
  return (
    <form action={signInAction}>
      <Input name="email" type="email" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />
      <Button type="submit">Sign In</Button>
    </form>
  );
}
