import type { z } from "zod";
import { signIn } from "@/auth/nextjs/action";
import type { signInSchema } from "@/auth/nextjs/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
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
