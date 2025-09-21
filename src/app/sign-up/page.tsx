import { redirect } from "next/navigation";
import type { z } from "zod";
import { signUp } from "@/auth/nextjs/action";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import type { signUpSchema } from "@/auth/nextjs/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATHS } from "@/constants/paths";

export default async function SignUpPage() {
  const isUserConnected = await getCurrentUser();

  if (isUserConnected) redirect(PATHS.protected.root);
  async function signUpAction(formData: FormData) {
    "use server";

    const data = Object.fromEntries(formData) as z.infer<typeof signUpSchema>;

    await signUp(data);
  }

  return (
    <form action={signUpAction}>
      <Input name="name" type="text" placeholder="Name" />
      <Input name="email" type="email" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
